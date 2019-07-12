# pm2 watchdog with ipc

Unix only

 * Start
```
$ pm2 start watchdog-test-server.js
$ node watchdog.js
```

 * View log
```
$ pm2 logs all
```

 * Stop/Delete
```
$ pm2 delete watchdog watchdog-test-server
```
