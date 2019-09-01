const shiftsRouter = require("express").Router();
//const { postStartTime, postFinishTime } = require("../controllers");

shiftsRouter.route("/start").post(() => {
  console.log("start controller to be here");
});

shiftsRouter.route("/finish").post(() => {
  console.log("finish controller here");
});

module.exports = shiftsRouter;
