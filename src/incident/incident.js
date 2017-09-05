import {Attribute} from '../attribute/attribute';
import {Attachment} from '../attachment/attachment';

export class Incident {
    constructor(id, reporter, state, description) {
        this.id = id;
        this.reporter = reporter;
        this.state = state;
        this.description = description;
        this.attributes = [];
        this.attachments = [];
    }

    addAttribute(attributeName, attributeValue) {
        if (!attributeName || !attributeValue) {
            return;
        }

        this.attributes.push(new Attribute(attributeName, attributeValue));
    }

    removeAttribute(attribute) {
        let index = this.attributes.indexOf(attribute);
        if (index !== -1) {
            this.attributes.splice(index, 1);
        }
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
}