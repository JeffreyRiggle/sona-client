import {Filter} from './filter';
import {ComplexFilter} from './complexfilter';
import {FilterRequest} from './filterrequest';

const macroReg = /\"[^\"]*\"|\'[^\']*\'/g;
const juctReg = /\s+AND\s+|\s+OR\s+|\s+&&\s+|\s+\|\|\s+/gi;
const compareReg = /\s+equals\s+|\s+=\s+|\s+notequals\s+|\s+!=\s+|\s+contains\s+/gi;
const equalsReg = /\s+equals\s+|\s+=\s+/gi;
const notEqualsReg = /\s+notequals\s+|\s+!=\s+/gi;
const andReg = /\s+AND\s+|\s+&&\s+/gi;

class FilterManager {
    constructor() {
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

    generateSimpleFilter() {
        var filters = [];
        
        this.simpleFilter.forEach((value, key, map) => {
            filters.push(new Filter(key, 'contains', value));
        });
        
        return new FilterRequest([new ComplexFilter(filters, 'and')], 'and');
    }

    generateComplexFilter(filter) {
        return this._generateComplexFilterImpl(filter);
    }

    _generateComplexFilterImpl(filter) {
        return new Promise((resolve, reject) => {
            var tempFilter = filter;
            var iter = 0;
            let macros = new Map();
            var match = tempFilter.match(macroReg);
    
            match.forEach(m => {
                macros.set('MACROREPLACEMENT' + iter, m);
                tempFilter = tempFilter.replace(m, 'MACROREPLACEMENT' + iter);
                iter++;
            });
    
            let filters = [];
            
            if (!juctReg.test(tempFilter)) {
                var f = this._generateFilterFromString(tempFilter, macros);
                
                if (f === null) {
                    reject();
                } else {
                    resolve(new FilterRequest([new ComplexFilter([f], 'and')], 'and'));
                }

                return;
            }
    
            match = tempFilter.split(juctReg);
    
            match.forEach(m => {
                var gFilter = this._generateFilterFromString(m, macros);
    
                if (gFilter === null) {
                    reject();
                }
    
                filters.push(gFilter);
            });
    
            let complexFilters = [];
            iter = -1;
            var lastFilter;
            match = tempFilter.match(juctReg);
            match.forEach(m => {
                iter++;
                var junc = this._convertJunction(m);
                if (lastFilter && lastFilter.junction === junc) {
                    lastFilter.filters.push(filters[iter+1]);
                    return;
                }
    
                lastFilter = new ComplexFilter([filters[iter], filters[iter+1]], junc);
                complexFilters.push(lastFilter);
            });
    
            resolve(new FilterRequest(complexFilters, 'and'));
        });
    }

    _generateFilterFromString(input, replacements) {
        var match = input.match(compareReg);

        if (match.length <= 0) {
            return null;
        }

        const compare = this._convertCompare(match[0]);

        match = input.split(compareReg);

        if (match.length < 2) {
            return null;
        }

        const key = match[0];
        var value = match[1];

        if (replacements.has(value)) {
            value = replacements.get(value);
            value = value.substring(1, value.length-1);
        }

        return new Filter(key, compare, value);
    }

    _convertCompare(input) {
        if (equalsReg.test(input)) {
            return 'equals';
        }

        if (notEqualsReg.test(input)) {
            return 'notequals';
        }

        return 'contains';
    }

    _convertJunction(input) {
        if (andReg.test(input)) {
            return 'and';
        }

        return 'or';
    }
}

let manager = new FilterManager();
export default manager;