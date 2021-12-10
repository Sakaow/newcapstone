const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: "source-map",
    entry: './src/client/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'src/client/images/[name][ext]',
        clean: true,
    },
    devServer: {
        static: path.resolve(__dirname, 'dist'),
        port: 5001, // default port is 8080        
        open: true, // open the browser
        hot: true,
        watchFiles: [path.resolve(__dirname, 'src/client/index.js')],
        
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }                
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|svg|webp|jpeg|jpg|gif)$/,
                type: 'asset/resource'
            }

        ]
    },
    // Plugins
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        })
    ],
}