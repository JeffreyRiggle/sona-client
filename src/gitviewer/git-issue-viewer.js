import {inject, bindable, customElement} from 'aurelia-framework';
import {HttpClient, Headers} from 'aurelia-http-client';
import {GitComment} from './git-comment';

@customElement('git-issue-viewer')
@bindable('issue')
export class GitIssueViewer {
    constructor() {
        this.httpClient = new HttpClient();
        this.id = 'Loading content...';
        this.comments = [];
    }

    attached() {
        this.httpClient.createRequest(this.issue)
            .withHeader('Access-Control-Allow-Origin', '*')
            .asGet()
            .send()
            .then(data => {
                var response = JSON.parse(data.response);
                this.closed = response.closed_at;
                this.id = response.title;
                this.state = response.state;
                this.reporter = response.user.login;

                this.comments.push(new GitComment(response.body, response.user.login, new Date(response.created_at).toString()));
                this.getComments(this.issue + '/comments');
            });
    }

    getComments(url) {
        this.httpClient.createRequest(url)
            .withHeader('Access-Control-Allow-Origin', '*')
            .asGet()
            .send()
            .then(data => {
                var response = JSON.parse(data.response);

                response.forEach(i => {
                    this.comments.push(new GitComment(i.body, i.user.login, new Date(i.created_at).toString()));
                });
            });
    }

    detached() {
        this.comments = [];
    }
}