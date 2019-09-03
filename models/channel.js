const axios = require("axios");

const token = process.env.slackToken;

const getChannelById = channelId => {
  return axios
    .get(
      `https://slack.com/api/channels.info?token=${token}&channel=${channelId}`
    )
    .then(({ data }) => {
      return data.channel;
    });
};

module.exports = { getChannelById };
