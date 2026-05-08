"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn, signUp } from "@/lib/auth"
import { supabase } from "@/lib/supabase"

export function AuthModal({ onClose }: { onClose: () => void }) {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSubmit = async () => {
    if (!email || !password) return

    try {
      // ✅ LOGIN
      if (isLogin) {
        const { error } = await signIn(email, password)

        if (error) {
          alert(error.message)
          return
        }

        // ✅ GET AUTH USER
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          alert("User not found")
          return
        }

        // ✅ CHECK IF USER ALREADY HAS FACTORY
        const { data: factory, error: factoryError } = await supabase
          .from("factories")
          .select("id, name")
          .eq("user_id", user.id)
          .single()

        // ✅ EXISTING FACTORY
        if (factory && !factoryError) {
          localStorage.setItem("factoryId", factory.id)
          localStorage.setItem("factoryName", factory.name)

          router.push("/aquaops")
        } else {
          // ✅ NO FACTORY YET
          router.push("/onboarding")
        }

      } else {
        // ✅ SIGN UP
        const { error } = await signUp(email, password)

        if (error) {
          alert(error.message)
          return
        }

        alert("Account created successfully. Please login.")
        setIsLogin(true)
      }

      onClose()

    } catch (err) {
      console.error(err)
      alert("Something went wrong")
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-sm space-y-4">

        <h2 className="text-xl font-bold text-center">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-black text-white py-3 rounded"
        >
          {isLogin ? "Login" : "Create Account"}
        </button>

        <p
          className="text-sm text-center text-blue-600 cursor-pointer"
          onClick={() => setIsLogin(!isLogin)}
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