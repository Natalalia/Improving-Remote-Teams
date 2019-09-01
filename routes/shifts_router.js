const shiftsRouter = require("express").Router();
const { postStartTime, postFinishTime } = require("../controllers/shifts");

shiftsRouter.route("/start").post(postStartTime);

shiftsRouter.route("/finish").post(postFinishTime);

module.exports = shiftsRouter;
