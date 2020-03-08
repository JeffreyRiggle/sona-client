const { browser, element } = require("../../node_modules/protractor/built/index");

describe('logging in', () => {
    beforeEach(() => {
        browser.ignoreSynchronization = true;
    });

    afterEach(function() {
        browser.executeScript('window.sessionStorage.clear();');
        browser.executeScript('window.localStorage.clear();');
    });

    it('the admin should be able to log in', async () => {
        browser.get('http://localhost:3000/');

        await browser.wait(protractor.ExpectedConditions.visibilityOf(element.all(by.css('.action')).first()), 10000, 'Input never shown');
        const inputs = element.all(by.css('.action'));
        inputs.first().sendKeys('a@b.c');
        inputs.get(1).sendKeys('admin');

        element(by.css('button')).click();
        await browser.wait(protractor.ExpectedConditions.visibilityOf(element.all(by.css('.sona-grid')).first()), 10000, 'Login Failed');
    });

    it('invalid auth should fail', async () => {
        browser.get('http://localhost:3000/');

        await browser.wait(protractor.ExpectedConditions.visibilityOf(element.all(by.css('.action')).first()), 10000, 'Input never shown');
        let inputs = element.all(by.css('.action'));
        inputs.first().sendKeys('a@b.c');
        inputs.get(1).sendKeys('foobar');

        element(by.css('button')).click();
        await browser.wait(protractor.ExpectedConditions.visibilityOf(element.all(by.css('.error')).first()), 10000, 'Login did not fail');
    });
});