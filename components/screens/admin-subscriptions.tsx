"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"

type SubscriptionUser = {
  id: string
  email: string
  plan: string
  status: string
  expires_at: string | null
}

const ADMIN_EMAIL = "domainkc1@yahoo.com"

export function AdminSubscriptions() {
  const [loading, setLoading] = useState(false)

  const [authorized, setAuthorized] =
    useState(false)

  const [users, setUsers] = useState<
    SubscriptionUser[]
  >([])

  // LOAD USERS
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        // ADMIN CHECK
        if (user?.email !== ADMIN_EMAIL) {
          return
        }

        setAuthorized(true)

        // GET FACTORIES
        const { data: factories } = await supabase
          .from("factories")
          .select("user_id")

        if (!factories) return

        const userIds = factories
          .map((f) => f.user_id)
          .filter(Boolean)

        if (userIds.length === 0) return

        // GET SUBSCRIPTIONS
        const { data: subscriptions } =
          await supabase
            .from("subscriptions")
            .select("*")
            .in("user_id", userIds)

        // GET AUTH USERS
        const finalUsers: SubscriptionUser[] = []

        for (const id of userIds) {
          const subscription = subscriptions?.find(
            (s) => s.user_id === id
          )

          finalUsers.push({
            id,
            email: id,
            plan:
              subscription?.plan || "free",
            status:
              subscription?.status ||
              "inactive",
            expires_at:
              subscription?.expires_at || null,
          })
        }

        setUsers(finalUsers)

      } catch (error) {
        console.error(error)
      }
    }

    loadUsers()
  }, [])

  // ACTIVATE PRO
  const activatePro = async (
    userId: string
  ) => {
    try {
      setLoading(true)

      const now = new Date()

      const expiry = new Date()

      expiry.setDate(
        expiry.getDate() + 30
      )

      const { error } = await supabase
        .from("subscriptions")
        .upsert({
          user_id: userId,
          plan: "pro",
          status: "active",
          started_at:
            now.toISOString(),
          expires_at:
            expiry.toISOString(),
        })

      if (error) {
        alert(error.message)
        return
      }

      alert("Pro activated")

      window.location.reload()

    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  // DEACTIVATE
  const deactivateUser = async (
    userId: string
  ) => {
    try {
      setLoading(true)

      const { error } = await supabase
        .from("subscriptions")
        .upsert({
          user_id: userId,
          plan: "free",
          status: "inactive",
        })

      if (error) {
        alert(error.message)
        return
      }

      alert("Subscription removed")

      window.location.reload()

    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  // BLOCK NON-ADMINS
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
            key={user.id}
            className="bg-white rounded-2xl p-5 shadow-sm space-y-3"
          >

            <div>
              <p className="text-xs text-gray-500">
                User ID
              </p>

              <p className="text-sm break-all">
                {user.id}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Plan
              </p>

              <p className="font-semibold capitalize">
                {user.plan}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Status
              </p>

              <p className="capitalize">
                {user.status}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Expiry
              </p>

              <p>
                {user.expires_at
                  ? new Date(
                      user.expires_at
                    ).toLocaleDateString()
                  : "No expiry"}
              </p>
            </div>

            <div className="flex gap-2 flex-wrap">

              <Button
                disabled={loading}
                onClick={() =>
                  activatePro(user.id)
                }
              >
                Activate Pro
              </Button>

              <Button
                variant="destructive"
                disabled={loading}
                onClick={() =>
                  deactivateUser(user.id)
                }
              >
                Deactivate
              </Button>

            </div>

          </div>
        ))}

      </div>

    </div>
  )
}