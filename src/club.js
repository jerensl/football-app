import "./css/materialize.min.css"
import app from "./utils/materialize.min.js"
import "./css/club.css"
import { initDB, findFootballDBbyID, footballDB } from "./utils/database"
import { getClub, renderClub } from "./components/club/index"
import squad from "./components/club/squad"
import result from "./components/club/results"
import fixtures from "./components/club/fixtures"

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    registerServiceWorker()
  })
} else {
  console.log("ServiceWorker not supported yet in this browser!")
}

function registerServiceWorker() {
  return navigator.serviceWorker
    .register("/sw.js")
    .then(function (registration) {
      console.log("Service worker registered successfully!")
      return registration
    })
    .catch(function (err) {
      console.error("Service worker registeration failed!", err)
    })
}

document.addEventListener("DOMContentLoaded", async function () {
  const saveButton = document.querySelector(".fixed-action-btn")
  const instances = M.FloatingActionButton.init(saveButton, {})
  const CLUB_ID = new URLSearchParams(window.location.search).get("id")

  initDB()
  renderClub()
  squad()
  result()
  fixtures()

  const findFav = await findFootballDBbyID(parseInt(CLUB_ID))

  if (findFav) {
    document.getElementById("save-icons").innerHTML = "delete"
  } else {
    document.getElementById("save-icons").innerHTML = "save"
  }

  saveButton.onclick = () => {
    getClub().then((data) => {
      footballDB(parseInt(CLUB_ID), data)
    })
  }

  const elems = document.querySelector(".tabs")
  const instance = M.Tabs.init(elems, { swipeable: true })
})
