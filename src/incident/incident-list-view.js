import {inject, bindable, customElement} from 'aurelia-framework';
import _ from 'underscore';
import {createAttributeConverter} from './attributeConverter';
import routing from '../services/routing';

const defaultcolumns = [
    { 
        headerName: 'ID',
        field: 'id',
        cellRenderer: (params) => {
            return `<a href="#/viewIncident/${params.value}">${params.value}</a>`
        }
    },
    { headerName: 'State', field: 'state' },
    { headerName: 'Reporter', field: 'reporter' },
    { headerName: 'Description', field: 'description' }
];

@customElement('incident-list-view')
@bindable('incidentmanager')
export class IncidentListView {
    constructor() {
        this.columns = defaultcolumns;
    }

    updateSelection(event) {
        this.incidentmanager.setSelected(event.detail.id);
    }
}