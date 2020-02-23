import { Attribute } from "../../src/attribute/attribute";

describe('Attribute', () => {
    let attribute;

    beforeEach(() => {
        attribute = new Attribute('foo', 'bar');
    });

    it('should have the correct value', () => {
        expect(attribute.value).toBe('bar');
    });

    it('should have the correct name', () => {
        expect(attribute.name).toBe('foo');
    });
});