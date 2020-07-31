import mouting from "../../utils/render"
import fetchAPI from "../../utils/fetchApi"
import moment from "moment"

async function getResult() {
  const BASE_URL = "https://api.football-data.org/v2/"
  const CLUB_ID = new URLSearchParams(window.location.search).get("id")

  const API_KEY_FOOTBALL = "57f4d7173b344e88a523307718277655"

  const ENDPOINT_MATCH = `${BASE_URL}teams/${CLUB_ID}/matches?status=`

  const dateToday = moment().format().slice(0, 10)
  const dateOneMonthBefore = moment().subtract(1, "month").format().slice(0, 10)

  await fetchAPI(
    ENDPOINT_MATCH +
      "FINISHED" +
      `&dateFrom=${dateOneMonthBefore}&dateTo=${dateToday}&limit=10`,
    {
      headers: { "X-Auth-Token": API_KEY_FOOTBALL },
    },
  ).then((data) => {
    showResults(data)
  })
}

function showResults(data) {
  let results = ""

  data.matches.forEach((matches) => {
    results += `
    <div class="col s12">
      <h6><b>${matches.competition.name}</b></h6>
    </div>
    <div class="col s5">
      <h6><b>${matches.homeTeam.name}</b></h6>
    </div>
    <div class="col s2 matches-time">
      <p><b>${matches.score.fullTime.homeTeam} VS ${
      matches.score.fullTime.awayTeam
    }</b></p>
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

  document.getElementById("results").innerHTML = results
}

export default getResult
