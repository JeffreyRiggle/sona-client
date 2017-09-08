import {inject} from 'aurelia-framework';
import {IncidentManager} from './incident/incidentManager';

@inject(IncidentManager)
export class App {
    constructor(IncidentManager) {
        this.heading = "Attributes";
        this.incidentmanager = IncidentManager;
    }
}