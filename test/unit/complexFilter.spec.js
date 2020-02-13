import { ComplexFilter } from "../../src/incident/filter/complexfilter";
import { Filter } from "../../src/incident/filter/filter";

describe('Complex Filter', () => {
    let filter;

    beforeEach(() => {
        filter = new ComplexFilter([new Filter('State', 'eq', 'foo')], 'or');
    });

    it('should have the correct filters', () => {
        expect(filter.filters.length).toBe(1);
    });

    it('should have the correct junction', () => {
        expect(filter.junction).toBe('or');
    });
})