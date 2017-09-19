export class Attachment {
    constructor(displayName, timestamp) {
        this.displayName = displayName;
        this.date = new Date(timestamp);
    }

    getFormatedTime() {
        var d = this.date;
        return d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes();
    }
}