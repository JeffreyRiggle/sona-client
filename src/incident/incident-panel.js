
import {inject} from 'aurelia-framework';
import {IncidentManager} from './incidentManager';
import './incident-panel.less';

@inject(IncidentManager)
export class IncidentPanel {
    constructor(IncidentManager) {
        this.incidentmanager = IncidentManager;
    }
}