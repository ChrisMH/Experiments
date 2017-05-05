var webpack = require("webpack");
var path = require("path");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var helpers = require("./helpers");
// NOTE: Directory and file names are case sensitive!!

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
                use: [ "raw-loader", "stylus-loader" ]
            },
            {
                test: /\.styl$/,
                exclude: [ 
                    helpers.root("src", "app"),
                    helpers.root("src", "art") 
                ],
                use: ExtractTextPlugin.extract({ use: ["raw-loader", "stylus-loader" ] })
            },
            {
                test: /\.css$/,
                include: helpers.root("node_modules"),
                use: ExtractTextPlugin.extract({ use: ["raw-loader"] })
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

        new CopyWebpackPlugin([
            { from: helpers.root("src", "art"), to: "art" }
        ])
    ]
}};
