const slackRouter = require("express").Router();
const shiftsRouter = require("./shifts_router");

slackRouter.use("/shifts", shiftsRouter);

module.exports = slackRouter;
