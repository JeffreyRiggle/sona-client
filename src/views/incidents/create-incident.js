import {Incident} from '../../incident/incident';
import './create-incident.less';

export class CreateIncident {
    constructor(controller) {
        this.controller = controller;
        this.header = 'Create Incident';
    }

    attached(incident = new Incident(undefined, '', '', '', [])) {
        this.incident = incident;
    }
}