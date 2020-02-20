import 'aurelia-polyfills';
import {Options} from 'aurelia-loader-nodejs';
import {globalize} from 'aurelia-pal-nodejs';
import {JSDOM} from 'jsdom';
import path from 'path';
Options.relativeToDir = path.join(__dirname, 'unit');
globalize();

global.Window = function() {

};

global.navigator = {
    userAgent: 'chrome'
};