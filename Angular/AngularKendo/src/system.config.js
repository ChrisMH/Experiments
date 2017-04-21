(function ()
{
    System.config(
    {
        warnings: true,
        //transpiler: "plugin-babel",
        
        // paths serve as alias
        paths: {
        },

        // map tells the System loader where to look for things
        map:
        {            
            // Application
            "app":                  "src",
            "Components":           "src/Components",
            "Models":               "src/Models",
            "Services":             "src/Services",
            
            // Plugins
            "systemjs":             "node_modules/systemjs/dist/system.src.js",
            "css": "node_modules/systemjs-plugin-css/css.js",
            "text":                 "node_modules/systemjs-plugin-text/text.js",
            //"plugin-babel":         "node_modules/systemjs-plugin-babel/plugin-babel.js",
            //"systemjs-babel-build": "node_modules/systemjs-plugin-babel/systemjs-babel-browser.js",
            
            // Angular bundles
            "@angular/animations":                  "node_modules/@angular/animations/bundles/animations.umd.js",
            "@angular/animations/browser":          "node_modules/@angular/animations/bundles/animations-browser.umd.js",
            "@angular/common":                      "node_modules/@angular/common/bundles/common.umd.js",
            "@angular/compiler":                    "node_modules/@angular/compiler/bundles/compiler.umd.js",
            "@angular/core":                        "node_modules/@angular/core/bundles/core.umd.js",
            "@angular/forms":                       "node_modules/@angular/forms/bundles/forms.umd.js",
            "@angular/http":                        "node_modules/@angular/http/bundles/http.umd.js",
            "@angular/platform-browser":            "node_modules/@angular/platform-browser/bundles/platform-browser.umd.js",
            "@angular/platform-browser/animations": "node_modules/@angular/platform-browser/bundles/platform-browser-animations.umd.js",
            "@angular/platform-browser-dynamic":    "node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js",
            "@angular/router":                      "node_modules/@angular/router/bundles/router.umd.js",
            
            // Kendo Bundles

            "@progress/kendo-angular-dateinputs":   "node_modules/@progress/kendo-angular-dateinputs/dist/npm",
            "@progress/kendo-angular-intl":         "node_modules/@progress/kendo-angular-intl/dist/npm",
            "@progress/kendo-angular-l10n":         "node_modules/@progress/kendo-angular-l10n/dist/npm",
            "@progress/kendo-angular-popup":        "node_modules/@progress/kendo-angular-popup/dist/npm",
            "@progress/kendo-angular-math":         "node_modules/@progress/kendo-angular-math/dist/npm",
            "@progress/kendo-date-math":            "node_modules/@progress/kendo-date-math/dist/npm",
            "@progress/kendo-popup-common":         "node_modules/@progress/kendo-popup-common/dist/npm",
            "@telerik/kendo-intl":                  "node_modules/@telerik/kendo-intl/dist/npm",

            // other libraries
            "moment":           "node_modules/moment",
            "reflect-metadata": "node_modules/reflect-metadata/Reflect.js",
            "rxjs":             "node_modules/rxjs",
            "typedjson-npm":    "node_modules/typedjson-npm/js/typed-json.js",
            "zone.js":          "node_modules/zone.js/dist/zone.js",

            // CSS
            "bootstrap-css": "node_modules/bootstrap/dist/css/bootstrap.css"  

        },

        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            "app":                  { main: "main" },
            "Components":           { main: "index" },
            "Models":               { main: "index" },
            "Services":             { main: "index" },
            
            "@progress/kendo-angular-dateinputs":   { main: "main" },
            "@progress/kendo-angular-intl":         { main: "main" },
            "@progress/kendo-angular-l10n":         { main: "main" },
            "@progress/kendo-angular-popup":        { main: "main" },
            "@progress/kendo-angular-math":         { main: "main" },
            "@progress/kendo-date-math":            { main: "main" },
            "@progress/kendo-popup-common":         { main: "main" },
            "@telerik/kendo-intl":                  { main: "main" },


            "moment":               { main: "moment" },
            "rxjs":                 { main: "Rx" }
        },

        meta:
        {
            "*.css": { loader: "css" },
            "*.html": { loader: "text" }
        }
    });
})();