import mouting from "../../utils/render"
import fetchAPI from "../../utils/fetchApi"

async function getFixtures() {
  const BASE_URL = "https://api.football-data.org/v2/"
  const CLUB_ID = new URLSearchParams(window.location.search).get("id")

  const API_KEY_FOOTBALL = "57f4d7173b344e88a523307718277655"

  const ENDPOINT_MATCH = `${BASE_URL}teams/${CLUB_ID}/matches?status=`

  await fetchAPI(ENDPOINT_MATCH + "SCHEDULED", {
    headers: { "X-Auth-Token": API_KEY_FOOTBALL },
  }).then((data) => {
    showMatches(data)
  })
}

function showMatches(data) {
  let match = ""

  data.matches.forEach((matches) => {
    match += `
    <div class="col s12">
      <h6><b>${matches.competition.name}</b></h6>
    </div>
    <div class="col s5">
      <h6><b>${matches.homeTeam.name}</b></h6>
    </div>
    <div class="col s2 matches-time">
      <p>${matches.utcDate.slice(11, 16)}</p>
    </div>
    <div class="col s5">
      <h6><b>${matches.awayTeam.name}</b></h6>
   </div>
   <div class="col s12">
   <p> ${matches.utcDate.slice(0, 10)}</p>
 </div>
   <div class="col s12 divider"></div>
    `
  })

  document.getElementById("matches").innerHTML = match
}

export default getFixtures
