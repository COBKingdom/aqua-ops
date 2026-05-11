"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { signOutUser } from "@/lib/auth"
import { getFactoryId } from "@/lib/factory"
import { Button } from "@/components/ui/button"

export function AccountScreen() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [factoryName, setFactoryName] = useState("")
  const [plan, setPlan] = useState("Free")

  useEffect(() => {
    const loadAccount = async () => {
      try {
        // Get logged in user
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (user?.email) {
          setEmail(user.email)
        }

        // Get factory
        const factoryId = getFactoryId()

        if (factoryId) {
          const { data: factory } = await supabase
            .from("factories")
            .select("name")
            .eq("id", factoryId)
            .single()

          if (factory?.name) {
            setFactoryName(factory.name)
          }
        }

        // Premium logic later
        setPlan("Free")
      } catch (error) {
        console.error("Account load error:", error)
      }
    }

    loadAccount()
  }, [])

  const handleLogout = async () => {
    try {
      setLoading(true)
      await signOutUser()
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  return (
    <div className="p-4 space-y-5 pb-24">

      <div>
        <h1 className="text-2xl font-bold">
          Account
        </h1>

        <p className="text-sm text-gray-500">
          Manage your AquaOps account
        </p>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">

        <div>
          <p className="text-xs text-gray-500">
            Email
          </p>

          <p className="font-medium">
            {email || "No email"}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500">
            Factory
          </p>

          <p className="font-medium">
            {factoryName || "No factory"}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500">
            Subscription Plan
          </p>

          <p className="font-medium">
            {plan}
          </p>
        </div>

      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm">

        <Button
          onClick={handleLogout}
          disabled={loading}
          className="w-full"
          variant="destructive"
        >
          {loading ? "Signing out..." : "Sign Out"}
        </Button>

      </div>

    </div>
  )
}