import {bootstrap} from 'aurelia-bootstrapper';
import {StageComponent} from 'aurelia-testing';
import {PLATFORM} from 'aurelia-pal';

describe('Stage Editable label Component', () => {
  let component, boundData;

  beforeEach(() => {
    boundData = {
        item: 'testing',
        edit: jest.fn()
    };

    component = StageComponent
      .withResources(PLATFORM.moduleName('../../src/common/editable-label'))
      .inView('<editable-label item.bind="item" edited.trigger="edit($event)"></editable-label>')
      .boundTo(boundData);
  });

  afterEach(() => component.dispose());

  it('should render', done => {
    component.create(bootstrap).then(() => {
      const value = component.element.querySelector('span');
      expect(value.textContent.trim()).toBe('testing');
      done();
    }).catch(e => {
      fail(e);
      done();
    });
  });

  it('should edit the item', done => {
    component.create(bootstrap).then(() => {
      const editButton = component.element.querySelector('button');
      editButton.click();
      setTimeout(() => {
        const input = component.element.querySelector('input');
        input.value = 'foobar';
        input.dispatchEvent(new window.Event('change'));
        const editButton = component.element.querySelector('button');
        editButton.click();
        setTimeout(() => {
            expect(boundData.edit.call.length).toBe(1);
            done();
        }, 100);
      }, 100);
    }).catch(e => {
      fail(e);
      done();
    });
  });
});
