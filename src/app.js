import styles from "./css/materialize.min.css"
import "./css/styles.css"
import app from "./utils/materialize.min.js"
import bootstrap from "./utils/bootstrap"

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    registerServiceWorker()
    requestPermission()
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

function requestPermission() {
  if ("Notification" in window) {
    Notification.requestPermission().then(function (result) {
      if (result === "denied") {
        console.log("Fitur notifikasi tidak diijinkan.")
        return
      } else if (result === "default") {
        console.error("Pengguna menutup kotak dialog permintaan ijin.")
        return
      }
    })
  }
}
