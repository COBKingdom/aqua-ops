"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { signOutUser } from "@/lib/auth"
import { getFactoryId } from "@/lib/factory"
import { getUserPlan } from "@/lib/subscription"
import { Button } from "@/components/ui/button"

export function AccountScreen() {
  const [loading, setLoading] = useState(false)

  const [email, setEmail] = useState("")
  const [factoryName, setFactoryName] = useState("")

  const [plan, setPlan] = useState("Free")

  useEffect(() => {
    const loadAccount = async () => {
      try {
        // GET LOGGED IN USER
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (user?.email) {
          setEmail(user.email)
        }

        // GET FACTORY
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

        // GET USER PLAN
        const userPlan = await getUserPlan()

        if (userPlan === "pro") {
          setPlan("Pro")
        } else if (userPlan === "enterprise") {
          setPlan("Enterprise")
        } else {
          setPlan("Free")
        }

      } catch (error) {
        console.error(
          "Account load error:",
          error
        )
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

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">
          Account
        </h1>

        <p className="text-sm text-gray-500">
          Manage your AquaOps account
        </p>
      </div>

      {/* ACCOUNT INFO */}
      <div className="bg-white rounded-2xl p-5 shadow-sm space-y-5">

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

        {/* PLAN */}
        <div>
          <p className="text-xs text-gray-500">
            Subscription Plan
          </p>

          <div className="flex items-center justify-between mt-1">

            <div
              className={`text-sm font-semibold px-3 py-1 rounded-full ${
                plan === "Free"
                  ? "bg-gray-100 text-gray-700"
                  : plan === "Pro"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-purple-100 text-purple-700"
              }`}
            >
              {plan}
            </div>

          </div>
        </div>

      </div>

      {/* UPGRADE CARD */}
      {plan === "Free" && (
        <div className="bg-gradient-to-r from-[#0d1b3e] to-[#2563eb] text-white rounded-2xl p-5 shadow-sm space-y-3">

          <div>
            <h2 className="text-lg font-semibold">
              Upgrade to AquaOps Pro
            </h2>

            <p className="text-sm opacity-90 mt-1">
              Unlock advanced operational insights,
              premium reports, inventory tools and
              future AI-powered factory intelligence.
            </p>
          </div>

          <Button
            className="bg-white text-[#0d1b3e] hover:bg-gray-100"
          >
            Upgrade Plan
          </Button>

        </div>
      )}

      {/* SIGN OUT */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">

        <Button
          onClick={handleLogout}
          disabled={loading}
          className="w-full"
          variant="destructive"
        >
          {loading
            ? "Signing out..."
            : "Sign Out"}
        </Button>

      </div>

    </div>
  )
}