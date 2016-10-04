(function ()
{
    System.config(
    {
        defaultJSExtension: true,

        transpiler: "babel",
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

            //"app-templates": "app:app/app-templates.js",

            // Plugins
            "text": "npm:systemjs-plugin-text/text.js",
            "plugin-babel": "npm:systemjs-plugin-babel/plugin-babel.js",
            "systemjs-babel-build": "npm:systemjs-plugin-babel/systemjs-babel-browser.js",
            //"typescript": "npm:typescript/lib/typescript.js",

            // Vendor Libraries
            "angular": "npm:angular",
            "angular-ui-router": "npm:angular-ui-router/release/angular-ui-router.js",
            "jquery": "npm:jquery/dist/jquery.js",

            "moment": "npm:moment",
            "typedjson": "npm:typedjson/js",
        },

        // packages tells the System loader how to load when no filename and/or no extension
        packages:
        {
            "app": { main: "main" },
            "Components": { main: "index" },
            "Models": { main: "index" },
            "Services": { main: "index" },

            //"app-templates": { defaultExtension: "js" },

            "angular": { main: "index" },
            "moment": {main: "moment" },
            "typedjson": { main: "index" },
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