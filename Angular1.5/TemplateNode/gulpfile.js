/// <binding ProjectOpened='watch' />
var gulp = require("gulp");
var gCleanCss = require("gulp-clean-css");
var gIf = require("gulp-if");
var gLess = require("gulp-less");
var gPlumber = require("gulp-plumber");
var gRename = require("gulp-rename");
var gSourceMaps = require("gulp-sourcemaps");
var gSourceMaps = require("gulp-sourcemaps");
var gStreamify = require("gulp-streamify");
var gStylus = require("gulp-stylus");
var gTypescript = require("gulp-typescript");
var gUglify = require("gulp-uglify");
var gUtil = require("gulp-util");

var del = require("del");
var fs = require("fs");
var mergeStream = require("merge-stream");

var vendorJavascript =
    [
    {
        src: "node_modules/systemjs/dist/system.src.js",
        dst: "public/js",
        rename: "system.js",
        version: function () { return getPackageVersion("systemjs"); }
    }
];

var appStylesheets = [
    {
        src: "app/**/*.less",
        dst: "app",
        version: undefined
    },
    {
        src: "app/**/*.styl",
        dst: "app",
        version: undefined
    }
];


gulp.task("watch",
    function ()
    {
        gulp.watch(["app/**/*.less", "app/**/*.styl"], ["build:dev:app:css"]);
    });


// Clean
gulp.task("clean", ["clean:js", "clean:app:js", "clean:test:js", "clean:css"], function () { });
gulp.task("clean:js", function () { return del(["public/js"]); });
gulp.task("clean:app:js", function () { return del(["app/**/*.js", "app/**/*.map", "!app/system.config.js"]); });
gulp.task("clean:test:js", function () { return del(["test/**/*.js", "test/**/*.map"]); });
gulp.task("clean:css", function () { return del(["public/css", "app/**/*.css"]); });

// Vendor Javascript
gulp.task("build:dev:vendor:js", function () { return buildJavascript(vendorJavascript, false); });
gulp.task("build:prod:vendor:js", function () { return buildJavascript(vendorJavascript, true); });

// App Stylesheets
gulp.task("build:dev:app:css", function () { return buildStylesheets(appStylesheets, false); });
gulp.task("build:prod:app:css", function () { return buildStylesheets(appStylesheets, true); });

// App Typescript
gulp.task("build:dev:app:ts", ["clean:app:js", "clean:test:js"], function () { return buildTypescript(true); });
gulp.task("build:prod:app:ts", ["clean:app:js", "clean:test:js"], function () { return buildTypescript(false); });


function getTypescriptConfig()
{
    var tsConfigFile = JSON.parse(fs.readFileSync("./tsconfig.json", "utf8"));
    return tsConfigFile.compilerOptions;
}


function buildTypescript(sourceMaps)
{
    var tsProject = gTypescript.createProject("./tsconfig.json");

    var tsResult = tsProject.src()
        .pipe(gPlumber({ errorHandler: onError }))
        .pipe(gIf(sourceMaps === true, gSourceMaps.init()))
        .pipe(tsProject());
    return tsResult.js
        .pipe(gPlumber({ errorHandler: onError }))
        .pipe(gIf(sourceMaps === true, gSourceMaps.write({ sourceRoot: "/app/" })))
        .pipe(gulp.dest("app"));
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
        gUtil.log(file);
        streams.push(
            gulp.src(file.src)
            .pipe(gPlumber({ errorHandler: onError }))
            .pipe(gIf(compress !== true, gSourceMaps.init()))
            .pipe(gIf(file.rename !== undefined, gRename(file.rename)))
            .pipe(gIf(file.version !== undefined, gRename(function (path) { path.basename += "-" + file.version(); })))
            .pipe(gIf(/\.styl/,
                gStylus(),
                gIf(/\.less/,
                    gLess(),
                    gRename(function (path) { path.extname = ".css"; }))))
            .pipe(gIf(compress === true, gCleanCss({ keepSpecialComments: 0 })))
            .pipe(gIf(compress !== true, gSourceMaps.write({ sourceRoot: "/" + file.dst + "/" })))
            .pipe(gulp.dest(file.dst))
        );
    });
    return mergeStream(streams);
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

function onError(err)
{
    gUtil.log(err);
    this.emit("end");
}
