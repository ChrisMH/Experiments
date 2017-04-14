(function ()
{
    System.config(
        {
            // paths serve as alias
            paths: {
            },

            // map tells the System loader where to look for things
            map:
            {
                // Application
                "app": "src",
                "Components": "src/Components",
                //"Models": "app/Models",
                //"Services": "app/Services",
                //"Utilities": "app/Utilities",

                // Plugins
                "systemjs": "node_modules/systemjs/dist/system.src.js",
                "css": "node_modules/systemjs-plugin-css/css.js",
                //"text": "node_modules/systemjs-plugin-text/text.js",
                
                // Vendor Libraries
                
                "react": "node_modules/react/dist/react.js",
                "react-dom": "node_modules/react-dom/dist/react-dom.js",
                //"moment": "node_modules/moment",
                //"reflect-metadata": "node_modules/reflect-metadata",
                //"typedjson-npm": "node_modules/typedjson-npm/js"
                
            },

            // packages tells the System loader how to load when no filename and/or no extension
            packages:
            {
                "app": { main: "main" },
                "Components": { main: "index" },
                //"Models": { main: "index" },
                //"Services": { main: "index" },
                //"Utilities": { main: "index" },

                //"moment": { main: "moment" },

                //"reflect-metadata": { main: "Reflect" },
                //"typedjson-npm": { main: "typed-json" }
                
            },

            meta:
            {
                "*.css": { loader: "css" }
                //"*.html": { loader: "text" }
            }
        });
})();
