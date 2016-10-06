// Karma configuration
// Generated on Wed Sep 28 2016 12:51:07 GMT-0400 (Eastern Daylight Time)

module.exports = function(config) {
  config.set({

    plugins: ["karma-systemjs", "karma-jasmine", "karma-chrome-launcher"],

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ["systemjs", "jasmine"],


    // list of files / patterns to load in the browser
    files: [        
        { pattern: "node_modules/angular/*.js", included: false, watched: false },
        { pattern: "node_modules/angular-mocks/*.js", included: false, watched: false },
        { pattern: "node_modules/moment/*.js", included: false, watched: false },
        { pattern: "node_modules/reflect-metadata/*.js", included: false, watched: false },
        { pattern: "node_modules/typedjson/js/*.js", included: false, watched: false },

        { pattern: "scripts/app/*.js", included: false, watched: true },
        { pattern: "scripts/app/**/*.js", included: false, watched: true },
                
        { pattern: "scripts/test/*.test.js", included: true, watched: true },
        { pattern: "scripts/test/**/*.test.js", included: true, watched: true }
         
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
        configFile: "scripts/system.config.js",

        includeFiles: [
            "node_modules/core-js/client/shim.js",
            "node_modules/reflect-metadata/Reflect.js"
        ],

        // Patterns for files that you want Karma to make available, but not loaded until a module requests them. eg. Third-party libraries. 
        serveFiles: [
        ],
 
        // SystemJS configuration specifically for tests, added after your config file. 
        // Good for adding test libraries and mock modules 
        config: {
            paths: {
            },
            map: {
                "ngMock": "node_modules/angular-mocks/angular-mocks.js"
            },
            packages: {
            }
        }
    }
  })
}
