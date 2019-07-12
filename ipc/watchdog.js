const ipc = require('node-ipc');
const pm2 = require('pm2');

ipc.config = Object.assign(ipc.config, {
  id: 'watchdog',
  silent: true
});

const timeout = 1000;

let watchdogTimer;

function watchdogWorker()  {
  console.error("watchdog failed");

  pm2.restart('watchdog-test-server', (err) => {
    console.log('Server restarted');
  });

  watchdogTimer = setTimeout(watchdogWorker, timeout);
}

function reset() {
  clearTimeout(watchdogTimer);
  watchdogTimer = setTimeout(watchdogWorker, timeout);
}

ipc.serve(() => {
  ipc.server.on('ping', message => {
    console.log(message);
    reset();
  });
});

ipc.server.start();
