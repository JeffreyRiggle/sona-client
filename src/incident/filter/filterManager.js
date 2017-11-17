import {Filter} from './filter';
import {ComplexFilter} from './complexfilter';
import {FilterRequest} from './filterrequest';

class FilterManager {
    constructor() {
        this.complexFilter = '';
        this.simpleFilter = new Map();
    }

    updateSimpleFilter(property, value) {
        this.simpleFilter.set(property, value);
    }

    removeFromSimpleFilter(property) {
        this.simpleFilter.delete(property);
    }

    clearSimpleFilter() {
        this.simpleFilter.clear();
    }

    updateComplexFilter(filter) {
        this.complexFilter = filter;
    }

    generateSimpleFilter() {
        var filters = [];
        
        this.simpleFilter.forEach((value, key, map) => {
            filters.push(new Filter(key, 'contains', value));
        });
        
        return new FilterRequest([new ComplexFilter(filters, 'and')], 'and');
    }

    generateComplexFilter() {

    }
}

let manager = new FilterManager();
export default manager;