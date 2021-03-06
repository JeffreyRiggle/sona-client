import 'font-awesome/css/font-awesome.min.css';
import './main.less';
import { PLATFORM } from 'aurelia-pal';
import routingManager from './services/routing';

export class App {
    configureRouter(config, router) {
        config.title = 'Sona Client';
        config.map([
            { route: ['', 'home'], name: 'home', moduleId: PLATFORM.moduleName('views/home/home'), title: 'home' },
            { route: ['login'], name: 'login', nav: true, moduleId: PLATFORM.moduleName('views/auth/auth'), title: 'Login' },
            { route: ['createAccount'], name: 'createAccount', nav: true, moduleId: PLATFORM.moduleName('views/account-creation/createAccount'), title: 'Create Account' },
            { route: ['createIncident'], name: 'createIncident', nav: true, moduleId: PLATFORM.moduleName('views/incidents/create-incident'), title: 'Create Incident' },
            { route: 'viewIncident/:id', name: 'viewIncident', nav: true, moduleId: PLATFORM.moduleName('views/incidents/view-incident'), title: 'View Incident', href: '#viewIncident' }
        ]);

        routingManager.setRouter(router);
        router.refreshNavigation();
    }
}