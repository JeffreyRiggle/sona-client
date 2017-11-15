import {inject, bindable, customElement} from 'aurelia-framework';
import './editable-label.less';

@customElement('editable-label')
@bindable('item')
@inject(Element)
export class EditableLabel {
    constructor(element) {
        this.isEditing = false;
        this.element = element;
    }

    toggleIsEditing() {
        this.isEditing = !this.isEditing;

        if (!this.isEditing) {
            this._raiseEdited();
        }
    }

    _raiseEdited() {
        let e = new CustomEvent('edited', {detail: this.item });
        this.element.dispatchEvent(e);
    }
}