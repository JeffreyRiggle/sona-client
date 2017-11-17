import {inject, bindable, customElement} from 'aurelia-framework';
import {DialogService} from 'aurelia-dialog';
import {Incident} from './incident';
import {CreateIncident} from './create-incident';
import filterManager from './filter/filterManager';
import './incident-search.less';

@customElement('incident-search')
@bindable('incidentmanager')
@inject(DialogService)
export class IncidentSearch {

    constructor(dialogService) {
        this.dialogService = dialogService;
        this.searchProps = [
            {displayName: 'ID', searchId: 'Id', selected: false, searchValue: '' },
            {displayName: 'State', searchId: 'State', selected: true, searchValue: '' },
            {displayName: 'Reporter', searchId: 'Reporter', selected: true, searchValue: '' },
            {displayName: 'Description', searchId: 'Description', selected: false, searchValue: '' }
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
        filterManager.clearSimpleFilter();

        this.searchProps.forEach(v => {
            if (v.selected && v.searchValue) {
                filterManager.updateSimpleFilter(v.searchId, v.searchValue);
            }
        });

        var filter = filterManager.generateSimpleFilter();

        if (filter.complexfilters.length <= 0) {
            this.incidentmanager.getIncidents();
            return;
        }

        this.incidentmanager.getIncidents(filter);
    }

    preformAdvancedSearch() {

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