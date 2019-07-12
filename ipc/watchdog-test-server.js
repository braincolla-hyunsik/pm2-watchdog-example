const ipc = require('node-ipc');

const startedAt = new Date().toISOString();

ipc.config = Object.assign(ipc.config, {
  id: 'watchdog-test-server',
  silent: true
});

ipc.connectTo('watchdog');

setTimeout(function worker () {
  ipc.of['watchdog'].emit('ping', new Date().toISOString());
  console.log(startedAt);
  const delay = Math.random() * 1100;
  setTimeout(worker, delay);
}, 0);

console.log('server started.');