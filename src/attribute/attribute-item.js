import {inject, bindable, customElement} from 'aurelia-framework';
import './attribute-item.less';

@customElement('attribute-item')
@bindable('model')
@inject(Element)
export class AttributeItem {
    constructor(element) {
        this.element = element;
    }

    remove() {
        let e = new CustomEvent('removed', { detail: this.model });
        this.element.dispatchEvent(e);
    }
}