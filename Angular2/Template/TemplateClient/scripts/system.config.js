(function ()
{
    System.config({
        defaultJSExtension: true,
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
            "text":                 "node_modules/systemjs-plugin-text/text.js",            
            "plugin-babel":         "node_modules/systemjs-plugin-babel/plugin-babel.js",
            "systemjs-babel-build": "node_modules/systemjs-plugin-babel/systemjs-babel-browser.js",
            
            // Angular bundles
            "@angular/common":                      "node_modules/@angular/common/bundles/common.umd.js",
            "@angular/compiler":                    "node_modules/@angular/compiler/bundles/compiler.umd.js",
            "@angular/core":                        "node_modules/@angular/core/bundles/core.umd.js",
            "@angular/forms":                       "node_modules/@angular/forms/bundles/forms.umd.js",
            "@angular/http":                        "node_modules/@angular/http/bundles/http.umd.js",
            "@angular/platform-browser":            "node_modules/@angular/platform-browser/bundles/platform-browser.umd.js",
            "@angular/platform-browser-dynamic":    "node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js",
            "@angular/router":                      "node_modules/@angular/router/bundles/router.umd.js",
            "@angular/upgrade":                     "node_modules/@angular/upgrade/bundles/upgrade.umd.js",
              
            // other libraries
            "moment":               "node_modules/moment",
            "rxjs":                 "node_modules/rxjs",
            "typedjson":            "node_modules/typedjson/js"
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            "app":                  { main: "main" },
            "Components":           { main: "index" },
            "Models":               { main: "index" },
            "Services":             { main: "index" },

            "moment":               { main: "moment" },
            "rxjs":                 { main: "Rx" },
            "typedjson": { main: "index" }
        }
    });  
})();