(function ()
{
    if (!window.hasOwnProperty("page") || !window.page.hasOwnProperty("config"))
    {
        console.error("window.page.config is missing");
        return;
    }

    System.config(
    {
        baseURL: window.page.config.rootUrl,
        transpiler: "typescript",
        typescriptOptions: {
            "target": "es5",
            "module": "commonjs",
            "moduleResolution": "node",
            "sourceMap": true,
            "emitDecoratorMetadata": true,
            "experimentalDecorators": true,
            "removeComments": false,
            "noImplicitAny": true,
            "suppressImplicitAnyIndexErrors": true
        },

        // paths serve as alias
        paths: {
            "app:": "scripts/",
            "vendor:": "js/vendor/"
        },

        // map tells the System loader where to look for things
        map:
        {            
            // Application
            "app": "app:app",
            "Components": "app:app/Components",
            "Models": "app:app/Models",
            "Services": "app:app/Services",

            // Plugins
            //"plugin-text": "vendor:systemjs/plugin-text-0.0.9.js",
            //"plugin-babel": "vendor:systemjs/plugin-babel-0.0.15.js",
            //"systemjs-babel-build": "vendor:systemjs/systemjs-babel-browser-0.0.15.js",
            "typescript": "vendor:typescript/typescript-2.0.3.js",

            // Vendor Libraries
            "angular": "vendor:angular/angular-1.5.8.js",
            "angular-ui-router": "vendor:angular/angular-ui-router-0.3.1.js",
            "reflect-metadata": "vendor:reflect-metadata/Reflect-0.1.8.js",
            "typedjson": "vendor:typedjson/typedjson-0.1.5.js",
            "jquery": "vendor:jquery/jquery-2.2.4.js"
        },

        // packages tells the System loader how to load when no filename and/or no extension
        packages:
        {
            "app": { main: "main.dev", defaultExtension: "ts" },
            "Components": { main: "index", defaultExtension: "ts" },
            "Models": { main: "index", defaultExtension: "ts" },
            "Services": { main: "index", defaultExtension: "ts" }
        }

    });
})();