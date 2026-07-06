import {
  useEffect,
  useState,
} from "react"

import { useLocation } from "wouter"

import { useAuth } from "@/contexts/AuthContext"

import {
  hasAppAccess,
} from "@/lib/subscription"

import { supabase } from "@/lib/supabase"
import { getCurrentFactory } from "@/lib/current-factory"

import {
  SubscriptionExpired,
} from "@/components/screens/subscription-expired"

export function ProtectedRoute({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading } =
    useAuth()

  const [, navigate] =
    useLocation()

  const [
    checkingAccess,
    setCheckingAccess,
  ] = useState(true)

  const [
    accessAllowed,
    setAccessAllowed,
  ] = useState(false)

  useEffect(() => {
    const checkAccess =
      async () => {
        try {
          if (
            !loading &&
            !user
          ) {
            navigate("/")

            return
          }

          if (!user) {
            return
          }

                   const factory =
            await getCurrentFactory()

          if (!factory) {
            setAccessAllowed(false)
            return
          }

          if (factory.role === "owner") {

            // OWNER — CHECK OWN SUBSCRIPTION
            const allowed =
              await hasAppAccess()

            setAccessAllowed(allowed)

          } else {

            // TEAM MEMBER — INHERIT FROM FACTORY OWNER'S SUBSCRIPTION
            // Derive owner from factory_users (safest source of truth)
            const { data: ownerMembership } =
              await supabase
                .from("factory_users")
                .select("user_id")
                .eq("factory_id", factory.id)
                .eq("role", "owner")
                .eq("is_active", true)
                .limit(1)
                .maybeSingle()

            if (!ownerMembership) {
              setAccessAllowed(false)
              return
            }

            const { data: ownerSub } =
              await supabase
                .from("saas_customers")
                .select("status")
                .eq("user_id", ownerMembership.user_id)
                .maybeSingle()

            const ownerHasAccess =
              ownerSub?.status === "Trial" ||
              ownerSub?.status === "Active"

            setAccessAllowed(
              ownerHasAccess ?? false
            )

          }

        } catch (error) {
          console.error(
            error
          )

          setAccessAllowed(
            false
          )

        } finally {
          setCheckingAccess(
            false
          )
        }
      }

    checkAccess()
  }, [
    user,
    loading,
    navigate,
  ])

  // AUTH LOADING

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-sm text-gray-500">
        Loading AquaOps...
      </div>
    )
  }

  // NO USER

  if (!user) {
    return null
  }

  // ACCESS CHECK

  if (
    checkingAccess
  ) {
    return (
      <div className="h-screen flex items-center justify-center text-sm text-gray-500">
        Checking subscription...
      </div>
    )
  }

  // SUBSCRIPTION EXPIRED

  if (
    !accessAllowed
  ) {
    return (
      <SubscriptionExpired />
    )
  }

  // AUTHORIZED

  return <>{children}</>
}
