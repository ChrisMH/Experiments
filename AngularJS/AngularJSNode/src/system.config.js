(function ()
{
    System.config(
        {
            warnings: true,

            // paths serve as alias
            paths: {
            },

            // map tells the System loader where to look for things
            map:
            {
                // Plugins
                "systemjs": "node_modules/systemjs/dist/system.src.js",
                "css": "node_modules/systemjs-plugin-css/css.js",
                "text": "node_modules/systemjs-plugin-text/text.js",

                // Application
                "app": "src",
                "Components": "src/Components",
                "Models": "src/Models",
                "Services": "src/Services",
                "Utilities": "src/Utilities",
                
                // Vendor Libraries                
                "angular": "node_modules/angular",
                "angular-ui-router": "node_modules/angular-ui-router/release/angular-ui-router.js",
                "moment": "node_modules/moment/moment.js",
                "reflect-metadata": "node_modules/reflect-metadata/Reflect.js",
                "typedjson-npm": "node_modules/typedjson-npm/js/typed-json.js",
                
                // Vendor CSS
                "bootstrap-css": "node_modules/bootstrap/dist/css/bootstrap.css"                
            },

            // packages tells the System loader how to load when no filename and/or no extension
            packages:
            {
                "app": { main: "main" },
                "Components": { main: "index" },
                "Models": { main: "index" },
                "Services": { main: "index" },
                "Utilities": { main: "index" },

                "angular": { main: "index" }                
            },

            meta:
            {
                "*.css": { loader: "css" },
                "*.html": { loader: "text" }
            }
        });
})();
