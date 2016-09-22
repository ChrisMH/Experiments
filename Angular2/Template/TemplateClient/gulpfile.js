/// <binding ProjectOpened='watch' />
var gulp = require("gulp");
var gconcat = require("gulp-concat");
var gdebug = require("gulp-debug");
var gdotNetAssemblyInfo = require("gulp-dotnet-assembly-info");
var ginlineNg2Template = require('gulp-inline-ng2-template');
var gless = require("gulp-less");
var grename = require("gulp-rename");
var gstreamify = require("gulp-streamify");
var guglify = require("gulp-uglify");
var guglifycss = require("gulp-uglifycss");
var gutil = require("gulp-util");

var browserify = require("browserify");
var del = require("del");
var fs = require("fs");
var pump = require("pump");
var source = require("vinyl-source-stream");
var tsify = require("tsify");

var tsSourceDir = "Client/";
var buildDir = "build/";

var jsDestDir = "Client/";

var debugEntryPoint = "main.debug.ts";
var releaseEntryPoint = "main.release.ts";

var lessSourceDir = "Styles/";
var cssDestDir = "Styles/";

var lessFiles = [
    lessSourceDir + "Common.less"
];

var getPackageJson = function()
{
    return JSON.parse(fs.readFileSync("./package.json", "utf8"));
};

var getAssemblyInfo = function()
{
    var fileContents = fs.readFileSync("./Properties/AssemblyInfo.cs");
    return gdotNetAssemblyInfo.getAssemblyMetadata(fileContents);
};

gulp.task("watch",
    function()
    {
        gulp.watch(lessSourceDir + "*.less", ["css"]);
    });


gulp.task("before-build", ["clean"], function () { });
gulp.task("after-debug-build", ["css", "bundle-lib-debug", "bundle-app-debug"], function () { });
gulp.task("after-release-build", ["css", "bundle-lib-release", "bundle-app-release"], function() {});


gulp.task("clean",
    function()
    {
        return del([
            tsSourceDir + "**/*.js", tsSourceDir + "**/*.map", "!" + tsSourceDir + "system.config.js",
            cssDestDir + "*.css",
            buildDir
        ]);
    });


gulp.task("inline-templates",
    function(cb)
    {
        pump([
                gulp.src(tsSourceDir + "**/*.ts"),
                ginlineNg2Template({ base: "/" }),
                gulp.dest(buildDir)
            ],
            cb);
    });

gulp.task("bundle-lib-debug",
    function(cb)
    {
        var b = browserify({
            debug: true
        });

        var libs = Object.keys(getPackageJson().dependencies);
        libs.forEach(function(lib) { b.require(lib); });

        pump([
                b.bundle().on("error", function(err) { gutil.log(err); }),
                source("lib-" + getAssemblyInfo().AssemblyVersion + ".js"),
                gulp.dest(jsDestDir)
            ],
            cb);
    });

gulp.task("bundle-lib-release",
    function (cb)
    {
        var b = browserify({
            debug: false
        });

        var libs = Object.keys(getPackageJson().dependencies);
        libs.forEach(function (lib) { b.require(lib); });

        pump([
                b.bundle().on("error", function (err) { gutil.log(err); }),
                source("lib-" + getAssemblyInfo().AssemblyVersion + ".min.js"),
                gstreamify(guglify()),
                gulp.dest(jsDestDir)
        ],
            cb);
    });

gulp.task("bundle-app-debug",
    ["inline-templates"],
    function(cb)
    {
        var b = browserify({
            debug: true
        });

        b.add(buildDir + debugEntryPoint);

        var libs = Object.keys(getPackageJson().dependencies);
        libs.forEach(function(lib) { b.external(lib); });

        pump([
                b.plugin(tsify)
                .bundle()
                .on("error", function(err) { gutil.log(err); }),
                source("app-" + getAssemblyInfo().AssemblyVersion + ".js"),
                gulp.dest(jsDestDir)
            ],
            cb);
    });

gulp.task("bundle-app-release",
    ["inline-templates"],
    function(cb)
    {
        var b = browserify({
            debug: false
        });

        b.add(buildDir + releaseEntryPoint);

        var libs = Object.keys(getPackageJson().dependencies);
        libs.forEach(function(lib) { b.external(lib); });

        pump([
                b.plugin(tsify)
                .bundle()
                .on("error", function(err) { gutil.log(err); }),
                source("app-" + getAssemblyInfo().AssemblyVersion + ".min.js"),
                gstreamify(guglify()),
                gulp.dest(jsDestDir)
            ],
            cb);
    });

gulp.task("css",
    function(cb)
    {
        pump([
                gulp.src(lessFiles),
                gdebug({ title: "css files: " }),
                gless(),
                gulp.dest(cssDestDir),
                gconcat("styles-" + getAssemblyInfo().AssemblyVersion + ".css"),
                gulp.dest(cssDestDir),
                guglifycss(),
                grename({ extname: ".min.css" }),
                gulp.dest(cssDestDir)
            ],
            cb);
    });