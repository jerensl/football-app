import { openDB } from "idb"

export async function initDB() {
  const db = await openDB("football-app", 1, {
    upgrade: (db, oldVersion, newVersion, transaction) => {
      if (!db.objectStoreNames.contains("favorite")) {
        db.createObjectStore("favorite", { keyPath: "id" })
      }
    },
  })

  db.close()
}

export async function findFootballDBbyID(id) {
  const db = await openDB("football-app", 1)
  return db.get("favorite", id)
}

export async function findAllFavClub() {
  const db = await openDB("football-app", 1)
  return db.getAll("favorite")
}
export async function deleteFavClubByID(id) {
  const db = await openDB("football-app", 1)
  return db.delete("favorite", id)
}

export async function footballDB(id, data) {
  const db = await openDB("football-app", 1)
  let tx = db.transaction("favorite", "readwrite")

  let footballClub = await tx.objectStore("favorite").getKey(id)
  if (footballClub) {
    M.toast({ html: "deleted Favorite Club" })
    tx.objectStore("favorite").delete(id)
    document.getElementById("save-icons").innerHTML = "save"
  } else {
    M.toast({ html: "added Favorite Club" })
    tx.objectStore("favorite").add(data)
    document.getElementById("save-icons").innerHTML = "delete"
  }
}
