import {bindable, customElement} from 'aurelia-framework';
import {getSharedInstance} from './filter/filterManager';
import './incident-search.less';

@customElement('incident-search')
@bindable('incidentmanager')
export class IncidentSearch {
    constructor() {
        this.filterManager = getSharedInstance();
        this.searchExpression = '';
        this.searchProps = [
            {displayName: 'ID', searchId: 'Id', selected: false, searchValue: '' },
            {displayName: 'State', searchId: 'State', selected: true, searchValue: '' },
            {displayName: 'Reporter', searchId: 'Reporter', selected: true, searchValue: '' },
            {displayName: 'Description', searchId: 'Description', selected: false, searchValue: '' }
        ];

        this.advancedSearch = false;
        this.filterError = false;
    }

    enabledAdvanced() {
        this.advancedSearch = true;
    }

    disableAdvanced() {
        this.advancedSearch = false;
    }

    preformSearch() {
        this.filterManager.clearSimpleFilter();

        this.searchProps.forEach(v => {
            if (v.selected && v.searchValue) {
                this.filterManager.updateSimpleFilter(v.searchId, v.searchValue);
            }
        });

        var filter = this.filterManager.generateSimpleFilter();

        if (filter.complexfilters.length <= 0) {
            this.incidentmanager.getIncidents();
            return;
        }

        this.incidentmanager.getIncidents(filter);
    }

    preformAdvancedSearch() {
        this.filterManager.generateComplexFilter(this.searchExpression).then(filter => {
            if (this.filterError) {
                this.filterError = false;
            }
            
            this.incidentmanager.getIncidents(filter);
        }).catch(error => {
            if (!this.searchExpression) {
                this.filterError = false;
                this.incidentmanager.getIncidents();
                return;
            }

            this.filterError = true;
        });
    }
}