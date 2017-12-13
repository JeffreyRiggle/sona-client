import {inject} from 'aurelia-framework';
import {IncidentManager} from './incident/incidentManager';
import Split from 'split.js';
require('font-awesome/css/font-awesome.min.css');
import './main.less';

@inject(IncidentManager)
export class App {
    constructor(IncidentManager) {
        this.heading = "Attributes";
        this.incidentmanager = IncidentManager;
    }

    attached() {
        Split(['#listview', '#viewer'], {
            sizes: [65, 35]
        });
    }
}