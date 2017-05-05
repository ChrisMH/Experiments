var webpack = require("webpack");
var helpers = require("./helpers");

module.exports = {
    devtool: "inline-source-map",

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
                } , 
                "angular2-template-loader"
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: "null-loader"
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
                test: /\.css$/,
                exclude: helpers.root("src", "app"),
                loader: "null-loader"
            },
            {
                test: /\.styl$/,
                exclude: helpers.root("src", "app"),
                loader: "null-loader"
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
    ]
}
