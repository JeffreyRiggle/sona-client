import {inject, bindable, customElement} from 'aurelia-framework';

@customElement('viewing-area')
@bindable('incident')
export class ViewingArea {
    constructor() {
        this.hasGitIssue = false;
        this.gitIssue = '';
        this.showGit = false;
    }

    attached() {
        if (!this.incident || !this.incident.attributes) {
            return;
        }

        this.incident.attributes.forEach(att => {
            if (att.name === 'gitissue') {
                this.hasGitIssue = true;
                this.gitIssue = att.value;
                this.showGit = true;
            }
        });
    }

    showNotes() {
        this.showGit = false;
    }

    hideNotes() {
        this.showGit = true;
    }
}