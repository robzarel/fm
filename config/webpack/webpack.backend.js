/* eslint import/no-extraneous-dependencies: 0 */

const fs = require('fs');
const webpack = require('webpack');
const merge = require('webpack-merge');

const getConfig = require('./webpack.common.js');
const helpers = require('../helpers');

const ASSETS_PATH = './assets/';
const ENV = process.env.NODE_ENV;

const commonConfig = getConfig({
    env: ENV,
    folder: ASSETS_PATH
});

let nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function (x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function (mod) {
        nodeModules[mod] = `commonjs ${mod}`;
    });

let webpackConfig = merge.smart(
    commonConfig,
    {
        target: 'node',
        node: {
            __filename: true,
            __dirname: true
        },
        entry: [helpers.root('src', 'server', 'index.js')],
        output: {
            path: helpers.root('build'),
            publicPath: '/',
            filename: 'server.js'
        },
        externals: nodeModules,
        plugins: [
            new webpack.NormalModuleReplacementPlugin(/\.css$/, 'node-noop')
        ]
    }
);

module.exports = webpackConfig;
