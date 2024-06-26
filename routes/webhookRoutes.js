import express from 'express';
import { handleWebhookEvent } from '../controllers/webhookController.js';

const router = express.Router();

// GET /webhook endpoint for verification
router.get('/', (req, res) => {
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token === VERIFY_TOKEN) {
    console.log('Webhook verified');
    res.status(200).send(challenge);
  } else {
    console.error('Failed verification');
    res.sendStatus(403);
  }
});

// POST /webhook endpoint to handle incoming events
router.post('/', async (req, res) => {
  try {
    await handleWebhookEvent(req.body);
    res.status(200).end();
  } catch (error) {
    console.error('Error handling webhook event:', error.message);
    res.sendStatus(500);
  }
});

export default router;
