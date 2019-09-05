const moment = require("moment");
const { getChannelById } = require("../models/channel");
const { getAttendanceByHours } = require("../models/shifts");

const postAttendance = async (req, res) => {
    const channel = await getChannelById(req.body.channel_id);
    const fromTime = moment().subtract(1, "day").startOf("day");
    const toTime = moment().subtract(1, "day").endOf("day");
    const attendance = await getAttendanceByHours(channel.members, fromTime, toTime);
    console.log(attendance)
    let text = attendance.map(({ from, to, shifts }) => {
        const startHour = ("0" + moment(from).hour()).slice(-2);
        const endHour = ("0" + (moment(to).hour() + 1)).slice(-2);
        const emojisArr = new Array(shifts.length).fill(":bust_in_silhouette:")
        return `${startHour}-${endHour}: ${shifts.length} ${emojisArr.join("")}`
    }).join("\n");
    text = `This is the tippical attendance by hour for this team:\n${text}`
    res.json({
        text
    })
};

module.exports = { postAttendance }
