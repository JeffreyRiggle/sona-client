import {inject, bindable, customElement} from 'aurelia-framework';
import './listview.less';

@bindable('options')
@bindable('items')
@customElement('listview')
@inject(Element)
export class ListView {
    constructor(element) {
        this.element = element;
    }

    itemClicked(item) {
        this.selected = item;

        let e = new CustomEvent('selectedchanged', { detail: this.selected });
        this.element.dispatchEvent(e);
    }
}