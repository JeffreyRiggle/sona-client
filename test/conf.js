function chromeArgs() {
    console.log(process.env);
    if (process.env.TEST_MODE === 'ci') {
        return ['--disable-dev-shm-usage', '--headless', '--no-sandbox'];
    }

    return [];
}

exports.config = {
    chromeDriver: '../node_modules/protractor/node_modules/webdriver-manager/selenium/chromedriver_79.0.3945.88',
    specs: ['e2e/auth-spec.js'],
    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            args: chromeArgs()
        },
        maxInstances: 1,
        count: 1
    }
};