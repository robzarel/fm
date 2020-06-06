/* eslint import/no-extraneous-dependencies: 0 */
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../webpack.config.js');

const serverPort = 9090;
const serverHost = 'localhost';

webpackConfig.entry.app.unshift(`webpack-dev-server/client?http://${serverHost}:${serverPort}`);

const serverConfig = {
    contentBase: webpackConfig.output.path,
    publicPath: webpackConfig.output.publicPath,
    filename: webpackConfig.output.filename,
    historyApiFallback: true,
    quiet: false,
    noInfo: false,
    inline: true,
    lazy: false,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    headers: { 'X-Custom-Header': 'yes', 'Access-Control-Allow-Origin': '*' },
    stats: { colors: true }
};

if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'development') {
    webpackConfig.entry.app.unshift('webpack/hot/only-dev-server');
    webpackConfig.entry.app.unshift('react-hot-loader/patch');
    webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

    serverConfig.hot = true;
}

const compiler = webpack(webpackConfig);
const server = new WebpackDevServer(compiler, serverConfig);

server.listen(serverPort, serverHost, () => {
    console.log(`Frontend server running at ${serverHost}:${serverPort}...`);
});
