exports.config = {
    chromeDriver: '../node_modules/protractor/node_modules/webdriver-manager/selenium/chromedriver',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['e2e/auth-spec.js'],
    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            args: ["--disable-dev-shm-usage"]
        },
        maxInstances: 1,
        count: 1
    }
};