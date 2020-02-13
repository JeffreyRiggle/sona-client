import {createNewInstance} from '../../src/incident/filter/filterManager';
import {Filter} from '../../src/incident/filter/filter';
import {ComplexFilter} from '../../src/incident/filter/complexfilter';
import {FilterRequest} from '../../src/incident/filter/filterrequest';

describe('FilterManager', function() {
    var manager;

    beforeEach(function() {
        manager = createNewInstance();
    });

    describe('when a simple filter is used', function() {
        describe('when a property is added', function() {
            var filter,
                expectedFilter;

            beforeEach(function() {
                expectedFilter = new FilterRequest([
                    new ComplexFilter([
                        new Filter('Reporter', 'contains', 'Tester')
                    ], 'and')
                ], 'and');

                manager.updateSimpleFilter('Reporter', 'Tester');
                filter = manager.generateSimpleFilter();
            });

            it('should create the expected filter', function() {
                expect(filter).toEqual(expectedFilter);
            });
        });

        describe('when multiple properties are added', function() {
            var filter, expectedFilter;

            beforeEach(function() {
                expectedFilter = new FilterRequest([
                    new ComplexFilter([
                        new Filter('Reporter', 'contains', 'Tester'),
                        new Filter('State', 'contains', 'open'),
                        new Filter('Id', 'contains', '1')
                    ], 'and')
                ], 'and');

                manager.updateSimpleFilter('Reporter', 'Tester');
                manager.updateSimpleFilter('State', 'open');
                manager.updateSimpleFilter('Id', '1');
                filter = manager.generateSimpleFilter();
            });

            it('should create the expected filter', function() {
                expect(filter).toEqual(expectedFilter);
            });

            describe('when a property is removed', function() {
                var updatedFilter, expectedUpdatedFilter;

                beforeEach(function() {
                    expectedUpdatedFilter = new FilterRequest([
                        new ComplexFilter([
                            new Filter('Reporter', 'contains', 'Tester'),
                            new Filter('Id', 'contains', '1')
                        ], 'and')
                    ], 'and');
    
                    manager.removeFromSimpleFilter('State');
                    updatedFilter = manager.generateSimpleFilter();
                });

                it('should create the updated filter', function() {
                    expect(updatedFilter).toEqual(expectedUpdatedFilter);
                });
            });

            describe('when a property is updated', function() {
                var updatedFilter, expectedUpdatedFilter;

                beforeEach(function() {
                    expectedUpdatedFilter = new FilterRequest([
                        new ComplexFilter([
                            new Filter('Reporter', 'contains', 'Tester'),
                            new Filter('State', 'contains', 'closed'),
                            new Filter('Id', 'contains', '1')
                        ], 'and')
                    ], 'and');
    
                    manager.updateSimpleFilter('State', 'closed');
                    updatedFilter = manager.generateSimpleFilter();
                });

                it('should create the updated filter', function() {
                    expect(updatedFilter).toEqual(expectedUpdatedFilter);
                });
            });
        });
    });

    describe('when a complex filter is used', function() {
        describe('when a simple equals filter is used', function() {
            var filter, expectedFilter;

            beforeEach(function(done) {
                expectedFilter = new FilterRequest([
                    new ComplexFilter([
                        new Filter('Reporter', 'equals', 'Tester')
                    ], 'and')
                ], 'and');

                manager.generateComplexFilter('Reporter = \'Tester\'').then(result => {
                    filter = result;
                    done();
                });
            });

            it('should create the correct filter', function() {
                expect(filter).toEqual(expectedFilter);
            });
        });

        describe('when a simple contains filter is used', function() {
            var filter, expectedFilter;

            beforeEach(function(done) {
                expectedFilter = new FilterRequest([
                    new ComplexFilter([
                        new Filter('Reporter', 'contains', 'Tester')
                    ], 'and')
                ], 'and');

                manager.generateComplexFilter('Reporter contains \'Tester\'').then(result => {
                    filter = result;
                    done();
                });
            });

            it('should create the correct filter', function() {
                expect(filter).toEqual(expectedFilter);
            });
        });

        describe('when a simple not equals filter is used', function() {
            var filter, expectedFilter;

            beforeEach(function(done) {
                expectedFilter = new FilterRequest([
                    new ComplexFilter([
                        new Filter('Reporter', 'notequals', 'Tester')
                    ], 'and')
                ], 'and');

                manager.generateComplexFilter('Reporter != \'Tester\'').then(result => {
                    filter = result;
                    done();
                });
            });

            it('should create the correct filter', function() {
                expect(filter).toEqual(expectedFilter);
            });
        });

        describe('when a simple and filter is used', function() {
            var filter, expectedFilter;

            beforeEach(function(done) {
                expectedFilter = new FilterRequest([
                    new ComplexFilter([
                        new Filter('Reporter', 'equals', 'Tester'),
                        new Filter('State', 'notequals', 'closed')
                    ], 'and')
                ], 'and');

                manager.generateComplexFilter('Reporter = \'Tester\' AND State != \'closed\'').then(result => {
                    filter = result;
                    done();
                });
            });

            it('should create the correct filter', function() {
                expect(filter).toEqual(expectedFilter);
            });
        });

        describe('when a simple && filter is used', function() {
            var filter, expectedFilter;

            beforeEach(function(done) {
                expectedFilter = new FilterRequest([
                    new ComplexFilter([
                        new Filter('Reporter', 'equals', 'Tester'),
                        new Filter('State', 'notequals', 'closed')
                    ], 'and')
                ], 'and');

                manager.generateComplexFilter('Reporter = \'Tester\' && State != \'closed\'').then(result => {
                    filter = result;
                    done();
                });
            });

            it('should create the correct filter', function() {
                expect(filter).toEqual(expectedFilter);
            });
        });

        describe('when a simple or filter is used', function() {
            var filter, expectedFilter;

            beforeEach(function(done) {
                expectedFilter = new FilterRequest([
                    new ComplexFilter([
                        new Filter('Reporter', 'equals', 'Tester'),
                        new Filter('State', 'notequals', 'closed')
                    ], 'or')
                ], 'and');

                manager.generateComplexFilter('Reporter = \'Tester\' OR State != \'closed\'').then(result => {
                    filter = result;
                    done();
                });
            });

            it('should create the correct filter', function() {
                expect(filter).toEqual(expectedFilter);
            });
        });

        describe('when a simple || filter is used', function() {
            var filter, expectedFilter;

            beforeEach(function(done) {
                expectedFilter = new FilterRequest([
                    new ComplexFilter([
                        new Filter('Reporter', 'equals', 'Tester'),
                        new Filter('State', 'notequals', 'closed')
                    ], 'or')
                ], 'and');

                manager.generateComplexFilter('Reporter = \'Tester\' || State != \'closed\'').then(result => {
                    filter = result;
                    done();
                });
            });

            it('should create the correct filter', function() {
                expect(filter).toEqual(expectedFilter);
            });
        });

        describe('when a multi-expression statement is used', function() {
            var filter, expectedFilter;

            beforeEach(function(done) {
                var child1 = new ComplexFilter([new Filter('Reporter', 'equals', 'Tester')], 'and');
                var child2 = new ComplexFilter([], 'or');

                child2.children = [
                    new ComplexFilter([
                        new Filter('State', 'notequals', 'closed'),
                        new Filter('Description', 'contains', 'Foo')
                    ], 'or')
                ];

                expectedFilter = new FilterRequest([child1, child2], 'and');

                manager.generateComplexFilter('Reporter = \'Tester\' AND (State != \'closed\' OR Description contains \'Foo\')').then(result => {
                    console.log('Got result ' + result);
                    filter = result;
                    done();
                });
            });

            it('should create the correct filter', function() {
                console.log('comparing ' + filter + ' to ' + expectedFilter);
                expect(filter).toEqual(expectedFilter);
            });
        });

        describe('when a nested multi-expression statement is used', function() {
            var filter, expectedFilter;

            beforeEach(function(done) {
                var child1 = new ComplexFilter([new Filter('Reporter', 'equals', 'Tester')], 'and');
                var child2 = new ComplexFilter([], 'or');
                var nestedChild = new ComplexFilter([], 'and');
                nestedChild.children = [
                    new ComplexFilter([
                        new Filter('State', 'equals', 'open'),
                        new Filter('testvar', 'equals', 'Foo')
                    ], 'and')
                ];

                child2.children = [
                    new ComplexFilter([
                        new Filter('State', 'notequals', 'closed'),
                        new Filter('Description', 'contains', 'Foo')
                    ], 'or'),
                    nestedChild
                ];

                expectedFilter = new FilterRequest([child1, child2], 'and');

                manager.generateComplexFilter('Reporter = \'Tester\' AND (State != \'closed\' OR Description contains \'Foo\' OR (State = \'open\' AND testvar = \'Foo\'))').then(result => {
                    filter = result;
                    done();
                });
            });

            it('should create the correct filter', function() {
                expect(filter).toEqual(expectedFilter);
            });
        });
    });
});