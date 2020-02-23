import {bootstrap} from 'aurelia-bootstrapper';
import {StageComponent} from 'aurelia-testing';
import {PLATFORM} from 'aurelia-pal';
import { IncidentManager } from '../../src/incident/incidentManager';

describe('Stage Incident Search Component', () => {
  let component, incidentManager, incident, boundData;

  beforeEach(() => {
    incident = {
      id: '1', 
      reporter: 'tester',
      state: 'open',
      description: 'this is a test'
    };

    incidentManager = {
        incidents: [incident],
        currentincident: incident,
        getIncidents: jest.fn()
    };

    boundData = {
        incidentManager
    };

    component = StageComponent
      .withResources(PLATFORM.moduleName('../../src/incident/incident-search'))
      .inView('<incident-search incidentmanager="incidentmanager"></incident-search>')
      .boundTo(boundData);

    component.bootstrap(aurelia => {
      aurelia.use.standardConfiguration();
      aurelia.container.registerInstance(IncidentManager, incidentManager);
    });
  });

  afterEach(() => component.dispose());

  it('should render', done => {
    component.create(bootstrap).then(() => {
      const buttons = component.element.querySelectorAll('.common-button');
      expect(buttons.length).toBe(4);

      expect(buttons[2].textContent.trim()).toBe('Advanced');
      done();
    }).catch(e => {
      fail(e);
      done();
    });
  });

  it('should handle simple filters', (done) => {
    component.create(bootstrap).then(() => {
        const input = component.element.querySelector('input');
        input.value = 'testing';

        const searchButton = component.element.querySelectorAll('.common-button')[2];
        searchButton.click();

        expect(incidentManager.getIncidents.call.length).toBe(1);
        done();
      }).catch(e => {
        fail(e);
        done();
      });
  });

  it('should toggle advanced mode', done => {
    component.create(bootstrap).then(() => {
      const buttons = component.element.querySelectorAll('.common-button');
      buttons[2].click();

      setTimeout(() => {
        const advancedSearchText = component.element.querySelector('.search-property');
        expect(advancedSearchText.textContent.trim()).toBe('Search Expression');
        done();
      }, 100);
    }).catch(e => {
      fail(e);
      done();
    });
  });
});
