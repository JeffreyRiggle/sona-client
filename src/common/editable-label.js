import {inject, bindable, customElement} from 'aurelia-framework';

@customElement('editable-label')
@bindable('item')
export class EditableLabel {
    constructor() {
        this.isEditing = false;
    }

    toggleIsEditing() {
        this.isEditing = !this.isEditing;
    }
}