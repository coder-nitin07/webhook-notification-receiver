const express = require("express");
const crypto = require("crypto");
require("dotenv").config();

const app = express();
const PORT = 3000;

// IMPORTANT: capture raw body
app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    }
  })
);

app.post("/webhook", (req, res) => {
  const receivedSignature = req.headers["x-signature"];
  const secret = process.env.WEBHOOK_SECRET;

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(req.rawBody)
    .digest("hex");

  if (receivedSignature !== expectedSignature) {
    console.log("❌ Invalid signature");
    return res.status(401).json({ error: "Invalid signature" });
  }

  
  console.log("✅ Webhook verified");
  console.log("Body:", req.body);

  res.status(200).json({ received: true });
});

app.listen(PORT, () => {
  console.log(`Webhook receiver running on PORT ${PORT}`);
});
