let news = [];
const getLatestNews = async () => {
  let url = new URL(
    `https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=business`
  );
  let header = new Headers({
    "x-api-key": "PnKgA8_ghfRH9WNk05IF0TkfsERh8Xl1RAxqrzN6dGI",
  });
  let response = await fetch(url, { headers: header });
  let data = await response.json();
  news = data.articles;
  console.log(news);
};

getLatestNews();
