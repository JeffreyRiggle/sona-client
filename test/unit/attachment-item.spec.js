import {bootstrap} from 'aurelia-bootstrapper';
import {StageComponent} from 'aurelia-testing';
import {PLATFORM} from 'aurelia-pal';

describe('Stage Attachment Item Component', () => {
  let component;

  beforeEach(() => {
    component = StageComponent
      .withResources(PLATFORM.moduleName('attachment-item'))
      .inView('<attachment-item model.bind="attach"></attachment-item>')
      .boundTo({attach: { displayName: 'testFile.txt', getFormatedTime: () => 'formatTime' }});
  });

  afterEach(() => component.dispose());

  it('should render', done => {
    component.create(bootstrap).then(() => {
        const view = component.element.querySelector('button');
        expect(view.textContent.trim()).toBe('testFile.txt');
      done();
    }).catch(e => {
      fail(e);
      done();
    });
  });
});
