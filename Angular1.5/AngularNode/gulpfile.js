/// <binding ProjectOpened='watch' />
var gulp = require("gulp");
var gCleanCss = require("gulp-clean-css");
var gConcat = require("gulp-concat");
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
var mergeStream = require("merge-stream");
var runSequence = require("run-sequence");
var systemjsBuilder = require("systemjs-builder");

var vendorStylesheets =
[
    {
        src: "node_modules/bootstrap/dist/css/bootstrap.css",
        dst: "public/bootstrap/css",
        version: function () { return getPackageVersion("bootstrap"); }
    }
];

var vendorArtifacts =
[
    {
        src: "node_modules/bootstrap/dist/fonts/**/*",
        dst: "public/bootstrap/fonts"
    }
];

var vendorJavascript =
[
    {
        src: "node_modules/systemjs/dist/system.src.js",
        dst: "public",
        rename: "system.js",
        version: function () { return getPackageVersion("systemjs"); }
    }
];

appStylesheets =
[
    { src: ["src/**/*.styl", "!src/global.styl"], dst: "src" }
];

appArtifacts =
[
    { src: "img/**/*", dst: "public/img" }
];

appTypescript =
[
    { src: "server.ts", dst: "./" },
    { src: ["src/**/*.ts", "src/**/*.tsx"], dst: "src" }
];

//
// Watch for changes
//
gulp.task("watch", (cb) =>
{

});

//
// Clean
//
gulp.task("clean", ["clean:css", "clean:js"], () => { return del(["public"]) });
gulp.task("clean:css", () =>
{
    return del(["src/**/*.css"]);
});
gulp.task("clean:js", () =>
{
    return del(["server.js", "src/**/*.js", "!src/system.config.js", "!src/system.config.bundle.js"]);
});

//
// Build entire application
//
gulp.task("dev", (cb) =>
{
    return runSequence(
        ["clean"],
        ["dev:app:ts"],
        ["dev:vendor:js", "dev:vendor:css", "dev:app:css", "copy:vendor:artifacts", "copy:app:artifacts"],
        cb
    );
});

gulp.task("prod", (cb) =>
{
    return runSequence(
        ["clean"],
        ["prod:app:ts"],
        ["prod:vendor:js", "prod:vendor:css", "prod:app:css", "copy:vendor:artifacts", "copy:app:artifacts", "prod:system:config"],
        ["prod:bundle"],
        cb
    );
});

//
// Vendor stylesheets
//
gulp.task("dev:vendor:css", () => { return buildStylesheets(vendorStylesheets, false); });
gulp.task("prod:vendor:css", () => { return buildStylesheets(vendorStylesheets, true); });

//
// Vendor artifacts
//
gulp.task("copy:vendor:artifacts", () => { return copyArtifacts(vendorArtifacts); });

//
// Vendor javascript
//
gulp.task("dev:vendor:js", () => { return buildJavascript(vendorJavascript, false); });
gulp.task("prod:vendor:js", () => { return buildJavascript(vendorJavascript, true); });

//
// Application stylesheets
//
gulp.task("dev:app:css", () =>
{
    return buildStylesheets(appStylesheets, false);
});

gulp.task("prod:app:css", () =>
{
    return buildStylesheets(appStylesheets, true);
});

//
// Application artifacts
//
gulp.task("copy:app:artifacts", () => { return copyArtifacts(appArtifacts); });

//
// Application typescript
//
gulp.task("dev:app:ts", (cb) =>
{
    return buildTypescript(appTypescript, true);
});

gulp.task("prod:app:ts", (cb) =>
{
    return buildTypescript(appTypescript, false);
});


//
// Bundling
//
gulp.task("prod:system:config", () =>
{
    return gulp.src(["src/system.config.js", "src/system.config.bundle.js"])
        .pipe(gPlumber({ errorHandler: onError }))
        .pipe(gReplace("__VERSION__", getAppVersion()))
        .pipe(gConcat("system.config-" + getAppVersion() + ".js"))
        .pipe(gStreamify(gUglify()))
        .pipe(gulp.dest("public"));
});

// App Production Bundling
gulp.task("prod:bundle",
    function (cb)
    {
        var builder = new systemjsBuilder("", "src/system.config.js");

        var appBundleName = "public/app-" + getAppVersion() + ".js";
        builder.bundle("app", appBundleName, { minify: true, sourceMaps: false })
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

buildStylesheets = (files, compress) =>
{
    var streams = [];
    files.forEach(function (file)
    {
        streams.push(
            gulp.src(file.src)
            .pipe(gPlumber({ errorHandler: onError }))
            .pipe(gIf(compress !== true, gSourceMaps.init()))
            .pipe(gIf(file.rename !== undefined, gRename(file.rename)))
            .pipe(gIf(file.version !== undefined, gRename(function (path) { path.basename += "-" + file.version(); })))
            .pipe(gIf(/\.styl/,
                gStylus(),
                gRename(function (path) { path.extname = ".css"; })))
            .pipe(gIf(compress === true, gCleanCss({ keepSpecialComments: 0 })))
            .pipe(gIf(compress !== true, gSourceMaps.write({ destPath: file.dst })))
            .pipe(gulp.dest(file.dst))
        );
    });
    return mergeStream(streams);
}

buildTypescript = (files, sourceMaps) =>
{
    var streams = [];
    files.forEach(function (file)
    {
        var tsProject = gTypescript.createProject("./tsconfig.json");
        var tsResult =
            gulp.src(file.src)
                .pipe(gPlumber({ errorHandler: onError }))
                .pipe(gIf(sourceMaps === true, gSourceMaps.init()))
                .pipe(tsProject());
        streams.push(
            tsResult.js
                .pipe(gPlumber({ errorHandler: onError }))
                .pipe(gIf(sourceMaps === true, gSourceMaps.write({ destPath: file.dst })))
                .pipe(gulp.dest(file.dst)));
    });
    return mergeStream(streams);
}

buildJavascript = (files, compress) =>
{
    var streams = [];
    files.forEach(function (file)
    {
        streams.push(
            gulp.src(file.src)
            .pipe(gPlumber({ errorHandler: onError }))
            .pipe(gIf(file.rename !== undefined, gRename(file.rename)))
            .pipe(gIf(file.version !== undefined, gRename(function (path) { path.basename += "-" + file.version(); })))
            .pipe(gIf(compress, gStreamify(gUglify())))
            .pipe(gulp.dest(file.dst))
        );
    });
    return mergeStream(streams);
}

copyArtifacts = (artifacts) =>
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
}

getAppVersion = () =>
{
    var packageFile = JSON.parse(fs.readFileSync("./package.json", "utf8"));
    return packageFile["version"];
}

getPackageVersion = (packageKey) =>
{
    var packageFile = JSON.parse(fs.readFileSync("./package.json", "utf8"));
    var version = "0.0.0";

    if (packageFile.dependencies && packageFile.dependencies.hasOwnProperty(packageKey))
        version = packageFile.dependencies[packageKey];
    else if (packageFile.devDependencies && packageFile.devDependencies.hasOwnProperty(packageKey))
        version = packageFile.devDependencies[packageKey];

    if (version[0] === "^" || version[0] === "~")
        return version.substr(1, version.length - 1);
    return version;
}

onError = (err) =>
{
    gUtil.log(err);
}
