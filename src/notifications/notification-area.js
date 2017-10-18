import {inject, bindable, customElement} from 'aurelia-framework';
import notificationManager from './sharednotificationmanager';
import './notification.less';

@customElement('notification-area')
export class NotificationArea {
    constructor() {
        this.currentNotification = undefined;
        this.show = false;

        notificationManager.on('notificationAdded', notification => {
            this._notificationAdded(notification);
        });
    }

    _notificationAdded(notification) {
        this.currentNotification = notification;
        this.show = true;
    }

    closeNotification() {
        if (!this.currentNotification) {
            return;
        }

        this.show = false;
        notificationManager.removeNotification(this.currentNotification.id);
        this.currentNotification = undefined;
    }
}