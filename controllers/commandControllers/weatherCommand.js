
import axios from 'axios';
//import config from '../../config/config.js';
import { callWeatherApi } from '../../services/apiService.js';

function handleWeatherCommand(senderPsid, location) {
  callWeatherApi(location)
    .then(data => {
      let response = {
        text: `Weather information for ${location}: ${data.weather}`
      };
      sendResponse(senderPsid, response);
    })
    .catch(error => {
      console.error('Error retrieving weather information:', error);
      let response = {
        text: `Error retrieving weather information for ${location}`
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

export { handleWeatherCommand };
