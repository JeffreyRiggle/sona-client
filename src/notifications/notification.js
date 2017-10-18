export class Notification {
    constructor(msg, identifier, error) {
        this.message = msg;
        this.id = identifier;
        this.error = error;
    }
}