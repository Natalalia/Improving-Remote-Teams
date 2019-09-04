const axios = require('axios');
const { addStartTime, addFinishTime } = require("../models/shifts");
const { getUsers } = require('../models/users');

const postStartTime = (req, res) => {
  const userId = req.body.user_id;
  addStartTime(userId)
    .then(newShift => {
      res
        .status(200)
        .send({ text: "You just started your shift. Have a good day!" });

      setTimeout(async () => {
        const users = await getUsers();
        const usersNotCurrent = users.filter(({ id, is_bot }) => (
          id !== userId && 
          id !== "USLACKBOT" &&
          !is_bot))
        const user = usersNotCurrent[Math.floor(Math.random()*usersNotCurrent.length)];
        axios.post(
          req.body.response_url,
          {
            text: `It has been a long time since you talked with <@${user.id}>, let's have a coffee together!`
          },
          {
            headers: { 'Content-type': 'application/json' }
          }
        );
      }, 6000)
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
