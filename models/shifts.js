const moment = require('moment');
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

/**
 * Returns an array with a number of objects, one per hour between fromDate and toDate, with the shifts that
 * match in each interval.
 * @param {string[]} usersIds Array with the userIds
 * @param {Moment|string} fromDate Moment object or string representing the start time
 * @param {Moment|string} toDate Moment object or string representing the finish time
 * 
 */
const getAttendanceByHours = async (usersIds, fromDate, toDate) => {
  const startTime = moment(fromDate);
  const endTime = moment(toDate);
  const shifts = await getShiftsByUsers(usersIds, startTime, endTime);
  const attendance = [];
  for (let time = moment(fromDate); time.isSameOrBefore(endTime); time.add(1, 'hour').endOf('hour')) {
    const startHour = time.clone();
    const finishHour = time.clone().endOf('hour');
    const currentShifts = shifts.filter(({ start_time, finish_time }) => {
      return moment(startHour).isBetween(start_time, finish_time) || moment(finishHour).isBetween(start_time, finish_time)
    });
    attendance.push({
      from: startHour,
      to: finishHour,
      shifts: currentShifts
    });
  }
  return attendance;
}

module.exports = { addFinishTime, addStartTime, getShiftsByUsers, getAttendanceByHours };
