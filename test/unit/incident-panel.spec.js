import {bootstrap} from 'aurelia-bootstrapper';
import {StageComponent} from 'aurelia-testing';
import {PLATFORM} from 'aurelia-pal';
import { IncidentManager } from '../../src/incident/incidentManager';

describe('Stage Incident Panel Component', () => {
  let component, incidentManager, incident;

  beforeEach(() => {
    incident = {
      id: '1', 
      reporter: 'tester',
      state: 'open',
      description: 'this is a test'
    };

    incidentManager = {
        incidents: [incident],
        currentincident: incident
    };

    component = StageComponent
      .withResources(PLATFORM.moduleName('../../src/incident/incident-panel'))
      .inView('<incident-panel></incident-panel>');

    component.bootstrap(aurelia => {
      aurelia.use.standardConfiguration();
      aurelia.container.registerInstance(IncidentManager, incidentManager);
    });
  });

  afterEach(() => component.dispose());

  it('should render', done => {
    component.create(bootstrap).then(() => {
      const link = component.element.querySelector('h2 a');
      expect(link.textContent.trim()).toBe('Incident 1');
      expect(link.href).toBe(`about:blank#/viewIncident/1`);

      const content = component.element.querySelector('incident-viewer');
      expect(content).toBeDefined();
      done();
    }).catch(e => {
      fail(e);
      done();
    });
  });

  it('should hide the panel', done => {
    component.create(bootstrap).then(() => {
      const closeButton = component.element.querySelector('h2 .common-button');
      closeButton.click();

      setTimeout(() => {
        const header = component.element.querySelector('h2');
        expect(header).toBe(null);
        done();
      }, 100);
    }).catch(e => {
      fail(e);
      done();
    });
  });
});
