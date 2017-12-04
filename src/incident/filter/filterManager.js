import {Filter} from './filter';
import {ComplexFilter} from './complexfilter';
import {FilterRequest} from './filterrequest';
import _ from 'underscore';

const macroReg = /\"[^\"]*\"|\'[^\']*\'/g;
const juctReg = /\s+AND\s+|\s+OR\s+|\s+&&\s+|\s+\|\|\s+/gi;
const compareReg = /\s+equals\s+|\s+=\s+|\s+notequals\s+|\s+!=\s+|\s+contains\s+/gi;
const equalsReg = /\s+equals\s+|\s+=\s+/gi;
const notEqualsReg = /\s+notequals\s+|\s+!=\s+/gi;
const andReg = /\s+AND\s+|\s+&&\s+/gi;
const expressionReg = /\([^\)]*\)/g;

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
            
            let complexFilters = this._evaluteExpressionGroups(tempFilter, macros);

            if (complexFilters == null) {
                reject();
            }

            console.log(complexFilters);
            resolve(new FilterRequest(complexFilters, 'and'));
        });
    }

    _createExpressionGroups(input) {
        let macroString = input;
        let expressionMap = new Map();
        let closureStart = -1;
        let nestedClosures = 0;
        let replacement = 0;

        for (var i = 0; i < input.length; i++) {
            var c = input.charAt(i);

            if (c === '(' && closureStart === -1) {
                closureStart = i;
                continue;
            }

            if (c === '(' && closureStart !== -1) {
                nestedClosures++;
                continue;
            }

            if (c === ')' && closureStart !== -1 && nestedClosures > 0) {
                nestedClosures--;
                continue;
            }

            if (c === ')' && closureStart !== -1) {
                var closure = input.substring(closureStart+1, i);
                expressionMap.set('ExpressionReplacement' + replacement, closure);

                macroString = macroString.replace(closure, 'ExpressionReplacement' + replacement);
                closureStart = -1;
                replacement++;
            }
        }

        return {
            expressions: expressionMap,
            macro: macroString
        };
    }

    _evaluteExpressionGroups(input, macros) {
        var expressionGroups = this._createExpressionGroups(input);
        var complexFilters = [];

        if (!expressionGroups.expressions.size) {
            let filter = this._evaluteExpression(input, macros);

            if (filter === null) {
                return null;
            }

            complexFilters.push(filter);
            return complexFilters;
        }

        var nonexpression = expressionGroups.macro.replace(expressionReg, '');
        if (nonexpression) {
            complexFilters.push(this._evaluteExpression(nonexpression, macros));
        }

        var failed = false;

        expressionGroups.expressions.forEach((v, k, m) => {
            if (failed) {
                return;
            }

            console.log(v);

            let cFilter = new ComplexFilter([], this._getFirstJunction(v));
            if (!this._createExpressionGroups(v).expressions.size) {
                cFilter.children = [this._evaluteExpression(v, macros)];
            } else {
                cFilter.children = this._evaluteExpressionGroups(v, macros);
            }

            complexFilters.push(cFilter);
        });

        if (failed) {
            return null;
        }

        return complexFilters;
    }

    _evaluteExpression(input, macros) {
        let filters = [];
        let match = input.split(juctReg);
        let failed = false;
    
        match.forEach(m => {
            if (!m) {
                return;
            }
            
            var gFilter = this._generateFilterFromString(m, macros);
    
            if (gFilter === null) {
                failed = true;
            }
    
            filters.push(gFilter);
        });
    
        if (failed) {
            return null;
        }

        var junc;
        match = input.match(juctReg);
        match.forEach(m => {
            if (!junc) {
                junc = this._convertJunction(m);
                return;
            }
            
            if (junc !== this._convertJunction(m)) {
                failed = true;
            }
        });

        if (failed) {
            return null;
        }

        return new ComplexFilter(filters, junc);
    }

    _getFirstJunction(input) {
        var junc;
        var match = input.match(juctReg);
        match.forEach(m => {
            if (!junc) {
                junc = this._convertJunction(m);
                return;
            }
        });

        return junc;
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