import {
  createContext, useContext, useEffect,
  useState, useCallback, useRef,
} from "react"
import { validateConnectivity, runSync, getLastSyncAt } from "@/lib/sync-engine"
import { countPending, countErrors, recoverOrphans }    from "@/lib/offline-db"

type SyncState = "idle" | "syncing" | "success" | "error"

export interface OfflineContextType {
  isOnline:      boolean
  pendingCount:  number
  errorCount:    number
  isSyncing:     boolean
  syncState:     SyncState
  lastSyncAt:    string | null
  isQueueLarge:  boolean
  syncNow:       () => void
  refreshCounts: () => void
}

const OfflineContext = createContext<OfflineContextType>({
  isOnline:      true,
  pendingCount:  0,
  errorCount:    0,
  isSyncing:     false,
  syncState:     "idle",
  lastSyncAt:    null,
  isQueueLarge:  false,
  syncNow:       () => {},
  refreshCounts: () => {},
})

const LARGE_QUEUE_THRESHOLD = 50
const SUCCESS_HIDE_MS       = 4000

export function OfflineProvider({ children }: { children: React.ReactNode }) {
  const [isOnline,      setIsOnline]      = useState(navigator.onLine)
  const [pendingCount,  setPendingCount]  = useState(0)
  const [errorCount,    setErrorCount]    = useState(0)
  const [syncState,     setSyncState]     = useState<SyncState>("idle")
  const [lastSyncAt,    setLastSyncAt]    = useState<string | null>(null)
  const syncingRef = useRef(false)

  const refreshCounts = useCallback(async () => {
    const [p, e] = await Promise.all([countPending(), countErrors()])
    setPendingCount(p)
    setErrorCount(e)
  }, [])

  const doSync = useCallback(async () => {
    if (syncingRef.current) return
    const online = await validateConnectivity()
    if (!online) return
    syncingRef.current = true
    setSyncState("syncing")
    try {
      const { synced, errors } = await runSync()
      await refreshCounts()
      const ts = await getLastSyncAt()
      setLastSyncAt(ts)

      if (errors > 0) {
        setSyncState("error")
      } else if (synced > 0) {
        setSyncState("success")
        setTimeout(() => setSyncState("idle"), SUCCESS_HIDE_MS)
      } else {
        setSyncState("idle")
      }
    } finally {
      syncingRef.current = false
    }
  }, [refreshCounts])

  // On mount: recover orphans, load counts, sync leftover pending
  useEffect(() => {
    recoverOrphans().then(async () => {
      await refreshCounts()
      const ts = await getLastSyncAt()
      setLastSyncAt(ts)
      if (navigator.onLine) doSync()
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Connectivity event listeners
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      doSync()
    }
    const handleOffline = () => {
      setIsOnline(false)
      setSyncState("idle")
    }
    window.addEventListener("online",  handleOnline)
    window.addEventListener("offline", handleOffline)
    return () => {
      window.removeEventListener("online",  handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [doSync])

  return (
    <OfflineContext.Provider
      value={{
        isOnline,
        pendingCount,
        errorCount,
        isSyncing:    syncState === "syncing",
        syncState,
        lastSyncAt,
        isQueueLarge: pendingCount >= LARGE_QUEUE_THRESHOLD,
        syncNow:      doSync,
        refreshCounts,
      }}
    >
      {children}
    </OfflineContext.Provider>
  )
}

export function useOffline() {
  return useContext(OfflineContext)
}