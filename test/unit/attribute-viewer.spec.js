import {bootstrap} from 'aurelia-bootstrapper';
import {StageComponent} from 'aurelia-testing';
import {PLATFORM} from 'aurelia-pal';
import {DialogService} from 'aurelia-dialog';

describe('Stage Atttibute Viewer Component', () => {
  let component, boundData;

  beforeEach(() => {
    boundData = {
        incident: {
            attributes: [
                { 
                    name: 'foo',
                    value: 'bar'
                },
                { 
                    name: 'baz',
                    value: 'bu'
                }
            ],
            removeAttribute: jest.fn(),
            addAttribute: jest.fn()
        }
    };

    component = StageComponent
      .withResources(PLATFORM.moduleName('../../src/attribute/attribute-viewer'))
      .inView('<attribute-viewer incident.bind="incident"></attribute-viewer>')
      .boundTo(boundData);
  });

  afterEach(() => component.dispose());

  it('should render', done => {
    component.create(bootstrap).then(() => {
      const view = component.element.querySelectorAll('attribute-item');
      expect(view.length).toBe(2);
      done();
    }).catch(e => {
      fail(e);
      done();
    });
  });

  it('should remove an attachment when it is removed', done => {
    component.create(bootstrap).then(() => {
        let view = component.element.querySelector('attribute-item .remove');
        view.click();
        setTimeout(() => {
          expect(boundData.incident.removeAttribute.call.length).toBe(1);
          done();
        });
    }).catch(e => {
      fail(e);
      done();
    });
  });

  it('should handle add items', done => {
    component.create(bootstrap).then(() => {
        let inputs = component.element.querySelectorAll('.attribute-input');
        inputs[0].value = 'test';
        inputs[1].value = 'value';

        component.element.querySelector('.add-attribute-btn').click();
        setTimeout(() => {
          expect(boundData.incident.addAttribute.call.length).toBe(1);
          done();
        });
    }).catch(e => {
      fail(e);
      done();
    });
  });
});
