const slackRouter = require("express").Router();
const shiftsRouter = require("./shifts_router");
const attendanceRouter = require("./attendance_router");

slackRouter.use("/shifts", shiftsRouter);
slackRouter.use("/attendance", attendanceRouter)

module.exports = slackRouter;
