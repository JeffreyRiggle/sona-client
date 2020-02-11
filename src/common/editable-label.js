import {inject, bindable, customElement} from 'aurelia-framework';
import './editable-label.less';

@customElement('editable-label')
@bindable('item')
@bindable('buttonClass')
@inject(Element)
export class EditableLabel {
    constructor(element) {
        this.original = '';
        this.isEditing = false;
        this.element = element;
    }

    toggleIsEditing() {
        this.isEditing = !this.isEditing;

        if (!this.isEditing) {
            this._raiseEdited();
        } else {
            this.original = this.item;
        }
    }

    _raiseEdited() {
        let e = new window.CustomEvent('edited', {detail: this.item });
        this.element.dispatchEvent(e);
    }

    handleKeyPress(event) {
        if (event.key === 'Escape') {
            this.item = this.original;
            this.isEditing = false;
        }

        if (event.key === 'Enter') {
            this.toggleIsEditing();
        }

        return true;
    }
}