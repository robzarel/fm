const { name, version } = require('../package.json');

const config = {
    common: {
        version
    },
    client: {},
    server: {
        host: 'http://localhost',
        port: 8080,
        proxy: {
            host: 'http://localhost',
            port: 9090
        }
    }
};

module.exports = config;
