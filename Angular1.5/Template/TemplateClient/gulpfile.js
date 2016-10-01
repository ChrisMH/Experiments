/// <binding Clean='clean' ProjectOpened='watch' />
var gulp = require("gulp");
var gCleanCss = require("gulp-clean-css");
var gConcat = require("gulp-concat");
var gDebug = require("gulp-debug");
var gDotNetAssemblyInfo = require("gulp-dotnet-assembly-info");
var gIf = require("gulp-if");
var gLess = require("gulp-less");
var gRename = require("gulp-rename");
var gSourceMaps = require("gulp-sourcemaps");
var gStreamify = require("gulp-streamify");
var gUglify = require("gulp-uglify");
var gUtil = require("gulp-util");

var del = require("del");
var fs = require("fs");
var mergeStream = require("merge-stream");
var vSourceStream = require("vinyl-source-stream");


var vendorStylesheetFiles = [
];

var vendorJavascriptFiles = [
    { src: "node_modules/systemjs/dist/system.src.js", dst: "js/vendor/systemjs", rename: "system.js" },
    { src: "node_modules/jquery/dist/jquery.js", dst: "js/vendor/jquery" },
    { src: "node_modules/angular/angular.js", dst: "js/vendor/angular" },
    { src: "node_modules/angular-ui-router/release/angular-ui-router.js", dst: "js/vendor/angular" },
];

gulp.task("build:dev", ["build:dev:vendor:js"], function () { });
gulp.task("build:prod", ["build:prod:vendor:js"], function () { });


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

