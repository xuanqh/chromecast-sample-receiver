const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = require('./config.json');

var customSkin = typeof config.skin === 'object' ? config.skin : {};

module.exports = {
    entry: './src/app/cast.js',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new webpack.ProvidePlugin({
            'window.logger': 'loglevel'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                LOG_LEVEL: JSON.stringify(config.logLevel.toUpperCase())
            }
        }),
        new UglifyJSPlugin({
            sourceMap: true
        })
    ],
    output: {
        path: __dirname + '/dist',
        filename: 'cast.min.js',
        library: 'OOCast',
        libraryTarget: 'umd'
    }
};