/* eslint import/no-extraneous-dependencies: 0, global-require: 0 */
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const fs = require('fs');

const getConfig = require('./webpack.common.js');
const helpers = require('../helpers');

const ENV = 'production';
const ASSETS_PATH = './assets/';

const commonConfig = getConfig({
    env: ENV,
    folder: ASSETS_PATH
});

const config = webpackMerge.smart(commonConfig, {
    module: {
        rules: [
            {
                test: /\.p?css$/,
                use: ExtractTextPlugin.extract({
                    publicPath: '../../',
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader']
                })
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: { name: ASSETS_PATH + '[name].[ext]' }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true
                            },
                            gifsicle: {
                                interlaced: false
                            },
                            optipng: {
                                optimizationLevel: 7
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(svg)$/,
                use: [
                    {
                        loader: 'svg-sprite-loader',
                        options: { name: ASSETS_PATH + '[name].[ext]' }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            svgo: {
                                plugins: [
                                    { removeViewBox: false },
                                    { removeEmptyAttrs: false }
                                ]
                            }
                        }
                    }
                ],
                include: [
                    helpers.root('src')
                ]
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            beautify: false,
            sourceMap: false,
            warnings: false
        }),
        new ExtractTextPlugin('./assets/[hash].[name].css'),
        function () {
            this.plugin('done', function (stats) {
                fs.writeFileSync(
                    helpers.root('./build', 'buildHash.json'),
                    JSON.stringify(stats.toJson().hash, null, 2)
                );
            });
        }
    ]
});

module.exports = config;
