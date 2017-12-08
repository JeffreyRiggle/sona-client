import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {HttpClient, Headers} from 'aurelia-http-client';
import {Incident} from './incident';
import {Attachment} from '../attachment/attachment';
import {Attribute} from '../attribute/attribute';
import notificationManager from '../notifications/sharednotificationmanager';
import {EventEmitter} from '../common/EventEmitter';

@inject(EventAggregator)
export class IncidentManager extends EventEmitter {
    constructor(EventAggregator) {
        super();
        this.eventAg = EventAggregator;
        this.httpClient = new HttpClient();
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
        this.httpClient.createRequest('/sona/v1/incidents')
            .asGet()
            .send()
            .then(data => {
                let incs = JSON.parse(data.response);

                incs.forEach(incident => {
                    this.incidents.push(this._convertIncident(incident));
                });

                if (incs.length > 0) {
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

        this.httpClient.createRequest('/sona/v1/' + incident.id + '/attachments')
            .asGet()
            .send()
            .then(data => {
                let attached = JSON.parse(data.response);

                if (!attached) {
                    return;
                }

                attached.forEach(attach => {
                    inc.addAttachment(new Attachment(attach.filename, attach.time));
                });
            }).catch(error => {
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
        this.httpClient.createRequest('/sona/v1/create')
        .asPost()
        .withContent(
            {
                description: incident.description,
                reporter: incident.reporter,
                attributes: incident.convertAttributes()
            }
        )
        .send()
        .then(data => {
            let incident = this._convertIncident(JSON.parse(data.response));
            this.incidents.push(incident);
            this._updateCurrentIncident(incident);
            notificationManager.addNotification('Incident ' + incident.id + ' created');
        })
        .catch(error => {
            notificationManager.addError('Unable to create incident.');
        });
    }

    getIncidents(filter) {
        this.httpClient.createRequest('/sona/v1/incidents')
        .asGet()
        .withParams({filter: JSON.stringify(filter)})
        .send()
        .then(data => {
            let incs = JSON.parse(data.response);

            this.incidents = [];
            incs.forEach(incident => {
                this.incidents.push(this._convertIncident(incident));
            });

            if (incs.length > 0) {
                this._updateCurrentIncident(this.incidents[0]);
            }
        }).catch(error => {
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