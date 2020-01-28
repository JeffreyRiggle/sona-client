import {bootstrap} from 'aurelia-bootstrapper';
import {StageComponent} from 'aurelia-testing';
import {PLATFORM} from 'aurelia-pal';

describe('Stage Attachment Item Component', () => {
  let component;

  beforeEach(() => {
    component = StageComponent
      .withResources(PLATFORM.moduleName('attachment-item'))
      .inView('<attachment-item></attachment-item>');
  });

  afterEach(() => component.dispose());

  xit('should render', done => {
    component.create(bootstrap).then(() => {
      const view = component.element;
      expect(view.textContent.trim()).toBe('Hello World!');
      done();
    }).catch(e => {
      fail(e);
      done();
    });
  });
});
