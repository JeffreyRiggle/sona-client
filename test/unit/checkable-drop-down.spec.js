import {bootstrap} from 'aurelia-bootstrapper';
import {StageComponent} from 'aurelia-testing';
import {PLATFORM} from 'aurelia-pal';

describe('Stage Checkable dropdown Component', () => {
  let component, data;

  beforeEach(() => {
    data = {
        title: 'Test',
        items: [
            {
                selected: false,
                displayName: 'item1'
            },
            {
                selected: true,
                displayName: 'item2'
            }
        ],
        checked: jest.fn(),
        unchecked: jest.fn()
    };

    component = StageComponent
      .withResources(PLATFORM.moduleName('../../src/common/checkable-drop-down'))
      .inView('<checkable-drop-down title.bind="title" items.bind="items" itemChecked.trigger="checked($event)" itemUnchecked.trigger"unchecked($event)"></checkable-drop-down>')
      .boundTo(data);
  });

  afterEach(() => component.dispose());

  it('should render', done => {
    component.create(bootstrap).then(() => {
      const view = component.element.querySelector('button');
      expect(view.textContent.trim()).toBe('Test');
      done();
    }).catch(e => {
      fail(e);
      done();
    });
  });

  it('should show items when pressed', (done) => {
    component.create(bootstrap).then(() => {
      component.element.querySelector('button').click();
      setTimeout(() => {
        const items = component.element.querySelectorAll('li');

        expect(items.length).toBe(2);
        expect(items[0].querySelector('label').textContent.trim()).toBe('item1');
        expect(items[1].querySelector('label').textContent.trim()).toBe('item2');
        done();
      }, 100);
    }).catch(e => {
      fail(e);
      done();
    });
  });

  it('should send checked message', (done) => {
    component.create(bootstrap).then(() => {
      component.element.querySelector('button').click();
      setTimeout(() => {
        const items = component.element.querySelectorAll('li');

        items[0].querySelector('input').click();

        setTimeout(() => {
            expect(data.checked.call.length).toBe(1);
            done();
        });
      }, 100);
    }).catch(e => {
      fail(e);
      done();
    });
  });

  it('should send unchecked message', (done) => {
    component.create(bootstrap).then(() => {
      component.element.querySelector('button').click();
      setTimeout(() => {
        const items = component.element.querySelectorAll('li');

        items[1].querySelector('input').click();

        setTimeout(() => {
            expect(data.checked.call.length).toBe(1);
            done();
        });
      }, 100);
    }).catch(e => {
      fail(e);
      done();
    });
  });
});
