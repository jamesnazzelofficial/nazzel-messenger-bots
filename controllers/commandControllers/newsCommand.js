
import axios from 'axios';
//import config from '../../config/config.js';

function handleNewsCommand(senderPsid, topic) {
  let apiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(topic)}&apiKey=${config.NEWS_API_KEY}`;

  axios.get(apiUrl)
    .then(response => {
      if (response.data.articles && response.data.articles.length > 0) {
        let articles = response.data.articles.slice(0, 5); // Limiting to 5 articles
        let responseText = `Here are the latest news articles on "${topic}":\n\n`;
        articles.forEach(article => {
          responseText += `${article.title}\n${article.url}\n\n`;
        });
        sendResponse(senderPsid, { text: responseText });
      } else {
        sendResponse(senderPsid, { text: `No news articles found on "${topic}".` });
      }
    })
    .catch(error => {
      console.error('Error fetching news:', error);
      sendResponse(senderPsid, { text: `Unable to fetch news on "${topic}". Please try again later.` });
    });
}

function sendResponse(senderPsid, response) {
  let requestBody = {
    recipient: {
      id: senderPsid
    },
    message: response
  };

  axios.post('https://graph.facebook.com/v12.0/me/messages', requestBody, {
    params: { access_token: config.PAGE_ACCESS_TOKEN }
  })
    .then(res => {
      console.log('Message sent successfully:', res.data);
    })
    .catch(error => {
      console.error('Unable to send message:', error);
    });
}

export { handleNewsCommand };
