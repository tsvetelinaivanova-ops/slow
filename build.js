// Simulated slow build: prints a line, waits, prints "done", repeats — so the
// build log grows over ~60s and the FE has time to poll and watch it stream.
// Interval is configurable for local testing: BUILD_STEP_MS=200 node build.js
'use strict';

// If the log reader goes away (closed pipe), exit cleanly instead of crashing on EPIPE.
process.stdout.on('error', function () { process.exit(0); });

const stepMs = parseInt(process.env.BUILD_STEP_MS || '5000', 10);
const steps = [
  'Resolving dependencies',
  'Compiling TypeScript sources',
  'Transpiling with Babel',
  'Bundling modules with webpack',
  'Tree-shaking unused exports',
  'Minifying JavaScript',
  'Generating source maps',
  'Optimizing images',
  'Running unit tests',
  'Building stylesheets',
  'Writing build manifest',
  'Finalizing',
];

function log(message) {
  process.stdout.write('[' + new Date().toISOString() + '] ' + message + '\n');
}

function sleep(ms) {
  return new Promise(function (resolve) { setTimeout(resolve, ms); });
}

(async function () {
  const total = steps.length;
  log('Starting build: ' + total + ' steps, ~' + (total * stepMs) / 1000 + 's');
  for (let i = 0; i < total; i++) {
    log('[' + (i + 1) + '/' + total + '] ' + steps[i] + '...');
    await sleep(stepMs);
    log('      ' + steps[i] + ' done');
  }
  log('Build completed successfully');
})();
