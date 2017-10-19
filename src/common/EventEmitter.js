export class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(event, listener) {
        if (typeof this.events[event] !== 'object') {
            this.events[event] = [];
        }

        this.events[event].push(listener);
    }

    removeListener(event, listener) {
        if (typeof this.events[event] === 'object') {
            let idx = indexOf(this.events[event], listener);

            if (idx > -1) {
                this.events[event].splice(idx, 1);
            }
        }
    }

    emit(event) {
        var i, listeners, args = [].slice.call(arguments, 1);

        if (typeof this.events[event] !== 'object') {
            return;
        }

        listeners = this.events[event].slice();
        listeners.forEach(l => {
            l.apply(this, args);
        });
    }
}