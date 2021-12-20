const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: "source-map",
    // resolve the regeneratorRuntime is not defined error
    entry: ['regenerator-runtime/runtime.js', './src/client/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        // assetModuleFilename: "images/[name][ext]",
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
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|svg|webp|jpeg|jpg|gif)$/,
                type: 'asset/resource'
            }

        ]
    },
    // Plugins
    plugins: [
        //remove/cleans build folders and unused assets
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new CopyWebpackPlugin({
            patterns: [{
                from: 'src/client/images',
                to: 'images'
            }]
        }),
    ],
}