import {bootstrap} from 'aurelia-bootstrapper';
import {StageComponent} from 'aurelia-testing';
import {PLATFORM} from 'aurelia-pal';

describe('Stage Attribute Item Component', () => {
  let component, boundData;

  beforeEach(() => {
    boundData = {
        attribute: { 
            name: 'foo',
            value: 'bar'
        },
        rmAttribute: jest.fn()
    };

    component = StageComponent
      .withResources(PLATFORM.moduleName('../../src/attribute/attribute-item'))
      .inView('<attribute-item model.bind="attribute" removed.trigger="rmAttribute($event)"></attribute-item>')
      .boundTo(boundData);
  });

  afterEach(() => component.dispose());

  it('should render', done => {
    component.create(bootstrap).then(() => {
      const key = component.element.querySelector('.key');
      expect(key.textContent.trim()).toBe('foo');

      const value = component.element.querySelector('.value');
      expect(value.textContent.trim()).toBe('bar');
      done();
    }).catch(e => {
      fail(e);
      done();
    });
  });

  it('should send remove message', done => {
    component.create(bootstrap).then(() => {
      const view = component.element.querySelector('.remove');
      view.click();

      setTimeout(() => {
        expect(boundData.rmAttribute.call.length).toBe(1);
        done();
      });
    }).catch(e => {
      fail(e);
      done();
    });
  });
});
