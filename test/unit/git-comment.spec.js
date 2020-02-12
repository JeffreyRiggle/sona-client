import { GitComment } from "../../src/gitviewer/git-comment";

describe('GitComment', () => {
    let comment, now;

    beforeEach(() => {
        now = Date.now().toString();
        comment = new GitComment('This is a message', 'Steve', now);
    });

    it('should have the correct body', () => {
        expect(comment.body).toBe('This is a message');
    });

    it('should have the correct reporter', () => {
        expect(comment.reporter).toBe('Steve');
    });

    it('should have the correct created time', () => {
        expect(comment.created).toBe(now);
    });
});