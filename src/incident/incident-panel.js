
import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {IncidentManager} from './incidentManager';
import './incident-panel.less';

@inject(IncidentManager, EventAggregator)
export class IncidentPanel {
    constructor(IncidentManager, EventAggregator) {
        this.incidentmanager = IncidentManager;
        this.eventAg = EventAggregator;
        this.shown = !!this.incidentmanager.currentincident;
    }

    attached() {
        this.subscriber = this.eventAg.subscribe('incidentSelected', () => {
            this.shown = true;
        });
    }

    detached() {
        this.subscriber.dispose();
    }

    hidePanel() {
        this.shown = false;
    }
}