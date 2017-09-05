import {inject} from 'aurelia-framework';
import {DialogController} from 'aurelia-dialog';
import {Attachment} from './attachment';

@inject(DialogController)
export class UploadAttachments {
    constructor(controller) {
        this.controller = controller;
        this.header = 'Upload Attachments';
    }

    activate(files = []) {
        this.files = files;
    }

    attachFile(event) {
        if (!event.target || !event.target.files) {
            return;
        }

        var addedFiles = event.target.files;

        for (var i = 0; i < addedFiles.length; i++) {
            var file = addedFiles[i];
            this.files.push(new Attachment(file.name, ''));
            console.log(file);
        }
    }
}