const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
    mode: 'production',
    devtool: "source-map",
    // resolve the regeneratorRuntime is not defined error
    entry: './src/client/index.js',
    optimization: {
        minimizer: [new TerserPlugin({}),],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        // assetModuleFilename: "images/[name][ext]",
        assetModuleFilename: 'src/client/images/[name][ext]',
        clean: true,
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
                use: [ 'style-loader', 'css-loader', 'sass-loader' ]
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
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
    ],
}