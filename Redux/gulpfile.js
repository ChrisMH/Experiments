var gulp = require("gulp");
var gIf = require("gulp-if");
var gPlumber = require("gulp-plumber");
var gSourceMaps = require("gulp-sourcemaps");
var gTypescript = require("gulp-typescript");
var gUtil = require("gulp-util");

var del = require("del");
var fs = require("fs");
var path = require("path");

//
// Watch for changes
//
gulp.task("watch", (cb) =>
{
    gulp.watch(["*.ts"]).on("change", (changeEvent) =>
    {
        buildTypescriptFile(changeEvent.path);
        gUtil.log(`Built ${changeEvent.path}`)
    });
});


//
// Clean
//
gulp.task("clean", () => { return del(["*.js", "*.js.map", "!gulpfile.js", "npm-debug.log.*"]) });

//
// Build entire application
//
gulp.task("dev", ["dev:ts"]);

gulp.task("prod", ["prod:ts"]);

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


