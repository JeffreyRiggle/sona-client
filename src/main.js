import {PLATFORM} from 'aurelia-pal';

export function configure(aurelia) {
    aurelia.use
        .standardConfiguration()
        .plugin(PLATFORM.moduleName('aurelia-dialog'), config => {
            config.useDefaults();
        });

    aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}