/// <binding ProjectOpened='watch' />
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

var tsSrcDir = "Scripts/";
var jsDestDir = "Scripts/";

var lessSrcDir = "Styles/";
var cssDestDir = "Styles/";

var tsBuildDir = "build/";

var devEntryPoint = "main.dev.js"; // We rely on the VS transpiler during development
var prodEntryPoint = "main.prod.ts";

var lessFiles = [
    lessSrcDir + "Common.less"
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
        // We rely on the VS transpiler during development, so watch js files
        //var tsWatch = [tsSrcDir + "**/*.js", "!" + tsSrcDir + "app*.js", "!" + tsSrcDir + "lib*.js"];
        var lessWatch = [lessSrcDir + "*less"];
        //return pump([gulp.src(lessWatch), gdebug({ title: "watched files: " })]);

        //gulp.watch(tsWatch, ["bundle-app-dev"]);
        gulp.watch(lessWatch, ["css-dev"]);
    });


gulp.task("before-build", ["clean"], function () { });
gulp.task("build-dev", ["css-dev", "bundle-lib-dev", "bundle-app-dev"], function () { });
gulp.task("build-prod", ["css-prod", "bundle-lib-prod", "bundle-app-prod"], function() {});


gulp.task("clean",
    function()
    {
        return del([
            tsSrcDir + "**/*.js", tsSrcDir + "**/*.map", "!" + tsSrcDir + "system.dev.js", , "!" + tsSrcDir + "system.prod.js",
            cssDestDir + "*.css",
            tsBuildDir
        ]);
    });


gulp.task("inline-templates",
    function(cb)
    {
        pump([
                gulp.src(tsSrcDir + "**/*.ts"),
                ginlineNg2Template({ base: "/" }),
                gulp.dest(tsBuildDir)
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

        b.add(tsSrcDir + devEntryPoint);

        var libs = Object.keys(getPackageJson().dependencies);
        libs.forEach(function(lib) { b.external(lib); });

        pump([
                b.bundle() // We rely on the VS transpiler during development
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

        b.add(tsBuildDir + prodEntryPoint);

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
