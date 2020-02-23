import {bootstrap} from 'aurelia-bootstrapper';
import {StageComponent} from 'aurelia-testing';
import {PLATFORM} from 'aurelia-pal';

describe('Stage Attachment Item Component', () => {
  let component, boundData;

  beforeEach(() => {
    boundData = {
        attach: { 
            displayName: 'testFile.txt', 
            getFormatedTime: () => 'formatTime' 
        },
        rmAttach: jest.fn(),
        dlAttach: jest.fn()
    };

    component = StageComponent
      .withResources(PLATFORM.moduleName('../../src/attachment/attachment-item'))
      .inView('<attachment-item model.bind="attach" removed.trigger="rmAttach($event)" download.trigger="dlAttach($event)"></attachment-item>')
      .boundTo(boundData);
  });

  afterEach(() => component.dispose());

  it('should render', done => {
    component.create(bootstrap).then(() => {
      const view = component.element.querySelector('.attachment-item');
      expect(view.textContent.trim()).toBe('testFile.txt');
      done();
    }).catch(e => {
      fail(e);
      done();
    });
  });

  it('should send download message', done => {
    component.create(bootstrap).then(() => {
      const view = component.element.querySelector('.attachment-item');
      view.click();

      setTimeout(() => {
        expect(boundData.dlAttach.call.length).toBe(1);
        done();
      });
    }).catch(e => {
      fail(e);
      done();
    });
  });

  it('should send remove message', done => {
    component.create(bootstrap).then(() => {
      const view = component.element.querySelector('.attachment-remove');
      view.click();

      setTimeout(() => {
        expect(boundData.rmAttach.call.length).toBe(1);
        done();
      });
    }).catch(e => {
      fail(e);
      done();
    });
  });
});
