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
var runSequence = require("run-sequence");
var vSourceStream = require("vinyl-source-stream");
var tsify = require("tsify");

var srcDir = "Scripts/";
var jsDir = "js/";

var styleDir = "Styles/";
var cssDir = "css/";

var imgSrcDir = "Styles/img/";
var imgDestDir = "css/img/";

var buildDir = "build/";

var prodEntryPoint = "main.prod.ts";

var styleFiles = [
    "node_modules/font-awesome/css/font-awesome.css",
    "node_modules/bootstrap/dist/css/bootstrap.css",
    styleDir + "Common.less"
];

var bootScriptFiles = [
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
    "ng2-cookies/ng2-cookies"
];

var getPackageJson = function() {
    return JSON.parse(fs.readFileSync("./package.json", "utf8"));
};

var getAssemblyInfo = function() {
    var fileContents = fs.readFileSync("./Properties/AssemblyInfo.cs");
    return gDotNetAssemblyInfo.getAssemblyMetadata(fileContents);
};

gulp.task("watch",
    function() {
        // We rely on the VS transpiler during development, so watch js files
        //var tsWatch = [srcDir + "**/*.js", "!" + srcDir + "app*.js", "!" + srcDir + "lib*.js"];
        var lessWatch = [styleDir + "*less"];
        //return pump([gulp.src(lessWatch), gDebug({ title: "watched files: " })]);

        //gulp.watch(tsWatch, ["bundle-app-dev"]);
        gulp.watch(lessWatch, ["build:dev:css"]);
    });


gulp.task("build:dev", function (cb)
{
    runSequence(["clean:build", "clean:css", "clean:js:dest", "clean:img"],
                ["build:dev:boot", "build:dev:css", "copy:img"], cb);
});

gulp.task("build:prod", function (cb)
{
    runSequence("clean", ["build:prod:boot", "build:prod:app", "build:prod:lib", "build:prod:css", "copy:img"], "clean:build", cb)
});


gulp.task("clean", ["clean:build", "clean:css", "clean:js:src", "clean:js:dest", "clean:img"], function () { });
gulp.task("clean:build", function ()
{
    return del(buildDir);
});
gulp.task("clean:css", function ()
{
    return del(cssDir);
});

gulp.task("clean:js:src", function ()
{
    return del([srcDir + "**/*.js", srcDir + "**/*.map", "!" + srcDir + "system.dev.js"]);
});

gulp.task("clean:js:dest", function ()
{
    return del([jsDir]);
});

gulp.task("clean:img", function ()
{
    return del([imgDestDir]);
});

gulp.task("build:inline:templates", function ()
{
    return gulp.src(srcDir + "**/*.ts")
               .pipe(gInlineNg2Template({ base: "/" }))
               .pipe(gulp.dest(buildDir));
});

gulp.task("build:prod:app", ["build:inline:templates"], function ()
{
    var b = browserify({
        debug: false
    });

    b.add(buildDir + prodEntryPoint);
    libraryModules.forEach(function (lib) { b.external(lib); });

    return b.plugin(tsify).bundle().on("error", function (err) { gUtil.log(err); })
            .pipe(vSourceStream("app-" + getAssemblyInfo().AssemblyVersion + ".min.js"))
            .pipe(gStreamify(gUglify()))
            .pipe(gulp.dest(jsDir));
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
            .pipe(gulp.dest(jsDir));
});


gulp.task("build:dev:boot", function ()
{
    return gulp.src(bootScriptFiles)
               .pipe(gConcat("boot-" + getAssemblyInfo().AssemblyVersion + ".js"))
               .pipe(gulp.dest(jsDir));
});

gulp.task("build:prod:boot", function ()
{
    return gulp.src(bootScriptFiles)
               .pipe(gConcat("boot-" + getAssemblyInfo().AssemblyVersion + ".min.js"))
               .pipe(gStreamify(gUglify()))
               .pipe(gulp.dest(jsDir));
});

gulp.task("build:dev:css", function ()
{
    return gulp.src(styleFiles)
               .pipe(gSourceMaps.init())
               //.pipe(gDebug({ title: "style files: " }))
               .pipe(gIf(/[.]less/, gLess()))
               .pipe(gSourceMaps.write())
               .pipe(gConcat("styles-" + getAssemblyInfo().AssemblyVersion + ".css"))
               .pipe(gulp.dest(cssDir));
});

gulp.task("build:prod:css", function ()
{
    return gulp.src(styleFiles)
                //.pipe(gDebug({ title: "style files: " }))
                .pipe(gIf(/[.]less/, gLess()))
                .pipe(gConcat("styles-" + getAssemblyInfo().AssemblyVersion + ".min.css"))
                .pipe(gCleanCss({ keepSpecialComments: 0}))
                .pipe(gulp.dest(cssDir))
});


gulp.task("copy:img", function ()
{
    return gulp.src(imgSrcDir + "**/*")
               .pipe(gulp.dest(imgDestDir));
});

