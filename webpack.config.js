/* eslint global-require: 0 */
switch (process.env.NODE_ENV) {
    case 'prod':
    case 'production':
        module.exports = require('./config/webpack/webpack.prod');
        break;
    case 'dev':
    case 'development':
    default:
        module.exports = require('./config/webpack/webpack.dev');
}