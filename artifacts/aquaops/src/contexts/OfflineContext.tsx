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
  const [isOnline,     setIsOnline]     = useState(navigator.onLine)
  const [pendingCount, setPendingCount] = useState(0)
  const [errorCount,   setErrorCount]   = useState(0)
  const [syncState,    setSyncState]    = useState<SyncState>("idle")
  const [lastSyncAt,   setLastSyncAt]   = useState<string | null>(null)
  const syncingRef = useRef(false)

  const refreshCounts = useCallback(async () => {
    const [p, e] = await Promise.all([countPending(), countErrors()])
    console.log(`[AquaSync] Queue counts — pending: ${p}, errors: ${e}`)
    setPendingCount(p)
    setErrorCount(e)
  }, [])

  const doSync = useCallback(async () => {
    console.log("[AquaSync] doSync() called — syncingRef:", syncingRef.current, "online:", navigator.onLine)

    if (syncingRef.current) {
      console.log("[AquaSync] doSync() skipped — already syncing")
      return
    }

    const online = validateConnectivity()
    console.log("[AquaSync] validateConnectivity():", online)

    if (!online) {
      console.log("[AquaSync] doSync() aborted — not online")
      return
    }

    syncingRef.current = true
    setSyncState("syncing")
    console.log("[AquaSync] Sync started")

    try {
      const { synced, errors } = await runSync()
      await refreshCounts()
      const ts = await getLastSyncAt()
      setLastSyncAt(ts)

      if (errors > 0) {
        console.warn(`[AquaSync] Sync completed with ${errors} error(s)`)
        setSyncState("error")
      } else if (synced > 0) {
        console.log(`[AquaSync] Sync successful — ${synced} record(s) uploaded`)
        setSyncState("success")
        setTimeout(() => setSyncState("idle"), SUCCESS_HIDE_MS)
      } else {
        console.log("[AquaSync] Sync ran — nothing pending")
        setSyncState("idle")
      }
    } catch (err) {
      console.error("[AquaSync] Unexpected sync error:", err)
      setSyncState("error")
    } finally {
      syncingRef.current = false
    }
  }, [refreshCounts])

  // On mount: recover orphans, load counts, attempt sync
  useEffect(() => {
    console.log("[AquaSync] OfflineProvider mounted")
    recoverOrphans().then(async () => {
      await refreshCounts()
      const ts = await getLastSyncAt()
      setLastSyncAt(ts)
      if (navigator.onLine) {
        console.log("[AquaSync] Online at mount — attempting sync of any leftover records")
        doSync()
      }
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Connectivity event listeners
  useEffect(() => {
    const handleOnline = () => {
      console.log("[AquaSync] 🌐 'online' event fired — navigator.onLine:", navigator.onLine)
      setIsOnline(true)
      doSync()
    }
    const handleOffline = () => {
      console.log("[AquaSync] 📴 'offline' event fired")
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