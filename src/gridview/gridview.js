import {inject, bindable, customElement} from 'aurelia-framework';
import _ from 'underscore';
import './gridview.less';

@bindable('options')
@bindable('items')
@bindable('selected')
@customElement('gridview')
@inject(Element)
export class GridView {
    constructor(element) {
        this.element = element;
        this.selected = {};
        this.selectedColumns = [];
        this.sortProperty = '';
    }

    itemClicked(item) {
        this.selected = item;

        let e = new CustomEvent('selectedchanged', { detail: this.selected });
        this.element.dispatchEvent(e);
    }

    optionsChanged(newValue, oldValue) {
        if (oldValue) {
            this.selectedColumns = [];
        }

        if (!newValue || !newValue.columns) {
            return;
        }

        newValue.columns.forEach(v => {
            if (v.selected) {
                this.selectedColumns.push(v);
            }
        });
    }

    onColumnAdded(event) {
        this.selectedColumns.push(event.detail);
    }

    onColumnRemoved(event) {
        let index = this.selectedColumns.indexOf(event.detail);

        if (index !== -1) {
            this.selectedColumns.splice(index, 1);
        }
    }

    changeSort(column) {
        var propertyChanged = this.sortProperty !== column.property;
        if (propertyChanged) {
            this.sortProperty = column.property;   
        }

        if (this.sortDirection === 'asc' && !propertyChanged) {
            column.direction = 'dsc';
        } else {
            column.direction = 'asc';
        }

        this.sortDirection = column.direction;
        this._applySort();
    }

    _applySort() {
        if (!this.sortProperty || !this.sortDirection) {
            return;
        }

        var temp = _.sortBy(this.items, this.sortProperty);

        if (this.sortDirection === 'dsc') {
            this.items = temp.reverse();
        } else {
            this.items =  temp;
        }
    }

    getItemValue(item, column) {
        if (column.converter) {
            return column.converter(item);
        }

        return item[column.property];
    }
}