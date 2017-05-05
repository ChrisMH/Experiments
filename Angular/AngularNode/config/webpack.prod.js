var webpack = require("webpack");
var webpackMerge = require("webpack-merge");
var helpers = require("./helpers");
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var commonConfig = require("./webpack.common.js");

const ENV = process.env.NODE_ENV = process.env.ENV = "production";

module.exports = webpackMerge(commonConfig({ env: ENV }), {

    devtool: "source-map",

    output: {
        path: helpers.root("public"),
        //publicPath: "/",
        filename: "[name]-".concat(helpers.appVersion(), ".js"),
        chunkFilename: "[id]-".concat(helpers.appVersion(), ".chunk.js")
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({ 
            mangle: {
                keep_fnames: true
            }
        }),
        new ExtractTextPlugin("[name]-".concat(helpers.appVersion(), ".css")),
        
        new webpack.DefinePlugin({
            "process.env": { 
                "ENV": JSON.stringify(ENV),
                "NODE_ENV": JSON.stringify(ENV)}      
        })
    ]
});
