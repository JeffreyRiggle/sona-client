import {bootstrap} from 'aurelia-bootstrapper';
import {StageComponent} from 'aurelia-testing';
import {PLATFORM} from 'aurelia-pal';

describe('Stage Incident List View Component', () => {
  let component, boundData;

  beforeEach(() => {
    boundData = {
        incidentManager: {
            incidents: [],
            currentIncident: undefined
        }
    };

    component = StageComponent
      .withResources(PLATFORM.moduleName('../../src/incident/incident-list-view'))
      .inView('<incident-list-view incidentmanager="incidentManager"></incident-list-view>')
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
