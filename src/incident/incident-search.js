import {inject, bindable, customElement} from 'aurelia-framework';
import {DialogService} from 'aurelia-dialog';
import {Incident} from './incident';
import {CreateIncident} from './create-incident';
import {Filter} from './filter/filter';
import {ComplexFilter} from './filter/complexfilter';
import {FilterRequest} from './filter/filterrequest';
import './incident-search.less';

@customElement('incident-search')
@bindable('incidentmanager')
@inject(DialogService)
export class IncidentSearch {

    constructor(dialogService) {
        this.dialogService = dialogService;
        this.searchProps = [
            {displayName: 'ID', selected: false, searchValue: '' },
            {displayName: 'State', selected: true, searchValue: '' },
            {displayName: 'Reporter', selected: true, searchValue: '' },
            {displayName: 'Description', selected: false, searchValue: '' }
        ];

        this.advancedSearch = false;
    }

    enabledAdvanced() {
        this.advancedSearch = true;
    }

    disableAdvanced() {
        this.advancedSearch = false;
    }

    preformSearch() {
        var filters = [];

        if (this.searchID) {
            filters.push(new ComplexFilter([new Filter('Id', 'contains', this.searchID)], 'and'));
        }

        if (this.searchState) {
            filters.push(new ComplexFilter([new Filter('State', 'contains', this.searchState)], 'and'));
        }

        if (this.searchReporter) {
            filters.push(new ComplexFilter([new Filter('Reporter', 'contains', this.searchReporter)], 'and'));
        }

        if (filters.length <= 0) {
            this.incidentmanager.getIncidents();
            return;
        }

        this.incidentmanager.getIncidents(new FilterRequest(filters, 'and'));
    }

    createIncident() {
        var incident = new Incident(undefined, '', '', '', []);
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