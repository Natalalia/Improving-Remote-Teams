const { addStartTime, addFinishTime } = require("../models/shifts");

const postStartTime = (req, res) => {
  const userId = req.body.user_id;
  addStartTime(userId)
    .then(newShift => {
      res
        .status(200)
        .send({ text: "You just started your shift. Have a good day!" });
    })
    .catch(err => {
      res.status(200).send({ text: "You should close previous shift first!" });
    });
};

const postFinishTime = (req, res) => {
  const userId = req.body.user_id;
  addFinishTime(userId)
    .then(shift => {
      res
        .status(200)
        .send({
          text: "You just finished your shift. Enjoy the rest of the day!"
        });
    })
    .catch(err => {
      res.status(200).send({ text: "You should start a new shift first!" });
    });
};

module.exports = { postStartTime, postFinishTime };
