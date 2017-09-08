import {inject, bindable, customElement} from 'aurelia-framework';

@customElement('incident-list-view')
@bindable('incidentmanager')
export class IncidentListView {
    incidentClicked(incident) {
        this.incidentmanager.setSelected(incident.id);
    }
}