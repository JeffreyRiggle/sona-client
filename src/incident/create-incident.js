import {inject} from 'aurelia-framework';
import {DialogController} from 'aurelia-dialog';
import {Incident} from './incident';
import './create-incident.less';

const showAttributeTitle = 'Show Attributes';
const hideAttributeTitle = 'Hide Attributes';

@inject(DialogController)
export class CreateIncident {
    constructor(controller) {
        this.controller = controller;
        this.header = 'Create Incident';
        this.buttonTitle = showAttributeTitle;
        this.showAttributes = false;
    }

    activate(incident = new Incident(undefined, '', '', '', [])) {
        this.incident = incident;
    }

    toggleAttributes() {
        if (this.showAttributes) {
            this.buttonTitle = showAttributeTitle;
            this.showAttributes = false;
            return;
        }

        this.buttonTitle = hideAttributeTitle;
        this.showAttributes = true;
    }
}