/// <binding Clean='clean' ProjectOpened='watch' />
var gulp = require("gulp");
var gCleanCss = require("gulp-clean-css");
var gConcat = require("gulp-concat");
var gDebug = require("gulp-debug");
var gDotNetAssemblyInfo = require("gulp-dotnet-assembly-info");
var gIf = require("gulp-if");
var gInlineNg2Template = require("gulp-inline-ng2-template");
var gLess = require("gulp-less");
var gSourceMaps = require("gulp-sourcemaps");
var gStreamify = require("gulp-streamify");
var gUglify = require("gulp-uglify");
var gUtil = require("gulp-util");

var browserify = require("browserify");
var del = require("del");
var fs = require("fs");
var mergeStream = require("merge-stream");
var vSourceStream = require("vinyl-source-stream");
var tsify = require("tsify");

var stylesheetFiles = [
    "node_modules/font-awesome/css/font-awesome.css",
    "node_modules/bootstrap/dist/css/bootstrap.css",
    "styles/Common.less"
];

var styleFiles = [
    { src: "styles/img/**/*", dst: "css/img" }
];

var bootScriptFiles = [
    "node_modules/core-js/client/shim.js",
    "node_modules/zone.js/dist/zone.js",
    "node_modules/reflect-metadata/Reflect.js",
    "node_modules/systemjs/dist/system.src.js"
];

var jsDevFiles = [
    "scripts/system.dev.js"
];

var htmlFiles = [
    "scripts/**/*.html"
];

var libraryModules = [
    "@angular/common",
    "@angular/compiler",
    "@angular/core",
    "@angular/forms",
    "@angular/http",
    "@angular/platform-browser",
    "@angular/platform-browser-dynamic",
    "@angular/router",
    
    "ng2-cookies/ng2-cookies",
    "rxjs/Rx",
    "typedjson"
];

var getPackageJson = function() {
    return JSON.parse(fs.readFileSync("./package.json", "utf8"));
};

var getAssemblyInfo = function() {
    var fileContents = fs.readFileSync("./Properties/AssemblyInfo.cs");
    return gDotNetAssemblyInfo.getAssemblyMetadata(fileContents);
};

gulp.task("watch",
    function ()
    {
        gulp.watch(["styles/*.less"], ["build:dev:css"]);
    });


gulp.task("build:dev", ["build:dev:css", "build:dev:boot", "copy:styles"], function () { });
gulp.task("build:prod", ["build:prod:css", "build:prod:boot", "build:prod:lib", "build:prod:app", "copy:styles"], function () { });


gulp.task("clean", ["clean:css", "clean:js", "clean:styles"], function () {});

gulp.task("clean:css", function ()
{
    return del("css");
});

gulp.task("clean:js", function ()
{
    return del(["js", "scripts/**/*.js", "scripts/**/*.map", "!scripts/system.dev.js"]);
});

gulp.task("clean:styles", function ()
{   
    var promise = [];
    styleFiles.forEach(function (styleFile)
    {
        promise.push(del(styleFile.dst));
    });
    return Promise.all(promise);
});

gulp.task("build:inline:templates", ["copy:html"], function ()
{
    return gulp.src("scripts/**/*.ts")
               .pipe(gInlineNg2Template({ base: "/" }))
               .pipe(gulp.dest("js"));
});

gulp.task("build:prod:app", ["build:inline:templates"], function ()
{
    var b = browserify({
        debug: false
    });

    b.add("js/main.prod.js");
    libraryModules.forEach(function (lib) { b.external(lib); });

    return b.plugin(tsify).bundle().on("error", function (err) { gUtil.log(err); })
            .pipe(vSourceStream("app-" + getAssemblyInfo().AssemblyVersion + ".min.js"))
            .pipe(gStreamify(gUglify()))
            .pipe(gulp.dest("js"));
});

gulp.task("build:prod:lib", function ()
{
    var b = browserify({
        debug: false
    });

    libraryModules.forEach(function (lib) { b.require(lib); });
            
    return b.bundle().on("error", function (err) { gUtil.log(err); })
            .pipe(vSourceStream("lib-" + getAssemblyInfo().AssemblyVersion + ".min.js"))
            .pipe(gStreamify(gUglify()))
            .pipe(gulp.dest("js"));
});


gulp.task("build:dev:boot", function ()
{
    return gulp.src(bootScriptFiles)
               .pipe(gConcat("boot-" + getAssemblyInfo().AssemblyVersion + ".js"))
               .pipe(gulp.dest("js"));
});

gulp.task("build:prod:boot", function ()
{
    return gulp.src(bootScriptFiles)
               .pipe(gConcat("boot-" + getAssemblyInfo().AssemblyVersion + ".min.js"))
               .pipe(gStreamify(gUglify()))
               .pipe(gulp.dest("js"));
});

gulp.task("build:dev:css", function ()
{
    return gulp.src(stylesheetFiles)
               .pipe(gSourceMaps.init())
               //.pipe(gDebug({ title: "style files: " }))
               .pipe(gIf(/[.]less/, gLess()))
               .pipe(gSourceMaps.write())
               .pipe(gConcat("styles-" + getAssemblyInfo().AssemblyVersion + ".css"))
               .pipe(gulp.dest("css"));
});

gulp.task("build:prod:css", function ()
{
    return gulp.src(stylesheetFiles)
                //.pipe(gDebug({ title: "style files: " }))
                .pipe(gIf(/[.]less/, gLess()))
                .pipe(gConcat("styles-" + getAssemblyInfo().AssemblyVersion + ".min.css"))
                .pipe(gCleanCss({ keepSpecialComments: 0 }))
                .pipe(gulp.dest("css"));
});


gulp.task("copy:styles", function ()
{
    var streams = [];
    styleFiles.forEach(function (style)
    {
        streams.push(gulp.src(style.src).pipe(gulp.dest(style.dst)));
    });
    return mergeStream(streams);
});

