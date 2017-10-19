import {inject, bindable, customElement} from 'aurelia-framework';

@customElement('notification-item')
@bindable('notification')
export class NotificationItem {
    constructor() { 
        this.show = true;
    }

    closeNotification() {
        this.notification.dismiss();
    }
}