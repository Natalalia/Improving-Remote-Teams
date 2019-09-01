const express = require("express");
const slackRouter = require("./routes/slack");
const bodyParser = require("body-parser");

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/slack", slackRouter);

module.exports = app;
