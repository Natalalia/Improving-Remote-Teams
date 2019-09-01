const { addStartTime, addFinishTime } = require("../models/shifts");

const postStartTime = userId => {
  addStartTime("u1")
    .then(console.log)
    .catch(console.log);
};

const postFinishTime = userId => {
  addFinishTime("u1")
    .then(console.log)
    .catch(console.log);
};

module.exports = { postStartTime, postFinishTime };
