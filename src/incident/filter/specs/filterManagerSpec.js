import filterManager from '../filterManager';
import {Filter} from '../filter';
import {ComplexFilter} from '../complexfilter';
import {FilterRequest} from '../filterrequest';

describe('FilterManager', function() {
    var manager;

    beforeEach(function() {
        manager = filterManager.createNewInstance();
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
                expectedFilter = new FilterRequest([
                    new ComplexFilter([
                        new Filter('Reporter', 'equals', 'Tester'),
                        new Filter('State', 'notequals', 'closed')
                    ], 'or')
                ], 'and');

                manager.generateComplexFilter('Reporter = \'Tester\' AND (State != \'closed\' OR Description contains \'Foo\')').then(result => {
                    filter = result;
                    done();
                });
            });

            it('should create the correct filter', function() {
                expect(filter).toEqual(expectedFilter);
            });
        });

        describe('when a nested multi-expression statement is used', function() {
            var filter, expectedFilter;

            beforeEach(function(done) {
                expectedFilter = new FilterRequest([
                    new ComplexFilter([
                        new Filter('Reporter', 'equals', 'Tester'),
                        new Filter('State', 'notequals', 'closed')
                    ], 'or')
                ], 'and');

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