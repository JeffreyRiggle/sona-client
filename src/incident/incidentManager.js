import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {HttpClient, Headers} from 'aurelia-http-client';
import {Incident} from './incident';
import {Attachment} from '../attachment/attachment';

@inject(EventAggregator)
export class IncidentManager {
    constructor(EventAggregator) {
        this.eventAg = EventAggregator;
        this.httpClient = new HttpClient();
        this.incidents = [];
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
                    this.currentincident = this.incidents[0];
                }
            });
    }

    _convertIncident(incident) {
        let inc = new Incident(incident.id, incident.reporter, incident.state, incident.description);
        
        if (incident.attributes) {
            for (var prop in incident.attributes) {
                if (incident.attributes.hasOwnProperty(prop)) {
                    inc.addAttribute(prop, incident.attributes[prop]);
                }
            }
        }

        this.httpClient.createRequest('/sona/v1/' + incident.id + '/attachments')
            .asGet()
            .send()
            .then(data => {
                let attached = JSON.parse(data.response);

                if (!attached) {
                    return;
                }

                attached.forEach(attach => {
                    inc.addAttachment(new Attachment(attach.filename, ''));
                });
            });

        return inc;
    }

    setSelected(id) {
        this.incidents.forEach(i => {
            if (i.id === id) {
                this.currentincident = i;
                this.eventAg.publish('incidentSelected', i);
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
                state: incident.state
            }
        )
        .send()
        .then(data => {
            let incident = this._convertIncident(JSON.parse(data.response));
            this.incidents.push(incident);
            this.currentincident = incident;
        })
        .catch(error => {
            alert('unable to create incident');
        });
    }

    getIncidents(filter) {
        this.httpClient.createRequest('/sona/v1/incidents')
        .asGet()
        .send()
        .then(data => {
            let incs = JSON.parse(data.response);

            this.incidents = [];
            incs.forEach(incident => {
                this.incidents.push(this._convertIncident(incident));
            });

            if (incs.length > 0) {
                this.currentincident = this.incidents[0];
            }
        });
    }
}