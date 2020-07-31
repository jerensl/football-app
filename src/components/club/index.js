import mouting from "../../utils/render"
import fetchAPI from "../../utils/fetchApi"

async function getClub() {
  const BASE_URL = "https://api.football-data.org/v2/"
  const CLUB_ID = new URLSearchParams(window.location.search).get("id")

  const API_KEY_FOOTBALL = "57f4d7173b344e88a523307718277655"

  return await fetchAPI(`${BASE_URL}teams/${CLUB_ID}`, {
    headers: { "X-Auth-Token": API_KEY_FOOTBALL },
  })
}

function renderClub() {
  getClub()
    .then(async (data) => {
      const elmClub = await showClub(data)
      mouting("club").render(elmClub)
    })
    .catch(() => mouting("club").error())
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

  const HTML = `
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

  return HTML
}

export { getClub, renderClub }
