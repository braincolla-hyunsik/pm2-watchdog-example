const _ = require('lodash');
const express = require('express');

const app = express();
const startedAt = new Date().toISOString();

const port = 8008;

app.get('/healthcheck', (req, res) => {
  // Response delay from 0 to 0.6 sec
  let delay = Math.random() * 600;

  setTimeout(() => {
    let randomerror = Math.random();

    // Inject random error
    if(randomerror < 0.2) {
      res.status(500).send("Something wrong!");
    } else {
      res.send(startedAt);
    }
  }, delay);
});

app.listen(port, () => {
  console.log(`Server started from port ${port}`);
});
