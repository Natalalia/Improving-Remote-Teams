const { createMoodMessage } = require("../models/moodMessages");
const { sendMessage, deleteMessage } = require("../models/messages");

const eventsController = async (req, res) => {
    const { body } = req;
    if (req.body.type === "url_verification") {
        return res.send(req.body.challenge);
    }
    if (body.type === "event_callback" && body.event.channel_type === "im" && !body.event.subtype) {
        const { channel, ts: tsReceived } = body.event
        await createMoodMessage(body.event.text);
        const { message: messageSent } = await sendMessage(channel, "Thanks for sharing your feedback, we'll take care of it!");
        setTimeout(() => {
            Promise.all([
                deleteMessage(channel, messageSent.ts),
                deleteMessage(channel, tsReceived)
            ])
        }, 2000)
        return res.send();
    }
}

module.exports = eventsController;
