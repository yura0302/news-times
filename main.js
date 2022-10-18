// 버튼 가져오고
// 리스트 배열 번호별로 쿼리 다르게 해서 링크로 가져오기

let news = [];
let menus = document.querySelectorAll(".menus button ");
menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByTopic(event))
);
const getLatestNews = async () => {
  let url = new URL(
    `https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=business&page_size=1`
  );
  let header = new Headers({
    "x-api-key": "7UxLcWBqI7dSZ17-XFh7r0WcrKsXGYdwpQMuxypSDFQ",
  });
  let response = await fetch(url, { headers: header });
  let data = await response.json();
  news = data.articles;
  console.log(news);

  render();
};

const getNewsByTopic = async (event) => {
  console.log("타겟", event.target.textContent);
  let topic = event.target.textContent.toLowerCase();
  let url = new URL(
    `https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=1&topic=${topic}`
  );
  let header = new Headers({
    "x-api-key": "7UxLcWBqI7dSZ17-XFh7r0WcrKsXGYdwpQMuxypSDFQ",
  });
  let response = await fetch(url, { headers: header });
  let data = await response.json();
  news = data.articles;
  render();
};

const render = () => {
  let newsHTML = "";
  newsHTML = news
    .map((item) => {
      return ` <div class="row news">
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

getLatestNews();
