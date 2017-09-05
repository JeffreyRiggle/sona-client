import {Aurelia, PLATFORM} from 'aurelia-framework';
// Hack to force webpack to load styles
import styles from './styleloader/loader';

export function configure(aurelia) {
    aurelia.use
        .standardConfiguration()
        .developmentLogging()
        .plugin(PLATFORM.moduleName('aurelia-dialog'), config => {
            config.useDefaults();
        });

    aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}