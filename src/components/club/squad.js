import mouting from "../../utils/render"
import fetchAPI from "../../utils/fetchApi"

async function squad() {
  const BASE_URL = "https://api.football-data.org/v2/"
  const CLUB_ID = new URLSearchParams(window.location.search).get("id")

  const API_KEY_FOOTBALL = "57f4d7173b344e88a523307718277655"

  await fetchAPI(`${BASE_URL}teams/${CLUB_ID}`, {
    headers: { "X-Auth-Token": API_KEY_FOOTBALL },
  })
    .then(async (data) => {
      showSquad(data)
    })
    .catch(() => mouting().error())
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

export default squad
