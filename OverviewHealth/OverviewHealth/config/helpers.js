var fs = require("fs");
var path = require("path");

var _root = path.resolve(__dirname, "..");

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(args));
}

function appVersion() {
    var packageFile = JSON.parse(fs.readFileSync(root("package.json"), "utf8"));
    return packageFile["version"];
};

exports.root = root;
exports.appVersion = appVersion;
