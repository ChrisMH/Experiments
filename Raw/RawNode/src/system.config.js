(function ()
{
    System.config(
    {
        warnings: true,
        transpiler: "plugin-babel",
        
        // paths serve as alias
        paths: {
        },

        // map tells the System loader where to look for things
        map:
        {            
            // Application
            "app":                  "src",
            
            // Plugins
            "systemjs":             "node_modules/systemjs/dist/system.src.js",
            "css": "node_modules/systemjs-plugin-css/css.js",
            "text":                 "node_modules/systemjs-plugin-text/text.js",
            "plugin-babel":         "node_modules/systemjs-plugin-babel/plugin-babel.js",
            "systemjs-babel-build": "node_modules/systemjs-plugin-babel/systemjs-babel-browser.js",
              
            // other libraries
            "moment": "node_modules/moment/moment.js"

        },

        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            "app":                  { main: "main" }
        },

        meta:
        {
            "*.css": { loader: "css" },
            "*.html": { loader: "text" }
        }
    });
})();
