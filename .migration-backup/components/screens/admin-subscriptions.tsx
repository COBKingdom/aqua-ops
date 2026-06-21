"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"

type SubscriptionUser = {
  factory_id: string
  factory_name: string
  user_id: string
  plan: string
  status: string
  trial_end_date: string
  expires_at: string | null
}

export function AdminSubscriptions() {
  const [loading, setLoading] =
    useState(false)

  const [authorized, setAuthorized] =
    useState(false)

  const [users, setUsers] =
    useState<SubscriptionUser[]>([])

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      const { data: adminUser } =
        await supabase
          .from("admin_users")
          .select("email")
          .eq("email", user?.email)
          .single()

      if (!adminUser) return

      setAuthorized(true)

      const { data } = await supabase
        .from("saas_customers")
        .select("*")
        .order(
          "signup_date",
          { ascending: false }
        )

      if (!data) return

      setUsers(
        data.map((item: any) => ({
          factory_id: item.factory_id,
          factory_name:
            item.factory_name,
          user_id: item.user_id,
          plan:
            item.plan || "Starter",
          status:
            item.status || "Trial",
          trial_end_date:
            item.trial_end_date,
          expires_at:
            item.expires_at,
        }))
      )
    } catch (error) {
      console.error(error)
    }
  }

  const activateMonthly = async (
    userId: string
  ) => {
    try {
      setLoading(true)

      const now = new Date()

      const expiry = new Date()

      expiry.setMonth(
        expiry.getMonth() + 1
      )

      const { error } =
        await supabase
          .from("subscriptions")
          .upsert({
            user_id: userId,
            plan: "Monthly",
            status: "Active",
            started_at:
              now.toISOString(),
            expires_at:
              expiry.toISOString(),
          })

      if (error) {
        alert(error.message)
        return
      }

      alert(
        "Monthly subscription activated"
      )

      loadUsers()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const activateAnnual = async (
    userId: string
  ) => {
    try {
      setLoading(true)

      const now = new Date()

      const expiry = new Date()

      expiry.setFullYear(
        expiry.getFullYear() + 1
      )

      const { error } =
        await supabase
          .from("subscriptions")
          .upsert({
            user_id: userId,
            plan: "Annual",
            status: "Active",
            started_at:
              now.toISOString(),
            expires_at:
              expiry.toISOString(),
          })

      if (error) {
        alert(error.message)
        return
      }

      alert(
        "Annual subscription activated"
      )

      loadUsers()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const suspendSubscription =
    async (userId: string) => {
      try {
        setLoading(true)

        const { error } =
          await supabase
            .from("subscriptions")
            .upsert({
              user_id: userId,
              plan: "Starter",
              status: "Suspended",
            })

        if (error) {
          alert(error.message)
          return
        }

        alert(
          "Subscription suspended"
        )

        loadUsers()
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

  if (!authorized) {
    return (
      <div className="p-6">
        Unauthorized
      </div>
    )
  }

  return (
    <div className="p-4 space-y-5 pb-24">

      <div>
        <h1 className="text-2xl font-bold">
          Subscription Admin
        </h1>

        <p className="text-sm text-gray-500">
          Manage AquaOps subscriptions
        </p>
      </div>

      <div className="space-y-4">

        {users.map((user) => (
          <div
            key={user.factory_id}
            className="bg-white rounded-2xl p-5 shadow-sm space-y-3"
          >

            <div>
              <p className="text-xs text-gray-500">
                Factory
              </p>

              <p className="font-bold text-lg">
                {user.factory_name}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Plan
              </p>

              <p className="font-semibold">
                {user.plan}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Status
              </p>

              <p>
                {user.status}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Trial Ends
              </p>

              <p>
                {new Date(
                  user.trial_end_date
                ).toLocaleDateString()}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Subscription Expiry
              </p>

              <p>
                {user.expires_at
                  ? new Date(
                      user.expires_at
                    ).toLocaleDateString()
                  : "Not subscribed"}
              </p>
            </div>

            <div className="flex gap-2 flex-wrap">

              <Button
                disabled={loading}
                onClick={() =>
                  activateMonthly(
                    user.user_id
                  )
                }
              >
                Monthly
              </Button>

              <Button
                disabled={loading}
                onClick={() =>
                  activateAnnual(
                    user.user_id
                  )
                }
                className="bg-green-600"
              >
                Annual
              </Button>

              <Button
                variant="destructive"
                disabled={loading}
                onClick={() =>
                  suspendSubscription(
                    user.user_id
                  )
                }
              >
                Suspend
              </Button>

            </div>

          </div>
        ))}

      </div>

    </div>
  )
}