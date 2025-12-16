const axios = require("axios");
const crypto = require('crypto');
require("dotenv").config();

const webhookURL = "http://localhost:3000/webhook";
const secret = process.env.WEBHOOK_SECRET;

const event = {
  eventId: "evt_101",
  eventType: "user.created",
  data: {
    userId: 101,
    email: "user@test.com"
  },
  timestamp: Date.now()
};

// create signature
const payload = JSON.stringify(event);
const signature = crypto.createHmac('sha256', secret)
                        .update(payload)
                        .digest('hex');

async function sendWebhook() {
  try {
    const res = await axios.post(webhookURL, event, {
      headers: {
        "Content-Type": "application/json",
        "X-Signature": signature
      }
    });

    console.log("Webhook sent successfully");
    console.log("Response status:", res.status);
  } catch (err) {
    console.error("Webhook failed");
    console.error(err.message);
  }
}

sendWebhook();