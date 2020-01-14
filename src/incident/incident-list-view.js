import {inject, bindable, customElement} from 'aurelia-framework';
import _ from 'underscore';
import {createAttributeConverter} from './attributeConverter';
import routing from '../services/routing';

const defaultcolumns = [
    { 
        displayName: 'ID',
        field: 'id',
        cellRenderer: (params) => {
            return `<a href="#/viewIncident/${params.value}">${params.value}</a>`
        }
    },
    { displayName: 'State', field: 'state' },
    { displayName: 'Reporter', field: 'reporter' },
    { displayName: 'Description', field: 'description' }
];

@customElement('incident-list-view')
@bindable('incidentmanager')
export class IncidentListView {
    constructor() {
        this.columns = _.union(defaultcolumns, this._getKnownColumns);
        this.updateKnownColumns = this._updateKnownColumns.bind(this)
    }

    incidentmanagerChanged(newValue, oldValue) {
        if (oldValue) {
            oldValue.removeListener('knownAttributesChanged', this.updateKnownColumns);
        }

        if (newValue) {
            this._updateKnownColumns();
            newValue.on('knownAttributesChanged', this.updateKnownColumns);
        }
    }

    _getKnownColumns() {
        var retVal = [];

        this.incidentmanager.knownAttributes.forEach(att => {
            retVal.push({
                displayName: att, 
                property: att, 
                selected: false,
                converter: createAttributeConverter(att)
            });
        });

        return retVal;
    }

    _updateKnownColumns() {
        this.incidentmanager.knownAttributes.forEach(att => {
            if (!this._hasColumn(att)) {
                this.columns.push({
                    displayName: att, 
                    property: att,
                    converter: createAttributeConverter(att)
                });
            }
        });
    }

    _hasColumn(col) {
        var foundItems = _.filter(this.columns, item => {
            return item.displayName === col;
        });

        return foundItems.length > 0;
    }

    updateSelection(event) {
        this.incidentmanager.setSelected(event.detail.id);
    }

    openIncident(event) {
        routing.navigate('viewIncident', { id: event.detail.id });
    }
}