import mouting from "../utils/render"
import fetchAPI from "../utils/fetchApi"
import moment from "moment"

function mathces() {
  const elementID = "match"
  const BASE_URL = "https://api.football-data.org/v2/"
  const EPL = 2021

  const API_KEY_FOOTBALL = "57f4d7173b344e88a523307718277655"

  const dateToday = moment().format().slice(0, 10)
  const dateNextWeek = moment().add(1, "week").format().slice(0, 10)

  const ENDPOINT_MATCHES = `${BASE_URL}competitions/${EPL}/matches?dateFrom=${dateToday}&dateTo=${dateNextWeek}&status=SCHEDULED`

  fetchAPI(ENDPOINT_MATCHES, {
    headers: { "X-Auth-Token": API_KEY_FOOTBALL },
  })
    .then((data) => {
      const match = showMatch(data)
      mouting(elementID).render(match)
    })
    .catch(() => mouting(elementID).error())
}

function showMatch(data) {
  let matches = ""
  let count = 1

  data.matches.forEach((match) => {
    matches += `
    <h6><b>Matchday ${count++} </b></h6>
    <div class="card match-card row center-align">
    
    <div class="col s4">
    <p>Home</p>
    <p><b>${match.homeTeam.name}</b></p>
    </div>
    
    <div class="col s4 match-time">
    <h6><b>VS</b></h6>
    <p>${match.utcDate.slice(0, 10)}</p>
    <p>${match.utcDate.slice(11, 16)} UTC</p>
    </div>

    <div class="col s4">
      <p>Away</p>
      <p><b>${match.awayTeam.name}</b></p>
    </div>

     </div>
    `
  })

  return matches
}

export default mathces
