﻿/// <binding Clean='clean' ProjectOpened='watch' />
var gulp = require("gulp");
var gCleanCss = require("gulp-clean-css");
var gConcat = require("gulp-concat");
var gDebug = require("gulp-debug");
var gDotNetAssemblyInfo = require("gulp-dotnet-assembly-info");
var gIf = require("gulp-if");
var gInsert = require("gulp-insert");
var gLess = require("gulp-less");
var gPlumber = require("gulp-plumber");
var gRename = require("gulp-rename");
var gReplace = require("gulp-replace");
var gSourceMaps = require("gulp-sourcemaps");
var gStreamify = require("gulp-streamify");
var gTypescript = require("gulp-typescript");
var gUglify = require("gulp-uglify");
var gUtil = require("gulp-util");

var del = require("del");
var fs = require("fs");
var mergeStream = require("merge-stream");
var runSequence = require("run-sequence");
var systemjsBuilder = require("systemjs-builder");
var vSourceStream = require("vinyl-source-stream");


var vendorJavascript = [
    {
        src: "node_modules/core-js/client/shim.js",
        dst: "wwwroot/js",
        version: function () { return getPackageVersion("core-js"); }
    },
    {
        src: "node_modules/systemjs/dist/system.src.js",
        dst: "wwwroot/js",
        rename: "system.js",
        version: function () { return getPackageVersion("systemjs"); }
    }
];

var vendorStylesheets =
[
    {
        src: "node_modules/font-awesome/css/font-awesome.css",
        dst: "wwwroot/css/font-awesome/css",
        version: function () { return getPackageVersion("font-awesome"); }
    },
    {
        src: "node_modules/bootstrap/dist/css/bootstrap.css",
        dst: "wwwroot/css/bootstrap/css",
        version: function () { return getPackageVersion("bootstrap"); }
    }
];

var vendorArtifacts =
[
    {
        src: "node_modules/font-awesome/fonts/**/*",
        dst: "wwwroot/css/font-awesome/fonts"
    },
    {
        src: "node_modules/bootstrap/dist/fonts/**/*",
        dst: "wwwroot/css/bootstrap/fonts"
    }
];

var appTypescript =
[
    {
        src: "app/**/*.ts",
        dst: "app"
    }
];


var appStylesheets = [
    {
        src: "styles/app/app.less",
        dst: "wwwroot/css/app",
        version: getAppVersion
    }
];

var appInlineStylesheets = [
    {
        src: "scripts/app/**/*.less",
        dst: "scripts/app",
        version: undefined
    }
];

var appArtifacts = [
    {
        src: "styles/app/images/**/*",
        dst: "wwwroot/css/app/images"
    }
];


gulp.task("watch", 
    function ()
    {
        gulp.watch(["styles/app/**/*.less"], ["build:dev:app:css"]);
        //gulp.watch(["styles/vendor/**/*.less", "styles/vendor/**/*.css"], ["build:dev:vendor:css"]);
        gulp.watch(["scripts/app/**/*.less"], ["build:dev:app:inline:css"]);
    });


gulp.task("build:Debug",
    function (cb)
    {
        runSequence(["clean:css", "clean:js"],
            ["build:dev:app:ts"],
            [
                "build:dev:vendor:css", "copy:vendor:artifacts", "build:dev:vendor:js",
                "build:dev:app:css", "build:dev:app:inline:css", "copy:app:artifacts"
            ],
            cb);
    });

gulp.task("build:Release",
    function (cb)
    {
        runSequence(
            ["clean:css", "clean:js"],
            ["build:prod:app:ts"],
            [
                "build:prod:vendor:css", "copy:vendor:artifacts", "build:prod:vendor:js",
                "build:prod:app:css", "build:prod:app:inline:css", "copy:app:artifacts", "build:prod:app:js"
            ],
            ["bundle:prod"],
            cb);
    });

gulp.task("clean", ["clean:js", "clean:app:js", "clean:test:js", "clean:css"], function () { });
gulp.task("clean:js", function () { return del(["wwwroot/js"]); });
gulp.task("clean:app:js", function () { return del(["scripts/app/**/*.js", "scripts/app/**/*.map"]); });
gulp.task("clean:test:js", function () { return del(["scripts/test/**/*.js", "scripts/test/**/*.map"]); });
gulp.task("clean:css", function () { return del(["wwwroot/css", "scripts/app/**/*.css"]); });


// Vendor Javascript
gulp.task("build:dev:vendor:js", function () { return buildJavascript(vendorJavascript, false); });
gulp.task("build:prod:vendor:js", function () { return buildJavascript(vendorJavascript, true); });


// Vendor Stylesheets
gulp.task("build:dev:vendor:css", function () { return buildStylesheets(vendorStylesheets, false); });
gulp.task("build:prod:vendor:css", function () { return buildStylesheets(vendorStylesheets, true); });

// Vendor Artifacts
gulp.task("copy:vendor:artifacts", function () { return copyArtifacts(vendorArtifacts); });


// App Typescript
gulp.task("build:dev:app:ts", ["clean:app:js"], function () { return buildTypescript(appTypescript, true); });
gulp.task("build:prod:app:ts", ["clean:app:js"], function () { return buildTypescript(appTypescript, false); });

// App Javascript
gulp.task("build:prod:app:js",
    function ()
    {
        return gulp.src(["scripts/system.config.js", "scripts/system.config.bundle.js"])
            .pipe(gPlumber({ errorHandler: onError }))
            .pipe(gReplace("__VERSION__", getAppVersion()))
            .pipe(gConcat("system.config-" + getAppVersion() + ".js"))
            .pipe(gStreamify(gUglify()))
            .pipe(gulp.dest("wwwroot/js"));
    });

// App Production Bundling
gulp.task("bundle:prod",
    function (cb)
    {
        var builder = new systemjsBuilder("", "scripts/system.config.js");

        var appBundleName = "wwwroot/js/app-" + getAppVersion() + ".js";
        builder.bundle("app", appBundleName, { minify: true, sourceMaps: false })
            .then(function () { cb(); })
            .catch(function (err)
            {
                console.log("Bundle Error:");
                console.log(err);
                cb();
            });
    });

// App Stylesheets
gulp.task("build:dev:app:css", function () { return buildStylesheets(appStylesheets, false); });
gulp.task("build:prod:app:css", function () { return buildStylesheets(appStylesheets, true); });

gulp.task("build:dev:app:inline:css", function () { return buildStylesheets(appInlineStylesheets, false); });
gulp.task("build:prod:app:inline:css", function () { return buildStylesheets(appInlineStylesheets, true); });

// App Artifacts
gulp.task("copy:app:artifacts", function () { return copyArtifacts(appArtifacts); });


// Helper functions

function getAppVersion()
{
    var appSettingsFile = JSON.parse(fs.readFileSync("./appsettings.json", "utf8"));
    return appSettingsFile["AppSettings"]["Version"];
}

function getPackageVersion(packageKey)
{
    var packageFile = JSON.parse(fs.readFileSync("./package.json", "utf8"));
    var version = "0.0.0";

    if (packageFile.dependencies && packageFile.dependencies.hasOwnProperty(packageKey))
        version = packageFile.dependencies[packageKey];
    else if (packageFile.devDependencies && packageFile.devDependencies.hasOwnProperty(packageKey))
        version = packageFile.devDependencies[packageKey];

    if (version[0] === "^" || version[0] === "~")
        return version.substr(1, version.length - 1);
    return version;
}


function buildTypescript(files, sourceMaps)
{
    var streams = [];
    files.forEach(function (file)
    {
        var tsProject = gTypescript.createProject("./tsconfig.json");
        var tsResult =
            gulp.src(file.src)
                .pipe(gPlumber({ errorHandler: onError }))
                .pipe(gIf(sourceMaps === true, gSourceMaps.init()))
                .pipe(tsProject());
        streams.push(
            tsResult.js
            .pipe(gPlumber({ errorHandler: onError }))
            .pipe(gIf(sourceMaps === true, gSourceMaps.write()))
            .pipe(gulp.dest(file.dst)));
    });
    return mergeStream(streams);
}


function buildJavascript(files, compress)
{
    var streams = [];
    files.forEach(function (file)
    {
        streams.push(
            gulp.src(file.src)
                .pipe(gPlumber({ errorHandler: onError }))
            .pipe(gIf(file.rename !== undefined, gRename(file.rename)))
            .pipe(gIf(file.version !== undefined, gRename(function (path) { path.basename += "-" + file.version(); })))
            .pipe(gIf(compress, gStreamify(gUglify())))
            .pipe(gulp.dest(file.dst))
        );
    });
    return mergeStream(streams);
}

function buildStylesheets(files, compress)
{
    var streams = [];
    files.forEach(function (file)
    {
        streams.push(
            gulp.src(file.src)
            .pipe(gPlumber({ errorHandler: onError }))
            .pipe(gIf(compress !== true, gSourceMaps.init()))
            .pipe(gIf(file.rename !== undefined, gRename(file.rename)))
            .pipe(gIf(file.version !== undefined, gRename(function (path) { path.basename += "-" + file.version(); })))
            .pipe(gIf(/[.]less/,
                    gLess(),
                    gRename(function (path) { path.extname = ".css"; }))
            )
            .pipe(gIf(compress === true, gCleanCss({ keepSpecialComments: 0 })))
            .pipe(gIf(compress !== true, gSourceMaps.write({ sourceRoot: "/" + file.dst + "/" })))
            .pipe(gulp.dest(file.dst))
        );
    });
    return mergeStream(streams);
}

function copyArtifacts(artifacts)
{
    var streams = [];
    artifacts.forEach(function (artifact)
    {
        streams.push(gulp.src(artifact.src)
            .pipe(gPlumber({ errorHandler: onError }))
            .pipe(gulp.dest(artifact.dst))
        );
    });
    return mergeStream(streams);
}

function onError(err)
{
    gUtil.log(err);
    this.emit("end");
}