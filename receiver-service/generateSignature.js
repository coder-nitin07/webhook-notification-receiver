const crypto = require("crypto");

const secret = "supersecret11919191991";
const payload = JSON.stringify({
  eventId: "evt_999",
  eventType: "test.event",
  data: { msg: "Hello webhook" },
  timestamp: 1765876040518
});

console.log(
  crypto.createHmac("sha256", secret).update(payload).digest("hex")
);