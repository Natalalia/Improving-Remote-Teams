const eventsRouter = require("express").Router();
const eventsController = require("../controllers/events");

eventsRouter.route("/").post(eventsController)

module.exports = eventsRouter;
