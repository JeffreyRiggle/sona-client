import {dynamicOptions, inject} from 'aurelia-framework';

@dynamicOptions
@inject(Element)
export class ToolTipCustomAttribute {
    constructor(element) {
        this.element = element;
        this.element.classList.add('tooltip');

        this.element.addEventListener('mouseenter', this._showTooltip.bind(this));
        this.element.addEventListener('mouseleave', this._removeTooltip.bind(this));
        this.element.addEventListener('click', this._removeTooltip.bind(this));
    }

    propertyChanged(name, newValue, oldValue) {
        switch(name) {
            case 'text':
                this.text = newValue;
                break;
            case 'location':
                this.location = newValue;
                break;
            default:
                break;
        }
    }

    _showTooltip() {
        if (!this.text) {
            return;
        }

        this.tip = document.createElement('span');
        this.tip.innerText = this.text;

        switch(this.location) {
            case 'left':
                this.tip.classList.add('left-tooltip-text');
                break;
            case 'right':
                this.tip.classList.add('right-tooltip-text');
                break;
            case 'bottom':
                this.tip.classList.add('bottom-tooltip-text');
                break;
            case 'top':
            default:
                this.tip.classList.add('top-tooltip-text');
                break;
        }

        this.element.appendChild(this.tip);
    }

    _removeTooltip() {
        if (!this.tip) {
            return;
        }
        
        this.tip.remove();
        this.tip = null;
    }
}