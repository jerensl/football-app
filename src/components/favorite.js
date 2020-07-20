async function showFavorite() {
  let favorite = "";

  const favoriteData = await idxDB.checkFavClub();

  if (!favoriteData[0]) {
    favorite += `
      <h6 class="center">
      You dont have Favorite Team
      </h6>
    `;

    document.getElementById("favorite-club").innerHTML = favorite;
  }

  favoriteData.forEach((club) => {
    favorite += `
      <div class="card club-card row center-align z-depth-0">
      <div class="col s12">
      <img class="fav-img" src="${club.crestUrl.replace(
        /^http:\/\//i,
        "https://"
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
  
      <button onClick="idxDB.deleteFavClub(${
        club.id
      })" class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">clear</i></button>
   </div>
      `;
  });

  document.getElementById("favorite-club").innerHTML = favorite;
}
