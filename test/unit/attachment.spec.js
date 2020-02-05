import { Attachment } from "../../src/attachment/attachment";

describe('Attachment', () => {
    let attachment;

    beforeEach(() => {
        attachment = new Attachment('foo.txt', 1580903174652);
    });
    
    it('should have the correct name', () => {
        expect(attachment.displayName).toBe('foo.txt');
    });

    it('should have the correct display date', () => {
        expect(attachment.getFormatedTime()).toBe('5/1/2020 6:46');
    });
});