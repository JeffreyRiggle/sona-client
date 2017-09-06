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

    issueChanged(newValue, oldValue) {
        if (newValue === oldValue) {
            return;
        }

        this._cleanUp();
        this._updateGitIssue(newValue);
    }

    _updateGitIssue(issue) {
        this.httpClient.createRequest(issue)
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
            this._getComments(issue + '/comments');
        });
    }

    _getComments(url) {
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
        this._cleanUp();
    }

    _cleanUp() {
        this.comments = [];
    }
}