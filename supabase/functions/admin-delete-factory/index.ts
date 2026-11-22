
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!

const PLATFORM_ADMIN_UID =
  "a6eaefd7-5bdf-4e72-a446-0fb3f811f8bb"

const PLATFORM_ADMIN_FACTORY_ID =
  "f976bc67-868b-4866-9026-287b57b7fce5"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
}

const jsonResponse = (body: unknown, status = 200) => {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  })
}

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  if (req.method !== "POST") {
    return jsonResponse(
      {
        success: false,
        error: "Method not allowed.",
      },
      405
    )
  }

  let factoryIdForLog = "unknown"

  try {
    if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
      console.error(
        "[admin-delete-factory] Server configuration is incomplete."
      )

      return jsonResponse(
        {
          success: false,
          error: "Server configuration is incomplete.",
        },
        500
      )
    }

    // ── AUTHENTICATION ──────────────────────────────────────────

    const authorization = req.headers.get("Authorization")

    if (!authorization?.startsWith("Bearer ")) {
      return jsonResponse(
        {
          success: false,
          error: "Authentication required.",
        },
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

    const { data: authData, error: authError } =
      await supabase.auth.getUser(token)

    if (authError || !authData.user) {
      return jsonResponse(
        {
          success: false,
          error: "Invalid or expired session.",
        },
        401
      )
    }

    // Only the permanent Platform Admin account can use this function.
    if (authData.user.id !== PLATFORM_ADMIN_UID) {
      return jsonResponse(
        {
          success: false,
          error: "Platform Admin access required.",
        },
        403
      )
    }

    // ── REQUEST VALIDATION ──────────────────────────────────────

    let body: {
      action?: unknown
      factory_id?: unknown
      confirmation_name?: unknown
    }

    try {
      body = await req.json()
    } catch {
      return jsonResponse(
        {
          success: false,
          error: "Invalid request body.",
        },
        400
      )
    }

    const action =
      typeof body.action === "string"
        ? body.action
        : "delete"

    const factoryId = body.factory_id

    if (
      typeof factoryId !== "string" ||
      !UUID_RE.test(factoryId)
    ) {
      return jsonResponse(
        {
          success: false,
          error: "A valid factory ID is required.",
        },
        400
      )
    }

    factoryIdForLog = factoryId

    if (action !== "verify" && action !== "delete") {
      return jsonResponse(
        {
          success: false,
          error: "Unsupported action.",
        },
        400
      )
    }

    // ── PROTECTED FACTORY CHECK ─────────────────────────────────

    if (factoryId === PLATFORM_ADMIN_FACTORY_ID) {
      return jsonResponse(
        {
          success: false,
          error: "The Platform Admin factory is protected.",
        },
        403
      )
    }

    // ── LOAD THE ACTUAL FACTORY RECORD ──────────────────────────

    const { data: factory, error: factoryError } = await supabase
      .from("factories")
      .select("id, name, is_internal, user_id")
      .eq("id", factoryId)
      .maybeSingle()

    if (factoryError) {
      console.error(
        "[admin-delete-factory] Factory lookup failed:",
        {
          factory_id: factoryId,
          message: factoryError.message,
        }
      )

      return jsonResponse(
        {
          success: false,
          error: "Unable to verify the factory.",
        },
        500
      )
    }

    if (!factory) {
      return jsonResponse(
        {
          success: false,
          error: "Factory not found.",
        },
        404
      )
    }

    const isPlatformAdminFactory =
      factory.id === PLATFORM_ADMIN_FACTORY_ID ||
      factory.user_id === PLATFORM_ADMIN_UID

    const isInternalFactory =
      factory.is_internal === true

    // ── VERIFY ACTION ──────────────────────────────────────────
    // This action only returns factory information.
    // It does not delete anything.

    if (action === "verify") {
      if (isPlatformAdminFactory || isInternalFactory) {
        return jsonResponse(
          {
            success: true,
            factory_name: factory.name,
            is_internal: isInternalFactory,
            is_platform_admin: isPlatformAdminFactory,
            deletable: false,
          }
        )
      }

      return jsonResponse(
        {
          success: true,
          factory_name: factory.name,
          is_internal: false,
          is_platform_admin: false,
          deletable: true,
        }
      )
    }

    // ── DELETE ACTION ──────────────────────────────────────────

    if (isPlatformAdminFactory || isInternalFactory) {
      return jsonResponse(
        {
          success: false,
          error:
            "Internal or Platform Admin factories cannot be deleted.",
        },
        403
      )
    }

const confirmationName = body.confirmation_name

if (
  typeof confirmationName !== "string" ||
  !confirmationName.trim().length
) {
  return jsonResponse(
    {
      success: false,
      error: "Factory name confirmation is required.",
    },
    400
  )
}

// Trim accidental leading/trailing spaces but preserve
// spelling and capitalization.
if (confirmationName.trim() !== factory.name.trim()) {
      return jsonResponse(
        {
          success: false,
          error:
            "The factory name does not match. Nothing was deleted.",
        },
        400
      )
    }

    console.log(
      "[admin-delete-factory] Starting factory deletion:",
      {
        factory_id: factoryId,
      }
    )

    // ── DELETE FACTORY DATABASE RECORDS ─────────────────────────
    // The SQL function removes operational data and returns only
    // Auth user IDs that are exclusively associated with this factory.

    const { data: rawUserIds, error: deletionError } =
      await supabase.rpc(
        "admin_delete_factory_data",
        {
          p_factory_id: factoryId,
        }
      )

    if (deletionError) {
      console.error(
        "[admin-delete-factory] Database deletion failed:",
        {
          factory_id: factoryId,
          message: deletionError.message,
        }
      )

      return jsonResponse(
        {
          success: false,
          error:
            "Factory database deletion failed. No Auth accounts were processed.",
        },
        500
      )
    }

    // The SQL function is expected to return a UUID array.
    // If it does not, database deletion may already have happened,
    // so report the situation accurately and do not claim full success.

    if (!Array.isArray(rawUserIds)) {
      console.error(
        "[admin-delete-factory] SQL returned an unexpected result:",
        {
          factory_id: factoryId,
          result_type: typeof rawUserIds,
        }
      )

      return jsonResponse({
        success: true,
        database_deleted: true,
        auth_cleanup_complete: false,
        eligible_user_count: 0,
        deleted_users: [],
        already_missing_users: [],
        failed_users: [
          {
            user_id: "unknown",
            error:
              "The SQL function returned an unexpected Auth-user result. Manual verification is required.",
          },
        ],
        message:
          "Factory data was deleted, but Auth account cleanup could not be verified. Please investigate before taking further action.",
      })
    }

    // Remove invalid IDs, duplicates and the protected admin UID.
    const eligibleUserIds = [
      ...new Set(
        rawUserIds.filter(
          (id: unknown): id is string =>
            typeof id === "string" &&
            UUID_RE.test(id) &&
            id !== PLATFORM_ADMIN_UID
        )
      ),
    ]

    console.log(
      "[admin-delete-factory] Database deletion completed:",
      {
        factory_id: factoryId,
        eligible_auth_user_count: eligibleUserIds.length,
      }
    )

    // ── AUTH ACCOUNT CLEANUP ────────────────────────────────────

    const deletedUsers: string[] = []
    const alreadyMissingUsers: string[] = []

    const failedUsers: {
      user_id: string
      error: string
    }[] = []

    for (const userId of eligibleUserIds) {
      // An extra protection check for the Platform Admin account.
      if (userId === PLATFORM_ADMIN_UID) {
        continue
      }

      // Check whether the Auth account still exists.
      const { data: existingUser, error: lookupError } =
        await supabase.auth.admin.getUserById(userId)

      if (lookupError) {
        if (lookupError.status === 404) {
          alreadyMissingUsers.push(userId)
        } else {
          failedUsers.push({
            user_id: userId,
            error: lookupError.message,
          })
        }

        continue
      }

      if (!existingUser.user) {
        alreadyMissingUsers.push(userId)
        continue
      }

      // Delete the Auth account.
      const { error: deleteError } =
        await supabase.auth.admin.deleteUser(userId)

      if (deleteError) {
        failedUsers.push({
          user_id: userId,
          error: deleteError.message,
        })

        continue
      }

      // Verify that the account is no longer present.
      const { data: verificationData, error: verificationError } =
        await supabase.auth.admin.getUserById(userId)

      if (
        verificationError &&
        verificationError.status === 404
      ) {
        deletedUsers.push(userId)
      } else if (
        !verificationError &&
        !verificationData.user
      ) {
        deletedUsers.push(userId)
      } else {
        failedUsers.push({
          user_id: userId,
          error:
            verificationError?.message ||
            "Auth account still exists after deletion request.",
        })
      }
    }

    // ── FINAL RESULT ────────────────────────────────────────────

    const cleanupComplete = failedUsers.length === 0

    const message = !cleanupComplete
      ? "Factory data was deleted, but some Auth accounts still need attention."
      : eligibleUserIds.length === 0
        ? "Factory data was deleted. No Auth accounts were eligible for deletion; accounts that may be linked elsewhere were preserved."
        : "Factory data and eligible Auth accounts were deleted successfully."

    console.log(
      "[admin-delete-factory] Auth cleanup result:",
      {
        factory_id: factoryId,
        eligible_user_count: eligibleUserIds.length,
        deleted_user_count: deletedUsers.length,
        already_missing_user_count: alreadyMissingUsers.length,
        failed_user_count: failedUsers.length,
      }
    )

    // Return HTTP 200 so the frontend receives the complete result,
    // including partial-cleanup information, without losing the payload.

    return jsonResponse({
      success: true,
      database_deleted: true,
      auth_cleanup_complete: cleanupComplete,
      message,
      eligible_user_count: eligibleUserIds.length,
      deleted_users: deletedUsers,
      already_missing_users: alreadyMissingUsers,
      failed_users: failedUsers,
    })
  } catch (error) {
    console.error(
      "[admin-delete-factory] Unexpected error:",
      {
        factory_id: factoryIdForLog,
        message:
          error instanceof Error
            ? error.message
            : String(error),
      }
    )

    return jsonResponse(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unexpected server error.",
      },
      500
    )
  }
})
