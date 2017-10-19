import { EventEmitter } from '../common/EventEmitter';
import { Notification } from './notification';

export class NotificationManager extends EventEmitter {
    constructor() {
        super();
        this.notifications = {};
        this.nextId = 0;
    }

    addNotification(message) {
        this._addNotification(new Notification(message, this.nextId++, false));
    }

    addError(message) {
        this._addNotification(new Notification(message, this.nextId++, true));
    }

    _addNotification(notification) {
        this.notifications[notification.id] = notification;
        
        notification.on('dismissed', () => {
            this.removeNotification(notification.id);
        });
        
        this.emit('notificationAdded', notification);
    }

    removeNotification(id) {
        var notification = this.notifications[id];
        this.emit('notificationRemoved', notification);

        delete this.notifications[id];
    }
}