(function ()
{
    System.config(
    {
        //defaultJSExtension: true,
        transpiler: "plugin-babel",
        
        // paths serve as alias
        paths: {
        },

        // map tells the System loader where to look for things
        map:
        {            
            // Application
            "app":                  "scripts/app",
            "Components":           "scripts/app/Components",
            "Models":               "scripts/app/Models",
            "Services":             "scripts/app/Services",
            
            // Plugins
            "systemjs":             "node_modules/systemjs/dist/system.src.js",
            "css":                  "node_modules/systemjs-plugin-css/css.js",
            "text":                 "node_modules/systemjs-plugin-text/text.js",
            "plugin-babel":         "node_modules/systemjs-plugin-babel/plugin-babel.js",
            "systemjs-babel-build": "node_modules/systemjs-plugin-babel/systemjs-babel-browser.js",
            
            // Vendor Libraries
            "angular":              "node_modules/angular",
            "angular-ui-router":    "node_modules/angular-ui-router/release/angular-ui-router.js",
            "jquery":               "node_modules/jquery/dist/jquery.js",
            "moment":               "node_modules/moment",
            "reflect-metadata":     "node_modules/reflect-metadata",
            "typedjson":            "node_modules/typedjson/js"
        },

        // packages tells the System loader how to load when no filename and/or no extension
        packages:
        {
            "app":                  { main: "main" },
            "Components":           { main: "index" },
            "Models":               { main: "index" },
            "Services":             { main: "index" },
            
            "angular":              { main: "index" },
            "moment":               { main: "moment" },
            "reflect-metadata":     { main: "Reflect" },
            "typedjson":            { main: "index" }
        },

        meta:
        {
            "*.css": { loader: "css" },
            "*.html": { loader: "text" }
        }
    });
})();