import { openDB, IDBPDatabase } from "idb"

export type RecordType = "sales" | "production" | "expenses"
export type SyncStatus  = "pending" | "syncing" | "synced" | "error"

export interface QueuedRecord {
  local_id:      string
  type:          RecordType
  payload:       unknown
  created_at:    string
  sync_status:   SyncStatus
  synced_at:     string | null
  error_message: string | null
}

const DB_NAME    = "aquaops_offline_v1"
const DB_VERSION = 1
let _db: IDBPDatabase | null = null

async function getDB(): Promise<IDBPDatabase> {
  if (_db) return _db
  _db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      const store = db.createObjectStore("queue", { keyPath: "local_id" })
      store.createIndex("by_status", "sync_status")
      store.createIndex("by_type",   "type")
      db.createObjectStore("meta", { keyPath: "key" })
    },
  })
  return _db
}

export async function enqueue(type: RecordType, payload: unknown): Promise<string> {
  const db      = await getDB()
  const local_id = crypto.randomUUID()
  await db.put("queue", {
    local_id,
    type,
    payload,
    created_at:    new Date().toISOString(),
    sync_status:   "pending",
    synced_at:     null,
    error_message: null,
  } satisfies QueuedRecord)
  return local_id
}

export async function getPending(): Promise<QueuedRecord[]> {
  const db = await getDB()
  return db.getAllFromIndex("queue", "by_status", "pending") as Promise<QueuedRecord[]>
}

export async function updateStatus(
  local_id: string,
  status: SyncStatus,
  extra?: { synced_at?: string; error_message?: string }
): Promise<void> {
  const db  = await getDB()
  const rec = await db.get("queue", local_id) as QueuedRecord | undefined
  if (!rec) return
  await db.put("queue", {
    ...rec,
    sync_status:   status,
    synced_at:     extra?.synced_at     ?? rec.synced_at,
    error_message: extra?.error_message ?? rec.error_message,
  })
}

export async function removeSynced(): Promise<void> {
  const db     = await getDB()
  const synced = await db.getAllFromIndex("queue", "by_status", "synced") as QueuedRecord[]
  const tx     = db.transaction("queue", "readwrite")
  await Promise.all(synced.map(r => tx.store.delete(r.local_id)))
  await tx.done
}

export async function recoverOrphans(): Promise<void> {
  const db      = await getDB()
  const syncing = await db.getAllFromIndex("queue", "by_status", "syncing") as QueuedRecord[]
  for (const r of syncing) {
    await db.put("queue", { ...r, sync_status: "pending", error_message: "Recovered after restart" })
  }
}

export async function countPending(): Promise<number> {
  const db = await getDB()
  return db.countFromIndex("queue", "by_status", "pending")
}

export async function countErrors(): Promise<number> {
  const db = await getDB()
  return db.countFromIndex("queue", "by_status", "error")
}

export async function getMeta(key: string): Promise<string | null> {
  const db  = await getDB()
  const row = await db.get("meta", key) as { key: string; value: string } | undefined
  return row?.value ?? null
}

export async function setMeta(key: string, value: string): Promise<void> {
  const db = await getDB()
  await db.put("meta", { key, value })
}