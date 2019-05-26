const express = require('express');
const cors = require('cors');
const path = require('path');
const fetchVideos = require('./fetchVideos')

// init server
const app = express();
app.use(cors());

// default api route
app.get('/api', (req, res) => {
  res.json({
    message: 'Default Route for Youtheme!'
  })
})


app.get('/api/:channelId', (req, res) => {
  fetchVideos.getVideos(req.params.channelId)
    .then(videos => {
      res.json(videos.data)
    })
})


// define port on which the back-end server runs
const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'app/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'app/build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Listening on ${port}`)
});
