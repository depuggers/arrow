const path = require('path');
const express = require('express');
const axios = require('axios');
require('dotenv').config;

const app = express();
const PORT = 3000;
const API_SERVER_URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/';

app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.json());

app.all('/*', (req, res) => {
  const config = {
    method: req.method,
    url: `${API_SERVER_URL}${req.url}`,
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
