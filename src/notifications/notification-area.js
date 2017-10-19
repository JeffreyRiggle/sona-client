import {inject, bindable, customElement} from 'aurelia-framework';
import notificationManager from './sharednotificationmanager';
import './notification.less';

@customElement('notification-area')
export class NotificationArea {
    constructor() {
        this.notifications = [];
        this.show = false;

        notificationManager.on('notificationAdded', notification => {
            this._notificationAdded(notification);
        });

        notificationManager.on('notificationRemoved', notification => {
            this._notificationRemoved(notification);
        });
    }

    _notificationAdded(notification) {
        this.notifications.push(notification);
    }

    _notificationRemoved(notification) {
        let index = this.notifications.indexOf(notification);
        
        if (index !== -1) {
            this.notifications.splice(index, 1);
        }
    }
}