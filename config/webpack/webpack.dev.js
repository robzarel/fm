/* eslint import/no-extraneous-dependencies: 0, global-require: 0 */
const path = require('path');
const webpackMerge = require('webpack-merge');
const getConfig = require('./webpack.common.js');

const ENV = 'development';
const ASSETS_PATH = './assets/';

const commonConfig = getConfig({
    env: ENV,
    folder: ASSETS_PATH
});

const config = webpackMerge.smart(commonConfig, {
    devtool: 'cheap-module-source-map',
    output: {
        devtoolModuleFilenameTemplate: info =>
            path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')
    }
});

module.exports = config;
