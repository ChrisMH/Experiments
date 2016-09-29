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

var vendorStylesheetFiles = [
    "styles/vendor/font-awesome/less/font-awesome.less",
    "styles/vendor/bootstrap/less/bootstrap.less"
];

var appStylesheetFiles = [
    "styles/Common.less"
];

var styleFiles = [
    { src: "styles/images/**/*", dst: "css/images" },
    { src: "styles/vendor/font-awesome/fonts/**/*", dst: "css/fonts" },
    { src: "styles/vendor/bootstrap/fonts/**/*", dst: "css/fonts" }
];

var bootJavascriptFiles = [
    "node_modules/core-js/client/shim.js",
    "node_modules/zone.js/dist/zone.js",
    "node_modules/reflect-metadata/Reflect.js",
    "node_modules/systemjs/dist/system.src.js"
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
        gulp.watch(["styles/*.less"], ["build:dev:app:css"]);
        gulp.watch(["styles/**/*.less", "!styles/*.less"], ["build:dev:vendor:css"]);
    });


gulp.task("build:dev", ["build:dev:app:css", "build:dev:vendor:css", "build:dev:boot:js", "copy:styles"], function () { });
gulp.task("build:prod", ["build:prod:app:css", "build:prod:vendor:css", "build:prod:boot:js", "build:prod:vendor:js", "build:prod:app:js", "copy:styles"], function () { });


gulp.task("clean", ["clean:css", "clean:js", "clean:styles"], function () {});

gulp.task("clean:css", function ()
{
    return del("css");
});

gulp.task("clean:js", function ()
{
    return del(["js", "scripts/**/*.js", "scripts/**/*.map", "!scripts/system.dev.js", "!scripts/vendor/**/*"]);
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

gulp.task("build:inline:templates", function ()
{
    return gulp.src("scripts/**/*.ts")
               .pipe(gInlineNg2Template({ base: "/" }))
               .pipe(gulp.dest("js"));
});

gulp.task("build:prod:app:js", ["build:inline:templates"], function ()
{
    var b = browserify({
        debug: false
    });

    b.add("js/main.prod.ts");
    libraryModules.forEach(function (lib) { b.external(lib); });

    return b.plugin(tsify).bundle().on("error", function (err) { gUtil.log(err); })
            .pipe(vSourceStream("app-" + getAssemblyInfo().AssemblyVersion + ".min.js"))
            .pipe(gStreamify(gUglify()))
            .pipe(gulp.dest("js"));
});

gulp.task("build:prod:vendor:js", function ()
{
    var b = browserify({
        debug: false
    });

    libraryModules.forEach(function (lib) { b.require(lib); });
            
    return b.bundle().on("error", function (err) { gUtil.log(err); })
            .pipe(vSourceStream("vendor-" + getAssemblyInfo().AssemblyVersion + ".min.js"))
            .pipe(gStreamify(gUglify()))
            .pipe(gulp.dest("js"));
});


gulp.task("build:dev:boot:js", function ()
{
    return gulp.src(bootJavascriptFiles)
               .pipe(gConcat("boot-" + getAssemblyInfo().AssemblyVersion + ".js"))
               .pipe(gulp.dest("js"));
});

gulp.task("build:prod:boot:js", function ()
{
    return gulp.src(bootJavascriptFiles)
               .pipe(gConcat("boot-" + getAssemblyInfo().AssemblyVersion + ".min.js"))
               .pipe(gStreamify(gUglify()))
               .pipe(gulp.dest("js"));
});

gulp.task("build:dev:app:css", function ()
{
    return gulp.src(appStylesheetFiles)
               .pipe(gSourceMaps.init())
               //.pipe(gDebug({ title: "style files: " }))
               .pipe(gIf(/[.]less/, gLess()))
               .pipe(gSourceMaps.write())
               .pipe(gConcat("app-" + getAssemblyInfo().AssemblyVersion + ".css"))
               .pipe(gulp.dest("css"));
});

gulp.task("build:prod:app:css", function ()
{
    return gulp.src(appStylesheetFiles)
                //.pipe(gDebug({ title: "style files: " }))
                .pipe(gIf(/[.]less/, gLess()))
                .pipe(gConcat("app-" + getAssemblyInfo().AssemblyVersion + ".min.css"))
                .pipe(gCleanCss({ keepSpecialComments: 0}))
                .pipe(gulp.dest("css"))
});

gulp.task("build:dev:vendor:css", function ()
{
    return gulp.src(vendorStylesheetFiles)
               .pipe(gSourceMaps.init())
               //.pipe(gDebug({ title: "style files: " }))
               .pipe(gIf(/[.]less/, gLess()))
               .pipe(gSourceMaps.write())
               .pipe(gConcat("vendor-" + getAssemblyInfo().AssemblyVersion + ".css"))
               .pipe(gulp.dest("css"));
});

gulp.task("build:prod:vendor:css", function ()
{
    return gulp.src(vendorStylesheetFiles)
                //.pipe(gDebug({ title: "style files: " }))
                .pipe(gIf(/[.]less/, gLess()))
                .pipe(gConcat("vendor-" + getAssemblyInfo().AssemblyVersion + ".min.css"))
                .pipe(gCleanCss({ keepSpecialComments: 0 }))
                .pipe(gulp.dest("css"))
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

