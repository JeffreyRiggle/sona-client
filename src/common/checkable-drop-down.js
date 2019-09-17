import {inject, bindable, customElement} from 'aurelia-framework';
import {DOM} from 'aurelia-pal';
import './checkable-drop-down.less';

@customElement('checkable-drop-down')
@bindable('items')
@bindable('title')
@bindable('buttonClass')
@inject(Element, DOM)
export class CheckableDropDown {
    constructor(element, dom) {
        this.element = element;
        this.dom = dom;
        this.showDropDown = false;
        this._init();
    }

    _init() {
        this.dom.addEventListener('keydown', this.onKeyPressed.bind(this));
    }

    hide() {
        setTimeout(() => {
            if (!this.element.querySelector(':focus')) {
                this.showDropDown = false;
            }
        });
    }

    onKeyPressed(event) {
        if (!this.showDropDown) {
            return;
        }

        if (event.key === 'Escape') {
            this.showDropDown = false;
        }
    }

    toggleShow() {
        this.showDropDown = !this.showDropDown;
    }

    itemChecked(item) {
        var e;

        if (item.selected) {
            e = new CustomEvent('item-checked', {detail: item});
        } else {
            e = new CustomEvent('item-unchecked', {detail: item});
        }

        this.element.dispatchEvent(e);
    }
}