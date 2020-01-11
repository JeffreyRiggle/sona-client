import {Grid as AGGrid} from "ag-grid/main";

import "ag-grid/dist/styles/ag-grid.css";
import "ag-grid/dist/styles/ag-theme-balham.css";
import { bindable, inject } from "aurelia-framework";

import './grid.less';

let currId = 0;

@bindable('columnDefinitions')
@bindable('rowData')
@inject(Element)
export class Grid {
    constructor(element) {
        this.element = element;
        this.gridId = `grid-${++currId}`;
        this.gridOptions = {
            defaultColDef: {
                enablePivot: true,
                sortable: true
            },
            onSelectionChanged: this.onSelectionChanged.bind(this),
            rowSelection: 'single',
            showToolPanel: true
        };
    }

    attached() {
        this.gridOptions.columnDefs = this.columnDefinitions;
        this.gridOptions.rowData = this.rowData;
        this.grid = new AGGrid(document.getElementById(this.gridId), this.gridOptions);
    }

    columnDefinitionsChanged(newValue) {
        this.gridOptions.columnDefs = newValue;
    }

    rowDataChanged(newValue) {
        this.gridOptions.api && this.gridOptions.api.setRowData(newValue);
    }

    onSelectionChanged(data) {
        const newRows = this.gridOptions.api.getSelectedRows();
        let e = new CustomEvent('selectedchanged', { detail: newRows[0] });
        this.element.dispatchEvent(e);
    }
}