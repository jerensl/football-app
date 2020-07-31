import mouting from "../utils/render"
import fetchAPI from "../utils/fetchApi"

async function getStandings() {
  const elementID = "klasemen"
  const elementTS = "league-title"
  const BASE_URL = "https://api.football-data.org/v2/"
  const API_KEY_FOOTBALL = "57f4d7173b344e88a523307718277655"
  const EPL = 2021
  const ENDPOINT_COMPETITION = `${BASE_URL}competitions/${EPL}/standings`

  fetchAPI(ENDPOINT_COMPETITION, {
    headers: { "X-Auth-Token": API_KEY_FOOTBALL },
  })
    .then((data) => {
      const standings = showStandings(data)
      const titleLeague = showTitleLeague(data)
      mouting(elementTS).render(titleLeague)
      mouting(elementID).render(standings)
    })
    .catch(() => mouting(elementID).error())
}

function showTitleLeague(data) {
  let title = `
  <h5>
  <b>${data.competition.name}</b>
  </h5>
  `
  return title
}

function showStandings(data) {
  let standings = ""

  data.standings[0].table.forEach((standing) => {
    standings += `
              <tr rel="preconnect" onclick="location.href='./club.html?id=${
                standing.team.id
              }'">
                  <td class="center">${standing.position}</td>
                  <td>
                  <img class="emblem" alt="${standing.team.name}" 
                    src="${standing.team.crestUrl.replace(
                      /^http:\/\//i,
                      "https://",
                    )}" alt="badge"/>
                    <span>${standing.team.name}</span>
                  </td>
                  <td>${standing.playedGames}</td>
                  <td>${standing.won}</td>
                  <td>${standing.draw}</td>
                  <td>${standing.lost}</td>
                  <td class="center">${standing.points}</td>
              </tr>
      `
  })

  const htmlElement = `<table class="striped">
  <thead>
    <tr>
      <th class="center">Pos</th>
      <th>Club</th>
      <th>P</th>
      <th>W</th>
      <th>D</th>
      <th>L</th>
      <th class="center">PTS</th>
    </tr>
  </thead>
  <tbody id="standings">${standings}</tbody>
</table>`

  return htmlElement
}

export default getStandings
