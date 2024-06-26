import axios from 'axios';
import { callWeatherApi, callNewsApi } from '../services/apiService.js';
import { handleWeatherCommand } from './commandControllers/weatherCommand.js';
import { handleNewsCommand } from './commandControllers/newsCommand.js';
import { handleMusicCommand } from './commandControllers/musicCommand.js';
import { handleAntiLeaveCommand } from './commandControllers/antiLeaveCommand.js';
import dotenv from 'dotenv';

dotenv.config();

async function handleMessage(senderPsid, message) {
  try {
    if (message.text) {
      let text = message.text.toLowerCase();

      if (text.startsWith('/weather')) {
        let location = text.substring(8).trim();
        await handleWeatherCommand(senderPsid, location);
      } else if (text.startsWith('/news')) {
        let topic = text.substring(5).trim();
        await handleNewsCommand(senderPsid, topic);
      } else if (text.startsWith('/music')) {
        let songTitle = text.substring(6).trim();
        await handleMusicCommand(senderPsid, songTitle);
      } else if (text.startsWith('/antileave')) {
        let command = text.substring(10).trim(); // Get the command after '/antileave'
        if (command === 'on' || command === 'off' || command === 'status') {
          await handleAntiLeaveCommand(senderPsid, command);
        } else {
          await sendResponse(senderPsid, { text: 'Invalid command. Please use "/antileave on", "/antileave off", or "/antileave status".' });
        }
      } else {
        await sendResponse(senderPsid, { text: 'Command not recognized. Please use "/weather", "/news", "/music", or "/antileave".' });
      }
    }
  } catch (error) {
    console.error('Error handling message:', error);
    await sendResponse(senderPsid, { text: 'Oops! Something went wrong while processing your message.' });
  }
}

function handlePostback(senderPsid, postback) {
  // Handle postbacks if needed
}

async function sendResponse(senderPsid, response) {
  try {
    let requestBody = {
      recipient: {
        id: senderPsid
      },
      message: response
    };

    const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

    const apiResponse = await axios.post('https://graph.facebook.com/v12.0/me/messages', requestBody, {
      params: { access_token: PAGE_ACCESS_TOKEN }
    });

    console.log('Message sent successfully:', apiResponse.data);
  } catch (error) {
    console.error('Unable to send message:', error);
    throw error;
  }
}

export { handleMessage, handlePostback };
