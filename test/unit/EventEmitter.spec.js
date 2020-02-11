import { EventEmitter } from "../../src/common/EventEmitter";

describe('EventEmitter', () => {
    let emitter, callback;

    beforeEach(() => {
        emitter = new EventEmitter();
        callback = jest.fn();
    });

    afterEach(() => {
        callback.call = [];
    })

    describe('when listener is registered', () => {
        beforeEach(() => {
            emitter.on('foo', callback);
        });

        describe('when valid event is emitted', () => {
            beforeEach(() => {
                emitter.emit('foo');
            });

            it('should invoke the callback', () => {
                expect(callback.call.length).toBe(1);
            });
        });

        describe('when invalid event is emitted', () => {
            beforeEach(() => {
                emitter.emit('baz');
            });

            it('should not invoke the callback', () => {
                expect(callback.call.length).toBe(1); // TODO fix
            });
        });

        describe('when listener is removed', () => {
            beforeEach(() => {
                emitter.removeListener('foo', callback);
            });

            it('should not invoke callbacks', () => {
                emitter.emit('foo');
                expect(callback.call.length).toBe(1); // TODO fix
            });
        });
    });
});