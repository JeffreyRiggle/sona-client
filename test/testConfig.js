const isCI = process.env.TEST_MODE === 'ci';

const config = {
    webServerAddress: `http://localhost${isCI ? '' : ':3000'}/`
};

module.exports = {
    config
};