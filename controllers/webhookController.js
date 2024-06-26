import fetch from 'node-fetch';
import { handleMessage, handlePostback } from './messageController.js';

async function handleWebhookEvent(req, res) {
  try {
    const body = req.body;

    if (body.object === 'page') {
      for (const entry of body.entry) {
        const webhookEvent = entry.messaging[0];
        const senderPsid = webhookEvent.sender.id;

        if (webhookEvent.message) {
          await handleMessage(senderPsid, webhookEvent.message);
        } else if (webhookEvent.postback) {
          await handlePostback(senderPsid, webhookEvent.postback);
        }
      }

      res.status(200).send('EVENT_RECEIVED');
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('Error handling webhook event:', error.message);
    res.sendStatus(500);
  }
}

export { handleWebhookEvent };
