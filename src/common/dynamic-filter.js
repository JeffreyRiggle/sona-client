import {inject, bindable, customElement} from 'aurelia-framework';

@customElement('dynamic-filter')
@bindable('props')
@bindable('buttonClass')
export class DynamicFilter {
    constructor() {
        this.title = 'Add Property';
    }
}