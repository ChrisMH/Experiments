(function ()
{
    System.config({
        paths: {
            // paths serve as alias
            "npm:": "node_modules/"
        },
        // map tells the System loader where to look for things
        map: {
            "app": "scripts",
            "Components": "scripts/Components",
            "Models": "scripts/Models",
            "Services": "scripts/Services",

            // angular bundles
            "@angular/common": "npm:@angular/common/bundles/common.umd.js",
            "@angular/compiler": "npm:@angular/compiler/bundles/compiler.umd.js",
            "@angular/core": "npm:@angular/core/bundles/core.umd.js",
            "@angular/forms": "npm:@angular/forms/bundles/forms.umd.js",
            "@angular/http": "npm:@angular/http/bundles/http.umd.js",
            "@angular/platform-browser": "npm:@angular/platform-browser/bundles/platform-browser.umd.js",
            "@angular/platform-browser-dynamic": "npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js",
            "@angular/router": "npm:@angular/router/bundles/router.umd.js",

            // KendoUI
            "@progress/kendo-angular-buttons": "npm:@progress/kendo-angular-buttons",
            
            "ng2-bootstrap/ng2-bootstrap": "npm:ng2-bootstrap",

            // other libraries
            "moment": "npm:moment",
            "rxjs": "npm:rxjs",
            "typedjson": "npm:typedjson/js"
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            "app": { main: "main.dev" },
            "Components": { main: "index" },
            "Models": { main: "index" },
            "Services": { main: "index" },

            "@progress/kendo-angular-buttons": { main: "dist/npm/js/main" },

            "primeng/primeng": { main: "primeng" },

            "ng2-bootstrap/ng2-bootstrap": { main: "ng2-bootstrap" },
            "moment": { main: "moment" },
            "rxjs": { main: "Rx" },
            "typedjson": { main: "index" },
        }
    });  
})();