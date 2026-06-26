import { useEffect } from "react"
import { useIsAdmin } from "@/lib/admin"

type AdminGuardProps = {
  setActiveTab: (tab: string) => void
  children: React.ReactNode
}

export function AdminGuard({ setActiveTab, children }: AdminGuardProps) {
  const { isAdmin, loading } = useIsAdmin()

  useEffect(() => {
    if (!loading && !isAdmin) {
      setActiveTab("dashboard")
    }
  }, [isAdmin, loading, setActiveTab])

  if (loading) return null
  if (!isAdmin) return null

  return <>{children}</>
}