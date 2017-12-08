import {inject, bindable, customElement} from 'aurelia-framework';
import _ from 'underscore';
import {createAttributeConverter} from './attributeConverter';

const defaultcolumns = [
    { displayName: 'ID', property: 'id', selected: true },
    { displayName: 'State', property: 'state', selected: true },
    { displayName: 'Reporter', property: 'reporter', selected: true },
    { displayName: 'Description', property: 'description', selected: false }
];

@customElement('incident-list-view')
@bindable('incidentmanager')
export class IncidentListView {
    constructor() {
        this.listOptions = {
            columns: _.union(defaultcolumns, this._getKnownColumns)
        };

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
                this.listOptions.columns.push({
                    displayName: att, 
                    property: att, 
                    selected: false,
                    converter: createAttributeConverter(att)
                });
            }
        });
    }

    _hasColumn(col) {
        var foundItems = _.filter(this.listOptions.columns, item => {
            return item.displayName === col;
        });

        return foundItems.length > 0;
    }

    updateSelection(event) {
        this.incidentmanager.setSelected(event.detail.id);
    }
}