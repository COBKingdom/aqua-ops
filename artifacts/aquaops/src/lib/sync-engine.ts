import { supabase }              from "@/lib/supabase"
import {
  getPending, updateStatus, removeSynced,
  recoverOrphans, setMeta, getMeta, QueuedRecord,
} from "@/lib/offline-db"

const LAST_SYNC_KEY = "last_sync_at"

// ── Connectivity ────────────────────────────────────────────────────────────
// Trust navigator.onLine directly — a fetch ping races with network restoration
// and causes false negatives right after the 'online' event fires.
export function validateConnectivity(): boolean {
  return navigator.onLine
}

export async function getLastSyncAt(): Promise<string | null> {
  return getMeta(LAST_SYNC_KEY)
}

export interface SyncResult {
  synced: number
  errors: number
}

// ── Sync a single record ─────────────────────────────────────────────────────
async function syncRecord(record: QueuedRecord): Promise<boolean> {
  if (!supabase) {
    console.warn("[AquaSync] supabase client is null — skipping record", record.local_id)
    return false
  }

  console.log(`[AquaSync] Syncing ${record.type} record:`, record.local_id)
  await updateStatus(record.local_id, "syncing")

  try {
    // ── SALES ──────────────────────────────────────────────────────────────
    if (record.type === "sales") {
      const payload = record.payload as Record<string, unknown>
      console.log("[AquaSync] Inserting sale to Supabase:", payload)

      const { data, error } = await supabase
        .from("sales")
        .upsert([{ ...payload, local_id: record.local_id }], {
          onConflict:       "local_id",
          ignoreDuplicates: true,
        })
        .select()

      console.log("[AquaSync] Sales upsert response — data:", data, "error:", error)
      if (error) throw error
    }

    // ── EXPENSES ────────────────────────────────────────────────────────────
    if (record.type === "expenses") {
      const payload = record.payload as Record<string, unknown>
      console.log("[AquaSync] Inserting expense to Supabase:", payload)

      const { data, error } = await supabase
        .from("expenses")
        .upsert([{ ...payload, local_id: record.local_id }], {
          onConflict:       "local_id",
          ignoreDuplicates: true,
        })
        .select()

      console.log("[AquaSync] Expenses upsert response — data:", data, "error:", error)
      if (error) throw error
    }

    // ── PRODUCTION ──────────────────────────────────────────────────────────
    if (record.type === "production") {
      const { record: prodPayload, losses } = record.payload as {
        record: Record<string, unknown>
        losses: Record<string, unknown>[]
      }

      console.log("[AquaSync] Inserting production to Supabase:", prodPayload)
      console.log("[AquaSync] Associated losses:", losses)

      const { data: inserted, error: prodErr } = await supabase
        .from("production")
        .insert([{ ...prodPayload, local_id: record.local_id }])
        .select("id")
        .single()

      console.log("[AquaSync] Production insert response — data:", inserted, "error:", prodErr)

      if (prodErr) {
        // 23505 = unique_violation — record already synced, treat as success
        if (prodErr.code === "23505") {
          console.log("[AquaSync] Production already synced (duplicate local_id), treating as success")
        } else {
          throw prodErr
        }
      } else if (inserted && losses.length > 0) {
        const lossRows = losses.map(l => ({
          ...l,
          production_id: (inserted as { id: string | number }).id,
        }))
        console.log("[AquaSync] Inserting losses:", lossRows)

        const { error: lossErr } = await supabase
          .from("production_losses")
          .insert(lossRows)

        console.log("[AquaSync] Losses insert error:", lossErr)
        if (lossErr) console.error("[AquaSync] Loss insert failed (non-fatal):", lossErr)
      }
    }

    // ── MARK SYNCED ─────────────────────────────────────────────────────────
    await updateStatus(record.local_id, "synced", {
      synced_at: new Date().toISOString(),
    })
    console.log(`[AquaSync] ✅ Record synced:`, record.local_id)
    return true

  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : JSON.stringify(err)
    console.error(`[AquaSync] ❌ Record failed:`, record.local_id, msg)
    await updateStatus(record.local_id, "error", { error_message: msg })
    return false
  }
}

// ── Main sync runner ─────────────────────────────────────────────────────────
export async function runSync(): Promise<SyncResult> {
  console.group("[AquaSync] runSync() started")

  await recoverOrphans()
  const pending = await getPending()

  console.log(`[AquaSync] Pending records found: ${pending.length}`)
  pending.forEach(r => console.log(`  → ${r.type} | ${r.local_id} | status: ${r.sync_status}`))

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

  console.log(`[AquaSync] runSync() complete — synced: ${synced}, errors: ${errors}`)
  console.groupEnd()

  return { synced, errors }
}