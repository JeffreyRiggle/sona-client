import {inject} from 'aurelia-framework';
import {Incident} from '../../incident/incident';
import {IncidentManager} from '../../incident/incidentManager';
import routing from '../../services/routing';

import './create-incident.less';

@inject(IncidentManager)
export class CreateIncident {
    constructor(incidentManager) {
        this.incidentManager = incidentManager;
        this.header = 'Create Incident';
    }

    attached(incident = new Incident(undefined, '', '', '', [])) {
        this.incident = incident;
    }

    create() {
        this.incidentManager.createIncident(this.incident);
        routing.navigate('home');
    }

    cancel() {
        routing.navigate('login');
    }
}