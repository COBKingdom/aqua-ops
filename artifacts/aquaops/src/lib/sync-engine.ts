import { supabase }              from "@/lib/supabase"
import {
  getPending, updateStatus, removeSynced,
  recoverOrphans, setMeta, getMeta, QueuedRecord,
} from "@/lib/offline-db"

const PING_URL       = "https://www.gstatic.com/generate_204"
const LAST_SYNC_KEY  = "last_sync_at"

export async function validateConnectivity(): Promise<boolean> {
  if (!navigator.onLine) return false
  try {
    await fetch(PING_URL, { mode: "no-cors", cache: "no-store" })
    return true
  } catch {
    return false
  }
}

export async function getLastSyncAt(): Promise<string | null> {
  return getMeta(LAST_SYNC_KEY)
}

export interface SyncResult {
  synced: number
  errors: number
}

async function syncRecord(record: QueuedRecord): Promise<boolean> {
  if (!supabase) return false
  await updateStatus(record.local_id, "syncing")

  try {
    if (record.type === "sales") {
      const payload = record.payload as Record<string, unknown>
      const { error } = await supabase
        .from("sales")
        .upsert([{ ...payload, local_id: record.local_id }], {
          onConflict:       "local_id",
          ignoreDuplicates: true,
        })
      if (error) throw error
    }

    if (record.type === "expenses") {
      const payload = record.payload as Record<string, unknown>
      const { error } = await supabase
        .from("expenses")
        .upsert([{ ...payload, local_id: record.local_id }], {
          onConflict:       "local_id",
          ignoreDuplicates: true,
        })
      if (error) throw error
    }

    if (record.type === "production") {
      const { record: prodPayload, losses } = record.payload as {
        record: Record<string, unknown>
        losses: Record<string, unknown>[]
      }

      // Try insert; if local_id already exists (23505), fetch existing ID and skip losses
      const { data: inserted, error: prodErr } = await supabase
        .from("production")
        .insert([{ ...prodPayload, local_id: record.local_id }])
        .select("id")
        .single()

      if (prodErr) {
        if (prodErr.code === "23505") {
          // Already synced — idempotent, treat as success
        } else {
          throw prodErr
        }
      } else if (inserted && losses.length > 0) {
        const lossRows = losses.map(l => ({
          ...l,
          production_id: (inserted as { id: string | number }).id,
        }))
        const { error: lossErr } = await supabase
          .from("production_losses")
          .insert(lossRows)
        if (lossErr) console.error("Loss insert error:", lossErr)
      }
    }

    await updateStatus(record.local_id, "synced", {
      synced_at: new Date().toISOString(),
    })
    return true

  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error"
    await updateStatus(record.local_id, "error", { error_message: msg })
    return false
  }
}

export async function runSync(): Promise<SyncResult> {
  await recoverOrphans()
  const pending = await getPending()
  let synced = 0
  let errors = 0

  for (const record of pending) {
    const ok = await syncRecord(record)
    if (ok) synced++; else errors++
  }

  if (synced > 0) {
    await removeSynced()
    await setMeta(LAST_SYNC_KEY, new Date().toISOString())
  }

  return { synced, errors }
}