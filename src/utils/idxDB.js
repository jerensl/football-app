import { openDB } from "idb"

export async function database() {
  const db = await openDB("football-app", 1, {
    upgrade: (db, oldVersion, newVersion, transaction) => {
      if (!db.objectStoreNames.contains("favorite")) {
        db.createObjectStore("favorite", { keyPath: "id" })
      }
    },
  })

  db.close()
}
