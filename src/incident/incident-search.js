import {inject, bindable, customElement} from 'aurelia-framework';
import {DialogService} from 'aurelia-dialog';
import {Incident} from './incident';
import {CreateIncident} from './create-incident';

@customElement('incident-search')
@bindable('incidentmanager')
@inject(DialogService)
export class IncidentSearch {

    constructor(dialogService) {
        this.dialogService = dialogService;
        let searchID = '';
        let searchState = '';
        let searchReporter = '';
    }

    preformSearch() {
        alert('Searching for ID ' + this.searchID + ' State ' + this.searchState + ' reporter ' + this.searchReporter);
    }

    createIncident() {
        var incident = new Incident(1, '', '', '', '');
        this.dialogService.open({viewModel: CreateIncident, model: incident})
        .whenClosed(response => {
            if (response.wasCancelled) {
                console.log('Not uploading files since dialog was cancelled');
            } else {
                if (response.output) {
                    this.incidentmanager.createIncident(incident);
                }
            }
        });
    }
}