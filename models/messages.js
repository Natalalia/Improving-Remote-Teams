const axios = require("axios");
const botToken = process.env.botToken;
const slackToken = process.env.slackToken;

const sendMessage = async (channel, text) => {
    const response = await axios.post(
        "https://slack.com/api/chat.postMessage",
        {
            text,
            channel
        },
        {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + botToken
            }
        }
    )

    return response.data;
}

const deleteMessage = (channel, ts) => {
    return axios.post(
        "https://slack.com/api/chat.delete",
        {
            channel,
            ts,
            as_user: true
        },
        {
            headers: {
                'Content-type': 'application/json; charset=utf-8',
                'Authorization': 'Bearer ' + slackToken
            }
        }
    )
}

module.exports = { sendMessage, deleteMessage };
