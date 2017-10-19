import {HttpClient, Headers} from 'aurelia-http-client';
import {Attribute} from '../attribute/attribute';
import {Attachment} from '../attachment/attachment';
import {EventAggregator} from 'aurelia-event-aggregator';
import notificationManager from '../notifications/sharednotificationmanager';

export class Incident {
    constructor(id, reporter, state, description, attributes) {
        this.eventAggregator = new EventAggregator();
        this.id = id;
        this.reporter = reporter;
        this.state = state;
        this.description = description;
        this.httpClient = new HttpClient();
        this.attributes = attributes;
        this.attachments = [];
    }

    addAttribute(attributeName, attributeValue) {
        if (!attributeName || !attributeValue) {
            return;
        }

        this.attributes.push(new Attribute(attributeName, attributeValue));
        this._updateIncident();
    }

    removeAttribute(attribute) {
        let index = this.attributes.indexOf(attribute);
        if (index !== -1) {
            this.attributes.splice(index, 1);
        }

        this._updateIncident();
    }

    addAttachment(attachment, rawData) {
        if (!rawData) {
            this.attachments.push(attachment);
            return;
        }

        this.httpClient.createRequest('/sona/v1/' + this.id + '/attachment')
        .asPost()
        .withContent(rawData)
        .send()
        .then(data => {
            let attached = JSON.parse(data.response);

            if (attached) {
                attachment.date = new Date(attached.time);
            }

            this.attachments.push(attachment);
            notificationManager.addNotification('Succesfully attached ' + attachment.displayName);
        })
        .catch(error => {
            notificationManager.addError('Unable to attach ' + attachment.displayName);
        });
    }

    removeAttachment(attachment) {
        let index = this.attachments.indexOf(attachment);
        if (index === -1) {
            return;
        }

        this.attachments.splice(index, 1);

        this.httpClient.createRequest('/sona/v1/' + this.id + '/attachment/' + attachment.displayName)
        .asDelete()
        .send()
        .then(data => {
            notificationManager.addNotification('Removed attachment ' + attachment.displayName);
        })
        .catch(error => {
            notificationManager.addError('Unable to remove attachment ' + attachment.displayName);
        });
    }

    downloadAttachment(attachment) {
        window.open('/sona/v1/' + this.id + '/attachment/' + attachment.displayName);
    }

    _updateIncident() {
        this.httpClient.createRequest('/sona/v1/' + this.id + '/update')
        .asPut()
        .withContent(
            {
                state: this.state,
                description: this.description,
                reporter: this.reporter,
                attributes: this._convertAttributes()
            })
        .send()
        .then(data => {
            console.log('incident updated.');
            this.eventAggregator.publish('incidentupdated', this);
        })
        .catch(error => {
            notificationManager.addError('Unable to update incident ' + this.id);
        });
    }

    _convertAttributes() {
        var retVal = {};

        this.attributes.forEach(att => {
            retVal[att.name] = att.value;
        });

        return retVal;
    }
}