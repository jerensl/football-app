import Mounting from "../utils/render"
import fetchAPI from "../utils/fetchApi"
import { clubDB } from "../utils/idxDB"

async function getClub() {
  const BASE_URL = "https://api.football-data.org/v2/"

  const API_KEY_FOOTBALL = "57f4d7173b344e88a523307718277655"
  const EPL = 2021

  const urlParams = new URLSearchParams(window.location.search)
  const CLUB_ID = urlParams.get("id")

  const ENDPOINT_CLUB = `${BASE_URL}teams/${CLUB_ID}`
  const ENDPOINT_MATCH = `${BASE_URL}teams/${CLUB_ID}/matches?status=`
  let clubInfo = {}

  const addZero = (n) => {
    return n < 10 ? "0" + n : n
  }

  const today = new Date()
  const day = today.getDate()
  const month = today.getMonth() + 1
  const year = today.getFullYear()
  const dateNow = year + "-" + addZero(month) + "-" + addZero(day)

  const beforeWeek = new Date()
  beforeWeek.setDate(beforeWeek.getDate())
  const nDay = beforeWeek.getDate()
  const nMonth = beforeWeek.getMonth()
  const nYear = beforeWeek.getFullYear()
  const dateBefore = nYear + "-" + addZero(nMonth) + "-" + addZero(nDay)

  await fetchAPI(ENDPOINT_CLUB, {
    headers: { "X-Auth-Token": API_KEY_FOOTBALL },
  })
    .then(async (data) => {
      clubInfo = data
      showClub(data)
      showSquad(data)
    })
    .catch((error) => console.log(error))

  await fetchAPI(ENDPOINT_MATCH + "SCHEDULED", {
    headers: { "X-Auth-Token": API_KEY_FOOTBALL },
  }).then((data) => {
    showMatches(data)
  })

  await fetchAPI(
    ENDPOINT_MATCH +
      "FINISHED" +
      `&dateFrom=${dateBefore}&dateTo=${dateNow}` +
      "&limit=10",
    {
      headers: { "X-Auth-Token": API_KEY_FOOTBALL },
    },
  ).then((data) => {
    showResults(data)
  })

  return clubInfo
}

async function showClub(clubData) {
  let coach = ""

  clubData.squad
    .filter((person) => {
      return person.role === "COACH"
    })
    .map((player) => {
      coach += `
        <b>${player.name}</b>
`
    })

  document.getElementById("club").innerHTML = `
  <div class="main-wrapper container">

    <div class="row club">
      <h4 class="col s12 m8 center-align" id="club-name"><b>${
        clubData.name
      }</b></h4>
      <div class="col s12 m4">
      <img src="${clubData.crestUrl.replace(/^http:\/\//i, "https://")}">
      </div>
    </div>
    <div class="card club-card row z-depth-0">

        <div class="col s12">
          <p><b>${clubData.venue}</b></p>
          <p><b>${clubData.address}</b></p>
        </div>

        <div class="col s6">
          <p>Fax</p>
          <p><b>${clubData?.phone ?? "-"}</b></p>
        </div>

        <div class="col s6">
          <p>Coach</p>
          <p>${coach}</p>
        </div>

        <div class="col s6">
          <p>Website</p>
          <a href="${clubData?.website}" target="_blank">
            <b>
              ${clubData?.website ?? "-"}
            </b>
          </a>
        </div>

        <div class="col s6">
          <p>Club Enquiries</p>
          <p><b>${clubData?.email ?? "-"}</b></p>
        </div>

     </div>
  </div>
  `

  // const favButton = await idxDB.checkFavClubByID(clubData.id);

  // if (!favButton) {
  //   document.getElementById("save-icons").innerHTML = "save";
  // } else {
  //   document.getElementById("save-icons").innerHTML = "delete";
  // }
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

const showSquad = (data) => {
  let players = ""

  data.squad
    .filter((player) => {
      return player.role.indexOf("PLAYER") > -1
    })
    .map((player) => {
      players += `
  <tr>
      <td>${player?.shirtNumber ?? "-"}</td>
      <td>${player.name}</td>
      <td>${player.nationality}</td>
      <td>${player.position}</td>
  </tr>
`
    })

  document.getElementById("players").innerHTML = players
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

export default getClub
