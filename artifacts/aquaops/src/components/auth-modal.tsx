import { useState } from "react"
import { useLocation } from "wouter"
import { signIn, signUp } from "@/lib/auth"
import { supabase } from "@/lib/supabase"

export function AuthModal({
  onClose,
}: {
  onClose: () => void
}) {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const [, navigate] = useLocation()

  const handleSubmit = async (
    e?: React.FormEvent
  ) => {
    e?.preventDefault()

    if (!email || !password) return

    try {
      setLoading(true)

      // LOGIN
      if (isLogin) {
        const { error } = await signIn(
          email,
          password
        )

        if (error) {
          alert(error.message)
          setLoading(false)
          return
        }

        // GET AUTH USER
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          alert("User not found")
          setLoading(false)
          return
        }

        // CHECK IF USER HAS FACTORY
        const {
          data: factory,
          error: factoryError,
        } = await supabase
          .from("factories")
          .select("id, name")
          .eq("user_id", user.id)
          .single()

        // EXISTING FACTORY
        if (factory && !factoryError) {
          localStorage.setItem(
            "factoryId",
            factory.id
          )

          localStorage.setItem(
            "factoryName",
            factory.name
          )

          navigate("/aquaops")
        } else {
          // NO FACTORY YET
          navigate("/")
        }

      } else {
        // SIGN UP
        const { error } = await signUp(
          email,
          password
        )

        if (error) {
          alert(error.message)
          setLoading(false)
          return
        }

        alert(
          "Account created successfully. Please check your email and verify your AquaOps account before logging in."
        )

        setIsLogin(true)
      }

      onClose()

    } catch (err) {
      console.error(err)

      alert("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white p-6 rounded-xl w-full max-w-sm space-y-4">

        <h2 className="text-xl font-bold text-center">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded disabled:opacity-50"
          >
            {loading
              ? "Please wait..."
              : isLogin
              ? "Login"
              : "Create Account"}
          </button>

        </form>

        <p
          className="text-sm text-center text-blue-600 cursor-pointer"
          onClick={() =>
            setIsLogin(!isLogin)
          }
        >
          {isLogin
            ? "Don't have an account? Sign up"
            : "Already have an account? Login"}
        </p>

        <button
          onClick={onClose}
          className="w-full text-sm text-gray-500"
        >
          Close
        </button>

      </div>
    </div>
  )
}
