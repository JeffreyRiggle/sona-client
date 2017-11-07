import {inject, bindable, customElement} from 'aurelia-framework';

@customElement('incident-list-view')
@bindable('incidentmanager')
export class IncidentListView {
    constructor() {
        this.listOptions = {
            columns: [
                { displayName: 'ID', property: 'id' },
                { displayName: 'State', property: 'state' },
                { displayName: 'Reporter', property: 'reporter' },
                { displayName: 'Description', property: 'description' }
            ]
        };
    }

    updateSelection(event) {
        this.incidentmanager.setSelected(event.detail.id);
    }
}