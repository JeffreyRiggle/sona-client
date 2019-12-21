import {inject} from 'aurelia-framework';
import {IncidentManager} from '../../incident/incidentManager';
import Split from 'split.js';
import loginService from '../../services/loginService';
import routing from '../../services/routing';

@inject(IncidentManager)
export class Home {
    constructor(IncidentManager) {
        this.heading = "Attributes";
        this.incidentmanager = IncidentManager;
    }

    attached() {
        if (!loginService.token) {
            setTimeout(() => {
                routing.navigate('login');
            });
            return;
        }

        Split(['#listview', '#viewer'], {
            sizes: [65, 35]
        });
    }
}