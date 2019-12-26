import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Incident} from './incident';
import {Attachment} from '../attachment/attachment';
import {Attribute} from '../attribute/attribute';
import notificationManager from '../notifications/sharednotificationmanager';
import {EventEmitter} from '../common/EventEmitter';
import httpManager from '../services/httpManager';

@inject(EventAggregator)
export class IncidentManager extends EventEmitter {
    constructor(EventAggregator) {
        super();
        this.eventAg = EventAggregator;
        this.incidents = [];
        this._knownAttributes = [];
        this._setup();
        /*this.currentincident = new Incident('2', 'tester', 'open', 'testing description');
        this.currentincident.addAttribute('gitissue', '/repos/JeffreyRiggle/logrunner/issues/2');
        var incident1 = new Incident('1', 'Someone', 'closed', 'some other description');
        incident1.addAttribute('gitissue', '/repos/JeffreyRiggle/logrunner/issues/1');
        this.incidents.push(incident1);
        this.incidents.push(this.currentincident);*/
    }

    _setup() {
        httpManager.get('/sona/v1/incidents').then(data => {
            data.forEach(incident => {
                this.incidents.push(this._convertIncident(incident));
            });

            if (data.length > 0) {
                this._updateCurrentIncident(this.incidents[0]);
            }
        }).catch(err => {
            notificationManager.addError('Unable to get incidents');
        });
    }

    _convertIncident(incident) {
        let attribs = [];
        let attributesChanged = false;

        if (incident.attributes) {
            for (var prop in incident.attributes) {
                let index = this.knownAttributes.indexOf(prop);
                if (index === -1) {
                    attributesChanged = true;
                    this._knownAttributes.push(prop);
                }

                if (incident.attributes.hasOwnProperty(prop)) {
                    attribs.push(new Attribute(prop, incident.attributes[prop]));
                }
            }
        }

        let inc = new Incident(incident.id, incident.reporter, incident.state, incident.description, attribs);

        httpManager.get(`/sona/v1/incidents/${incident.id}/attachments`).then(data => {
            if (!data) {
                return;
            }

            data.forEach(attach => {
                inc.addAttachment(new Attachment(attach.filename, attach.time));
            });
        }).catch(err => {
            if (err.status == 404) {
                return;
            }

            notificationManager.addError('Unable to get attachments for ' + incident.id);
        });

        if (attributesChanged) {
            this.emit('knownAttributesChanged');
        }

        return inc;
    }

    setSelected(id) {
        this.incidents.forEach(i => {
            if (i.id === id) {
                this._updateCurrentIncident(i);
                return;
            }
        });
    }

    createIncident(incident) {
        httpManager.post('/sona/v1/incidents', JSON.stringify({
            description: incident.description,
            reporter: incident.reporter,
            attributes: incident.convertAttributes()
        }), [{ key: 'Content-Type', value: 'application/json' }]).then(data => {
            let incident = this._convertIncident(data);
            this.incidents.push(incident);
            this._updateCurrentIncident(incident);
            notificationManager.addNotification('Incident ' + incident.id + ' created');
        }).catch(err => {
            notificationManager.addError('Unable to create incident.');
        });
    }

    getIncidents(filter) {
        httpManager.get(`/sona/v1/incidents?filter=${JSON.stringify(filter)}`).then(data => {
            this.incidents = [];
            data.forEach(incident => {
                this.incidents.push(this._convertIncident(incident));
            });

            if (data.length > 0) {
                this._updateCurrentIncident(this.incidents[0]);
            }
        }).catch(err => {
            notificationManager.addError('Unable to get incidents.');
        });
    }

    _updateCurrentIncident(incident) {
        this.currentincident = incident;
        this.eventAg.publish('incidentSelected', incident);
    }

    get knownAttributes() {
        return this._knownAttributes;
    }
}