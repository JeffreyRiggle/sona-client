import _ from 'underscore';

const createAttributeConverter = (attribute) => {
    function convert(value) {
        let found = _.filter(value.attributes, item => {
            return item.name === attribute;
        });

        if (found.length) {
            return found[0].value;
        }

        return '';
    }

    return convert;
};

export {
    createAttributeConverter
}