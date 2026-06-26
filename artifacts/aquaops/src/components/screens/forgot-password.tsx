import { useState } from "react"
import { useLocation } from "wouter"
import { resetPassword } from "@/lib/auth"
import { supabase } from "@/lib/supabase"

export function ForgotPasswordScreen() {
  const [showDropdown, setShowDropdown] = useState(false)
  const [, navigate] = useLocation()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async () => {
    if (!email) {
      setError("Please enter your email address.")
      return
    }

    if (!supabase) {
      setError("Service unavailable. Please try again later.")
      return
    }

    try {
      setLoading(true)
      setError("")

      const redirectTo =
        window.location.origin +
        (import.meta.env.BASE_URL || "/") +
        "reset-password"

      const { error: resetError } = await resetPassword(email, redirectTo)
      console.log("RESET REDIRECT =", redirectTo);

      if (resetError) {
        setError(resetError.message)
        return
      }

      setSent(true)
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
              Forgot Password
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Enter your email and we'll send you a reset link.
            </p>
          </div>

          {sent ? (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                <p className="text-sm font-medium text-green-800">
                  Reset link sent
                </p>
                <p className="text-sm text-green-700 mt-1">
                  Check your inbox for <strong>{email}</strong> and click the
                  link to set a new password.
                </p>
              </div>

              <p className="text-xs text-gray-400 text-center">
                Didn't receive it? Check your spam folder or contact{" "}
                <a
                  href="mailto:support@trueops.app"
                  className="text-blue-600 underline"
                >
                  support@trueops.app
                </a>
              </p>

              <button
                onClick={() => navigate("/")}
                className="w-full bg-[#0d1b3e] text-white py-4 rounded-2xl font-medium"
              >
                Back to Login
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
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
                {loading ? "Sending..." : "Send Reset Link"}
              </button>

              <p
                onClick={() => navigate("/")}
                className="text-sm text-center text-blue-600 cursor-pointer"
              >
                Back to Login
              </p>

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
