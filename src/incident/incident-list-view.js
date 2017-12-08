import {inject, bindable, customElement} from 'aurelia-framework';

@customElement('incident-list-view')
@bindable('incidentmanager')
export class IncidentListView {
    constructor() {
        this.listOptions = {
            columns: [
                { displayName: 'ID', property: 'id', selected: true },
                { displayName: 'State', property: 'state', selected: true },
                { displayName: 'Reporter', property: 'reporter', selected: true },
                { displayName: 'Description', property: 'description', selected: false }
            ]
        };
    }

    updateSelection(event) {
        this.incidentmanager.setSelected(event.detail.id);
    }
}