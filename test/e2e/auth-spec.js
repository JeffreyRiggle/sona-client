const { browser, element } = require("../../node_modules/protractor/built/index");
const { config } = require('../testConfig');

describe('logging in', () => {
    beforeEach(() => {
        browser.ignoreSynchronization = true;
    });

    afterEach(function() {
        browser.executeScript('window.sessionStorage.clear();');
        browser.executeScript('window.localStorage.clear();');
    });

    it('the admin should be able to log in', async () => {
        browser.get(config.webServerAddress);

        await browser.wait(protractor.ExpectedConditions.visibilityOf(element.all(by.css('.action')).first()), 10000, 'Input never shown');
        const inputs = element.all(by.css('.action'));
        inputs.first().sendKeys('something@somewhere.com');
        inputs.get(1).sendKeys('itsasecret');

        element(by.css('button')).click();
        await browser.wait(protractor.ExpectedConditions.visibilityOf(element.all(by.css('.sona-grid')).first()), 10000, 'Login Failed');
    });

    it('invalid auth should fail', async () => {
        browser.get(config.webServerAddress);

        await browser.wait(protractor.ExpectedConditions.visibilityOf(element.all(by.css('.action')).first()), 10000, 'Input never shown');
        let inputs = element.all(by.css('.action'));
        inputs.first().sendKeys('something@somewhere.com');
        inputs.get(1).sendKeys('foobar');

        element(by.css('button')).click();
        await browser.wait(protractor.ExpectedConditions.visibilityOf(element.all(by.css('.error')).first()), 10000, 'Login did not fail');
    });
});