import Mounting from "../utils/render";
import fetchAPI from "../utils/fetchApi";

async function getNews() {
  const elementID = "news-football";
  let favoriteTeam = "Manchester United";
  const API_KEY_NEWS = "d2f43a96d36343879ff924909fd2f254";
  const ENDPOINT_NEWS = `https://newsapi.org/v2/everything?q=${favoriteTeam}&language=id&apiKey=${API_KEY_NEWS}`;

  fetchAPI(ENDPOINT_NEWS, { mode: "cors" })
    .then((data) => {
      const news = newsElement(data);
      Mounting(elementID).render(news);
    })
    .catch((err) => Mounting(elementID).error());
}

function newsElement(data) {
  let newsHTML = "";

  data.articles.forEach((news) => {
    newsHTML += `
    <div class="col s12 m7">
    <div class="card ">
      <div class="card-image">
        <img class="news-img" src="${news.urlToImage.replace(
          /^http:\/\//i,
          "https://"
        )}">
      </div>
      <div class="card-stacked">
        <div class="card-content">
          <p>${news.description}</p>
        </div>
        <div class="card-action">
          <a href="${news.url}">Read More</a>
        </div>
      </div>
    </div>
  </div>
    `;
  });
  return newsHTML;
}

export default getNews;
