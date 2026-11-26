
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!

const TRIAL_DAYS = 14

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
}

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  })

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  if (req.method !== "POST") {
    return jsonResponse(
      { success: false, error: "Method not allowed." },
      405
    )
  }

  try {
    if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
      console.error("[activate-trial] Server configuration is incomplete.")
      return jsonResponse(
        { success: false, error: "Server configuration is incomplete." },
        500
      )
    }

    const authorization = req.headers.get("Authorization")

    if (!authorization?.startsWith("Bearer ")) {
      return jsonResponse(
        { success: false, error: "Authentication required." },
        401
      )
    }

    const token = authorization.slice(7)

    const supabase = createClient(
      SUPABASE_URL,
      SERVICE_ROLE_KEY,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    )

    // Verify the caller's Supabase Auth session.
    const { data: authData, error: authError } =
      await supabase.auth.getUser(token)

    if (authError || !authData.user) {
      return jsonResponse(
        { success: false, error: "Invalid or expired session." },
        401
      )
    }

    const userId = authData.user.id

    // Validate request body.
    let body: { factory_id?: unknown }

    try {
      body = await req.json()
    } catch {
      return jsonResponse(
        { success: false, error: "Invalid request body." },
        400
      )
    }

    const factoryId = body.factory_id

    if (
      typeof factoryId !== "string" ||
      !UUID_RE.test(factoryId)
    ) {
      return jsonResponse(
        { success: false, error: "A valid factory ID is required." },
        400
      )
    }

    // Retrieve the requested factory.
    const { data: factory, error: factoryError } = await supabase
      .from("factories")
      .select("id, user_id, is_internal")
      .eq("id", factoryId)
      .maybeSingle()

    if (factoryError) {
      console.error(
        "[activate-trial] Factory lookup failed:",
        factoryError.message
      )

      return jsonResponse(
        { success: false, error: "Unable to verify factory." },
        500
      )
    }

    if (!factory) {
      return jsonResponse(
        { success: false, error: "Factory not found." },
        404
      )
    }

    if (factory.is_internal === true) {
      return jsonResponse(
        { success: false, error: "Internal factories cannot activate trials." },
        403
      )
    }

    // Verify that the authenticated user belongs to this factory.
    const { data: membership, error: membershipError } =
      await supabase
        .from("factory_users")
        .select("user_id, factory_id, role")
        .eq("factory_id", factoryId)
        .eq("user_id", userId)
        .maybeSingle()

    if (membershipError) {
      console.error(
        "[activate-trial] Membership lookup failed:",
        membershipError.message
      )

      return jsonResponse(
        { success: false, error: "Unable to verify factory membership." },
        500
      )
    }

    if (!membership) {
      return jsonResponse(
        { success: false, error: "You are not a member of this factory." },
        403
      )
    }

    // The factory owner's account owns the subscription.
    const subscriptionUserId = factory.user_id

    if (!subscriptionUserId) {
      return jsonResponse(
        { success: false, error: "Factory owner could not be identified." },
        500
      )
    }

    // Look up the factory owner's subscription.
    const { data: existingSubscription, error: lookupError } =
      await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", subscriptionUserId)
        .maybeSingle()

    if (lookupError) {
      console.error(
        "[activate-trial] Subscription lookup failed:",
        lookupError.message
      )

      return jsonResponse(
        { success: false, error: "Unable to check existing subscription." },
        500
      )
    }

    // Preserve and return any existing subscription.
    if (existingSubscription) {
      return jsonResponse({
        success: true,
        created: false,
        subscription: existingSubscription,
        message: "The factory's existing subscription was preserved.",
      })
    }

    // Staff members cannot create a subscription for the factory.
    if (userId !== subscriptionUserId) {
      return jsonResponse(
        {
          success: false,
          error: "The factory owner must activate the subscription.",
        },
        403
      )
    }

    // Create a new 14-day Starter trial for the factory owner.
    const startedAt = new Date()

    const expiresAt = new Date(
      startedAt.getTime() + TRIAL_DAYS * 24 * 60 * 60 * 1000
    )

    const { data: newSubscription, error: insertError } =
      await supabase
        .from("subscriptions")
        .insert({
          user_id: subscriptionUserId,
          plan: "Starter",
          status: "Trial",
          user_limit: 1,
          renewal_status: "pending",
          started_at: startedAt.toISOString(),
          expires_at: expiresAt.toISOString(),
        })
        .select("*")
        .single()

    if (insertError) {
      // Recover safely if another request created the subscription first.
      if (insertError.code === "23505") {
        const { data: concurrentSubscription, error: retryError } =
          await supabase
            .from("subscriptions")
            .select("*")
            .eq("user_id", subscriptionUserId)
            .maybeSingle()

        if (!retryError && concurrentSubscription) {
          return jsonResponse({
            success: true,
            created: false,
            subscription: concurrentSubscription,
            message: "The existing subscription was preserved.",
          })
        }
      }

      console.error("[activate-trial] Subscription creation failed:", {
        user_id: subscriptionUserId,
        factory_id: factoryId,
        code: insertError.code,
        message: insertError.message,
      })

      return jsonResponse(
        { success: false, error: "Failed to create trial subscription." },
        500
      )
    }

    console.log("[activate-trial] Trial activated:", {
      owner_user_id: subscriptionUserId,
      requesting_user_id: userId,
      factory_id: factoryId,
      expires_at: expiresAt.toISOString(),
    })

    return jsonResponse({
      success: true,
      created: true,
      subscription: newSubscription,
      message: "Your 14-day Starter trial has been activated.",
    })
  } catch (error) {
    console.error(
      "[activate-trial] Unexpected error:",
      error instanceof Error ? error.message : String(error)
    )

    return jsonResponse(
      { success: false, error: "Unexpected server error." },
      500
    )
  }
})
