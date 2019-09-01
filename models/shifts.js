const connection = require("../db/connection");

const addStartTime = userId => {
  const newShift = {
    employee_id: userId
  };
  return connection("shifts")
    .select("*")
    .where("employee_id", userId)
    .whereNull("finish_time")
    .then(([response]) => {
      if (response === undefined) {
        return connection("shifts")
          .insert(newShift)
          .returning("*");
      }
      return Promise.reject({
        msg: "You should finish previous shift first!!"
      });
    });
};

const addFinishTime = userId => {};

module.exports = { addFinishTime, addStartTime };
