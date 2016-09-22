/// <binding Clean='clean' ProjectOpened='watch' />
var gulp = require("gulp");
var gconcat = require("gulp-concat");
var gdebug = require("gulp-debug");
var gdotNetAssemblyInfo = require("gulp-dotnet-assembly-info");
var ginlineNg2Template = require('gulp-inline-ng2-template');
var gless = require("gulp-less");
var grename = require("gulp-rename");
var gsourcemaps = require("gulp-sourcemaps");
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

var tsSourceDir = "Scripts/";
var jsDestDir = "Scripts/";

var buildDir = "build/";


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
        gulp.watch(tsSourceDir + "**/*.ts", ["bundle-app-dev"]);
        gulp.watch(lessSourceDir + "*.less", ["css"]);
    });


gulp.task("before-build", ["clean"], function () { });
gulp.task("build-dev", ["css-dev", "bundle-lib-dev", "bundle-app-dev"], function () { });
gulp.task("build-prod", ["css-prod", "bundle-lib-prod", "bundle-app-prod"], function() {});


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

gulp.task("bundle-lib-dev",
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

gulp.task("bundle-lib-prod",
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

gulp.task("bundle-app-dev",
    function(cb)
    {
        var b = browserify({
            debug: true
        });

        b.add(tsSourceDir + debugEntryPoint);

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

gulp.task("bundle-app-prod", ["inline-templates"],
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

gulp.task("css-dev",
    function(cb)
    {
        pump([
                gulp.src(lessFiles),
                gdebug({ title: "css files: " }),
                gsourcemaps.init(),
                gless(),
                gsourcemaps.write(),
                gconcat("styles-" + getAssemblyInfo().AssemblyVersion + ".css"),
                gulp.dest(cssDestDir)
            ],
            cb);
    });

gulp.task("css-prod",
    function (cb)
    {
        pump([
                gulp.src(lessFiles),
                gdebug({ title: "css files: " }),
                gless(),
                gconcat("styles-" + getAssemblyInfo().AssemblyVersion + ".min.css"),
                guglifycss(),
                gulp.dest(cssDestDir)
        ],
            cb);
    });
