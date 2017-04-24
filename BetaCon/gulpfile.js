var gulp = require("gulp");
var gCleanCss = require("gulp-clean-css");
var gConcat = require("gulp-concat");
var gDebug = require("gulp-debug");
var gIf = require("gulp-if");
var gPlumber = require("gulp-plumber");
var gRename = require("gulp-rename");
var gReplace = require("gulp-replace");
var gSourceMaps = require("gulp-sourcemaps");
var gStreamify = require("gulp-streamify");
var gStylus = require("gulp-stylus");
var gTypescript = require("gulp-typescript");
var gUglify = require("gulp-uglify");
var gUtil = require("gulp-util");

var del = require("del");
var fs = require("fs");
var path = require("path");
var mergeStream = require("merge-stream");
var runSequence = require("run-sequence");
var systemjsBuilder = require("systemjs-builder");

var vendorCss =
[
];

var vendorArt =
[
    {
        src: "node_modules/bootstrap/dist/fonts/**/*",
        dst: "public/bootstrap/fonts"
    }
];

var vendorJavascript =
[
];

appStylus =
[
    ["src/**/*.styl", "!src/global.styl"]
];

appArt =
[
    { src: "src/art/**/*", dst: "public/art" }
];


//
// Watch for changes
//
gulp.task("watch", (cb) =>
{
    gulp.watch(["server.ts", "src/**/*.ts", "src/**/*.tsx", "test/**/*.ts", "test/**/*.tsx"]).on("change", (changeEvent) =>
    {
        buildTypescriptFile(changeEvent.path);
        gUtil.log(`Built ${changeEvent.path}`)
    });

    appStylus.forEach((fileGlob) =>
    {
        gulp.watch(fileGlob).on("change", (changeEvent) =>
        {
            buildStylusFile(changeEvent.path);
            gUtil.log(`Built ${changeEvent.path}`);
        });
    });

    gulp.watch(["src/global.styl"], ["dev:app:css"]);
});



//
// Clean
//
gulp.task("clean", ["clean:css", "clean:js"], () => { return del(["public"]) });
gulp.task("clean:css", () =>
{
    return del(["src/**/*.css", "src/**/*.css.map"]);
});
gulp.task("clean:js", () =>
{
    return del(["server.js", "server.js.map", 
                "src/**/*.js", "src/**/*.js.map", "!src/system.config.js",
                "test/**/*.js", "test/**/*.js.map"]);
});

//
// Build entire application
//
gulp.task("dev", (cb) =>
{
    return runSequence(
        ["clean"],
        ["vendor:art", "app:art"],
        [/*"dev:vendor:css",*/ "dev:app:css"],
        ["dev:ts"],
        cb
    );
});

gulp.task("prod", (cb) =>
{
    return runSequence(
        ["clean"],
        ["vendor:art", "app:art"],
        [/*"prod:vendor:css",*/ "prod:app:css"],
        ["prod:ts"],
        ["prod:bundle"],
        cb
    );
});

//
// Vendor stylesheets
//
gulp.task("dev:vendor:css", () => { return transformCss(vendorCss, false); });
gulp.task("prod:vendor:css", () => { return transformCss(vendorCss, true); });

//
// Vendor artifacts
//
gulp.task("vendor:art", () => { return copyArt(vendorArt); });

//
// Vendor javascript
//
gulp.task("dev:vendor:js", () => { return transformJavascript(vendorJavascript, false); });
gulp.task("prod:vendor:js", () => { return transformJavascript(vendorJavascript, true); });

//
// Application stylesheets
//
gulp.task("dev:app:css", () => { return buildStylusFiles(appStylus, true); });
gulp.task("prod:app:css", () => { return buildStylusFiles(appStylus, false); });

//
// Application artifacts
//
gulp.task("app:art", () => { return copyArt(appArt); });

//
// Typescript
//
gulp.task("dev:ts", () => { return buildTypescriptProject(true); });
gulp.task("prod:ts", () => { return buildTypescriptProject(false); });

//
// Bundling
//
gulp.task("prod:bundle", (cb) =>
{
    var builder = new systemjsBuilder("/", "src/system.config.js");

    var appBundleName = "public/app-" + getAppVersion() + ".js";

    // The first argument of buildStatic is the entry point of the application
    builder.buildStatic("app", appBundleName, { minify: true, sourceMaps: false })
        .then(function () { cb(); })
        .catch(function (err)
        {
            console.log("Bundle Error:");
            console.log(err);
            cb();
        });
});


//
// Helper functions
//


buildStylusFile = (file) =>
{
    var base = path.resolve("./");
    return gulp.src(file, {base: base})
            .pipe(gPlumber({ errorHandler: onError }))
            //.pipe(gDebug())
            .pipe(gSourceMaps.init())
            .pipe(gStylus())
            .pipe(gSourceMaps.write("./", {includeContent: false, sourceRoot: "./"}))
            .pipe(gulp.dest("./"));
};


buildStylusFiles = (fileGlobs, sourceMaps) =>
{
    var streams = [];
    var base = path.resolve("./");
    fileGlobs.forEach(function (fileGlob)
    {
        streams.push(
            gulp.src(fileGlob, {base: base})
            .pipe(gPlumber({ errorHandler: onError }))
            //.pipe(gDebug())
            .pipe(gIf(sourceMaps, gSourceMaps.init()))
            .pipe(gStylus())
            .pipe(gIf(sourceMaps, gSourceMaps.write("./", {includeContent: false, sourceRoot: "./"})))
            .pipe(gulp.dest("./"))
        );
    });
    return mergeStream(streams);
};


buildTypescriptFile = (file) =>
{
    var base = path.resolve("./");
    var tsProject = gTypescript.createProject("./tsconfig.json");    
    return gulp.src(file, {base: base})
            .pipe(gPlumber({ errorHandler: err => {} }))
            //.pipe(gDebug())
            .pipe(gSourceMaps.init())
            .pipe(tsProject())
            .js
            .pipe(gSourceMaps.write("./", {includeContent: false, sourceRoot: "./"}))
            .pipe(gulp.dest("./"));
};


buildTypescriptProject = (sourceMaps) =>
{
    var tsProject = gTypescript.createProject("./tsconfig.json");
    return tsProject.src()
            .pipe(gPlumber({ errorHandler: err => {} }))
            //.pipe(gDebug())
            .pipe(gIf(sourceMaps, gSourceMaps.init()))
            .pipe(tsProject())
            .js
            .pipe(gIf(sourceMaps, gSourceMaps.write("./", {includeContent: false, sourceRoot: "./"})))
            .pipe(gulp.dest("./"));
};


transformCss = (files, compress) =>
{
    var streams = [];
    files.forEach(function (file)
    {
        streams.push(
            gulp.src(file.src)
            //.pipe(gDebug())
            .pipe(gPlumber({ errorHandler: onError }))
            .pipe(gIf(file.rename !== undefined, gRename(file.rename)))
            .pipe(gRename(function (path) { path.basename += "-" + getAppVersion(); }))
            .pipe(gIf(compress, gCleanCss({ keepSpecialComments: 0 })))
            .pipe(gulp.dest(file.dst))
        );
    });
    return mergeStream(streams);
};


transformJavascript = (files, compress) =>
{
    var streams = [];
    files.forEach(function (file)
    {
        streams.push(
            gulp.src(file.src)
            //.pipe(gDebug())
            .pipe(gPlumber({ errorHandler: onError }))
            .pipe(gIf(file.rename !== undefined, gRename(file.rename)))
            .pipe(gRename(function (path) { path.basename += "-" + getAppVersion(); }))
            .pipe(gIf(compress, gStreamify(gUglify())))
            .pipe(gulp.dest(file.dst))
        );
    });
    return mergeStream(streams);
};


copyArt = (artifacts) =>
{
    var streams = [];
    artifacts.forEach(function (artifact)
    {
        streams.push(gulp.src(artifact.src)
            .pipe(gPlumber({ errorHandler: onError }))
            .pipe(gulp.dest(artifact.dst))
        );
    });
    return mergeStream(streams);
};


getAppVersion = () =>
{
    var packageFile = JSON.parse(fs.readFileSync("./package.json", "utf8"));
    return packageFile["version"];
};


onError = (err) =>
{
    gUtil.log(err);
};
