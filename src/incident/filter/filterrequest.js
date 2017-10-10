export class FilterRequest {
    constructor(filters, junction) {
        this.complexfilters = filters;
        this.union = junction;
    }
}