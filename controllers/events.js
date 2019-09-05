const axios = require("axios");
const { createMoodMessage } = require("../models/moodMessages");
const botToken = process.env.botToken;
const slackToken = process.env.slackToken;

const eventsController = async (req, res) => {
    const { body } = req;
    if (req.body.type === "url_verification") {
        return res.send(req.body.challenge);
    }
    if (body.type === "event_callback" && body.event.channel_type === "im" && !body.event.subtype) {
        await createMoodMessage(body.event.text);
        axios.post(
            "https://slack.com/api/chat.postMessage",
            {
                text: "Thanks for sharing your feedback, we'll take care of it!",
                channel: body.event.channel
            },
            {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + botToken
                }
            }
        )
        .then(({ data }) => {
            setTimeout(() => {
                Promise.all([
                    deleteMessage(data.channel, data.message.ts),
                    deleteMessage(body.event.channel, body.event.ts)
                ])
            }, 2000);
        })
        return res.send();
    }
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

module.exports = eventsController;
