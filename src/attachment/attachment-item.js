import {inject, bindable, customElement} from 'aurelia-framework';
import './attachment-item.less';

@customElement('attachment-item')
@bindable('model')
@inject(Element)
export class AttachmentItem {
    constructor(element) {
        this.element = element;
        this.time = '';
    }

    modelChanged(newValue, oldValue) {
        if (!newValue) {
            this.time = '';
            return;
        }

        if (oldValue === newValue) {
            return;
        }

        this.time = newValue.getFormatedTime();
    }

    remove() {
        let e = new window.CustomEvent('removed', { detail: this.model });
        this.element.dispatchEvent(e);
    }

    download() {
        let e = new window.CustomEvent('download', {detail: this.model });
        this.element.dispatchEvent(e);
    }
}