
import axios from 'axios';
import config from '../../config/config.js'; // Import mo rin kung saan nandito yung config file mo
import { callApi } from '../../services/apiService.js';

function handleSearchCommand(senderPsid, query) {
  // Example API call
  let apiUrl = `https://api.example.com/search?q=${encodeURIComponent(query)}`;

  callApi(apiUrl)
    .then(data => {
      // Process data and send response back to user
      let response = {
        text: `Search results for "${query}": ${data.results}`
      };
      sendResponse(senderPsid, response);
    })
    .catch(error => {
      // Handle API call error
      console.error('Error fetching data:', error);
      let response = {
        text: `Error fetching search results for "${query}"`
      };
      sendResponse(senderPsid, response);
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

export { handleSearchCommand };
