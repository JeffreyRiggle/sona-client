import {bindable, customElement} from 'aurelia-framework';
import {GitComment} from './git-comment';
import './git.less';
import httpManager from '../services/httpManager';

@customElement('git-issue-viewer')
@bindable('issue')
export class GitIssueViewer {
    constructor() {
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
        httpManager.get(issue, [{
            key: 'Access-Control-Allow-Origin',
            value: '*'
        }]).then(data => {
            this.closed = data.closed_at;
            this.id = data.title;
            this.state = data.state;
            this.reporter = data.user.login;

            this.comments.push(new GitComment(data.body, data.user.login, new Date(data.created_at).toString()));
            this._getComments(issue + '/comments', callback);
        });
    }

    _getComments(url, callback) {
        httpManager.get(url, [{
            key: 'Access-Control-Allow-Origin',
            value: '*'
        }]).then(data => {
            data.forEach(i => {
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