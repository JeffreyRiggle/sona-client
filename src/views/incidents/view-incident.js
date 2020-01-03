import httpManager from "../../services/httpManager";
import {Incident} from '../../incident/incident';
import {Attribute} from '../../attribute/attribute';
import loginService from "../../services/loginService";
import './view-incident.less';

export class ViewIncident {
    constructor() {
        this.found = false;
        this.error = 'Initializing';
    }

    activate(value) {
        if (value.token) {
            loginService.setToken(value.token);
        }

        // TODO clean up incident manager and start using it.
        httpManager.get(`/sona/v1/incidents/${value.id}`).then((incident) => {
            const attributes = [];
            if (incident.attributes) {
                for (var prop in incident.attributes) {
                    if (incident.attributes.hasOwnProperty(prop)) {
                        attributes.push(new Attribute(prop, incident.attributes[prop]));
                    }
                }
            }

            this.incident = new Incident(incident.id, incident.reporter, incident.state, incident.description, attributes);
            this.found = true;
        }).catch(err => {
            if (err.status === 404) {
                this.error = 'Incident not found';
                return;
            }

            if (err.status === 403) {
                this.error = 'Cannot view Incident due to invalid permissions';
                return;
            }

            this.error = 'Unable to view incident at this time';
        });
    }
}