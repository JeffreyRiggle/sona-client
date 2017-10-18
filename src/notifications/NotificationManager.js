import { EventEmitter } from '../common/EventEmitter';
import { Notification } from './notification';

export class NotificationManager extends EventEmitter {
    constructor() {
        super();
        this.notifications = {};
        this.nextId = 0;
    }

    addNotification(message) {
        var notification = new Notification(message, this.nextId++, false);
        this.notifications[notification.id] = notification;

        this.emit('notificationAdded', notification);
    }

    addError(message) {
        var notification = new Notification(message, this.nextId++, true);
        this.notifications[notification.id] = notification;

        this.emit('notificationAdded', notification);
    }

    removeNotification(id) {
        var notification = this.notification[id];
        this.emit('notificationRemoved', notification);

        delete this.notifications[id];
    }
}