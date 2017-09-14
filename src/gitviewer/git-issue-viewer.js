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
        if (this.updating) {
            return;
        }

        this._updateGitIssue(this.issue);
    }

    issueChanged(newValue, oldValue) {
        if (newValue === oldValue) {
            return;
        }

        if (!newValue) {
            this.id = 'Unable to find content';
            this.comments = [];
            return;
        }

        this.updating = true;
        this._cleanUp();
        this._updateGitIssue(newValue, () => { this.updating = false; });
    }

    _updateGitIssue(issue, callback) {
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
                this._getComments(issue + '/comments', callback);
            });
    }

    _getComments(url, callback) {
        this.httpClient.createRequest(url)
            .withHeader('Access-Control-Allow-Origin', '*')
            .asGet()
            .send()
            .then(data => {
                var response = JSON.parse(data.response);

                response.forEach(i => {
                    this.comments.push(new GitComment(i.body, i.user.login, new Date(i.created_at).toString()));
                });

                if (callback) {
                    callback();
                }
            });
    }

    viewInGit() {
        window.open('https://github.com/' + this.issue.substring(7, this.issue.length));
    }
    
    detached() {
        this._cleanUp();
    }

    _cleanUp() {
        this.comments = [];
    }
}