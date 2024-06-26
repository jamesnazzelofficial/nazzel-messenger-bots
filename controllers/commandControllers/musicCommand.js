
import axios from 'axios';
//import config from '../../config/config.js';

function handleMusicCommand(senderPsid, songTitle) {
  let apiKey = config.YOUTUBE_API_KEY;

  axios.get('https://www.googleapis.com/youtube/v3/search', {
    params: {
      key: apiKey,
      q: `${songTitle} official audio`,
      part: 'snippet',
      type: 'video',
      maxResults: 1
    }
  })
  .then(response => {
    if (response.data.items.length > 0) {
      let videoId = response.data.items[0].id.videoId;
      let videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
      let response = {
        text: `Here's the official audio of "${songTitle}":\n\n${videoUrl}`
      };
      sendResponse(senderPsid, response);
    } else {
      sendResponse(senderPsid, { text: `No official audio found for "${songTitle}".` });
    }
  })
  .catch(error => {
    console.error('Error fetching YouTube data:', error);
    sendResponse(senderPsid, { text: `Error fetching music for "${songTitle}". Please try again later.` });
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

export { handleMusicCommand };
