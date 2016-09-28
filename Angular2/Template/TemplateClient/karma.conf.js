// Karma configuration
// Generated on Wed Sep 28 2016 12:51:07 GMT-0400 (Eastern Daylight Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: "",

    plugins: ["karma-jasmine", "karma-chrome-launcher", "karma-systemjs"],

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ["systemjs", "jasmine"],


    // list of files / patterns to load in the browser
    files: [
        { pattern: "node_modules/core-js/client/shim.js", included: true, watched: false },
        { pattern: "node_modules/zone.js/dist/zone.js", included: true, watched: false },
        { pattern: "node_modules/reflect-metadata/Reflect.js", included: true, watched: false },
        //"node_modules/systemjs/dist/system.src.js",
        /*
        { pattern: "node_modules/rxjs/Rx.js", included: true, watched: false },
        { pattern: "node_modules/typedjson/js/index.js", included: true, watched: false },
        
        { pattern: "node_modules/@angular/common/bundles/common.umd.js", included: true, watched: false },
        { pattern: "node_modules/@angular/compiler/bundles/compiler.umd.js", included: true, watched: false },
        { pattern: "node_modules/@angular/core/bundles/core.umd.js", included: true, watched: false },
        { pattern: "node_modules/@angular/forms/bundles/forms.umd.js", included: true, watched: false },
        { pattern: "node_modules/@angular/http/bundles/http.umd.js", included: true, watched: false },
        { pattern: "node_modules/@angular/platform-browser/bundles/platform-browser.umd.js", included: true, watched: false },
        { pattern: "node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js", included: true, watched: false },
        { pattern: "node_modules/@angular/router/bundles/router.umd.js", included: true, watched: false },
                
        { pattern: "node_modules/@angular/common/bundles/common-testing.umd.js", included: true, watched: false },
        { pattern: "node_modules/@angular/compiler/bundles/compiler-testing.umd.js", included: true, watched: false },
        { pattern: "node_modules/@angular/core/bundles/core-testing.umd.js", included: true, watched: false },
        { pattern: "node_modules/@angular/http/bundles/http-testing.umd.js", included: true, watched: false },
        { pattern: "node_modules/@angular/platform-browser/bundles/platform-browser-testing.umd.js", included: true, watched: false },
        { pattern: "node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic-testing.umd.js", included: true, watched: false },
        { pattern: "node_modules/@angular/router/bundles/router-testing.umd.js", included: true, watched: false },

         */
        //
        { pattern: "scripts/**/*!(.test).js", included: false, watched: true },

        { pattern: "scripts/**/*.test.js", included: true, watched: true },
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: "dots", "progress"
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ["progress"],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ["Chrome"],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    systemjs: {
        // Path to your SystemJS configuration file 
        configFile: "scripts/system.dev.js",

        // Patterns for files that you want Karma to make available, but not loaded until a module requests them. eg. Third-party libraries. 
        serveFiles: [
        ],
 
        // SystemJS configuration specifically for tests, added after your config file. 
        // Good for adding test libraries and mock modules 
        config: {
            paths: {
            },
            map: {
                "@angular/common/testing": "npm:@angular/common/bundles/common-testing.umd.js",
                "@angular/compiler/testing": "npm:@angular/compiler/bundles/compiler-testing.umd.js",
                "@angular/core/testing": "npm:@angular/core/bundles/core-testing.umd.js",
                "@angular/http/testing": "npm:@angular/http/bundles/http-testing.umd.js",
                "@angular/platform-browser/testing": "npm:@angular/platform-browser/bundles/platform-browser-testing.umd.js",
                "@angular/platform-browser-dynamic/testing": "npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic-testing.umd.js",
                "@angular/router/testing": "npm:@angular/router/bundles/router-testing.umd.js",
            },
            packages: {
            }
        }
    }
  })
}
