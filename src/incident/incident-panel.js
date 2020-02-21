
import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {IncidentManager} from './incidentManager';
import './incident-panel.less';

@inject(IncidentManager, EventAggregator)
export class IncidentPanel {
    constructor(IncidentManager, EventAggregator) {
        console.log(IncidentManager);
        this.incidentmanager = IncidentManager;
        this.eventAg = EventAggregator;
        this.shown = !!this.incidentmanager.currentincident;
        this.incidentRoute = `#/viewIncident/${this.incidentmanager.currentincident.id}`;
    }

    attached() {
        this.subscriber = this.eventAg.subscribe('incidentSelected', () => {
            this.shown = true;
            this.incidentRoute = `#/viewIncident/${this.incidentmanager.currentincident.id}`;
        });
    }

    detached() {
        this.subscriber.dispose();
    }

    hidePanel() {
        this.shown = false;
    }
}