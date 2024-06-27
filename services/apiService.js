
import axios from 'axios';
//import config from '../config/config.js';

function callApi(url) {
  return axios.get(url)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(`Error fetching data from ${url}:`, error);
      throw error;
    });
}

function callWeatherApi(location) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${config.WEATHER_API_KEY}&units=metric`;
  return callApi(apiUrl)
    .then(data => {
      return {
        weather: `Temperature: ${data.main.temp}°C, ${data.weather[0].description}`
      };
    });
}

function callNewsApi(topic) {
  let apiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(topic)}&apiKey=${config.NEWS_API_KEY}`;
  return callApi(apiUrl)
    .then(data => {
      if (data.articles && data.articles.length > 0) {
        return data.articles.map(article => ({
          title: article.title,
          description: article.description,
          url: article.url
        }));
      } else {
        return [];
      }
    });
}

export { callApi, callWeatherApi, callNewsApi };
