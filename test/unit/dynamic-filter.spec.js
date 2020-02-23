import {bootstrap} from 'aurelia-bootstrapper';
import {StageComponent} from 'aurelia-testing';
import {PLATFORM} from 'aurelia-pal';

describe('Stage Dynamic Filter Component', () => {
  let component, boundData;

  beforeEach(() => {
    boundData = {
        props: [
            {
                displayName: 'State',
                selected: true,
                searchValue: ''
            },
            {
                displayName: 'Description',
                selected: false,
                searchValue: ''
            }
        ]
    };

    component = StageComponent
      .withResources(PLATFORM.moduleName('../../src/common/dynamic-filter'))
      .inView('<dynamic-filter props.bind="props"></dynamic-filter>')
      .boundTo(boundData);
  });

  afterEach(() => component.dispose());

  it('should render', done => {
    component.create(bootstrap).then(() => {
      const filter = component.element.querySelector('span span');
      expect(filter.textContent.trim()).toBe('State');
      done();
    }).catch(e => {
      fail(e);
      done();
    });
  });
});
