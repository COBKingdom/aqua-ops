"use client"

import { useEffect, useState } from "react"

import { supabase } from "@/lib/supabase"

import WaterFactoryApp from "@/components/water-factory-app"

import { AquaOpsEntry } from "@/components/aquaops-entry"

export default function AquaOpsPage() {
  const [loading, setLoading] =
    useState(true)

  const [authenticated, setAuthenticated] =
    useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        setAuthenticated(!!user)

      } catch (error) {
        console.error(error)

      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  if (loading) {
    return null
  }

  // NOT LOGGED IN
  if (!authenticated) {
    return <AquaOpsEntry />
  }

  // LOGGED IN
  return <WaterFactoryApp />
}