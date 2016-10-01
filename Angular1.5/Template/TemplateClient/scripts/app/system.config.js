(function ()
{
    System.defaultJSExtension = true;

    System.config(
    {
        map:
        {
            "app": "scripts/app",
            //TemplateModule: "scripts/app/TemplateModule.js",
            //MainController: "scripts/app/MainController.js",

            "angular": "js/vendor/angular/angular.js",
            "angular-ui-router": "js/vendor/angular/angular-ui-router.js",

            "jquery": "js/vendor/jquery/jquery.js"
        },

        packages:
        {
            "app": { main: "main.dev", defaultJSExtension: "js" }
        }

    });
})();