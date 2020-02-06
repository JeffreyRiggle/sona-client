import { Attachment } from "../../src/attachment/attachment";

describe('Attachment', () => {
    let attachment;

    beforeEach(() => {
        attachment = new Attachment('foo.txt', Date.now());
    });
    
    it('should have the correct name', () => {
        expect(attachment.displayName).toBe('foo.txt');
    });

    it('should have the correct display date', () => {
        const format = /\d{1,2}\/\d{1,2}\/\d{4}\s\d{1,2}:\d{2}/;
        expect(format.test(attachment.getFormatedTime())).toBe(true);
    });
});