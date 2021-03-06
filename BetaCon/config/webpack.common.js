var webpack = require("webpack");
var path = require("path");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require("html-webpack-plugin");

var helpers = require("./helpers");
// NOTE: Directory and file names are case sensitive!!

var TITLE = "BetaCon";

/**
 * options.env - current environment
 */
module.exports = function(options) {

    return {

    entry: {
        "polyfills": helpers.root("src", "polyfills.ts"),
        "vendor": helpers.root("src", "vendor.ts"),
        "app": helpers.root("src", "main.tsx")
    },
    
    devServer: {
        contentBase: helpers.root("src"),
        //hot: true,
        port: 3000,
        historyApiFallback: true
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loaders: [
                    {
                        loader: "awesome-typescript-loader",
                        options: { configFileName: helpers.root("tsconfig.json") }
                    }
                ]
            },
            {
                test: /\.css$/,
                loader: "style-loader!raw-loader"
            },
            {
                test: /\.styl$/,
                loader: "style-loader!raw-loader!stylus-loader"
            }
        ]
    },

    plugins: [
        new webpack.ContextReplacementPlugin(/typedjson-npm/, "typed-json.js"),

        new webpack.optimize.CommonsChunkPlugin({
            name: ["app", "vendor", "polyfills"]
        }),

        new HtmlWebpackPlugin({
            template: helpers.root("src/index.ejs"),
            title: options.env === "development" ? "Dev | ".concat(TITLE) : TITLE,
            version: helpers.appVersion(),
            chunksSortMode: "dependency"
        }),

        new CopyWebpackPlugin([
            { from: helpers.root("src/art"), to: "art" }
        ])
    ]
}};
