import {inject, bindable, customElement} from 'aurelia-framework';

@customElement('attribute-viewer')
@bindable('incident')
export class AttributeViewer {
    constructor() {
        this.attributes = [];
        this.attributeName = '';
        this.attributeValue = '';
    }

    addAttribute() {
        if (!this.attributeName || !this.attributeValue) {
            return;
        }

        this.incident.addAttribute(this.attributeName, this.attributeValue);
        this.attributeName = '';
        this.attributeValue = '';
    }

    removeAttribute(att) {
        this.incident.removeAttribute(att);
    }
}