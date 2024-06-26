
import axios from 'axios';
//import config from '../../config/config.js';

let antiLeaveEnabled = true; // Flag para sa anti-leave feature, by default enabled

function handleAntiLeaveCommand(senderPsid, action) {
  if (action === 'on') {
    antiLeaveEnabled = true;
    sendResponse(senderPsid, { text: 'Anti-leave feature has been enabled.' });
  } else if (action === 'off') {
    antiLeaveEnabled = false;
    sendResponse(senderPsid, { text: 'Anti-leave feature has been disabled.' });
  } else if (action === 'status') {
    let status = antiLeaveEnabled ? 'enabled' : 'disabled';
    sendResponse(senderPsid, { text: `Anti-leave feature is currently ${status}.` });
  } else {
    sendResponse(senderPsid, { text: 'Invalid command. Please use "/antileave on", "/antileave off", or "/antileave status".' });
  }
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

export { handleAntiLeaveCommand };
