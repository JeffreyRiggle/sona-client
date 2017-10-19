import {inject, bindable, customElement} from 'aurelia-framework';

@customElement('notification-item')
@bindable('notification')
export class NotificationItem {
    constructor() { 
    }

    closeNotification() {
        this.notification.dismiss();
    }
}