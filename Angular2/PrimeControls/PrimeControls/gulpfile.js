/// <binding ProjectOpened='watch' />
var gulp = require("gulp");
var gcleancss = require("gulp-clean-css");
var gconcat = require("gulp-concat");
var gdebug = require("gulp-debug");
var gdotNetAssemblyInfo = require("gulp-dotnet-assembly-info");
var gif = require("gulp-if");
var ginlineNg2Template = require("gulp-inline-ng2-template");
var gless = require("gulp-less");
var grename = require("gulp-rename");
var gsourcemaps = require("gulp-sourcemaps");
var gstreamify = require("gulp-streamify");
var guglify = require("gulp-uglify");
var gutil = require("gulp-util");

var browserify = require("browserify");
var del = require("del");
var fs = require("fs");
var pump = require("pump");
var source = require("vinyl-source-stream");
var tsify = require("tsify");

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

var getPackageJson = function() {
    return JSON.parse(fs.readFileSync("./package.json", "utf8"));
};

var getAssemblyInfo = function() {
    var fileContents = fs.readFileSync("./Properties/AssemblyInfo.cs");
    return gdotNetAssemblyInfo.getAssemblyMetadata(fileContents);
};

gulp.task("watch",
    function() {
        // We rely on the VS transpiler during development, so watch js files
        //var tsWatch = [tsSrcDir + "**/*.js", "!" + tsSrcDir + "app*.js", "!" + tsSrcDir + "lib*.js"];
        var lessWatch = [lessSrcDir + "*less"];
        //return pump([gulp.src(lessWatch), gdebug({ title: "watched files: " })]);

        //gulp.watch(tsWatch, ["bundle-app-dev"]);
        gulp.watch(lessWatch, ["styles-dev"]);
    });


gulp.task("before-build", ["clean"], function() {});
gulp.task("build-dev", ["concat-boot-scripts-dev", "styles-dev"], function () { });
gulp.task("build-prod", ["concat-boot-scripts-prod", "bundle-app-prod", "styles-prod"], function () { });


gulp.task("clean",
    function() {
        return del([
            tsSrcDir + "**/*.js", tsSrcDir + "**/*.map", "!" + tsSrcDir + "system.dev.js",
            cssDestDir + "*.css",
            tsBuildDir
        ]);
    });




gulp.task("inline-templates",
    function(cb) {
        pump([
                gulp.src(tsSrcDir + "**/*.ts"),
                ginlineNg2Template({ base: "/" }),
                gulp.dest(tsBuildDir)
            ],
            cb);
    });

gulp.task("bundle-app-prod",
    ["inline-templates"],
    function (cb)
    {
        var b = browserify({
            debug: false
        });

        b.add(tsBuildDir + prodEntryPoint);

        pump([
                b.plugin(tsify)
                .bundle()
                .on("error", function (err) { gutil.log(err); }),
                source("app-" + getAssemblyInfo().AssemblyVersion + ".min.js"),
                gstreamify(guglify()),
                gulp.dest(jsDestDir)
        ],
            cb);
    });


gulp.task("concat-boot-scripts-dev",
    function(cb) {
        pump([
            gulp.src(bootScriptFiles),
            gconcat("boot-" + getAssemblyInfo().AssemblyVersion + ".js"),
            gulp.dest(jsDestDir)
        ], cb);
    });

gulp.task("concat-boot-scripts-prod",
    function (cb)
    {
        pump([
            gulp.src(bootScriptFiles),
            gconcat("boot-" + getAssemblyInfo().AssemblyVersion + ".min.js"),
            gstreamify(guglify()),
            gulp.dest(jsDestDir)
        ], cb);
    });

gulp.task("styles-dev",
    function(cb) {
        pump([
                gulp.src(styleFiles),
                gsourcemaps.init(),
                gdebug({ title: "style files: " }),
                gif(/[.]less/, gless()),
                gsourcemaps.write(),
                gconcat("styles-" + getAssemblyInfo().AssemblyVersion + ".css"),
                gulp.dest(cssDestDir)
            ],
            cb);
    });

gulp.task("styles-prod",
    function(cb) {
        pump([
                gulp.src(styleFiles),
                gdebug({ title: "style files: " }),
                gif(/[.]less/, gless()),
                gconcat("styles-" + getAssemblyInfo().AssemblyVersion + ".min.css"),
                gcleancss({ keepSpecialComments: 0, debug: true },
                    function(details) {
                        gutil.log(details.name +
                            ": original: " +
                            details.stats.originalSize +
                            ", minified: " +
                            details.stats.minifiedSize);
                    }),
                gulp.dest(cssDestDir)
            ],
            cb);
    });