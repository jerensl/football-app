import { findAllFavClub, deleteFavClubByID } from "../utils/database"
import mouting from "../utils/render"

async function favorite() {
  const elementByID = "favorite-club"

  const favorites = await findAllFavClub()

  if (!favorites[0]) {
    const emptyClubHTML = emptyClub()
    return mouting(elementByID).render(emptyClubHTML)
  }

  const favClubHTML = showFavorite(favorites)
  mouting(elementByID).render(favClubHTML)

  const favButton = document.querySelectorAll("#fav-button")

  favButton.forEach((elm) => {
    elm.onclick = (e) => {
      const id = e.currentTarget.value
      deleteFavClubByID(parseInt(id))
      document.getElementById(id).outerHTML = null
    }
  })
}

function emptyClub() {
  return `
  <h6 class="center">
  You dont have Favorite Team
  </h6>
`
}

function showFavorite(data) {
  let favorite = ""

  data.forEach((club) => {
    favorite += `
      <div id=${club.id} class="card club-card row center-align z-depth-0">
      <div class="col s12">
      <img class="fav-img" src="${club.crestUrl.replace(
        /^http:\/\//i,
        "https://",
      )}">
      </div>

      <div class="col s6">
      <p>Club</p>
      <p><b>${club.name}</b></p>
      </div>
  
      <div class="col s6">
        <p>Stadion</p>
        <p><b>${club.venue}</b></p>
      </div>
  
      <button value="${
        club.id
      }" id="fav-button" class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">clear</i></button>
   </div>
      `
  })

  return favorite
}

export default favorite
