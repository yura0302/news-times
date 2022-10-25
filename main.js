const main = config.apikey;
const BASE_URL = "https://api.newscatcherapi.com/v2";
const menus = document.querySelectorAll(".menus button ");
const searchButton = document.getElementById("search-button");
let news = [];
let searchInput = document.getElementById("search-input");
let url;

menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByTopic(event))
);

searchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("search-button").click();
  }
});

const getNews = async () => {
  let header = new Headers({
    "x-api-key": main,
  });
  let response = await fetch(url, { headers: header });
  let data = await response.json();
  news = data.articles;
  console.log(news);
  render();
};

const getLatestNews = async () => {
  url = new URL(
    `${BASE_URL}/latest_headlines?countries=KR&topic=business&page_size=1`
  );
  getNews();
};

const getNewsByKeyword = async () => {
  let keyword = document.getElementById("search-input").value;
  url = new URL(`${BASE_URL}/search?q=${keyword}&countries=KR&page_size=1`);
  getNews();
};

const getNewsByTopic = async (event) => {
  let topic = event.target.textContent.toLowerCase();
  url = new URL(
    `${BASE_URL}/latest_headlines?countries=KR&page_size=1&topic=${topic}`
  );
  getNews();
};

const render = () => {
  let newsHTML = "";
  newsHTML = news
    .map((item) => {
      return `<div class="row news">
  <div class="col-lg-4">
    <img
      class="news-image-size"
      alt="#"
      src="${
        item.media ||
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"
      }"
    />
  </div>
  <div class="col-lg-8">
    <h2>${item.title}</h2>
    <p>${
      item.summary == null || item.summary == ""
        ? "내용없음"
        : item.summary.length > 200
        ? item.summary.substr(0, 200) + "..."
        : item.summary
    }</p>
    <div>${item.rights || "no source"} | ${
        moment(item.published_date).startOf("day").fromNow() // 18 hours ago
      }</div>
  </div>
</div>`;
    })
    .join("");

  console.log(newsHTML);
  document.getElementById("news-board").innerHTML = newsHTML;
};
searchButton.addEventListener("click", getNewsByKeyword);
getLatestNews();

