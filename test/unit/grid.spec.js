import {bootstrap} from 'aurelia-bootstrapper';
import {StageComponent} from 'aurelia-testing';
import {PLATFORM} from 'aurelia-pal';

describe('Stage Grid Component', () => {
  let component, boundData;

  beforeEach(() => {
    boundData = {
        rowData: [
            {
                foo: 'test',
                bar: 'value'
            }
        ],
        columnDefs: [
            {
                headerName: 'Value 1',
                field: 'foo'
            },
            {
                headerName: 'Value 2',
                field: 'bar'
            }
        ]
    };

    component = StageComponent
      .withResources(PLATFORM.moduleName('../../src/gridview/grid'))
      .inView('<grid rowData.bind="rowData" columnDefinitions.bind="columnDefs"></grid>')
      .boundTo(boundData);
  });

  afterEach(() => component.dispose());

  it('should render', done => {
    component.create(bootstrap).then(() => {
      const grid = component.element.querySelector('.ag-root-wrapper-body');
      expect(grid).toBeDefined();
      done();
    }).catch(e => {
      fail(e);
      done();
    });
  });
});
