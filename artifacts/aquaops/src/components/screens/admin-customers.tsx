
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

interface Customer {
  factory_id: string
  factory_name: string
  owner_name?: string
  status: string
  plan: string
  trial_state: string
  started_at: string | null
  expires_at: string | null
  signup_date: string | null
  user_count?: number
  last_activity?: string | null
}

interface FactoryMember {
  id: string
  user_id: string
  role: string
}

interface FactoryDetails {
  members: FactoryMember[]
  salesCount: number
  prodCount: number
  expCount: number
}

export function AdminCustomers() {
  const [loading, setLoading] = useState(true)
  const [customers, setCustomers] = useState<Customer[]>([])
  const [managed, setManaged] = useState<Customer | null>(null)
  const [details, setDetails] = useState<FactoryDetails | null>(null)
  const [detailsLoading, setDetailsLoading] = useState(false)

  const [canonicalFactoryName, setCanonicalFactoryName] = useState("")
  const [factoryVerificationError, setFactoryVerificationError] = useState("")

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState("")
  const [deleting, setDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState("")
  const [deleteSuccess, setDeleteSuccess] = useState("")

  useEffect(() => {
    loadCustomers()
  }, [])

  const loadCustomers = async () => {
    setLoading(true)

    try {
      const { data, error } = await supabase
        .from("saas_customers")
        .select("*")
        .order("signup_date", { ascending: false })

      if (error) throw error

      setCustomers(data || [])
    } catch (err) {
      console.error("Unable to load AquaOps customers:", err)
    } finally {
      setLoading(false)
    }
  }

  const openManage = async (customer: Customer) => {
    setManaged(customer)
    setDetails(null)
    setDetailsLoading(true)

    setCanonicalFactoryName("")
    setFactoryVerificationError("")
    setShowDeleteConfirm(false)
    setDeleteConfirmation("")
    setDeleteError("")
    setDeleteSuccess("")

    const id = customer.factory_id

    try {
      const [
        verificationResult,
        membersRes,
        salesRes,
        prodRes,
        expRes,
      ] = await Promise.all([
        supabase.functions.invoke("admin-delete-factory", {
          body: {
            action: "verify",
            factory_id: id,
          },
        }),

        supabase
          .from("factory_users")
          .select("id, user_id, role")
          .eq("factory_id", id),

        supabase
          .from("sales")
          .select("id", { count: "exact", head: true })
          .eq("factory_id", id),

        supabase
          .from("production")
          .select("id", { count: "exact", head: true })
          .eq("factory_id", id),

        supabase
          .from("expenses")
          .select("id", { count: "exact", head: true })
          .eq("factory_id", id),
      ])

      if (verificationResult.error) {
        throw new Error(
          verificationResult.error.message ||
          "Unable to verify the factory name."
        )
      }

      if (!verificationResult.data?.success) {
        throw new Error(
          verificationResult.data?.error ||
          "Unable to verify this factory."
        )
      }

      if (verificationResult.data.is_internal === true) {
        throw new Error(
          "This is an internal factory and cannot be deleted."
        )
      }

      if (verificationResult.data.is_platform_admin === true) {
        throw new Error(
          "The Platform Admin factory is protected."
        )
      }

const verifiedName = verificationResult.data.factory_name

if (
  typeof verifiedName !== "string" ||
  !verifiedName.trim().length
) {
        throw new Error(
          "The factory's registered name could not be verified."
        )
      }

      setCanonicalFactoryName(verifiedName.trim())

      if (membersRes.error) throw membersRes.error
      if (salesRes.error) throw salesRes.error
      if (prodRes.error) throw prodRes.error
      if (expRes.error) throw expRes.error

      setDetails({
        members: membersRes.data || [],
        salesCount: salesRes.count || 0,
        prodCount: prodRes.count || 0,
        expCount: expRes.count || 0,
      })
    } catch (err) {
      console.error("Unable to load factory details:", err)

      setFactoryVerificationError(
        err instanceof Error
          ? err.message
          : "Unable to verify this factory."
      )
    } finally {
      setDetailsLoading(false)
    }
  }

  const handleDeleteFactory = async () => {
    if (
!managed ||
!canonicalFactoryName ||
deleteConfirmation.trim() !== canonicalFactoryName.trim()
    ) {
      return
    }

    setDeleting(true)
    setDeleteError("")
    setDeleteSuccess("")

    try {
      const { data, error } = await supabase.functions.invoke(
        "admin-delete-factory",
        {
          body: {
            action: "delete",
            factory_id: managed.factory_id,
            confirmation_name: deleteConfirmation,
          },
        }
      )

      if (error) {
        let message = error.message || "Factory deletion failed."

        const context = (error as any).context

        if (context && typeof context.json === "function") {
          try {
            const responseBody = await context.json()

            message =
              responseBody?.error ||
              responseBody?.message ||
              message
          } catch {
            // Keep the original error message.
          }
        }

        throw new Error(message)
      }

      if (!data?.success) {
        throw new Error(
          data?.error ||
          data?.message ||
          "Factory deletion was not completed."
        )
      }

      const deletedCount = Array.isArray(data.deleted_users)
        ? data.deleted_users.length
        : 0

      const alreadyMissingCount = Array.isArray(data.already_missing_users)
        ? data.already_missing_users.length
        : 0

      const failedCount = Array.isArray(data.failed_users)
        ? data.failed_users.length
        : 0

      if (
        failedCount > 0 ||
        data.auth_cleanup_complete === false
      ) {
        setDeleteError(
          data.message ||
          `Factory data was deleted, but ${failedCount} Auth account(s) still need attention.`
        )

        await loadCustomers()
        return
      }

      setDeleteSuccess(
        `${data.message || "Factory deleted successfully."} ` +
        `Auth accounts deleted: ${deletedCount}; ` +
        `already missing: ${alreadyMissingCount}.`
      )

      setManaged(null)
      setDetails(null)
      setCanonicalFactoryName("")
      setShowDeleteConfirm(false)
      setDeleteConfirmation("")

      await loadCustomers()
    } catch (err) {
      console.error("Factory deletion error:", err)

      setDeleteError(
        err instanceof Error
          ? err.message
          : "Unable to delete factory."
      )
    } finally {
      setDeleting(false)
    }
  }

  function daysLeft(expiresAt: string | null): number | null {
    if (!expiresAt) return null

    return Math.max(
      0,
      Math.ceil(
        (new Date(expiresAt).getTime() - Date.now()) /
        86_400_000
      )
    )
  }

  const totalCustomers = customers.length

  const activeCustomers = customers.filter(
    c => c.status === "Active"
  ).length

  const trialCustomers = customers.filter(
    c => c.status === "Trial"
  ).length

  const expiredCustomers = customers.filter(
    c => c.trial_state === "Expired"
  ).length

  // ── MANAGE PANEL ──────────────────────────────────────────────

  if (managed) {
    const days = daysLeft(managed.expires_at)

    return (
      <div className="p-4 space-y-5 pb-24">

        {/* BACK */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setManaged(null)
              setDetails(null)
              setCanonicalFactoryName("")
              setFactoryVerificationError("")
              setShowDeleteConfirm(false)
              setDeleteConfirmation("")
              setDeleteError("")
            }}
            className="text-sm text-[#2563eb] font-semibold"
          >
            ← Back
          </button>

          <h1 className="text-lg font-bold text-[#0d1b3e] truncate">
            {canonicalFactoryName || managed.factory_name}
          </h1>
        </div>

        {/* FACTORY INFO */}
        <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
          <h2 className="text-sm font-semibold text-[#0d1b3e]">
            Factory Details
          </h2>

          <div className="grid grid-cols-2 gap-3 text-sm">
            {([
              ["Plan", managed.plan || "—"],
              ["Status", managed.status || "—"],
              ["Trial State", managed.trial_state || "—"],
              ["Owner", managed.owner_name || "—"],
              [
                "Joined",
                managed.signup_date
                  ? new Date(managed.signup_date).toLocaleDateString()
                  : "—",
              ],
              [
                "Expires",
                managed.expires_at
                  ? new Date(managed.expires_at).toLocaleDateString()
                  : "—",
              ],
            ] as [string, string][]).map(([label, value]) => (
              <div key={label}>
                <p className="text-gray-400 text-xs">{label}</p>
                <p className="font-medium">{value}</p>
              </div>
            ))}
          </div>

          {days !== null && days <= 7 && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-xs text-red-700 font-semibold">
              ⚠ {days === 0
                ? "Expired today"
                : `${days} day${days === 1 ? "" : "s"} remaining`}
            </div>
          )}
        </div>

        {/* RECORD COUNTS */}
        {detailsLoading ? (
          <div className="bg-white rounded-2xl p-4 shadow-sm text-sm text-gray-400">
            Loading details…
          </div>
        ) : details && (
          <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
            <h2 className="text-sm font-semibold text-[#0d1b3e]">
              Data Summary
            </h2>

            <div className="grid grid-cols-3 gap-3 text-center">
              {([
                ["Sales", details.salesCount],
                ["Production", details.prodCount],
                ["Expenses", details.expCount],
              ] as [string, number][]).map(([label, count]) => (
                <div
                  key={label}
                  className="bg-gray-50 rounded-xl p-3"
                >
                  <p className="text-lg font-bold text-[#0d1b3e]">
                    {count}
                  </p>
                  <p className="text-xs text-gray-500">{label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TEAM MEMBERS */}
        {details && (
          <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
            <h2 className="text-sm font-semibold text-[#0d1b3e]">
              Team Members ({details.members.length})
            </h2>

            {details.members.length === 0 ? (
              <p className="text-sm text-gray-400">
                No team members found.
              </p>
            ) : (
              details.members.map(member => (
                <div
                  key={member.id}
                  className="flex items-center justify-between py-1"
                >
                  <div>
                    <p className="text-sm font-medium text-[#0d1b3e]">
                      {member.user_id.slice(0, 16)}…
                    </p>

                    <p className="text-xs text-gray-400">
                      {member.role}
                    </p>
                  </div>

                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      member.role?.toLowerCase() === "owner"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {member.role}
                  </span>
                </div>
              ))
            )}
          </div>
        )}

        {/* DANGER ZONE */}
        <div className="bg-white border border-red-200 rounded-2xl p-4 space-y-3">
          <div>
            <h2 className="text-sm font-bold text-red-700">
              Danger Zone
            </h2>

            <p className="text-xs text-gray-500 mt-1">
              Permanently delete this factory and its associated
              operational records. This action cannot be undone.
              Subscription status does not prevent deletion.
            </p>
          </div>

          {factoryVerificationError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-xs text-red-700">
                Factory verification failed: {factoryVerificationError}
              </p>
              <p className="text-xs text-red-600 mt-1">
                Deletion is disabled until the factory can be verified.
              </p>
            </div>
          )}

          {!showDeleteConfirm ? (
            <button
              onClick={() => {
                setDeleteConfirmation("")
                setDeleteError("")
                setShowDeleteConfirm(true)
              }}
              disabled={
                detailsLoading ||
                !canonicalFactoryName ||
                !!factoryVerificationError
              }
              className="w-full bg-red-600 text-white rounded-lg py-2.5 text-sm font-semibold hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Delete Factory Permanently
            </button>
          ) : (
            <div className="space-y-3">
              <div className="bg-red-50 rounded-lg p-3">
                <p className="text-sm font-semibold text-red-800">
                  Are you absolutely sure?
                </p>

                <p className="text-xs text-red-700 mt-1">
                  You are about to permanently delete:
                </p>

                <p className="text-sm font-bold text-red-900 mt-2">
                  {canonicalFactoryName}
                </p>
              </div>

              <label className="block text-xs font-semibold text-gray-700">
                Type the exact factory name to confirm
              </label>

              <input
                type="text"
                value={deleteConfirmation}
                onChange={e => {
                  setDeleteConfirmation(e.target.value)
                  setDeleteError("")
                }}
                placeholder="Enter factory name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
              />

              {deleteError && (
                <p className="text-xs text-red-600">
                  {deleteError}
                </p>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false)
                    setDeleteConfirmation("")
                    setDeleteError("")
                  }}
                  disabled={deleting}
                  className="flex-1 border border-gray-300 rounded-lg py-2 text-sm font-semibold"
                >
                  Cancel
                </button>

                <button
                  onClick={handleDeleteFactory}
                  disabled={
                    deleting ||
                    !canonicalFactoryName ||
                    deleteConfirmation.trim() !== canonicalFactoryName.trim()
                  }
                  className="flex-1 bg-red-600 text-white rounded-lg py-2 text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {deleting ? "Deleting..." : "Confirm Delete"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // ── CUSTOMER LIST ─────────────────────────────────────────────

  if (loading) {
    return (
      <div className="p-6 text-sm text-gray-400">
        Loading…
      </div>
    )
  }

  return (
    <div className="p-4 space-y-5 pb-24">

      {deleteSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-sm text-green-800">
          {deleteSuccess}
        </div>
      )}

      <div>
        <h1 className="text-2xl font-bold text-[#0d1b3e]">
          Customers
        </h1>

        <p className="text-sm text-gray-500">
          AquaOps Subscriber Management
        </p>
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-2 gap-3">
        {([
          ["Total", totalCustomers, "text-[#0d1b3e]"],
          ["Active", activeCustomers, "text-green-600"],
          ["Trial", trialCustomers, "text-blue-600"],
          ["Expired", expiredCustomers, "text-red-600"],
        ] as [string, number, string][]).map(
          ([label, value, color]) => (
            <div
              key={label}
              className="bg-white rounded-2xl p-4 shadow-sm"
            >
              <p className="text-xs text-gray-500">{label}</p>
              <p className={`text-2xl font-bold ${color}`}>
                {value}
              </p>
            </div>
          )
        )}
      </div>

      {/* CUSTOMER LIST */}
      <div className="space-y-3">
        {customers.map((customer, index) => {
          const days = daysLeft(customer.expires_at)
          const urgentDays = days !== null && days <= 7

          return (
            <div
              key={`${customer.factory_id}-${index}`}
              className="bg-white rounded-2xl p-4 shadow-sm"
            >
              {/* HEADER ROW */}
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-[#0d1b3e] truncate">
                    {customer.factory_name}
                  </h3>

                  {customer.owner_name && (
                    <p className="text-xs text-gray-500 mt-0.5">
                      {customer.owner_name}
                    </p>
                  )}
                </div>

                <span
                  className={`ml-2 shrink-0 text-xs px-3 py-1 rounded-full font-medium ${
                    customer.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : customer.status === "Trial"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  {customer.status}
                </span>
              </div>

              {/* DETAIL GRID */}
              <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                <div>
                  <p className="text-gray-400">Plan</p>
                  <p className="font-medium">
                    {customer.plan || "—"}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400">Trial</p>
                  <p className="font-medium">
                    {customer.trial_state || "—"}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400">Days Left</p>
                  <p className={`font-medium ${urgentDays ? "text-red-600" : ""}`}>
                    {days !== null ? days : "—"}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400">Joined</p>
                  <p className="font-medium">
                    {customer.signup_date
                      ? new Date(customer.signup_date).toLocaleDateString()
                      : "—"}
                  </p>
                </div>

                {customer.user_count !== undefined &&
                  customer.user_count !== null && (
                    <div>
                      <p className="text-gray-400">Users</p>
                      <p className="font-medium">
                        {customer.user_count}
                      </p>
                    </div>
                  )}

                {customer.last_activity && (
                  <div>
                    <p className="text-gray-400">Last Active</p>
                    <p className="font-medium">
                      {new Date(customer.last_activity).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>

              {/* EXPIRY WARNING */}
              {urgentDays && (
                <div className="mt-3 bg-red-50 border border-red-200 rounded-lg px-3 py-1.5 text-xs text-red-700 font-semibold">
                  ⚠ {days === 0
                    ? "Expires today"
                    : `${days} day${days === 1 ? "" : "s"} left`}
                </div>
              )}

              {/* MANAGE BUTTON */}
              <button
                onClick={() => openManage(customer)}
                className="mt-3 w-full text-xs font-semibold text-[#2563eb] border border-[#2563eb]/40 rounded-lg py-1.5 hover:bg-[#2563eb]/5 transition-colors"
              >
                View Details
              </button>
            </div>
          )
        })}

        {customers.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-8">
            No customers found.
          </p>
        )}
      </div>
    </div>
  )
}
