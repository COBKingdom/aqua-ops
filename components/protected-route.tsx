"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"

export function ProtectedRoute({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading } = useAuth()

  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/onboarding")
    }
  }, [user, loading, router])

  // WAIT FOR AUTH
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

  // AUTHENTICATED
  return <>{children}</>
}