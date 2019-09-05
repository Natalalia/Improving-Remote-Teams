const attendanceRouter = require("express").Router();
const { postAttendance } = require("../controllers/attendance");

attendanceRouter.route("/").post(postAttendance)

module.exports = attendanceRouter;
