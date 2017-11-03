import {inject, bindable, customElement} from 'aurelia-framework';
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
    }

    itemClicked(item) {
        this.selected = item;

        let e = new CustomEvent('selectedchanged', { detail: this.selected });
        this.element.dispatchEvent(e);
    }
}