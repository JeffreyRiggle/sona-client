import {createAttributeConverter} from '../../src/incident/attributeConverter';

describe('attributeConverter', function() {
    var converter, retVal, testVal;

    describe('when a converter is created', function() {
        beforeEach(function() {
            converter = createAttributeConverter('test');
        });

        it('should not be null', function() {
            expect(converter).not.toBeNull();
        });

        describe('when a value with a matching attribute is evalutated', function() {
            beforeEach(function() {
                testVal = {
                    attributes: [
                        {name: 'test', value: 'testValue'},
                        {name: 'val', value: 'valValue'},
                        {name: 'var', value: 'varValue'}
                    ]
                };

                retVal = converter(testVal);
            });

            it('should get the correct value', function() {
                expect(retVal).toEqual('testValue');
            });
        });

        describe('when a value without a matching attribute is evaluated', function() {
            beforeEach(function() {
                testVal = {
                    attributes: [
                        {name: 'val', value: 'valValue'},
                        {name: 'var', value: 'varValue'}
                    ]
                };

                retVal = converter(testVal);
            });

            it('should not get a value', function() {
                expect(retVal).toEqual('');
            });
        });

        describe('when a value with multiple matching attributes is evalutated', function() {
            beforeEach(function() {
                testVal = {
                    attributes: [
                        {name: 'test', value: 'testValue'},
                        {name: 'test', value: 'testValue2'},
                        {name: 'val', value: 'valValue'},
                        {name: 'var', value: 'varValue'}
                    ]
                };

                retVal = converter(testVal);
            });

            it('should get the first matching value', function() {
                expect(retVal).toEqual('testValue');
            });
        });
    });
});