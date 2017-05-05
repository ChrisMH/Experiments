var webpack = require("webpack");
var webpackMerge = require("webpack-merge");
var helpers = require("./helpers");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require("html-webpack-plugin");

var commonConfig = require("./webpack.common.js");

const ENV = process.env.NODE_ENV = process.env.ENV = "development";

module.exports = webpackMerge(commonConfig({ env: ENV }), {

    devtool: "inline-source-map",

    output: {
        path: helpers.root("public"),
        //publicPath: "/",
        filename: "[name].js",
        chunkFilename: "[id].chunk.js"
    },

    plugins: [
        new ExtractTextPlugin('[name].css'),

        new webpack.DefinePlugin({
            "process.env": { 
                "ENV": JSON.stringify(ENV),
                "NODE_ENV": JSON.stringify(ENV)}      
        })
    ]
});
