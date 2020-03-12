const { src, series } = require('gulp');
const { protractor } = require('gulp-protractor');
const { spawn } = require('child_process');

function updateWebDriver(callback) {
    spawn('node_modules/protractor/bin/webdriver-manager', ['update', '--versions.chrome', '79.0.3945.88'], {
        stdio: 'inherit'
    }).once('close', callback);
}

function testE2E() {
    return src(['./test/e2e/*.js'])
      .pipe(protractor({
          configFile: 'test/conf.js'
      })).on('error', (e) => {
          throw e;
      });
}

exports.testE2E = series(updateWebDriver, testE2E);