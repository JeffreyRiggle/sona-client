import {inject, bindable, customElement} from 'aurelia-framework';
import {DialogService} from 'aurelia-dialog';
import {UploadAttachments} from './upload-attachments';
import {Attachment} from './attachment';
import './attachment-viewer.less';

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
            this._uploadAttachment(file);
        });
    }

    _uploadAttachment(file) {
        var data = new window.FormData();
        data.append("uploadfile", file);
        this.incident.addAttachment(new Attachment(file.name), data);
    }
    
    removeAttachment(event) {
        this.incident.removeAttachment(event.detail);
    }

    downloadAttachment(event) {
        this.incident.downloadAttachment(event.detail);
    }
}