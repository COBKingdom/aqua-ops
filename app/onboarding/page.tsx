"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { setFactoryName } from "@/lib/factory"

export default function OnboardingPage() {
  const [tempName, setTempName] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const isValid = tempName.trim().length > 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const name = tempName.trim()
    if (!name) return

    setLoading(true)

    try {
      let factoryId = ""

      // 🔍 CHECK IF FACTORY EXISTS (SAFE MATCH)
      const { data: existing, error: fetchError } = await supabase
        .from("factories")
        .select("id, name")
        .ilike("name", name)
        .limit(1)

      if (fetchError) {
        console.error("Fetch error:", fetchError)
        alert("Error checking factory")
        setLoading(false)
        return
      }

      if (existing && existing.length > 0) {
        // ✅ REUSE EXISTING FACTORY
        factoryId = existing[0].id
      } else {
        // 🆕 CREATE NEW FACTORY
        const { data: newFactory, error: insertError } = await supabase
          .from("factories")
          .insert([{ name }])
          .select("id")
          .single()

        if (insertError || !newFactory) {
          console.error("Insert error:", insertError)
          alert("Error creating factory")
          setLoading(false)
          return
        }

        factoryId = newFactory.id
      }

      // 💾 SAVE LOCALLY
      localStorage.setItem("factoryId", factoryId)
      localStorage.setItem("factoryName", name)

      setFactoryName(name)

      router.push("/aquaops")

    } catch (err) {
      console.error("Unexpected error:", err)
      alert("Unexpected error")
    } finally {
      setLoading(false)
    }
  }

  return (
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
  )
}