import Mounting from "../utils/render";
import fetchAPI from "../utils/fetchApi";

function getMatch() {
  const elementID = "match";
  const BASE_URL = "https://api.football-data.org/v2/";
  const EPL = 2021;

  const API_KEY_FOOTBALL = "57f4d7173b344e88a523307718277655";

  const addZero = (n) => {
    return n < 10 ? "0" + n : n;
  };

  let today = new Date();
  let day = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();
  let dateNow = year + "-" + addZero(month) + "-" + addZero(day);

  let nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);
  let nDay = nextWeek.getDate();
  let nMonth = nextWeek.getMonth() + 1;
  let nYear = nextWeek.getFullYear();
  let dateTo = nYear + "-" + addZero(nMonth) + "-" + addZero(nDay);

  const ENDPOINT_MATCHES = `${BASE_URL}competitions/${EPL}/matches?dateFrom=${dateNow}&dateTo=${dateTo}&status=SCHEDULED`;

  fetchAPI(ENDPOINT_MATCHES, {
    headers: { "X-Auth-Token": API_KEY_FOOTBALL },
  })
    .then((data) => {
      const match = showMatch(data);
      Mounting(elementID).render(match);
    })
    .catch(() => Mounting(elementID).error());
}

function showMatch(data) {
  let matches = "";
  let count = 1;

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
    `;
  });

  return matches;
}

export default getMatch;
