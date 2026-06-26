import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export function useIsAdmin() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const check = async () => {
      try {
        if (!supabase) {
          setLoading(false)
          return
        }

        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user?.email) {
          setIsAdmin(false)
          setLoading(false)
          return
        }

        const { data } = await supabase
          .from("admin_users")
          .select("id")
          .eq("email", user.email)
          .maybeSingle()

        setIsAdmin(!!data)
      } catch {
        setIsAdmin(false)
      } finally {
        setLoading(false)
      }
    }

    check()
  }, [])

  return { isAdmin, loading }
}