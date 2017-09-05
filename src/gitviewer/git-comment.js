export class GitComment {
    constructor(body, reporter, time) {
        this.body = body;
        this.reporter = reporter;
        this.created = time;
    }
}