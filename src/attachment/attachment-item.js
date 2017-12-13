import {inject, bindable, customElement} from 'aurelia-framework';
import './attachment-item.less';

@customElement('attachment-item')
@bindable('model')
@inject(Element)
export class AttachmentItem {
    constructor(element) {
        this.element = element;
    }

    remove() {
        let e = new CustomEvent('removed', { detail: this.model });
        this.element.dispatchEvent(e);
    }

    download() {
        let e = new CustomEvent('download', {detail: this.model });
        this.element.dispatchEvent(e);
    }
}