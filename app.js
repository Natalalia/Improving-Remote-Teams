const express = require("express");
const slackRouter = require("./routes/slack");

const app = express();

app.use("/slack", slackRouter);

module.exports = app;
