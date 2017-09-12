import {HttpClient, Headers} from 'aurelia-http-client';
import {Attribute} from '../attribute/attribute';
import {Attachment} from '../attachment/attachment';

export class Incident {
    constructor(id, reporter, state, description) {
        this.id = id;
        this.reporter = reporter;
        this.state = state;
        this.description = description;
        this.httpClient = new HttpClient();
        this.attributes = [];
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

    addAttachment(attachment) {
        this.attachments.push(attachment);
    }

    removeAttachment(attachment) {
        let index = this.attachments.indexOf(attachment);
        if (index !== -1) {
            this.attachments.splice(index, 1);
        }
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
        })
        .catch(error => {
            console.log('Unable to update incident');
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