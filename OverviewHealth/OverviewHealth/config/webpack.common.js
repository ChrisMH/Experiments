var webpack = require("webpack");
var path = require("path");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require("html-webpack-plugin");

var helpers = require("./helpers");
// NOTE: Directory and file names are case sensitive!!

var TITLE = "Overview Health";

/**
 * options.env - current environment
 */
module.exports = function(options) {

    return {

    entry: {
        "polyfills": helpers.root("src", "polyfills.ts"),
        "vendor": helpers.root("src", "vendor.ts"),
        "app": helpers.root("src", "main.ts")
    },

    resolve: {
        extensions: [".ts", ".js"]
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: [
                    {
                        loader: "awesome-typescript-loader",
                        options: { configFileName: helpers.root("tsconfig.json") }
                    },
                    "angular2-template-loader"
                ]
            },
            {
                test: /\.html$/,
                include: helpers.root("src", "app"),
                loader: "raw-loader"
            },
            {
                test: /\.css$/,
                include: helpers.root("src", "app"),
                loader: "raw-loader"
            },
            {
                test: /\.styl$/,
                include: helpers.root("src", "app"),
                loader: "raw-loader!stylus-loader"
            },
            // Outside src/app
            {
                test: /\.styl$/,
                exclude: [ 
                    helpers.root("src", "app"),
                    helpers.root("src", "art"),
                    helpers.root("src", "bootstrap") 
                ],
                loader: "style-loader!raw-loader!stylus-loader"
            },
            {
                test: /\.less$/,
                include: [
                    helpers.root("src", "bootstrap")
                ],
                use: ExtractTextPlugin.extract("raw-loader!less-loader")
            }

        ]
    },

    plugins: [
        // Workaround for angular/angular#11580
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)@angular/,
            helpers.root("src"), // location of your src
            {} // a map of your routes
        ),

        new webpack.ContextReplacementPlugin(/typedjson-npm/, "typed-json.js"),

        new webpack.optimize.CommonsChunkPlugin({
            name: ["app", "vendor", "polyfills"]
        }),

        new HtmlWebpackPlugin({
            template: helpers.root("src", "index.ejs"),
            title: options.env === "development" ? "Dev | ".concat(TITLE) : TITLE,
            version: helpers.appVersion(),
            chunksSortMode: "dependency"
        }),

        new CopyWebpackPlugin([
            { from: helpers.root("src", "art"), to: "art" },
        ])
    ]
}};
