import {Attribute} from '../attribute/attribute';
import {EventAggregator} from 'aurelia-event-aggregator';
import notificationManager from '../notifications/sharednotificationmanager';
import _ from 'underscore';
import httpManager from '../services/httpManager';

export class Incident {
    constructor(id, reporter, state, description, attributes) {
        this.eventAggregator = new EventAggregator();
        this.id = id;
        this.reporter = reporter;
        this.state = state;
        this.description = description;
        this.attributes = attributes;
        
        this.attachments = [];
    }

    addAttribute(attributeName, attributeValue) {
        if (!attributeName || !attributeValue) {
            return;
        }

        this.attributes.push(new Attribute(attributeName, attributeValue));
        this.Update();
    }

    removeAttribute(attribute) {
        let index = this.attributes.indexOf(attribute);
        if (index !== -1) {
            this.attributes.splice(index, 1);
        }

        this.Update();
    }

    addAttachment(attachment, rawData) {
        if (!rawData) {
            this.attachments.push(attachment);
            return;
        }

        httpManager.post(`/sona/v1/incidents/${this.id}/attachment`, rawData).then(data => {
            if (data) {
                attachment.date = new Date(data.time);
            }

            this.attachments.push(attachment);
            notificationManager.addNotification('Succesfully attached ' + attachment.displayName);
        }).catch(err => {
            notificationManager.addError('Unable to attach ' + attachment.displayName);
        });
    }

    removeAttachment(attachment) {
        let index = this.attachments.indexOf(attachment);
        if (index === -1) {
            return;
        }

        this.attachments.splice(index, 1);

        httpManager.delete(`/sona/v1/incidents/${this.id}/attachments/${attachment.displayName}`).then(data => {
            notificationManager.addNotification('Removed attachment ' + attachment.displayName);
        }).catch(err => {
            notificationManager.addError('Unable to remove attachment ' + attachment.displayName);
        });
    }

    downloadAttachment(attachment) {
        window.open(`/sona/v1/incidents/${this.id}/attachment/${attachment.displayName}`);
    }

    Update() {
        if (_.isUndefined(this.id)) {
            return;
        }

        httpManager.put(`/sona/v1/incidents/${this.id}`, JSON.stringify({
            state: this.state,
            description: this.description,
            reporter: this.reporter,
            attributes: this.convertAttributes()
        }), [{ key: 'Content-Type', value: 'application/json' }]).then(data => {
            this.eventAggregator.publish('incidentupdated', this);
        }).catch(err => {
            notificationManager.addError('Unable to update incident ' + this.id);
        });
    }

    convertAttributes() {
        var retVal = {};

        this.attributes.forEach(att => {
            retVal[att.name] = att.value;
        });

        return retVal;
    }
}