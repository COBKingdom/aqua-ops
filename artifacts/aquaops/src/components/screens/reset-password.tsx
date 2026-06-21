import { useState, useEffect } from "react"
import { useLocation } from "wouter"
import { updatePassword } from "@/lib/auth"
import { supabase } from "@/lib/supabase"

export function ResetPasswordScreen() {
  const [, navigate] = useLocation()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [isRecovery, setIsRecovery] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    if (!supabase) {
      setChecking(false)
      return
    }

    // Supabase fires PASSWORD_RECOVERY when the user lands with a recovery token
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setIsRecovery(true)
        setChecking(false)
      }
    })

    // Fallback: parse the URL hash directly in case the event already fired
    const hash = window.location.hash
    if (hash.includes("type=recovery")) {
      setIsRecovery(true)
      setChecking(false)
    } else {
      // Give Supabase a moment to process the hash before giving up
      const timer = setTimeout(() => setChecking(false), 2000)
      return () => {
        clearTimeout(timer)
        subscription.unsubscribe()
      }
    }

    return () => subscription.unsubscribe()
  }, [])

  const handleSubmit = async () => {
    setError("")

    if (!password || !confirmPassword) {
      setError("Please fill in both password fields.")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    if (!supabase) {
      setError("Service unavailable. Please try again later.")
      return
    }

    try {
      setLoading(true)

      const { error: updateError } = await updatePassword(password)

      if (updateError) {
        setError(updateError.message)
        return
      }

      setSuccess(true)

      // Redirect to login after a short delay
      setTimeout(() => {
        navigate("/")
      }, 3000)
    } catch (err) {
      console.error(err)
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#eef0f5]">
      <div className="max-w-md mx-auto px-4 pt-10 pb-16 space-y-5">

        {/* BRAND */}
        <div className="flex justify-center">
          <img
            src="/icon-192.png"
            alt="AquaOps"
            className="w-14 h-14 rounded-2xl shadow-sm"
          />
        </div>

        {/* CARD */}
        <div className="bg-white rounded-3xl p-5 shadow-sm space-y-4">

          <div>
            <h1 className="text-2xl font-bold text-[#0d1b3e]">
              Reset Password
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Enter and confirm your new password below.
            </p>
          </div>

          {checking && (
            <div className="py-6 text-center text-sm text-gray-400">
              Verifying reset link...
            </div>
          )}

          {!checking && !isRecovery && !success && (
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                <p className="text-sm font-medium text-red-800">
                  Invalid or expired link
                </p>
                <p className="text-sm text-red-700 mt-1">
                  This reset link is no longer valid. Please request a new one.
                </p>
              </div>

              <button
                onClick={() => navigate("/forgot-password")}
                className="w-full bg-[#0d1b3e] text-white py-4 rounded-2xl font-medium"
              >
                Request New Link
              </button>

              <p className="text-xs text-gray-400 text-center pt-1">
                Need help?{" "}
                <a
                  href="mailto:support@trueops.app"
                  className="text-blue-600 underline"
                >
                  support@trueops.app
                </a>
              </p>
            </div>
          )}

          {!checking && isRecovery && !success && (
            <div className="space-y-3">
              <input
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError("")
                }}
                className="w-full p-4 rounded-2xl border border-gray-200 outline-none"
              />

              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                  setError("")
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSubmit()
                }}
                className="w-full p-4 rounded-2xl border border-gray-200 outline-none"
              />

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-[#0d1b3e] text-white py-4 rounded-2xl font-medium disabled:opacity-50"
              >
                {loading ? "Updating..." : "Set New Password"}
              </button>

              <p className="text-xs text-gray-400 text-center pt-1">
                Need help?{" "}
                <a
                  href="mailto:support@trueops.app"
                  className="text-blue-600 underline"
                >
                  support@trueops.app
                </a>
              </p>
            </div>
          )}

          {success && (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                <p className="text-sm font-medium text-green-800">
                  Password updated
                </p>
                <p className="text-sm text-green-700 mt-1">
                  Your password has been changed. Redirecting you to login...
                </p>
              </div>

              <button
                onClick={() => navigate("/")}
                className="w-full bg-[#0d1b3e] text-white py-4 rounded-2xl font-medium"
              >
                Go to Login
              </button>

              <p className="text-xs text-gray-400 text-center pt-1">
                Need help?{" "}
                <a
                  href="mailto:support@trueops.app"
                  className="text-blue-600 underline"
                >
                  support@trueops.app
                </a>
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
