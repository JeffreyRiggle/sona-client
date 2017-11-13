import {inject, bindable, customElement} from 'aurelia-framework';

@customElement('incident-viewer')
@bindable('incident')
export class IncidentViewer {
    constructor() {
        this.initialValues = {};
        this.isDirty = false;
    }

    updateIncident() {
        this.incident.Update();
        this._setupInitialValues(this.incident);
        this.isDirty = false;
    }

    resetIncident() {
        if (!this.incident || !this.initialValues) {
            return;
        }

        this.incident.reporter = this.initialValues['reporter'];
        this.incident.state = this.initialValues['state'];
        this.incident.description = this.initialValues['description'];
    }

    incidentChanged(newValue, oldValue) {
        this.initialValues = {};

        if (!newValue) {
            return;
        }

        this._setupInitialValues(newValue);
    }

    valueEdited() {
        this.isDirty = true;
    }

    _setupInitialValues(incident) {
        this.initialValues['reporter'] = incident.reporter;
        this.initialValues['state'] = incident.state;
        this.initialValues['description'] = incident.description;
    }
}