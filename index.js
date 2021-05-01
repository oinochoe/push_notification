const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Set Static path
app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json());

const publicVapidKey =
    "BPMLgJXZdMq0ko9Q4XN1jQQIWI6RbWM38Bce8kEGCMjfopnNpUzUX-w4VI45bD2kQTiv2v6TKmrmzzUGoJ7SdtE";
const privateVapidKey = "aBBMDyZv5iUY9GQcpEnlmJmvwwPh6TWX6i9BiHaN6f4";

webpush.setVapidDetails(
    "mailto:copstyle@naver.com",
    publicVapidKey,
    privateVapidKey
);

// Subscribe Route
app.post("/subscribe", (req, res) => {
    //Get pushSubscription Object
    const subscription = req.body;

    // Send 201 - resource created
    res.status(201).json({});

    // Create payload
    const payload = JSON.stringify({ title: "Push Test" });

    // Pass Object into sendNotification
    webpush
        .sendNotification(subscription, payload)
        .catch((err) => console.error(err));
});

const port = 5000;

app.listen(port, () => console.log(`server started on port ${port}`));
