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
        this.hasGitIssue = false;
        this.showGit = false;
        this.gitIssue = undefined;

        if (!incident || !incident.attributes) {
            return;
        }

        let att = this._findGitAttribute(incident);
        if (att) {
            this.hasGitIssue = true;
            this.gitIssue = att;
            this.showGit = true;
        }
    }

    _findGitAttribute(incident) {
        let retVal = undefined;
        incident.attributes.forEach(att => {
            if (att.name === 'gitissue') {
                retVal = att.value;
            }
        });

        return retVal;
    }

    showNotes() {
        this.showGit = false;
    }

    hideNotes() {
        this.showGit = true;
    }
}