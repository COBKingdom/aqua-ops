import { useOffline } from "@/contexts/OfflineContext"

export function OfflineIndicator() {
  const {
    isOnline, pendingCount, errorCount,
    syncState, isQueueLarge, syncNow, lastSyncAt
  } = useOffline()

  // Fully online, idle, nothing pending — show nothing
  if (isOnline && syncState === "idle" && pendingCount === 0 && errorCount === 0) {
    return null
  }

  // ── SYNCING ──────────────────────────────────────────────────────────────
  if (syncState === "syncing") {
    return (
      <div className="mx-4 mb-2 flex items-center gap-2 bg-[#2563eb] text-white rounded-xl px-4 py-2.5 text-xs font-semibold shadow-sm">
        <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin flex-shrink-0" />
        <span>Syncing records…</span>
      </div>
    )
  }

  // ── SYNC COMPLETE (auto-hides via context setTimeout) ────────────────────
  if (syncState === "success") {
    return (
      <div className="mx-4 mb-2 flex items-center gap-2 bg-green-600 text-white rounded-xl px-4 py-2.5 text-xs font-semibold shadow-sm">
        <span>✅</span>
        <span>All records synced</span>
        {lastSyncAt && (
          <span className="opacity-75 ml-auto">
            {new Date(lastSyncAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        )}
      </div>
    )
  }

  // ── SYNC ERRORS ──────────────────────────────────────────────────────────
  if (syncState === "error") {
    return (
      <div className="mx-4 mb-2 flex items-center justify-between bg-red-50 border border-red-200 rounded-xl px-4 py-2.5 shadow-sm">
        <div className="flex items-center gap-2">
          <span>⚠️</span>
          <span className="text-xs font-semibold text-red-700">
            {errorCount} record{errorCount !== 1 ? "s" : ""} failed to sync
          </span>
        </div>
        <button
          onClick={syncNow}
          className="text-xs font-bold text-red-600 underline"
        >
          Retry
        </button>
      </div>
    )
  }

  // ── LARGE QUEUE WARNING ──────────────────────────────────────────────────
  if (isQueueLarge) {
    return (
      <div className="mx-4 mb-2 flex items-center gap-3 bg-yellow-50 border border-yellow-300 rounded-xl px-4 py-2.5 shadow-sm">
        <span className="flex-shrink-0">⚠️</span>
        <div>
          <p className="text-xs font-bold text-yellow-800">Large Offline Queue</p>
          <p className="text-[10px] text-yellow-700 mt-0.5">
            {pendingCount} records waiting — will sync automatically when online
          </p>
        </div>
      </div>
    )
  }

  // ── OFFLINE (standard / with pending) ───────────────────────────────────
  return (
    <div className="mx-4 mb-2 flex items-center justify-between bg-orange-500 text-white rounded-xl px-4 py-2.5 shadow-sm">
      <div className="flex items-center gap-2.5">
        <span className="w-2 h-2 bg-white rounded-full animate-pulse flex-shrink-0" />
        <div>
          <p className="text-xs font-bold">🟠 Offline Mode</p>
          {pendingCount > 0 && (
            <p className="text-[10px] opacity-90 mt-0.5">
              {pendingCount} record{pendingCount !== 1 ? "s" : ""} waiting to sync
            </p>
          )}
        </div>
      </div>
      {pendingCount > 0 && isOnline && (
        <button
          onClick={syncNow}
          className="text-xs font-bold bg-white text-orange-600 rounded-lg px-3 py-1 flex-shrink-0"
        >
          Sync Now
        </button>
      )}
    </div>
  )
}

// Need to add lastSyncAt to destructuring — patch the top of this component:
// const { isOnline, pendingCount, errorCount, syncState, isQueueLarge, syncNow, lastSyncAt } = useOffline()