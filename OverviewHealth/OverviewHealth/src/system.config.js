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
                // Application
                "app": "src",
                "Components": "src/Components",
                //"Models": "src/Models",
                "Services": "src/Services",
                //"Utilities": "src/Utilities",

                // Plugins
                "systemjs": "node_modules/systemjs/dist/system.src.js",
                "css": "node_modules/systemjs-plugin-css/css.js",
                //"text": "node_modules/systemjs-plugin-text/text.js",
                
                // Vendor Libraries
                
                "react": "node_modules/react/dist/react.js",
                "react-dom": "node_modules/react-dom/dist/react-dom.js",
                "react-router-dom": "node_modules/react-router-dom",
                "moment": "node_modules/moment/moment.js",
                //"reflect-metadata": "node_modules/reflect-metadata/Reflect.js",
                //"typedjson-npm": "node_modules/typedjson-npm/js/typed-json.js",
                
                // Vendor CSS
                "bootstrap-css": "node_modules/bootstrap/dist/css/bootstrap.css"                
            },

            // packages tells the System loader how to load when no filename and/or no extension
            packages:
            {
                "app": { main: "main" },
                "Components": { main: "index" },
                //"Models": { main: "index" },
                "Services": { main: "index" },
                //"Utilities": { main: "index" }
                
                "react-router-dom": { main: "index" }
            },

            meta:
            {
                "*.css": { loader: "css" }
                //"*.html": { loader: "text" }
            }
        });
})();
