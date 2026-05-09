"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { setFactoryName } from "@/lib/factory"
import { AuthModal } from "@/components/auth-modal"

export default function OnboardingPage() {
  const [tempName, setTempName] = useState("")
  const [loading, setLoading] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const router = useRouter()

  const isValid = tempName.trim().length > 0

  // ✅ CHECK AUTH STATUS
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setIsAuthenticated(true)
      }
    })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // ✅ FORCE LOGIN FIRST
    if (!isAuthenticated) {
      setShowAuth(true)
      return
    }

    const name = tempName.trim()

    if (!name) return

    setLoading(true)

    try {
      // ✅ GET LOGGED IN USER
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        alert("Please login first")
        setLoading(false)
        return
      }

      let factoryId = ""

      // ✅ CHECK IF USER ALREADY HAS FACTORY
      const { data: existingFactory } = await supabase
        .from("factories")
        .select("id, name")
        .eq("user_id", user.id)
        .single()

      // ✅ EXISTING FACTORY
      if (existingFactory) {
        factoryId = existingFactory.id

        localStorage.setItem("factoryId", existingFactory.id)
        localStorage.setItem("factoryName", existingFactory.name)

        setFactoryName(existingFactory.name)

        router.push("/aquaops")

        return
      }

      // ✅ CREATE NEW FACTORY
      const { data: newFactory, error: insertError } = await supabase
        .from("factories")
        .insert([
          {
            name,
            user_id: user.id,
          },
        ])
        .select("id")
        .single()

      if (insertError || !newFactory) {
        console.error(insertError)
        alert("Error creating factory")
        setLoading(false)
        return
      }

      factoryId = newFactory.id

      // ✅ SAVE LOCAL CACHE
      localStorage.setItem("factoryId", factoryId)
      localStorage.setItem("factoryName", name)

      setFactoryName(name)

      router.push("/aquaops")

    } catch (err) {
      console.error(err)
      alert("Unexpected error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <main className="min-h-screen bg-[#eef0f5] flex items-center justify-center px-4">

        <div className="w-full max-w-sm space-y-4">

          <div className="text-center flex flex-col items-center space-y-2">
            <img
              src="/icon-192.png"
              alt="AquaOps Logo"
              className="w-12 h-12 rounded-xl"
            />

            <h1 className="text-xl font-bold text-[#0d1b3e]">
              Welcome to AquaOps
            </h1>

            <p className="text-xs text-gray-500">
              Enter your factory name to begin
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-sm px-4 py-4 space-y-4"
          >
            <input
              type="text"
              placeholder="e.g. COB Water Factory"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#0d1b3e]"
              autoFocus
            />

            <button
              type="submit"
              disabled={!isValid || loading}
              className={`w-full py-3 rounded-xl font-semibold text-sm transition ${
                isValid
                  ? "bg-[#0d1b3e] text-white"
                  : "bg-gray-300 text-gray-500"
              }`}
            >
              {loading ? "Please wait..." : "Continue →"}
            </button>
          </form>

          <p className="text-center text-[11px] text-gray-400">
            You can change this later
          </p>

        </div>
      </main>

      {/* ✅ AUTH MODAL */}
      {showAuth && (
        <AuthModal
          onClose={() => {
            setShowAuth(false)

            supabase.auth.getUser().then(({ data }) => {
              if (data.user) {
                setIsAuthenticated(true)
              }
            })
          }}
        />
      )}
    </>
  )
}