const express = require('express');
const app = express();

// middleware to parse JSON data
app.use(express.json());

// webhook endpoint
app.post('/webhook', (req, res)=>{
    console.log(`Webhook received`);
    console.log(`Headers : `, req.headers);
    console.log('Body : ', req.body);

    // respond immediately
    res.status(200).json({ received: true });
});

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Webhook receiver running on PORT ${ PORT }`);
});