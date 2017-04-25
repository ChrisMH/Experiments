var gulp = require("gulp");
var gConcat = require("gulp-concat");
var gDebug = require("gulp-debug");
var gIf = require("gulp-if");
var gPlumber = require("gulp-plumber");
var gRename = require("gulp-rename");
var gReplace = require("gulp-replace");
var gSourceMaps = require("gulp-sourcemaps");
var gStreamify = require("gulp-streamify");
var gTypescript = require("gulp-typescript");
var gUglify = require("gulp-uglify");
var gUtil = require("gulp-util");

var del = require("del");
var fs = require("fs");
var path = require("path");
var mergeStream = require("merge-stream");
var runSequence = require("run-sequence");


//
// Watch for changes
//
gulp.task("watch", (cb) =>
{
    gulp.watch(["server.ts", "PerformanceDb.ts", "Models/**/*.ts"]).on("change", (changeEvent) =>
    {
        buildTypescriptFile(changeEvent.path, false);
        gUtil.log(`Built ${changeEvent.path}`)
    });
});



//
// Clean
//
gulp.task("clean", () => 
{ 
    return del(["server.js", "server.js.map", 
                "PerformanceDb.js", "PerformanceDb.js.map",
                "Models/**/*.js", "Models/**/*.js.map"]) 
});

//
// Build entire application
//
gulp.task("dev", (cb) =>
{
    return runSequence(
        ["clean"],
        ["dev:ts"],
        cb
    );
});

gulp.task("prod", (cb) =>
{
    return runSequence(
        ["clean"],
        ["prod:ts"],
        cb
    );
});

//
// Typescript
//
gulp.task("dev:ts", () => { return buildTypescriptProject(true); });
gulp.task("prod:ts", () => { return buildTypescriptProject(false); });

//
// Helper functions
//



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

