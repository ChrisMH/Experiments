/// <binding Clean='clean' ProjectOpened='watch' />
var gulp = require("gulp");
var gCleanCss = require("gulp-clean-css");
var gConcat = require("gulp-concat");
var gDebug = require("gulp-debug");
var gDotNetAssemblyInfo = require("gulp-dotnet-assembly-info");
var gIf = require("gulp-if");
var gInlineNg2Template = require("gulp-inline-ng2-template");
var gLess = require("gulp-less");
var gRename = require("gulp-rename");
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

var vendorJavascriptFiles = [
    { src: "node_modules/core-js/client/shim.js", dst: "js/vendor/core-js" },
    { src: "node_modules/zone.js/dist/zone.js", dst: "js/vendor/zone.js" },
    { src: "node_modules/reflect-metadata/Reflect.js", dst: "js/vendor/reflect-metadata" },
    { src: "node_modules/systemjs/dist/system.src.js", dst: "js/vendor/systemjs", rename: "system.js" },
    { src: "node_modules/@angular/common/bundles/common.umd.js", dst: "js/vendor/@angular/" },
    { src: "node_modules/@angular/compiler/bundles/compiler.umd.js", dst: "js/vendor/@angular" },
    { src: "node_modules/@angular/core/bundles/core.umd.js", dst: "js/vendor/@angular" },
    { src: "node_modules/@angular/forms/bundles/forms.umd.js", dst: "js/vendor/@angular" },
    { src: "node_modules/@angular/http/bundles/http.umd.js", dst: "js/vendor/@angular" },
    { src: "node_modules/@angular/platform-browser/bundles/platform-browser.umd.js", dst: "js/vendor/@angular" },
    { src: "node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js", dst: "js/vendor/@angular" },
    { src: "node_modules/@angular/router/bundles/router.umd.js", dst: "js/vendor/@angular" },
    //{ src: "", dst: "" },
];


var appStylesheetFiles = [
    "styles/app/app.less"
];

var styleFiles = [
    { src: "styles/app/images/**/*", dst: "css/images" },
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
        gulp.watch(["styles/app/**/*.less"], ["build:dev:app:css"]);
        gulp.watch(["styles/vendor/**/*.less", "styles/vendor/**/*.css"], ["build:dev:vendor:css"]);
    });


gulp.task("build:dev", ["build:dev:app:css", "build:dev:vendor:css", "build:dev:vendor:js", "copy:styles"], function () { });
gulp.task("build:prod", ["build:prod:app:css", "build:prod:vendor:css", "build:prod:vendor:js", "build:prod:app:js", "copy:styles"], function () { });


gulp.task("clean", ["clean:css", "clean:js", "clean:styles"], function () {});

gulp.task("clean:css", function ()
{
    return del("css");
});

gulp.task("clean:js", function ()
{
    return del(["js", "scripts/app/**/*.js", "scripts/app/**/*.map", "!scripts/app/system.dev.js"]);
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
    return gulp.src("scripts/app/**/*.ts")
               .pipe(gInlineNg2Template({ base: "/", useRelativePaths: true }))
               .pipe(gulp.dest("js/app"));
});

gulp.task("build:prod:app:js", ["build:inline:templates"], function ()
{
    var b = browserify({
        debug: false
    });

    b.add("js/app/main.prod.ts");
    libraryModules.forEach(function (lib) { b.external(lib); });

    return b.plugin(tsify).bundle().on("error", function (err) { gUtil.log(err); })
            .pipe(vSourceStream("app-" + getAssemblyInfo().AssemblyVersion + ".min.js"))
            .pipe(gStreamify(gUglify()))
            .pipe(gulp.dest("js"));
});


gulp.task("build:dev:vendor:js", function ()
{
    var streams = [];
    vendorJavascriptFiles.forEach(function (file)
    {
        streams.push(
            gulp.src(file.src)
                .pipe(gIf((file.rename != undefined), gRename(file.rename)))
                .pipe(gulp.dest(file.dst))
        );
    });
    return mergeStream(streams);
});

gulp.task("build:prod:vendor:js", function ()
{
    var streams = [];
    vendorJavascriptFiles.forEach(function (file)
    {
        streams.push(
            gulp.src(file.src)
                .pipe(gIf((file.rename != undefined), gRename(file.rename)))
                .pipe(gStreamify(gUglify()))
                .pipe(gulp.dest(file.dst))
        );
    });
    return mergeStream(streams);
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

