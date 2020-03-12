exports.config = {
    chromeDriver: '../node_modules/protractor/node_modules/webdriver-manager/selenium/chromedriver_79.0.3945.88',
    specs: ['e2e/auth-spec.js'],
    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            args: ['--disable-dev-shm-usage', '--headless', '--no-sandbox']
        },
        maxInstances: 1,
        count: 1
    }
};