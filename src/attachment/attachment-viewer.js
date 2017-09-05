import {inject, bindable, customElement} from 'aurelia-framework';
import {DialogService} from 'aurelia-dialog';
import {UploadAttachments} from './upload-attachments';

@bindable('incident')
@customElement('attachment-viewer')
@inject(DialogService)
export class AttachmentViewer {
    constructor(dialogService) {
        this.dialogService = dialogService;
    }

    addAttachments() {
        var files = [];
        this.dialogService.open({viewModel: UploadAttachments, model: files})
            .whenClosed(response => {
                if (response.wasCancelled) {
                    console.log('Not uploading files since dialog was cancelled');
                } else {
                    if (response.output) {
                        this.uploadFiles(response.output);
                    }
                }
            });
    }

    uploadFiles(files) {
        files.forEach(file => {
            this.incident.addAttachment(file);
        });
    }

    removeAttachment(event) {
        this.incident.removeAttachment(event.detail);
    }
}