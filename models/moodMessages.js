const connection = require("../db/connection");

const createMoodMessage = message => {
    return connection("mood_messages")
        .insert({
            message
        })
        .returning("*")
};

module.exports = { createMoodMessage }
