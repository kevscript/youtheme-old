require('dotenv').config();
const axios = require('axios');

const googleApi = axios.create({
  baseURL: `https://www.googleapis.com/youtube/v3`,
  params: {
    key: process.env.REACT_APP_GOOGLE_KEY,
    part: 'snippet,id',
    order: 'date',
    maxResults: '50'
  }
})

function getVideos(channelId) {
  const params = {
    channelId: channelId
  }
  return googleApi.get('/search', { params })
    .then(data => data)
    .catch(error => console.log(error))
}

module.exports = {
  getVideos
}