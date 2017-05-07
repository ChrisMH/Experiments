var webpack = require("webpack");
var helpers = require("./helpers");

module.exports = {
    devtool: "inline-source-map",

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
                loader: "null-loader"
            },
            {
                test: /\.styl$/,
                loader: "null-loader"
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: "null-loader"
            }
        ]
    },

    plugins: [        
        new webpack.ContextReplacementPlugin(/typedjson-npm/, "typed-json.js"),
    ]
}
