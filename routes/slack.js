const slackRouter = require("express").Router();
const shiftsRouter = require("./shifts_router");
const attendanceRouter = require("./attendance_router");
const eventsRouter = require("./events_router");

slackRouter.use("/shifts", shiftsRouter);
slackRouter.use("/attendance", attendanceRouter);
slackRouter.use("/events", eventsRouter);

module.exports = slackRouter;
