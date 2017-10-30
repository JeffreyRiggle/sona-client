import { EventEmitter } from '../common/EventEmitter';

export class Notification extends EventEmitter {
    constructor(msg, identifier, error, ttl) {
        super();

        this.message = msg;
        this.id = identifier;
        this.error = error;
        this._initialize(ttl);
    }

    _initialize(ttl) {
        if (!ttl) {
            return;
        }

        window.setTimeout(() => {
            this.dismiss();
        }, ttl);
    }

    dismiss() {
        this.emit('dismissed');
    }
}