import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Incident} from './incident';

@inject(EventAggregator)
export class IncidentManager {
    constructor(EventAggregator) {
        this.eventAg = EventAggregator;
        this.incidents = [];
        this.currentincident = new Incident('2', 'tester', 'open', 'testing description');
        this.currentincident.addAttribute('gitissue', '/repos/JeffreyRiggle/logrunner/issues/2');
        var incident1 = new Incident('1', 'Someone', 'closed', 'some other description');
        incident1.addAttribute('gitissue', '/repos/JeffreyRiggle/logrunner/issues/1');
        this.incidents.push(incident1);
        this.incidents.push(this.currentincident);
    }

    setSelected(id) {
        this.incidents.forEach(i => {
            if (i.id === id) {
                this.currentincident = i;
                this.eventAg.publish('incidentSelected', i);
                return;
            }
        });
    }
}