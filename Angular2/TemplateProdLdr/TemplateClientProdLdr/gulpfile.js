/// <binding ProjectOpened='watch' />
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
var gTsc = require("gulp-typescript");
var gUglify = require("gulp-uglify");
var gUtil = require("gulp-util");

var browserify = require("browserify");
var del = require("del");
var fs = require("fs");
var runSequence = require("run-sequence");
var systemjsBuilder = require("systemjs-builder");
var vSourceStream = require("vinyl-source-stream");

var tsSrcDir = "Scripts/";
var jsDestDir = "Scripts/";

var lessSrcDir = "Styles/";
var cssDestDir = "Styles/";

var tsBuildDir = "build/";

var prodEntryPoint = "main.prod.ts";

var styleFiles = [
    "node_modules/font-awesome/css/font-awesome.css",
    "node_modules/bootstrap/dist/css/bootstrap.css",
    lessSrcDir + "Common.less"
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
        //var tsWatch = [tsSrcDir + "**/*.js", "!" + tsSrcDir + "app*.js", "!" + tsSrcDir + "lib*.js"];
        var lessWatch = [lessSrcDir + "*less"];
        //return pump([gulp.src(lessWatch), gDebug({ title: "watched files: " })]);

        //gulp.watch(tsWatch, ["bundle-app-dev"]);
        gulp.watch(lessWatch, ["build:dev:css"]);
    });


gulp.task("build:dev", function (cb)
{
    runSequence(["clean:build", "clean:css"], ["build:dev:boot", "build:dev:css"], cb);
});

gulp.task("build:prod", function (cb)
{
    runSequence("clean", ["build:prod:boot", "build:prod:app", "build:prod:lib", "build:prod:css"], "clean:build", cb)
});


gulp.task("clean", ["clean:build", "clean:css", "clean:js"], function () { });
gulp.task("clean:build", function ()
{
    return del(tsBuildDir);
});
gulp.task("clean:css", function ()
{
    return del(cssDestDir + "*.css");
});
gulp.task("clean:js", function ()
{
    return del([tsSrcDir + "**/*.js", tsSrcDir + "**/*.map", "!" + tsSrcDir + "system.dev.js"]);
});

gulp.task("build:inline:templates", function ()
{
    return gulp.src(tsSrcDir + "**/*.ts")
               .pipe(gInlineNg2Template({ base: "/" }))
               .pipe(gulp.dest(tsBuildDir));
});

gulp.task("build:prod:app", ["build:inline:templates"], function ()
{
    var b = browserify({
        debug: false
    });

    b.add(tsBuildDir + prodEntryPoint);
    libraryModules.forEach(function (lib) { b.external(lib); });

    return b.plugin(tsify).bundle().on("error", function (err) { gUtil.log(err); })
            .pipe(vSourceStream("app-" + getAssemblyInfo().AssemblyVersion + ".min.js"))
            .pipe(gStreamify(gUglify()))
            .pipe(gulp.dest(jsDestDir));
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
            .pipe(gulp.dest(jsDestDir));
});


gulp.task("build:dev:boot", function ()
{
    return gulp.src(bootScriptFiles)
               .pipe(gConcat("boot-" + getAssemblyInfo().AssemblyVersion + ".js"))
               .pipe(gulp.dest(jsDestDir));
});

gulp.task("build:prod:boot", function ()
{
    return gulp.src(bootScriptFiles)
               .pipe(gConcat("boot-" + getAssemblyInfo().AssemblyVersion + ".min.js"))
               .pipe(gStreamify(gUglify()))
               .pipe(gulp.dest(jsDestDir));
});

gulp.task("build:dev:css", function ()
{
    return gulp.src(styleFiles)
               .pipe(gSourceMaps.init())
               .pipe(gDebug({ title: "style files: " }))
               .pipe(gIf(/[.]less/, gLess()))
               .pipe(gSourceMaps.write())
               .pipe(gConcat("styles-" + getAssemblyInfo().AssemblyVersion + ".css"))
               .pipe(gulp.dest(cssDestDir));
});

gulp.task("build:prod:css", function ()
{
    return gulp.src(styleFiles)
                .pipe(gDebug({ title: "style files: " }))
                .pipe(gIf(/[.]less/, gLess()))
                .pipe(gConcat("styles-" + getAssemblyInfo().AssemblyVersion + ".min.css"))
                .pipe(gCleanCss({ keepSpecialComments: 0, debug: true }, function(details) 
                      {
                          gUtil.log(details.name + ": original: " + details.stats.originalSize + ", minified: " + details.stats.minifiedSize);
                      }))
                .pipe(gulp.dest(cssDestDir))
});