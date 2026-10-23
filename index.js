// Minimal app entry so the deployed Node.js project is runnable after the build.
'use strict';

const http = require('http');
const port = process.env.PORT || 3000;

http
  .createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello from the slow-build Node.js test app!\n');
  })
  .listen(port, function () {
    process.stdout.write('Server listening on port ' + port + '\n');
  });
