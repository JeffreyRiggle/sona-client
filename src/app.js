import {Attribute} from './attribute/attribute';
import {Incident} from './incident/incident';

export class App {
    constructor() {
        this.heading = "Attributes";
        this.currentincident = new Incident('1', 'tester', 'open', 'testing description');
        this.currentincident.addAttribute('gitissue', '/repos/JeffreyRiggle/logrunner/issues/2');
    }
}