import Mounting from "../utils/render";
import fetchAPI from "../utils/fetchApi";

function getTopScore() {
  const elementID = "topscore";
  const BASE_URL = "https://api.football-data.org/v2/";
  const EPL = 2021;

  const API_KEY_FOOTBALL = "57f4d7173b344e88a523307718277655";
  const ENDPOINT_TOPSCORE = `${BASE_URL}competitions/${EPL}/scorers?limit=3`;

  fetchAPI(ENDPOINT_TOPSCORE, {
    headers: { "X-Auth-Token": API_KEY_FOOTBALL },
  })
    .then((data) => {
      const topScore = showTopScore(data);
      Mounting(elementID).render(topScore);
    })
    .catch(() => Mounting(elementID).error());
}

function showTopScore(players) {
  let playersHTML = "";

  players.scorers.forEach((player) => {
    playersHTML += `
    <tr>
        <td>${player.player.name}</td>
        <td>${player.team.name}</td>
        <td class="center">${player.numberOfGoals}</td>
    </tr>
    `;
  });

  return playersHTML;
}

export default getTopScore;
