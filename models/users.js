const axios = require('axios');
const token = process.env.slackToken;

const getUsers = () => {
    return axios.get('https://slack.com/api/users.list', { params: { token } })
        .then(response => response.data.members)
}

module.exports = { getUsers }
