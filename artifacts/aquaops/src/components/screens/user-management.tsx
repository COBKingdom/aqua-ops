import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { getCurrentFactory } from "@/lib/current-factory"
import { getUserLimit } from "@/lib/subscription"

// A5 TESTING BYPASS — flip to false when Flutterwave payments are live
const TESTING_BYPASS = true

interface UserManagementProps {
  setActiveTab: (tab: string) => void
}

export function UserManagement({
  setActiveTab,
}: UserManagementProps) {

  const [loading, setLoading] =
    useState(true)

  const [factoryId, setFactoryId] =
    useState("")

  const [factoryDisplayName, setFactoryDisplayName] =
    useState("")

  const [currentUserId, setCurrentUserId] =
    useState("")

  const [currentUserRole, setCurrentUserRole] =
    useState("owner")

  const [userLimit, setUserLimit] =
    useState(1)

  const [members, setMembers] =
    useState<any[]>([])

  const [invitations, setInvitations] =
    useState<any[]>([])

  const [inviteEmail, setInviteEmail] =
    useState("")

  const [inviteRole, setInviteRole] =
    useState("data_entry")

  const [inviting, setInviting] =
    useState(false)

  const [newInviteCode, setNewInviteCode] =
    useState("")

  const [copied, setCopied] =
    useState(false)

  const [removing, setRemoving] =
    useState<string | null>(null)

  useEffect(() => {
    loadAll()
  }, [])

  const loadAll = async () => {
    try {
      setLoading(true)

      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      setCurrentUserId(user.id)

      const factory =
        await getCurrentFactory()

      if (!factory) return

      setFactoryId(factory.id)
      setFactoryDisplayName(factory.name || "")
      setCurrentUserRole(
        factory.role || "owner"
      )

      const limit = await getUserLimit()
      setUserLimit(TESTING_BYPASS ? Math.max(limit, 4) : limit)

      const { data: memberData } =
        await supabase
          .from("factory_users")
          .select("*")
          .eq("factory_id", factory.id)
          .eq("is_active", true)

      setMembers(memberData || [])

      if (factory.role === "owner") {
        const {
          data: inviteData,
        } = await supabase
          .from("factory_invitations")
          .select("*")
          .eq("factory_id", factory.id)
          .is("accepted_at", null)
          .order("created_at", {
            ascending: false,
          })

        setInvitations(inviteData || [])
      }

    } catch (err) {
      console.error(
        "UserManagement load error:",
        err
      )
    } finally {
      setLoading(false)
    }
  }

  const handleInvite = async () => {
    const email =
      inviteEmail.toLowerCase().trim()

    if (!email) {
      alert(
        "Please enter an email address."
      )
      return
    }

    if (members.length >= userLimit) {
      alert(
        `Your ${userLimit === 1 ? "Standard" : "Multi-User"} plan allows up to ${userLimit} user${userLimit > 1 ? "s" : ""}. Upgrade to Multi-User to add more team members.`
      )
      return
    }

    const alreadyMember = members.some(
      (m) =>
        m.email?.toLowerCase() === email
    )

    if (alreadyMember) {
      alert(
        "This person is already a member of your factory."
      )
      return
    }

    const alreadyInvited =
      invitations.some(
        (i) =>
          i.email?.toLowerCase() === email
      )

    if (alreadyInvited) {
      alert(
        "An invitation is already pending for this email."
      )
      return
    }

    try {
      setInviting(true)

      const { data, error } =
        await supabase
          .from("factory_invitations")
          .insert({
            factory_id: factoryId,
            email,
            role: inviteRole,
          })
          .select()
          .single()

      if (error) {
        alert(error.message)
        return
      }

      setNewInviteCode(
        data.invite_code
      )

      // SEND INVITATION EMAIL (non-blocking)
      const apiUrl =
        import.meta.env.VITE_API_URL

      if (apiUrl) {
        fetch(
          `${apiUrl}/api/send-invitation`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              factoryName: factoryDisplayName,
              inviteCode: data.invite_code,
              role: inviteRole,
            }),
          }
        ).catch((err) =>
          console.error(
            "Invitation email failed:",
            err
          )
        )
      }

      setInviteEmail("")
      setInviteRole("data_entry")

      await loadAll()

    } catch (err) {
      console.error(err)
    } finally {
      setInviting(false)
    }
  }

  const handleRemoveMember = async (
    memberId: string,
    memberUserId: string
  ) => {
    if (memberUserId === currentUserId) {
      alert(
        "You cannot remove yourself."
      )
      return
    }

    if (
      !confirm(
        "Remove this team member? They will lose access immediately."
      )
    )
      return

    try {
      setRemoving(memberId)

      await supabase
        .from("factory_users")
        .update({ is_active: false })
        .eq("id", memberId)

      await loadAll()

    } catch (err) {
      console.error(err)
    } finally {
      setRemoving(null)
    }
  }

  const handleCancelInvite = async (
    inviteId: string
  ) => {
    if (
      !confirm(
        "Cancel this invitation?"
      )
    )
      return

    await supabase
      .from("factory_invitations")
      .delete()
      .eq("id", inviteId)

    await loadAll()
  }

  const handleCopy = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true)
        setTimeout(
          () => setCopied(false),
          2000
        )
      })
  }

  const getRoleBadge = (role: string) => {
    if (role === "owner") {
      return (
        <span className="text-xs px-2 py-0.5 rounded-full bg-[#0d1b3e] text-white font-medium">
          Owner
        </span>
      )
    }
    return (
      <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-medium">
        Data Entry
      </span>
    )
  }

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-400">
        Loading team...
      </div>
    )
  }

  return (
    <div className="p-4 space-y-5 pb-24">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-[#0d1b3e]">
          Team Members
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          {members.length} of{" "}
          {userLimit} user
          {userLimit !== 1 ? "s" : ""} used
          ·{" "}
          {TESTING_BYPASS
            ? "Testing Mode (4 users)"
            : userLimit === 1
            ? "Standard Plan"
            : "Multi-User Plan"}
        </p>
      </div>

      {/* USER LIMIT BAR */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span>Team capacity</span>
          <span>
            {members.length}/{userLimit}
          </span>
        </div>

        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-2 rounded-full transition-all ${
              members.length >= userLimit
                ? "bg-red-500"
                : "bg-[#2563eb]"
            }`}
            style={{
              width: `${Math.min(
                100,
                (members.length /
                  userLimit) *
                  100
              )}%`,
            }}
          />
        </div>

        {userLimit === 1 && (
          <p className="text-xs text-gray-400 mt-2">
            Upgrade to Multi-User plan
            (₦15,000/month) to add up to
            4 team members.
          </p>
        )}
      </div>

      {/* CURRENT MEMBERS */}
      <div className="space-y-3">

        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
          Current Members
        </h2>

        {members.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between"
          >

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <p className="font-medium text-[#0d1b3e] text-sm">
                  {member.display_name ||
                    member.email ||
                    "Team Member"}
                </p>

                {member.user_id ===
                  currentUserId && (
                  <span className="text-[10px] text-gray-400">
                    (you)
                  </span>
                )}
              </div>

              {member.email && (
                <p className="text-xs text-gray-400">
                  {member.email}
                </p>
              )}

              {getRoleBadge(member.role)}
            </div>

            {currentUserRole ===
              "owner" &&
              member.user_id !==
                currentUserId && (
              <button
                onClick={() =>
                  handleRemoveMember(
                    member.id,
                    member.user_id
                  )
                }
                disabled={
                  removing === member.id
                }
                className="text-xs text-red-500 hover:text-red-700 font-medium disabled:opacity-50"
              >
                {removing === member.id
                  ? "Removing..."
                  : "Remove"}
              </button>
            )}

          </div>
        ))}

      </div>

      {/* OWNER-ONLY SECTION */}
      {currentUserRole === "owner" && (
        <>

          {/* PENDING INVITATIONS */}
          {invitations.length > 0 && (
            <div className="space-y-3">

              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                Pending Invitations
              </h2>

              {invitations.map((inv) => (
                <div
                  key={inv.id}
                  className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 shadow-sm"
                >

                  <div className="flex items-start justify-between">

                    <div>
                      <p className="font-medium text-sm text-[#0d1b3e]">
                        {inv.email}
                      </p>

                      <p className="text-xs text-gray-500 mt-0.5">
                        {inv.role ===
                        "owner"
                          ? "Owner"
                          : "Data Entry"}{" "}
                        · Invited{" "}
                        {new Date(
                          inv.created_at
                        ).toLocaleDateString()}
                      </p>

                      <button
                        onClick={() =>
                          handleCopy(
                            inv.invite_code
                          )
                        }
                        className="text-xs text-[#2563eb] mt-1 font-medium"
                      >
                        {copied
                          ? "✓ Copied!"
                          : `Code: ${inv.invite_code.slice(0, 8)}... (tap to copy)`}
                      </button>
                    </div>

                    <button
                      onClick={() =>
                        handleCancelInvite(
                          inv.id
                        )
                      }
                      className="text-xs text-red-500 font-medium"
                    >
                      Cancel
                    </button>

                  </div>

                </div>
              ))}

            </div>
          )}

          {/* NEW INVITE CREATED */}
          {newInviteCode && (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-5 shadow-sm space-y-3">

              <h2 className="font-semibold text-green-800">
                ✓ Invitation Created
              </h2>

              <p className="text-sm text-green-700">
                Share this invite code with
                your team member. They
                should sign up with the
                invited email address and
                will be automatically
                added to your factory.
              </p>

              <div className="bg-white rounded-xl p-3 flex items-center justify-between border border-green-200">
                <code className="text-sm font-mono text-[#0d1b3e]">
                  {newInviteCode}
                </code>

                <button
                  onClick={() =>
                    handleCopy(
                      newInviteCode
                    )
                  }
                  className="text-xs text-[#2563eb] font-semibold ml-2"
                >
                  {copied
                    ? "✓ Copied"
                    : "Copy"}
                </button>
              </div>

              <button
                onClick={() =>
                  setNewInviteCode("")
                }
                className="text-xs text-gray-400"
              >
                Dismiss
              </button>

            </div>
          )}

          {/* INVITE FORM */}
          {members.length < userLimit ? (
            <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">

              <h2 className="font-semibold text-[#0d1b3e]">
                Invite Team Member
              </h2>

              <div>
                <label className="text-xs text-gray-500 block mb-1">
                  Email Address
                </label>

                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) =>
                    setInviteEmail(
                      e.target.value
                    )
                  }
                  placeholder="teammate@example.com"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2563eb]"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500 block mb-1">
                  Role
                </label>

                <div className="grid grid-cols-2 gap-2">

                  <button
                    onClick={() =>
                      setInviteRole(
                        "data_entry"
                      )
                    }
                    className={`p-3 rounded-xl border-2 text-left transition ${
                      inviteRole ===
                      "data_entry"
                        ? "border-[#2563eb] bg-blue-50"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <p className="text-xs font-semibold text-[#0d1b3e]">
                      Data Entry
                    </p>

                    <p className="text-[10px] text-gray-400 mt-0.5">
                      Production, Sales,
                      Expenses only
                    </p>
                  </button>

                  <button
                    onClick={() =>
                      setInviteRole("owner")
                    }
                    className={`p-3 rounded-xl border-2 text-left transition ${
                      inviteRole === "owner"
                        ? "border-[#2563eb] bg-blue-50"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <p className="text-xs font-semibold text-[#0d1b3e]">
                      Owner
                    </p>

                    <p className="text-[10px] text-gray-400 mt-0.5">
                      Full access
                    </p>
                  </button>

                </div>
              </div>

              <Button
                className="w-full bg-[#2563eb] text-white font-semibold"
                onClick={handleInvite}
                disabled={inviting}
              >
                {inviting
                  ? "Sending..."
                  : "Send Invitation"}
              </Button>

            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 text-center">
              <p className="text-sm text-gray-500">
                User limit reached for
                your current plan.
              </p>

              <button
                onClick={() =>
                  setActiveTab(
                    "renew-subscription"
                  )
                }
                className="text-sm text-[#2563eb] font-semibold mt-2"
              >
                Upgrade to Multi-User →
              </button>
            </div>
          )}

        </>
      )}

    </div>
  )
}