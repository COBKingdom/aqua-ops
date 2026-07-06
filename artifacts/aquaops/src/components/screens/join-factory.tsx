import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

type ScreenState =
  | "loading"
  | "invalid"
  | "ready"
  | "login"
  | "register"
  | "verify-email"
  | "already-in-factory"

interface Invitation {
  id: string
  factory_id: string
  email: string
  role: string
  invite_code: string
}

export function JoinFactory() {

  const [screen, setScreen] =
    useState<ScreenState>("loading")

  const [invitation, setInvitation] =
    useState<Invitation | null>(null)

  const [factoryName, setFactoryName] =
    useState("")

  const [password, setPassword] =
    useState("")

  const [loginEmail, setLoginEmail] =
    useState("")

  const [busy, setBusy] =
    useState(false)

  useEffect(() => {
    const params =
      new URLSearchParams(window.location.search)

    const code = params.get("code")

    if (!code) {
      setScreen("invalid")
      return
    }

    loadInvitation(code)
  }, [])

  const loadInvitation = async (
    code: string
  ) => {
    const { data: invite } =
      await supabase
        .from("factory_invitations")
        .select("*")
        .eq("invite_code", code)
        .is("accepted_at", null)
        .maybeSingle()

    if (!invite) {
      setScreen("invalid")
      return
    }

    setInvitation(invite)
    setLoginEmail(invite.email)

    const { data: factory } =
      await supabase
        .from("factories")
        .select("name")
        .eq("id", invite.factory_id)
        .single()

    setFactoryName(factory?.name || "the factory")
    setScreen("ready")
  }

  const handleLogin = async () => {
    if (!invitation) return

    setBusy(true)

    const { data: authData, error } =
      await supabase.auth.signInWithPassword({
        email: loginEmail.trim().toLowerCase(),
        password,
      })

    if (error) {
      alert(error.message)
      setBusy(false)
      return
    }

    // ONE FACTORY CHECK
    const { data: existing } =
      await supabase
        .from("factory_users")
        .select("id")
        .eq("user_id", authData.user.id)
        .eq("is_active", true)
        .maybeSingle()

    if (existing) {
      setScreen("already-in-factory")
      setBusy(false)
      return
    }

    await acceptInvitation(authData.user.id)
  }

  const handleRegister = async () => {
    if (!invitation) return

    setBusy(true)

    const { error } =
      await supabase.auth.signUp({
        email: invitation.email,
        password,
      })

    if (error) {
      alert(error.message)
      setBusy(false)
      return
    }

    setScreen("verify-email")
    setBusy(false)
  }

  const acceptInvitation = async (
    userId: string
  ) => {
    if (!invitation) return

    // DUPLICATE GUARD
    const { data: existing } =
      await supabase
        .from("factory_users")
        .select("id")
        .eq("factory_id", invitation.factory_id)
        .eq("user_id", userId)
        .maybeSingle()

    if (!existing) {
      const { error: insertError } =
        await supabase
          .from("factory_users")
          .insert({
            factory_id: invitation.factory_id,
            user_id: userId,
            role: invitation.role,
            is_active: true,
            email: invitation.email,
          })

      if (insertError) {
        alert(
          "Failed to join factory: " +
          insertError.message
        )
        setBusy(false)
        return
      }
    }

    await supabase
      .from("factory_invitations")
      .update({
        accepted_at: new Date().toISOString(),
      })
      .eq("id", invitation.id)

    window.location.href = "/aquaops"
  }

  const roleName =
    invitation?.role === "owner"
      ? "Owner"
      : "Data Entry"

  // LOADING
  if (screen === "loading") {
    return (
      <div className="min-h-screen bg-[#eef0f5] flex items-center justify-center">
        <p className="text-gray-400 text-sm">
          Validating invitation...
        </p>
      </div>
    )
  }

  // INVALID
  if (screen === "invalid") {
    return (
      <div className="min-h-screen bg-[#eef0f5] flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-center space-y-4 shadow-sm">
          <h1 className="text-xl font-bold text-[#0d1b3e]">
            Invalid Invitation
          </h1>
          <p className="text-sm text-gray-500">
            This invitation link is invalid or has
            already been used.
          </p>
          <button
            onClick={() =>
              (window.location.href = "/")
            }
            className="w-full bg-[#0d1b3e] text-white py-3 rounded-2xl font-medium text-sm"
          >
            Back to AquaOps
          </button>
        </div>
      </div>
    )
  }

  // ALREADY IN A FACTORY
  if (screen === "already-in-factory") {
    return (
      <div className="min-h-screen bg-[#eef0f5] flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-center space-y-4 shadow-sm">
          <h1 className="text-xl font-bold text-[#0d1b3e]">
            Already in a Factory
          </h1>
          <p className="text-sm text-gray-500">
            Your account already belongs to a
            factory. Each AquaOps account can only
            belong to one factory.
          </p>
          <button
            onClick={() =>
              (window.location.href = "/aquaops")
            }
            className="w-full bg-[#0d1b3e] text-white py-3 rounded-2xl font-medium text-sm"
          >
            Go to My Factory
          </button>
        </div>
      </div>
    )
  }

  // VERIFY EMAIL
  if (screen === "verify-email") {
    return (
      <div className="min-h-screen bg-[#eef0f5] flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-center space-y-4 shadow-sm">
          <div className="text-5xl">✉️</div>
          <h1 className="text-xl font-bold text-[#0d1b3e]">
            Check Your Email
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed">
            We sent a verification link to{" "}
            <strong>{invitation?.email}</strong>.
            Once verified, return here and log in
            to complete joining{" "}
            <strong>{factoryName}</strong>.
          </p>
          <button
            onClick={() => {
              setPassword("")
              setScreen("login")
            }}
            className="w-full bg-[#0d1b3e] text-white py-3 rounded-2xl font-medium text-sm"
          >
            I've Verified — Log In
          </button>
        </div>
      </div>
    )
  }

  // READY — two options
  if (screen === "ready") {
    return (
      <div className="min-h-screen bg-[#eef0f5] flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-5 shadow-sm">
          <div className="text-center space-y-3">
            <img
              src="/icon-192.png"
              alt="AquaOps"
              className="w-14 h-14 rounded-2xl mx-auto shadow-sm"
            />
            <div>
              <h1 className="text-2xl font-bold text-[#0d1b3e]">
                You're Invited
              </h1>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                You've been invited to join{" "}
                <strong className="text-[#0d1b3e]">
                  {factoryName}
                </strong>{" "}
                as{" "}
                <strong className="text-[#0d1b3e]">
                  {roleName}
                </strong>
                .
              </p>
            </div>
          </div>

          <button
            onClick={() => setScreen("login")}
            className="w-full bg-[#0d1b3e] text-white py-3.5 rounded-2xl font-semibold text-sm"
          >
            I already have an account
          </button>

          <button
            onClick={() => setScreen("register")}
            className="w-full border-2 border-[#0d1b3e] text-[#0d1b3e] py-3.5 rounded-2xl font-semibold text-sm"
          >
            Create new account
          </button>
        </div>
      </div>
    )
  }

  // LOGIN
  if (screen === "login") {
    return (
      <div className="min-h-screen bg-[#eef0f5] flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-sm">
          <div>
            <button
              onClick={() => setScreen("ready")}
              className="text-sm text-blue-600 mb-3 block"
            >
              ← Back
            </button>
            <h1 className="text-xl font-bold text-[#0d1b3e]">
              Log In to Join
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Joining{" "}
              <strong>{factoryName}</strong> as{" "}
              <strong>{roleName}</strong>
            </p>
          </div>

          <input
            type="email"
            value={loginEmail}
            onChange={(e) =>
              setLoginEmail(e.target.value)
            }
            placeholder="Email"
            className="w-full p-4 rounded-2xl border border-gray-200 outline-none text-sm"
          />

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") handleLogin()
            }}
            placeholder="Password"
            className="w-full p-4 rounded-2xl border border-gray-200 outline-none text-sm"
          />

          <button
            onClick={handleLogin}
            disabled={busy}
            className="w-full bg-[#0d1b3e] text-white py-3.5 rounded-2xl font-semibold text-sm disabled:opacity-50"
          >
            {busy
              ? "Joining..."
              : "Login and Join Factory"}
          </button>
        </div>
      </div>
    )
  }

  // REGISTER
  if (screen === "register") {
    return (
      <div className="min-h-screen bg-[#eef0f5] flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-sm">
          <div>
            <button
              onClick={() => setScreen("ready")}
              className="text-sm text-blue-600 mb-3 block"
            >
              ← Back
            </button>
            <h1 className="text-xl font-bold text-[#0d1b3e]">
              Create Account
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Joining{" "}
              <strong>{factoryName}</strong> as{" "}
              <strong>{roleName}</strong>
            </p>
          </div>

          <div>
            <input
              type="email"
              value={invitation?.email || ""}
              readOnly
              className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50 text-sm text-gray-400 cursor-not-allowed"
            />
            <p className="text-[11px] text-gray-400 mt-1">
              Email locked to your invitation address
            </p>
          </div>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") handleRegister()
            }}
            placeholder="Create a password"
            className="w-full p-4 rounded-2xl border border-gray-200 outline-none text-sm"
          />

          <button
            onClick={handleRegister}
            disabled={busy}
            className="w-full bg-[#0d1b3e] text-white py-3.5 rounded-2xl font-semibold text-sm disabled:opacity-50"
          >
            {busy
              ? "Creating Account..."
              : "Create Account"}
          </button>
        </div>
      </div>
    )
  }

  return null
}