const path = require('path');
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;
const API_SERVER_URL = 'api-server.url/api';

app.use(express.static(path.join(__dirname, '../dist/index.html')));
app.use(express.json());

app.all('/*', (req, res) => {
  const config = {
    method: req.method,
    url: `${API_SERVER_URL}${req.ur}`,
    headers: {
      Authorization: process.env.GH_TOKEN,
    },
  };

  axios(config)
    .then((response) => {
      res.status(response.status).json(response.data);
    })
    .catch((error) => {
      if (error.response) {
        res.status(error.response.status).json(error.response.data);
      } else if (error.request) {
        res.status(500).json(error.request);
      } else {
        res.status(500).json(error.message);
      }
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
