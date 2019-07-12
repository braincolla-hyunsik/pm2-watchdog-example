const axios = require('axios');
const pm2 = require('pm2');

const timeout = 500;
const pingInterval = 1000;

const url = 'http://localhost:8008/healthcheck';

pm2.connect((err) => {
  if (err) throw err;

  setTimeout(async function worker() {
    try {
      const response = await axios.get(url, {timeout:timeout});
      console.log("Watchdog good at " + response.data);
    } catch(e) {
      console.error("Watchdog failed: reason: " + e.toString());
      pm2.restart('watchdog-test-server', (err) => {
        console.log('Server restarted');
      });
    }

    setTimeout(worker, pingInterval);
  }, pingInterval);
});