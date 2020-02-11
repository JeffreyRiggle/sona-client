import {bootstrap} from 'aurelia-bootstrapper';
import {StageComponent} from 'aurelia-testing';
import {PLATFORM} from 'aurelia-pal';

describe('Stage Upload Attachment Component', () => {
  let component;

  beforeEach(() => {
    component = StageComponent
      .withResources(PLATFORM.moduleName('../../src/attachment/upload-attachments'))
      .inView('<upload-attachments></upload-attachments>');
  });

  afterEach(() => component.dispose());

  it('should render', done => {
    component.create(bootstrap).then(() => {
      const view = component.element.querySelector('h2');
      expect(view.textContent.trim()).toBe('Upload Attachments');
      done();
    }).catch(e => {
      fail(e);
      done();
    });
  });
});
