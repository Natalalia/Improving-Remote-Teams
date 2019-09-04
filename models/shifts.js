const connection = require("../db/connection");

const selectShift = userId => {
  return connection("shifts")
    .select("*")
    .where("employee_id", userId)
    .whereNull("finish_time");
};

const addStartTime = userId => {
  const newShift = {
    employee_id: userId
  };
  return selectShift(userId).then(([response]) => {
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

const addFinishTime = userId => {
  return selectShift(userId).then(([response]) => {
    if (response === undefined) {
      return Promise.reject({ msg: "You should start a new shift first!!" });
    }
    return connection("shifts")
      .where("employee_id", userId)
      .whereNull("finish_time")
      .update("finish_time", new Date())
      .returning("*");
  });
};

const getShiftsByUsers = (usersIds, fromDate, toDate) => {
  return connection("shifts")
    .whereIn('employee_id', usersIds)
    .andWhere(builder => {
      builder.orWhere(builder => {
        builder.where('start_time', '>=', fromDate);
        builder.where('start_time', '<=', toDate);
      })
      builder.orWhere(builder => {
        builder.where('finish_time', '>=', fromDate);
        builder.where('finish_time', '<=', toDate);
      })
    })   
}

module.exports = { addFinishTime, addStartTime, getShiftsByUsers };
