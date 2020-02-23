import {inject} from 'aurelia-framework';
import {DialogController} from 'aurelia-dialog';
import './upload.less';

@inject(DialogController)
export class UploadAttachments {
    constructor(controller) {
        this.controller = controller;
        this.header = 'Upload Attachments';
        this.hasFiles = false;
    }

    activate(files = []) {
        this.files = files;
    }

    attachFile(event) {
        console.log('Got change event', event);
        if (!event.target || !event.target.files) {
            return;
        }

        var addedFiles = event.target.files;

        for (var i = 0; i < addedFiles.length; i++) {
            this.files.push(addedFiles[i]);
        }

        if (!this.hasFiles) {
            this.hasFiles = true;
        }
    }

    removeFile(file) {
        let index = this.files.indexOf(file);

        if (index !== -1) {
            this.files.splice(index, 1);
        }
    }
}