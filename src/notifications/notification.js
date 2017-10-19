import { EventEmitter } from '../common/EventEmitter';

export class Notification extends EventEmitter {
    constructor(msg, identifier, error) {
        super();

        this.message = msg;
        this.id = identifier;
        this.error = error;
    }

    dismiss() {
        this.emit('dismissed');
    }
}