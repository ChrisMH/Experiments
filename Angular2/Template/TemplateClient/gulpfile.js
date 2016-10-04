/// <binding Clean='clean' ProjectOpened='watch' />
var gulp = require("gulp");
var gCleanCss = require("gulp-clean-css");
var gConcat = require("gulp-concat");
var gDebug = require("gulp-debug");
var gDotNetAssemblyInfo = require("gulp-dotnet-assembly-info");
var gIf = require("gulp-if");
var gInsert = require("gulp-insert");
var gLess = require("gulp-less");
var gRename = require("gulp-rename");
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
    { src: "node_modules/core-js/client/shim.js", dst: "js", version: function () { return getPackageVersion("core-js"); } },
    { src: "node_modules/zone.js/dist/zone.js", dst: "js", version: function () { return getPackageVersion("zone.js"); } },
    { src: "node_modules/reflect-metadata/Reflect.js", dst: "js", version: function () { return getPackageVersion("reflect-metadata") } },
    { src: "node_modules/systemjs/dist/system.src.js", dst: "js", rename: "system.js", version: function () { return getPackageVersion("systemjs"); } }
];

var vendorStylesheets = [
    { src: "node_modules/bootstrap/dist/css/bootstrap.css", dst: "css/vendor/bootstrap", version: function () { return getPackageVersion("bootstrap"); } }
];

var vendorArtifacts = [
    { src: "node_modules/bootstrap/dist/fonts/**/*", dst: "css/vendor/bootstrap/fonts" }
];


var appStylesheets = [
    { src: "styles/app/app.less", dst: "css/app", version: getAppVersion }
];

var appArtifacts = [
    { src: "styles/app/images/**/*", dst: "css/app/images" }
];


gulp.task("watch",
    function ()
    {
        gulp.watch(["styles/app/**/*.less"], ["build:dev:app:css"]);
        gulp.watch(["styles/vendor/**/*.less", "styles/vendor/**/*.css"], ["build:dev:vendor:css"]);
    });


gulp.task("build:dev", function (cb)
{
    runSequence(["clean:css", "clean:js"],
                ["build:dev:vendor:css", "build:dev:vendor:js", "copy:vendor:artifacts",
                 "build:dev:app:css", "copy:app:artifacts"],
                 cb);
});

gulp.task("build:prod",function (cb)
{
    runSequence(["clean:css", "clean:js"],
                ["build:prod:vendor:css", "build:prod:vendor:js", "copy:vendor:artifacts",
                 "build:prod:app:css", "copy:app:artifacts"],
                cb);
});

gulp.task("clean", ["clean:js", "clean:app:js", "clean:css"], function () {});
gulp.task("clean:js", function () { return del(["js"]); });
gulp.task("clean:app:js", function () { return del(["scripts/app/**/*.js", "scripts/app/**/*.map"]); });
gulp.task("clean:css", function () { return del(["css"]); });


// Vendor Javascript
gulp.task("build:dev:vendor:js", function () { return buildJavascript(vendorJavascript, false); });
gulp.task("build:prod:vendor:js", function ()  { return buildJavascript(vendorJavascript, true); });


// Vendor Stylesheets
gulp.task("build:dev:vendor:css", function () { return buildStylesheets(vendorStylesheets, false); });
gulp.task("build:prod:vendor:css", function () { return buildStylesheets(vendorStylesheets, true); });

// Vendor Artifacts
gulp.task("copy:vendor:artifacts", function () { return copyArtifacts(vendorArtifacts); });


// App Javascript


// App Stylesheets
gulp.task("build:dev:app:css", function () { return buildStylesheets(appStylesheets, false); });
gulp.task("build:prod:app:css", function () { return buildStylesheets(appStylesheets, true); });

// App Artifacts
gulp.task("copy:app:artifacts", function () { return copyArtifacts(appArtifacts); });


// Helper functions

function getAppVersion()
{
    var assemblyInfoFile = fs.readFileSync("./Properties/AssemblyInfo.cs");
    return gDotNetAssemblyInfo.getAssemblyMetadata(assemblyInfoFile).AssemblyVersion;
}

function getPackageVersion(packageKey)
{
    var packageFile = JSON.parse(fs.readFileSync("./package.json", "utf8"));
    var version = "0.0.0";

    if (packageFile.dependencies && packageFile.dependencies.hasOwnProperty(packageKey))
        version = packageFile.dependencies[packageKey];
    else if(packageFile.devDependencies && packageFile.devDependencies.hasOwnProperty(packageKey))
        version = packageFile.devDependencies[packageKey];
        
    if(version[0] === "^" || version[0] === "~")
        return version.substr(1, version.length - 1);
    return version;
}

function getTypescriptConfig()
{
    var tsConfigFile = JSON.parse(fs.readFileSync("./tsconfig.json", "utf8"));
    return tsConfigFile.compilerOptions;
}

function buildStylesheets(files, compress)
{
    var streams = [];
    files.forEach(function (file)
    {
        streams.push(
            gulp.src(file.src)
                .pipe(gIf(file.rename !== undefined, gRename(file.rename)))
                .pipe(gIf(file.version !== undefined, gRename(function (path) { path.basename += "-" + file.version(); })))
                .pipe(gIf(/[.]less/, gLess(), gRename(function (path) { path.extname = ".css"; })))
                .pipe(gIf(compress, gCleanCss({ keepSpecialComments: 0 })))
                .pipe(gulp.dest(file.dst))
        );
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
                .pipe(gIf(file.rename !== undefined, gRename(file.rename)))
                .pipe(gIf(file.version !== undefined, gRename(function (path) { path.basename += "-" + file.version(); })))
                //.pipe(gIf(/[.]ts/, gTypescript(getTypescriptConfig())))
                .pipe(gIf(compress, gStreamify(gUglify())))
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
        streams.push(gulp.src(artifact.src).pipe(gulp.dest(artifact.dst)));
    });
    return mergeStream(streams);
}
