import {inject} from 'aurelia-framework';
import {DialogController} from 'aurelia-dialog';
import {Incident} from './incident';

@inject(DialogController)
export class CreateIncident {
    constructor(controller) {
        this.controller = controller;
        this.header = 'Create Incident';
    }

    activate(incident = new Incident()) {
        this.incident = incident;
    }
}