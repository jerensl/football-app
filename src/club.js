import getClub from "./components/clubDetail"
import "./css/materialize.min.css"
import app from "./utils/materialize.min.js"
import "./css/club.css"
import { database } from "./utils/idxDB"
import { openDB } from "idb"

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    registerServiceWorker()
    // requestPermission()
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

// if ("serviceWorker" in navigator) {
//   registerServiceWorker();
// } else {
//   console.log("ServiceWorker not supported yet in this browser!");
// }

// function registerServiceWorker() {
//   return navigator.serviceWorker
//     .register("/sw.js")
//     .then(function (registration) {
//       console.log("Service worker registered successfully!");
//       return registration;
//     })
//     .catch(function (err) {
//       console.error("Service worker registeration failed!", err);
//     });
// }

document.addEventListener("DOMContentLoaded", function () {
  // const saveButton = document.querySelector(".fixed-action-btn")
  // const instances = M.FloatingActionButton.init(saveButton, {})

  // database()

  console.log("Club running....")
  getClub()

  // saveButton.onclick = () => {
  //   getClub().then(async (data) => {
  //     const db = await openDB("football-app", 1)
  //     const tx = db.transaction("favorite", "readwrite")

  //     tx.store.put(data)
  //     tx.done
  //   })
  // }

  // saveButton.onclick = () => {
  //   getClub().then(async (data) => {
  //     const clubFound = await idxDB.checkFavClubByID(data.id);

  //     if (!clubFound) {
  //       idxDB.addFavClub(data);
  //       M.toast({ html: "add Favorite Club" });
  //       document.getElementById("save-icons").innerHTML = "delete";
  //     } else {
  //       idxDB.deleteFavClub(data.id);
  //       M.toast({ html: "delete Favorite Club" });
  //       document.getElementById("save-icons").innerHTML = "save";
  //     }
  //   });
  // };

  const elems = document.querySelector(".tabs")
  const instance = M.Tabs.init(elems, { swipeable: true })
})
