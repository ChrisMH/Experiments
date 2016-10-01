(function ()
{
    System.config({
        paths: {
            // paths serve as alias
            "npm:": "node_modules/"
        },
        // map tells the System loader where to look for things
        map: {
            "app": "scripts/app",
            "Components": "scripts/app/Components",
            "Models": "scripts/app/Models",
            "Services": "scripts/app/Services",

            // angular bundles
            "@angular/common": "js/vendor/@angular/common.umd.js",
            "@angular/compiler": "js/vendor/@angular/compiler.umd.js",
            "@angular/core": "js/vendor/@angular/core.umd.js",
            "@angular/forms": "js/vendor/@angular/forms.umd.js",
            "@angular/http": "js/vendor/@angular/http.umd.js",
            "@angular/platform-browser": "js/vendor/@angular/platform-browser.umd.js",
            "@angular/platform-browser-dynamic": "js/vendor/@angular/platform-browser-dynamic.umd.js",
            "@angular/router": "js/vendor/@angular/router.umd.js",

            // other libraries
            "rxjs": "npm:rxjs",
            "typedjson": "npm:typedjson/js"
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            "app": { main: "main.dev" },
            "Components": { main: "index" },
            "Models": { main: "index" },
            "Services": { main: "index" },

            "rxjs": { main: "Rx" },
            "typedjson": { main: "index" },
        }
    });  
})();