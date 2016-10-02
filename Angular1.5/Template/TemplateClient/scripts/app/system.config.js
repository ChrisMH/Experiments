﻿(function ()
{
    System.config(
    {
        defaultJSExtension: true,

        /*
        transpiler: "typescript",
        typescriptOptions: {
            "target": "es5",
            "module": "system",
            "moduleResolution": "node",
            "sourceMap": true,
            "emitDecoratorMetadata": true,
            "experimentalDecorators": true,
            "removeComments": true,
            "noImplicitAny": true,
            "suppressImplicitAnyIndexErrors": true,
            "allowSyntheticDefaultImports": true
        },
        */

        // paths serve as alias
        paths: {
            "npm:": "node_modules/",
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

            "app-templates": "app:app/app-templates.js",

            // Plugins
            //"plugin-text": "vendor:systemjs/plugin-text-0.0.9.js",
            //"plugin-babel": "vendor:systemjs/plugin-babel-0.0.15.js",
            //"systemjs-babel-build": "vendor:systemjs/systemjs-babel-browser-0.0.15.js",
            "typescript": "npm:typescript/lib/typescript.js",

            // Vendor Libraries
            "angular": "npm:angular/angular.js",
            "angular-ui-router": "npm:angular-ui-router/release/angular-ui-router.js", 
            "jquery": "npm:jquery/dist/jquery.js",

            "moment": "npm:moment",
            "typedjson": "npm:typedjson/js",
        },

        // packages tells the System loader how to load when no filename and/or no extension
        packages:
        {
            "app": { main: "main.dev", defaultExtension: "js" },
            "Components": { main: "index", defaultExtension: "js" },
            "Models": { main: "index", defaultExtension: "js" },
            "Services": { main: "index", defaultExtension: "js" },

            //"app-templates": { defaultExtension: "js" },

            "moment": {main: "moment", defaultExtension: "js" },
            "typedjson": { main: "index", defaultExtension: "js" },
        },

        // Bundles are built with systemjs-builder.  
        bundles: {
            /*
            "js/app/app.js": [
                "app:app/main.dev.js",
                //"app:app/Components",
                //"app:app/Models",
                //"app:app/Services",
                //"app-templates",
                //"angular",
                //"angular-ui-router",
                //"jquery",
                //"typedjson"
            ]*/
        }

    });


    console.log("System.baseURL = " + System.baseURL);
})();