(function ()
{
    System.config({
        paths: {
            // paths serve as alias
            "npm:": "node_modules/"
        },
        bundles: {
            "Scripts/app-1.0.0.min.js": ["Module", "./Components/App", "Providers/PageConfig"],
            "Scripts/lib-1.0.0.min.js": [
                "@angular/common",
                "@angular/compiler",
                "@angular/core",
                "@angular/forms",
                "@angular/http",
                "@angular/platform-browser",
                "@angular/platform-browser-dynamic",
                "@angular/router",
                "rxjs/Rx",
                "ng2-cookies/ng2-cookies"
            ]
        },
        // map tells the System loader where to look for things
        map: {
            app: "Scripts"
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            app: {
               main: "./app-1.0.0.min.js",
                defaultExtension: "js"
            },
            "ng2-cookies" : { defaultExtension: "js" },
            rxjs: {
                defaultExtension: "js"
            }
        }
    });
})();