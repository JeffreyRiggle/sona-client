import {inject, bindable, customElement} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@customElement('viewing-area')
@bindable('incident')
@inject(EventAggregator)
export class ViewingArea {
    constructor(EventAggregator) {
        this.hasGitIssue = false;
        this.gitIssue = '';
        this.showGit = false;
        this.eventAg = EventAggregator;
    }

    attached() {
        this._updateGit(this.incident);
        this.subscriber = this.eventAg.subscribe('incidentSelected', selected => {
            this._updateGit(selected);
        });
    }

    detached() {
        this.subscriber.dispose();
    }

    _updateGit(incident) {
        if (!incident || !incident.attributes) {
            return;
        }

        incident.attributes.forEach(att => {
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