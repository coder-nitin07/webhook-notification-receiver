const axios = require("axios");

const webhookURL = "http://localhost:3000/webhook";

const event = {
  eventId: "evt_101",
  eventType: "user.created",
  data: {
    userId: 101,
    email: "user@test.com"
  },
  timestamp: Date.now()
};

async function sendWebhook() {
  try {
    const res = await axios.post(webhookURL, event, {
      headers: {
        "Content-Type": "application/json"
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