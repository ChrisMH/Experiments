var gulp = require("gulp");
var gCleanCss = require("gulp-clean-css");
var gConcat = require("gulp-concat");
var gDebug = require("gulp-debug");
var gIf = require("gulp-if");
var gInlineNgTemplate = require("gulp-inline-ng2-template");
var gLess = require("gulp-less");
var gPlumber = require("gulp-plumber");
var gRename = require("gulp-rename");
var gReplace = require("gulp-replace");
var gSass = require("gulp-sass");
var gSourceMaps = require("gulp-sourcemaps");
var gStreamify = require("gulp-streamify");
var gStylus = require("gulp-stylus");
var gTypescript = require("gulp-typescript");
var gUglify = require("gulp-uglify");
var gUtil = require("gulp-util");

var cleanCss = require("clean-css");
var del = require("del");
var fs = require("fs");
var htmlMinifier = require("html-minifier");
var mergeStream = require("merge-stream");
var path = require("path");
var runSequence = require("run-sequence");
var systemjsBuilder = require("systemjs-builder");

var vendorCss =
[   
    {
        src: "src/bootstrap/bootstrap.css",
        dst: "public"
    },
    {
        src: "node_modules/@progress/kendo-theme-default/dist/all.css",
        dst: "public",
        rename: "kendo.css"
    }
];

var vendorArt =
[
    {
        src: "src/bootstrap/fonts/**/*",
        dst: "public/fonts"
    }
];

var vendorJavascript =
[
];


var appArt =
[
    { src: "src/art/**/*", dst: "public/art" }
];


//
// Watch for changes
//
gulp.task("watch", () =>
{
    gulp.watch(["server.ts", "src/**/*.ts", "test/**/*.ts"]).on("change", (changeEvent) =>
    {
        buildTypescriptFile(changeEvent.path, false);
        gUtil.log(`Built ${changeEvent.path}`)
    });
    
    gulp.watch(["src/**/*.styl", "!src/global.styl"]).on("change", (changeEvent) =>
    {
        buildStylusFile(changeEvent.path);
        gUtil.log(`Built ${changeEvent.path}`);         
    });

    gulp.watch(["src/global.styl"], ["dev:app:css"]);

    gulp.watch(["src/bootstrap/less/**/*.less"], ["dev:vendor:css"]);
});



//
// Clean
//
gulp.task("clean", ["clean:css", "clean:js"], () => del(["public"]));
gulp.task("clean:css", () => del(["src/**/*.css", "src/**/*.css.map"]));
gulp.task("clean:js", () =>
    del(["server.js", "server.js.map", 
         "src/**/*.js", "src/**/*.js.map", "!src/system.config.js",
         "test/**/*.js", "test/**/*.js.map"]));

//
// Build entire application
//
gulp.task("dev", (cb) =>
    runSequence(
        ["clean"],
        ["vendor:art", "app:art"],
        ["dev:vendor:css", "dev:app:css"],
        ["dev:ts"],
        cb));

gulp.task("prod", (cb) =>
    runSequence(
        ["clean"],
        ["vendor:art", "app:art"],
        ["prod:vendor:css", "prod:app:css"],
        ["prod:ts"],
        ["prod:bundle"],
        cb));

//
// Vendor stylesheets
//
gulp.task("dev:vendor:css", (cb) => 
    runSequence(
        ["dev:bootstrap"],
        ["dev:vendor:transform"],
        cb));

gulp.task("prod:vendor:css", (cb) => 
    runSequence(
        ["prod:bootstrap"],
        ["prod:vendor:transform"],
        cb));

gulp.task("dev:vendor:transform", () => transformCss(vendorCss, false));
gulp.task("prod:vendor:transform", () => transformCss(vendorCss, false));

gulp.task("dev:bootstrap", () => buildLessFiles(["src/bootstrap/less/bootstrap.less"], true, false, "src/bootstrap"));
gulp.task("prod:bootstrap", () => buildLessFiles(["src/bootstrap/less/bootstrap.less"], false, false, "src/bootstrap"));

//
// Vendor art
//
gulp.task("vendor:art", () => copyArt(vendorArt));

//
// Vendor javascript
//
gulp.task("dev:vendor:js", () => transformJavascript(vendorJavascript, false));
gulp.task("prod:vendor:js", () => transformJavascript(vendorJavascript, true));

//
// Application stylesheets
//
gulp.task("dev:app:css", () => buildStylusFiles(["src/**/*.styl", "!src/global.styl"], true));
gulp.task("prod:app:css", () => buildStylusFiles(["src/**/*.styl", "!src/global.styl"], false));

//
// Application artifacts
//
gulp.task("app:art", () => copyArt(appArt));

//
// Typescript
//
gulp.task("dev:ts", () => buildTypescriptProject(true, false));
gulp.task("prod:ts", () => buildTypescriptProject(false, true));

//
// Bundling
//
gulp.task("prod:bundle", (cb) =>
{
    var builder = new systemjsBuilder("/", "src/system.config.js");

    var appBundleName = "public/app-" + getAppVersion() + ".js";

    // The first argument of buildStatic is the entry point of the application
    builder.buildStatic("app", appBundleName, { minify: true, sourceMaps: false })
        .then(() => cb())
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

buildLessFiles = (fileGlobs, sourceMaps, compress, dest) =>
{
    var streams = [];
    var base = path.resolve("./");
    if (dest === undefined)
        dest = "./";

    fileGlobs.forEach((fileGlob) => 
    {
        streams.push(
            gulp.src(fileGlob/*, {base: base}*/)
                .pipe(gPlumber({ errorHandler: onError }))
                //.pipe(gDebug())
                .pipe(gIf(sourceMaps, gSourceMaps.init()))
                .pipe(gLess())
                .pipe(gIf(sourceMaps, gSourceMaps.write()))
                .pipe(gIf(compress, gCleanCss({ keepSpecialComments: 0 })))
                .pipe(gulp.dest(dest)));
    });
    return mergeStream(streams);
};


buildSassFiles = (fileGlobs, sourceMaps, compress, dest) => 
{
    var streams = [];
    var base = path.resolve("./");
    if (dest === undefined)
        dest = "./";

    fileGlobs.forEach((fileGlob) => 
    {
        streams.push(
            gulp.src(fileGlob)
            .pipe(gPlumber({ errorHandler: onError }))
            //.pipe(gDebug())
            .pipe(gIf(sourceMaps, gSourceMaps.init()))
            .pipe(gSass())
            .pipe(gIf(sourceMaps, gSourceMaps.write()))
            .pipe(gIf(compress, gCleanCss({ keepSpecialComments: 0 })))
            .pipe(gulp.dest(dest)));
    });
    return mergeStream(streams);
};


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
    fileGlobs.forEach((fileGlob) =>
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


ngInlineTemplateProcessor = (path, ext, file, cb) =>
{
    if(ext[0] === ".html")
    {
        var minified = htmlMinifier.minify(file, { caseSensitive: true, collapseWhitespace: true, collapseInlineTagWhitespace: true, removeComments: true });
        return cb(null, minified);
    }
    else if(ext[0] === ".css")
    {
        var minified = new cleanCss().minify(file);
        return cb(null, minified.styles);
    }
    return cb(null, file);
}


buildTypescriptFile = (file, inlineTemplates) =>
{
    var base = path.resolve("./");
    var tsProject = gTypescript.createProject("./tsconfig.json");    
    return gulp.src(file, {base: base})
            .pipe(gPlumber({ errorHandler: err => {} }))
            //.pipe(gDebug())
            .pipe(gSourceMaps.init())
            .pipe(gIf(inlineTemplates, gInlineNgTemplate({useRelativePaths: true, removeLineBreaks: true, templateProcessor: ngInlineTemplateProcessor, styleProcessor: ngInlineTemplateProcessor})))
            .pipe(tsProject())
            .js
            .pipe(gSourceMaps.write("./", {includeContent: false, sourceRoot: "./"}))
            .pipe(gulp.dest("./"));
};


buildTypescriptProject = (sourceMaps, inlineTemplates) =>
{
    var tsProject = gTypescript.createProject("./tsconfig.json");
    return tsProject.src()
            .pipe(gPlumber({ errorHandler: err => {} }))
            //.pipe(gDebug())
            .pipe(gIf(sourceMaps, gSourceMaps.init()))
            .pipe(gIf(inlineTemplates, gInlineNgTemplate({useRelativePaths: true, removeLineBreaks: true, templateProcessor: ngInlineTemplateProcessor, styleProcessor: ngInlineTemplateProcessor})))
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
