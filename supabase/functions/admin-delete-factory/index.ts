
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!

const PLATFORM_ADMIN_UID = "a6eaefd7-5bdf-4e72-a446-0fb3f811f8bb"
const PLATFORM_ADMIN_FACTORY_ID = "f976bc67-868b-4866-9026-287b57b7fce5"

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

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed." }, 405)
  }

  try {
    if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
      console.error("Supabase server configuration is incomplete.")
      return jsonResponse({ error: "Server configuration is incomplete." }, 500)
    }

    const authorization = req.headers.get("Authorization")

    if (!authorization?.startsWith("Bearer ")) {
      return jsonResponse({ error: "Authentication required." }, 401)
    }

    const token = authorization.slice(7)

    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    // Verify the signed-in user using the supplied access token.
    const { data: authData, error: authError } =
      await supabase.auth.getUser(token)

    if (authError || !authData.user) {
      return jsonResponse({ error: "Invalid or expired session." }, 401)
    }

    // Only the immutable Platform Admin account is authorised.
    if (authData.user.id !== PLATFORM_ADMIN_UID) {
      return jsonResponse({ error: "Platform Admin access required." }, 403)
    }

    let body: {
      factory_id?: unknown
      confirmation_name?: unknown
    }

    try {
      body = await req.json()
    } catch {
      return jsonResponse({ error: "Invalid request body." }, 400)
    }

    const factoryId = body?.factory_id
    const confirmationName = body?.confirmation_name

    if (
      typeof factoryId !== "string" ||
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(factoryId)
    ) {
      return jsonResponse({ error: "A valid factory ID is required." }, 400)
    }

    if (typeof confirmationName !== "string" || confirmationName.length === 0) {
      return jsonResponse({
        error: "You must enter the exact factory name to confirm deletion.",
      }, 400)
    }

    // Never allow deletion of the Platform Admin factory.
    if (factoryId === PLATFORM_ADMIN_FACTORY_ID) {
      return jsonResponse({
        error: "The Platform Admin factory is protected.",
      }, 403)
    }

    // Retrieve the actual factory name directly from the database.
    const { data: factory, error: factoryError } = await supabase
      .from("factories")
      .select("id, name, is_internal")
      .eq("id", factoryId)
      .maybeSingle()

    if (factoryError) {
      console.error("Factory lookup failed:", factoryError.message)
      return jsonResponse({ error: "Unable to verify the factory." }, 500)
    }

    if (!factory) {
      return jsonResponse({ error: "Factory not found." }, 404)
    }

    // Protect all internal factories, not just the known Platform Admin ID.
    if (factory.is_internal === true) {
      return jsonResponse({
        error: "Internal factories cannot be deleted.",
      }, 403)
    }

    // Exact, case-sensitive comparison. No trimming or partial matching.
    if (confirmationName !== factory.name) {
      return jsonResponse({
        error: "The factory name does not match. Nothing was deleted.",
      }, 400)
    }

    // Database function performs the factory data deletion and returns
    // only Auth users eligible for deletion.
    const { data: userIds, error: deletionError } = await supabase.rpc(
      "admin_delete_factory_data",
      { p_factory_id: factoryId },
    )

    if (deletionError) {
      console.error("Factory database deletion failed:", deletionError.message)

      return jsonResponse({
        error: "Factory database deletion failed. Please contact support.",
      }, 500)
    }

    const deletedUsers: string[] = []
    const alreadyMissingUsers: string[] = []
    const failedUsers: { user_id: string; error: string }[] = []

    // Delete eligible Auth accounts only after the database operation succeeds.
    const eligibleUserIds = Array.isArray(userIds)
      ? [...new Set(userIds.filter(
          (id): id is string =>
            typeof id === "string" &&
            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id),
        ))]
      : []

    for (const userId of eligibleUserIds) {
      // Additional protection for the Platform Admin account.
      if (userId === PLATFORM_ADMIN_UID) {
        continue
      }

      const { data: existingUser, error: lookupError } =
        await supabase.auth.admin.getUserById(userId)

      if (lookupError) {
        if (lookupError.status === 404) {
          alreadyMissingUsers.push(userId)
          continue
        }

        failedUsers.push({
          user_id: userId,
          error: lookupError.message,
        })
        continue
      }

      if (!existingUser.user) {
        alreadyMissingUsers.push(userId)
        continue
      }

      const { error: deleteError } =
        await supabase.auth.admin.deleteUser(userId)

      if (deleteError) {
        failedUsers.push({
          user_id: userId,
          error: deleteError.message,
        })
      } else {
        deletedUsers.push(userId)
      }
    }

    if (failedUsers.length > 0) {
      return jsonResponse({
        success: false,
        database_deleted: true,
        message:
          "Factory data was deleted, but some Auth accounts still need attention.",
        deleted_users: deletedUsers,
        already_missing_users: alreadyMissingUsers,
        failed_users: failedUsers,
      }, 207)
    }

    return jsonResponse({
      success: true,
      message: "Factory and eligible user accounts deleted successfully.",
      deleted_users: deletedUsers,
      already_missing_users: alreadyMissingUsers,
    })
  } catch (error) {
    console.error("Admin factory deletion error:", error)

    return jsonResponse({
      error: error instanceof Error
        ? error.message
        : "Unexpected server error.",
    }, 500)
  }
})
