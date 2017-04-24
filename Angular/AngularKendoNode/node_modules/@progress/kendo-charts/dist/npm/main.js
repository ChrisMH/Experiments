'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _progress_kendoDrawing = require('@progress/kendo-drawing');

var X = "x";
var Y = "y";
var TOP = "top";
var BOTTOM = "bottom";
var LEFT = "left";
var RIGHT = "right";
var CENTER = "center";
var WIDTH = "width";
var HEIGHT = "height";
var COORD_PRECISION = 3;
var MAX_VALUE = Number.MAX_VALUE;
var MIN_VALUE = -Number.MAX_VALUE;
var DEFAULT_WIDTH = 600;
var DEFAULT_HEIGHT = 400;
var WHITE = "#fff";
var BLACK = "#000";
var DEFAULT_FONT = "12px sans-serif";
var DEFAULT_PRECISION = 10;
var AXIS_LABEL_CLICK = "axisLabelClick";
var NOTE_CLICK = "noteClick";
var NOTE_HOVER = "noteHover";
var OUTSIDE = "outside";
var NONE = "none";
var CIRCLE = "circle";
var TRIANGLE = "triangle";
var CROSS = "cross";
var ARC = "arc";
var INSIDE = "inside";
var VALUE = "value";
var STRING = "string";
var OBJECT = "object";
var DATE = "date";
var FORMAT_REGEX = /\{\d+:?/;

function isArray(value) {
    return Array.isArray(value);
}

function addClass(element, classes) {
    var classArray = isArray(classes) ? classes : [ classes ];

    for (var idx = 0; idx < classArray.length; idx++) {
        var className = classArray[idx];
        if (element.className.indexOf(className) === -1) {
            element.className += " " + className;
        }
    }
}

var SPACE_REGEX = /\s+/g;

function removeClass(element, className) {
    if (element && element.className) {
        element.className = element.className.replace(className, "").replace(SPACE_REGEX, " ");
    }
}

function alignPathToPixel(path) {
    var offset = 0.5;
    if (path.options.stroke && _progress_kendoDrawing.drawing.util.defined(path.options.stroke.width)) {
        if (path.options.stroke.width % 2 === 0) {
            offset = 0;
        }
    }

    for (var i = 0; i < path.segments.length; i++) {
        path.segments[i].anchor().round(0).translate(offset, offset);
    }

    return path;
}

function clockwise(angle1, angle2) {
    // True if angle2 is clockwise of angle1
    // assuming angles grow in clock-wise direction
    // (as in the pie and radar charts)
    return -angle1.x * angle2.y + angle1.y * angle2.x < 0;
}

function isFunction(fn) {
    return typeof fn === "function";
}

var OBJECT$1 = "object";
var UNDEFINED = "undefined";

function deepExtendOne(destination, source) {

    for (var property in source) {
        var propValue = source[property];
        var propType = typeof propValue;

        var propInit = (void 0);
        if (propType === OBJECT$1 && propValue !== null) {
            propInit = propValue.constructor;
        } else {
            propInit = null;
        }

        if (propInit && propInit !== Array) {

            if (propValue instanceof Date) {
                destination[property] = new Date(propValue.getTime());
            } else if (isFunction(propValue.clone)) {
                destination[property] = propValue.clone();
            } else {
                var destProp = destination[property];
                if (typeof (destProp) === OBJECT$1) {
                    destination[property] = destProp || {};
                } else {
                    destination[property] = {};
                }
                deepExtendOne(destination[property], propValue);
            }
        } else if (propType !== UNDEFINED) {
            destination[property] = propValue;
        }
    }

    return destination;
}

function deepExtend(destination) {
    var arguments$1 = arguments;

    var length = arguments.length;

    for (var i = 1; i < length; i++) {
        deepExtendOne(destination, arguments$1[i]);
    }

    return destination;
}

function isObject(value) {
    return typeof value === "object";
}

function isString(value) {
    return typeof value === STRING;
}

function isNumber(value) {
    return typeof value === "number" && !isNaN(value);
}

function styleValue(value) {
    if (isNumber(value)) {
        return value + "px";
    }
    return value;
}

var SIZE_STYLES_REGEX = /width|height|top|left|bottom|right/i;

function isSizeField(field) {
    return SIZE_STYLES_REGEX.test(field);
}

function elementStyles(element, styles) {
    var stylesArray = isString(styles) ? [ styles ] : styles;

    if (isArray(stylesArray)) {
        var result = {};
        var style = window.getComputedStyle(element);

        for (var idx = 0; idx < stylesArray.length; idx++) {
            var field = stylesArray[idx];
            result[field] = isSizeField(field) ? parseFloat(style[field]) : style[field];
        }

        return result;
    } else if (isObject(styles)) {
        for (var field$1 in styles) {
            element.style[field$1] = styleValue(styles[field$1]);
        }
    }
}

function getSpacing(value, defaultSpacing) {
    if ( defaultSpacing === void 0 ) defaultSpacing = 0;

    var spacing = { top: 0, right: 0, bottom: 0, left: 0 };

    if (typeof(value) === "number") {
        spacing[TOP] = spacing[RIGHT] = spacing[BOTTOM] = spacing[LEFT] = value;
    } else {
        spacing[TOP] = value[TOP] || defaultSpacing;
        spacing[RIGHT] = value[RIGHT] || defaultSpacing;
        spacing[BOTTOM] = value[BOTTOM] || defaultSpacing;
        spacing[LEFT] = value[LEFT] || defaultSpacing;
    }

    return spacing;
}

var defaultImplementation = {
    format: function (format, value) { return value; },

    toString: function (value) { return value; },

    parseDate: function (value) { return new Date(value); }
};

var current = defaultImplementation;

var IntlService = function IntlService () {};

var staticAccessors = { implementation: {} };

IntlService.register = function register (userImplementation) {
    current = userImplementation;
};

staticAccessors.implementation.get = function () {
    return current;
};

Object.defineProperties( IntlService, staticAccessors );

var FORMAT_REPLACE_REGEX = /\{(\d+)(:[^\}]+)?\}/g;

var FormatService = function FormatService(intlService) {
    this._intlService = intlService;
};

var prototypeAccessors$1 = { intlService: {} };

prototypeAccessors$1.intlService.get = function () {
    return this._intlService || IntlService.implementation;
};

FormatService.prototype.auto = function auto (formatString) {
        var values = [], len = arguments.length - 1;
        while ( len-- > 0 ) values[ len ] = arguments[ len + 1 ];

    var intl = this.intlService;

    if (formatString.match(FORMAT_REGEX)) {
        return intl.format.apply(intl, [ formatString ].concat( values ));
    }

    return intl.toString(values[0], formatString);
};

FormatService.prototype.localeAuto = function localeAuto (formatString, values, locale) {
    var intl = this.intlService;
    var result;

    if (formatString.match(FORMAT_REGEX)) {
        result = formatString.replace(FORMAT_REPLACE_REGEX, function(match, index, placeholderFormat) {
            var value = values[parseInt(index, 10)];

            return intl.toString(value, placeholderFormat ? placeholderFormat.substring(1) : "", locale);
        });
    } else {
        result = intl.toString(values[0], formatString, locale);
    }

    return result;
};

Object.defineProperties( FormatService.prototype, prototypeAccessors$1 );

var ChartService = function ChartService(chart, context) {
    if ( context === void 0 ) context = {};

    this._intlService = context.intlService;
    this.sender = context.sender || chart;
    this.format = new FormatService(context.intlService);
    this.chart = chart;
};

var prototypeAccessors = { intl: {} };

prototypeAccessors.intl.get = function () {
    return this._intlService || IntlService.implementation;
};

ChartService.prototype.notify = function notify (name, args) {
    this.chart.trigger(name, args);
};

Object.defineProperties( ChartService.prototype, prototypeAccessors );

var current$1;

var DomEventsBuilder = function DomEventsBuilder () {};

DomEventsBuilder.register = function register (userImplementation) {
    current$1 = userImplementation;
};

DomEventsBuilder.create = function create (element, events) {
    if (current$1) {
        return current$1.create(element, events);
    }
};

var current$2 = {
    compile: function(template) {
        return template;
    }
};

var TemplateService = function TemplateService () {};

TemplateService.register = function register (userImplementation) {
    current$2 = userImplementation;
};

TemplateService.compile = function compile (template) {
    return current$2.compile(template);
};

function getTemplate(options) {
    if ( options === void 0 ) options = {};

    var template;
    if (options.template) {
        options.template = template = TemplateService.compile(options.template);
    } else if (isFunction(options.content)) {
        template = options.content;
    }

    return template;
}

var FIELD_REGEX = /\[(?:(\d+)|['"](.*?)['"])\]|((?:(?!\[.*?\]|\.).)+)/g;
var getterCache = {};

getterCache['undefined'] = function(obj) {
    return obj;
};

function getter(field) {
    if (getterCache[field]) {
        return getterCache[field];
    }

    var fields = [];
    field.replace(FIELD_REGEX, function(match, index, indexAccessor, field) {
        fields.push(_progress_kendoDrawing.drawing.util.defined(index) ? index : (indexAccessor || field));
    });

    getterCache[field] = function(obj) {
        var result = obj;
        for (var idx = 0; idx < fields.length && result; idx++) {
            result = result[fields[idx]];
        }

        return result;
    };

    return getterCache[field];
}

function grep(array, callback) {
    var length = array.length;
    var result = [];
    for (var idx = 0; idx < length; idx++) {
        if (callback(array[idx])) {
            result .push(array[idx]);
        }
    }

    return result;
}

function hasClasses(element, classNames) {
    if (element.className) {
        var names = classNames.split(" ");
        for (var idx = 0; idx < names.length; idx++) {
            if (element.className.indexOf(names[idx]) !== -1) {
                return true;
            }
        }
    }
}

function inArray(value, array) {
    if (array) {
        return array.indexOf(value) !== -1;
    }
}

function interpolateValue(start, end, progress) {
    return _progress_kendoDrawing.drawing.util.round(start + (end - start) * progress, COORD_PRECISION);
}

var TRIGGER = 'trigger';

var InstanceObserver = function InstanceObserver(observer, handlers) {
    this.observer = observer;
    this.handlerMap = deepExtend({}, this.handlerMap, handlers);
};

InstanceObserver.prototype.trigger = function trigger (name, args) {
    var ref = this;
        var observer = ref.observer;
        var handlerMap = ref.handlerMap;
    var isDefaultPrevented;
    if (handlerMap[name]) {
        isDefaultPrevented = this.callObserver(handlerMap[name], args);
    } else if (observer[TRIGGER]) {
        isDefaultPrevented = this.callObserver(TRIGGER, name, args);
    }

    return isDefaultPrevented;
};

InstanceObserver.prototype.callObserver = function callObserver (fnName) {
        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

    return this.observer[fnName].apply(this.observer, args);
};

InstanceObserver.prototype.requiresHandlers = function requiresHandlers (names) {
        var this$1 = this;

    if (this.observer.requiresHandlers) {
        return this.observer.requiresHandlers(names);
    }

    for (var idx = 0; idx < names.length; idx++) {
        if (this$1.handlerMap[names[idx]]) {
            return true;
        }
    }
};

function map(array, callback) {
    var length = array.length;
    var result = [];
    for (var idx = 0; idx < length; idx++) {
        var value = callback(array[idx]);
        if (_progress_kendoDrawing.drawing.util.defined(value)) {
            result.push(value);
        }
    }
    return result;
}

function mousewheelDelta(e) {
    var delta = 0;

    if (e.wheelDelta) {
        delta = -e.wheelDelta / 120;
        delta = delta > 0 ? Math.ceil(delta) : Math.floor(delta);
    }

    if (e.detail) {
        delta = _progress_kendoDrawing.drawing.util.round(e.detail / 3);
    }

    return delta;
}

var ref$1 = _progress_kendoDrawing.drawing.util;
var append$1 = ref$1.append;
var bindEvents = ref$1.bindEvents;
var defined = ref$1.defined;
var deg = ref$1.deg;
var elementOffset = ref$1.elementOffset;
var elementSize$1 = ref$1.elementSize;
var eventElement = ref$1.eventElement;
var eventCoordinates = ref$1.eventCoordinates;
var last = ref$1.last;
var limitValue = ref$1.limitValue;
var objectKey = ref$1.objectKey;
var rad = ref$1.rad;
var round = ref$1.round;
var unbindEvents = ref$1.unbindEvents;
var valueOrDefault = ref$1.valueOrDefault;

var FontLoader = function FontLoader () {};

FontLoader.fetchFonts = function fetchFonts (options, fonts, state) {
        if ( state === void 0 ) state = { depth: 0 };

    var MAX_DEPTH = 5;

    if (!options || state.depth > MAX_DEPTH || !document.fonts) {
        return;
    }

    Object.keys(options).forEach(function(key) {
        var value = options[key];
        if (key === "dataSource" || key[0] === "$" || !value) {
            return;
        }

        if (key === "font") {
            fonts.push(value);
        } else if (typeof value === "object") {
            state.depth++;
            FontLoader.fetchFonts(value, fonts, state);
            state.depth--;
        }
    });
};

FontLoader.loadFonts = function loadFonts (fonts, callback) {
    var promises = [];

    if (fonts.length > 0 && document.fonts) {
        try {
            promises = fonts.map(function(font) {
                return document.fonts.load(font);
            });
        } catch (e) {
            // Silence font-loading errors
            _progress_kendoDrawing.logToConsole(e);
        }

        Promise.all(promises).then(callback, callback);
    } else {
        callback();
    }
};

FontLoader.preloadFonts = function preloadFonts (options, callback) {
    var fonts = [];
    FontLoader.fetchFonts(options, fonts);

    FontLoader.loadFonts(fonts, callback);
};

function setDefaultOptions(type, options) {
    var proto = type.prototype;
    if (proto.options) {
        proto.options = deepExtend({}, proto.options, options);
    } else {
        proto.options = options;
    }
}

function sparseArrayLimits(arr) {
    var min = MAX_VALUE;
    var max = MIN_VALUE;

    for (var idx = 0, length = arr.length; idx < length; idx++) {
        var value = arr[idx];
        if (value !== null && isFinite(value)) {
            min = Math.min(min, value);
            max = Math.max(max, value);
        }
    }

    return {
        min: min === MAX_VALUE ? undefined : min,
        max: max === MIN_VALUE ? undefined : max
    };
}

var Point = (function (Class$$1) {
    function Point(x, y) {
        Class$$1.call(this);

        this.x = x || 0;
        this.y = y || 0;
    }

    if ( Class$$1 ) Point.__proto__ = Class$$1;
    Point.prototype = Object.create( Class$$1 && Class$$1.prototype );
    Point.prototype.constructor = Point;

    Point.prototype.clone = function clone () {
        return new Point(this.x, this.y);
    };

    Point.prototype.equals = function equals (point) {
        return point && this.x === point.x && this.y === point.y;
    };

    Point.prototype.rotate = function rotate (center, degrees) {
        var theta = rad(degrees);
        var cosT = Math.cos(theta);
        var sinT = Math.sin(theta);
        var cx = center.x;
        var cy = center.y;
        var ref = this;
        var x = ref.x;
        var y = ref.y;

        this.x = round(
            cx + (x - cx) * cosT + (y - cy) * sinT,
            COORD_PRECISION
        );

        this.y = round(
            cy + (y - cy) * cosT - (x - cx) * sinT,
            COORD_PRECISION
        );

        return this;
    };

    Point.prototype.multiply = function multiply (a) {

        this.x *= a;
        this.y *= a;

        return this;
    };

    Point.prototype.distanceTo = function distanceTo (point) {
        var dx = this.x - point.x;
        var dy = this.y - point.y;

        return Math.sqrt(dx * dx + dy * dy);
    };

    Point.onCircle = function onCircle (center, angle, radius) {
        var radians = rad(angle);

        return new Point(
            center.x - radius * Math.cos(radians),
            center.y - radius * Math.sin(radians)
        );
    };

    return Point;
}(_progress_kendoDrawing.Class));

var Box = (function (Class$$1) {
    function Box(x1, y1, x2, y2) {
        Class$$1.call(this);

        this.x1 = x1 || 0;
        this.y1 = y1 || 0;
        this.x2 = x2 || 0;
        this.y2 = y2 || 0;
    }

    if ( Class$$1 ) Box.__proto__ = Class$$1;
    Box.prototype = Object.create( Class$$1 && Class$$1.prototype );
    Box.prototype.constructor = Box;

    Box.prototype.width = function width () {
        return this.x2 - this.x1;
    };

    Box.prototype.height = function height () {
        return this.y2 - this.y1;
    };

    Box.prototype.translate = function translate (dx, dy) {
        this.x1 += dx;
        this.x2 += dx;
        this.y1 += dy;
        this.y2 += dy;

        return this;
    };

    Box.prototype.move = function move (x, y) {
        var height = this.height();
        var width = this.width();

        if (defined(x)) {
            this.x1 = x;
            this.x2 = this.x1 + width;
        }

        if (defined(y)) {
            this.y1 = y;
            this.y2 = this.y1 + height;
        }

        return this;
    };

    Box.prototype.wrap = function wrap (targetBox) {
        this.x1 = Math.min(this.x1, targetBox.x1);
        this.y1 = Math.min(this.y1, targetBox.y1);
        this.x2 = Math.max(this.x2, targetBox.x2);
        this.y2 = Math.max(this.y2, targetBox.y2);

        return this;
    };

    Box.prototype.wrapPoint = function wrapPoint (point) {
        var arrayPoint = isArray(point);
        var x = arrayPoint ? point[0] : point.x;
        var y = arrayPoint ? point[1] : point.y;
        this.wrap(new Box(x, y, x, y));

        return this;
    };

    Box.prototype.snapTo = function snapTo (targetBox, axis) {

        if (axis === X || !axis) {
            this.x1 = targetBox.x1;
            this.x2 = targetBox.x2;
        }

        if (axis === Y || !axis) {
            this.y1 = targetBox.y1;
            this.y2 = targetBox.y2;
        }

        return this;
    };

    Box.prototype.alignTo = function alignTo (targetBox, anchor) {
        var height = this.height();
        var width = this.width();
        var axis = anchor === TOP || anchor === BOTTOM ? Y : X;
        var offset = axis === Y ? height : width;

        if (anchor === CENTER) {
            var targetCenter = targetBox.center();
            var center = this.center();

            this.x1 += targetCenter.x - center.x;
            this.y1 += targetCenter.y - center.y;
        } else if (anchor === TOP || anchor === LEFT) {
            this[axis + 1] = targetBox[axis + 1] - offset;
        } else {
            this[axis + 1] = targetBox[axis + 2];
        }

        this.x2 = this.x1 + width;
        this.y2 = this.y1 + height;

        return this;
    };

    Box.prototype.shrink = function shrink (dw, dh) {

        this.x2 -= dw;
        this.y2 -= dh;

        return this;
    };

    Box.prototype.expand = function expand (dw, dh) {
        this.shrink(-dw, -dh);
        return this;
    };

    Box.prototype.pad = function pad (padding) {
        var spacing = getSpacing(padding);

        this.x1 -= spacing.left;
        this.x2 += spacing.right;
        this.y1 -= spacing.top;
        this.y2 += spacing.bottom;

        return this;
    };

    Box.prototype.unpad = function unpad (padding) {
        var spacing = getSpacing(padding);

        spacing.left = -spacing.left;
        spacing.top = -spacing.top;
        spacing.right = -spacing.right;
        spacing.bottom = -spacing.bottom;

        return this.pad(spacing);
    };

    Box.prototype.clone = function clone () {
        return new Box(this.x1, this.y1, this.x2, this.y2);
    };

    Box.prototype.center = function center () {
        return new Point(
            this.x1 + this.width() / 2,
            this.y1 + this.height() / 2
        );
    };

    Box.prototype.containsPoint = function containsPoint (point) {

        return point.x >= this.x1 && point.x <= this.x2 &&
               point.y >= this.y1 && point.y <= this.y2;
    };

    Box.prototype.points = function points () {
        return [
            new Point(this.x1, this.y1),
            new Point(this.x2, this.y1),
            new Point(this.x2, this.y2),
            new Point(this.x1, this.y2)
        ];
    };

    Box.prototype.getHash = function getHash () {
        return [ this.x1, this.y1, this.x2, this.y2 ].join(",");
    };

    Box.prototype.overlaps = function overlaps (box) {
        return !(box.y2 < this.y1 || this.y2 < box.y1 || box.x2 < this.x1 || this.x2 < box.x1);
    };

    Box.prototype.rotate = function rotate (rotation) {
        var width = this.width();
        var height = this.height();
        var ref = this.center();
        var cx = ref.x;
        var cy = ref.y;

        var r1 = rotatePoint(0, 0, cx, cy, rotation);
        var r2 = rotatePoint(width, 0, cx, cy, rotation);
        var r3 = rotatePoint(width, height, cx, cy, rotation);
        var r4 = rotatePoint(0, height, cx, cy, rotation);

        width = Math.max(r1.x, r2.x, r3.x, r4.x) - Math.min(r1.x, r2.x, r3.x, r4.x);
        height = Math.max(r1.y, r2.y, r3.y, r4.y) - Math.min(r1.y, r2.y, r3.y, r4.y);

        this.x2 = this.x1 + width;
        this.y2 = this.y1 + height;

        return this;
    };

    Box.prototype.toRect = function toRect () {
        return new _progress_kendoDrawing.geometry.Rect([ this.x1, this.y1 ], [ this.width(), this.height() ]);
    };

    Box.prototype.hasSize = function hasSize () {
        return this.width() !== 0 && this.height() !== 0;
    };

    Box.prototype.align = function align (targetBox, axis, alignment) {
        var c1 = axis + 1;
        var c2 = axis + 2;
        var sizeFunc = axis === X ? WIDTH : HEIGHT;
        var size = this[sizeFunc]();

        if (inArray(alignment, [ LEFT, TOP ])) {
            this[c1] = targetBox[c1];
            this[c2] = this[c1] + size;
        } else if (inArray(alignment, [ RIGHT, BOTTOM ])) {
            this[c2] = targetBox[c2];
            this[c1] = this[c2] - size;
        } else if (alignment === CENTER) {
            this[c1] = targetBox[c1] + (targetBox[sizeFunc]() - size) / 2;
            this[c2] = this[c1] + size;
        }
    };

    return Box;
}(_progress_kendoDrawing.Class));

function rotatePoint(x, y, cx, cy, angle) {
    var theta = rad(angle);

    return new Point(
        cx + (x - cx) * Math.cos(theta) + (y - cy) * Math.sin(theta),
        cy - (x - cx) * Math.sin(theta) + (y - cy) * Math.cos(theta)
    );
}

var Ring = (function (Class$$1) {
    function Ring(center, innerRadius, radius, startAngle, angle) {
        Class$$1.call(this);

        this.center = center;
        this.innerRadius = innerRadius;
        this.radius = radius;
        this.startAngle = startAngle;
        this.angle = angle;
    }

    if ( Class$$1 ) Ring.__proto__ = Class$$1;
    Ring.prototype = Object.create( Class$$1 && Class$$1.prototype );
    Ring.prototype.constructor = Ring;

    Ring.prototype.clone = function clone () {
        return new Ring(this.center, this.innerRadius, this.radius, this.startAngle, this.angle);
    };

    Ring.prototype.middle = function middle () {
        return this.startAngle + this.angle / 2;
    };

    Ring.prototype.setRadius = function setRadius (newRadius, innerRadius) {
        if (innerRadius) {
            this.innerRadius = newRadius;
        } else {
            this.radius = newRadius;
        }

        return this;
    };

    // TODO: Remove and replace with Point.onCircle
    Ring.prototype.point = function point (angle, innerRadius) {
        var radianAngle = rad(angle);
        var ax = Math.cos(radianAngle);
        var ay = Math.sin(radianAngle);
        var radius = innerRadius ? this.innerRadius : this.radius;
        var x = round(this.center.x - (ax * radius), COORD_PRECISION);
        var y = round(this.center.y - (ay * radius), COORD_PRECISION);

        return new Point(x, y);
    };

    Ring.prototype.adjacentBox = function adjacentBox (distance, width, height) {
        var sector = this.clone().expand(distance);
        var midAndle = sector.middle();
        var midPoint = sector.point(midAndle);
        var hw = width / 2;
        var hh = height / 2;
        var sa = Math.sin(rad(midAndle));
        var ca = Math.cos(rad(midAndle));
        var x = midPoint.x - hw;
        var y = midPoint.y - hh;

        if (Math.abs(sa) < 0.9) {
            x += hw * -ca / Math.abs(ca);
        }

        if (Math.abs(ca) < 0.9) {
            y += hh * -sa / Math.abs(sa);
        }

        return new Box(x, y, x + width, y + height);
    };

    Ring.prototype.containsPoint = function containsPoint (p) {
        var center = this.center;
        var innerRadius = this.innerRadius;
        var radius = this.radius;
        var startAngle = this.startAngle;
        var endAngle = this.startAngle + this.angle;
        var dx = p.x - center.x;
        var dy = p.y - center.y;
        var vector = new Point(dx, dy);
        var startPoint = this.point(startAngle);
        var startVector = new Point(startPoint.x - center.x, startPoint.y - center.y);
        var endPoint = this.point(endAngle);
        var endVector = new Point(endPoint.x - center.x, endPoint.y - center.y);
        var dist = round(dx * dx + dy * dy, COORD_PRECISION);

        return (startVector.equals(vector) || clockwise(startVector, vector)) &&
               !clockwise(endVector, vector) &&
               dist >= innerRadius * innerRadius && dist <= radius * radius;
    };

    Ring.prototype.getBBox = function getBBox () {
        var this$1 = this;

        var box = new Box(MAX_VALUE, MAX_VALUE, MIN_VALUE, MIN_VALUE);
        var startAngle = round(this.startAngle % 360);
        var endAngle = round((startAngle + this.angle) % 360);
        var innerRadius = this.innerRadius;
        var allAngles = [ 0, 90, 180, 270, startAngle, endAngle ].sort(numericComparer);
        var startAngleIndex = allAngles.indexOf(startAngle);
        var endAngleIndex = allAngles.indexOf(endAngle);
        var angles;

        if (startAngle === endAngle) {
            angles = allAngles;
        } else {
            if (startAngleIndex < endAngleIndex) {
                angles = allAngles.slice(startAngleIndex, endAngleIndex + 1);
            } else {
                angles = [].concat(
                    allAngles.slice(0, endAngleIndex + 1),
                    allAngles.slice(startAngleIndex, allAngles.length)
                );
            }
        }

        for (var i = 0; i < angles.length; i++) {
            var point = this$1.point(angles[i]);
            box.wrapPoint(point);
            box.wrapPoint(point, innerRadius);
        }

        if (!innerRadius) {
            box.wrapPoint(this.center);
        }

        return box;
    };

    Ring.prototype.expand = function expand (value) {
        this.radius += value;
        return this;
    };

    return Ring;
}(_progress_kendoDrawing.Class));

function numericComparer(a, b) {
    return a - b;
}

var Sector = (function (Ring$$1) {
    function Sector(center, radius, startAngle, angle) {
        Ring$$1.call(this, center, 0, radius, startAngle, angle);
    }

    if ( Ring$$1 ) Sector.__proto__ = Ring$$1;
    Sector.prototype = Object.create( Ring$$1 && Ring$$1.prototype );
    Sector.prototype.constructor = Sector;

    Sector.prototype.expand = function expand (value) {
        return Ring$$1.prototype.expand.call(this, value);
    };

    Sector.prototype.clone = function clone () {
        return new Sector(this.center, this.radius, this.startAngle, this.angle);
    };

    Sector.prototype.setRadius = function setRadius (newRadius) {
        this.radius = newRadius;

        return this;
    };

    return Sector;
}(Ring));

var ShapeBuilder = (function (Class$$1) {
    function ShapeBuilder () {
        Class$$1.apply(this, arguments);
    }

    if ( Class$$1 ) ShapeBuilder.__proto__ = Class$$1;
    ShapeBuilder.prototype = Object.create( Class$$1 && Class$$1.prototype );
    ShapeBuilder.prototype.constructor = ShapeBuilder;

    ShapeBuilder.prototype.createRing = function createRing (sector, options) {
        var startAngle = sector.startAngle + 180;
        var endAngle = sector.angle + startAngle;
        var center = new _progress_kendoDrawing.geometry.Point(sector.center.x, sector.center.y);
        var radius = Math.max(sector.radius, 0);
        var innerRadius = Math.max(sector.innerRadius, 0);
        var arc = new _progress_kendoDrawing.geometry.Arc(center, {
            startAngle: startAngle,
            endAngle: endAngle,
            radiusX: radius,
            radiusY: radius
        });
        var path = _progress_kendoDrawing.drawing.Path.fromArc(arc, options).close();

        if (innerRadius) {
            arc.radiusX = arc.radiusY = innerRadius;
            var innerEnd = arc.pointAt(endAngle);
            path.lineTo(innerEnd.x, innerEnd.y);
            path.arc(endAngle, startAngle, innerRadius, innerRadius, true);
        } else {
            path.lineTo(center.x, center.y);
        }

        return path;
    };

    return ShapeBuilder;
}(_progress_kendoDrawing.Class));

ShapeBuilder.current = new ShapeBuilder();

var ChartElement = (function (Class$$1) {
    function ChartElement(options) {
        Class$$1.call(this);

        this.children = [];

        this.options = deepExtend({}, this.options, options);
    }

    if ( Class$$1 ) ChartElement.__proto__ = Class$$1;
    ChartElement.prototype = Object.create( Class$$1 && Class$$1.prototype );
    ChartElement.prototype.constructor = ChartElement;

    ChartElement.prototype.reflow = function reflow (targetBox) {
        var children = this.children;
        var box;

        for (var i = 0; i < children.length; i++) {
            var currentChild = children[i];
            currentChild.reflow(targetBox);

            box = box ? box.wrap(currentChild.box) : currentChild.box.clone();
        }

        this.box = box || targetBox;
    };

    ChartElement.prototype.destroy = function destroy () {
        var children = this.children;

        if (this.animation) {
            this.animation.destroy();
        }

        for (var i = 0; i < children.length; i++) {
            children[i].destroy();
        }
    };

    ChartElement.prototype.getRoot = function getRoot () {
        var parent = this.parent;

        return parent ? parent.getRoot() : null;
    };

    ChartElement.prototype.getSender = function getSender () {
        var service = this.getService();
        if (service) {
            return service.sender;
        }
    };

    ChartElement.prototype.getService = function getService () {
        var element = this;
        while (element) {
            if (element.chartService) {
                return element.chartService;
            }
            element = element.parent;
        }
    };

    ChartElement.prototype.translateChildren = function translateChildren (dx, dy) {
        var children = this.children;
        var childrenCount = children.length;

        for (var i = 0; i < childrenCount; i++) {
            children[i].box.translate(dx, dy);
        }
    };

    ChartElement.prototype.append = function append () {
        var arguments$1 = arguments;
        var this$1 = this;

        for (var i = 0; i < arguments.length; i++) {
            var item = arguments$1[i];
            this$1.children.push(item);
            item.parent = this$1;
        }
    };

    ChartElement.prototype.renderVisual = function renderVisual () {
        if (this.options.visible === false) {
            return;
        }

        this.createVisual();

        this.addVisual();

        this.renderChildren();

        this.createAnimation();
        this.renderComplete();
    };

    ChartElement.prototype.addVisual = function addVisual () {
        if (this.visual) {
            this.visual.chartElement = this;

            if (this.parent) {
                this.parent.appendVisual(this.visual);
            }
        }
    };

    ChartElement.prototype.renderChildren = function renderChildren () {
        var children = this.children;
        var length = children.length;
        for (var i = 0; i < length; i++) {
            children[i].renderVisual();
        }
    };

    ChartElement.prototype.createVisual = function createVisual () {
        this.visual = new _progress_kendoDrawing.drawing.Group({
            zIndex: this.options.zIndex,
            visible: valueOrDefault(this.options.visible, true)
        });
    };

    ChartElement.prototype.createAnimation = function createAnimation () {
        if (this.visual) {
            this.animation = _progress_kendoDrawing.drawing.Animation.create(
                this.visual, this.options.animation
            );
        }
    };

    ChartElement.prototype.appendVisual = function appendVisual (childVisual) {
        if (!childVisual.chartElement) {
            childVisual.chartElement = this;
        }

        if (childVisual.options.noclip) {
            this.clipRoot().visual.append(childVisual);
        } else if (defined(childVisual.options.zIndex)) {
            this.stackRoot().stackVisual(childVisual);
        } else if (this.isStackRoot) {
            this.stackVisual(childVisual);
        } else if (this.visual) {
            this.visual.append(childVisual);
        } else {
            // Allow chart elements without visuals to
            // pass through child visuals
            this.parent.appendVisual(childVisual);
        }
    };

    ChartElement.prototype.clipRoot = function clipRoot () {
        if (this.parent) {
            return this.parent.clipRoot();
        }

        return this;
    };

    ChartElement.prototype.stackRoot = function stackRoot () {
        if (this.parent) {
            return this.parent.stackRoot();
        }

        return this;
    };

    ChartElement.prototype.stackVisual = function stackVisual (childVisual) {
        var zIndex = childVisual.options.zIndex || 0;
        var visuals = this.visual.children;
        var length = visuals.length;
        var pos;

        for (pos = 0; pos < length; pos++) {
            var sibling = visuals[pos];
            var here = valueOrDefault(sibling.options.zIndex, 0);
            if (here > zIndex) {
                break;
            }
        }

        this.visual.insert(pos, childVisual);
    };

    ChartElement.prototype.traverse = function traverse (callback) {
        var children = this.children;
        var length = children.length;

        for (var i = 0; i < length; i++) {
            var child = children[i];

            callback(child);
            if (child.traverse) {
                child.traverse(callback);
            }
        }
    };

    ChartElement.prototype.closest = function closest (match) {
        var element = this;
        var matched = false;

        while (element && !matched) {
            matched = match(element);

            if (!matched) {
                element = element.parent;
            }
        }

        if (matched) {
            return element;
        }
    };

    ChartElement.prototype.renderComplete = function renderComplete () {};

    ChartElement.prototype.hasHighlight = function hasHighlight () {
        var options = (this.options || {}).highlight;
        return !(!this.createHighlight || (options && options.visible === false));
    };

    ChartElement.prototype.toggleHighlight = function toggleHighlight (show) {
        var this$1 = this;

        var options = (this.options || {}).highlight;
        var customVisual = (options || {}).visual;
        var highlight = this._highlight;

        if (!highlight) {
            var highlightOptions = {
                fill: {
                    color: WHITE,
                    opacity: 0.2
                },
                stroke: {
                    color: WHITE,
                    width: 1,
                    opacity: 0.2
                }
            };

            if (customVisual) {
                highlight = this._highlight = customVisual(
                    Object.assign(this.highlightVisualArgs(), {
                        createVisual: function () { return this$1.createHighlight(highlightOptions); },
                        sender: this.getSender(),
                        series: this.series,
                        dataItem: this.dataItem,
                        category: this.category,
                        value: this.value,
                        percentage: this.percentage,
                        runningTotal: this.runningTotal,
                        total: this.total
                    }
                ));

                if (!highlight) {
                    return;
                }
            } else {
                highlight = this._highlight = this.createHighlight(highlightOptions);
            }

            highlight.options.zIndex = this.options.zIndex;
            this.appendVisual(highlight);
        }

        highlight.visible(show);
    };

    ChartElement.prototype.createGradientOverlay = function createGradientOverlay (element, options, gradientOptions) {
        var overlay = new _progress_kendoDrawing.drawing.Path(Object.assign({
            stroke: {
                color: "none"
            },
            fill: this.createGradient(gradientOptions),
            closed: element.options.closed
        }, options));

        overlay.segments.elements(element.segments.elements());

        return overlay;
    };

    ChartElement.prototype.createGradient = function createGradient (options) {
        if (this.parent) {
            return this.parent.createGradient(options);
        }
    };

    return ChartElement;
}(_progress_kendoDrawing.Class));

ChartElement.prototype.options = { };

var BoxElement = (function (ChartElement$$1) {
    function BoxElement(options) {
        ChartElement$$1.call(this, options);

        this.options.margin = getSpacing(this.options.margin);
        this.options.padding = getSpacing(this.options.padding);
    }

    if ( ChartElement$$1 ) BoxElement.__proto__ = ChartElement$$1;
    BoxElement.prototype = Object.create( ChartElement$$1 && ChartElement$$1.prototype );
    BoxElement.prototype.constructor = BoxElement;

    BoxElement.prototype.reflow = function reflow (targetBox) {
        var this$1 = this;

        var options = this.options;
        var width = options.width;
        var height = options.height;
        var shrinkToFit = options.shrinkToFit;
        var hasSetSize = width && height;
        var margin = options.margin;
        var padding = options.padding;
        var borderWidth = options.border.width;
        var box;

        var reflowPaddingBox = function () {
            this$1.align(targetBox, X, options.align);
            this$1.align(targetBox, Y, options.vAlign);
            this$1.paddingBox = box.clone().unpad(margin).unpad(borderWidth);
        };

        var contentBox = targetBox.clone();
        if (hasSetSize) {
            contentBox.x2 = contentBox.x1 + width;
            contentBox.y2 = contentBox.y1 + height;
        }

        if (shrinkToFit) {
            contentBox.unpad(margin).unpad(borderWidth).unpad(padding);
        }

        ChartElement$$1.prototype.reflow.call(this, contentBox);

        if (hasSetSize) {
            box = this.box = new Box(0, 0, width, height);
        } else {
            box = this.box;
        }

        if (shrinkToFit && hasSetSize) {
            reflowPaddingBox();
            contentBox = this.contentBox = this.paddingBox.clone().unpad(padding);
        } else {
            contentBox = this.contentBox = box.clone();
            box.pad(padding).pad(borderWidth).pad(margin);
            reflowPaddingBox();
        }

        this.translateChildren(
            box.x1 - contentBox.x1 + margin.left + borderWidth + padding.left,
            box.y1 - contentBox.y1 + margin.top + borderWidth + padding.top
        );

        var children = this.children;
        for (var i = 0; i < children.length; i++) {
            var item = children[i];
            item.reflow(item.box);
        }
    };

    BoxElement.prototype.align = function align (targetBox, axis, alignment) {
        this.box.align(targetBox, axis, alignment);
    };

    BoxElement.prototype.hasBox = function hasBox () {
        var options = this.options;
        return options.border.width || options.background;
    };

    BoxElement.prototype.createVisual = function createVisual () {
        ChartElement$$1.prototype.createVisual.call(this);

        var options = this.options;
        if (options.visible && this.hasBox()) {
            this.visual.append(_progress_kendoDrawing.drawing.Path.fromRect(
                this.paddingBox.toRect(),
                this.visualStyle()
            ));
        }
    };

    BoxElement.prototype.visualStyle = function visualStyle () {
        var options = this.options;
        var border = options.border || {};

        return {
            stroke: {
                width: border.width,
                color: border.color,
                opacity: valueOrDefault(border.opacity, options.opacity),
                dashType: border.dashType
            },
            fill: {
                color: options.background,
                opacity: options.opacity
            },
            cursor: options.cursor
        };
    };

    return BoxElement;
}(ChartElement));

setDefaultOptions(BoxElement, {
    align: LEFT,
    vAlign: TOP,
    margin: {},
    padding: {},
    border: {
        color: BLACK,
        width: 0
    },
    background: "",
    shrinkToFit: false,
    width: 0,
    height: 0,
    visible: true
});

var ShapeElement = (function (BoxElement$$1) {
    function ShapeElement(options, pointData) {
        BoxElement$$1.call(this, options);

        this.pointData = pointData;
    }

    if ( BoxElement$$1 ) ShapeElement.__proto__ = BoxElement$$1;
    ShapeElement.prototype = Object.create( BoxElement$$1 && BoxElement$$1.prototype );
    ShapeElement.prototype.constructor = ShapeElement;

    ShapeElement.prototype.getElement = function getElement () {
        var ref = this;
        var options = ref.options;
        var box = ref.paddingBox;
        var type = options.type;
        var rotation = options.rotation;
        var center = box.center();
        var halfWidth = box.width() / 2;

        if (!options.visible || !this.hasBox()) {
            return null;
        }

        var style = this.visualStyle();
        var element;

        if (type === CIRCLE) {
            element = new _progress_kendoDrawing.drawing.Circle(
                new _progress_kendoDrawing.geometry.Circle([
                    round(box.x1 + halfWidth, COORD_PRECISION),
                    round(box.y1 + box.height() / 2, COORD_PRECISION)
                ], halfWidth),
                style
            );
        } else if (type === TRIANGLE) {
            element = _progress_kendoDrawing.drawing.Path.fromPoints([
                [ box.x1 + halfWidth, box.y1 ],
                [ box.x1, box.y2 ],
                [ box.x2, box.y2 ]
            ], style).close();
        } else if (type === CROSS) {
            element = new _progress_kendoDrawing.drawing.MultiPath(style);

            element.moveTo(box.x1, box.y1).lineTo(box.x2, box.y2);
            element.moveTo(box.x1, box.y2).lineTo(box.x2, box.y1);
        } else {
            element = _progress_kendoDrawing.drawing.Path.fromRect(box.toRect(), style);
        }

        if (rotation) {
            element.transform(_progress_kendoDrawing.geometry.transform()
                .rotate(-rotation, [ center.x, center.y ])
            );
        }

        element.options.zIndex = options.zIndex;
        return element;
    };

    ShapeElement.prototype.createElement = function createElement () {
        var this$1 = this;

        var customVisual = this.options.visual;
        var pointData = this.pointData || {};
        var visual;

        if (customVisual) {
            visual = customVisual({
                value: pointData.value,
                dataItem: pointData.dataItem,
                sender: this.getSender(),
                series: pointData.series,
                category: pointData.category,
                rect: this.paddingBox.toRect(),
                options: this.visualOptions(),
                createVisual: function () { return this$1.getElement(); }
            });
        } else {
            visual = this.getElement();
        }

        return visual;
    };

    ShapeElement.prototype.visualOptions = function visualOptions () {
        var options = this.options;
        return {
            background: options.background,
            border: options.border,
            margin: options.margin,
            padding: options.padding,
            type: options.type,
            size: options.width,
            visible: options.visible
        };
    };

    ShapeElement.prototype.createVisual = function createVisual () {
        this.visual = this.createElement();
    };

    return ShapeElement;
}(BoxElement));

setDefaultOptions(ShapeElement, {
    type: CIRCLE,
    align: CENTER,
    vAlign: CENTER
});

var LINEAR = "linear";
var RADIAL = "radial";

var GRADIENTS = {
    glass: {
        type: LINEAR,
        rotation: 0,
        stops: [ {
            offset: 0,
            color: WHITE,
            opacity: 0
        }, {
            offset: 0.25,
            color: WHITE,
            opacity: 0.3
        }, {
            offset: 1,
            color: WHITE,
            opacity: 0
        } ]
    },
    sharpBevel: {
        type: RADIAL,
        stops: [ {
            offset: 0,
            color: WHITE,
            opacity: 0.55
        }, {
            offset: 0.65,
            color: WHITE,
            opacity: 0
        }, {
            offset: 0.95,
            color: WHITE,
            opacity: 0.25
        } ]
    },
    roundedBevel: {
        type: RADIAL,
        stops: [ {
            offset: 0.33,
            color: WHITE,
            opacity: 0.06
        }, {
            offset: 0.83,
            color: WHITE,
            opacity: 0.2
        }, {
            offset: 0.95,
            color: WHITE,
            opacity: 0
        } ]
    },
    roundedGlass: {
        type: RADIAL,
        supportVML: false,
        stops: [ {
            offset: 0,
            color: WHITE,
            opacity: 0
        }, {
            offset: 0.5,
            color: WHITE,
            opacity: 0.3
        }, {
            offset: 0.99,
            color: WHITE,
            opacity: 0
        } ]
    },
    sharpGlass: {
        type: RADIAL,
        supportVML: false,
        stops: [ {
            offset: 0,
            color: WHITE,
            opacity: 0.2
        }, {
            offset: 0.15,
            color: WHITE,
            opacity: 0.15
        }, {
            offset: 0.17,
            color: WHITE,
            opacity: 0.35
        }, {
            offset: 0.85,
            color: WHITE,
            opacity: 0.05
        }, {
            offset: 0.87,
            color: WHITE,
            opacity: 0.15
        }, {
            offset: 0.99,
            color: WHITE,
            opacity: 0
        } ]
    },
    bubbleShadow: {
        type: RADIAL,
        center: [ 0.5, 0.5 ],
        radius: 0.5
    }
};

function boxDiff(r, s) {
    if (r.x1 === s.x1 && r.y1 === s.y1 && r.x2 === s.x2 && r.y2 === s.y2) {
        return s;
    }

    var a = Math.min(r.x1, s.x1);
    var b = Math.max(r.x1, s.x1);
    var c = Math.min(r.x2, s.x2);
    var d = Math.max(r.x2, s.x2);
    var e = Math.min(r.y1, s.y1);
    var f = Math.max(r.y1, s.y1);
    var g = Math.min(r.y2, s.y2);
    var h = Math.max(r.y2, s.y2);
    var boxes = [];

    // X = intersection, 0-7 = possible difference areas
    // h +-+-+-+
    // . |5|6|7|
    // g +-+-+-+
    // . |3|X|4|
    // f +-+-+-+
    // . |0|1|2|
    // e +-+-+-+
    // . a b c d

    // we'll always have rectangles 1, 3, 4 and 6
    boxes[0] = new Box(b, e, c, f);
    boxes[1] = new Box(a, f, b, g);
    boxes[2] = new Box(c, f, d, g);
    boxes[3] = new Box(b, g, c, h);

    // decide which corners
    if (r.x1 === a && r.y1 === e || s.x1 === a && s.y1 === e) { // corners 0 and 7
        boxes[4] = new Box(a, e, b, f);
        boxes[5] = new Box(c, g, d, h);
    } else { // corners 2 and 5
        boxes[4] = new Box(c, e, d, f);
        boxes[5] = new Box(a, g, b, h);
    }

    return grep(boxes, function(box) {
        return box.height() > 0 && box.width() > 0;
    })[0];
}

var RootElement = (function (ChartElement$$1) {
    function RootElement(options) {
        ChartElement$$1.call(this, options);

        var rootOptions = this.options;
        rootOptions.width = parseInt(rootOptions.width, 10);
        rootOptions.height = parseInt(rootOptions.height, 10);

        this.gradients = {};
    }

    if ( ChartElement$$1 ) RootElement.__proto__ = ChartElement$$1;
    RootElement.prototype = Object.create( ChartElement$$1 && ChartElement$$1.prototype );
    RootElement.prototype.constructor = RootElement;

    RootElement.prototype.reflow = function reflow () {
        var ref = this;
        var options = ref.options;
        var children = ref.children;
        var currentBox = new Box(0, 0, options.width, options.height);

        this.box = currentBox.unpad(options.margin);

        for (var i = 0; i < children.length; i++) {
            children[i].reflow(currentBox);
            currentBox = boxDiff(currentBox, children[i].box) || new Box();
        }
    };

    RootElement.prototype.createVisual = function createVisual () {
        this.visual = new _progress_kendoDrawing.drawing.Group();
        this.createBackground();
    };

    RootElement.prototype.createBackground = function createBackground () {
        var options = this.options;
        var border = options.border || {};
        var box = this.box.clone().pad(options.margin).unpad(border.width);

        var background = _progress_kendoDrawing.drawing.Path.fromRect(box.toRect(), {
            stroke: {
                color: border.width ? border.color : "",
                width: border.width,
                dashType: border.dashType
            },
            fill: {
                color: options.background,
                opacity: options.opacity
            },
            zIndex: -10
        });

        this.visual.append(background);
    };

    RootElement.prototype.getRoot = function getRoot () {
        return this;
    };

    RootElement.prototype.createGradient = function createGradient (options) {
        var gradients = this.gradients;
        var hashCode = objectKey(options);
        var gradient = GRADIENTS[options.gradient];
        var drawingGradient;

        if (gradients[hashCode]) {
            drawingGradient = gradients[hashCode];
        } else {
            var gradientOptions = Object.assign({}, gradient, options);
            if (gradient.type === "linear") {
                drawingGradient = new _progress_kendoDrawing.drawing.LinearGradient(gradientOptions);
            } else {
                if (options.innerRadius) {
                    gradientOptions.stops = innerRadialStops(gradientOptions);
                }
                drawingGradient = new _progress_kendoDrawing.drawing.RadialGradient(gradientOptions);
                drawingGradient.supportVML = gradient.supportVML !== false;
            }
            gradients[hashCode] = drawingGradient;
        }

        return drawingGradient;
    };

    return RootElement;
}(ChartElement));

setDefaultOptions(RootElement, {
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    background: WHITE,
    border: {
        color: BLACK,
        width: 0
    },
    margin: getSpacing(5),
    zIndex: -2
});

function innerRadialStops(options) {
    var stops = options.stops;
    var usedSpace = ((options.innerRadius / options.radius) * 100);
    var length = stops.length;
    var currentStops = [];

    for (var i = 0; i < length; i++) {
        var currentStop = Object.assign({}, stops[i]);
        currentStop.offset = (currentStop.offset * (100 - usedSpace) + usedSpace) / 100;
        currentStops.push(currentStop);
    }

    return currentStops;
}

var FloatElement = (function (ChartElement$$1) {
    function FloatElement(options) {
        ChartElement$$1.call(this, options);
        this._initDirection();
    }

    if ( ChartElement$$1 ) FloatElement.__proto__ = ChartElement$$1;
    FloatElement.prototype = Object.create( ChartElement$$1 && ChartElement$$1.prototype );
    FloatElement.prototype.constructor = FloatElement;

    FloatElement.prototype._initDirection = function _initDirection () {
        var options = this.options;
        if (options.vertical) {
            this.groupAxis = X;
            this.elementAxis = Y;
            this.groupSizeField = WIDTH;
            this.elementSizeField = HEIGHT;
            this.groupSpacing = options.spacing;
            this.elementSpacing = options.vSpacing;
        } else {
            this.groupAxis = Y;
            this.elementAxis = X;
            this.groupSizeField = HEIGHT;
            this.elementSizeField = WIDTH;
            this.groupSpacing = options.vSpacing;
            this.elementSpacing = options.spacing;
        }
    };

    FloatElement.prototype.reflow = function reflow (targetBox) {
        this.box = targetBox.clone();
        this.reflowChildren();
    };

    FloatElement.prototype.reflowChildren = function reflowChildren () {
        var this$1 = this;

        var ref = this;
        var box = ref.box;
        var elementAxis = ref.elementAxis;
        var groupAxis = ref.groupAxis;
        var elementSizeField = ref.elementSizeField;
        var groupSizeField = ref.groupSizeField;
        var ref$1 = this.groupOptions();
        var groups = ref$1.groups;
        var groupsSize = ref$1.groupsSize;
        var maxGroupElementsSize = ref$1.maxGroupElementsSize;
        var groupsCount = groups.length;
        var groupsStart = box[groupAxis + 1] + this.alignStart(groupsSize, box[groupSizeField]());

        if (groupsCount) {
            var groupStart = groupsStart;

            for (var groupIdx = 0; groupIdx < groupsCount; groupIdx++) {
                var group = groups[groupIdx];
                var groupElements = group.groupElements;
                var elementStart = box[elementAxis + 1];
                var groupElementsCount = groupElements.length;

                for (var idx = 0; idx < groupElementsCount; idx++) {
                    var element = groupElements[idx];
                    var elementSize$$1 = this$1.elementSize(element);
                    var groupElementStart = groupStart + this$1.alignStart(elementSize$$1[groupSizeField], group.groupSize);

                    var elementBox = new Box();
                    elementBox[groupAxis + 1] = groupElementStart;
                    elementBox[groupAxis + 2] = groupElementStart + elementSize$$1[groupSizeField];
                    elementBox[elementAxis + 1] = elementStart;
                    elementBox[elementAxis + 2] = elementStart + elementSize$$1[elementSizeField];

                    element.reflow(elementBox);

                    elementStart += elementSize$$1[elementSizeField] + this$1.elementSpacing;
                }
                groupStart += group.groupSize + this$1.groupSpacing;
            }
            box[groupAxis + 1] = groupsStart;
            box[groupAxis + 2] = groupsStart + groupsSize;
            box[elementAxis + 2] = box[elementAxis + 1] + maxGroupElementsSize;
        }
    };

    FloatElement.prototype.alignStart = function alignStart (size, maxSize) {
        var start = 0;
        var align = this.options.align;
        if (align === RIGHT || align === BOTTOM) {
            start = maxSize - size;
        } else if (align === CENTER) {
            start = (maxSize - size) / 2;
        }
        return start;
    };

    FloatElement.prototype.groupOptions = function groupOptions () {
        var this$1 = this;

        var ref = this;
        var box = ref.box;
        var children = ref.children;
        var elementSizeField = ref.elementSizeField;
        var groupSizeField = ref.groupSizeField;
        var elementSpacing = ref.elementSpacing;
        var groupSpacing = ref.groupSpacing;
        var maxSize = round(box[elementSizeField]());
        var childrenCount = children.length;
        var groups = [];

        var groupSize = 0;
        var groupElementsSize = 0;
        var groupsSize = 0;
        var maxGroupElementsSize = 0;
        var groupElements = [];

        for (var idx = 0; idx < childrenCount; idx++) {
            var element = children[idx];
            if (!element.box) {
                element.reflow(box);
            }

            var elementSize$$1 = this$1.elementSize(element);
            if (this$1.options.wrap && round(groupElementsSize + elementSpacing + elementSize$$1[elementSizeField]) > maxSize) {
                groups.push({
                    groupElements: groupElements,
                    groupSize: groupSize,
                    groupElementsSize: groupElementsSize
                });
                maxGroupElementsSize = Math.max(maxGroupElementsSize, groupElementsSize);
                groupsSize += groupSpacing + groupSize;
                groupSize = 0;
                groupElementsSize = 0;
                groupElements = [];
            }
            groupSize = Math.max(groupSize, elementSize$$1[groupSizeField]);
            if (groupElementsSize > 0) {
                groupElementsSize += elementSpacing;
            }
            groupElementsSize += elementSize$$1[elementSizeField];
            groupElements.push(element);
        }

        groups.push({
            groupElements: groupElements,
            groupSize: groupSize,
            groupElementsSize: groupElementsSize
        });
        maxGroupElementsSize = Math.max(maxGroupElementsSize, groupElementsSize);
        groupsSize += groupSize;

        return {
            groups: groups,
            groupsSize: groupsSize,
            maxGroupElementsSize: maxGroupElementsSize
        };
    };

    FloatElement.prototype.elementSize = function elementSize (element) {
        return {
            width: element.box.width(),
            height: element.box.height()
        };
    };

    FloatElement.prototype.createVisual = function createVisual () {};

    return FloatElement;
}(ChartElement));

setDefaultOptions(FloatElement, {
    vertical: true,
    wrap: true,
    vSpacing: 0,
    spacing: 0
});

var DrawingText = _progress_kendoDrawing.drawing.Text;

var Text = (function (ChartElement$$1) {
    function Text(content, options) {
        ChartElement$$1.call(this, options);

        this.content = content;

        // Calculate size
        this.reflow(new Box());
    }

    if ( ChartElement$$1 ) Text.__proto__ = ChartElement$$1;
    Text.prototype = Object.create( ChartElement$$1 && ChartElement$$1.prototype );
    Text.prototype.constructor = Text;

    Text.prototype.reflow = function reflow (targetBox) {
        var options = this.options;
        var size = options.size = _progress_kendoDrawing.drawing.util.measureText(this.content, { font: options.font });

        this.baseline = size.baseline;

        this.box = new Box(targetBox.x1, targetBox.y1,
                targetBox.x1 + size.width, targetBox.y1 + size.height);
    };

    Text.prototype.createVisual = function createVisual () {
        var ref = this.options;
        var font = ref.font;
        var color = ref.color;
        var opacity = ref.opacity;
        var cursor = ref.cursor;

        this.visual = new DrawingText(this.content, this.box.toRect().topLeft(), {
            font: font,
            fill: { color: color, opacity: opacity },
            cursor: cursor
        });
    };

    return Text;
}(ChartElement));

setDefaultOptions(Text, {
    font: DEFAULT_FONT,
    color: BLACK
});

function rectToBox(rect) {
    var origin = rect.origin;
    var bottomRight = rect.bottomRight();

    return new Box(origin.x, origin.y, bottomRight.x, bottomRight.y);
}

var ROWS_SPLIT_REGEX = /\n|\\n/m;

var TextBox = (function (BoxElement$$1) {
    function TextBox(content, options) {
        BoxElement$$1.call(this, options);
        this.content = content;

        this._initContainer();
        if (this.options._autoReflow !== false) {
            this.reflow(new Box());
        }
    }

    if ( BoxElement$$1 ) TextBox.__proto__ = BoxElement$$1;
    TextBox.prototype = Object.create( BoxElement$$1 && BoxElement$$1.prototype );
    TextBox.prototype.constructor = TextBox;

    TextBox.prototype._initContainer = function _initContainer () {
        var options = this.options;
        var rows = String(this.content).split(ROWS_SPLIT_REGEX);
        var floatElement = new FloatElement({ vertical: true, align: options.align, wrap: false });
        var textOptions = deepExtend({ }, options, { opacity: 1, animation: null });

        this.container = floatElement;
        this.append(floatElement);

        for (var rowIdx = 0; rowIdx < rows.length; rowIdx++) {
            var text = new Text(rows[rowIdx].trim(), textOptions);
            floatElement.append(text);
        }
    };

    TextBox.prototype.reflow = function reflow (targetBox) {
        var options = this.options;
        var visualFn = options.visual;
        this.container.options.align = options.align;

        if (visualFn && !this._boxReflow) {
            var visualBox = targetBox;
            if (!visualBox.hasSize()) {
                this._boxReflow = true;
                this.reflow(visualBox);
                this._boxReflow = false;
                visualBox = this.box;
            }
            var visual = this.visual = visualFn(this.visualContext(visualBox));

            if (visual) {
                visualBox = rectToBox(visual.clippedBBox() || new _progress_kendoDrawing.geometry.Rect());

                visual.options.zIndex = options.zIndex;
                visual.options.noclip = options.noclip;
            }

            this.box = this.contentBox = this.paddingBox = visualBox;
        } else {
            BoxElement$$1.prototype.reflow.call(this, targetBox);

            if (options.rotation) {
                var margin = getSpacing(options.margin);
                var box = this.box.unpad(margin);

                this.targetBox = targetBox;
                this.normalBox = box.clone();

                box = this.rotate();
                box.translate(margin.left - margin.right, margin.top - margin.bottom);

                this.rotatedBox = box.clone();

                box.pad(margin);
            }
        }
    };

    TextBox.prototype.createVisual = function createVisual () {
        var options = this.options;

        if (!options.visible) {
            return;
        }

        this.visual = new _progress_kendoDrawing.drawing.Group({
            transform: this.rotationTransform(),
            zIndex: options.zIndex,
            noclip: options.noclip
        });

        if (this.hasBox()) {
            var box = _progress_kendoDrawing.drawing.Path.fromRect(this.paddingBox.toRect(), this.visualStyle());
            this.visual.append(box);
        }
    };

    TextBox.prototype.renderVisual = function renderVisual () {
        if (this.options.visual) {
            this.addVisual();
            this.createAnimation();
        } else {
            BoxElement$$1.prototype.renderVisual.call(this);
        }
    };

    TextBox.prototype.visualOptions = function visualOptions () {
        var options = this.options;
        return {
            background: options.background,
            border: options.border,
            color: options.color,
            font: options.font,
            margin: options.margin,
            padding: options.padding,
            visible: options.visible
        };
    };

    TextBox.prototype.visualContext = function visualContext (targetBox) {
        var this$1 = this;


        return {
            text: this.content,
            rect: targetBox.toRect(),
            sender: this.getSender(),
            options: this.visualOptions(),
            createVisual: function () {
                this$1._boxReflow = true;
                this$1.reflow(targetBox);
                this$1._boxReflow = false;
                return this$1.getDefaultVisual();
            }
        };
    };

    TextBox.prototype.getDefaultVisual = function getDefaultVisual () {
        this.createVisual();
        this.renderChildren();
        var visual = this.visual;
        delete this.visual;
        return visual;
    };

    TextBox.prototype.rotate = function rotate () {
        var options = this.options;
        this.box.rotate(options.rotation);
        this.align(this.targetBox, X, options.align);
        this.align(this.targetBox, Y, options.vAlign);
        return this.box;
    };

    TextBox.prototype.rotationTransform = function rotationTransform () {
        var rotation = this.options.rotation;
        if (!rotation) {
            return null;
        }

        var ref = this.normalBox.center();
        var cx = ref.x;
        var cy = ref.y;
        var boxCenter = this.rotatedBox.center();

        return _progress_kendoDrawing.geometry.transform()
                   .translate(boxCenter.x - cx, boxCenter.y - cy)
                   .rotate(rotation, [ cx, cy ]);
    };

    return TextBox;
}(BoxElement));

var Title = (function (ChartElement$$1) {
    function Title(options) {
        ChartElement$$1.call(this, options);

        this.append(
            new TextBox(this.options.text, Object.assign({}, this.options, {
                vAlign: this.options.position
            }))
        );
    }

    if ( ChartElement$$1 ) Title.__proto__ = ChartElement$$1;
    Title.prototype = Object.create( ChartElement$$1 && ChartElement$$1.prototype );
    Title.prototype.constructor = Title;

    Title.prototype.reflow = function reflow (targetBox) {
        ChartElement$$1.prototype.reflow.call(this, targetBox);
        this.box.snapTo(targetBox, X);
    };

    Title.buildTitle = function buildTitle (options, parent, defaultOptions) {
        var titleOptions = options;

        if (typeof options === "string") {
            titleOptions = { text: options };
        }

        titleOptions = Object.assign({ visible: true }, defaultOptions, titleOptions);

        var title;
        if (titleOptions && titleOptions.visible && titleOptions.text) {
            title = new Title(titleOptions);
            parent.append(title);
        }

        return title;
    };

    return Title;
}(ChartElement));

setDefaultOptions(Title, {
    color: BLACK,
    position: TOP,
    align: CENTER,
    margin: getSpacing(5),
    padding: getSpacing(5)
});

var AxisLabel = (function (TextBox$$1) {
    function AxisLabel(value, text, index, dataItem, options) {
        TextBox$$1.call(this, text, options);

        this.text = text;
        this.value = value;
        this.index = index;
        this.dataItem = dataItem;
        this.reflow(new Box());
    }

    if ( TextBox$$1 ) AxisLabel.__proto__ = TextBox$$1;
    AxisLabel.prototype = Object.create( TextBox$$1 && TextBox$$1.prototype );
    AxisLabel.prototype.constructor = AxisLabel;

    AxisLabel.prototype.visualContext = function visualContext (targetBox) {
        var context = TextBox$$1.prototype.visualContext.call(this, targetBox);

        context.value = this.value;
        context.dataItem = this.dataItem;
        context.format = this.options.format;
        context.culture = this.options.culture;

        return context;
    };

    AxisLabel.prototype.click = function click (widget, e) {

        widget.trigger(AXIS_LABEL_CLICK, {
            element: eventElement(e),
            value: this.value,
            text: this.text,
            index: this.index,
            dataItem: this.dataItem,
            axis: this.parent.options
        });
    };

    AxisLabel.prototype.rotate = function rotate () {
        if (this.options.alignRotation !== CENTER) {
            var box = this.normalBox.toRect();
            var transform = this.rotationTransform();

            this.box = rectToBox(box.bbox(transform.matrix()));
        } else {
            TextBox$$1.prototype.rotate.call(this);
        }

        return this.box;
    };

    AxisLabel.prototype.rotationTransform = function rotationTransform () {
        var options = this.options;
        var rotation = options.rotation;
        if (!rotation) {
            return null;
        }

        if (options.alignRotation === CENTER) {
            return TextBox$$1.prototype.rotationTransform.call(this);
        }

        var rotationMatrix = _progress_kendoDrawing.geometry.transform().rotate(rotation).matrix();
        var box = this.normalBox.toRect();
        var rect = this.targetBox.toRect();

        var rotationOrigin = options.rotationOrigin || TOP;
        var alignAxis = rotationOrigin === TOP || rotationOrigin === BOTTOM ? X : Y;
        var distanceAxis = rotationOrigin === TOP || rotationOrigin === BOTTOM ? Y : X;
        var axisAnchor = rotationOrigin === TOP || rotationOrigin === LEFT ? rect.origin : rect.bottomRight();

        var topLeft = box.topLeft().transformCopy(rotationMatrix);
        var topRight = box.topRight().transformCopy(rotationMatrix);
        var bottomRight = box.bottomRight().transformCopy(rotationMatrix);
        var bottomLeft = box.bottomLeft().transformCopy(rotationMatrix);
        var rotatedBox = _progress_kendoDrawing.geometry.Rect.fromPoints(topLeft, topRight, bottomRight, bottomLeft);

        var translate = {};
        translate[distanceAxis] = rect.origin[distanceAxis] - rotatedBox.origin[distanceAxis];

        var distanceLeft = Math.abs(topLeft[distanceAxis] + translate[distanceAxis] - axisAnchor[distanceAxis]);
        var distanceRight = Math.abs(topRight[distanceAxis] + translate[distanceAxis] - axisAnchor[distanceAxis]);

        var alignStart, alignEnd;

        if (round(distanceLeft, DEFAULT_PRECISION) === round(distanceRight, DEFAULT_PRECISION)) {
            alignStart = topLeft;
            alignEnd = topRight;
        } else if (distanceRight < distanceLeft) {
            alignStart = topRight;
            alignEnd = bottomRight;
        } else {
            alignStart = topLeft;
            alignEnd = bottomLeft;
        }

        var alignCenter = alignStart[alignAxis] + (alignEnd[alignAxis] - alignStart[alignAxis]) / 2;
        translate[alignAxis] = rect.center()[alignAxis] - alignCenter;

        return _progress_kendoDrawing.geometry.transform()
            .translate(translate.x, translate.y)
            .rotate(rotation);
    };

    return AxisLabel;
}(TextBox));

setDefaultOptions(AxisLabel, {
    _autoReflow: false
});

var DEFAULT_ICON_SIZE = 7;
var DEFAULT_LABEL_COLOR = "#fff";

var Note = (function (BoxElement$$1) {
    function Note(fields, options, chartService) {
        BoxElement$$1.call(this, options);

        this.fields = fields;
        this.chartService = chartService;

        this.render();
    }

    if ( BoxElement$$1 ) Note.__proto__ = BoxElement$$1;
    Note.prototype = Object.create( BoxElement$$1 && BoxElement$$1.prototype );
    Note.prototype.constructor = Note;

    Note.prototype.hide = function hide () {
        this.options.visible = false;
    };

    Note.prototype.show = function show () {
        this.options.visible = true;
    };

    Note.prototype.render = function render () {
        var options = this.options;

        if (options.visible) {
            var label = options.label;
            var icon = options.icon;
            var box = new Box();
            var size = icon.size;
            var text = this.fields.text;
            var width, height;

            if (defined(label) && label.visible) {
                var noteTemplate = getTemplate(label);
                if (noteTemplate) {
                    text = noteTemplate(this.fields);
                } else if (label.format) {
                    text = this.chartService.format.auto(label.format, text);
                }

                if (!label.color) {
                    label.color = label.position === INSIDE ? DEFAULT_LABEL_COLOR : icon.background;
                }

                this.label = new TextBox(text, deepExtend({}, label));

                if (label.position === INSIDE && !defined(size)) {
                    if (icon.type === CIRCLE) {
                        size = Math.max(this.label.box.width(), this.label.box.height());
                    } else {
                        width = this.label.box.width();
                        height = this.label.box.height();
                    }
                    box.wrap(this.label.box);
                }
            }

            icon.width = width || size || DEFAULT_ICON_SIZE;
            icon.height = height || size || DEFAULT_ICON_SIZE;

            var marker = new ShapeElement(deepExtend({}, icon));

            this.marker = marker;
            this.append(marker);

            if (this.label) {
                this.append(this.label);
            }

            marker.reflow(new Box());
            this.wrapperBox = box.wrap(marker.box);
        }
    };

    Note.prototype.reflow = function reflow (targetBox) {
        var ref = this;
        var options = ref.options;
        var label = ref.label;
        var marker = ref.marker;
        var wrapperBox = ref.wrapperBox;
        var center = targetBox.center();
        var length = options.line.length;
        var position = options.position;

        // TODO: Review
        if (options.visible) {
            var lineStart, box, contentBox;

            if (inArray(position, [ LEFT, RIGHT ])) {
                if (position === LEFT) {
                    contentBox = wrapperBox.alignTo(targetBox, position).translate(-length, targetBox.center().y - wrapperBox.center().y);

                    if (options.line.visible) {
                        lineStart = [ targetBox.x1, center.y ];
                        this.linePoints = [
                            lineStart,
                            [ contentBox.x2, center.y ]
                        ];
                        box = contentBox.clone().wrapPoint(lineStart);
                    }
                } else {
                    contentBox = wrapperBox.alignTo(targetBox, position).translate(length, targetBox.center().y - wrapperBox.center().y);

                    if (options.line.visible) {
                        lineStart = [ targetBox.x2, center.y ];
                        this.linePoints = [
                            lineStart,
                            [ contentBox.x1, center.y ]
                        ];
                        box = contentBox.clone().wrapPoint(lineStart);
                    }
                }
            } else {
                if (position === BOTTOM) {
                    contentBox = wrapperBox.alignTo(targetBox, position).translate(targetBox.center().x - wrapperBox.center().x, length);

                    if (options.line.visible) {
                        lineStart = [ center.x, targetBox.y2 ];
                        this.linePoints = [
                            lineStart,
                            [ center.x, contentBox.y1 ]
                        ];
                        box = contentBox.clone().wrapPoint(lineStart);
                    }
                } else {
                    contentBox = wrapperBox.alignTo(targetBox, position).translate(targetBox.center().x - wrapperBox.center().x, -length);

                    if (options.line.visible) {
                        lineStart = [ center.x, targetBox.y1 ];
                        this.linePoints = [
                            lineStart,
                            [ center.x, contentBox.y2 ]
                        ];
                        box = contentBox.clone().wrapPoint(lineStart);
                    }
                }
            }

            if (marker) {
                marker.reflow(contentBox);
            }

            if (label) {
                label.reflow(contentBox);
                if (marker) {
                    if (options.label.position === OUTSIDE) {
                        label.box.alignTo(marker.box, position);
                    }
                    label.reflow(label.box);
                }
            }

            this.contentBox = contentBox;
            this.targetBox = targetBox;
            this.box = box || contentBox;
        }
    };

    Note.prototype.createVisual = function createVisual () {
        BoxElement$$1.prototype.createVisual.call(this);
        this.visual.options.noclip = this.options.noclip;

        if (this.options.visible) {
            this.createLine();
        }
    };

    Note.prototype.renderVisual = function renderVisual () {
        var this$1 = this;

        var options = this.options;
        var customVisual = options.visual;
        if (options.visible && customVisual) {
            this.visual = customVisual(Object.assign(this.fields, {
                sender: this.getSender(),
                rect: this.targetBox.toRect(),
                options: {
                    background: options.background,
                    border: options.background,
                    icon: options.icon,
                    label: options.label,
                    line: options.line,
                    position: options.position,
                    visible: options.visible
                },
                createVisual: function () {
                    this$1.createVisual();
                    this$1.renderChildren();
                    var defaultVisual = this$1.visual;
                    delete this$1.visual;
                    return defaultVisual;
                }
            }));
            this.addVisual();
        } else {
            BoxElement$$1.prototype.renderVisual.call(this);
        }
    };

    Note.prototype.createLine = function createLine () {
        var options = this.options.line;

        if (this.linePoints) {
            var path = _progress_kendoDrawing.drawing.Path.fromPoints(this.linePoints, {
                stroke: {
                    color: options.color,
                    width: options.width,
                    dashType: options.dashType
                }
            });

            alignPathToPixel(path);
            this.visual.append(path);
        }
    };

    Note.prototype.click = function click (widget, e) {
        var args = this.eventArgs(e);

        if (!widget.trigger(NOTE_CLICK, args)) {
            e.preventDefault();
        }
    };

    Note.prototype.hover = function hover (widget, e) {
        var args = this.eventArgs(e);

        if (!widget.trigger(NOTE_HOVER, args)) {
            e.preventDefault();
        }
    };

    Note.prototype.leave = function leave (widget) {
        widget._unsetActivePoint();
    };

    Note.prototype.eventArgs = function eventArgs (e) {
        var options = this.options;

        return Object.assign(this.fields, {
            element: eventElement(e),
            text: defined(options.label) ? options.label.text : "",
            visual: this.visual
        });
    };

    return Note;
}(BoxElement));

setDefaultOptions(Note, {
    icon: {
        visible: true,
        type: CIRCLE
    },
    label: {
        position: INSIDE,
        visible: true,
        align: CENTER,
        vAlign: CENTER
    },
    line: {
        visible: true
    },
    visible: true,
    position: TOP,
    zIndex: 2
});

function createAxisTick(options, tickOptions) {
    var tickX = options.tickX;
    var tickY = options.tickY;
    var position = options.position;

    var tick = new _progress_kendoDrawing.drawing.Path({
        stroke: {
            width: tickOptions.width,
            color: tickOptions.color
        }
    });

    if (options.vertical) {
        tick.moveTo(tickX, position)
            .lineTo(tickX + tickOptions.size, position);
    } else {
        tick.moveTo(position, tickY)
            .lineTo(position, tickY + tickOptions.size);
    }

    alignPathToPixel(tick);

    return tick;
}

function createAxisGridLine(options, gridLine) {
    var lineStart = options.lineStart;
    var lineEnd = options.lineEnd;
    var position = options.position;

    var line = new _progress_kendoDrawing.drawing.Path({
        stroke: {
            width: gridLine.width,
            color: gridLine.color,
            dashType: gridLine.dashType
        }
    });

    if (options.vertical) {
        line.moveTo(lineStart, position)
            .lineTo(lineEnd, position);
    } else {
        line.moveTo(position, lineStart)
            .lineTo(position, lineEnd);
    }

    alignPathToPixel(line);

    return line;
}

var Axis = (function (ChartElement$$1) {
    function Axis(options, chartService) {
        if ( chartService === void 0 ) chartService = new ChartService();

        ChartElement$$1.call(this, options);

        this.chartService = chartService;

        if (!this.options.visible) {
            this.options = deepExtend({}, this.options, {
                labels: {
                    visible: false
                },
                line: {
                    visible: false
                },
                margin: 0,
                majorTickSize: 0,
                minorTickSize: 0
            });
        }

        this.options.minorTicks = deepExtend({}, {
            color: this.options.line.color,
            width: this.options.line.width,
            visible: this.options.minorTickType !== NONE
        }, this.options.minorTicks, {
            size: this.options.minorTickSize,
            align: this.options.minorTickType
        });

        this.options.majorTicks = deepExtend({}, {
            color: this.options.line.color,
            width: this.options.line.width,
            visible: this.options.majorTickType !== NONE
        }, this.options.majorTicks, {
            size: this.options.majorTickSize,
            align: this.options.majorTickType
        });

        if (!this.options._deferLabels) {
            this.createLabels();
        }

        this.createTitle();
        this.createNotes();
    }

    if ( ChartElement$$1 ) Axis.__proto__ = ChartElement$$1;
    Axis.prototype = Object.create( ChartElement$$1 && ChartElement$$1.prototype );
    Axis.prototype.constructor = Axis;

    // abstract labelsCount(): Number
    // abstract createAxisLabel(index, options): AxisLabel

    Axis.prototype.labelsRange = function labelsRange () {
        return {
            min: this.options.labels.skip,
            max: this.labelsCount()
        };
    };

    Axis.prototype.createLabels = function createLabels () {
        var this$1 = this;

        var options = this.options;
        var align = options.vertical ? RIGHT : CENTER;
        var labelOptions = deepExtend({ }, options.labels, {
            align: align,
            zIndex: options.zIndex
        });
        var step = Math.max(1, labelOptions.step);

        this.children = grep(this.children, function (child) { return !(child instanceof AxisLabel); });

        this.labels = [];

        if (labelOptions.visible) {
            var range = this.labelsRange();
            var rotation = labelOptions.rotation;

            if (isObject(rotation)) {
                labelOptions.alignRotation = rotation.align;
                labelOptions.rotation = rotation.angle;
            }

            if (labelOptions.rotation === "auto") {
                labelOptions.rotation = 0;
                options.autoRotateLabels = true;
            }

            for (var idx = range.min; idx < range.max; idx += step) {
                var label = this$1.createAxisLabel(idx, labelOptions);
                if (label) {
                    this$1.append(label);
                    this$1.labels.push(label);
                }
            }
        }
    };

    Axis.prototype.lineBox = function lineBox () {
        var ref = this;
        var options = ref.options;
        var box = ref.box;
        var vertical = options.vertical;
        var mirror = options.labels.mirror;
        var axisX = mirror ? box.x1 : box.x2;
        var axisY = mirror ? box.y2 : box.y1;
        var lineWidth = options.line.width || 0;

        return vertical ?
            new Box(axisX, box.y1, axisX, box.y2 - lineWidth) :
            new Box(box.x1, axisY, box.x2 - lineWidth, axisY);
    };

    Axis.prototype.createTitle = function createTitle () {
        var options = this.options;
        var titleOptions = deepExtend({
            rotation: options.vertical ? -90 : 0,
            text: "",
            zIndex: 1,
            visualSize: true
        }, options.title);

        if (titleOptions.visible && titleOptions.text) {
            var title = new TextBox(titleOptions.text, titleOptions);
            this.append(title);
            this.title = title;
        }
    };

    Axis.prototype.createNotes = function createNotes () {
        var this$1 = this;

        var options = this.options;
        var notes = options.notes;
        var items = notes.data || [];

        this.notes = [];

        for (var i = 0; i < items.length; i++) {
            var item = deepExtend({}, notes, items[i]);
            item.value = this$1.parseNoteValue(item.value);

            var note = new Note({
                value: item.value,
                text: item.label.text,
                dataItem: item
            }, item, this$1.chartService);

            if (note.options.visible) {
                if (defined(note.options.position)) {
                    if (options.vertical && !inArray(note.options.position, [ LEFT, RIGHT ])) {
                        note.options.position = options.reverse ? LEFT : RIGHT;
                    } else if (!options.vertical && !inArray(note.options.position, [ TOP, BOTTOM ])) {
                        note.options.position = options.reverse ? BOTTOM : TOP;
                    }
                } else {
                    if (options.vertical) {
                        note.options.position = options.reverse ? LEFT : RIGHT;
                    } else {
                        note.options.position = options.reverse ? BOTTOM : TOP;
                    }
                }
                this$1.append(note);
                this$1.notes.push(note);
            }
        }
    };

    Axis.prototype.parseNoteValue = function parseNoteValue (value) {
        return value;
    };

    Axis.prototype.renderVisual = function renderVisual () {
        ChartElement$$1.prototype.renderVisual.call(this);

        this.createPlotBands();
    };

    Axis.prototype.createVisual = function createVisual () {
        ChartElement$$1.prototype.createVisual.call(this);

        this.createBackground();
        this.createLine();
    };

    Axis.prototype.gridLinesVisual = function gridLinesVisual () {
        var gridLines = this._gridLines;
        if (!gridLines) {
            gridLines = this._gridLines = new _progress_kendoDrawing.drawing.Group({
                zIndex: -2
            });
            this.appendVisual(this._gridLines);
        }

        return gridLines;
    };

    Axis.prototype.createTicks = function createTicks (lineGroup) {
        var options = this.options;
        var lineBox = this.lineBox();
        var mirror = options.labels.mirror;
        var majorUnit = options.majorTicks.visible ? options.majorUnit : 0;
        var tickLineOptions = {
            // TODO
            // _alignLines: options._alignLines,
            vertical: options.vertical
        };

        function render(tickPositions, tickOptions, skipUnit) {
            var count = tickPositions.length;
            var step = Math.max(1, tickOptions.step);

            if (tickOptions.visible) {
                for (var i = tickOptions.skip; i < count; i += step) {
                    if (defined(skipUnit) && (i % skipUnit === 0)) {
                        continue;
                    }

                    tickLineOptions.tickX = mirror ? lineBox.x2 : lineBox.x2 - tickOptions.size;
                    tickLineOptions.tickY = mirror ? lineBox.y1 - tickOptions.size : lineBox.y1;
                    tickLineOptions.position = tickPositions[i];

                    lineGroup.append(createAxisTick(tickLineOptions, tickOptions));
                }
            }
        }

        render(this.getMajorTickPositions(), options.majorTicks);
        render(this.getMinorTickPositions(), options.minorTicks, majorUnit / options.minorUnit);
    };

    Axis.prototype.createLine = function createLine () {
        var options = this.options;
        var line = options.line;
        var lineBox = this.lineBox();

        if (line.width > 0 && line.visible) {
            var path = new _progress_kendoDrawing.drawing.Path({
                stroke: {
                    width: line.width,
                    color: line.color,
                    dashType: line.dashType
                }

                /* TODO
                zIndex: line.zIndex,
                */
            });

            path.moveTo(lineBox.x1, lineBox.y1)
                .lineTo(lineBox.x2, lineBox.y2);

            if (options._alignLines) {
                alignPathToPixel(path);
            }

            var group = this._lineGroup = new _progress_kendoDrawing.drawing.Group();
            group.append(path);

            this.visual.append(group);
            this.createTicks(group);
        }
    };

    Axis.prototype.getActualTickSize = function getActualTickSize () {
        var options = this.options;
        var tickSize = 0;

        if (options.majorTicks.visible && options.minorTicks.visible) {
            tickSize = Math.max(options.majorTicks.size, options.minorTicks.size);
        } else if (options.majorTicks.visible) {
            tickSize = options.majorTicks.size;
        } else if (options.minorTicks.visible) {
            tickSize = options.minorTicks.size;
        }

        return tickSize;
    };

    Axis.prototype.createBackground = function createBackground () {
        var ref = this;
        var options = ref.options;
        var box = ref.box;
        var background = options.background;

        if (background) {
            this._backgroundPath = _progress_kendoDrawing.drawing.Path.fromRect(box.toRect(), {
                fill: {
                    color: background
                },
                stroke: null
            });

            this.visual.append(this._backgroundPath);
        }
    };

    Axis.prototype.createPlotBands = function createPlotBands () {
        var this$1 = this;

        var options = this.options;
        var plotBands = options.plotBands || [];
        var vertical = options.vertical;
        var plotArea = this.plotArea;

        if (plotBands.length === 0) {
            return;
        }

        var group = this._plotbandGroup = new _progress_kendoDrawing.drawing.Group({
            zIndex: -1
        });

        var altAxis = grep(this.pane.axes, function (axis) { return axis.options.vertical !== this$1.options.vertical; })[0];

        for (var idx = 0; idx < plotBands.length; idx++) {
            var item = plotBands[idx];
            var slotX = (void 0), slotY = (void 0);

            if (vertical) {
                slotX = (altAxis || plotArea.axisX).lineBox();
                slotY = this$1.getSlot(item.from, item.to, true);
            } else {
                slotX = this$1.getSlot(item.from, item.to, true);
                slotY = (altAxis || plotArea.axisY).lineBox();
            }

            if (slotX.width() !== 0 && slotY.height() !== 0) {
                var bandRect = new _progress_kendoDrawing.geometry.Rect(
                    [ slotX.x1, slotY.y1 ],
                    [ slotX.width(), slotY.height() ]
                );

                var path = _progress_kendoDrawing.drawing.Path.fromRect(bandRect, {
                    fill: {
                        color: item.color,
                        opacity: item.opacity
                    },
                    stroke: null
                });

                group.append(path);
            }
        }

        this.appendVisual(group);
    };

    Axis.prototype.createGridLines = function createGridLines (altAxis) {
        var options = this.options;
        var minorGridLines = options.minorGridLines;
        var majorGridLines = options.majorGridLines;
        var minorUnit = options.minorUnit;
        var vertical = options.vertical;
        var axisLineVisible = altAxis.options.line.visible;
        var majorUnit = majorGridLines.visible ? options.majorUnit : 0;
        var lineBox = altAxis.lineBox();
        var linePos = lineBox[vertical ? "y1" : "x1"];
        var lineOptions = {
            lineStart: lineBox[vertical ? "x1" : "y1"],
            lineEnd: lineBox[vertical ? "x2" : "y2"],
            vertical: vertical
        };
        var majorTicks = [];

        var container = this.gridLinesVisual();

        function render(tickPositions, gridLine, skipUnit) {
            var count = tickPositions.length;
            var step = Math.max(1, gridLine.step);

            if (gridLine.visible) {
                for (var i = gridLine.skip; i < count; i += step) {
                    var pos = round(tickPositions[i]);
                    if (!inArray(pos, majorTicks)) {
                        if (i % skipUnit !== 0 && (!axisLineVisible || linePos !== pos)) {
                            lineOptions.position = pos;
                            container.append(createAxisGridLine(lineOptions, gridLine));

                            majorTicks.push(pos);
                        }
                    }
                }
            }
        }

        render(this.getMajorTickPositions(), majorGridLines);
        render(this.getMinorTickPositions(), minorGridLines, majorUnit / minorUnit);

        return container.children;
    };

    Axis.prototype.reflow = function reflow (box) {
        var ref = this;
        var options = ref.options;
        var labels = ref.labels;
        var title = ref.title;
        var vertical = options.vertical;
        var count = labels.length;
        var sizeFn = vertical ? WIDTH : HEIGHT;
        var titleSize = title ? title.box[sizeFn]() : 0;
        var space = this.getActualTickSize() + options.margin + titleSize;
        var rootBox = (this.getRoot() || {}).box || box;
        var boxSize = rootBox[sizeFn]();
        var maxLabelSize = 0;

        for (var i = 0; i < count; i++) {
            var labelSize = labels[i].box[sizeFn]();
            if (labelSize + space <= boxSize) {
                maxLabelSize = Math.max(maxLabelSize, labelSize);
            }
        }

        if (vertical) {
            this.box = new Box(
                box.x1, box.y1,
                box.x1 + maxLabelSize + space, box.y2
            );
        } else {
            this.box = new Box(
                box.x1, box.y1,
                box.x2, box.y1 + maxLabelSize + space
            );
        }

        this.arrangeTitle();
        this.arrangeLabels();
        this.arrangeNotes();
    };

    Axis.prototype.getLabelsTickPositions = function getLabelsTickPositions () {
        return this.getMajorTickPositions();
    };

    Axis.prototype.labelTickIndex = function labelTickIndex (label) {
        return label.index;
    };

    Axis.prototype.arrangeLabels = function arrangeLabels () {
        var this$1 = this;

        var ref = this;
        var options = ref.options;
        var labels = ref.labels;
        var labelsBetweenTicks = !options.justified;
        var vertical = options.vertical;
        var lineBox = this.lineBox();
        var mirror = options.labels.mirror;
        var tickPositions = this.getLabelsTickPositions();
        var labelOffset = this.getActualTickSize() + options.margin;

        for (var idx = 0; idx < labels.length; idx++) {
            var label = labels[idx];
            var tickIx = this$1.labelTickIndex(label);
            var labelSize = vertical ? label.box.height() : label.box.width();
            var labelPos = tickPositions[tickIx] - (labelSize / 2);
            var labelBox = (void 0), firstTickPosition = (void 0), nextTickPosition = (void 0);

            if (vertical) {
                if (labelsBetweenTicks) {
                    firstTickPosition = tickPositions[tickIx];
                    nextTickPosition = tickPositions[tickIx + 1];

                    var middle = firstTickPosition + (nextTickPosition - firstTickPosition) / 2;
                    labelPos = middle - (labelSize / 2);
                }

                var labelX = lineBox.x2;

                if (mirror) {
                    labelX += labelOffset;
                    label.options.rotationOrigin = LEFT;
                } else {
                    labelX -= labelOffset + label.box.width();
                    label.options.rotationOrigin = RIGHT;
                }

                labelBox = label.box.move(labelX, labelPos);
            } else {
                if (labelsBetweenTicks) {
                    firstTickPosition = tickPositions[tickIx];
                    nextTickPosition = tickPositions[tickIx + 1];
                } else {
                    firstTickPosition = labelPos;
                    nextTickPosition = labelPos + labelSize;
                }

                var labelY = lineBox.y1;

                if (mirror) {
                    labelY -= labelOffset + label.box.height();
                    label.options.rotationOrigin = BOTTOM;
                } else {
                    labelY += labelOffset;
                    label.options.rotationOrigin = TOP;
                }

                labelBox = new Box(firstTickPosition, labelY,
                                nextTickPosition, labelY + label.box.height());
            }

            label.reflow(labelBox);
        }
    };

    Axis.prototype.autoRotateLabels = function autoRotateLabels () {
        if (this.options.autoRotateLabels && !this.options.vertical) {
            var tickPositions = this.getMajorTickPositions();
            var labels = this.labels;
            var angle;

            for (var idx = 0; idx < labels.length; idx++) {
                var width = tickPositions[idx + 1] - tickPositions[idx];
                var labelBox = labels[idx].box;

                if (labelBox.width() > width) {
                    if (labelBox.height() > width) {
                        angle = -90;
                        break;
                    }
                    angle = -45;
                }
            }

            if (angle) {
                for (var idx$1 = 0; idx$1 < labels.length; idx$1++) {
                    labels[idx$1].options.rotation = angle;
                    labels[idx$1].reflow(new Box());
                }
                return true;
            }
        }
    };

    Axis.prototype.arrangeTitle = function arrangeTitle () {
        var ref = this;
        var options = ref.options;
        var title = ref.title;
        var mirror = options.labels.mirror;
        var vertical = options.vertical;

        if (title) {
            if (vertical) {
                title.options.align = mirror ? RIGHT : LEFT;
                title.options.vAlign = title.options.position;
            } else {
                title.options.align = title.options.position;
                title.options.vAlign = mirror ? TOP : BOTTOM;
            }

            title.reflow(this.box);
        }
    };

    Axis.prototype.arrangeNotes = function arrangeNotes () {
        var this$1 = this;

        for (var idx = 0; idx < this.notes.length; idx++) {
            var item = this$1.notes[idx];
            var value = item.options.value;
            var slot = (void 0);

            if (defined(value)) {
                if (this$1.shouldRenderNote(value)) {
                    item.show();
                } else {
                    item.hide();
                }

                slot = this$1.noteSlot(value);
            } else {
                item.hide();
            }

            item.reflow(slot || this$1.lineBox());
        }
    };

    Axis.prototype.noteSlot = function noteSlot (value) {
        return this.getSlot(value);
    };

    Axis.prototype.alignTo = function alignTo (secondAxis) {
        var lineBox = secondAxis.lineBox();
        var vertical = this.options.vertical;
        var pos = vertical ? Y : X;

        this.box.snapTo(lineBox, pos);
        if (vertical) {
            this.box.shrink(0, this.lineBox().height() - lineBox.height());
        } else {
            this.box.shrink(this.lineBox().width() - lineBox.width(), 0);
        }
        this.box[pos + 1] -= this.lineBox()[pos + 1] - lineBox[pos + 1];
        this.box[pos + 2] -= this.lineBox()[pos + 2] - lineBox[pos + 2];
    };

    Axis.prototype.axisLabelText = function axisLabelText (value, dataItem, options) {
        var tmpl = getTemplate(options);
        var text = value;

        if (tmpl) {
            text = tmpl({ value: value, dataItem: dataItem, format: options.format, culture: options.culture });
        } else if (options.format) {
            text = this.chartService.format.localeAuto(options.format, [ value ], options.culture);
        }

        return text;
    };

    Axis.prototype.slot = function slot (from , to, limit) {
        var slot = this.getSlot(from, to, limit);
        if (slot) {
            return slot.toRect();
        }
    };

    Axis.prototype.contentBox = function contentBox () {
        var box = this.box.clone();
        var labels = this.labels;
        if (labels.length) {
            if (labels[0].options.visible) {
                box.wrap(labels[0].box);
            }
            var lastLabel = labels[labels.length - 1];
            if (lastLabel.options.visible) {
                box.wrap(lastLabel.box);
            }
        }

        return box;
    };

    Axis.prototype.limitRange = function limitRange (from, to, min, max, offset) {
        var options = this.options;

        if ((from < min && offset < 0 && (!defined(options.min) || options.min <= min)) || (max < to && offset > 0 && (!defined(options.max) || max <= options.max))) {
            return null;
        }

        if ((to < min && offset > 0) || (max < from && offset < 0)) {
            return {
                min: from,
                max: to
            };
        }

        var rangeSize = to - from;
        var minValue = from;
        var maxValue = to;

        if (from < min) {
            minValue = limitValue(from, min, max);
            maxValue = limitValue(from + rangeSize, min + rangeSize, max);
        } else if (to > max) {
            maxValue = limitValue(to, min, max);
            minValue = limitValue(to - rangeSize, min, max - rangeSize);
        }

        return {
            min: minValue,
            max: maxValue
        };
    };

    Axis.prototype.valueRange = function valueRange () {
        return {
            min: this.seriesMin,
            max: this.seriesMax
        };
    };

    return Axis;
}(ChartElement));

setDefaultOptions(Axis, {
    labels: {
        visible: true,
        rotation: 0,
        mirror: false,
        step: 1,
        skip: 0
    },
    line: {
        width: 1,
        color: BLACK,
        visible: true
    },
    title: {
        visible: true,
        position: CENTER
    },
    majorTicks: {
        align: OUTSIDE,
        size: 4,
        skip: 0,
        step: 1
    },
    minorTicks: {
        align: OUTSIDE,
        size: 3,
        skip: 0,
        step: 1
    },
    axisCrossingValue: 0,
    majorTickType: OUTSIDE,
    minorTickType: NONE,
    majorGridLines: {
        skip: 0,
        step: 1
    },
    minorGridLines: {
        visible: false,
        width: 1,
        color: BLACK,
        skip: 0,
        step: 1
    },
    // TODO: Move to line or labels options
    margin: 5,
    visible: true,
    reverse: false,
    justified: true,
    notes: {
        label: {
            text: ""
        }
    },

    _alignLines: true,
    _deferLabels: false
});

var MIN_CATEGORY_POINTS_RANGE = 0.01;

var CategoryAxis = (function (Axis$$1) {
    function CategoryAxis(options, chartService) {
        Axis$$1.call(this, options, chartService);

        this._ticks = {};
        this._initCategories(this.options);
    }

    if ( Axis$$1 ) CategoryAxis.__proto__ = Axis$$1;
    CategoryAxis.prototype = Object.create( Axis$$1 && Axis$$1.prototype );
    CategoryAxis.prototype.constructor = CategoryAxis;

    CategoryAxis.prototype._initCategories = function _initCategories (options) {
        var categories = (options.categories || []).slice(0);
        var definedMin = defined(options.min);
        var definedMax = defined(options.max);
        options.categories = categories;

        if ((definedMin || definedMax) && categories.length) {
            options.srcCategories = options.categories;
            var min = definedMin ? Math.floor(options.min) : 0;
            var max;

            if (definedMax) {
                max = options.justified ? Math.floor(options.max) + 1 : Math.ceil(options.max);
            } else {
                max = categories.length;
            }

            options.categories = options.categories.slice(min, max);
        }
    };

    CategoryAxis.prototype.rangeIndices = function rangeIndices () {
        var options = this.options;
        var length = options.categories.length || 1;
        var min = isNumber(options.min) ? options.min % 1 : 0;
        var max;

        if (isNumber(options.max) && options.max % 1 !== 0 && options.max < this.totalRange().max) {
            max = length - (1 - options.max % 1);
        } else {
            max = length - (options.justified ? 1 : 0);
        }

        return {
            min: min,
            max: max
        };
    };

    CategoryAxis.prototype.totalRangeIndices = function totalRangeIndices (limit) {
        var options = this.options;
        var min = isNumber(options.min) ? options.min : 0;
        var max;

        if (isNumber(options.max)) {
            max = options.max;
        } else if (isNumber(options.min)) {
            max = min + options.categories.length;
        } else {
            max = ((options.srcCategories || options.categories).length - (options.justified ? 1 : 0) || 1);
        }

        if (limit) {
            var totalRange = this.totalRange();
            min = limitValue(min, 0, totalRange.max);
            max = limitValue(max, 0, totalRange.max);
        }

        return {
            min: min,
            max: max
        };
    };

    CategoryAxis.prototype.range = function range () {
        var options = this.options;
        return { min: isNumber(options.min) ? options.min : 0, max: isNumber(options.max) ? options.max : options.categories.length };
    };

    CategoryAxis.prototype.totalRange = function totalRange () {
        var options = this.options;
        return { min: 0, max: Math.max(this._seriesMax || 0, (options.srcCategories || options.categories).length) - (options.justified ? 1 : 0) };
    };

    CategoryAxis.prototype.getScale = function getScale () {
        var ref = this.rangeIndices();
        var min = ref.min;
        var max = ref.max;
        var lineBox = this.lineBox();
        var size = this.options.vertical ? lineBox.height() : lineBox.width();
        var scale = size / ((max - min) || 1);

        return scale * (this.options.reverse ? -1 : 1);
    };

    CategoryAxis.prototype.getTickPositions = function getTickPositions (stepSize) {
        var ref = this.options;
        var vertical = ref.vertical;
        var reverse = ref.reverse;
        var ref$1 = this.rangeIndices();
        var min = ref$1.min;
        var max = ref$1.max;
        var lineBox = this.lineBox();
        var scale = this.getScale();
        var pos = lineBox[(vertical ? Y : X) + (reverse ? 2 : 1)];
        var positions = [];

        var current = min % 1 !== 0 ? Math.floor(min / 1) + stepSize : min;

        while (current <= max) {
            positions.push(pos + round(scale * (current - min), COORD_PRECISION));
            current += stepSize;
        }

        return positions;
    };

    CategoryAxis.prototype.getLabelsTickPositions = function getLabelsTickPositions () {
        var tickPositions = this.getMajorTickPositions().slice(0);
        var range = this.rangeIndices();
        var scale = this.getScale();
        var box = this.lineBox();
        var options = this.options;
        var axis = options.vertical ? Y : X;
        var start = options.reverse ? 2 : 1;
        var end = options.reverse ? 1 : 2;

        if (range.min % 1 !== 0) {
            tickPositions.unshift(box[axis + start] - scale * (range.min % 1));
        }

        if (range.max % 1 !== 0) {
            tickPositions.push(box[axis + end] + scale * (1 - range.max % 1));
        }

        return tickPositions;
    };

    CategoryAxis.prototype.labelTickIndex = function labelTickIndex (label) {
        var range = this.rangeIndices();
        var index = label.index;

        if (range.min > 0) {
            index = index - Math.floor(range.min);
        }

        return index;
    };

    CategoryAxis.prototype.arrangeLabels = function arrangeLabels () {
        Axis$$1.prototype.arrangeLabels.call(this);
        this.hideOutOfRangeLabels();
    };

    CategoryAxis.prototype.hideOutOfRangeLabels = function hideOutOfRangeLabels () {
        var ref = this;
        var box = ref.box;
        var labels = ref.labels;

        if (labels.length) {
            var valueAxis = this.options.vertical ? Y : X;
            var start = box[valueAxis + 1];
            var end = box[valueAxis + 2];
            var firstLabel = labels[0];
            var lastLabel = last(labels);

            if (firstLabel.box[valueAxis + 1] > end || firstLabel.box[valueAxis + 2] < start) {
                firstLabel.options.visible = false;
            }
            if (lastLabel.box[valueAxis + 1] > end || lastLabel.box[valueAxis + 2] < start) {
                lastLabel.options.visible = false;
            }
        }
    };

    CategoryAxis.prototype.getMajorTickPositions = function getMajorTickPositions () {
        return this.getTicks().majorTicks;
    };

    CategoryAxis.prototype.getMinorTickPositions = function getMinorTickPositions () {
        return this.getTicks().minorTicks;
    };

    CategoryAxis.prototype.getTicks = function getTicks () {
        var ref = this.options;
        var reverse = ref.reverse;
        var justified = ref.justified;
        var cache = this._ticks;
        var range = this.rangeIndices();
        var lineBox = this.lineBox();
        var hash = lineBox.getHash() + range.min + "," + range.max + reverse + justified;

        if (cache._hash !== hash) {
            cache._hash = hash;
            cache.majorTicks = this.getTickPositions(1);
            cache.minorTicks = this.getTickPositions(0.5);
        }

        return cache;
    };

    CategoryAxis.prototype.getSlot = function getSlot (from, to, limit) {
        var ref = this;
        var options = ref.options;
        var reverse = options.reverse;
        var justified = options.justified;
        var vertical = options.vertical;
        var ref$1 = this.rangeIndices();
        var min = ref$1.min;
        var valueAxis = vertical ? Y : X;
        var lineBox = this.lineBox();
        var scale = this.getScale();
        var lineStart = lineBox[valueAxis + (reverse ? 2 : 1)];
        var slotBox = lineBox.clone();
        var singleSlot = !defined(to);

        var start = valueOrDefault(from, 0);
        var end = valueOrDefault(to, start);
        end = Math.max(end - 1, start);

        // Fixes transient bug caused by iOS 6.0 JIT
        // (one can never be too sure)
        end = Math.max(start, end);

        var p1 = lineStart + (start - min) * scale;
        var p2 = lineStart + (end + 1 - min) * scale;

        if (singleSlot && justified) {
            p2 = p1;
        }

        if (limit) {
            p1 = limitValue(p1, lineBox[valueAxis + 1], lineBox[valueAxis + 2]);
            p2 = limitValue(p2, lineBox[valueAxis + 1], lineBox[valueAxis + 2]);
        }

        slotBox[valueAxis + 1] = reverse ? p2 : p1;
        slotBox[valueAxis + 2] = reverse ? p1 : p2;

        return slotBox;
    };

    CategoryAxis.prototype.slot = function slot (from, to, limit) {
        var start = from;
        var end = to;

        if (typeof start === "string") {
            start = this.categoryIndex(start);
        }

        if (typeof end === "string") {
            end = this.categoryIndex(end);
        }

        return Axis$$1.prototype.slot.call(this, start, end, limit);
    };

    CategoryAxis.prototype.pointCategoryIndex = function pointCategoryIndex (point) {
        var ref = this.options;
        var reverse = ref.reverse;
        var justified = ref.justified;
        var vertical = ref.vertical;
        var valueAxis = vertical ? Y : X;
        var lineBox = this.lineBox();
        var range = this.rangeIndices();
        var startValue = reverse ? range.max : range.min;
        var scale = this.getScale();
        var lineStart = lineBox[valueAxis + 1];
        var lineEnd = lineBox[valueAxis + 2];
        var pos = point[valueAxis];

        if (pos < lineStart || pos > lineEnd) {
            return null;
        }

        var value = startValue + (pos - lineStart) / scale;
        var diff = value % 1;

        if (justified) {
            value = Math.round(value);
        } else if (diff === 0 && value > 0) {
            value--;
        }

        return Math.floor(value);
    };

    CategoryAxis.prototype.getCategory = function getCategory (point) {
        var index = this.pointCategoryIndex(point);

        if (index === null) {
            return null;
        }

        return this.options.categories[index];
    };

    CategoryAxis.prototype.categoryIndex = function categoryIndex (value) {
        var options = this.options;
        var index = (options.srcCategories || options.categories).indexOf(value);

        return index - Math.floor(options.min || 0);
    };

    CategoryAxis.prototype.translateRange = function translateRange (delta) {
        var options = this.options;
        var lineBox = this.lineBox();
        var size = options.vertical ? lineBox.height() : lineBox.width();
        var range = options.categories.length;
        var scale = size / range;
        var offset = round(delta / scale, DEFAULT_PRECISION);

        return {
            min: offset,
            max: range + offset
        };
    };

    CategoryAxis.prototype.zoomRange = function zoomRange (rate) {
        var rangeIndices = this.totalRangeIndices();
        var ref = this.totalRange();
        var totalMin = ref.min;
        var totalMax = ref.max;
        var min = limitValue(rangeIndices.min + rate, totalMin, totalMax);
        var max = limitValue(rangeIndices.max - rate, totalMin, totalMax);

        if (max - min > 0) {
            return {
                min: min,
                max: max
            };
        }
    };

    CategoryAxis.prototype.scaleRange = function scaleRange (scale) {
        var range = this.options.categories.length;
        var delta = scale * range;

        return {
            min: -delta,
            max: range + delta
        };
    };

    CategoryAxis.prototype.labelsCount = function labelsCount () {
        var labelsRange = this.labelsRange();

        return labelsRange.max - labelsRange.min;
    };

    CategoryAxis.prototype.labelsRange = function labelsRange () {
        var options = this.options;
        var justified = options.justified;
        var labelOptions = options.labels;
        var ref = this.totalRangeIndices(true);
        var min = ref.min;
        var max = ref.max;
        var start = Math.floor(min);

        if (!justified) {
            min = Math.floor(min);
            max = Math.ceil(max);
        } else {
            min = Math.ceil(min);
            max = Math.floor(max);
        }

        var skip;

        if (min > labelOptions.skip) {
            skip = labelOptions.skip + labelOptions.step * Math.ceil((min - labelOptions.skip) / labelOptions.step);
        } else {
            skip = labelOptions.skip;
        }

        return {
            min: skip - start,
            max: (options.categories.length ? max + (justified ? 1 : 0) : 0) - start
        };
    };

    CategoryAxis.prototype.createAxisLabel = function createAxisLabel (index, labelOptions) {
        var options = this.options;
        var dataItem = options.dataItems ? options.dataItems[index] : null;
        var category = valueOrDefault(options.categories[index], "");
        var text = this.axisLabelText(category, dataItem, labelOptions);

        return new AxisLabel(category, text, index, dataItem, labelOptions);
    };

    CategoryAxis.prototype.shouldRenderNote = function shouldRenderNote (value) {
        var range = this.totalRangeIndices();

        return Math.floor(range.min) <= value && value <= Math.ceil(range.max);
    };

    CategoryAxis.prototype.noteSlot = function noteSlot (value) {
        var options = this.options;
        var index = value - Math.floor(options.min || 0);
        return this.getSlot(index);
    };

    CategoryAxis.prototype.arrangeNotes = function arrangeNotes () {
        Axis$$1.prototype.arrangeNotes.call(this);
        this.hideOutOfRangeNotes();
    };

    CategoryAxis.prototype.hideOutOfRangeNotes = function hideOutOfRangeNotes () {
        var ref = this;
        var notes = ref.notes;
        var box = ref.box;
        if (notes && notes.length) {
            var valueAxis = this.options.vertical ? Y : X;
            var start = box[valueAxis + 1];
            var end = box[valueAxis + 2];

            for (var idx = 0; idx < notes.length; idx++) {
                var note = notes[idx];
                if (note.box && (end < note.box[valueAxis + 1] || note.box[valueAxis + 2] < start)) {
                    note.hide();
                }
            }
        }
    };

    CategoryAxis.prototype.pan = function pan (delta) {
        var range = this.totalRangeIndices(true);
        var scale = this.getScale();
        var offset = round(delta / scale, DEFAULT_PRECISION);
        var totalRange = this.totalRange();
        var min = range.min + offset;
        var max = range.max + offset;

        return this.limitRange(min, max, 0, totalRange.max, offset);
    };

    CategoryAxis.prototype.pointsRange = function pointsRange (start, end) {
        var ref = this.options;
        var reverse = ref.reverse;
        var vertical = ref.vertical;
        var valueAxis = vertical ? Y : X;
        var lineBox = this.lineBox();
        var range = this.totalRangeIndices(true);
        var scale = this.getScale();
        var lineStart = lineBox[valueAxis + (reverse ? 2 : 1)];

        var diffStart = start[valueAxis] - lineStart;
        var diffEnd = end[valueAxis] - lineStart;

        var min = range.min + diffStart / scale;
        var max = range.min + diffEnd / scale;
        var rangeMin = Math.min(min, max);
        var rangeMax = Math.max(min, max);

        if (rangeMax - rangeMin >= MIN_CATEGORY_POINTS_RANGE) {
            return {
                min: rangeMin,
                max: rangeMax
            };
        }
    };

    CategoryAxis.prototype.valueRange = function valueRange () {
        return this.range();
    };

    return CategoryAxis;
}(Axis));

setDefaultOptions(CategoryAxis, {
    type: "category",
    categories: [],
    vertical: false,
    majorGridLines: {
        visible: false,
        width: 1,
        color: BLACK
    },
    labels: {
        zIndex: 1
    },
    justified: false,
    _deferLabels: true
});

var MILLISECONDS = "milliseconds";
var SECONDS = "seconds";
var MINUTES = "minutes";
var HOURS = "hours";
var DAYS = "days";
var WEEKS = "weeks";
var MONTHS = "months";
var YEARS = "years";

var TIME_PER_MILLISECOND = 1;
var TIME_PER_SECOND = 1000;
var TIME_PER_MINUTE = 60 * TIME_PER_SECOND;
var TIME_PER_HOUR = 60 * TIME_PER_MINUTE;
var TIME_PER_DAY = 24 * TIME_PER_HOUR;
var TIME_PER_WEEK = 7 * TIME_PER_DAY;
var TIME_PER_MONTH = 31 * TIME_PER_DAY;
var TIME_PER_YEAR = 365 * TIME_PER_DAY;
var TIME_PER_UNIT = {
    "years": TIME_PER_YEAR,
    "months": TIME_PER_MONTH,
    "weeks": TIME_PER_WEEK,
    "days": TIME_PER_DAY,
    "hours": TIME_PER_HOUR,
    "minutes": TIME_PER_MINUTE,
    "seconds": TIME_PER_SECOND,
    "milliseconds": TIME_PER_MILLISECOND
};

function absoluteDateDiff(a, b) {
    var diff = a.getTime() - b;
    var offsetDiff = a.getTimezoneOffset() - b.getTimezoneOffset();

    return diff - (offsetDiff * TIME_PER_MINUTE);
}

function addTicks(date, ticks) {
    return new Date(date.getTime() + ticks);
}

function toDate(value) {
    var result;

    if (value instanceof Date) {
        result = value;
    } else if (value) {
        result = new Date(value);
    }

    return result;
}

function startOfWeek(date, weekStartDay) {
    if ( weekStartDay === void 0 ) weekStartDay = 0;

    var daysToSubtract = 0;
    var day = date.getDay();

    if (!isNaN(day)) {
        while (day !== weekStartDay) {
            if (day === 0) {
                day = 6;
            } else {
                day--;
            }

            daysToSubtract++;
        }
    }

    return addTicks(date, -daysToSubtract * TIME_PER_DAY);
}

function adjustDST(date, hours) {
    if (hours === 0 && date.getHours() === 23) {
        date.setHours(date.getHours() + 2);
        return true;
    }

    return false;
}

function addHours(date, hours) {
    var roundedDate = new Date(date);

    roundedDate.setMinutes(0, 0, 0);

    var tzDiff = (date.getTimezoneOffset() - roundedDate.getTimezoneOffset()) * TIME_PER_MINUTE;

    return addTicks(roundedDate, tzDiff + hours * TIME_PER_HOUR);
}

function addDuration(dateValue, value, unit, weekStartDay) {
    var result = dateValue;

    if (dateValue) {
        var date = toDate(dateValue);
        var hours = date.getHours();

        if (unit === YEARS) {
            result = new Date(date.getFullYear() + value, 0, 1);
            adjustDST(result, 0);
        } else if (unit === MONTHS) {
            result = new Date(date.getFullYear(), date.getMonth() + value, 1);
            adjustDST(result, hours);
        } else if (unit === WEEKS) {
            result = addDuration(startOfWeek(date, weekStartDay), value * 7, DAYS);
            adjustDST(result, hours);
        } else if (unit === DAYS) {
            result = new Date(date.getFullYear(), date.getMonth(), date.getDate() + value);
            adjustDST(result, hours);
        } else if (unit === HOURS) {
            result = addHours(date, value);
        } else if (unit === MINUTES) {
            result = addTicks(date, value * TIME_PER_MINUTE);

            if (result.getSeconds() > 0) {
                result.setSeconds(0);
            }
        } else if (unit === SECONDS) {
            result = addTicks(date, value * TIME_PER_SECOND);
        } else if (unit === MILLISECONDS) {
            result = addTicks(date, value);
        }

        if (unit !== MILLISECONDS && result.getMilliseconds() > 0) {
            result.setMilliseconds(0);
        }
    }

    return result;
}

function floorDate(date, unit, weekStartDay) {
    return addDuration(toDate(date), 0, unit, weekStartDay);
}

function ceilDate(dateValue, unit, weekStartDay) {
    var date = toDate(dateValue);

    if (date && floorDate(date, unit, weekStartDay).getTime() === date.getTime()) {
        return date;
    }

    return addDuration(date, 1, unit, weekStartDay);
}

function dateComparer(a, b) {
    if (a && b) {
        return a.getTime() - b.getTime();
    }

    return -1;
}

function dateDiff(a, b) {
    return a.getTime() - b;
}

function toTime(value) {
    if (isArray(value)) {
        var result = [];
        for (var idx = 0; idx < value.length; idx++) {
            result.push(toTime(value[idx]));
        }

        return result;
    } else if (value) {
        return toDate(value).getTime();
    }
}

function dateEquals(a, b) {
    if (a && b) {
        return toTime(a) === toTime(b);
    }

    return a === b;
}

function timeIndex(date, start, baseUnit) {
    return absoluteDateDiff(date, start) / TIME_PER_UNIT[baseUnit];
}

function dateIndex(value, start, baseUnit, baseUnitStep) {
    var date = toDate(value);
    var startDate = toDate(start);
    var index;

    if (baseUnit === MONTHS) {
        index = (date.getMonth() - startDate.getMonth() + (date.getFullYear() - startDate.getFullYear()) * 12) +
            timeIndex(date, new Date(date.getFullYear(), date.getMonth()), DAYS) / new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    } else if (baseUnit === YEARS) {
        index = date.getFullYear() - startDate.getFullYear() + dateIndex(date, new Date(date.getFullYear(), 0), MONTHS, 1) / 12;
    } else if (baseUnit === DAYS || baseUnit === WEEKS) {
        index = timeIndex(date, startDate, baseUnit);
    } else {
        index = dateDiff(date, start) / TIME_PER_UNIT[baseUnit];
    }

    return index / baseUnitStep;
}

function duration(a, b, unit) {
    var diff;

    if (unit === YEARS) {
        diff = b.getFullYear() - a.getFullYear();
    } else if (unit === MONTHS) {
        diff = duration(a, b, YEARS) * 12 + b.getMonth() - a.getMonth();
    } else if (unit === DAYS) {
        diff = Math.floor(dateDiff(b, a) / TIME_PER_DAY);
    } else {
        diff = Math.floor(dateDiff(b, a) / TIME_PER_UNIT[unit]);
    }

    return diff;
}

function lteDateIndex(date, sortedDates) {
    var low = 0;
    var high = sortedDates.length - 1;
    var index;

    while (low <= high) {
        index = Math.floor((low + high) / 2);
        var currentDate = sortedDates[index];

        if (currentDate < date) {
            low = index + 1;
            continue;
        }

        if (currentDate > date) {
            high = index - 1;
            continue;
        }

        while (dateEquals(sortedDates[index - 1], date)) {
            index--;
        }

        return index;
    }

    if (sortedDates[index] <= date) {
        return index;
    }

    return index - 1;
}

function parseDate(intlService, date) {
    var result;
    if (isString(date)) {
        result = intlService.parseDate(date) || toDate(date);
    } else {
        result = toDate(date);
    }
    return result;
}

function parseDates(intlService, dates) {
    if (isArray(dates)) {
        var result = [];
        for (var idx = 0; idx < dates.length; idx++) {
            result.push(parseDate(intlService, dates[idx]));
        }

        return result;
    }

    return parseDate(intlService, dates);
}

var COORDINATE_LIMIT = 300000;

var DateLabelFormats = {
    seconds: "HH:mm:ss",
    minutes: "HH:mm",
    hours: "HH:mm",
    days: "M/d",
    weeks: "M/d",
    months: "MMM 'yy",
    years: "yyyy"
};

var ZERO_THRESHOLD = 0.2;

var AUTO = "auto";
var BASE_UNITS = [
    MILLISECONDS, SECONDS, MINUTES, HOURS, DAYS, WEEKS, MONTHS, YEARS
];
var FIT = "fit";

var DateCategoryAxis = (function (CategoryAxis$$1) {
    function DateCategoryAxis(axisOptions, chartService) {
        CategoryAxis$$1.call(this, axisOptions, chartService);

        var intlService = chartService.intl;
        var options = this.options;

        options = deepExtend({
            roundToBaseUnit: true
        }, options, {
            categories: parseDates(intlService, options.categories),
            min: parseDate(intlService, options.min),
            max: parseDate(intlService, options.max)
        });

        options.userSetBaseUnit = options.userSetBaseUnit || options.baseUnit;
        options.userSetBaseUnitStep = options.userSetBaseUnitStep || options.baseUnitStep;

        if (options.categories && options.categories.length > 0) {
            var baseUnit = (options.baseUnit || "").toLowerCase();
            var useDefault = baseUnit !== FIT && !inArray(baseUnit, BASE_UNITS);

            if (useDefault) {
                options.baseUnit = this.defaultBaseUnit(options);
            }

            if (baseUnit === FIT || options.baseUnitStep === AUTO) {
                this.autoBaseUnit(options);
            }

            this._groupsStart = addDuration(options.categories[0], 0, options.baseUnit, options.weekStartDay);

            this.groupCategories(options);
        } else {
            options.baseUnit = options.baseUnit || DAYS;
        }

        this.options = options;
    }

    if ( CategoryAxis$$1 ) DateCategoryAxis.__proto__ = CategoryAxis$$1;
    DateCategoryAxis.prototype = Object.create( CategoryAxis$$1 && CategoryAxis$$1.prototype );
    DateCategoryAxis.prototype.constructor = DateCategoryAxis;

    DateCategoryAxis.prototype._initCategories = function _initCategories () {};

    DateCategoryAxis.prototype.shouldRenderNote = function shouldRenderNote (value) {
        var range = this.range();
        var categories = this.options.categories || [];

        return dateComparer(value, range.min) >= 0 && dateComparer(value, range.max) <= 0 && categories.length;
    };

    DateCategoryAxis.prototype.parseNoteValue = function parseNoteValue (value) {
        return parseDate(this.chartService.intl, value);
    };

    DateCategoryAxis.prototype.noteSlot = function noteSlot (value) {
        return this.getSlot(value);
    };

    DateCategoryAxis.prototype.translateRange = function translateRange (delta) {
        var options = this.options;
        var baseUnit = options.baseUnit;
        var weekStartDay = options.weekStartDay;
        var vertical = options.vertical;
        var lineBox = this.lineBox();
        var size = vertical ? lineBox.height() : lineBox.width();
        var range = this.range();
        var scale = size / (range.max - range.min);
        var offset = round(delta / scale, DEFAULT_PRECISION);

        if (range.min && range.max) {
            var from = addTicks(options.min || range.min, offset);
            var to = addTicks(options.max || range.max, offset);

            range = {
                min: addDuration(from, 0, baseUnit, weekStartDay),
                max: addDuration(to, 0, baseUnit, weekStartDay)
            };
        }

        return range;
    };

    DateCategoryAxis.prototype.scaleRange = function scaleRange (delta) {
        var rounds = Math.abs(delta);
        var result = this.range();
        var from = result.min;
        var to = result.max;

        if (from && to) {
            while (rounds--) {
                var range = dateDiff(from, to);
                var step = Math.round(range * 0.1);
                if (delta < 0) {
                    from = addTicks(from, step);
                    to = addTicks(to, -step);
                } else {
                    from = addTicks(from, -step);
                    to = addTicks(to, step);
                }
            }

            result = { min: from, max: to };
        }

        return result;
    };

    DateCategoryAxis.prototype.defaultBaseUnit = function defaultBaseUnit (options) {
        var categories = options.categories;
        var count = defined(categories) ? categories.length : 0;
        var minDiff = MAX_VALUE;
        var lastCategory, unit;

        for (var categoryIx = 0; categoryIx < count; categoryIx++) {
            var category = categories[categoryIx];

            if (category && lastCategory) {
                var diff = absoluteDateDiff(category, lastCategory);
                if (diff > 0) {
                    minDiff = Math.min(minDiff, diff);

                    if (minDiff >= TIME_PER_YEAR) {
                        unit = YEARS;
                    } else if (minDiff >= TIME_PER_MONTH - TIME_PER_DAY * 3) {
                        unit = MONTHS;
                    } else if (minDiff >= TIME_PER_WEEK) {
                        unit = WEEKS;
                    } else if (minDiff >= TIME_PER_DAY) {
                        unit = DAYS;
                    } else if (minDiff >= TIME_PER_HOUR) {
                        unit = HOURS;
                    } else if (minDiff >= TIME_PER_MINUTE) {
                        unit = MINUTES;
                    } else {
                        unit = SECONDS;
                    }
                }
            }

            lastCategory = category;
        }

        return unit || DAYS;
    };

    DateCategoryAxis.prototype._categoryRange = function _categoryRange (categories) {
        var range = categories._range;
        if (!range) {
            range = categories._range = sparseArrayLimits(categories);
        }

        return range;
    };

    DateCategoryAxis.prototype.totalRange = function totalRange () {
        return {
            min: 0,
            max: this.options.categories.length
        };
    };

    DateCategoryAxis.prototype.rangeIndices = function rangeIndices () {
        var options = this.options;
        var categories = options.categories;
        var baseUnit = options.baseUnit;
        var baseUnitStep = options.baseUnitStep || 1;
        var categoryLimits = this.categoriesRange();
        var min = toDate(options.min || categoryLimits.min);
        var max = toDate(options.max || categoryLimits.max);
        var minIdx = 0, maxIdx = 0;

        if (categories.length) {
            minIdx = dateIndex(min, categories[0], baseUnit, baseUnitStep);
            maxIdx = dateIndex(max, categories[0], baseUnit, baseUnitStep);

            if (options.roundToBaseUnit) {
                minIdx = Math.floor(minIdx);
                maxIdx = options.justified ? Math.floor(maxIdx) : Math.ceil(maxIdx);
            }
        }

        return { min: minIdx, max: maxIdx };
    };

    DateCategoryAxis.prototype.labelsRange = function labelsRange () {
        var options = this.options;
        var labelOptions = options.labels;
        var range = this.rangeIndices();
        var min = Math.floor(range.min);
        var max = Math.ceil(range.max);

        return {
            min: min + labelOptions.skip,
            max: options.categories.length ? max + (options.justified ? 1 : 0) : 0
        };
    };

    DateCategoryAxis.prototype.categoriesRange = function categoriesRange () {
        var options = this.options;
        var range = this._categoryRange(options.srcCategories || options.categories);

        var max = toDate(range.max);
        if (!options.justified && dateEquals(max, this._roundToTotalStep(max, options, false))) {
            max = this._roundToTotalStep(max, options, true, true);
        }
        return {
            min: toDate(range.min),
            max: max
        };
    };

    DateCategoryAxis.prototype.currentRange = function currentRange () {
        var options = this.options;
        var round$$1 = options.roundToBaseUnit !== false;
        var totalRange = this.categoriesRange();
        var min = options.min;
        var max = options.max;

        if (!min) {
            min = round$$1 ? this._roundToTotalStep(totalRange.min, options, false) : totalRange.min;
        }

        if (!max) {
            max = round$$1 ? this._roundToTotalStep(totalRange.max, options, !options.justified) : totalRange.max;
        }

        return {
            min: min,
            max: max
        };
    };

    DateCategoryAxis.prototype.datesRange = function datesRange () {
        var range = this._categoryRange(this.options.srcCategories || this.options.categories);
        return {
            min: toDate(range.min),
            max: toDate(range.max)
        };
    };

    DateCategoryAxis.prototype.pan = function pan (delta) {
        var options = this.options;
        var lineBox = this.lineBox();
        var size = options.vertical ? lineBox.height() : lineBox.width();
        var ref = this.currentRange();
        var min = ref.min;
        var max = ref.max;
        var totalLimits = this.totalLimits();
        var scale = size / (max - min);
        var offset = round(delta / scale, DEFAULT_PRECISION);
        var from = addTicks(min, offset);
        var to = addTicks(max, offset);

        var panRange = this.limitRange(toTime(from), toTime(to), toTime(totalLimits.min), toTime(totalLimits.max), offset);

        if (panRange) {
            panRange.min = toDate(panRange.min);
            panRange.max = toDate(panRange.max);
            panRange.baseUnit = options.baseUnit;
            panRange.baseUnitStep = options.baseUnitStep || 1;
            panRange.userSetBaseUnit = options.userSetBaseUnit;
            panRange.userSetBaseUnitStep = options.userSetBaseUnitStep;

            return panRange;
        }
    };

    DateCategoryAxis.prototype.pointsRange = function pointsRange (start, end) {
        var pointsRange = CategoryAxis$$1.prototype.pointsRange.call(this, start, end);
        var datesRange = this.currentRange();
        var indicesRange = this.rangeIndices();
        var scale = dateDiff(datesRange.max, datesRange.min) / (indicesRange.max - indicesRange.min);
        var options = this.options;

        var min = addTicks(datesRange.min, pointsRange.min * scale);
        var max = addTicks(datesRange.min, pointsRange.max * scale);

        return {
            min: min,
            max: max,
            baseUnit: options.userSetBaseUnit,
            baseUnitStep: options.userSetBaseUnitStep
        };
    };

    DateCategoryAxis.prototype.zoomRange = function zoomRange (delta) {
        var options = this.options;
        var totalLimits = this.totalLimits();
        var weekStartDay = options.weekStartDay;
        var baseUnit = options.baseUnit;
        var baseUnitStep = options.baseUnitStep || 1;
        var ref = this.currentRange();
        var rangeMin = ref.min;
        var rangeMax = ref.max;
        var min = addDuration(rangeMin, delta * baseUnitStep, baseUnit, weekStartDay);
        var max = addDuration(rangeMax, -delta * baseUnitStep, baseUnit, weekStartDay);

        if (options.userSetBaseUnit === FIT) {
            var autoBaseUnitSteps = options.autoBaseUnitSteps;
            var maxDateGroups = options.maxDateGroups;

            var maxDiff = last(autoBaseUnitSteps[baseUnit]) * maxDateGroups * TIME_PER_UNIT[baseUnit];
            var rangeDiff = dateDiff(rangeMax, rangeMin);
            var diff = dateDiff(max, min);
            var baseUnitIndex = BASE_UNITS.indexOf(baseUnit);
            var autoBaseUnitStep, ticks;

            if (diff < TIME_PER_UNIT[baseUnit] && baseUnit !== MILLISECONDS) {
                baseUnit = BASE_UNITS[baseUnitIndex - 1];
                autoBaseUnitStep = last(autoBaseUnitSteps[baseUnit]);
                ticks = (rangeDiff - (maxDateGroups - 1) * autoBaseUnitStep * TIME_PER_UNIT[baseUnit]) / 2;
                min = addTicks(rangeMin, ticks);
                max = addTicks(rangeMax, -ticks);

            } else if (diff > maxDiff && baseUnit !== YEARS) {
                var stepIndex = 0;

                do {
                    baseUnitIndex++;
                    baseUnit = BASE_UNITS[baseUnitIndex];
                    stepIndex = 0;
                    ticks = 2 * TIME_PER_UNIT[baseUnit];
                    do {
                        autoBaseUnitStep = autoBaseUnitSteps[baseUnit][stepIndex];
                        stepIndex++;
                    } while (stepIndex < autoBaseUnitSteps[baseUnit].length && ticks * autoBaseUnitStep < rangeDiff);
                } while (baseUnit !== YEARS && ticks * autoBaseUnitStep < rangeDiff);

                ticks = (ticks * autoBaseUnitStep - rangeDiff) / 2;
                if (ticks > 0) {
                    min = addTicks(rangeMin, -ticks);
                    max = addTicks(rangeMax, ticks);
                    min = addTicks(min, limitValue(max, totalLimits.min, totalLimits.max) - max);
                    max = addTicks(max, limitValue(min, totalLimits.min, totalLimits.max) - min);
                }
            }
        }

        min = toDate(limitValue(min, totalLimits.min, totalLimits.max));
        max = toDate(limitValue(max, totalLimits.min, totalLimits.max));

        if (min && max && dateDiff(max, min) > 0) {
            return {
                min: min,
                max: max,
                baseUnit: options.userSetBaseUnit,
                baseUnitStep: options.userSetBaseUnitStep
            };
        }
    };

    DateCategoryAxis.prototype.totalLimits = function totalLimits () {
        var options = this.options;
        var datesRange = this.datesRange();

        var min = this._roundToTotalStep(toDate(datesRange.min), options, false);
        var max = datesRange.max;

        if (!options.justified) {
            max = this._roundToTotalStep(max, options, true, dateEquals(max, this._roundToTotalStep(max, options, false)));
        }

        return {
            min: min,
            max: max
        };
    };

    DateCategoryAxis.prototype.range = function range (rangeOptions) {
        var options = rangeOptions || this.options;

        var categories = options.categories;
        var autoUnit = options.baseUnit === FIT;
        var baseUnit = autoUnit ? BASE_UNITS[0] : options.baseUnit;
        var baseUnitStep = options.baseUnitStep || 1;
        var stepOptions = {
            baseUnit: baseUnit,
            baseUnitStep: baseUnitStep,
            weekStartDay: options.weekStartDay
        };
        var categoryLimits = this._categoryRange(categories);
        var min = toDate(options.min || categoryLimits.min);
        var max = toDate(options.max || categoryLimits.max);

        return {
            min: this._roundToTotalStep(min, stepOptions, false),
            max: this._roundToTotalStep(max, stepOptions, true, true)
        };
    };

    DateCategoryAxis.prototype.autoBaseUnit = function autoBaseUnit (options) {
        var categoryLimits = this._categoryRange(options.categories);
        var span = toDate(options.max || categoryLimits.max) - toDate(options.min || categoryLimits.min);
        var maxDateGroups = options.maxDateGroups || this.options.maxDateGroups;
        var autoUnit = options.baseUnit === FIT;
        var autoUnitIx = 0;
        var baseUnit = autoUnit ? BASE_UNITS[autoUnitIx++] : options.baseUnit;
        var units = span / TIME_PER_UNIT[baseUnit];
        var totalUnits = units;
        var autoBaseUnitSteps = deepExtend(
            {}, this.options.autoBaseUnitSteps, options.autoBaseUnitSteps
        );
        var unitSteps, step, nextStep;

        while (!step || units >= maxDateGroups) {
            unitSteps = unitSteps || autoBaseUnitSteps[baseUnit].slice(0);
            nextStep = unitSteps.shift();

            if (nextStep) {
                step = nextStep;
                units = totalUnits / step;
            } else if (baseUnit === last(BASE_UNITS)) {
                step = Math.ceil(totalUnits / maxDateGroups);
                break;
            } else if (autoUnit) {
                baseUnit = BASE_UNITS[autoUnitIx++] || last(BASE_UNITS);
                totalUnits = span / TIME_PER_UNIT[baseUnit];
                unitSteps = null;
            } else {
                if (units > maxDateGroups) {
                    step = Math.ceil(totalUnits / maxDateGroups);
                }
                break;
            }
        }

        options.baseUnitStep = step;
        options.baseUnit = baseUnit;
    };

    DateCategoryAxis.prototype.groupCategories = function groupCategories (options) {
        var categories = options.categories;
        var baseUnit = options.baseUnit;
        var baseUnitStep = options.baseUnitStep || 1;
        var maxCategory = toDate(sparseArrayLimits(categories).max);
        var ref = this.range(options);
        var min = ref.min;
        var max = ref.max;
        var groups = [];
        var nextDate;

        for (var date = min; date < max; date = nextDate) {
            groups.push(date);

            nextDate = addDuration(date, baseUnitStep, baseUnit, options.weekStartDay);
            if (nextDate > maxCategory && !options.max) {
                break;
            }
        }

        options.srcCategories = categories;
        options.categories = groups;
    };

    DateCategoryAxis.prototype._roundToTotalStep = function _roundToTotalStep (value, axisOptions, upper, roundToNext) {
        var options = axisOptions || this.options;
        var baseUnit = options.baseUnit;
        var baseUnitStep = options.baseUnitStep || 1;
        var start = this._groupsStart;

        if (start) {
            var step = dateIndex(value, start, baseUnit, baseUnitStep);
            var roundedStep = upper ? Math.ceil(step) : Math.floor(step);
            if (roundToNext) {
                roundedStep++;
            }
            return addDuration(start, roundedStep * baseUnitStep, baseUnit, options.weekStartDay);
        }

        return addDuration(value, upper ? baseUnitStep : 0, baseUnit, options.weekStartDay);
    };

    DateCategoryAxis.prototype.createAxisLabel = function createAxisLabel (index, labelOptions) {
        var options = this.options;
        var dataItem = options.dataItems ? options.dataItems[index] : null;
        var date = options.categories[index];
        var baseUnit = options.baseUnit;
        var unitFormat = labelOptions.dateFormats[baseUnit];
        var visible = true;

        if (options.justified) {
            var roundedDate = floorDate(date, baseUnit, options.weekStartDay);
            visible = dateEquals(roundedDate, date);
        } else if (!options.roundToBaseUnit) {
            visible = !dateEquals(this.range().max, date);
        }

        if (visible) {
            labelOptions.format = labelOptions.format || unitFormat;
            var text = this.axisLabelText(date, dataItem, labelOptions);
            if (text) {
                return new AxisLabel(date, text, index, dataItem, labelOptions);
            }
        }
    };

    DateCategoryAxis.prototype.categoryIndex = function categoryIndex (value) {
        var options = this.options;
        var categories = options.categories;
        var index = -1;

        if (categories.length) {
            index = Math.floor(dateIndex(toDate(value), categories[0], options.baseUnit, options.baseUnitStep || 1));
        }

        return index;
    };

    DateCategoryAxis.prototype.getSlot = function getSlot (a, b, limit) {
        var start = a;
        var end = b;

        if (typeof start === OBJECT) {
            start = this.categoryIndex(start);
        }

        if (typeof end === OBJECT) {
            end = this.categoryIndex(end);
        }

        return CategoryAxis$$1.prototype.getSlot.call(this, start, end, limit);
    };

    DateCategoryAxis.prototype.valueRange = function valueRange () {
        var options = this.options;
        var range = this._categoryRange(options.srcCategories || options.categories);

        return {
            min: toDate(range.min),
            max: toDate(range.max)
        };
    };

    return DateCategoryAxis;
}(CategoryAxis));

setDefaultOptions(DateCategoryAxis, {
    type: DATE,
    labels: {
        dateFormats: DateLabelFormats
    },
    autoBaseUnitSteps: {
        milliseconds: [ 1, 10, 100 ],
        seconds: [ 1, 2, 5, 15, 30 ],
        minutes: [ 1, 2, 5, 15, 30 ],
        hours: [ 1, 2, 3 ],
        days: [ 1, 2, 3 ],
        weeks: [ 1, 2 ],
        months: [ 1, 2, 3, 6 ],
        years: [ 1, 2, 3, 5, 10, 25, 50 ]
    },
    maxDateGroups: 10
});

function autoMajorUnit(min, max) {
    var diff = round(max - min, DEFAULT_PRECISION - 1);

    if (diff === 0) {
        if (max === 0) {
            return 0.1;
        }

        diff = Math.abs(max);
    }

    var scale = Math.pow(10, Math.floor(Math.log(diff) / Math.log(10)));
    var relativeValue = round((diff / scale), DEFAULT_PRECISION);
    var scaleMultiplier = 1;

    if (relativeValue < 1.904762) {
        scaleMultiplier = 0.2;
    } else if (relativeValue < 4.761904) {
        scaleMultiplier = 0.5;
    } else if (relativeValue < 9.523809) {
        scaleMultiplier = 1;
    } else {
        scaleMultiplier = 2;
    }

    return round(scale * scaleMultiplier, DEFAULT_PRECISION);
}

function autoAxisMin(min, max, narrow) {
    if (!min && !max) {
        return 0;
    }

    var axisMin;

    if (min >= 0 && max >= 0) {
        var minValue = min === max ? 0 : min;

        var diff = (max - minValue) / max;
        if (narrow === false || (!narrow && diff > ZERO_THRESHOLD)) {
            return 0;
        }

        axisMin = Math.max(0, minValue - ((max - minValue) / 2));
    } else {
        axisMin = min;
    }

    return axisMin;
}

function autoAxisMax(min, max, narrow) {
    if (!min && !max) {
        return 1;
    }

    var axisMax;

    if (min <= 0 && max <= 0) {
        var maxValue = min === max ? 0 : max;

        var diff = Math.abs((maxValue - min) / maxValue);
        if (narrow === false || (!narrow && diff > ZERO_THRESHOLD)) {
            return 0;
        }

        axisMax = Math.min(0, maxValue - ((min - maxValue) / 2));
    } else {
        axisMax = max;
    }

    return axisMax;
}

function floor(value, step) {
    return round(Math.floor(value / step) * step, DEFAULT_PRECISION);
}

function ceil(value, step) {
    return round(Math.ceil(value / step) * step, DEFAULT_PRECISION);
}

function limitCoordinate(value) {
    return Math.max(Math.min(value, COORDINATE_LIMIT), -COORDINATE_LIMIT);
}

var MIN_VALUE_RANGE = Math.pow(10, -DEFAULT_PRECISION + 1);

var NumericAxis = (function (Axis$$1) {
    function NumericAxis(seriesMin, seriesMax, options, chartService) {
        var autoOptions = autoAxisOptions(seriesMin, seriesMax, options);
        var totalOptions = totalAxisOptions(autoOptions, options);

        Axis$$1.call(this, axisOptions(autoOptions, options), chartService);

        this.totalMin = totalOptions.min;
        this.totalMax = totalOptions.max;
        this.totalMajorUnit = totalOptions.majorUnit;
        this.seriesMin = seriesMin;
        this.seriesMax = seriesMax;
    }

    if ( Axis$$1 ) NumericAxis.__proto__ = Axis$$1;
    NumericAxis.prototype = Object.create( Axis$$1 && Axis$$1.prototype );
    NumericAxis.prototype.constructor = NumericAxis;

    NumericAxis.prototype.startValue = function startValue () {
        return 0;
    };

    NumericAxis.prototype.range = function range () {
        var options = this.options;
        return { min: options.min, max: options.max };
    };

    NumericAxis.prototype.getDivisions = function getDivisions (stepValue) {
        if (stepValue === 0) {
            return 1;
        }

        var options = this.options;
        var range = options.max - options.min;

        return Math.floor(round(range / stepValue, COORD_PRECISION)) + 1;
    };

    NumericAxis.prototype.getTickPositions = function getTickPositions (unit, skipUnit) {
        var options = this.options;
        var vertical = options.vertical;
        var reverse = options.reverse;
        var lineBox = this.lineBox();
        var lineSize = vertical ? lineBox.height() : lineBox.width();
        var range = options.max - options.min;
        var scale = lineSize / range;
        var step = unit * scale;
        var divisions = this.getDivisions(unit);
        var dir = (vertical ? -1 : 1) * (reverse ? -1 : 1);
        var startEdge = dir === 1 ? 1 : 2;
        var positions = [];
        var pos = lineBox[(vertical ? Y : X) + startEdge];
        var skipStep = 0;

        if (skipUnit) {
            skipStep = skipUnit / unit;
        }

        for (var idx = 0; idx < divisions; idx++) {
            if (idx % skipStep !== 0) {
                positions.push(round(pos, COORD_PRECISION));
            }

            pos = pos + step * dir;
        }

        return positions;
    };

    NumericAxis.prototype.getMajorTickPositions = function getMajorTickPositions () {
        return this.getTickPositions(this.options.majorUnit);
    };

    NumericAxis.prototype.getMinorTickPositions = function getMinorTickPositions () {
        return this.getTickPositions(this.options.minorUnit);
    };

    NumericAxis.prototype.getSlot = function getSlot (a, b, limit) {
        if ( limit === void 0 ) limit = false;

        var options = this.options;
        var vertical = options.vertical;
        var reverse = options.reverse;
        var valueAxis = vertical ? Y : X;
        var lineBox = this.lineBox();
        var lineStart = lineBox[valueAxis + (reverse ? 2 : 1)];
        var lineSize = vertical ? lineBox.height() : lineBox.width();
        var dir = reverse ? -1 : 1;
        var step = dir * (lineSize / (options.max - options.min));
        var slotBox = new Box(lineBox.x1, lineBox.y1, lineBox.x1, lineBox.y1);

        var start = a;
        var end = b;

        if (!defined(start)) {
            start = end || 0;
        }

        if (!defined(end)) {
            end = start || 0;
        }

        if (limit) {
            start = Math.max(Math.min(start, options.max), options.min);
            end = Math.max(Math.min(end, options.max), options.min);
        }

        var p1, p2;

        if (vertical) {
            p1 = options.max - Math.max(start, end);
            p2 = options.max - Math.min(start, end);
        } else {
            p1 = Math.min(start, end) - options.min;
            p2 = Math.max(start, end) - options.min;
        }

        slotBox[valueAxis + 1] = limitCoordinate(lineStart + step * (reverse ? p2 : p1));
        slotBox[valueAxis + 2] = limitCoordinate(lineStart + step * (reverse ? p1 : p2));

        return slotBox;
    };

    NumericAxis.prototype.getValue = function getValue (point) {
        var options = this.options;
        var vertical = options.vertical;
        var reverse = options.reverse;
        var max = Number(options.max);
        var min = Number(options.min);
        var valueAxis = vertical ? Y : X;
        var lineBox = this.lineBox();
        var lineStart = lineBox[valueAxis + (reverse ? 2 : 1)];
        var lineSize = vertical ? lineBox.height() : lineBox.width();
        var dir = reverse ? -1 : 1;
        var offset = dir * (point[valueAxis] - lineStart);
        var step = (max - min) / lineSize;
        var valueOffset = offset * step;

        if (offset < 0 || offset > lineSize) {
            return null;
        }

        var value = vertical ?
                max - valueOffset :
                min + valueOffset;

        return round(value, DEFAULT_PRECISION);
    };

    NumericAxis.prototype.translateRange = function translateRange (delta) {
        var options = this.options;
        var vertical = options.vertical;
        var reverse = options.reverse;
        var max = options.max;
        var min = options.min;
        var lineBox = this.lineBox();
        var size = vertical ? lineBox.height() : lineBox.width();
        var range = max - min;
        var scale = size / range;
        var offset = round(delta / scale, DEFAULT_PRECISION);

        if ((vertical || reverse) && !(vertical && reverse )) {
            offset = -offset;
        }

        return {
            min: min + offset,
            max: max + offset
        };
    };

    NumericAxis.prototype.scaleRange = function scaleRange (delta) {
        var options = this.options;
        var offset = -delta * options.majorUnit;

        return {
            min: options.min - offset,
            max: options.max + offset
        };
    };

    NumericAxis.prototype.labelsCount = function labelsCount () {
        return this.getDivisions(this.options.majorUnit);
    };

    NumericAxis.prototype.createAxisLabel = function createAxisLabel (index, labelOptions) {
        var options = this.options;
        var value = round(options.min + (index * options.majorUnit), DEFAULT_PRECISION);
        var text = this.axisLabelText(value, null, labelOptions);

        return new AxisLabel(value, text, index, null, labelOptions);
    };

    NumericAxis.prototype.shouldRenderNote = function shouldRenderNote (value) {
        var range = this.range();
        return range.min <= value && value <= range.max;
    };

    NumericAxis.prototype.pan = function pan (delta) {
        var range = this.translateRange(delta);
        return this.limitRange(range.min, range.max, this.totalMin, this.totalMax);
    };

    NumericAxis.prototype.pointsRange = function pointsRange (start, end) {
        var startValue = this.getValue(start);
        var endValue = this.getValue(end);
        var min = Math.min(startValue, endValue);
        var max = Math.max(startValue, endValue);

        if (this.isValidRange(min, max)) {
            return {
                min: min,
                max: max
            };
        }
    };

    NumericAxis.prototype.zoomRange = function zoomRange (delta) {
        var ref = this;
        var totalMin = ref.totalMin;
        var totalMax = ref.totalMax;
        var newRange = this.scaleRange(delta);
        var min = limitValue(newRange.min, totalMin, totalMax);
        var max = limitValue(newRange.max, totalMin, totalMax);

        if (this.isValidRange(min, max)) {
            return {
                min: min,
                max: max
            };
        }
    };

    NumericAxis.prototype.isValidRange = function isValidRange (min, max) {
        return max - min > MIN_VALUE_RANGE;
    };

    return NumericAxis;
}(Axis));

function autoAxisOptions(seriesMin, seriesMax, options) {
    var narrowRange = options.narrowRange;

    var autoMin = autoAxisMin(seriesMin, seriesMax, narrowRange);
    var autoMax = autoAxisMax(seriesMin, seriesMax, narrowRange);

    var majorUnit = autoMajorUnit(autoMin, autoMax);
    var autoOptions = {
        majorUnit: majorUnit
    };

    if (options.roundToMajorUnit !== false) {
        if (autoMin < 0 && remainderClose(autoMin, majorUnit, 1 / 3)) {
            autoMin -= majorUnit;
        }

        if (autoMax > 0 && remainderClose(autoMax, majorUnit, 1 / 3)) {
            autoMax += majorUnit;
        }
    }

    autoOptions.min = floor(autoMin, majorUnit);
    autoOptions.max = ceil(autoMax, majorUnit);

    return autoOptions;
}

function totalAxisOptions(autoOptions, options) {
    return {
        min: defined(options.min) ? Math.min(autoOptions.min, options.min) : autoOptions.min,
        max: defined(options.max) ? Math.max(autoOptions.max, options.max) : autoOptions.max,
        majorUnit: autoOptions.majorUnit
    };
}

function axisOptions(autoOptions, userOptions) {
    var options = userOptions;
    if (userOptions) {
        var userSetLimits = defined(userOptions.min) || defined(userOptions.max);
        if (userSetLimits) {
            if (userOptions.min === userOptions.max) {
                if (userOptions.min > 0) {
                    userOptions.min = 0;
                } else {
                    userOptions.max = 1;
                }
            }
        }

        if (userOptions.majorUnit) {
            autoOptions.min = floor(autoOptions.min, userOptions.majorUnit);
            autoOptions.max = ceil(autoOptions.max, userOptions.majorUnit);
        } else if (userSetLimits) {
            options = deepExtend(autoOptions, userOptions);

            // Determine an auto major unit after min/max have been set
            autoOptions.majorUnit = autoMajorUnit(options.min, options.max);
        }
    }

    autoOptions.minorUnit = (options.majorUnit || autoOptions.majorUnit) / 5;

    return deepExtend(autoOptions, options);
}

function remainderClose(value, divisor, ratio) {
    var remainder = round(Math.abs(value % divisor), DEFAULT_PRECISION);
    var threshold = divisor * (1 - ratio);

    return remainder === 0 || remainder > threshold;
}

setDefaultOptions(NumericAxis, {
    type: "numeric",
    min: 0,
    max: 1,
    vertical: true,
    majorGridLines: {
        visible: true,
        width: 1,
        color: BLACK
    },
    labels: {
        format: "#.####################"
    },
    zIndex: 1
});

var DateValueAxis = (function (Axis$$1) {
    function DateValueAxis(seriesMin, seriesMax, axisOptions, chartService) {
        var min = toDate(seriesMin);
        var max = toDate(seriesMax);

        var intlService = chartService.intl;
        var options = axisOptions || {};
        options = deepExtend(options || {}, {
            min: parseDate(intlService, options.min),
            max: parseDate(intlService, options.max),
            axisCrossingValue: parseDates(intlService, options.axisCrossingValues || options.axisCrossingValue)
        });
        options = applyDefaults$1(min, max, options);

        Axis$$1.call(this, options, chartService);

        this.seriesMin = min;
        this.seriesMax = max;
        this.totalMin = toTime(floorDate(toTime(min) - 1, options.baseUnit));
        this.totalMax = toTime(ceilDate(toTime(max) + 1, options.baseUnit));
    }

    if ( Axis$$1 ) DateValueAxis.__proto__ = Axis$$1;
    DateValueAxis.prototype = Object.create( Axis$$1 && Axis$$1.prototype );
    DateValueAxis.prototype.constructor = DateValueAxis;

    DateValueAxis.prototype.range = function range () {
        var options = this.options;
        return { min: options.min, max: options.max };
    };

    DateValueAxis.prototype.getDivisions = function getDivisions (stepValue) {
        var options = this.options;

        return Math.floor(
            duration(options.min, options.max, options.baseUnit) / stepValue + 1
        );
    };

    DateValueAxis.prototype.getTickPositions = function getTickPositions (step) {
        var options = this.options;
        var vertical = options.vertical;
        var lineBox = this.lineBox();
        var dir = (vertical ? -1 : 1) * (options.reverse ? -1 : 1);
        var startEdge = dir === 1 ? 1 : 2;
        var start = lineBox[(vertical ? Y : X) + startEdge];
        var divisions = this.getDivisions(step);
        var timeRange = dateDiff(options.max, options.min);
        var lineSize = vertical ? lineBox.height() : lineBox.width();
        var scale = lineSize / timeRange;

        var positions = [ start ];
        for (var i = 1; i < divisions; i++) {
            var date = addDuration(options.min, i * step, options.baseUnit);
            var pos = start + dateDiff(date, options.min) * scale * dir;

            positions.push(round(pos, COORD_PRECISION));
        }

        return positions;
    };

    DateValueAxis.prototype.getMajorTickPositions = function getMajorTickPositions () {
        return this.getTickPositions(this.options.majorUnit);
    };

    DateValueAxis.prototype.getMinorTickPositions = function getMinorTickPositions () {
        return this.getTickPositions(this.options.minorUnit);
    };

    DateValueAxis.prototype.getSlot = function getSlot (a, b, limit) {
        return NumericAxis.prototype.getSlot.call(
            this, toDate(a), toDate(b), limit
        );
    };

    DateValueAxis.prototype.getValue = function getValue (point) {
        var value = NumericAxis.prototype.getValue.call(this, point);

        return value !== null ? toDate(value) : null;
    };

    DateValueAxis.prototype.labelsCount = function labelsCount () {
        return this.getDivisions(this.options.majorUnit);
    };

    DateValueAxis.prototype.createAxisLabel = function createAxisLabel (index, labelOptions) {
        var options = this.options;
        var offset = index * options.majorUnit;
        var date = options.min;

        if (offset > 0) {
            date = addDuration(date, offset, options.baseUnit);
        }

        var unitFormat = labelOptions.dateFormats[options.baseUnit];
        labelOptions.format = labelOptions.format || unitFormat;

        var text = this.axisLabelText(date, null, labelOptions);
        return new AxisLabel(date, text, index, null, labelOptions);
    };

    DateValueAxis.prototype.translateRange = function translateRange (delta, exact) {
        var options = this.options;
        var baseUnit = options.baseUnit;
        var weekStartDay = options.weekStartDay;
        var lineBox = this.lineBox();
        var size = options.vertical ? lineBox.height() : lineBox.width();
        var range = this.range();
        var scale = size / dateDiff(range.max, range.min);
        var offset = round(delta / scale, DEFAULT_PRECISION);
        var from = addTicks(options.min, offset);
        var to = addTicks(options.max, offset);

        if (!exact) {
            from = addDuration(from, 0, baseUnit, weekStartDay);
            to = addDuration(to, 0, baseUnit, weekStartDay);
        }

        return {
            min: from,
            max: to
        };
    };

    DateValueAxis.prototype.scaleRange = function scaleRange (delta) {
        var ref = this.options;
        var from = ref.min;
        var to = ref.max;
        var rounds = Math.abs(delta);

        while (rounds--) {
            var range = dateDiff(from, to);
            var step = Math.round(range * 0.1);
            if (delta < 0) {
                from = addTicks(from, step);
                to = addTicks(to, -step);
            } else {
                from = addTicks(from, -step);
                to = addTicks(to, step);
            }
        }

        return { min: from, max: to };
    };

    DateValueAxis.prototype.shouldRenderNote = function shouldRenderNote (value) {
        var range = this.range();

        return dateComparer(value, range.min) >= 0 && dateComparer(value, range.max) <= 0;
    };

    DateValueAxis.prototype.pan = function pan (delta) {
        var range = this.translateRange(delta, true);
        var limittedRange = this.limitRange(toTime(range.min), toTime(range.max), this.totalMin, this.totalMax);

        if (limittedRange) {
            return {
                min: toDate(limittedRange.min),
                max: toDate(limittedRange.max)
            };
        }
    };

    DateValueAxis.prototype.pointsRange = function pointsRange (start, end) {
        var startValue = this.getValue(start);
        var endValue = this.getValue(end);
        var min = Math.min(startValue, endValue);
        var max = Math.max(startValue, endValue);

        return {
            min: toDate(min),
            max: toDate(max)
        };
    };

    DateValueAxis.prototype.zoomRange = function zoomRange (delta) {
        var range = this.scaleRange(delta);
        var min = toDate(limitValue(toTime(range.min), this.totalMin, this.totalMax));
        var max = toDate(limitValue(toTime(range.max), this.totalMin, this.totalMax));

        return {
            min: min,
            max: max
        };
    };

    return DateValueAxis;
}(Axis));

function timeUnits(delta) {
    var unit = HOURS;

    if (delta >= TIME_PER_YEAR) {
        unit = YEARS;
    } else if (delta >= TIME_PER_MONTH) {
        unit = MONTHS;
    } else if (delta >= TIME_PER_WEEK) {
        unit = WEEKS;
    } else if (delta >= TIME_PER_DAY) {
        unit = DAYS;
    }

    return unit;
}

function applyDefaults$1(seriesMin, seriesMax, options) {
    var min = options.min || seriesMin;
    var max = options.max || seriesMax;
    var baseUnit = options.baseUnit || (max && min ? timeUnits(absoluteDateDiff(max, min)) : HOURS);
    var baseUnitTime = TIME_PER_UNIT[baseUnit];
    var autoMin = floorDate(toTime(min) - 1, baseUnit) || toDate(max);
    var autoMax = ceilDate(toTime(max) + 1, baseUnit);
    var userMajorUnit = options.majorUnit ? options.majorUnit : undefined;
    var majorUnit = userMajorUnit || ceil(
                        autoMajorUnit(autoMin.getTime(), autoMax.getTime()),
                        baseUnitTime
                    ) / baseUnitTime;
    var actualUnits = duration(autoMin, autoMax, baseUnit);
    var totalUnits = ceil(actualUnits, majorUnit);
    var unitsToAdd = totalUnits - actualUnits;
    var head = Math.floor(unitsToAdd / 2);
    var tail = unitsToAdd - head;

    if (!options.baseUnit) {
        delete options.baseUnit;
    }

    options.baseUnit = options.baseUnit || baseUnit;
    options.min = options.min || addDuration(autoMin, -head, baseUnit);
    options.max = options.max || addDuration(autoMax, tail, baseUnit);
    options.minorUnit = options.minorUnit || majorUnit / 5;
    options.majorUnit = majorUnit;

    return options;
}

setDefaultOptions(DateValueAxis, {
    type: DATE,
    majorGridLines: {
        visible: true,
        width: 1,
        color: BLACK
    },
    labels: {
        dateFormats: DateLabelFormats
    }
});

var DEFAULT_MAJOR_UNIT = 10;

var LogarithmicAxis = (function (Axis$$1) {
    function LogarithmicAxis(seriesMin, seriesMax, options, chartService) {

        var axisOptions = deepExtend({ majorUnit: DEFAULT_MAJOR_UNIT, min: seriesMin, max: seriesMax }, options);
        var base = axisOptions.majorUnit;
        var autoMax = autoAxisMax$1(seriesMax, base);
        var autoMin = autoAxisMin$1(seriesMin, seriesMax, axisOptions);
        var range = initRange(autoMin, autoMax, axisOptions, options);

        axisOptions.max = range.max;
        axisOptions.min = range.min;
        axisOptions.minorUnit = options.minorUnit || round(base - 1, DEFAULT_PRECISION);

        Axis$$1.call(this, axisOptions, chartService);

        this.totalMin = defined(options.min) ? Math.min(autoMin, options.min) : autoMin;
        this.totalMax = defined(options.max) ? Math.max(autoMax, options.max) : autoMax;
        this.logMin = round(log(range.min, base), DEFAULT_PRECISION);
        this.logMax = round(log(range.max, base), DEFAULT_PRECISION);
        this.seriesMin = seriesMin;
        this.seriesMax = seriesMax;

        this.createLabels();
    }

    if ( Axis$$1 ) LogarithmicAxis.__proto__ = Axis$$1;
    LogarithmicAxis.prototype = Object.create( Axis$$1 && Axis$$1.prototype );
    LogarithmicAxis.prototype.constructor = LogarithmicAxis;

    LogarithmicAxis.prototype.startValue = function startValue () {
        return this.options.min;
    };

    LogarithmicAxis.prototype.getSlot = function getSlot (a, b, limit) {
        var ref = this;
        var options = ref.options;
        var logMin = ref.logMin;
        var logMax = ref.logMax;
        var reverse = options.reverse;
        var vertical = options.vertical;
        var base = options.majorUnit;
        var valueAxis = vertical ? Y : X;
        var lineBox = this.lineBox();
        var lineStart = lineBox[valueAxis + (reverse ? 2 : 1)];
        var lineSize = vertical ? lineBox.height() : lineBox.width();
        var dir = reverse ? -1 : 1;
        var step = dir * (lineSize / (logMax - logMin));
        var slotBox = new Box(lineBox.x1, lineBox.y1, lineBox.x1, lineBox.y1);
        var start = a;
        var end = b;

        if (!defined(start)) {
            start = end || 1;
        }

        if (!defined(end)) {
            end = start || 1;
        }

        if (start <= 0 || end <= 0) {
            return null;
        }

        if (limit) {
            start = Math.max(Math.min(start, options.max), options.min);
            end = Math.max(Math.min(end, options.max), options.min);
        }

        start = log(start, base);
        end = log(end, base);

        var p1, p2;

        if (vertical) {
            p1 = logMax - Math.max(start, end);
            p2 = logMax - Math.min(start, end);
        } else {
            p1 = Math.min(start, end) - logMin;
            p2 = Math.max(start, end) - logMin;
        }

        slotBox[valueAxis + 1] = limitCoordinate(lineStart + step * (reverse ? p2 : p1));
        slotBox[valueAxis + 2] = limitCoordinate(lineStart + step * (reverse ? p1 : p2));

        return slotBox;
    };

    LogarithmicAxis.prototype.getValue = function getValue (point) {
        var ref = this;
        var options = ref.options;
        var logMin = ref.logMin;
        var logMax = ref.logMax;
        var reverse = options.reverse;
        var vertical = options.vertical;
        var base = options.majorUnit;
        var lineBox = this.lineBox();
        var dir = vertical === reverse ? 1 : -1;
        var startEdge = dir === 1 ? 1 : 2;
        var lineSize = vertical ? lineBox.height() : lineBox.width();
        var step = ((logMax - logMin) / lineSize);
        var valueAxis = vertical ? Y : X;
        var lineStart = lineBox[valueAxis + startEdge];
        var offset = dir * (point[valueAxis] - lineStart);
        var valueOffset = offset * step;

        if (offset < 0 || offset > lineSize) {
            return null;
        }

        var value = logMin + valueOffset;

        return round(Math.pow(base, value), DEFAULT_PRECISION);
    };

    LogarithmicAxis.prototype.range = function range () {
        var options = this.options;
        return { min: options.min, max: options.max };
    };

    LogarithmicAxis.prototype.scaleRange = function scaleRange (delta) {
        var base = this.options.majorUnit;
        var offset = -delta;

        return {
            min: Math.pow(base, this.logMin - offset),
            max: Math.pow(base, this.logMax + offset)
        };
    };

    LogarithmicAxis.prototype.translateRange = function translateRange (delta) {
        var ref = this;
        var options = ref.options;
        var logMin = ref.logMin;
        var logMax = ref.logMax;
        var reverse = options.reverse;
        var vertical = options.vertical;
        var base = options.majorUnit;
        var lineBox = this.lineBox();
        var size = vertical ? lineBox.height() : lineBox.width();
        var scale = size / (logMax - logMin);
        var offset = round(delta / scale, DEFAULT_PRECISION);

        if ((vertical || reverse) && !(vertical && reverse )) {
            offset = -offset;
        }

        return {
            min: Math.pow(base, logMin + offset),
            max: Math.pow(base, logMax + offset)
        };
    };

    LogarithmicAxis.prototype.labelsCount = function labelsCount () {
        var floorMax = Math.floor(this.logMax);
        var count = Math.floor(floorMax - this.logMin) + 1;

        return count;
    };

    LogarithmicAxis.prototype.getMajorTickPositions = function getMajorTickPositions () {
        var ticks = [];

        this.traverseMajorTicksPositions(function (position) {
            ticks.push(position);
        }, { step: 1, skip: 0 });

        return ticks;
    };

    LogarithmicAxis.prototype.createTicks = function createTicks (lineGroup) {
        var options = this.options;
        var majorTicks = options.majorTicks;
        var minorTicks = options.minorTicks;
        var vertical = options.vertical;
        var mirror = options.labels.mirror;
        var lineBox = this.lineBox();
        var ticks = [];
        var tickLineOptions = {
            // TODO
            // _alignLines: options._alignLines,
            vertical: vertical
        };

        function render(tickPosition, tickOptions) {
            tickLineOptions.tickX = mirror ? lineBox.x2 : lineBox.x2 - tickOptions.size;
            tickLineOptions.tickY = mirror ? lineBox.y1 - tickOptions.size : lineBox.y1;
            tickLineOptions.position = tickPosition;

            lineGroup.append(createAxisTick(tickLineOptions, tickOptions));
        }

        if (majorTicks.visible) {
            this.traverseMajorTicksPositions(render, majorTicks);
        }

        if (minorTicks.visible) {
            this.traverseMinorTicksPositions(render, minorTicks);
        }

        return ticks;
    };

    LogarithmicAxis.prototype.createGridLines = function createGridLines (altAxis) {
        var options = this.options;
        var minorGridLines = options.minorGridLines;
        var majorGridLines = options.majorGridLines;
        var vertical = options.vertical;
        var lineBox = altAxis.lineBox();
        var lineOptions = {
            lineStart: lineBox[vertical ? "x1" : "y1"],
            lineEnd: lineBox[vertical ? "x2" : "y2"],
            vertical: vertical
        };
        var majorTicks = [];

        var container = this.gridLinesVisual();
        function render(tickPosition, gridLine) {
            if (!inArray(tickPosition, majorTicks)) {
                lineOptions.position = tickPosition;
                container.append(createAxisGridLine(lineOptions, gridLine));

                majorTicks.push(tickPosition);
            }
        }

        if (majorGridLines.visible) {
            this.traverseMajorTicksPositions(render, majorGridLines);
        }

        if (minorGridLines.visible) {
            this.traverseMinorTicksPositions(render, minorGridLines);
        }

        return container.children;
    };

    LogarithmicAxis.prototype.traverseMajorTicksPositions = function traverseMajorTicksPositions (callback, tickOptions) {
        var ref = this._lineOptions();
        var lineStart = ref.lineStart;
        var step = ref.step;
        var ref$1 = this;
        var logMin = ref$1.logMin;
        var logMax = ref$1.logMax;

        for (var power = Math.ceil(logMin) + tickOptions.skip; power <= logMax; power += tickOptions.step) {
            var position = round(lineStart + step * (power - logMin), DEFAULT_PRECISION);
            callback(position, tickOptions);
        }
    };

    LogarithmicAxis.prototype.traverseMinorTicksPositions = function traverseMinorTicksPositions (callback, tickOptions) {
        var this$1 = this;

        var ref = this.options;
        var min = ref.min;
        var max = ref.max;
        var minorUnit = ref.minorUnit;
        var base = ref.majorUnit;
        var ref$1 = this._lineOptions();
        var lineStart = ref$1.lineStart;
        var step = ref$1.step;
        var ref$2 = this;
        var logMin = ref$2.logMin;
        var logMax = ref$2.logMax;
        var start = Math.floor(logMin);

        for (var power = start; power < logMax; power++) {
            var minorOptions = this$1._minorIntervalOptions(power);
            for (var idx = tickOptions.skip; idx < minorUnit; idx += tickOptions.step) {
                var value = minorOptions.value + idx * minorOptions.minorStep;
                if (value > max) {
                    break;
                }
                if (value >= min) {
                    var position = round(lineStart + step * (log(value, base) - logMin), DEFAULT_PRECISION);
                    callback(position, tickOptions);
                }
            }
        }
    };

    LogarithmicAxis.prototype.createAxisLabel = function createAxisLabel (index, labelOptions) {
        var power = Math.ceil(this.logMin + index);
        var value = Math.pow(this.options.majorUnit, power);
        var text = this.axisLabelText(value, null, labelOptions);

        return new AxisLabel(value, text, index, null, labelOptions);
    };

    LogarithmicAxis.prototype.shouldRenderNote = function shouldRenderNote (value) {
        var range = this.range();
        return range.min <= value && value <= range.max;
    };

    LogarithmicAxis.prototype.pan = function pan (delta) {
        var range = this.translateRange(delta);
        return this.limitRange(range.min, range.max, this.totalMin, this.totalMax, -delta);
    };

    LogarithmicAxis.prototype.pointsRange = function pointsRange (start, end) {
        var startValue = this.getValue(start);
        var endValue = this.getValue(end);
        var min = Math.min(startValue, endValue);
        var max = Math.max(startValue, endValue);

        return {
            min: min,
            max: max
        };
    };

    LogarithmicAxis.prototype.zoomRange = function zoomRange (delta) {
        var ref = this;
        var options = ref.options;
        var totalMin = ref.totalMin;
        var totalMax = ref.totalMax;
        var newRange = this.scaleRange(delta);
        var min = limitValue(newRange.min, totalMin, totalMax);
        var max = limitValue(newRange.max, totalMin, totalMax);
        var base = options.majorUnit;
        var acceptOptionsRange = max > min && options.min && options.max && (round(log(options.max, base) - log(options.min, base), DEFAULT_PRECISION) < 1);
        var acceptNewRange = !(options.min === totalMin && options.max === totalMax) && round(log(max, base) - log(min, base), DEFAULT_PRECISION) >= 1;

        if (acceptOptionsRange || acceptNewRange) {
            return {
                min: min,
                max: max
            };
        }
    };

    LogarithmicAxis.prototype._minorIntervalOptions = function _minorIntervalOptions (power) {
        var ref = this.options;
        var minorUnit = ref.minorUnit;
        var base = ref.majorUnit;
        var value = Math.pow(base, power);
        var nextValue = Math.pow(base, power + 1);
        var difference = nextValue - value;
        var minorStep = difference / minorUnit;

        return {
            value: value,
            minorStep: minorStep
        };
    };

    LogarithmicAxis.prototype._lineOptions = function _lineOptions () {
        var ref = this.options;
        var reverse = ref.reverse;
        var vertical = ref.vertical;
        var valueAxis = vertical ? Y : X;
        var lineBox = this.lineBox();
        var dir = vertical === reverse ? 1 : -1;
        var startEdge = dir === 1 ? 1 : 2;
        var lineSize = vertical ? lineBox.height() : lineBox.width();
        var step = dir * (lineSize / (this.logMax - this.logMin));
        var lineStart = lineBox[valueAxis + startEdge];

        return {
            step: step,
            lineStart: lineStart,
            lineBox: lineBox
        };
    };

    return LogarithmicAxis;
}(Axis));

function initRange(autoMin, autoMax, axisOptions, options) {
    var min = axisOptions.min;
    var max = axisOptions.max;

    if (defined(axisOptions.axisCrossingValue) && axisOptions.axisCrossingValue <= 0) {
        throwNegativeValuesError();
    }

    if (!defined(options.max)) {
        max = autoMax;
    } else if (options.max <= 0) {
        throwNegativeValuesError();
    }

    if (!defined(options.min)) {
        min = autoMin;
    } else if (options.min <= 0) {
        throwNegativeValuesError();
    }

    return {
        min: min,
        max: max
    };
}

function autoAxisMin$1(min, max, options) {
    var base = options.majorUnit;
    var autoMin = min;
    if (min <= 0) {
        autoMin = max <= 1 ? Math.pow(base, -2) : 1;
    } else if (!options.narrowRange) {
        autoMin = Math.pow(base, Math.floor(log(min, base)));
    }
    return autoMin;
}

function autoAxisMax$1(max, base) {
    var logMaxRemainder = round(log(max, base), DEFAULT_PRECISION) % 1;
    var autoMax;
    if (max <= 0) {
        autoMax = base;
    } else if (logMaxRemainder !== 0 && (logMaxRemainder < 0.3 || logMaxRemainder > 0.9)) {
        autoMax = Math.pow(base, log(max, base) + 0.2);
    } else {
        autoMax = Math.pow(base, Math.ceil(log(max, base)));
    }

    return autoMax;
}

function throwNegativeValuesError() {
    throw new Error("Non positive values cannot be used for a logarithmic axis");
}

function log(y, x) {
    return Math.log(y) / Math.log(x);
}

setDefaultOptions(LogarithmicAxis, {
    type: "log",
    majorUnit: DEFAULT_MAJOR_UNIT,
    minorUnit: 1,
    axisCrossingValue: 1,
    vertical: true,
    majorGridLines: {
        visible: true,
        width: 1,
        color: BLACK
    },
    zIndex: 1,
    _deferLabels: true
});

var GridLinesMixin = {
    createGridLines: function(altAxis) {
        var options = this.options;
        var radius = Math.abs(this.box.center().y - altAxis.lineBox().y1);
        var gridLines = [];
        var skipMajor = false;
        var majorAngles, minorAngles;

        if (options.majorGridLines.visible) {
            majorAngles = this.majorGridLineAngles(altAxis);
            skipMajor = true;

            gridLines = this.renderMajorGridLines(
                majorAngles, radius, options.majorGridLines
            );
        }

        if (options.minorGridLines.visible) {
            minorAngles = this.minorGridLineAngles(altAxis, skipMajor);

            append$1(gridLines, this.renderMinorGridLines(
                minorAngles, radius, options.minorGridLines, altAxis, skipMajor
            ));
        }

        return gridLines;
    },

    renderMajorGridLines: function(angles, radius, options) {
        return this.renderGridLines(angles, radius, options);
    },

    renderMinorGridLines: function(angles, radius, options, altAxis, skipMajor) {
        var radiusCallback = this.radiusCallback && this.radiusCallback(radius, altAxis, skipMajor);
        return this.renderGridLines(angles, radius, options, radiusCallback);
    },

    renderGridLines: function(angles, radius, options, radiusCallback) {
        var style = {
            stroke: {
                width: options.width,
                color: options.color,
                dashType: options.dashType
            }
        };

        var center = this.box.center();
        var circle = new _progress_kendoDrawing.geometry.Circle([ center.x, center.y ], radius);
        var container = this.gridLinesVisual();

        for (var i = 0; i < angles.length; i++) {
            var line = new _progress_kendoDrawing.drawing.Path(style);
            if (radiusCallback) {
                circle.radius = radiusCallback(angles[i]);
            }

            line.moveTo(circle.center)
                .lineTo(circle.pointAt(angles[i] + 180));

            container.append(line);
        }

        return container.children;
    },

    gridLineAngles: function(altAxis, size, skip, step, skipAngles) {
        var this$1 = this;

        var divs = this.intervals(size, skip, step, skipAngles);
        var options = altAxis.options;
        var altAxisVisible = options.visible && (options.line || {}).visible !== false;

        return map(divs, function (d) {
            var alpha = this$1.intervalAngle(d);

            if (!altAxisVisible || alpha !== 90) {
                return alpha;
            }
        });
    }
};

var RadarCategoryAxis = (function (CategoryAxis$$1) {
    function RadarCategoryAxis () {
        CategoryAxis$$1.apply(this, arguments);
    }

    if ( CategoryAxis$$1 ) RadarCategoryAxis.__proto__ = CategoryAxis$$1;
    RadarCategoryAxis.prototype = Object.create( CategoryAxis$$1 && CategoryAxis$$1.prototype );
    RadarCategoryAxis.prototype.constructor = RadarCategoryAxis;

    RadarCategoryAxis.prototype.range = function range () {
        return { min: 0, max: this.options.categories.length };
    };

    RadarCategoryAxis.prototype.reflow = function reflow (box) {
        this.box = box;
        this.reflowLabels();
    };

    RadarCategoryAxis.prototype.lineBox = function lineBox () {
        return this.box;
    };

    RadarCategoryAxis.prototype.reflowLabels = function reflowLabels () {
        var this$1 = this;

        var ref = this;
        var labels = ref.labels;
        var labelOptions = ref.options.labels;
        var skip = labelOptions.skip || 0;
        var step = labelOptions.step || 1;
        var measureBox = new Box();

        for (var i = 0; i < labels.length; i++) {
            labels[i].reflow(measureBox);
            var labelBox = labels[i].box;

            labels[i].reflow(this$1.getSlot(skip + i * step).adjacentBox(
                0, labelBox.width(), labelBox.height()
            ));
        }
    };

    RadarCategoryAxis.prototype.intervals = function intervals (size, skipOption, stepOption, skipAngles) {
        if ( skipAngles === void 0 ) skipAngles = false;

        var options = this.options;
        var categories = options.categories.length;
        var divCount = categories / size || 1;
        var divAngle = 360 / divCount;
        var skip = skipOption || 0;
        var step = stepOption || 1;
        var divs = [];
        var angle = 0;

        for (var i = skip; i < divCount; i += step) {
            if (options.reverse) {
                angle = 360 - i * divAngle;
            } else {
                angle = i * divAngle;
            }

            angle = round(angle, COORD_PRECISION) % 360;

            if (!(skipAngles && inArray(angle, skipAngles))) {
                divs.push(angle);
            }
        }

        return divs;
    };

    RadarCategoryAxis.prototype.majorIntervals = function majorIntervals () {
        return this.intervals(1);
    };

    RadarCategoryAxis.prototype.minorIntervals = function minorIntervals () {
        return this.intervals(0.5);
    };

    RadarCategoryAxis.prototype.intervalAngle = function intervalAngle (interval) {
        return (360 + interval + this.options.startAngle) % 360;
    };

    RadarCategoryAxis.prototype.majorAngles = function majorAngles () {
        var this$1 = this;

        return map(this.majorIntervals(), function (interval) { return this$1.intervalAngle(interval); });
    };

    RadarCategoryAxis.prototype.createLine = function createLine () {
        return [];
    };

    RadarCategoryAxis.prototype.majorGridLineAngles = function majorGridLineAngles (altAxis) {
        var majorGridLines = this.options.majorGridLines;
        return this.gridLineAngles(altAxis, 1, majorGridLines.skip, majorGridLines.step);
    };

    RadarCategoryAxis.prototype.minorGridLineAngles = function minorGridLineAngles (altAxis, skipMajor) {
        var ref = this.options;
        var minorGridLines = ref.minorGridLines;
        var majorGridLines = ref.majorGridLines;
        var majorGridLineAngles = skipMajor ? this.intervals(1, majorGridLines.skip, majorGridLines.step) : null;

        return this.gridLineAngles(altAxis, 0.5, minorGridLines.skip, minorGridLines.step, majorGridLineAngles);
    };

    RadarCategoryAxis.prototype.radiusCallback = function radiusCallback (radius, altAxis, skipMajor) {
        if (altAxis.options.type !== ARC) {
            var minorAngle = rad(360 / (this.options.categories.length * 2));
            var minorRadius = Math.cos(minorAngle) * radius;
            var majorAngles = this.majorAngles();

            var radiusCallback = function(angle) {
                if (!skipMajor && inArray(angle, majorAngles)) {
                    return radius;
                }

                return minorRadius;
            };
            return radiusCallback;
        }
    };

    RadarCategoryAxis.prototype.createPlotBands = function createPlotBands () {
        var this$1 = this;

        var plotBands = this.options.plotBands || [];

        var group = this._plotbandGroup = new _progress_kendoDrawing.drawing.Group({
            zIndex: -1
        });

        for (var i = 0; i < plotBands.length; i++) {
            var band = plotBands[i];
            var slot = this$1.plotBandSlot(band);
            var singleSlot = this$1.getSlot(band.from);

            var head = band.from - Math.floor(band.from);
            slot.startAngle += head * singleSlot.angle;

            var tail = Math.ceil(band.to) - band.to;
            slot.angle -= (tail + head) * singleSlot.angle;

            var ring = ShapeBuilder.current.createRing(slot, {
                fill: {
                    color: band.color,
                    opacity: band.opacity
                },
                stroke: {
                    opacity: band.opacity
                }
            });
            group.append(ring);
        }

        this.appendVisual(group);
    };

    RadarCategoryAxis.prototype.plotBandSlot = function plotBandSlot (band) {
        return this.getSlot(band.from, band.to - 1);
    };

    RadarCategoryAxis.prototype.getSlot = function getSlot (from, to) {
        var options = this.options;
        var justified = options.justified;
        var box = this.box;
        var divs = this.majorAngles();
        var totalDivs = divs.length;
        var slotAngle = 360 / totalDivs;
        var fromValue = from;

        if (options.reverse && !justified) {
            fromValue = (fromValue + 1) % totalDivs;
        }

        fromValue = limitValue(Math.floor(fromValue), 0, totalDivs - 1);
        var slotStart = divs[fromValue];

        if (justified) {
            slotStart = slotStart - slotAngle / 2;

            if (slotStart < 0) {
                slotStart += 360;
            }
        }

        var toValue = limitValue(Math.ceil(to || fromValue), fromValue, totalDivs - 1);
        var slots = toValue - fromValue + 1;
        var angle = slotAngle * slots;

        return new Ring(box.center(), 0, box.height() / 2, slotStart, angle);
    };

    RadarCategoryAxis.prototype.slot = function slot (from, to) {
        var slot = this.getSlot(from, to);
        var startAngle = slot.startAngle + 180;
        var endAngle = startAngle + slot.angle;

        return new _progress_kendoDrawing.geometry.Arc([ slot.center.x, slot.center.y ], {
            startAngle: startAngle,
            endAngle: endAngle,
            radiusX: slot.radius,
            radiusY: slot.radius
        });
    };

    RadarCategoryAxis.prototype.pointCategoryIndex = function pointCategoryIndex (point) {
        var this$1 = this;

        var length = this.options.categories.length;
        var index = null;

        for (var i = 0; i < length; i++) {
            var slot = this$1.getSlot(i);
            if (slot.containsPoint(point)) {
                index = i;
                break;
            }
        }

        return index;
    };

    return RadarCategoryAxis;
}(CategoryAxis));

setDefaultOptions(RadarCategoryAxis, {
    startAngle: 90,
    labels: {
        margin: getSpacing(10)
    },
    majorGridLines: {
        visible: true
    },
    justified: true
});
deepExtend(RadarCategoryAxis.prototype, GridLinesMixin);

var PolarAxis = (function (Axis$$1) {
    function PolarAxis(options, chartService) {
        Axis$$1.call(this, options, chartService);

        var instanceOptions = this.options;

        instanceOptions.minorUnit = instanceOptions.minorUnit || instanceOptions.majorUnit / 2;
    }

    if ( Axis$$1 ) PolarAxis.__proto__ = Axis$$1;
    PolarAxis.prototype = Object.create( Axis$$1 && Axis$$1.prototype );
    PolarAxis.prototype.constructor = PolarAxis;

    PolarAxis.prototype.getDivisions = function getDivisions (stepValue) {
        return NumericAxis.prototype.getDivisions.call(this, stepValue) - 1;
    };

    PolarAxis.prototype.reflow = function reflow (box) {
        this.box = box;
        this.reflowLabels();
    };

    PolarAxis.prototype.reflowLabels = function reflowLabels () {
        var this$1 = this;

        var ref = this;
        var options = ref.options;
        var labels = ref.labels;
        var labelOptions = ref.options.labels;
        var skip = labelOptions.skip || 0;
        var step = labelOptions.step || 1;

        var measureBox = new Box();
        var divs = this.intervals(options.majorUnit, skip, step);

        for (var i = 0; i < labels.length; i++) {
            labels[i].reflow(measureBox);
            var labelBox = labels[i].box;

            labels[i].reflow(this$1.getSlot(divs[i]).adjacentBox(0, labelBox.width(), labelBox.height()));
        }
    };

    PolarAxis.prototype.lineBox = function lineBox () {
        return this.box;
    };

    PolarAxis.prototype.intervals = function intervals (size, skipOption, stepOption, skipAngles) {
        if ( skipAngles === void 0 ) skipAngles = false;

        var min = this.options.min;
        var divisions = this.getDivisions(size);
        var divs = [];
        var skip = skipOption || 0;
        var step = stepOption || 1;

        for (var i = skip; i < divisions; i += step) {
            var current = (360 + min + i * size) % 360;
            if (!(skipAngles && inArray(current, skipAngles))) {
                divs.push(current);
            }
        }

        return divs;
    };

    PolarAxis.prototype.majorIntervals = function majorIntervals () {
        return this.intervals(this.options.majorUnit);
    };

    PolarAxis.prototype.minorIntervals = function minorIntervals () {
        return this.intervals(this.options.minorUnit);
    };

    PolarAxis.prototype.intervalAngle = function intervalAngle (i) {
        return (540 - i - this.options.startAngle) % 360;
    };

    PolarAxis.prototype.createLine = function createLine () {
        return [];
    };

    PolarAxis.prototype.majorGridLineAngles = function majorGridLineAngles (altAxis) {
        var majorGridLines = this.options.majorGridLines;
        return this.gridLineAngles(altAxis, this.options.majorUnit, majorGridLines.skip, majorGridLines.step);
    };

    PolarAxis.prototype.minorGridLineAngles = function minorGridLineAngles (altAxis, skipMajor) {
        var options = this.options;
        var minorGridLines = options.minorGridLines;
        var majorGridLines = options.majorGridLines;
        var majorGridLineAngles = skipMajor ? this.intervals(options.majorUnit, majorGridLines.skip, majorGridLines.step) : null;

        return this.gridLineAngles(altAxis, options.minorUnit, minorGridLines.skip, minorGridLines.step, majorGridLineAngles);
    };

    PolarAxis.prototype.plotBandSlot = function plotBandSlot (band) {
        return this.getSlot(band.from, band.to);
    };

    PolarAxis.prototype.getSlot = function getSlot (a, b) {
        var ref = this;
        var options = ref.options;
        var box = ref.box;
        var startAngle = options.startAngle;
        var start = limitValue(a, options.min, options.max);
        var end = limitValue(b || start, start, options.max);

        if (options.reverse) {
            start *= -1;
            end *= -1;
        }

        start = (540 - start - startAngle) % 360;
        end = (540 - end - startAngle) % 360;

        if (end < start) {
            var tmp = start;
            start = end;
            end = tmp;
        }

        return new Ring(box.center(), 0, box.height() / 2, start, end - start);
    };

    PolarAxis.prototype.slot = function slot (from, to) {
        if ( to === void 0 ) to = from;

        var options = this.options;
        var start = 360 - options.startAngle;
        var slot = this.getSlot(from, to);
        var min = Math.min(from, to);
        var max = Math.max(from, to);
        var startAngle, endAngle;

        if (options.reverse) {
            startAngle = min;
            endAngle = max;
        } else {
            startAngle = 360 - max;
            endAngle = 360 - min;
        }

        startAngle = (startAngle + start) % 360;
        endAngle = (endAngle + start) % 360;

        return new _progress_kendoDrawing.geometry.Arc([ slot.center.x, slot.center.y ], {
            startAngle: startAngle,
            endAngle: endAngle,
            radiusX: slot.radius,
            radiusY: slot.radius
        });
    };

    PolarAxis.prototype.getValue = function getValue (point) {
        var options = this.options;
        var center = this.box.center();
        var dx = point.x - center.x;
        var dy = point.y - center.y;
        var theta = Math.round(deg(Math.atan2(dy, dx)));
        var start = options.startAngle;

        if (!options.reverse) {
            theta *= -1;
            start *= -1;
        }

        return (theta + start + 360) % 360;
    };

    PolarAxis.prototype.valueRange = function valueRange () {
        return {
            min: 0,
            max: Math.PI * 2
        };
    };

    return PolarAxis;
}(Axis));

setDefaultOptions(PolarAxis, {
    type: "polar",
    startAngle: 0,
    reverse: false,
    majorUnit: 60,
    min: 0,
    max: 360,
    labels: {
        margin: getSpacing(10)
    },
    majorGridLines: {
        color: BLACK,
        visible: true,
        width: 1
    },
    minorGridLines: {
        color: "#aaa"
    }
});

deepExtend(PolarAxis.prototype, GridLinesMixin, {
    createPlotBands: RadarCategoryAxis.prototype.createPlotBands,
    majorAngles: RadarCategoryAxis.prototype.majorAngles,
    range: NumericAxis.prototype.range,
    labelsCount: NumericAxis.prototype.labelsCount,
    createAxisLabel: NumericAxis.prototype.createAxisLabel
});

var RadarNumericAxisMixin = {
    options: {
        majorGridLines: {
            visible: true
        }
    },

    createPlotBands: function() {
        var this$1 = this;

        var ref = this.options;
        var type = ref.majorGridLines.type;
        var plotBands = ref.plotBands; if ( plotBands === void 0 ) plotBands = [];
        var altAxis = this.plotArea.polarAxis;
        var majorAngles = altAxis.majorAngles();
        var center = altAxis.box.center();
        var group = this._plotbandGroup = new _progress_kendoDrawing.drawing.Group({
            zIndex: -1
        });

        for (var i = 0; i < plotBands.length; i++) {
            var band = plotBands[i];
            var bandStyle = {
                fill: {
                    color: band.color,
                    opacity: band.opacity
                },
                stroke: {
                    opacity: band.opacity
                }
            };

            var slot = this$1.getSlot(band.from, band.to, true);
            var ring = new Ring(center, center.y - slot.y2, center.y - slot.y1, 0, 360);

            var shape = (void 0);
            if (type === ARC) {
                shape = ShapeBuilder.current.createRing(ring, bandStyle);
            } else {
                shape = _progress_kendoDrawing.drawing.Path.fromPoints(this$1.plotBandPoints(ring, majorAngles), bandStyle).close();
            }

            group.append(shape);
        }

        this.appendVisual(group);
    },

    plotBandPoints: function(ring, angles) {
        var innerPoints = [];
        var outerPoints = [];
        var center = [ ring.center.x, ring.center.y ];
        var innerCircle = new _progress_kendoDrawing.geometry.Circle(center, ring.innerRadius);
        var outerCircle = new _progress_kendoDrawing.geometry.Circle(center, ring.radius);

        for (var i = 0; i < angles.length; i++) {
            innerPoints.push(innerCircle.pointAt(angles[i] + 180));
            outerPoints.push(outerCircle.pointAt(angles[i] + 180));
        }

        innerPoints.reverse();
        innerPoints.push(innerPoints[0]);
        outerPoints.push(outerPoints[0]);

        return outerPoints.concat(innerPoints);
    },

    createGridLines: function(altAxis) {
        var options = this.options;
        var majorTicks = this.radarMajorGridLinePositions();
        var majorAngles = altAxis.majorAngles();
        var center = altAxis.box.center();
        var gridLines = [];

        if (options.majorGridLines.visible) {
            gridLines = this.renderGridLines(
                center, majorTicks, majorAngles, options.majorGridLines
            );
        }

        if (options.minorGridLines.visible) {
            var minorTicks = this.radarMinorGridLinePositions();
            append$1(gridLines, this.renderGridLines(
                center, minorTicks, majorAngles, options.minorGridLines
            ));
        }

        return gridLines;
    },

    renderGridLines: function(center, ticks, angles, options) {
        var style = {
            stroke: {
                width: options.width,
                color: options.color,
                dashType: options.dashType
            }
        };
        var skip = options.skip; if ( skip === void 0 ) skip = 0;
        var step = options.step; if ( step === void 0 ) step = 0;
        var container = this.gridLinesVisual();

        for (var tickIx = skip; tickIx < ticks.length; tickIx += step) {
            var tickRadius = center.y - ticks[tickIx];
            if (tickRadius > 0) {
                var circle = new _progress_kendoDrawing.geometry.Circle([ center.x, center.y ], tickRadius);
                if (options.type === ARC) {
                    container.append(new _progress_kendoDrawing.drawing.Circle(circle, style));
                } else {
                    var line = new _progress_kendoDrawing.drawing.Path(style);
                    for (var angleIx = 0; angleIx < angles.length; angleIx++) {
                        line.lineTo(circle.pointAt(angles[angleIx] + 180));
                    }

                    line.close();
                    container.append(line);
                }
            }
        }

        return container.children;
    },

    getValue: function(point) {
        var lineBox = this.lineBox();
        var altAxis = this.plotArea.polarAxis;
        var majorAngles = altAxis.majorAngles();
        var center = altAxis.box.center();
        var radius = point.distanceTo(center);
        var distance = radius;

        if (this.options.majorGridLines.type !== ARC && majorAngles.length > 1) {
            var dx = point.x - center.x;
            var dy = point.y - center.y;
            var theta = (deg(Math.atan2(dy, dx)) + 540) % 360;

            majorAngles.sort(function(a, b) {
                return angularDistance(a, theta) - angularDistance(b, theta);
            });

            // Solve triangle (center, point, axis X) using one side (radius) and two angles.
            // Angles are derived from triangle (center, point, gridline X)
            var midAngle = angularDistance(majorAngles[0], majorAngles[1]) / 2;
            var alpha = angularDistance(theta, majorAngles[0]);
            var gamma = 90 - midAngle;
            var beta = 180 - alpha - gamma;

            distance = radius * (Math.sin(rad(beta)) / Math.sin(rad(gamma)));
        }

        return this.axisType().prototype.getValue.call(
            this, new Point(lineBox.x1, lineBox.y2 - distance)
        );
    }
};

function angularDistance(a, b) {
    return 180 - Math.abs(Math.abs(a - b) - 180);
}

var RadarNumericAxis = (function (NumericAxis$$1) {
    function RadarNumericAxis () {
        NumericAxis$$1.apply(this, arguments);
    }

    if ( NumericAxis$$1 ) RadarNumericAxis.__proto__ = NumericAxis$$1;
    RadarNumericAxis.prototype = Object.create( NumericAxis$$1 && NumericAxis$$1.prototype );
    RadarNumericAxis.prototype.constructor = RadarNumericAxis;

    RadarNumericAxis.prototype.radarMajorGridLinePositions = function radarMajorGridLinePositions () {
        return this.getTickPositions(this.options.majorUnit);
    };

    RadarNumericAxis.prototype.radarMinorGridLinePositions = function radarMinorGridLinePositions () {
        var options = this.options;
        var minorSkipStep = 0;

        if (options.majorGridLines.visible) {
            minorSkipStep = options.majorUnit;
        }
        return this.getTickPositions(options.minorUnit, minorSkipStep);
    };

    RadarNumericAxis.prototype.axisType = function axisType () {
        return NumericAxis$$1;
    };

    return RadarNumericAxis;
}(NumericAxis));

deepExtend(RadarNumericAxis.prototype, RadarNumericAxisMixin);

var RadarLogarithmicAxis = (function (LogarithmicAxis$$1) {
    function RadarLogarithmicAxis () {
        LogarithmicAxis$$1.apply(this, arguments);
    }

    if ( LogarithmicAxis$$1 ) RadarLogarithmicAxis.__proto__ = LogarithmicAxis$$1;
    RadarLogarithmicAxis.prototype = Object.create( LogarithmicAxis$$1 && LogarithmicAxis$$1.prototype );
    RadarLogarithmicAxis.prototype.constructor = RadarLogarithmicAxis;

    RadarLogarithmicAxis.prototype.radarMajorGridLinePositions = function radarMajorGridLinePositions () {
        var positions = [];

        this.traverseMajorTicksPositions(function(position) {
            positions.push(position);
        }, this.options.majorGridLines);

        return positions;
    };

    RadarLogarithmicAxis.prototype.radarMinorGridLinePositions = function radarMinorGridLinePositions () {
        var positions = [];

        this.traverseMinorTicksPositions(function(position) {
            positions.push(position);
        }, this.options.minorGridLines);

        return positions;
    };

    RadarLogarithmicAxis.prototype.axisType = function axisType () {
        return LogarithmicAxis$$1;
    };

    return RadarLogarithmicAxis;
}(LogarithmicAxis));

deepExtend(RadarLogarithmicAxis.prototype, RadarNumericAxisMixin);

var WEIGHT = 0.333;
var EXTREMUM_ALLOWED_DEVIATION = 0.01;

var CurveProcessor = (function (Class$$1) {
    function CurveProcessor(closed) {
        Class$$1.call(this);

        this.closed = closed;
    }

    if ( Class$$1 ) CurveProcessor.__proto__ = Class$$1;
    CurveProcessor.prototype = Object.create( Class$$1 && Class$$1.prototype );
    CurveProcessor.prototype.constructor = CurveProcessor;

    CurveProcessor.prototype.process = function process (dataPoints) {
        var this$1 = this;

        var points = dataPoints.slice(0);
        var segments = [];
        var closed = this.closed;
        var length = points.length;

        if (length > 2) {
            this.removeDuplicates(0, points);
            length = points.length;
        }

        if (length < 2 || (length === 2 && points[0].equals(points[1]))) {
            return segments;
        }

        var p0 = points[0];
        var p1 = points[1];
        var p2 = points[2];

        segments.push(new _progress_kendoDrawing.geometry.Segment(p0));

        while (p0.equals(points[length - 1])) {
            closed = true;
            points.pop();
            length--;
        }

        if (length === 2) {
            var tangent = this.tangent(p0,p1, X, Y);

            last(segments).controlOut(
                this.firstControlPoint(tangent, p0, p1, X, Y)
            );

            segments.push(new _progress_kendoDrawing.geometry.Segment(
                p1,
                this.secondControlPoint(tangent, p0, p1, X, Y)
            ));

            return segments;
        }

        var initialControlPoint, lastControlPoint;

        if (closed) {
            p0 = points[length - 1]; p1 = points[0]; p2 = points[1];
            var controlPoints = this.controlPoints(p0, p1, p2);
            initialControlPoint = controlPoints[1];
            lastControlPoint = controlPoints[0];
        } else {
            var tangent$1 = this.tangent(p0, p1, X,Y);
            initialControlPoint = this.firstControlPoint(tangent$1, p0, p1, X, Y);
        }

        var cp0 = initialControlPoint;
        for (var idx = 0; idx <= length - 3; idx++) {
            this$1.removeDuplicates(idx, points);
            length = points.length;
            if (idx + 3 <= length) {
                p0 = points[idx]; p1 = points[idx + 1]; p2 = points[idx + 2];
                var controlPoints$1 = this$1.controlPoints(p0,p1,p2);

                last(segments).controlOut(cp0);
                cp0 = controlPoints$1[1];

                var cp1 = controlPoints$1[0];
                segments.push(new _progress_kendoDrawing.geometry.Segment(p1, cp1));
            }
        }

        if (closed) {
            p0 = points[length - 2]; p1 = points[length - 1]; p2 = points[0];
            var controlPoints$2 = this.controlPoints(p0, p1, p2);

            last(segments).controlOut(cp0);
            segments.push(new _progress_kendoDrawing.geometry.Segment(
                p1,
                controlPoints$2[0]
            ));

            last(segments).controlOut(controlPoints$2[1]);
            segments.push(new _progress_kendoDrawing.geometry.Segment(
                p2,
                lastControlPoint
            ));
        } else {
            var tangent$2 = this.tangent(p1, p2, X, Y);

            last(segments).controlOut(cp0);
            segments.push(new _progress_kendoDrawing.geometry.Segment(
                p2,
                this.secondControlPoint(tangent$2, p1, p2, X, Y)
            ));
        }

        return segments;
    };

    CurveProcessor.prototype.removeDuplicates = function removeDuplicates (idx, points) {
        while (points[idx + 1] && (points[idx].equals(points[idx + 1]) || points[idx + 1].equals(points[idx + 2]))) {
            points.splice(idx + 1, 1);
        }
    };

    CurveProcessor.prototype.invertAxis = function invertAxis (p0, p1, p2) {
        var invertAxis = false;

        if (p0.x === p1.x) {
            invertAxis = true;
        } else if (p1.x === p2.x) {
            if ((p1.y < p2.y && p0.y <= p1.y) || (p2.y < p1.y && p1.y <= p0.y)) {
                invertAxis = true;
            }
        } else {
            var fn = this.lineFunction(p0,p1);
            var y2 = this.calculateFunction(fn, p2.x);
            if (!(p0.y <= p1.y && p2.y <= y2) &&
                !(p1.y <= p0.y && p2.y >= y2)) {
                invertAxis = true;
            }
        }

        return invertAxis;
    };

    CurveProcessor.prototype.isLine = function isLine (p0, p1, p2) {
        var fn = this.lineFunction(p0, p1);
        var y2 = this.calculateFunction(fn, p2.x);

        return (p0.x === p1.x && p1.x === p2.x) || round(y2, 1) === round(p2.y, 1);
    };

    CurveProcessor.prototype.lineFunction = function lineFunction (p1, p2) {
        var a = (p2.y - p1.y) / (p2.x - p1.x);
        var b = p1.y - a * p1.x;

        return [ b, a ];
    };

    CurveProcessor.prototype.controlPoints = function controlPoints (p0, p1, p2) {
        var xField = X;
        var yField = Y;
        var restrict = false;
        var switchOrientation = false;
        var tangent;

        if (this.isLine(p0, p1, p2)) {
            tangent = this.tangent(p0, p1, X, Y);
        } else {
            var monotonic = {
                x: this.isMonotonicByField(p0, p1, p2, X),
                y: this.isMonotonicByField(p0, p1, p2, Y)
            };

            if (monotonic.x && monotonic.y) {
                tangent = this.tangent(p0, p2, X, Y);
                restrict = true;
            } else {
                if (this.invertAxis(p0, p1, p2)) {
                    xField = Y;
                    yField = X;
                }

                if (monotonic[xField]) {
                    tangent = 0;
                } else {
                    var sign;
                    if ((p2[yField] < p0[yField] && p0[yField] <= p1[yField]) ||
                        (p0[yField] < p2[yField] && p1[yField] <= p0[yField])) {
                        sign = numberSign((p2[yField] - p0[yField]) * (p1[xField] - p0[xField]));
                    } else {
                        sign = -numberSign((p2[xField] - p0[xField]) * (p1[yField] - p0[yField]));
                    }

                    tangent = EXTREMUM_ALLOWED_DEVIATION * sign;
                    switchOrientation = true;
                }
            }
        }

        var secondControlPoint = this.secondControlPoint(tangent, p0, p1, xField, yField);

        if (switchOrientation) {
            var oldXField = xField;
            xField = yField;
            yField = oldXField;
        }

        var firstControlPoint = this.firstControlPoint(tangent, p1, p2, xField, yField);

        if (restrict) {
            this.restrictControlPoint(p0, p1, secondControlPoint, tangent);
            this.restrictControlPoint(p1, p2, firstControlPoint, tangent);
        }

        return [ secondControlPoint, firstControlPoint ];
    };

    CurveProcessor.prototype.restrictControlPoint = function restrictControlPoint (p1, p2, cp, tangent) {
        if (p1.y < p2.y) {
            if (p2.y < cp.y) {
                cp.x = p1.x + (p2.y - p1.y) / tangent;
                cp.y = p2.y;
            } else if (cp.y < p1.y) {
                cp.x = p2.x - (p2.y - p1.y) / tangent;
                cp.y = p1.y;
            }
        } else {
            if (cp.y < p2.y) {
                cp.x = p1.x - (p1.y - p2.y) / tangent;
                cp.y = p2.y;
            } else if (p1.y < cp.y) {
                cp.x = p2.x + (p1.y - p2.y) / tangent;
                cp.y = p1.y;
            }
        }
    };

    CurveProcessor.prototype.tangent = function tangent (p0, p1, xField, yField) {
        var x = p1[xField] - p0[xField];
        var y = p1[yField] - p0[yField];
        var tangent;

        if (x === 0) {
            tangent = 0;
        } else {
            tangent = y / x;
        }

        return tangent;
    };

    CurveProcessor.prototype.isMonotonicByField = function isMonotonicByField (p0, p1, p2, field) {
        return (p2[field] > p1[field] && p1[field] > p0[field]) ||
                    (p2[field] < p1[field] && p1[field] < p0[field]);
    };

    CurveProcessor.prototype.firstControlPoint = function firstControlPoint (tangent, p0, p3, xField, yField) {
        var t1 = p0[xField];
        var t2 = p3[xField];
        var distance = (t2 - t1) * WEIGHT;

        return this.point(t1 + distance, p0[yField] + distance * tangent, xField, yField);
    };

    CurveProcessor.prototype.secondControlPoint = function secondControlPoint (tangent, p0, p3, xField, yField) {
        var t1 = p0[xField];
        var t2 = p3[xField];
        var distance = (t2 - t1) * WEIGHT;

        return this.point(t2 - distance, p3[yField] - distance * tangent, xField, yField);
    };

    CurveProcessor.prototype.point = function point (xValue, yValue, xField, yField) {
        var controlPoint = new _progress_kendoDrawing.geometry.Point();
        controlPoint[xField] = xValue;
        controlPoint[yField] = yValue;

        return controlPoint;
    };

    CurveProcessor.prototype.calculateFunction = function calculateFunction (fn, x) {
        var length = fn.length;
        var result = 0;

        for (var i = 0; i < length; i++) {
            result += Math.pow(x,i) * fn[i];
        }
        return result;
    };

    return CurveProcessor;
}(_progress_kendoDrawing.Class));

function numberSign(value) {
    return value <= 0 ? -1 : 1;
}

var ChartAxis = (function (Class$$1) {
    function ChartAxis(axis) {
        Class$$1.call(this);

        this._axis = axis;
        this.options = axis.options;
    }

    if ( Class$$1 ) ChartAxis.__proto__ = Class$$1;
    ChartAxis.prototype = Object.create( Class$$1 && Class$$1.prototype );
    ChartAxis.prototype.constructor = ChartAxis;

    ChartAxis.prototype.value = function value (point) {
        var axis = this._axis;
        var value = axis.getCategory ? axis.getCategory(point) : axis.getValue(point);

        return value;
    };

    ChartAxis.prototype.slot = function slot (from, to, limit) {
        if ( limit === void 0 ) limit = true;

        return this._axis.slot(from, to, limit);
    };

    ChartAxis.prototype.range = function range () {
        return this._axis.range();
    };

    ChartAxis.prototype.valueRange = function valueRange () {
        return this._axis.valueRange();
    };

    return ChartAxis;
}(_progress_kendoDrawing.Class));

var ChartPane = function ChartPane(pane) {
    this.visual = pane.visual;
    this.chartsVisual = pane.chartContainer.visual;
};

var ChartPlotArea = (function (Class$$1) {
    function ChartPlotArea(plotArea) {
        Class$$1.call(this);

        this._plotArea = plotArea;
        this.visual = plotArea.visual;
        this.backgroundVisual = plotArea._bgVisual;
    }

    if ( Class$$1 ) ChartPlotArea.__proto__ = Class$$1;
    ChartPlotArea.prototype = Object.create( Class$$1 && Class$$1.prototype );
    ChartPlotArea.prototype.constructor = ChartPlotArea;

    return ChartPlotArea;
}(_progress_kendoDrawing.Class));

function countNumbers(values) {
    var length = values.length;
    var count = 0;

    for (var i = 0; i < length; i++) {
        var num = values[i];
        if (isNumber(num)) {
            count++;
        }
    }

    return count;
}

var Aggregates = {
    min: function(values) {
        var length = values.length;
        var min = MAX_VALUE;

        for (var i = 0; i < length; i++) {
            var value = values[i];
            if (isNumber(value)) {
                min = Math.min(min, value);
            }
        }

        return min === MAX_VALUE ? values[0] : min;
    },

    max: function(values) {
        var length = values.length;
        var max = MIN_VALUE;

        for (var i = 0; i < length; i++) {
            var value = values[i];
            if (isNumber(value)) {
                max = Math.max(max, value);
            }
        }

        return max === MIN_VALUE ? values[0] : max;
    },

    sum: function(values) {
        var length = values.length;
        var sum = 0;

        for (var i = 0; i < length; i++) {
            var value = values[i];
            if (isNumber(value)) {
                sum += value;
            }
        }

        return sum;
    },

    sumOrNull: function(values) {
        var result = null;

        if (countNumbers(values)) {
            result = Aggregates.sum(values);
        }

        return result;
    },

    count: function(values) {
        var length = values.length;
        var count = 0;

        for (var i = 0; i < length; i++) {
            var value = values[i];
            if (value !== null && defined(value)) {
                count++;
            }
        }

        return count;
    },

    avg: function(values) {
        var count = countNumbers(values);
        var result = values[0];

        if (count > 0) {
            result = Aggregates.sum(values) / count;
        }

        return result;
    },

    first: function(values) {
        var length = values.length;

        for (var i = 0; i < length; i++) {
            var value = values[i];
            if (value !== null && defined(value)) {
                return value;
            }
        }

        return values[0];
    }
};

function getField(field, row) {
    if (row === null) {
        return row;
    }

    var get = getter(field, true);
    return get(row);
}

var SeriesBinder = (function (Class$$1) {
    function SeriesBinder() {
        Class$$1.call(this);

        this._valueFields = {};
        this._otherFields = {};
        this._nullValue = {};
        this._undefinedValue = {};
    }

    if ( Class$$1 ) SeriesBinder.__proto__ = Class$$1;
    SeriesBinder.prototype = Object.create( Class$$1 && Class$$1.prototype );
    SeriesBinder.prototype.constructor = SeriesBinder;

    SeriesBinder.prototype.register = function register (seriesTypes, valueFields, otherFields) {
        var this$1 = this;
        if ( valueFields === void 0 ) valueFields = [ VALUE ];
        if ( otherFields === void 0 ) otherFields = {};


        for (var i = 0; i < seriesTypes.length; i++) {
            var type = seriesTypes[i];

            this$1._valueFields[type] = valueFields;
            this$1._otherFields[type] = otherFields;
            this$1._nullValue[type] = this$1._makeValue(valueFields, null);
            this$1._undefinedValue[type] = this$1._makeValue(valueFields, undefined);
        }
    };

    SeriesBinder.prototype.canonicalFields = function canonicalFields (series) {
        return this.valueFields(series).concat(this.otherFields(series));
    };

    SeriesBinder.prototype.valueFields = function valueFields (series) {
        return this._valueFields[series.type] || [ VALUE ];
    };

    SeriesBinder.prototype.otherFields = function otherFields (series) {
        return this._otherFields[series.type] || [ VALUE ];
    };

    SeriesBinder.prototype.bindPoint = function bindPoint (series, pointIx, item) {
        var data = series.data;
        var pointData = defined(item) ? item : data[pointIx];
        var result = { valueFields: { value: pointData } };
        var valueFields = this.valueFields(series);
        var otherFields = this._otherFields[series.type];
        var fields, value;

        if (pointData === null) {
            value = this._nullValue[series.type];
        } else if (!defined(pointData)) {
            value = this._undefinedValue[series.type];
        } else if (Array.isArray(pointData)) {
            var fieldData = pointData.slice(valueFields.length);
            value = this._bindFromArray(pointData, valueFields);
            fields = this._bindFromArray(fieldData, otherFields);
        } else if (typeof pointData === "object") {
            var srcValueFields = this.sourceFields(series, valueFields);
            var srcPointFields = this.sourceFields(series, otherFields);

            value = this._bindFromObject(pointData, valueFields, srcValueFields);
            fields = this._bindFromObject(pointData, otherFields, srcPointFields);
        }

        if (defined(value)) {
            if (valueFields.length === 1) {
                result.valueFields.value = value[valueFields[0]];
            } else {
                result.valueFields = value;
            }
        }

        result.fields = fields || {};

        return result;
    };

    SeriesBinder.prototype._makeValue = function _makeValue (fields, initialValue) {
        var value = {};
        var length = fields.length;

        for (var i = 0; i < length; i++) {
            var fieldName = fields[i];
            value[fieldName] = initialValue;
        }

        return value;
    };

    SeriesBinder.prototype._bindFromArray = function _bindFromArray (array, fields) {
        var value = {};

        if (fields) {
            var length = Math.min(fields.length, array.length);

            for (var i = 0; i < length; i++) {
                value[fields[i]] = array[i];
            }
        }

        return value;
    };

    SeriesBinder.prototype._bindFromObject = function _bindFromObject (object, fields, srcFields) {
        if ( srcFields === void 0 ) srcFields = fields;

        var value = {};

        if (fields) {
            var length = fields.length;

            for (var i = 0; i < length; i++) {
                var fieldName = fields[i];
                var srcFieldName = srcFields[i];
                value[fieldName] = getField(srcFieldName, object);
            }
        }

        return value;
    };

    SeriesBinder.prototype.sourceFields = function sourceFields (series, canonicalFields) {
        var sourceFields = [];

        if (canonicalFields) {
            var length = canonicalFields.length;

            for (var i = 0; i < length; i++) {
                var fieldName = canonicalFields[i];
                var sourceFieldName = fieldName === VALUE ? "field" : fieldName + "Field";

                sourceFields.push(series[sourceFieldName] || fieldName);
            }
        }

        return sourceFields;
    };

    return SeriesBinder;
}(_progress_kendoDrawing.Class));

SeriesBinder.current = new SeriesBinder();

var STD_ERR = "stderr";
var STD_DEV = "stddev";
var percentRegex = /percent(?:\w*)\((\d+)\)/;
var standardDeviationRegex = new RegExp("^" + STD_DEV + "(?:\\((\\d+(?:\\.\\d+)?)\\))?$");

var ErrorRangeCalculator = (function (Class$$1) {
    function ErrorRangeCalculator(errorValue, series, field) {
        Class$$1.call(this);

        this.initGlobalRanges(errorValue, series, field);
    }

    if ( Class$$1 ) ErrorRangeCalculator.__proto__ = Class$$1;
    ErrorRangeCalculator.prototype = Object.create( Class$$1 && Class$$1.prototype );
    ErrorRangeCalculator.prototype.constructor = ErrorRangeCalculator;

    ErrorRangeCalculator.prototype.initGlobalRanges = function initGlobalRanges (errorValue, series, field) {
        var data = series.data;
        var deviationMatch = standardDeviationRegex.exec(errorValue);

        if (deviationMatch) {
            this.valueGetter = this.createValueGetter(series, field);

            var average = this.getAverage(data);
            var deviation = this.getStandardDeviation(data, average, false);
            var multiple = deviationMatch[1] ? parseFloat(deviationMatch[1]) : 1;
            var errorRange = { low: average.value - deviation * multiple, high: average.value + deviation * multiple };

            this.globalRange = function() {
                return errorRange;
            };
        } else if (errorValue.indexOf && errorValue.indexOf(STD_ERR) >= 0) {
            this.valueGetter = this.createValueGetter(series, field);
            var standardError = this.getStandardError(data, this.getAverage(data));

            this.globalRange = function(value) {
                return { low: value - standardError, high: value + standardError };
            };
        }
    };

    ErrorRangeCalculator.prototype.createValueGetter = function createValueGetter (series, field) {
        var data = series.data;
        var binder = SeriesBinder.current;
        var valueFields = binder.valueFields(series);
        var item = defined(data[0]) ? data[0] : {};
        var valueGetter;

        if (isArray(item)) {
            var index = field ? valueFields.indexOf(field) : 0;
            valueGetter = getter("[" + index + "]");
        } else if (isNumber(item)) {
            valueGetter = getter();
        } else if (typeof item === OBJECT) {
            var srcValueFields = binder.sourceFields(series, valueFields);
            valueGetter = getter(srcValueFields[valueFields.indexOf(field)]);
        }

        return valueGetter;
    };

    ErrorRangeCalculator.prototype.getErrorRange = function getErrorRange (pointValue, errorValue) {
        var low, high, value;

        if (!defined(errorValue)) {
            return null;
        }

        if (this.globalRange) {
            return this.globalRange(pointValue);
        }

        if (isArray(errorValue)) {
            low = pointValue - errorValue[0];
            high = pointValue + errorValue[1];
        } else if (isNumber(value = parseFloat(errorValue))) {
            low = pointValue - value;
            high = pointValue + value;
        } else if ((value = percentRegex.exec(errorValue))) {
            var percentValue = pointValue * (parseFloat(value[1]) / 100);
            low = pointValue - Math.abs(percentValue);
            high = pointValue + Math.abs(percentValue);
        } else {
            throw new Error("Invalid ErrorBar value: " + errorValue);
        }

        return { low: low, high: high };
    };

    ErrorRangeCalculator.prototype.getStandardError = function getStandardError (data, average) {
        return this.getStandardDeviation(data, average, true) / Math.sqrt(average.count);
    };

    ErrorRangeCalculator.prototype.getStandardDeviation = function getStandardDeviation (data, average, isSample) {
        var this$1 = this;

        var length = data.length;
        var total = isSample ? average.count - 1 : average.count;
        var squareDifferenceSum = 0;

        for (var idx = 0; idx < length; idx++) {
            var value = this$1.valueGetter(data[idx]);
            if (isNumber(value)) {
                squareDifferenceSum += Math.pow(value - average.value, 2);
            }
        }

        return Math.sqrt(squareDifferenceSum / total);
    };

    ErrorRangeCalculator.prototype.getAverage = function getAverage (data) {
        var this$1 = this;

        var length = data.length;
        var sum = 0;
        var count = 0;

        for (var idx = 0; idx < length; idx++) {
            var value = this$1.valueGetter(data[idx]);
            if (isNumber(value)) {
                sum += value;
                count++;
            }
        }

        return {
            value: sum / count,
            count: count
        };
    };

    return ErrorRangeCalculator;
}(_progress_kendoDrawing.Class));

var browser = _progress_kendoDrawing.support.browser || {};

var INITIAL_ANIMATION_DURATION = 600;
var FADEIN = "fadeIn";

var BORDER_BRIGHTNESS = 0.8;
var TOOLTIP_OFFSET = 5;
var START_SCALE = browser.msie ? 0.001 : 0;
var ERROR_LOW_FIELD = "errorLow";
var ERROR_HIGH_FIELD = "errorHigh";
var X_ERROR_LOW_FIELD = "xErrorLow";
var X_ERROR_HIGH_FIELD = "xErrorHigh";
var Y_ERROR_LOW_FIELD = "yErrorLow";
var Y_ERROR_HIGH_FIELD = "yErrorHigh";
var LINE_MARKER_SIZE = 8;
var ZERO = "zero";
var INTERPOLATE = "interpolate";
var GAP = "gap";

var SMOOTH = "smooth";
var STEP = "step";

var AREA = "area";
var BAR = "bar";
var BOX_PLOT = "boxPlot";
var BUBBLE = "bubble";
var BULLET = "bullet";
var CANDLESTICK = "candlestick";
var COLUMN = "column";
var DONUT = "donut";
var FUNNEL = "funnel";
var HORIZONTAL_WATERFALL = "horizontalWaterfall";
var LINE = "line";
var OHLC = "ohlc";
var PIE = "pie";
var POLAR_AREA = "polarArea";
var POLAR_LINE = "polarLine";
var POLAR_SCATTER = "polarScatter";
var RADAR_AREA = "radarArea";
var RADAR_COLUMN = "radarColumn";
var RADAR_LINE = "radarLine";
var RANGE_BAR = "rangeBar";
var RANGE_COLUMN = "rangeColumn";
var SCATTER = "scatter";
var SCATTER_LINE = "scatterLine";
var VERTICAL_AREA = "verticalArea";
var VERTICAL_BOX_PLOT = "verticalBoxPlot";
var VERTICAL_BULLET = "verticalBullet";
var VERTICAL_LINE = "verticalLine";
var WATERFALL = "waterfall";
var EQUALLY_SPACED_SERIES = [
    BAR, COLUMN, OHLC, CANDLESTICK, BOX_PLOT, VERTICAL_BOX_PLOT,
    BULLET, RANGE_COLUMN, RANGE_BAR, WATERFALL, HORIZONTAL_WATERFALL
];

var LEGEND_ITEM_CLICK = "legendItemClick";
var LEGEND_ITEM_HOVER = "legendItemHover";
var SERIES_CLICK = "seriesClick";
var SERIES_HOVER = "seriesHover";
var PLOT_AREA_CLICK = "plotAreaClick";
var PLOT_AREA_HOVER = "plotAreaHover";
var DRAG = "drag";
var DRAG_END = "dragEnd";
var DRAG_START = "dragStart";
var ZOOM_START = "zoomStart";
var ZOOM = "zoom";
var ZOOM_END = "zoomEnd";
var SELECT_START = "selectStart";
var SELECT = "select";
var SELECT_END = "selectEnd";
var RENDER = "render";
var SHOW_TOOLTIP = "showTooltip";
var HIDE_TOOLTIP = "hideTooltip";

var LOGARITHMIC = "log";
var CATEGORY = "category";

var INSIDE_END = "insideEnd";
var INSIDE_BASE = "insideBase";
var OUTSIDE_END = "outsideEnd";

var MOUSEWHEEL = "DOMMouseScroll mousewheel";
var MOUSEWHEEL_DELAY = 150;

var DEFAULT_ERROR_BAR_WIDTH = 4;

var ErrorBarBase = (function (ChartElement$$1) {
    function ErrorBarBase(low, high, isVertical, chart, series, options) {
        ChartElement$$1.call(this, options);

        this.low = low;
        this.high = high;
        this.isVertical = isVertical;
        this.chart = chart;
        this.series = series;
    }

    if ( ChartElement$$1 ) ErrorBarBase.__proto__ = ChartElement$$1;
    ErrorBarBase.prototype = Object.create( ChartElement$$1 && ChartElement$$1.prototype );
    ErrorBarBase.prototype.constructor = ErrorBarBase;

    ErrorBarBase.prototype.reflow = function reflow (targetBox) {
        var endCaps = this.options.endCaps;
        var isVertical = this.isVertical;
        var axis = this.getAxis();
        var valueBox = axis.getSlot(this.low, this.high);
        var centerBox = targetBox.center();
        var capsWidth = this.getCapsWidth(targetBox, isVertical);
        var capValue = isVertical ? centerBox.x : centerBox.y;
        var capStart = capValue - capsWidth;
        var capEnd = capValue + capsWidth;
        var linePoints;

        if (isVertical) {
            linePoints = [
                new Point(centerBox.x, valueBox.y1),
                new Point(centerBox.x, valueBox.y2)
            ];
            if (endCaps) {
                linePoints.push(new Point(capStart, valueBox.y1),
                    new Point(capEnd, valueBox.y1),
                    new Point(capStart, valueBox.y2),
                    new Point(capEnd, valueBox.y2));
            }
            this.box = new Box(capStart, valueBox.y1, capEnd, valueBox.y2);
        } else {
            linePoints = [
                new Point(valueBox.x1, centerBox.y),
                new Point(valueBox.x2, centerBox.y)
            ];
            if (endCaps) {
                linePoints.push(new Point(valueBox.x1, capStart),
                    new Point(valueBox.x1, capEnd),
                    new Point(valueBox.x2, capStart),
                    new Point(valueBox.x2, capEnd));
            }
            this.box = new Box(valueBox.x1, capStart, valueBox.x2, capEnd);
        }

        this.linePoints = linePoints;
    };

    ErrorBarBase.prototype.getCapsWidth = function getCapsWidth (box, isVertical) {
        var boxSize = isVertical ? box.width() : box.height();
        var capsWidth = Math.min(Math.floor(boxSize / 2), DEFAULT_ERROR_BAR_WIDTH) || DEFAULT_ERROR_BAR_WIDTH;

        return capsWidth;
    };

    ErrorBarBase.prototype.createVisual = function createVisual () {
        var this$1 = this;

        var options = this.options;
        var visual = options.visual;

        if (visual) {
            this.visual = visual({
                low: this.low,
                high: this.high,
                rect: this.box.toRect(),
                sender: this.getSender(),
                options: {
                    endCaps: options.endCaps,
                    color: options.color,
                    line: options.line
                },
                createVisual: function () {
                    this$1.createDefaultVisual();
                    var defaultVisual = this$1.visual;
                    delete this$1.visual;
                    return defaultVisual;
                }
            });
        } else {
            this.createDefaultVisual();
        }
    };

    ErrorBarBase.prototype.createDefaultVisual = function createDefaultVisual () {
        var this$1 = this;

        var ref = this;
        var options = ref.options;
        var linePoints = ref.linePoints;
        var lineOptions = {
            stroke: {
                color: options.color,
                width: options.line.width,
                dashType: options.line.dashType
            }
        };

        ChartElement$$1.prototype.createVisual.call(this);

        for (var idx = 0; idx < linePoints.length; idx += 2) {
            var line = new _progress_kendoDrawing.drawing.Path(lineOptions)
                .moveTo(linePoints[idx].x, linePoints[idx].y)
                .lineTo(linePoints[idx + 1].x, linePoints[idx + 1].y);

            alignPathToPixel(line);
            this$1.visual.append(line);
        }
    };

    return ErrorBarBase;
}(ChartElement));

setDefaultOptions(ErrorBarBase, {
    animation: {
        type: FADEIN,
        delay: INITIAL_ANIMATION_DURATION
    },
    endCaps: true,
    line: {
        width: 2
    },
    zIndex: 1
});

var CategoricalErrorBar = (function (ErrorBarBase$$1) {
    function CategoricalErrorBar () {
        ErrorBarBase$$1.apply(this, arguments);
    }

    if ( ErrorBarBase$$1 ) CategoricalErrorBar.__proto__ = ErrorBarBase$$1;
    CategoricalErrorBar.prototype = Object.create( ErrorBarBase$$1 && ErrorBarBase$$1.prototype );
    CategoricalErrorBar.prototype.constructor = CategoricalErrorBar;

    CategoricalErrorBar.prototype.getAxis = function getAxis () {
        var axis = this.chart.seriesValueAxis(this.series);

        return axis;
    };

    return CategoricalErrorBar;
}(ErrorBarBase));

var MAX_EXPAND_DEPTH = 5;

function evalOptions(options, context, state, dryRun) {
    if ( state === void 0 ) state = {};
    if ( dryRun === void 0 ) dryRun = false;

    var defaults = state.defaults = state.defaults || {};
    var depth = state.depth = state.depth || 0;
    var needsEval = false;

    state.excluded = state.excluded || [];

    if (depth > MAX_EXPAND_DEPTH) {
        return null;
    }

    for (var property in options) {
        if (!inArray(property, state.excluded) && options.hasOwnProperty(property)) {
            var propValue = options[property];
            if (isFunction(propValue)) {
                needsEval = true;
                if (!dryRun) {
                    options[property] = valueOrDefault(propValue(context), defaults[property]);
                }
            } else if (isObject(propValue)) {
                if (!dryRun) {
                    state.defaults = defaults[property];
                }
                state.depth++;
                needsEval = evalOptions(propValue, context, state, dryRun) || needsEval;
                state.depth--;
            }
        }
    }

    return needsEval;
}

function categoriesCount(series) {
    var seriesCount = series.length;
    var categories = 0;

    for (var i = 0; i < seriesCount; i++) {
        categories = Math.max(categories, series[i].data.length);
    }

    return categories;
}

var CategoricalChart = (function (ChartElement$$1) {
    function CategoricalChart(plotArea, options) {
        ChartElement$$1.call(this, options);

        this.plotArea = plotArea;
        this.chartService = plotArea.chartService;
        this.categoryAxis = plotArea.seriesCategoryAxis(options.series[0]);

        // Value axis ranges grouped by axis name, e.g.:
        // primary: { min: 0, max: 1 }
        this.valueAxisRanges = {};

        this.points = [];
        this.categoryPoints = [];
        this.seriesPoints = [];
        this.seriesOptions = [];
        this._evalSeries = [];

        this.render();
    }

    if ( ChartElement$$1 ) CategoricalChart.__proto__ = ChartElement$$1;
    CategoricalChart.prototype = Object.create( ChartElement$$1 && ChartElement$$1.prototype );
    CategoricalChart.prototype.constructor = CategoricalChart;

    CategoricalChart.prototype.render = function render () {
        this.traverseDataPoints(this.addValue.bind(this));
    };

    CategoricalChart.prototype.pointOptions = function pointOptions (series, seriesIx) {
        var options = this.seriesOptions[seriesIx];
        if (!options) {
            var defaults = this.pointType().prototype.defaults;
            this.seriesOptions[seriesIx] = options = deepExtend({ }, defaults, {
                vertical: !this.options.invertAxes
            }, series);
        }

        return options;
    };

    CategoricalChart.prototype.plotValue = function plotValue (point) {
        if (!point) {
            return 0;
        }

        if (this.options.isStacked100 && isNumber(point.value)) {
            var categoryIx = point.categoryIx;
            var categoryPoints = this.categoryPoints[categoryIx];
            var otherValues = [];
            var categorySum = 0;

            for (var i = 0; i < categoryPoints.length; i++) {
                var other = categoryPoints[i];
                if (other) {
                    var stack = point.series.stack;
                    var otherStack = other.series.stack;

                    if ((stack && otherStack) && stack.group !== otherStack.group) {
                        continue;
                    }

                    if (isNumber(other.value)) {
                        categorySum += Math.abs(other.value);
                        otherValues.push(Math.abs(other.value));
                    }
                }
            }

            if (categorySum > 0) {
                return point.value / categorySum;
            }
        }

        return point.value;
    };

    CategoricalChart.prototype.plotRange = function plotRange (point, startValue) {
        var this$1 = this;
        if ( startValue === void 0 ) startValue = 0;

        var categoryPoints = this.categoryPoints[point.categoryIx];

        if (this.options.isStacked) {
            var plotValue = this.plotValue(point);
            var positive = plotValue >= 0;
            var prevValue = startValue;
            var isStackedBar = false;

            for (var i = 0; i < categoryPoints.length; i++) {
                var other = categoryPoints[i];

                if (point === other) {
                    break;
                }

                var stack = point.series.stack;
                var otherStack = other.series.stack;
                if (stack && otherStack) {
                    if (typeof stack === STRING && stack !== otherStack) {
                        continue;
                    }

                    if (stack.group && stack.group !== otherStack.group) {
                        continue;
                    }
                }

                var otherValue = this$1.plotValue(other);
                if ((otherValue >= 0 && positive) ||
                    (otherValue < 0 && !positive)) {
                    prevValue += otherValue;
                    plotValue += otherValue;
                    isStackedBar = true;

                    if (this$1.options.isStacked100) {
                        plotValue = Math.min(plotValue, 1);
                    }
                }
            }

            if (isStackedBar) {
                prevValue -= startValue;
            }

            return [ prevValue, plotValue ];
        }

        var series = point.series;
        var valueAxis = this.seriesValueAxis(series);
        var axisCrossingValue = this.categoryAxisCrossingValue(valueAxis);

        return [ axisCrossingValue, point.value || axisCrossingValue ];
    };

    CategoricalChart.prototype.stackLimits = function stackLimits (axisName, stackName) {
        var this$1 = this;

        var min = MAX_VALUE;
        var max = MIN_VALUE;

        for (var i = 0; i < this.categoryPoints.length; i++) {
            var categoryPoints = this$1.categoryPoints[i];
            if (!categoryPoints) {
                continue;
            }

            for (var pIx = 0; pIx < categoryPoints.length; pIx++) {
                var point = categoryPoints[pIx];
                if (point) {
                    if (point.series.stack === stackName || point.series.axis === axisName) {
                        var to = this$1.plotRange(point, 0)[1];
                        if (defined(to) && isFinite(to)) {
                            max = Math.max(max, to);
                            min = Math.min(min, to);
                        }
                    }
                }
            }
        }

        return { min: min, max: max };
    };

    CategoricalChart.prototype.updateStackRange = function updateStackRange () {
        var this$1 = this;

        var ref = this.options;
        var isStacked = ref.isStacked;
        var chartSeries = ref.series;
        var limitsCache = {};

        if (isStacked) {
            for (var i = 0; i < chartSeries.length; i++) {
                var series = chartSeries[i];
                var axisName = series.axis;
                var key = axisName + series.stack;

                var limits = limitsCache[key];
                if (!limits) {
                    limits = this$1.stackLimits(axisName, series.stack);

                    var errorTotals = this$1.errorTotals;
                    if (errorTotals) {
                        if (errorTotals.negative.length) {
                            limits.min = Math.min(limits.min, sparseArrayLimits(errorTotals.negative).min);
                        }
                        if (errorTotals.positive.length) {
                            limits.max = Math.max(limits.max, sparseArrayLimits(errorTotals.positive).max);
                        }
                    }

                    if (limits.min !== MAX_VALUE || limits.max !== MIN_VALUE) {
                        limitsCache[key] = limits;
                    } else {
                        limits = null;
                    }
                }

                if (limits) {
                    this$1.valueAxisRanges[axisName] = limits;
                }
            }
        }
    };

    CategoricalChart.prototype.addErrorBar = function addErrorBar (point, data, categoryIx) {
        var value = point.value;
        var series = point.series;
        var seriesIx = point.seriesIx;
        var errorBars = point.options.errorBars;
        var lowValue = data.fields[ERROR_LOW_FIELD];
        var highValue = data.fields[ERROR_HIGH_FIELD];
        var errorRange;

        if (isNumber(lowValue) && isNumber(highValue)) {
            errorRange = { low: lowValue, high: highValue };
        } else if (errorBars && defined(errorBars.value)) {
            this.seriesErrorRanges = this.seriesErrorRanges || [];
            this.seriesErrorRanges[seriesIx] = this.seriesErrorRanges[seriesIx] ||
                new ErrorRangeCalculator(errorBars.value, series, VALUE);

            errorRange = this.seriesErrorRanges[seriesIx].getErrorRange(value, errorBars.value);
        }

        if (errorRange) {
            point.low = errorRange.low;
            point.high = errorRange.high;
            this.addPointErrorBar(point, categoryIx);
        }
    };

    CategoricalChart.prototype.addPointErrorBar = function addPointErrorBar (point, categoryIx) {
        var isVertical = !this.options.invertAxes;
        var options = point.options.errorBars;
        var series = point.series;
        var low = point.low;
        var high = point.high;

        if (this.options.isStacked) {
            var stackedErrorRange = this.stackedErrorRange(point, categoryIx);
            low = stackedErrorRange.low;
            high = stackedErrorRange.high;
        } else {
            var fields = { categoryIx: categoryIx, series: series };
            this.updateRange({ value: low }, fields);
            this.updateRange({ value: high }, fields);
        }

        var errorBar = new CategoricalErrorBar(low, high, isVertical, this, series, options);
        point.errorBars = [ errorBar ];
        point.append(errorBar);
    };

    CategoricalChart.prototype.stackedErrorRange = function stackedErrorRange (point, categoryIx) {
        var plotValue = this.plotRange(point, 0)[1] - point.value;
        var low = point.low + plotValue;
        var high = point.high + plotValue;

        this.errorTotals = this.errorTotals || { positive: [], negative: [] };

        if (low < 0) {
            this.errorTotals.negative[categoryIx] = Math.min(this.errorTotals.negative[categoryIx] || 0, low);
        }

        if (high > 0) {
            this.errorTotals.positive[categoryIx] = Math.max(this.errorTotals.positive[categoryIx] || 0, high);
        }

        return { low: low, high: high };
    };

    CategoricalChart.prototype.addValue = function addValue (data, fields) {
        var categoryIx = fields.categoryIx;
        var series = fields.series;
        var seriesIx = fields.seriesIx;

        var categoryPoints = this.categoryPoints[categoryIx];
        if (!categoryPoints) {
            this.categoryPoints[categoryIx] = categoryPoints = [];
        }

        var seriesPoints = this.seriesPoints[seriesIx];
        if (!seriesPoints) {
            this.seriesPoints[seriesIx] = seriesPoints = [];
        }

        var point = this.createPoint(data, fields);
        if (point) {
            Object.assign(point, fields);

            point.owner = this;
            point.dataItem = series.data[categoryIx];
            point.noteText = data.fields.noteText;
            this.addErrorBar(point, data, categoryIx);
        }

        this.points.push(point);
        seriesPoints.push(point);
        categoryPoints.push(point);

        this.updateRange(data.valueFields, fields);
    };

    CategoricalChart.prototype.evalPointOptions = function evalPointOptions (options, value, category, categoryIx, series, seriesIx) {
        var state = { defaults: series._defaults, excluded: [ "data", "aggregate", "_events", "tooltip", "content", "template", "visual", "toggle", "_outOfRangeMinPoint", "_outOfRangeMaxPoint" ] };

        var doEval = this._evalSeries[seriesIx];
        if (!defined(doEval)) {
            this._evalSeries[seriesIx] = doEval = evalOptions(options, {}, state, true);
        }

        var pointOptions = options;
        if (doEval) {
            pointOptions = deepExtend({}, pointOptions);
            evalOptions(pointOptions, {
                value: value,
                category: category,
                index: categoryIx,
                series: series,
                dataItem: series.data[categoryIx]
            }, state);
        }

        return pointOptions;
    };

    CategoricalChart.prototype.updateRange = function updateRange (data, fields) {
        var axisName = fields.series.axis;
        var value = data.value;
        var axisRange = this.valueAxisRanges[axisName];

        if (isFinite(value) && value !== null) {
            axisRange = this.valueAxisRanges[axisName] =
                axisRange || { min: MAX_VALUE, max: MIN_VALUE };

            axisRange.min = Math.min(axisRange.min, value);
            axisRange.max = Math.max(axisRange.max, value);
        }
    };

    CategoricalChart.prototype.seriesValueAxis = function seriesValueAxis (series) {
        var plotArea = this.plotArea;
        var axisName = series.axis;
        var axis = axisName ? plotArea.namedValueAxes[axisName] : plotArea.valueAxis;

        if (!axis) {
            throw new Error("Unable to locate value axis with name " + axisName);
        }

        return axis;
    };

    CategoricalChart.prototype.reflow = function reflow (targetBox) {
        var this$1 = this;

        var categorySlots = this.categorySlots = [];
        var chartPoints = this.points;
        var categoryAxis = this.categoryAxis;
        var pointIx = 0;

        this.traverseDataPoints(function (data, fields) {
            var categoryIx = fields.categoryIx;
            var currentSeries = fields.series;

            var valueAxis = this$1.seriesValueAxis(currentSeries);
            var point = chartPoints[pointIx++];

            var categorySlot = categorySlots[categoryIx];
            if (!categorySlot) {
                categorySlots[categoryIx] = categorySlot =
                    this$1.categorySlot(categoryAxis, categoryIx, valueAxis);
            }

            if (point) {
                var plotRange = this$1.plotRange(point, valueAxis.startValue());
                var valueSlot = valueAxis.getSlot(plotRange[0], plotRange[1], !this$1.options.clip);
                if (valueSlot) {
                    var pointSlot = this$1.pointSlot(categorySlot, valueSlot);

                    point.aboveAxis = this$1.aboveAxis(point, valueAxis);
                    point.stackValue = plotRange[1];

                    if (this$1.options.isStacked100) {
                        point.percentage = this$1.plotValue(point);
                    }

                    this$1.reflowPoint(point, pointSlot);
                } else {
                    point.visible = false;
                }
            }
        });

        this.reflowCategories(categorySlots);

        this.box = targetBox;
    };

    CategoricalChart.prototype.aboveAxis = function aboveAxis (point, valueAxis) {
        var axisCrossingValue = this.categoryAxisCrossingValue(valueAxis);
        var value = point.value;

        return valueAxis.options.reverse ?
            value < axisCrossingValue : value >= axisCrossingValue;
    };

    CategoricalChart.prototype.categoryAxisCrossingValue = function categoryAxisCrossingValue (valueAxis) {
        var categoryAxis = this.categoryAxis;
        var options = valueAxis.options;
        var crossingValues = [].concat(
            options.axisCrossingValues || options.axisCrossingValue
        );

        return crossingValues[categoryAxis.axisIndex || 0] || 0;
    };

    CategoricalChart.prototype.reflowPoint = function reflowPoint (point, pointSlot) {
        point.reflow(pointSlot);
    };

    CategoricalChart.prototype.reflowCategories = function reflowCategories () { };

    CategoricalChart.prototype.pointSlot = function pointSlot (categorySlot, valueSlot) {
        var options = this.options;
        var invertAxes = options.invertAxes;
        var slotX = invertAxes ? valueSlot : categorySlot;
        var slotY = invertAxes ? categorySlot : valueSlot;

        return new Box(slotX.x1, slotY.y1, slotX.x2, slotY.y2);
    };

    CategoricalChart.prototype.categorySlot = function categorySlot (categoryAxis, categoryIx) {
        return categoryAxis.getSlot(categoryIx);
    };

    CategoricalChart.prototype.traverseDataPoints = function traverseDataPoints (callback) {
        var this$1 = this;

        var series = this.options.series;
        var categories = this.categoryAxis.options.categories || [];
        var count = categoriesCount(series);
        var seriesCount = series.length;

        for (var seriesIx = 0; seriesIx < seriesCount; seriesIx++) {
            this$1._outOfRangeCallback(series[seriesIx], "_outOfRangeMinPoint", seriesIx, callback);
        }

        for (var categoryIx = 0; categoryIx < count; categoryIx++) {
            for (var seriesIx$1 = 0; seriesIx$1 < seriesCount; seriesIx$1++) {
                var currentSeries = series[seriesIx$1];
                var currentCategory = categories[categoryIx];
                var pointData = this$1._bindPoint(currentSeries, seriesIx$1, categoryIx);

                callback(pointData, {
                    category: currentCategory,
                    categoryIx: categoryIx,
                    series: currentSeries,
                    seriesIx: seriesIx$1
                });
            }
        }

        for (var seriesIx$2 = 0; seriesIx$2 < seriesCount; seriesIx$2++) {
            this$1._outOfRangeCallback(series[seriesIx$2], "_outOfRangeMaxPoint", seriesIx$2, callback);
        }
    };

    CategoricalChart.prototype._outOfRangeCallback = function _outOfRangeCallback (series, field, seriesIx, callback) {
        var outOfRangePoint = series[field];
        if (outOfRangePoint) {
            var categoryIx = outOfRangePoint.categoryIx;
            var pointData = this._bindPoint(series, seriesIx, categoryIx, outOfRangePoint.item);

            callback(pointData, {
                category: outOfRangePoint.category,
                categoryIx: categoryIx,
                series: series,
                seriesIx: seriesIx
            });
        }
    };

    CategoricalChart.prototype._bindPoint = function _bindPoint (series, seriesIx, categoryIx, item) {
        if (!this._bindCache) {
            this._bindCache = [];
        }

        var bindCache = this._bindCache[seriesIx];
        if (!bindCache) {
            bindCache = this._bindCache[seriesIx] = [];
        }

        var data = bindCache[categoryIx];
        if (!data) {
            data = bindCache[categoryIx] = SeriesBinder.current.bindPoint(series, categoryIx, item);
        }

        return data;
    };

    CategoricalChart.prototype.formatPointValue = function formatPointValue (point, format) {
        if (point.value === null) {
            return "";
        }

        return this.chartService.format.auto(format, point.value);
    };

    CategoricalChart.prototype.pointValue = function pointValue (data) {
        return data.valueFields.value;
    };

    return CategoricalChart;
}(ChartElement));

setDefaultOptions(CategoricalChart, {
    series: [],
    invertAxes: false,
    isStacked: false,
    clip: true
});

var PointEventsMixin = {
    click: function(chart, e) {
        return chart.trigger(
            SERIES_CLICK,
            this.eventArgs(e)
        );
    },

    hover: function(chart, e) {
        return chart.trigger(
            SERIES_HOVER,
            this.eventArgs(e)
        );
    },

    eventArgs: function(e) {
        return {
            value: this.value,
            percentage: this.percentage,
            stackValue: this.stackValue,
            category: this.category,
            series: this.series,
            dataItem: this.dataItem,
            runningTotal: this.runningTotal,
            total: this.total,
            element: eventElement(e),
            originalEvent: e,
            point: this
        };
    }
};

var NoteMixin = {
    createNote: function() {
        var options = this.options.notes;
        var text = this.noteText || options.label.text;

        if (options.visible !== false && defined(text) && text !== null) {
            this.note = new Note({
                value: this.value,
                text: text,
                dataItem: this.dataItem,
                category: this.category,
                series: this.series
            }, this.options.notes, this.owner.chartService);

            this.append(this.note);
        }
    }
};

var ABOVE = "above";
var BELOW = "below";

var LinePoint = (function (ChartElement$$1) {
    function LinePoint(value, options) {
        ChartElement$$1.call(this);

        this.value = value;
        this.options = options;
        this.aboveAxis = valueOrDefault(this.options.aboveAxis, true);
        this.tooltipTracking = true;
    }

    if ( ChartElement$$1 ) LinePoint.__proto__ = ChartElement$$1;
    LinePoint.prototype = Object.create( ChartElement$$1 && ChartElement$$1.prototype );
    LinePoint.prototype.constructor = LinePoint;

    LinePoint.prototype.render = function render () {
        var ref = this.options;
        var markers = ref.markers;
        var labels = ref.labels;

        if (this._rendered) {
            return;
        }

        this._rendered = true;

        if (markers.visible && markers.size) {
            this.marker = this.createMarker();
            this.append(this.marker);
        }

        if (labels.visible) {
            var labelTemplate = getTemplate(labels);
            var labelText = this.value;
            if (labelTemplate) {
                labelText = labelTemplate({
                    dataItem: this.dataItem,
                    category: this.category,
                    value: this.value,
                    percentage: this.percentage,
                    stackValue: this.stackValue,
                    series: this.series
                });
            } else if (labels.format) {
                labelText = this.formatValue(labels.format);
            }
            this.label = new TextBox(labelText,
                deepExtend({
                    align: CENTER,
                    vAlign: CENTER,
                    margin: {
                        left: 5,
                        right: 5
                    },
                    zIndex: valueOrDefault(labels.zIndex, this.series.zIndex)
                }, labels)
            );
            this.append(this.label);
        }

        this.createNote();

        if (this.errorBar) {
            this.append(this.errorBar);
        }
    };

    LinePoint.prototype.markerBorder = function markerBorder () {
        var options = this.options.markers;
        var background = options.background;
        var border = deepExtend({ color: this.color }, options.border);

        if (!defined(border.color)) {
            border.color = new _progress_kendoDrawing.Color(background).brightness(BORDER_BRIGHTNESS).toHex();
        }

        return border;
    };

    LinePoint.prototype.createVisual = function createVisual () {};

    LinePoint.prototype.createMarker = function createMarker () {
        var options = this.options.markers;
        var marker = new ShapeElement({
            type: options.type,
            width: options.size,
            height: options.size,
            rotation: options.rotation,
            background: options.background,
            border: this.markerBorder(),
            opacity: options.opacity,
            zIndex: valueOrDefault(options.zIndex, this.series.zIndex),
            animation: options.animation,
            visual: options.visual
        }, {
            dataItem: this.dataItem,
            value: this.value,
            series: this.series,
            category: this.category
        });

        return marker;
    };

    LinePoint.prototype.markerBox = function markerBox () {
        if (!this.marker) {
            this.marker = this.createMarker();
            this.marker.reflow(this._childBox);
        }

        return this.marker.box;
    };

    LinePoint.prototype.reflow = function reflow (targetBox) {
        var this$1 = this;

        var ref = this;
        var options = ref.options;
        var aboveAxis = ref.aboveAxis;
        var vertical = options.vertical;

        this.render();

        this.box = targetBox;
        var childBox = targetBox.clone();

        if (vertical) {
            if (aboveAxis) {
                childBox.y1 -= childBox.height();
            } else {
                childBox.y2 += childBox.height();
            }
        } else {
            if (aboveAxis) {
                childBox.x1 += childBox.width();
            } else {
                childBox.x2 -= childBox.width();
            }
        }

        this._childBox = childBox;
        if (this.marker) {
            this.marker.reflow(childBox);
        }

        this.reflowLabel(childBox);

        if (this.errorBars) {
            for (var i = 0; i < this.errorBars.length; i++) {
                this$1.errorBars[i].reflow(childBox);
            }
        }

        if (this.note) {
            var noteTargetBox = this.markerBox();

            if (!(options.markers.visible && options.markers.size)) {
                var center = noteTargetBox.center();
                noteTargetBox = new Box(center.x, center.y, center.x, center.y);
            }

            this.note.reflow(noteTargetBox);
        }
    };

    LinePoint.prototype.reflowLabel = function reflowLabel (box) {
        var ref = this;
        var options = ref.options;
        var label = ref.label;
        var anchor = options.labels.position;

        if (label) {
            anchor = anchor === ABOVE ? TOP : anchor;
            anchor = anchor === BELOW ? BOTTOM : anchor;

            label.reflow(box);
            label.box.alignTo(this.markerBox(), anchor);
            label.reflow(label.box);
        }
    };

    LinePoint.prototype.createHighlight = function createHighlight () {
        var markers = this.options.highlight.markers;
        var defaultColor = this.markerBorder().color;
        var options = this.options.markers;
        var size = options.size + (options.border.width || 0) + (markers.border.width || 0);

        var shadow = new ShapeElement({
            type: options.type,
            width: size,
            height: size,
            rotation: options.rotation,
            background: markers.color || defaultColor,
            border: {
                color: markers.border.color,
                width: markers.border.width,
                opacity: valueOrDefault(markers.border.opacity, 1)
            },
            opacity: valueOrDefault(markers.opacity, 1)
        });
        shadow.reflow(this._childBox);

        return shadow.getElement();
    };

    LinePoint.prototype.highlightVisual = function highlightVisual () {
        return (this.marker || {}).visual;
    };

    LinePoint.prototype.highlightVisualArgs = function highlightVisualArgs () {
        var marker = this.marker;
        var visual, rect;

        if (marker) {
            rect = marker.paddingBox.toRect();
            visual = marker.visual;
        } else {
            var size = this.options.markers.size;
            var halfSize = size / 2;
            var center = this.box.center();
            rect = new _progress_kendoDrawing.geometry.Rect([ center.x - halfSize, center.y - halfSize ], [ size, size ]);
        }

        return {
            options: this.options,
            rect: rect,
            visual: visual
        };
    };

    LinePoint.prototype.tooltipAnchor = function tooltipAnchor () {
        var markerBox = this.markerBox();
        var clipBox = this.owner.pane.clipBox();
        var showTooltip = !clipBox || clipBox.overlaps(markerBox);

        if (showTooltip) {
            var x = markerBox.x2 + TOOLTIP_OFFSET;
            var horizontalAlign = LEFT;
            var y, verticalAlign;

            if (this.aboveAxis) {
                y = markerBox.y1;
                verticalAlign = BOTTOM;
            } else {
                y = markerBox.y2;
                verticalAlign = TOP;
            }

            return {
                point: new Point(x, y),
                align: {
                    horizontal: horizontalAlign,
                    vertical: verticalAlign
                }
            };
        }
    };

    LinePoint.prototype.formatValue = function formatValue (format) {
        return this.owner.formatPointValue(this, format);
    };

    LinePoint.prototype.overlapsBox = function overlapsBox (box) {
        var markerBox = this.markerBox();
        return markerBox.overlaps(box);
    };

    return LinePoint;
}(ChartElement));

LinePoint.prototype.defaults = {
    vertical: true,
    markers: {
        visible: true,
        background: WHITE,
        size: LINE_MARKER_SIZE,
        type: CIRCLE,
        border: {
            width: 2
        },
        opacity: 1
    },
    labels: {
        visible: false,
        position: ABOVE,
        margin: getSpacing(3),
        padding: getSpacing(4),
        animation: {
            type: FADEIN,
            delay: INITIAL_ANIMATION_DURATION
        }
    },
    notes: {
        label: {}
    },
    highlight: {
        markers: {
            border: {
                color: "#fff",
                width: 2
            }
        }
    },
    errorBars: {
        line: {
            width: 1
        }
    }
};

deepExtend(LinePoint.prototype, PointEventsMixin);
deepExtend(LinePoint.prototype, NoteMixin);

var LineSegment = (function (ChartElement$$1) {
    function LineSegment(linePoints, series, seriesIx) {
        ChartElement$$1.call(this);

        this.linePoints = linePoints;
        this.series = series;
        this.seriesIx = seriesIx;
    }

    if ( ChartElement$$1 ) LineSegment.__proto__ = ChartElement$$1;
    LineSegment.prototype = Object.create( ChartElement$$1 && ChartElement$$1.prototype );
    LineSegment.prototype.constructor = LineSegment;

    LineSegment.prototype.points = function points (visualPoints) {
        var linePoints = this.linePoints.concat(visualPoints || []);
        var points = [];

        for (var i = 0, length = linePoints.length; i < length; i++) {
            if (linePoints[i].visible !== false) {
                points.push(linePoints[i]._childBox.toRect().center());
            }
        }

        return points;
    };

    LineSegment.prototype.createVisual = function createVisual () {
        var ref = this;
        var options = ref.options;
        var series = ref.series;
        var color = series.color;
        var defaults = series._defaults;

        if (isFunction(color) && defaults) {
            color = defaults.color;
        }

        var line = _progress_kendoDrawing.drawing.Path.fromPoints(this.points(), {
            stroke: {
                color: color,
                width: series.width,
                opacity: series.opacity,
                dashType: series.dashType
            },
            zIndex: series.zIndex
        });

        if (options.closed) {
            line.close();
        }

        this.visual = line;
    };

    LineSegment.prototype.aliasFor = function aliasFor (e, coords) {
        return this.parent.getNearestPoint(coords.x, coords.y, this.seriesIx);
    };

    return LineSegment;
}(ChartElement));

setDefaultOptions(LineSegment, {
    closed: false
});

var StepLineSegment = (function (LineSegment$$1) {
    function StepLineSegment () {
        LineSegment$$1.apply(this, arguments);
    }

    if ( LineSegment$$1 ) StepLineSegment.__proto__ = LineSegment$$1;
    StepLineSegment.prototype = Object.create( LineSegment$$1 && LineSegment$$1.prototype );
    StepLineSegment.prototype.constructor = StepLineSegment;

    StepLineSegment.prototype.points = function points (visualPoints) {
        var points = this.calculateStepPoints(this.linePoints);

        if (visualPoints && visualPoints.length) {
            points = points.concat(this.calculateStepPoints(visualPoints).reverse());
        }

        return points;
    };

    StepLineSegment.prototype.calculateStepPoints = function calculateStepPoints (points) {
        var chart = this.parent;
        var plotArea = chart.plotArea;
        var categoryAxis = plotArea.seriesCategoryAxis(this.series);
        var isInterpolate = chart.seriesMissingValues(this.series) === INTERPOLATE;
        var reverse = categoryAxis.options.reverse;
        var vertical = categoryAxis.options.vertical;
        var dir = reverse ? 2 : 1;
        var revDir = reverse ? 1 : 2;
        var length = points.length;
        var result = [];

        for (var i = 1; i < length; i++) {
            var prevPoint = points[i - 1];
            var point = points[i];
            var prevMarkerBoxCenter = prevPoint.markerBox().center();
            var markerBoxCenter = point.markerBox().center();
            if (categoryAxis.options.justified) {
                result.push(new _progress_kendoDrawing.geometry.Point(prevMarkerBoxCenter.x, prevMarkerBoxCenter.y));
                if (vertical) {
                    result.push(new _progress_kendoDrawing.geometry.Point(prevMarkerBoxCenter.x, markerBoxCenter.y));
                } else {
                    result.push(new _progress_kendoDrawing.geometry.Point(markerBoxCenter.x, prevMarkerBoxCenter.y));
                }
                result.push(new _progress_kendoDrawing.geometry.Point(markerBoxCenter.x, markerBoxCenter.y));
            } else {
                if (vertical) {
                    result.push(new _progress_kendoDrawing.geometry.Point(prevMarkerBoxCenter.x, prevPoint.box[Y + dir]));
                    result.push(new _progress_kendoDrawing.geometry.Point(prevMarkerBoxCenter.x, prevPoint.box[Y + revDir]));
                    if (isInterpolate) {
                        result.push(new _progress_kendoDrawing.geometry.Point(prevMarkerBoxCenter.x, point.box[Y + dir]));
                    }
                    result.push(new _progress_kendoDrawing.geometry.Point(markerBoxCenter.x, point.box[Y + dir]));
                    result.push(new _progress_kendoDrawing.geometry.Point(markerBoxCenter.x, point.box[Y + revDir]));
                } else {
                    result.push(new _progress_kendoDrawing.geometry.Point(prevPoint.box[X + dir], prevMarkerBoxCenter.y));
                    result.push(new _progress_kendoDrawing.geometry.Point(prevPoint.box[X + revDir], prevMarkerBoxCenter.y));
                    if (isInterpolate) {
                        result.push(new _progress_kendoDrawing.geometry.Point(point.box[X + dir], prevMarkerBoxCenter.y));
                    }
                    result.push(new _progress_kendoDrawing.geometry.Point(point.box[X + dir], markerBoxCenter.y));
                    result.push(new _progress_kendoDrawing.geometry.Point(point.box[X + revDir], markerBoxCenter.y));
                }
            }
        }

        return result || [];
    };

    return StepLineSegment;
}(LineSegment));

var SplineSegment = (function (LineSegment$$1) {
    function SplineSegment () {
        LineSegment$$1.apply(this, arguments);
    }

    if ( LineSegment$$1 ) SplineSegment.__proto__ = LineSegment$$1;
    SplineSegment.prototype = Object.create( LineSegment$$1 && LineSegment$$1.prototype );
    SplineSegment.prototype.constructor = SplineSegment;

    SplineSegment.prototype.createVisual = function createVisual () {
        var series = this.series;
        var defaults = series._defaults;
        var color = series.color;

        if (isFunction(color) && defaults) {
            color = defaults.color;
        }

        var curveProcessor = new CurveProcessor(this.options.closed);
        var segments = curveProcessor.process(this.points());
        var curve = new _progress_kendoDrawing.drawing.Path({
            stroke: {
                color: color,
                width: series.width,
                opacity: series.opacity,
                dashType: series.dashType
            },
            zIndex: series.zIndex
        });

        curve.segments.push.apply(curve.segments, segments);

        this.visual = curve;
    };

    return SplineSegment;
}(LineSegment));

var LineChartMixin = {
    renderSegments: function() {
        var this$1 = this;

        var ref = this;
        var options = ref.options;
        var seriesPoints = ref.seriesPoints;
        var series = options.series;
        var seriesCount = seriesPoints.length;
        var lastSegment;

        this._segments = [];

        for (var seriesIx = 0; seriesIx < seriesCount; seriesIx++) {
            var currentSeries = series[seriesIx];
            var sortedPoints = this$1.sortPoints(seriesPoints[seriesIx]);
            var pointCount = sortedPoints.length;
            var linePoints = [];

            for (var pointIx = 0; pointIx < pointCount; pointIx++) {
                var point = sortedPoints[pointIx];
                if (point) {
                    linePoints.push(point);
                } else if (this$1.seriesMissingValues(currentSeries) !== INTERPOLATE) {
                    if (linePoints.length > 1) {
                        lastSegment = this$1.createSegment(
                            linePoints, currentSeries, seriesIx, lastSegment
                        );
                        this$1._addSegment(lastSegment);
                    }
                    linePoints = [];
                }
            }

            if (linePoints.length > 1) {
                lastSegment = this$1.createSegment(
                    linePoints, currentSeries, seriesIx, lastSegment
                );
                this$1._addSegment(lastSegment);
            }
        }

        this.children.unshift.apply(this.children, this._segments);
    },

    _addSegment: function(segment) {
        this._segments.push(segment);
        segment.parent = this;
    },

    sortPoints: function(points) {
        return points;
    },

    seriesMissingValues: function(series) {
        var missingValues = series.missingValues;
        var assumeZero = !missingValues && this.options.isStacked;

        return assumeZero ? ZERO : missingValues || INTERPOLATE;
    },

    getNearestPoint: function(x, y, seriesIx) {
        var target = new Point(x, y);
        var allPoints = this.seriesPoints[seriesIx];
        var nearestPointDistance = MAX_VALUE;
        var nearestPoint;

        for (var i = 0; i < allPoints.length; i++) {
            var point = allPoints[i];

            if (point && defined(point.value) && point.value !== null && point.visible !== false) {
                var pointBox = point.box;
                var pointDistance = pointBox.center().distanceTo(target);

                if (pointDistance < nearestPointDistance) {
                    nearestPoint = point;
                    nearestPointDistance = pointDistance;
                }
            }
        }

        return nearestPoint;
    }
};

var ClipAnimation = (function (superclass) {
    function ClipAnimation () {
        superclass.apply(this, arguments);
    }

    if ( superclass ) ClipAnimation.__proto__ = superclass;
    ClipAnimation.prototype = Object.create( superclass && superclass.prototype );
    ClipAnimation.prototype.constructor = ClipAnimation;

    ClipAnimation.prototype.setup = function setup () {
        this._setEnd(this.options.box.x1);
    };

    ClipAnimation.prototype.step = function step (pos) {
        var box = this.options.box;
        this._setEnd(interpolateValue(box.x1, box.x2, pos));
    };

    ClipAnimation.prototype._setEnd = function _setEnd (x) {
        var element = this.element;
        var segments = element.segments;
        var topRight = segments[1].anchor();
        var bottomRight = segments[2].anchor();

        element.suspend();
        topRight.setX(x);
        element.resume();
        bottomRight.setX(x);
    };

    return ClipAnimation;
}(_progress_kendoDrawing.drawing.Animation));

setDefaultOptions(ClipAnimation, {
    duration: INITIAL_ANIMATION_DURATION
});

_progress_kendoDrawing.drawing.AnimationFactory.current.register("clip", ClipAnimation);

function anyHasZIndex(elements) {
    for (var idx = 0; idx < elements.length; idx++) {
        if (defined(elements[idx].zIndex)) {
            return true;
        }
    }
}

var ClipAnimationMixin = {
    createAnimation: function() {
        var root = this.getRoot();
        if (root && (root.options || {}).transitions !== false) {
            var box = root.box;
            var clipPath = _progress_kendoDrawing.drawing.Path.fromRect(box.toRect());
            this.visual.clip(clipPath);
            this.animation = new ClipAnimation(clipPath, {
                box: box
            });
            if (anyHasZIndex(this.options.series)) {
                this._setChildrenAnimation(clipPath);
            }
        }
    },

    _setChildrenAnimation: function(clipPath) {
        var points = this.animationPoints();

        for (var idx = 0; idx < points.length; idx++) {
            var point = points[idx];
            if (point && point.visual && defined(point.visual.options.zIndex)) {
                point.visual.clip(clipPath);
            }
        }
    }
};

var LineChart = (function (CategoricalChart$$1) {
    function LineChart () {
        CategoricalChart$$1.apply(this, arguments);
    }

    if ( CategoricalChart$$1 ) LineChart.__proto__ = CategoricalChart$$1;
    LineChart.prototype = Object.create( CategoricalChart$$1 && CategoricalChart$$1.prototype );
    LineChart.prototype.constructor = LineChart;

    LineChart.prototype.render = function render () {

        CategoricalChart$$1.prototype.render.call(this);

        this.updateStackRange();
        this.renderSegments();
    };

    LineChart.prototype.pointType = function pointType () {
        return LinePoint;
    };

    LineChart.prototype.createPoint = function createPoint (data, fields) {
        var categoryIx = fields.categoryIx;
        var category = fields.category;
        var series = fields.series;
        var seriesIx = fields.seriesIx;
        var missingValues = this.seriesMissingValues(series);
        var value = data.valueFields.value;

        if (!defined(value) || value === null) {
            if (missingValues === ZERO) {
                value = 0;
            } else {
                return null;
            }
        }

        var pointOptions = this.pointOptions(series, seriesIx);
        pointOptions = this.evalPointOptions(
            pointOptions, value, category, categoryIx, series, seriesIx
        );

        var color = data.fields.color || series.color;
        if (isFunction(series.color)) {
            color = pointOptions.color;
        }

        var point = new LinePoint(value, pointOptions);
        point.color = color;

        this.append(point);

        return point;
    };

    LineChart.prototype.plotRange = function plotRange (point) {
        var this$1 = this;

        var plotValue = this.plotValue(point);

        if (this.options.isStacked) {
            var categoryIx = point.categoryIx;
            var categoryPoints = this.categoryPoints[categoryIx];

            for (var i = 0; i < categoryPoints.length; i++) {
                var other = categoryPoints[i];

                if (point === other) {
                    break;
                }

                plotValue += this$1.plotValue(other);

                if (this$1.options.isStacked100) {
                    plotValue = Math.min(plotValue, 1);
                }
            }

        }

        return [ plotValue, plotValue ];
    };

    LineChart.prototype.createSegment = function createSegment (linePoints, currentSeries, seriesIx) {
        var style = currentSeries.style;
        var pointType;

        if (style === STEP) {
            pointType = StepLineSegment;
        } else if (style === SMOOTH) {
            pointType = SplineSegment;
        } else {
            pointType = LineSegment;
        }

        return new pointType(linePoints, currentSeries, seriesIx);
    };

    LineChart.prototype.animationPoints = function animationPoints () {
        var points = this.points;
        var result = [];
        for (var idx = 0; idx < points.length; idx++) {
            result.push((points[idx] || {}).marker);
        }
        return result.concat(this._segments);
    };

    return LineChart;
}(CategoricalChart));

deepExtend(LineChart.prototype, LineChartMixin, ClipAnimationMixin);

var AreaSegmentMixin = {
    points: function() {
        var chart = this.parent;
        var plotArea = chart.plotArea;
        var invertAxes = chart.options.invertAxes;
        var valueAxis = chart.seriesValueAxis(this.series);
        var valueAxisLineBox = valueAxis.lineBox();
        var categoryAxis = plotArea.seriesCategoryAxis(this.series);
        var categoryAxisLineBox = categoryAxis.lineBox();
        var stackPoints = this.stackPoints;
        var points = this._linePoints(stackPoints);
        var pos = invertAxes ? X : Y;
        var end = invertAxes ? categoryAxisLineBox.x1 : categoryAxisLineBox.y1;

        end = limitValue(end, valueAxisLineBox[pos + 1], valueAxisLineBox[pos + 2]);
        if (!this.stackPoints && points.length > 1) {
            var firstPoint = points[0];
            var lastPoint = last(points);

            if (invertAxes) {
                points.unshift(new _progress_kendoDrawing.geometry.Point(end, firstPoint.y));
                points.push(new _progress_kendoDrawing.geometry.Point(end, lastPoint.y));
            } else {
                points.unshift(new _progress_kendoDrawing.geometry.Point(firstPoint.x, end));
                points.push(new _progress_kendoDrawing.geometry.Point(lastPoint.x, end));
            }
        }

        return points;
    },

    createVisual: function() {
        var series = this.series;
        var defaults = series._defaults;
        var color = series.color;

        if (isFunction(color) && defaults) {
            color = defaults.color;
        }

        this.visual = new _progress_kendoDrawing.drawing.Group({
            zIndex: series.zIndex
        });

        this.createArea(color);
        this.createLine(color);
    },

    createLine: function(color) {
        var series = this.series;
        var lineOptions = deepExtend({
            color: color,
            opacity: series.opacity
        }, series.line);

        if (lineOptions.visible !== false && lineOptions.width > 0) {
            var line = _progress_kendoDrawing.drawing.Path.fromPoints(this._linePoints(), {
                stroke: {
                    color: lineOptions.color,
                    width: lineOptions.width,
                    opacity: lineOptions.opacity,
                    dashType: lineOptions.dashType,
                    lineCap: "butt"
                }
            });

            this.visual.append(line);
        }
    },

    createArea: function(color) {
        var series = this.series;

        var area = _progress_kendoDrawing.drawing.Path.fromPoints(this.points(), {
            fill: {
                color: color,
                opacity: series.opacity
            },
            stroke: null
        });

        this.visual.append(area);
    }
};

var AreaSegment = (function (LineSegment$$1) {
    function AreaSegment(linePoints, stackPoints, currentSeries, seriesIx) {
        LineSegment$$1.call(this, linePoints, currentSeries, seriesIx);

        this.stackPoints = stackPoints;
    }

    if ( LineSegment$$1 ) AreaSegment.__proto__ = LineSegment$$1;
    AreaSegment.prototype = Object.create( LineSegment$$1 && LineSegment$$1.prototype );
    AreaSegment.prototype.constructor = AreaSegment;

    return AreaSegment;
}(LineSegment));

deepExtend(AreaSegment.prototype, AreaSegmentMixin, {
    _linePoints: LineSegment.prototype.points
});

var StepAreaSegment = (function (StepLineSegment$$1) {
    function StepAreaSegment(linePoints, stackPoints, currentSeries, seriesIx) {
        StepLineSegment$$1.call(this, linePoints, currentSeries, seriesIx);

        this.stackPoints = stackPoints;
    }

    if ( StepLineSegment$$1 ) StepAreaSegment.__proto__ = StepLineSegment$$1;
    StepAreaSegment.prototype = Object.create( StepLineSegment$$1 && StepLineSegment$$1.prototype );
    StepAreaSegment.prototype.constructor = StepAreaSegment;

    return StepAreaSegment;
}(StepLineSegment));

deepExtend(StepAreaSegment.prototype, AreaSegmentMixin, {
    _linePoints: StepLineSegment.prototype.points
});

var SplineAreaSegment = (function (AreaSegment$$1) {
    function SplineAreaSegment(linePoints, prevSegment, isStacked, currentSeries, seriesIx) {
        AreaSegment$$1.call(this, linePoints, [], currentSeries, seriesIx);

        this.prevSegment = prevSegment;
        this.isStacked = isStacked;
    }

    if ( AreaSegment$$1 ) SplineAreaSegment.__proto__ = AreaSegment$$1;
    SplineAreaSegment.prototype = Object.create( AreaSegment$$1 && AreaSegment$$1.prototype );
    SplineAreaSegment.prototype.constructor = SplineAreaSegment;

    SplineAreaSegment.prototype.strokeSegments = function strokeSegments () {
        var segments = this._strokeSegments;

        if (!segments) {
            var curveProcessor = new CurveProcessor(this.options.closed);
            var linePoints = LineSegment.prototype.points.call(this);
            segments = this._strokeSegments = curveProcessor.process(linePoints);
        }

        return segments;
    };

    SplineAreaSegment.prototype.createVisual = function createVisual () {
        var series = this.series;
        var defaults = series._defaults;
        var color = series.color;

        if (isFunction(color) && defaults) {
            color = defaults.color;
        }

        this.visual = new _progress_kendoDrawing.drawing.Group({
            zIndex: series.zIndex
        });

        this.createFill({
            fill: {
                color: color,
                opacity: series.opacity
            },
            stroke: null
        });

        this.createStroke({
            stroke: deepExtend({
                color: color,
                opacity: series.opacity,
                lineCap: "butt"
            }, series.line)
        });
    };

    SplineAreaSegment.prototype.createFill = function createFill (style) {
        var strokeSegments = this.strokeSegments();
        var fillSegments = strokeSegments.slice(0);
        var prevSegment = this.prevSegment;

        if (this.isStacked && prevSegment) {
            var prevStrokeSegments = prevSegment.strokeSegments();
            var prevAnchor = last(prevStrokeSegments).anchor();

            fillSegments.push(new _progress_kendoDrawing.geometry.Segment(
                prevAnchor,
                prevAnchor,
                last(strokeSegments).anchor()
            ));

            var stackSegments = [];
            for (var idx = prevStrokeSegments.length - 1; idx >= 0; idx--) {
                var segment = prevStrokeSegments[idx];
                stackSegments.push(new _progress_kendoDrawing.geometry.Segment(
                    segment.anchor(),
                    segment.controlOut(),
                    segment.controlIn()
                ));
            }

            append$1(fillSegments, stackSegments);

            var firstAnchor = fillSegments[0].anchor();
            fillSegments.push(new _progress_kendoDrawing.geometry.Segment(
                firstAnchor,
                firstAnchor,
                last(stackSegments).anchor()
            ));
        }

        var fill = new _progress_kendoDrawing.drawing.Path(style);
        fill.segments.push.apply(fill.segments, fillSegments);
        this.closeFill(fill);

        this.visual.append(fill);
    };

    SplineAreaSegment.prototype.closeFill = function closeFill (fillPath) {
        var chart = this.parent;
        var prevSegment = this.prevSegment;
        var plotArea = chart.plotArea;
        var invertAxes = chart.options.invertAxes;
        var valueAxis = chart.seriesValueAxis(this.series);
        var valueAxisLineBox = valueAxis.lineBox();
        var categoryAxis = plotArea.seriesCategoryAxis(this.series);
        var categoryAxisLineBox = categoryAxis.lineBox();
        var pos = invertAxes ? X : Y;
        var segments = this.strokeSegments();
        var firstPoint = segments[0].anchor();
        var lastPoint = last(segments).anchor();
        var end = invertAxes ? categoryAxisLineBox.x1 : categoryAxisLineBox.y1;

        end = limitValue(end, valueAxisLineBox[pos + 1], valueAxisLineBox[pos + 2]);
        if (!(chart.options.isStacked && prevSegment) && segments.length > 1) {
            if (invertAxes) {
                fillPath.lineTo(end, lastPoint.y)
                        .lineTo(end, firstPoint.y);
            } else {
                fillPath.lineTo(lastPoint.x, end)
                        .lineTo(firstPoint.x, end);
            }
        }
    };

    SplineAreaSegment.prototype.createStroke = function createStroke (style) {
        if (style.stroke.width > 0) {
            var stroke = new _progress_kendoDrawing.drawing.Path(style);
            stroke.segments.push.apply(stroke.segments, this.strokeSegments());

            this.visual.append(stroke);
        }
    };

    return SplineAreaSegment;
}(AreaSegment));

var AreaChart = (function (LineChart$$1) {
    function AreaChart () {
        LineChart$$1.apply(this, arguments);
    }

    if ( LineChart$$1 ) AreaChart.__proto__ = LineChart$$1;
    AreaChart.prototype = Object.create( LineChart$$1 && LineChart$$1.prototype );
    AreaChart.prototype.constructor = AreaChart;

    AreaChart.prototype.createSegment = function createSegment (linePoints, currentSeries, seriesIx, prevSegment) {
        var isStacked = this.options.isStacked;
        var style = (currentSeries.line || {}).style;

        var stackPoints;
        if (isStacked && seriesIx > 0 && prevSegment) {
            var missingValues = this.seriesMissingValues(currentSeries);
            if (missingValues !== "gap") {
                stackPoints = prevSegment.linePoints;
            } else {
                stackPoints = this._gapStackPoints(linePoints, seriesIx, style);
            }

            if (style !== STEP) {
                stackPoints = stackPoints.slice(0).reverse();
            }
        }

        if (style === SMOOTH) {
            return new SplineAreaSegment(linePoints, prevSegment, isStacked, currentSeries, seriesIx);
        }

        var pointType;
        if (style === STEP) {
            pointType = StepAreaSegment;
        } else {
            pointType = AreaSegment;
        }

        return new pointType(linePoints, stackPoints, currentSeries, seriesIx);
    };

    AreaChart.prototype.reflow = function reflow (targetBox) {
        var this$1 = this;

        LineChart$$1.prototype.reflow.call(this, targetBox);

        var stackPoints = this._stackPoints;
        if (stackPoints) {
            for (var idx = 0; idx < stackPoints.length; idx++) {
                var stackPoint = stackPoints[idx];
                var pointSlot = this$1.categoryAxis.getSlot(stackPoint.categoryIx);
                stackPoint.reflow(pointSlot);
            }
        }
    };

    AreaChart.prototype._gapStackPoints = function _gapStackPoints (linePoints, seriesIx, style) {
        var this$1 = this;

        var seriesPoints = this.seriesPoints;
        var startIdx = linePoints[0].categoryIx;
        var length = linePoints.length;
        if (startIdx < 0) {
            startIdx = 0;
            length--;
        }

        var endIdx = startIdx + length;
        var pointOffset = this.seriesOptions[0]._outOfRangeMinPoint ? 1 : 0;
        var stackPoints = [];

        this._stackPoints = this._stackPoints || [];
        for (var categoryIx = startIdx; categoryIx < endIdx; categoryIx++) {
            var pointIx = categoryIx + pointOffset;
            var currentSeriesIx = seriesIx;
            var point = (void 0);

            do {
                currentSeriesIx--;
                point = seriesPoints[currentSeriesIx][pointIx];
            } while (currentSeriesIx > 0 && !point);

            if (point) {
                if (style !== STEP && categoryIx > startIdx && !seriesPoints[currentSeriesIx][pointIx - 1]) {
                    stackPoints.push(this$1._previousSegmentPoint(categoryIx, pointIx, pointIx - 1, currentSeriesIx));
                }

                stackPoints.push(point);

                if (style !== STEP && categoryIx + 1 < endIdx && !seriesPoints[currentSeriesIx][pointIx + 1]) {
                    stackPoints.push(this$1._previousSegmentPoint(categoryIx, pointIx, pointIx + 1, currentSeriesIx));
                }
            } else {
                var gapStackPoint = this$1._createGapStackPoint(categoryIx);
                this$1._stackPoints.push(gapStackPoint);
                stackPoints.push(gapStackPoint);
            }
        }

        return stackPoints;
    };

    AreaChart.prototype._previousSegmentPoint = function _previousSegmentPoint (categoryIx, pointIx, segmentIx, seriesIdx) {
        var seriesPoints = this.seriesPoints;
        var index = seriesIdx;
        var point;

        while (index > 0 && !point) {
            index--;
            point = seriesPoints[index][segmentIx];
        }

        if (!point) {
            point = this._createGapStackPoint(categoryIx);
            this._stackPoints.push(point);
        } else {
            point = seriesPoints[index][pointIx];
        }

        return point;
    };

    AreaChart.prototype._createGapStackPoint = function _createGapStackPoint (categoryIx) {
        var options = this.pointOptions({}, 0);
        var point = new LinePoint(0, options);
        point.categoryIx = categoryIx;
        point.series = {};

        return point;
    };

    AreaChart.prototype.seriesMissingValues = function seriesMissingValues (series) {
        return series.missingValues || ZERO;
    };

    return AreaChart;
}(LineChart));

var AxisGroupRangeTracker = (function (Class$$1) {
    function AxisGroupRangeTracker() {
        Class$$1.call(this);

        this.axisRanges = {};
    }

    if ( Class$$1 ) AxisGroupRangeTracker.__proto__ = Class$$1;
    AxisGroupRangeTracker.prototype = Object.create( Class$$1 && Class$$1.prototype );
    AxisGroupRangeTracker.prototype.constructor = AxisGroupRangeTracker;

    AxisGroupRangeTracker.prototype.update = function update (chartAxisRanges) {
        var axisRanges = this.axisRanges;

        for (var axisName in chartAxisRanges) {
            var chartRange = chartAxisRanges[axisName];
            var range = axisRanges[axisName];
            axisRanges[axisName] = range = range || { min: MAX_VALUE, max: MIN_VALUE };

            range.min = Math.min(range.min, chartRange.min);
            range.max = Math.max(range.max, chartRange.max);
        }
    };

    AxisGroupRangeTracker.prototype.reset = function reset (axisName) {
        this.axisRanges[axisName] = undefined;
    };

    AxisGroupRangeTracker.prototype.query = function query (axisName) {
        return this.axisRanges[axisName];
    };

    return AxisGroupRangeTracker;
}(_progress_kendoDrawing.Class));

var BarLabel = (function (ChartElement$$1) {
    function BarLabel(content, options) {
        ChartElement$$1.call(this, options);

        this.textBox = new TextBox(content, this.options);
        this.append(this.textBox);
    }

    if ( ChartElement$$1 ) BarLabel.__proto__ = ChartElement$$1;
    BarLabel.prototype = Object.create( ChartElement$$1 && ChartElement$$1.prototype );
    BarLabel.prototype.constructor = BarLabel;

    BarLabel.prototype.createVisual = function createVisual () {
        this.textBox.options.noclip = this.options.noclip;
    };

    BarLabel.prototype.reflow = function reflow (targetBox) {
        var options = this.options;
        var vertical = options.vertical;
        var aboveAxis = options.aboveAxis;
        var text = this.children[0];
        var textOptions = text.options;
        var box = text.box;
        var padding = text.options.padding;
        var labelBox = targetBox;

        textOptions.align = vertical ? CENTER : LEFT;
        textOptions.vAlign = vertical ? TOP : CENTER;

        if (options.position === INSIDE_END) {
            if (vertical) {
                textOptions.vAlign = TOP;

                if (!aboveAxis && box.height() < targetBox.height()) {
                    textOptions.vAlign = BOTTOM;
                }
            } else {
                textOptions.align = aboveAxis ? RIGHT : LEFT;
            }
        } else if (options.position === CENTER) {
            textOptions.vAlign = CENTER;
            textOptions.align = CENTER;
        } else if (options.position === INSIDE_BASE) {
            if (vertical) {
                textOptions.vAlign = aboveAxis ? BOTTOM : TOP;
            } else {
                textOptions.align = aboveAxis ? LEFT : RIGHT;
            }
        } else if (options.position === OUTSIDE_END) {
            if (vertical) {
                if (aboveAxis) {
                    labelBox = new Box(
                        targetBox.x1, targetBox.y1 - box.height(),
                        targetBox.x2, targetBox.y1
                    );
                } else {
                    labelBox = new Box(
                        targetBox.x1, targetBox.y2,
                        targetBox.x2, targetBox.y2 + box.height()
                    );
                }
            } else {
                textOptions.align = CENTER;
                if (aboveAxis) {
                    labelBox = new Box(
                        targetBox.x2, targetBox.y1,
                        targetBox.x2 + box.width(), targetBox.y2
                    );
                } else {
                    labelBox = new Box(
                        targetBox.x1 - box.width(), targetBox.y1,
                        targetBox.x1, targetBox.y2
                    );
                }
            }
        }

        if (!options.rotation) {
            if (vertical) {
                padding.left = padding.right =
                    (labelBox.width() - text.contentBox.width()) / 2;
            } else {
                padding.top = padding.bottom =
                    (labelBox.height() - text.contentBox.height()) / 2;
            }
        }

        text.reflow(labelBox);
    };

    BarLabel.prototype.alignToClipBox = function alignToClipBox (clipBox) {
        var vertical = this.options.vertical;
        var field = vertical ? Y : X;
        var start = field + "1";
        var end = field + "2";
        var text = this.children[0];
        var parentBox = this.parent.box;

        if (parentBox[start] < clipBox[start] || clipBox[end] < parentBox[end]) {
            var targetBox = text.paddingBox.clone();
            targetBox[start] = Math.max(parentBox[start], clipBox[start]);
            targetBox[end] = Math.min(parentBox[end], clipBox[end]);

            this.reflow(targetBox);
        }
    };

    return BarLabel;
}(ChartElement));

setDefaultOptions(BarLabel, {
    position: OUTSIDE_END,
    margin: getSpacing(3),
    padding: getSpacing(4),
    color: BLACK,
    background: "",
    border: {
        width: 1,
        color: ""
    },
    aboveAxis: true,
    vertical: false,
    animation: {
        type: FADEIN,
        delay: INITIAL_ANIMATION_DURATION
    },
    zIndex: 2
});

function hasGradientOverlay(options) {
    var overlay = options.overlay;

    return overlay && overlay.gradient && overlay.gradient !== "none";
}

var BAR_ALIGN_MIN_WIDTH = 6;

var Bar = (function (ChartElement$$1) {
    function Bar(value, options) {
        ChartElement$$1.call(this);

        this.options = options;
        this.color = options.color || WHITE;
        this.aboveAxis = valueOrDefault(this.options.aboveAxis, true);
        this.value = value;
    }

    if ( ChartElement$$1 ) Bar.__proto__ = ChartElement$$1;
    Bar.prototype = Object.create( ChartElement$$1 && ChartElement$$1.prototype );
    Bar.prototype.constructor = Bar;

    Bar.prototype.render = function render () {
        if (this._rendered) {
            return;
        }

        this._rendered = true;

        this.createLabel();
        this.createNote();

        if (this.errorBar) {
            this.append(this.errorBar);
        }
    };

    Bar.prototype.createLabel = function createLabel () {
        var options = this.options;
        var labels = options.labels;

        if (labels.visible) {
            var labelTemplate = getTemplate(labels);
            var labelText;

            if (labelTemplate) {
                labelText = labelTemplate({
                    dataItem: this.dataItem,
                    category: this.category,
                    value: this.value,
                    percentage: this.percentage,
                    stackValue: this.stackValue,
                    runningTotal: this.runningTotal,
                    total: this.total,
                    series: this.series
                });
            } else {
                labelText = this.formatValue(labels.format);
            }

            this.label = new BarLabel(labelText,
                    deepExtend({
                        vertical: options.vertical
                    },
                    labels
                ));
            this.append(this.label);
        }
    };

    Bar.prototype.formatValue = function formatValue (format) {
        return this.owner.formatPointValue(this, format);
    };

    Bar.prototype.reflow = function reflow (targetBox) {
        var this$1 = this;

        this.render();

        var label = this.label;

        this.box = targetBox;

        if (label) {
            label.options.aboveAxis = this.aboveAxis;
            label.reflow(targetBox);
        }

        if (this.note) {
            this.note.reflow(targetBox);
        }

        if (this.errorBars) {
            for (var i = 0; i < this.errorBars.length; i++) {
                this$1.errorBars[i].reflow(targetBox);
            }
        }
    };

    Bar.prototype.createVisual = function createVisual () {
        var this$1 = this;

        var ref = this;
        var box = ref.box;
        var options = ref.options;
        var customVisual = options.visual;

        if (this.visible !== false) {
            ChartElement$$1.prototype.createVisual.call(this);

            if (customVisual) {
                var visual = this.rectVisual = customVisual({
                    category: this.category,
                    dataItem: this.dataItem,
                    value: this.value,
                    sender: this.getSender(),
                    series: this.series,
                    percentage: this.percentage,
                    stackValue: this.stackValue,
                    runningTotal: this.runningTotal,
                    total: this.total,
                    rect: box.toRect(),
                    createVisual: function () {
                        var group = new _progress_kendoDrawing.drawing.Group();
                        this$1.createRect(group);
                        return group;
                    },
                    options: options
                });

                if (visual) {
                    this.visual.append(visual);
                }
            } else if (box.width() > 0 && box.height() > 0) {
                this.createRect(this.visual);
            }
        }
    };

    Bar.prototype.createRect = function createRect (visual) {
        var options = this.options;
        var border = options.border;
        var strokeOpacity = defined(border.opacity) ? border.opacity : options.opacity;
        var rect = this.box.toRect();

        rect.size.width = Math.round(rect.size.width);

        var path = this.rectVisual = _progress_kendoDrawing.drawing.Path.fromRect(rect, {
            fill: {
                color: this.color,
                opacity: options.opacity
            },
            stroke: {
                color: this.getBorderColor(),
                width: border.width,
                opacity: strokeOpacity,
                dashType: border.dashType
            }
        });

        var width = this.box.width();
        var height = this.box.height();

        var size = options.vertical ? width : height;

        if (size > BAR_ALIGN_MIN_WIDTH) {
            alignPathToPixel(path);

            // Fixes lineJoin issue in firefox when the joined lines are parallel
            if (width < 1 || height < 1) {
                path.options.stroke.lineJoin = "round";
            }
        }

        visual.append(path);

        if (hasGradientOverlay(options)) {
            var overlay = this.createGradientOverlay(path, { baseColor: this.color }, deepExtend({
                end: !options.vertical ? [ 0, 1 ] : undefined
            }, options.overlay));

            visual.append(overlay);
        }
    };

    Bar.prototype.createHighlight = function createHighlight (style) {
        var highlight = _progress_kendoDrawing.drawing.Path.fromRect(this.box.toRect(), style);

        return alignPathToPixel(highlight);
    };

    Bar.prototype.highlightVisual = function highlightVisual () {
        return this.rectVisual;
    };

    Bar.prototype.highlightVisualArgs = function highlightVisualArgs () {
        return {
            options: this.options,
            rect: this.box.toRect(),
            visual: this.rectVisual
        };
    };

    Bar.prototype.getBorderColor = function getBorderColor () {
        var color = this.color;
        var border = this.options.border;
        var brightness = border._brightness || BORDER_BRIGHTNESS;
        var borderColor = border.color;

        if (!defined(borderColor)) {
            borderColor = new _progress_kendoDrawing.Color(color).brightness(brightness).toHex();
        }

        return borderColor;
    };

    Bar.prototype.tooltipAnchor = function tooltipAnchor () {
        var ref = this;
        var options = ref.options;
        var box = ref.box;
        var aboveAxis = ref.aboveAxis;
        var clipBox = this.owner.pane.clipBox() || box;
        var horizontalAlign = LEFT;
        var verticalAlign = TOP;
        var x, y;

        if (options.vertical) {
            x = Math.min(box.x2, clipBox.x2) + TOOLTIP_OFFSET;
            if (aboveAxis) {
                y = Math.max(box.y1, clipBox.y1);
            } else {
                y = Math.min(box.y2, clipBox.y2);
                verticalAlign = BOTTOM;
            }
        } else {
            var x1 = Math.max(box.x1, clipBox.x1);
            var x2 = Math.min(box.x2, clipBox.x2);

            if (options.isStacked) {
                verticalAlign = BOTTOM;
                if (aboveAxis) {
                    horizontalAlign = RIGHT;
                    x = x2;
                } else {
                    x = x1;
                }
                y = Math.max(box.y1, clipBox.y1) - TOOLTIP_OFFSET;
            } else {
                if (aboveAxis) {
                    x = x2 + TOOLTIP_OFFSET;
                } else {
                    x = x1 - TOOLTIP_OFFSET;
                    horizontalAlign = RIGHT;
                }
                y = Math.max(box.y1, clipBox.y1);
            }
        }

        return {
            point: new Point(x, y),
            align: {
                horizontal: horizontalAlign,
                vertical: verticalAlign
            }
        };
    };

    Bar.prototype.overlapsBox = function overlapsBox (box) {
        return this.box.overlaps(box);
    };

    return Bar;
}(ChartElement));

deepExtend(Bar.prototype, PointEventsMixin);
deepExtend(Bar.prototype, NoteMixin);

Bar.prototype.defaults = {
    border: {
        width: 1
    },
    vertical: true,
    overlay: {
        gradient: "glass"
    },
    labels: {
        visible: false,
        format: "{0}"
    },
    opacity: 1,
    notes: {
        label: {}
    }
};

var ClusterLayout = (function (ChartElement$$1) {
    function ClusterLayout () {
        ChartElement$$1.apply(this, arguments);
    }

    if ( ChartElement$$1 ) ClusterLayout.__proto__ = ChartElement$$1;
    ClusterLayout.prototype = Object.create( ChartElement$$1 && ChartElement$$1.prototype );
    ClusterLayout.prototype.constructor = ClusterLayout;

    ClusterLayout.prototype.reflow = function reflow (box) {
        var ref = this.options;
        var vertical = ref.vertical;
        var gap = ref.gap;
        var spacing = ref.spacing;
        var children = this.children;
        var count = children.length;
        var axis = vertical ? Y : X;
        var slots = count + gap + (spacing * (count - 1));
        var slotSize = (vertical ? box.height() : box.width()) / slots;
        var position = box[axis + 1] + slotSize * (gap / 2);

        for (var i = 0; i < count; i++) {
            var childBox = (children[i].box || box).clone();

            childBox[axis + 1] = position;
            childBox[axis + 2] = position + slotSize;

            children[i].reflow(childBox);
            if (i < count - 1) {
                position += (slotSize * spacing);
            }

            position += slotSize;
        }
    };

    return ClusterLayout;
}(ChartElement));

setDefaultOptions(ClusterLayout, {
    vertical: false,
    gap: 0,
    spacing: 0
});

var StackWrap = (function (ChartElement$$1) {
    function StackWrap () {
        ChartElement$$1.apply(this, arguments);
    }

    if ( ChartElement$$1 ) StackWrap.__proto__ = ChartElement$$1;
    StackWrap.prototype = Object.create( ChartElement$$1 && ChartElement$$1.prototype );
    StackWrap.prototype.constructor = StackWrap;

    StackWrap.prototype.reflow = function reflow (targetBox) {
        var this$1 = this;

        var positionAxis = this.options.vertical ? X : Y;
        var children = this.children;
        var childrenCount = children.length;
        var box = this.box = new Box();

        for (var i = 0; i < childrenCount; i++) {
            var currentChild = children[i];

            if (currentChild.visible !== false) {
                var childBox = currentChild.box.clone();
                childBox.snapTo(targetBox, positionAxis);

                if (i === 0) {
                    box = this$1.box = childBox.clone();
                }

                currentChild.reflow(childBox);
                box.wrap(childBox);
            }
        }
    };

    return StackWrap;
}(ChartElement));

setDefaultOptions(StackWrap, {
    vertical: true
});

var BarChart = (function (CategoricalChart$$1) {
    function BarChart () {
        CategoricalChart$$1.apply(this, arguments);
    }

    if ( CategoricalChart$$1 ) BarChart.__proto__ = CategoricalChart$$1;
    BarChart.prototype = Object.create( CategoricalChart$$1 && CategoricalChart$$1.prototype );
    BarChart.prototype.constructor = BarChart;

    BarChart.prototype.render = function render () {
        CategoricalChart$$1.prototype.render.call(this);
        this.updateStackRange();
    };

    BarChart.prototype.pointType = function pointType () {
        return Bar;
    };

    BarChart.prototype.clusterType = function clusterType () {
        return ClusterLayout;
    };

    BarChart.prototype.stackType = function stackType () {
        return StackWrap;
    };

    BarChart.prototype.stackLimits = function stackLimits (axisName, stackName) {
        var limits = CategoricalChart$$1.prototype.stackLimits.call(this, axisName, stackName);

        return limits;
    };

    BarChart.prototype.createPoint = function createPoint (data, fields) {
        var categoryIx = fields.categoryIx;
        var category = fields.category;
        var series = fields.series;
        var seriesIx = fields.seriesIx;
        var ref = this;
        var options = ref.options;
        var children = ref.children;
        var isStacked = options.isStacked;
        var value = this.pointValue(data);
        var pointOptions = this.pointOptions(series, seriesIx);

        var labelOptions = pointOptions.labels;
        if (isStacked) {
            if (labelOptions.position === OUTSIDE_END) {
                labelOptions.position = INSIDE_END;
            }
        }

        pointOptions.isStacked = isStacked;

        var color = data.fields.color || series.color;
        if (value < 0 && pointOptions.negativeColor) {
            color = pointOptions.negativeColor;
        }

        pointOptions = this.evalPointOptions(
            pointOptions, value, category, categoryIx, series, seriesIx
        );

        if (isFunction(series.color)) {
            color = pointOptions.color;
        }

        var pointType = this.pointType();
        var point = new pointType(value, pointOptions);
        point.color = color;

        var cluster = children[categoryIx];
        if (!cluster) {
            var clusterType = this.clusterType();
            cluster = new clusterType({
                vertical: options.invertAxes,
                gap: options.gap,
                spacing: options.spacing
            });
            this.append(cluster);
        }

        if (isStacked) {
            var stackWrap = this.getStackWrap(series, cluster);
            stackWrap.append(point);
        } else {
            cluster.append(point);
        }

        return point;
    };

    BarChart.prototype.getStackWrap = function getStackWrap (series, cluster) {
        var stack = series.stack;
        var stackGroup = stack ? stack.group || stack : stack;
        var wraps = cluster.children;
        var stackWrap;

        if (typeof stackGroup === STRING) {
            for (var i = 0; i < wraps.length; i++) {
                if (wraps[i]._stackGroup === stackGroup) {
                    stackWrap = wraps[i];
                    break;
                }
            }
        } else {
            stackWrap = wraps[0];
        }

        if (!stackWrap) {
            var stackType = this.stackType();
            stackWrap = new stackType({
                vertical: !this.options.invertAxes
            });
            stackWrap._stackGroup = stackGroup;
            cluster.append(stackWrap);
        }

        return stackWrap;
    };

    BarChart.prototype.categorySlot = function categorySlot (categoryAxis, categoryIx, valueAxis) {
        var options = this.options;
        var categorySlot = categoryAxis.getSlot(categoryIx);
        var startValue = valueAxis.startValue();

        if (options.isStacked) {
            var zeroSlot = valueAxis.getSlot(startValue, startValue, true);
            var stackAxis = options.invertAxes ? X : Y;
            categorySlot[stackAxis + 1] = categorySlot[stackAxis + 2] = zeroSlot[stackAxis + 1];
        }

        return categorySlot;
    };

    BarChart.prototype.reflowCategories = function reflowCategories (categorySlots) {
        var children = this.children;
        var childrenLength = children.length;

        for (var i = 0; i < childrenLength; i++) {
            children[i].reflow(categorySlots[i]);
        }
    };

    BarChart.prototype.createAnimation = function createAnimation () {
        this._setAnimationOptions();
        CategoricalChart$$1.prototype.createAnimation.call(this);

        if (anyHasZIndex(this.options.series)) {
            this._setChildrenAnimation();
        }
    };

    BarChart.prototype._setChildrenAnimation = function _setChildrenAnimation () {
        var this$1 = this;

        var points = this.points;

        for (var idx = 0; idx < points.length; idx++) {
            var point = points[idx];
            var pointVisual = point.visual;
            if (pointVisual && defined(pointVisual.options.zIndex)) {
                point.options.animation = this$1.options.animation;
                point.createAnimation();
            }
        }
    };

    BarChart.prototype._setAnimationOptions = function _setAnimationOptions () {
        var options = this.options;
        var animation = options.animation || {};
        var origin;

        if (options.isStacked) {
            var valueAxis = this.seriesValueAxis(options.series[0]);
            origin = valueAxis.getSlot(valueAxis.startValue());
        } else {
            origin = this.categoryAxis.getSlot(0);
        }

        animation.origin = new _progress_kendoDrawing.geometry.Point(origin.x1, origin.y1);
        animation.vertical = !options.invertAxes;
    };

    return BarChart;
}(CategoricalChart));

setDefaultOptions(BarChart, {
    animation: {
        type: BAR
    }
});

var Candlestick = (function (ChartElement$$1) {
    function Candlestick(value, options) {
        ChartElement$$1.call(this, options);
        this.value = value;
    }

    if ( ChartElement$$1 ) Candlestick.__proto__ = ChartElement$$1;
    Candlestick.prototype = Object.create( ChartElement$$1 && ChartElement$$1.prototype );
    Candlestick.prototype.constructor = Candlestick;

    Candlestick.prototype.reflow = function reflow (box) {
        var ref = this;
        var options = ref.options;
        var value = ref.value;
        var chart = ref.owner;
        var valueAxis = chart.seriesValueAxis(options);
        var ocSlot = valueAxis.getSlot(value.open, value.close);
        var lhSlot = valueAxis.getSlot(value.low, value.high);

        ocSlot.x1 = lhSlot.x1 = box.x1;
        ocSlot.x2 = lhSlot.x2 = box.x2;

        this.realBody = ocSlot;

        var mid = lhSlot.center().x;
        var points = [];

        points.push([ [ mid, lhSlot.y1 ], [ mid, ocSlot.y1 ] ]);
        points.push([ [ mid, ocSlot.y2 ], [ mid, lhSlot.y2 ] ]);

        this.lines = points;

        this.box = lhSlot.clone().wrap(ocSlot);

        if (!this._rendered) {
            this._rendered = true;
            this.createNote();
        }

        this.reflowNote();
    };

    Candlestick.prototype.reflowNote = function reflowNote () {
        if (this.note) {
            this.note.reflow(this.box);
        }
    };

    Candlestick.prototype.createVisual = function createVisual () {
        ChartElement$$1.prototype.createVisual.call(this);
        this._mainVisual = this.mainVisual(this.options);
        this.visual.append(
            this._mainVisual
        );

        this.createOverlay();
    };

    Candlestick.prototype.mainVisual = function mainVisual (options) {
        var group = new _progress_kendoDrawing.drawing.Group();

        this.createBody(group, options);
        this.createLines(group, options);

        return group;
    };

    Candlestick.prototype.createBody = function createBody (container, options) {
        var body = _progress_kendoDrawing.drawing.Path.fromRect(this.realBody.toRect(), {
            fill: {
                color: this.color,
                opacity: options.opacity
            },
            stroke: null
        });

        if (options.border.width > 0) {
            body.options.set("stroke", {
                color: this.getBorderColor(),
                width: options.border.width,
                dashType: options.border.dashType,
                opacity: valueOrDefault(options.border.opacity, options.opacity)
            });
        }

        alignPathToPixel(body);
        container.append(body);

        if (hasGradientOverlay(options)) {
            container.append(this.createGradientOverlay(body, { baseColor: this.color }, deepExtend({
                end: !options.vertical ? [ 0, 1 ] : undefined
            }, options.overlay)));
        }
    };

    Candlestick.prototype.createLines = function createLines (container, options) {
        this.drawLines(container, options, this.lines, options.line);
    };

    Candlestick.prototype.drawLines = function drawLines (container, options, lines, lineOptions) {
        if (!lines) {
            return;
        }

        var lineStyle = {
            stroke: {
                color: lineOptions.color || this.color,
                opacity: valueOrDefault(lineOptions.opacity, options.opacity),
                width: lineOptions.width,
                dashType: lineOptions.dashType,
                lineCap: "butt"
            }
        };

        for (var i = 0; i < lines.length; i++) {
            var line = _progress_kendoDrawing.drawing.Path.fromPoints(lines[i], lineStyle);
            alignPathToPixel(line);
            container.append(line);
        }
    };

    Candlestick.prototype.getBorderColor = function getBorderColor () {
        var border = this.options.border;
        var borderColor = border.color;

        if (!defined(borderColor)) {
            borderColor = new _progress_kendoDrawing.Color(this.color).brightness(border._brightness).toHex();
        }

        return borderColor;
    };

    Candlestick.prototype.createOverlay = function createOverlay () {
        var overlay = _progress_kendoDrawing.drawing.Path.fromRect(this.box.toRect(), {
            fill: {
                color: WHITE,
                opacity: 0
            },
            stroke: null
        });

        this.visual.append(overlay);
    };

    Candlestick.prototype.createHighlight = function createHighlight () {
        var highlight = this.options.highlight;
        var normalColor = this.color;

        this.color = highlight.color || this.color;
        var overlay = this.mainVisual(
            deepExtend({}, this.options, {
                line: {
                    color: this.getBorderColor()
                }
            }, highlight)
        );
        this.color = normalColor;

        return overlay;
    };

    Candlestick.prototype.highlightVisual = function highlightVisual () {
        return this._mainVisual;
    };

    Candlestick.prototype.highlightVisualArgs = function highlightVisualArgs () {
        return {
            options: this.options,
            rect: this.box.toRect(),
            visual: this._mainVisual
        };
    };

    Candlestick.prototype.tooltipAnchor = function tooltipAnchor () {
        var box = this.box;
        var clipBox = this.owner.pane.clipBox() || box;

        return {
            point: new Point(box.x2 + TOOLTIP_OFFSET, Math.max(box.y1, clipBox.y1) + TOOLTIP_OFFSET),
            align: {
                horizontal: LEFT,
                vertical: TOP
            }
        };
    };

    Candlestick.prototype.formatValue = function formatValue (format) {
        return this.owner.formatPointValue(this, format);
    };

    Candlestick.prototype.overlapsBox = function overlapsBox (box) {
        return this.box.overlaps(box);
    };

    return Candlestick;
}(ChartElement));

setDefaultOptions(Candlestick, {
    vertical: true,
    border: {
        _brightness: 0.8
    },
    line: {
        width: 2
    },
    overlay: {
        gradient: "glass"
    },
    tooltip: {
        format: "<table>" +
                    "<tr><th colspan='2'>{4:d}</th></tr>" +
                    "<tr><td>Open:</td><td>{0:C}</td></tr>" +
                    "<tr><td>High:</td><td>{1:C}</td></tr>" +
                    "<tr><td>Low:</td><td>{2:C}</td></tr>" +
                    "<tr><td>Close:</td><td>{3:C}</td></tr>" +
                "</table>"
    },
    highlight: {
        opacity: 1,
        border: {
            width: 1,
            opacity: 1
        },
        line: {
            width: 1,
            opacity: 1
        }
    },
    notes: {
        visible: true,
        label: {}
    }
});

deepExtend(Candlestick.prototype, PointEventsMixin);
deepExtend(Candlestick.prototype, NoteMixin);

function areNumbers(values) {
    return countNumbers(values) === values.length;
}

var CandlestickChart = (function (CategoricalChart$$1) {
    function CandlestickChart () {
        CategoricalChart$$1.apply(this, arguments);
    }

    if ( CategoricalChart$$1 ) CandlestickChart.__proto__ = CategoricalChart$$1;
    CandlestickChart.prototype = Object.create( CategoricalChart$$1 && CategoricalChart$$1.prototype );
    CandlestickChart.prototype.constructor = CandlestickChart;

    CandlestickChart.prototype.reflowCategories = function reflowCategories (categorySlots) {
        var children = this.children;
        var childrenLength = children.length;

        for (var i = 0; i < childrenLength; i++) {
            children[i].reflow(categorySlots[i]);
        }
    };

    CandlestickChart.prototype.addValue = function addValue (data, fields) {
        var categoryIx = fields.categoryIx;
        var category = fields.category;
        var series = fields.series;
        var seriesIx = fields.seriesIx;
        var ref = this;
        var children = ref.children;
        var options = ref.options;
        var value = data.valueFields;
        var valueParts = this.splitValue(value);
        var hasValue = areNumbers(valueParts);
        var dataItem = series.data[categoryIx];
        var categoryPoints = this.categoryPoints[categoryIx];
        var point;

        if (!categoryPoints) {
            this.categoryPoints[categoryIx] = categoryPoints = [];
        }

        if (hasValue) {
            point = this.createPoint(data, fields);
        }

        var cluster = children[categoryIx];
        if (!cluster) {
            cluster = new ClusterLayout({
                vertical: options.invertAxes,
                gap: options.gap,
                spacing: options.spacing
            });
            this.append(cluster);
        }

        if (point) {
            this.updateRange(value, fields);

            cluster.append(point);

            point.categoryIx = categoryIx;
            point.category = category;
            point.series = series;
            point.seriesIx = seriesIx;
            point.owner = this;
            point.dataItem = dataItem;
            point.noteText = data.fields.noteText;
        }

        this.points.push(point);
        categoryPoints.push(point);
    };

    CandlestickChart.prototype.pointType = function pointType () {
        return Candlestick;
    };

    CandlestickChart.prototype.createPoint = function createPoint (data, fields) {
        var categoryIx = fields.categoryIx;
        var category = fields.category;
        var series = fields.series;
        var seriesIx = fields.seriesIx;
        var pointType = this.pointType();
        var value = data.valueFields;
        var pointOptions = deepExtend({}, series);
        var color = data.fields.color || series.color;

        pointOptions = this.evalPointOptions(
            pointOptions, value, category, categoryIx, series, seriesIx
        );

        if (series.type === CANDLESTICK) {
            if (value.open > value.close) {
                color = data.fields.downColor || series.downColor || series.color;
            }
        }

        if (isFunction(series.color)) {
            color = pointOptions.color;
        }

        pointOptions.vertical = !this.options.invertAxes;

        var point = new pointType(value, pointOptions);
        point.color = color;

        return point;
    };

    CandlestickChart.prototype.splitValue = function splitValue (value) {
        return [ value.low, value.open, value.close, value.high ];
    };

    CandlestickChart.prototype.updateRange = function updateRange (value, fields) {
        var axisName = fields.series.axis;
        var parts = this.splitValue(value);
        var axisRange = this.valueAxisRanges[axisName];

        axisRange = this.valueAxisRanges[axisName] =
            axisRange || { min: MAX_VALUE, max: MIN_VALUE };

        axisRange = this.valueAxisRanges[axisName] = {
            min: Math.min.apply(Math, parts.concat([ axisRange.min ])),
            max: Math.max.apply(Math, parts.concat([ axisRange.max ]))
        };
    };

    CandlestickChart.prototype.formatPointValue = function formatPointValue (point, format) {
        var value = point.value;

        return this.chartService.format.auto(format,
            value.open, value.high,
            value.low, value.close, point.category
        );
    };

    CandlestickChart.prototype.animationPoints = function animationPoints () {
        return this.points;
    };

    return CandlestickChart;
}(CategoricalChart));

deepExtend(CandlestickChart.prototype, ClipAnimationMixin);

var BoxPlot = (function (Candlestick$$1) {
    function BoxPlot(value, options) {
        Candlestick$$1.call(this, value, options);

        this.createNote();
    }

    if ( Candlestick$$1 ) BoxPlot.__proto__ = Candlestick$$1;
    BoxPlot.prototype = Object.create( Candlestick$$1 && Candlestick$$1.prototype );
    BoxPlot.prototype.constructor = BoxPlot;

    BoxPlot.prototype.reflow = function reflow (box) {
        var ref = this;
        var options = ref.options;
        var value = ref.value;
        var chart = ref.owner;
        var valueAxis = chart.seriesValueAxis(options);
        var whiskerSlot, boxSlot;

        this.boxSlot = boxSlot = valueAxis.getSlot(value.q1, value.q3);
        this.realBody = boxSlot;
        this.reflowBoxSlot(box);

        this.whiskerSlot = whiskerSlot = valueAxis.getSlot(value.lower, value.upper);
        this.reflowWhiskerSlot(box);

        var medianSlot = valueAxis.getSlot(value.median);

        if (value.mean) {
            var meanSlot = valueAxis.getSlot(value.mean);
            this.meanPoints = this.calcMeanPoints(box, meanSlot);
        }

        this.whiskerPoints = this.calcWhiskerPoints(boxSlot, whiskerSlot);
        this.medianPoints = this.calcMedianPoints(box, medianSlot);

        this.box = whiskerSlot.clone().wrap(boxSlot);
        this.reflowNote();
    };

    BoxPlot.prototype.reflowBoxSlot = function reflowBoxSlot (box) {
        this.boxSlot.x1 = box.x1;
        this.boxSlot.x2 = box.x2;
    };

    BoxPlot.prototype.reflowWhiskerSlot = function reflowWhiskerSlot (box) {
        this.whiskerSlot.x1 = box.x1;
        this.whiskerSlot.x2 = box.x2;
    };

    BoxPlot.prototype.calcMeanPoints = function calcMeanPoints (box, meanSlot) {
        return [
            [ [ box.x1, meanSlot.y1 ], [ box.x2, meanSlot.y1 ] ]
        ];
    };

    BoxPlot.prototype.calcWhiskerPoints = function calcWhiskerPoints (boxSlot, whiskerSlot) {
        var mid = whiskerSlot.center().x;
        return [ [
            [ mid - 5, whiskerSlot.y1 ], [ mid + 5, whiskerSlot.y1 ],
            [ mid, whiskerSlot.y1 ], [ mid, boxSlot.y1 ]
        ], [
            [ mid - 5, whiskerSlot.y2 ], [ mid + 5, whiskerSlot.y2 ],
            [ mid, whiskerSlot.y2 ], [ mid, boxSlot.y2 ]
        ] ];
    };

    BoxPlot.prototype.calcMedianPoints = function calcMedianPoints (box, medianSlot) {
        return [
            [ [ box.x1, medianSlot.y1 ], [ box.x2, medianSlot.y1 ] ]
        ];
    };

    BoxPlot.prototype.renderOutliers = function renderOutliers (options) {
        var this$1 = this;

        var value = this.value;
        var outliers = value.outliers || [];
        var outerFence = Math.abs(value.q3 - value.q1) * 3;
        var elements = [];
        var markers = options.markers || {};

        for (var i = 0; i < outliers.length; i++) {
            var outlierValue = outliers[i];
            if (outlierValue < value.q3 + outerFence && outlierValue > value.q1 - outerFence) {
                markers = options.outliers;
            } else {
                markers = options.extremes;
            }
            var markersBorder = deepExtend({}, markers.border);

            if (!defined(markersBorder.color)) {
                if (defined(this$1.color)) {
                    markersBorder.color = this$1.color;
                } else {
                    markersBorder.color =
                        new _progress_kendoDrawing.Color(markers.background).brightness(BORDER_BRIGHTNESS).toHex();
                }
            }

            var shape = new ShapeElement({
                type: markers.type,
                width: markers.size,
                height: markers.size,
                rotation: markers.rotation,
                background: markers.background,
                border: markersBorder,
                opacity: markers.opacity
            });

            shape.value = outlierValue;

            elements.push(shape);
        }

        this.reflowOutliers(elements);
        return elements;
    };

    BoxPlot.prototype.reflowOutliers = function reflowOutliers (outliers) {
        var this$1 = this;

        var valueAxis = this.owner.seriesValueAxis(this.options);
        var center = this.box.center();

        for (var i = 0; i < outliers.length; i++) {
            var outlierValue = outliers[i].value;
            var markerBox = valueAxis.getSlot(outlierValue);

            if (this$1.options.vertical) {
                markerBox.move(center.x);
            } else {
                markerBox.move(undefined, center.y);
            }

            this$1.box = this$1.box.wrap(markerBox);
            outliers[i].reflow(markerBox);
        }
    };

    BoxPlot.prototype.mainVisual = function mainVisual (options) {
        var group = Candlestick$$1.prototype.mainVisual.call(this, options);
        var outliers = this.renderOutliers(options);

        for (var i = 0; i < outliers.length; i++) {
            var element = outliers[i].getElement();
            if (element) {
                group.append(element);
            }
        }

        return group;
    };

    BoxPlot.prototype.createLines = function createLines (container, options) {
        this.drawLines(container, options, this.whiskerPoints, options.whiskers);
        this.drawLines(container, options, this.medianPoints, options.median);
        this.drawLines(container, options, this.meanPoints, options.mean);
    };

    BoxPlot.prototype.getBorderColor = function getBorderColor () {
        if (this.color) {
            return this.color;
        }

        return Candlestick$$1.prototype.getBorderColor.call(this);
    };

    return BoxPlot;
}(Candlestick));

setDefaultOptions(BoxPlot, {
    border: {
        _brightness: 0.8
    },
    line: {
        width: 2
    },
    median: {
        color: "#f6f6f6"
    },
    mean: {
        width: 2,
        dashType: "dash",
        color: "#f6f6f6"
    },
    overlay: {
        gradient: "glass"
    },
    tooltip: {
        format: "<table>" +
                    "<tr><th colspan='2'>{6:d}</th></tr>" +
                    "<tr><td>Lower:</td><td>{0:C}</td></tr>" +
                    "<tr><td>Q1:</td><td>{1:C}</td></tr>" +
                    "<tr><td>Median:</td><td>{2:C}</td></tr>" +
                    "<tr><td>Mean:</td><td>{5:C}</td></tr>" +
                    "<tr><td>Q3:</td><td>{3:C}</td></tr>" +
                    "<tr><td>Upper:</td><td>{4:C}</td></tr>" +
                "</table>"
    },
    highlight: {
        opacity: 1,
        border: {
            width: 1,
            opacity: 1
        },
        line: {
            width: 1,
            opacity: 1
        }
    },
    notes: {
        visible: true,
        label: {}
    },
    outliers: {
        visible: true,
        size: LINE_MARKER_SIZE,
        type: CROSS,
        background: WHITE,
        border: {
            width: 2,
            opacity: 1
        },
        opacity: 0
    },
    extremes: {
        visible: true,
        size: LINE_MARKER_SIZE,
        type: CIRCLE,
        background: WHITE,
        border: {
            width: 2,
            opacity: 1
        },
        opacity: 0
    }
});

deepExtend(BoxPlot.prototype, PointEventsMixin);

var VerticalBoxPlot = (function (BoxPlot$$1) {
    function VerticalBoxPlot () {
        BoxPlot$$1.apply(this, arguments);
    }

    if ( BoxPlot$$1 ) VerticalBoxPlot.__proto__ = BoxPlot$$1;
    VerticalBoxPlot.prototype = Object.create( BoxPlot$$1 && BoxPlot$$1.prototype );
    VerticalBoxPlot.prototype.constructor = VerticalBoxPlot;

    VerticalBoxPlot.prototype.reflowBoxSlot = function reflowBoxSlot (box) {
        this.boxSlot.y1 = box.y1;
        this.boxSlot.y2 = box.y2;
    };

    VerticalBoxPlot.prototype.reflowWhiskerSlot = function reflowWhiskerSlot (box) {
        this.whiskerSlot.y1 = box.y1;
        this.whiskerSlot.y2 = box.y2;
    };

    VerticalBoxPlot.prototype.calcMeanPoints = function calcMeanPoints (box, meanSlot) {
        return [
            [ [ meanSlot.x1, box.y1 ], [ meanSlot.x1, box.y2 ] ]
        ];
    };

    VerticalBoxPlot.prototype.calcWhiskerPoints = function calcWhiskerPoints (boxSlot, whiskerSlot) {
        var mid = whiskerSlot.center().y;
        return [ [
            [ whiskerSlot.x1, mid - 5 ], [ whiskerSlot.x1, mid + 5 ],
            [ whiskerSlot.x1, mid ], [ boxSlot.x1, mid ]
        ], [
            [ whiskerSlot.x2, mid - 5 ], [ whiskerSlot.x2, mid + 5 ],
            [ whiskerSlot.x2, mid ], [ boxSlot.x2, mid ]
        ] ];
    };

    VerticalBoxPlot.prototype.calcMedianPoints = function calcMedianPoints (box, medianSlot) {
        return [
            [ [ medianSlot.x1, box.y1 ], [ medianSlot.x1, box.y2 ] ]
        ];
    };

    return VerticalBoxPlot;
}(BoxPlot));

var BoxPlotChart = (function (CandlestickChart$$1) {
    function BoxPlotChart () {
        CandlestickChart$$1.apply(this, arguments);
    }

    if ( CandlestickChart$$1 ) BoxPlotChart.__proto__ = CandlestickChart$$1;
    BoxPlotChart.prototype = Object.create( CandlestickChart$$1 && CandlestickChart$$1.prototype );
    BoxPlotChart.prototype.constructor = BoxPlotChart;

    BoxPlotChart.prototype.addValue = function addValue (data, fields) {
        var categoryIx = fields.categoryIx;
        var category = fields.category;
        var series = fields.series;
        var seriesIx = fields.seriesIx;
        var ref = this;
        var children = ref.children;
        var options = ref.options;
        var value = data.valueFields;
        var valueParts = this.splitValue(value);
        var hasValue = areNumbers(valueParts);
        var dataItem = series.data[categoryIx];
        var categoryPoints = this.categoryPoints[categoryIx];
        var point;

        if (!categoryPoints) {
            this.categoryPoints[categoryIx] = categoryPoints = [];
        }

        if (hasValue) {
            point = this.createPoint(data, fields);
        }

        var cluster = children[categoryIx];
        if (!cluster) {
            cluster = new ClusterLayout({
                vertical: options.invertAxes,
                gap: options.gap,
                spacing: options.spacing
            });
            this.append(cluster);
        }

        if (point) {
            this.updateRange(value, fields);

            cluster.append(point);

            point.categoryIx = categoryIx;
            point.category = category;
            point.series = series;
            point.seriesIx = seriesIx;
            point.owner = this;
            point.dataItem = dataItem;
        }

        this.points.push(point);
        categoryPoints.push(point);
    };

    BoxPlotChart.prototype.pointType = function pointType () {
        if (this.options.invertAxes) {
            return VerticalBoxPlot;
        }

        return BoxPlot;
    };

    BoxPlotChart.prototype.splitValue = function splitValue (value) {
        return [
            value.lower, value.q1, value.median,
            value.q3, value.upper
        ];
    };

    BoxPlotChart.prototype.updateRange = function updateRange (value, fields) {
        var axisName = fields.series.axis;
        var axisRange = this.valueAxisRanges[axisName];
        var parts = this.splitValue(value).concat(this.filterOutliers(value.outliers));

        if (defined(value.mean)) {
            parts = parts.concat(value.mean);
        }

        axisRange = this.valueAxisRanges[axisName] =
            axisRange || { min: MAX_VALUE, max: MIN_VALUE };

        axisRange = this.valueAxisRanges[axisName] = {
            min: Math.min.apply(Math, parts.concat([ axisRange.min ])),
            max: Math.max.apply(Math, parts.concat([ axisRange.max ]))
        };
    };

    BoxPlotChart.prototype.formatPointValue = function formatPointValue (point, format) {
        var value = point.value;

        return this.chartService.format.auto(format,
            value.lower, value.q1, value.median,
            value.q3, value.upper, value.mean, point.category
        );
    };

    BoxPlotChart.prototype.filterOutliers = function filterOutliers (items) {
        var length = (items || []).length;
        var result = [];

        for (var i = 0; i < length; i++) {
            var item = items[i];
            if (defined(item) && item !== null) {
                result.push(item);
            }
        }

        return result;
    };

    return BoxPlotChart;
}(CandlestickChart));

var ScatterErrorBar = (function (ErrorBarBase$$1) {
    function ScatterErrorBar () {
        ErrorBarBase$$1.apply(this, arguments);
    }

    if ( ErrorBarBase$$1 ) ScatterErrorBar.__proto__ = ErrorBarBase$$1;
    ScatterErrorBar.prototype = Object.create( ErrorBarBase$$1 && ErrorBarBase$$1.prototype );
    ScatterErrorBar.prototype.constructor = ScatterErrorBar;

    ScatterErrorBar.prototype.getAxis = function getAxis () {
        var axes = this.chart.seriesAxes(this.series);
        var axis = this.isVertical ? axes.y : axes.x;

        return axis;
    };

    return ScatterErrorBar;
}(ErrorBarBase));

function hasValue(value) {
    return defined(value) && value !== null;
}

var ScatterChart = (function (ChartElement$$1) {
    function ScatterChart(plotArea, options) {

        ChartElement$$1.call(this, options);

        this.plotArea = plotArea;
        this.chartService = plotArea.chartService;
        this._initFields();

        this.render();
    }

    if ( ChartElement$$1 ) ScatterChart.__proto__ = ChartElement$$1;
    ScatterChart.prototype = Object.create( ChartElement$$1 && ChartElement$$1.prototype );
    ScatterChart.prototype.constructor = ScatterChart;

    ScatterChart.prototype._initFields = function _initFields () {
        // X and Y axis ranges grouped by name, e.g.:
        // primary: { min: 0, max: 1 }
        this.xAxisRanges = {};
        this.yAxisRanges = {};

        this.points = [];
        this.seriesPoints = [];
        this.seriesOptions = [];
        this._evalSeries = [];
    };

    ScatterChart.prototype.render = function render () {
        this.traverseDataPoints(this.addValue.bind(this));
    };

    ScatterChart.prototype.addErrorBar = function addErrorBar (point, field, fields) {
        var value = point.value[field];
        var valueErrorField = field + "Value";
        var lowField = field + "ErrorLow";
        var highField = field + "ErrorHigh";
        var seriesIx = fields.seriesIx;
        var series = fields.series;
        var errorBars = point.options.errorBars;
        var lowValue = fields[lowField];
        var highValue = fields[highField];

        if (isNumber(value)) {
            var errorRange;
            if (isNumber(lowValue) && isNumber(highValue)) {
                errorRange = { low: lowValue, high: highValue };
            }

            if (errorBars && defined(errorBars[valueErrorField])) {
                this.seriesErrorRanges = this.seriesErrorRanges || { x: [], y: [] };
                this.seriesErrorRanges[field][seriesIx] = this.seriesErrorRanges[field][seriesIx] ||
                    new ErrorRangeCalculator(errorBars[valueErrorField], series, field);

                errorRange = this.seriesErrorRanges[field][seriesIx].getErrorRange(value, errorBars[valueErrorField]);
            }

            if (errorRange) {
                this.addPointErrorBar(errorRange, point, field);
            }
        }
    };

    ScatterChart.prototype.addPointErrorBar = function addPointErrorBar (errorRange, point, field) {
        var low = errorRange.low;
        var high = errorRange.high;
        var series = point.series;
        var options = point.options.errorBars;
        var isVertical = field === Y;
        var item = {};

        point[field + "Low"] = low;
        point[field + "High"] = high;

        point.errorBars = point.errorBars || [];
        var errorBar = new ScatterErrorBar(low, high, isVertical, this, series, options);
        point.errorBars.push(errorBar);
        point.append(errorBar);

        item[field] = low;
        this.updateRange(item, series);
        item[field] = high;
        this.updateRange(item, series);
    };

    ScatterChart.prototype.addValue = function addValue (value, fields) {
        var x = value.x;
        var y = value.y;
        var seriesIx = fields.seriesIx;
        var series = this.options.series[seriesIx];
        var missingValues = this.seriesMissingValues(series);
        var seriesPoints = this.seriesPoints[seriesIx];

        var pointValue = value;
        if (!(hasValue(x) && hasValue(y))) {
            pointValue = this.createMissingValue(pointValue, missingValues);
        }

        var point;
        if (pointValue) {
            point = this.createPoint(pointValue, fields);
            if (point) {
                Object.assign(point, fields);
                this.addErrorBar(point, X, fields);
                this.addErrorBar(point, Y, fields);
            }
            this.updateRange(pointValue, fields.series);
        }

        this.points.push(point);
        seriesPoints.push(point);
    };

    ScatterChart.prototype.seriesMissingValues = function seriesMissingValues (series) {
        return series.missingValues;
    };

    ScatterChart.prototype.createMissingValue = function createMissingValue () {};

    ScatterChart.prototype.updateRange = function updateRange (value, series) {
        var intlService = this.chartService.intl;
        var xAxisName = series.xAxis;
        var yAxisName = series.yAxis;
        var x = value.x;
        var y = value.y;
        var xAxisRange = this.xAxisRanges[xAxisName];
        var yAxisRange = this.yAxisRanges[yAxisName];

        if (hasValue(x)) {
            xAxisRange = this.xAxisRanges[xAxisName] =
                xAxisRange || { min: MAX_VALUE, max: MIN_VALUE };

            if (isString(x)) {
                x = parseDate(intlService, x);
            }

            xAxisRange.min = Math.min(xAxisRange.min, x);
            xAxisRange.max = Math.max(xAxisRange.max, x);
        }

        if (hasValue(y)) {
            yAxisRange = this.yAxisRanges[yAxisName] =
                yAxisRange || { min: MAX_VALUE, max: MIN_VALUE };

            if (isString(y)) {
                y = parseDate(intlService, y);
            }

            yAxisRange.min = Math.min(yAxisRange.min, y);
            yAxisRange.max = Math.max(yAxisRange.max, y);
        }
    };

    ScatterChart.prototype.evalPointOptions = function evalPointOptions (options, value, fields) {
        var series = fields.series;
        var seriesIx = fields.seriesIx;
        var state = { defaults: series._defaults, excluded: [ "data", "tooltip", "content", "template", "visual", "toggle", "_outOfRangeMinPoint", "_outOfRangeMaxPoint" ] };

        var doEval = this._evalSeries[seriesIx];
        if (!defined(doEval)) {
            this._evalSeries[seriesIx] = doEval = evalOptions(options, {}, state, true);
        }

        var pointOptions = options;
        if (doEval) {
            pointOptions = deepExtend({}, options);
            evalOptions(pointOptions, {
                value: value,
                series: series,
                dataItem: fields.dataItem
            }, state);
        }

        return pointOptions;
    };

    ScatterChart.prototype.pointType = function pointType () {
        return LinePoint;
    };

    ScatterChart.prototype.pointOptions = function pointOptions (series, seriesIx) {
        var options = this.seriesOptions[seriesIx];
        if (!options) {
            var defaults = this.pointType().prototype.defaults;
            this.seriesOptions[seriesIx] = options = deepExtend({}, defaults, {
                markers: {
                    opacity: series.opacity
                },
                tooltip: {
                    format: this.options.tooltip.format
                },
                labels: {
                    format: this.options.labels.format
                }
            }, series);
        }

        return options;
    };

    ScatterChart.prototype.createPoint = function createPoint (value, fields) {
        var series = fields.series;
        var pointOptions = this.pointOptions(series, fields.seriesIx);
        var color = fields.color || series.color;

        pointOptions = this.evalPointOptions(pointOptions, value, fields);

        if (isFunction(series.color)) {
            color = pointOptions.color;
        }

        var point = new LinePoint(value, pointOptions);
        point.color = color;

        this.append(point);

        return point;
    };

    ScatterChart.prototype.seriesAxes = function seriesAxes (series) {
        var xAxisName = series.xAxis;
        var yAxisName = series.yAxis;
        var plotArea = this.plotArea;
        var xAxis = xAxisName ? plotArea.namedXAxes[xAxisName] : plotArea.axisX;
        var yAxis = yAxisName ? plotArea.namedYAxes[yAxisName] : plotArea.axisY;

        if (!xAxis) {
            throw new Error("Unable to locate X axis with name " + xAxisName);
        }

        if (!yAxis) {
            throw new Error("Unable to locate Y axis with name " + yAxisName);
        }

        return {
            x: xAxis,
            y: yAxis
        };
    };

    ScatterChart.prototype.reflow = function reflow (targetBox) {
        var this$1 = this;

        var chartPoints = this.points;
        var limit = !this.options.clip;
        var pointIx = 0;


        this.traverseDataPoints(function (value, fields) {
            var point = chartPoints[pointIx++];
            var seriesAxes = this$1.seriesAxes(fields.series);
            var slotX = seriesAxes.x.getSlot(value.x, value.x, limit);
            var slotY = seriesAxes.y.getSlot(value.y, value.y, limit);

            if (point) {
                if (slotX && slotY) {
                    var pointSlot = this$1.pointSlot(slotX, slotY);
                    point.reflow(pointSlot);
                } else {
                    point.visible = false;
                }
            }
        });

        this.box = targetBox;
    };

    ScatterChart.prototype.pointSlot = function pointSlot (slotX, slotY) {
        return new Box(slotX.x1, slotY.y1, slotX.x2, slotY.y2);
    };

    ScatterChart.prototype.traverseDataPoints = function traverseDataPoints (callback) {
        var this$1 = this;

        var ref = this;
        var series = ref.options.series;
        var seriesPoints = ref.seriesPoints;

        for (var seriesIx = 0; seriesIx < series.length; seriesIx++) {
            var currentSeries = series[seriesIx];
            var currentSeriesPoints = seriesPoints[seriesIx];
            if (!currentSeriesPoints) {
                seriesPoints[seriesIx] = [];
            }

            for (var pointIx = 0; pointIx < currentSeries.data.length; pointIx++) {
                var ref$1 = this$1._bindPoint(currentSeries, seriesIx, pointIx);
                var value = ref$1.valueFields;
                var fields = ref$1.fields;

                callback(value, deepExtend({
                    pointIx: pointIx,
                    series: currentSeries,
                    seriesIx: seriesIx,
                    dataItem: currentSeries.data[pointIx],
                    owner: this$1
                }, fields));
            }
        }
    };

    ScatterChart.prototype.formatPointValue = function formatPointValue (point, format) {
        var value = point.value;
        return this.chartService.format.auto(format, value.x, value.y);
    };

    ScatterChart.prototype.animationPoints = function animationPoints () {
        var points = this.points;
        var result = [];
        for (var idx = 0; idx < points.length; idx++) {
            result.push((points[idx] || {}).marker);
        }
        return result;
    };

    return ScatterChart;
}(ChartElement));
setDefaultOptions(ScatterChart, {
    series: [],
    tooltip: {
        format: "{0}, {1}"
    },
    labels: {
        format: "{0}, {1}"
    },
    clip: true
});
deepExtend(ScatterChart.prototype, ClipAnimationMixin, {
    _bindPoint: CategoricalChart.prototype._bindPoint
});

var Bubble = (function (LinePoint$$1) {
    function Bubble(value, options) {
        LinePoint$$1.call(this, value, options);

        this.category = value.category;
    }

    if ( LinePoint$$1 ) Bubble.__proto__ = LinePoint$$1;
    Bubble.prototype = Object.create( LinePoint$$1 && LinePoint$$1.prototype );
    Bubble.prototype.constructor = Bubble;

    Bubble.prototype.createHighlight = function createHighlight () {
        var highlight = this.options.highlight;
        var border = highlight.border;
        var markers = this.options.markers;
        var center = this.box.center();
        var radius = (markers.size + markers.border.width + border.width) / 2;
        var highlightGroup = new _progress_kendoDrawing.drawing.Group();
        var shadow = new _progress_kendoDrawing.drawing.Circle(new _progress_kendoDrawing.geometry.Circle([ center.x, center.y + radius / 5 + border.width / 2 ], radius + border.width / 2), {
            stroke: {
                color: 'none'
            },
            fill: this.createGradient({
                gradient: 'bubbleShadow',
                color: markers.background,
                stops: [ {
                    offset: 0,
                    color: markers.background,
                    opacity: 0.3
                }, {
                    offset: 1,
                    color: markers.background,
                    opacity: 0
                } ]
            })
        });
        var overlay = new _progress_kendoDrawing.drawing.Circle(new _progress_kendoDrawing.geometry.Circle([ center.x, center.y ], radius), {
            stroke: {
                color: border.color ||
                    new _progress_kendoDrawing.Color(markers.background).brightness(BORDER_BRIGHTNESS).toHex(),
                width: border.width,
                opacity: border.opacity
            },
            fill: {
                color: markers.background,
                opacity: highlight.opacity
            }
        });

        highlightGroup.append(shadow, overlay);

        return highlightGroup;
    };

    return Bubble;
}(LinePoint));

Bubble.prototype.defaults = deepExtend({}, Bubble.prototype.defaults, {
    labels: {
        position: CENTER
    },
    highlight: {
        opacity: 1,
        border: {
            color: "#fff",
            width: 2,
            opacity: 1
        }
    }
});

var BubbleChart = (function (ScatterChart$$1) {
    function BubbleChart () {
        ScatterChart$$1.apply(this, arguments);
    }

    if ( ScatterChart$$1 ) BubbleChart.__proto__ = ScatterChart$$1;
    BubbleChart.prototype = Object.create( ScatterChart$$1 && ScatterChart$$1.prototype );
    BubbleChart.prototype.constructor = BubbleChart;

    BubbleChart.prototype._initFields = function _initFields () {
        this._maxSize = MIN_VALUE;
        ScatterChart$$1.prototype._initFields.call(this);
    };

    BubbleChart.prototype.addValue = function addValue (value, fields) {
        if (value.size !== null && (value.size > 0 || (value.size < 0 && fields.series.negativeValues.visible))) {
            this._maxSize = Math.max(this._maxSize, Math.abs(value.size));
            ScatterChart$$1.prototype.addValue.call(this, value, fields);
        } else {
            this.points.push(null);
            this.seriesPoints[fields.seriesIx].push(null);
        }
    };

    BubbleChart.prototype.reflow = function reflow (box) {
        this.updateBubblesSize(box);
        ScatterChart$$1.prototype.reflow.call(this, box);
    };

    BubbleChart.prototype.pointType = function pointType () {
        return Bubble;
    };

    BubbleChart.prototype.createPoint = function createPoint (value, fields) {
        var series = fields.series;
        var pointsCount = series.data.length;
        var delay = fields.pointIx * (INITIAL_ANIMATION_DURATION / pointsCount);
        var animationOptions = {
            delay: delay,
            duration: INITIAL_ANIMATION_DURATION - delay,
            type: BUBBLE
        };

        var color = fields.color || series.color;
        if (value.size < 0 && series.negativeValues.visible) {
            color = valueOrDefault(
                series.negativeValues.color, color
            );
        }

        var pointOptions = deepExtend({
            labels: {
                animation: {
                    delay: delay,
                    duration: INITIAL_ANIMATION_DURATION - delay
                }
            }
        }, this.pointOptions(series, fields.seriesIx), {
            markers: {
                type: CIRCLE,
                border: series.border,
                opacity: series.opacity,
                animation: animationOptions
            }
        });

        pointOptions = this.evalPointOptions(pointOptions, value, fields);
        if (isFunction(series.color)) {
            color = pointOptions.color;
        }

        pointOptions.markers.background = color;

        var point = new Bubble(value, pointOptions);
        point.color = color;

        this.append(point);

        return point;
    };

    BubbleChart.prototype.updateBubblesSize = function updateBubblesSize (box) {
        var this$1 = this;

        var ref = this;
        var series = ref.options.series;
        var boxSize = Math.min(box.width(), box.height());

        for (var seriesIx = 0; seriesIx < series.length; seriesIx++) {
            var currentSeries = series[seriesIx];
            var seriesPoints = this$1.seriesPoints[seriesIx];
            var minSize = currentSeries.minSize || Math.max(boxSize * 0.02, 10);
            var maxSize = currentSeries.maxSize || boxSize * 0.2;
            var minR = minSize / 2;
            var maxR = maxSize / 2;
            var minArea = Math.PI * minR * minR;
            var maxArea = Math.PI * maxR * maxR;
            var areaRange = maxArea - minArea;
            var areaRatio = areaRange / this$1._maxSize;

            for (var pointIx = 0; pointIx < seriesPoints.length; pointIx++) {
                var point = seriesPoints[pointIx];
                if (point) {
                    var area = Math.abs(point.value.size) * areaRatio;
                    var radius = Math.sqrt((minArea + area) / Math.PI);
                    var baseZIndex = valueOrDefault(point.options.zIndex, 0);
                    var zIndex = baseZIndex + (1 - radius / maxR);

                    deepExtend(point.options, {
                        zIndex: zIndex,
                        markers: {
                            size: radius * 2,
                            zIndex: zIndex
                        },
                        labels: {
                            zIndex: zIndex + 1
                        }
                    });
                }
            }
        }
    };

    BubbleChart.prototype.formatPointValue = function formatPointValue (point, format) {
        var value = point.value;
        return this.chartService.format.auto(format, value.x, value.y, value.size, point.category);
    };

    BubbleChart.prototype.createAnimation = function createAnimation () {};
    BubbleChart.prototype.createVisual = function createVisual () {};

    return BubbleChart;
}(ScatterChart));

setDefaultOptions(BubbleChart, {
    tooltip: {
        format: "{3}"
    },
    labels: {
        format: "{3}"
    }
});

var Target = (function (ShapeElement$$1) {
	function Target () {
		ShapeElement$$1.apply(this, arguments);
	}if ( ShapeElement$$1 ) Target.__proto__ = ShapeElement$$1;
	Target.prototype = Object.create( ShapeElement$$1 && ShapeElement$$1.prototype );
	Target.prototype.constructor = Target;

	

	return Target;
}(ShapeElement));

deepExtend(Target.prototype, PointEventsMixin);

var Bullet = (function (ChartElement$$1) {
    function Bullet(value, options) {
        ChartElement$$1.call(this, options);

        this.aboveAxis = this.options.aboveAxis;
        this.color = options.color || WHITE;
        this.value = value;
    }

    if ( ChartElement$$1 ) Bullet.__proto__ = ChartElement$$1;
    Bullet.prototype = Object.create( ChartElement$$1 && ChartElement$$1.prototype );
    Bullet.prototype.constructor = Bullet;

    Bullet.prototype.render = function render () {
        var options = this.options;

        if (!this._rendered) {
            this._rendered = true;

            if (defined(this.value.target)) {
                this.target = new Target({
                    type: options.target.shape,
                    background: options.target.color || this.color,
                    opacity: options.opacity,
                    zIndex: options.zIndex,
                    border: options.target.border,
                    vAlign: TOP,
                    align: RIGHT
                });

                this.target.value = this.value;
                this.target.dataItem = this.dataItem;
                this.target.series = this.series;

                this.append(this.target);
            }

            this.createNote();
        }
    };

    Bullet.prototype.reflow = function reflow (box) {
        this.render();

        var ref = this;
        var options = ref.options;
        var target = ref.target;
        var chart = ref.owner;
        var invertAxes = options.invertAxes;
        var valueAxis = chart.seriesValueAxis(this.options);
        var categorySlot = chart.categorySlot(chart.categoryAxis, options.categoryIx, valueAxis);
        var targetValueSlot = valueAxis.getSlot(this.value.target);
        var targetSlotX = invertAxes ? targetValueSlot : categorySlot;
        var targetSlotY = invertAxes ? categorySlot : targetValueSlot;

        if (target) {
            var targetSlot = new Box(
                targetSlotX.x1, targetSlotY.y1,
                targetSlotX.x2, targetSlotY.y2
            );
            target.options.height = invertAxes ? targetSlot.height() : options.target.line.width;
            target.options.width = invertAxes ? options.target.line.width : targetSlot.width();
            target.reflow(targetSlot);
        }

        if (this.note) {
            this.note.reflow(box);
        }

        this.box = box;
    };

    Bullet.prototype.createVisual = function createVisual () {
        ChartElement$$1.prototype.createVisual.call(this);

        var options = this.options;
        var body = _progress_kendoDrawing.drawing.Path.fromRect(this.box.toRect(), {
            fill: {
                color: this.color,
                opacity: options.opacity
            },
            stroke: null
        });

        if (options.border.width > 0) {
            body.options.set("stroke", {
                color: options.border.color || this.color,
                width: options.border.width,
                dashType: options.border.dashType,
                opacity: valueOrDefault(options.border.opacity, options.opacity)
            });
        }

        this.bodyVisual = body;

        alignPathToPixel(body);
        this.visual.append(body);
    };

    Bullet.prototype.createAnimation = function createAnimation () {
        if (this.bodyVisual) {
            this.animation = _progress_kendoDrawing.drawing.Animation.create(
                this.bodyVisual, this.options.animation
            );
        }
    };

    Bullet.prototype.createHighlight = function createHighlight (style) {
        return _progress_kendoDrawing.drawing.Path.fromRect(this.box.toRect(), style);
    };

    Bullet.prototype.highlightVisual = function highlightVisual () {
        return this.bodyVisual;
    };

    Bullet.prototype.highlightVisualArgs = function highlightVisualArgs () {
        return {
            rect: this.box.toRect(),
            visual: this.bodyVisual,
            options: this.options
        };
    };

    Bullet.prototype.formatValue = function formatValue (format) {
        return this.owner.formatPointValue(this, format);
    };

    return Bullet;
}(ChartElement));

Bullet.prototype.tooltipAnchor = Bar.prototype.tooltipAnchor;

setDefaultOptions(Bullet, {
    border: {
        width: 1
    },
    vertical: false,
    opacity: 1,
    target: {
        shape: "",
        border: {
            width: 0,
            color: "green"
        },
        line: {
            width: 2
        }
    },
    tooltip: {
        format: "Current: {0}<br />Target: {1}"
    }
});

deepExtend(Bullet.prototype, PointEventsMixin);
deepExtend(Bullet.prototype, NoteMixin);

var BulletChart = (function (CategoricalChart$$1) {
    function BulletChart(plotArea, options) {

        wrapData(options);

        CategoricalChart$$1.call(this, plotArea, options);
    }

    if ( CategoricalChart$$1 ) BulletChart.__proto__ = CategoricalChart$$1;
    BulletChart.prototype = Object.create( CategoricalChart$$1 && CategoricalChart$$1.prototype );
    BulletChart.prototype.constructor = BulletChart;

    BulletChart.prototype.reflowCategories = function reflowCategories (categorySlots) {
        var children = this.children;
        var childrenLength = children.length;

        for (var i = 0; i < childrenLength; i++) {
            children[i].reflow(categorySlots[i]);
        }
    };

    BulletChart.prototype.plotRange = function plotRange (point) {
        var series = point.series;
        var valueAxis = this.seriesValueAxis(series);
        var axisCrossingValue = this.categoryAxisCrossingValue(valueAxis);

        return [ axisCrossingValue, point.value.current || axisCrossingValue ];
    };

    BulletChart.prototype.createPoint = function createPoint (data, fields) {
        var categoryIx = fields.categoryIx;
        var category = fields.category;
        var series = fields.series;
        var seriesIx = fields.seriesIx;
        var ref = this;
        var options = ref.options;
        var children = ref.children;
        var value = data.valueFields;

        var bulletOptions = deepExtend({
            vertical: !options.invertAxes,
            overlay: series.overlay,
            categoryIx: categoryIx,
            invertAxes: options.invertAxes
        }, series);

        var color = data.fields.color || series.color;
        bulletOptions = this.evalPointOptions(
            bulletOptions, value, category, categoryIx, series, seriesIx
        );

        if (isFunction(series.color)) {
            color = bulletOptions.color;
        }

        var bullet = new Bullet(value, bulletOptions);
        bullet.color = color;

        var cluster = children[categoryIx];
        if (!cluster) {
            cluster = new ClusterLayout({
                vertical: options.invertAxes,
                gap: options.gap,
                spacing: options.spacing
            });
            this.append(cluster);
        }

        cluster.append(bullet);

        return bullet;
    };

    BulletChart.prototype.updateRange = function updateRange (value, fields) {
        var current = value.current;
        var target = value.target;
        var axisName = fields.series.axis;
        var axisRange = this.valueAxisRanges[axisName];

        if (defined(current) && !isNaN(current) && defined(target && !isNaN(target))) {
            axisRange = this.valueAxisRanges[axisName] =
                axisRange || { min: MAX_VALUE, max: MIN_VALUE };

            axisRange.min = Math.min(axisRange.min, current, target);
            axisRange.max = Math.max(axisRange.max, current, target);
        }
    };

    BulletChart.prototype.formatPointValue = function formatPointValue (point, format) {
        return this.chartService.format.auto(format, point.value.current, point.value.target);
    };

    BulletChart.prototype.pointValue = function pointValue (data) {
        return data.valueFields.current;
    };

    BulletChart.prototype.aboveAxis = function aboveAxis (point) {
        var value = point.value.current;

        return value > 0;
    };

    BulletChart.prototype.createAnimation = function createAnimation () {
        var this$1 = this;

        var points = this.points;

        this._setAnimationOptions();

        for (var idx = 0; idx < points.length; idx++) {
            var point = points[idx];
            point.options.animation = this$1.options.animation;
            point.createAnimation();
        }
    };

    return BulletChart;
}(CategoricalChart));

BulletChart.prototype._setAnimationOptions = BarChart.prototype._setAnimationOptions;

setDefaultOptions(BulletChart, {
    animation: {
        type: BAR
    }
});

function wrapData(options) {
    var series = options.series;

    for (var i = 0; i < series.length; i++) {
        var seriesItem = series[i];
        var data = seriesItem.data;
        if (data && !isArray(data[0]) && !isObject(data[0])) {
            seriesItem.data = [ data ];
        }
    }
}

var BaseTooltip = (function (Class$$1) {
    function BaseTooltip(chartService, options) {
        Class$$1.call(this);

        this.chartService = chartService;
        this.options = deepExtend({}, this.options, options);
    }

    if ( Class$$1 ) BaseTooltip.__proto__ = Class$$1;
    BaseTooltip.prototype = Object.create( Class$$1 && Class$$1.prototype );
    BaseTooltip.prototype.constructor = BaseTooltip;

    BaseTooltip.prototype.getStyle = function getStyle (options, point) {
        var background = options.background;
        var border = options.border.color;

        if (point) {
            var pointColor = point.color || point.options.color;
            background = valueOrDefault(background, pointColor);
            border = valueOrDefault(border, pointColor);
        }

        var padding = getSpacing(options.padding || {}, "auto");

        return {
            backgroundColor: background,
            borderColor: border,
            font: options.font,
            color: options.color,
            opacity: options.opacity,
            borderWidth: styleValue(options.border.width),
            paddingTop: styleValue(padding.top),
            paddingBottom: styleValue(padding.bottom),
            paddingLeft: styleValue(padding.left),
            paddingRight: styleValue(padding.right)
        };
    };

    BaseTooltip.prototype.show = function show (options, tooltipOptions, point) {
        options.format = tooltipOptions.format;

        var style = this.getStyle(tooltipOptions, point);
        options.style = style;

        if (!defined(tooltipOptions.color) && new _progress_kendoDrawing.Color(style.backgroundColor).percBrightness() > 180) {
            options.className = "k-chart-tooltip-inverse";
        }

        this.chartService.notify(SHOW_TOOLTIP, options);
    };

    BaseTooltip.prototype.hide = function hide () {
        if (this.chartService) {
            this.chartService.notify(HIDE_TOOLTIP);
        }
    };

    BaseTooltip.prototype.destroy = function destroy () {
        delete this.chartService;
    };

    return BaseTooltip;
}(_progress_kendoDrawing.Class));

setDefaultOptions(BaseTooltip, {
    border: {
        width: 1
    },
    opacity: 1
});

var CrosshairTooltip = (function (BaseTooltip$$1) {
    function CrosshairTooltip(chartService, crosshair, options) {
        BaseTooltip$$1.call(this, chartService, options);

        this.crosshair = crosshair;
        this.formatService = chartService.format;
        this.initAxisName();
    }

    if ( BaseTooltip$$1 ) CrosshairTooltip.__proto__ = BaseTooltip$$1;
    CrosshairTooltip.prototype = Object.create( BaseTooltip$$1 && BaseTooltip$$1.prototype );
    CrosshairTooltip.prototype.constructor = CrosshairTooltip;

    CrosshairTooltip.prototype.initAxisName = function initAxisName () {
        var axis = this.crosshair.axis;
        var plotArea = axis.plotArea;
        var name;
        if (plotArea.categoryAxis) {
            name = axis.getCategory ? "categoryAxis" : "valueAxis";
        } else {
            name = axis.options.vertical ? "yAxis" : "xAxis";
        }
        this.axisName = name;
    };

    CrosshairTooltip.prototype.showAt = function showAt (point) {
        var ref = this;
        var axis = ref.crosshair.axis;
        var options = ref.options;
        var value = axis[options.stickyMode ? "getCategory" : "getValue"](point);
        var formattedValue = value;

        if (options.format) {
            formattedValue = this.formatService.auto(options.format, value);
        } else if (axis.options.type === DATE) {
            formattedValue = this.formatService.auto(axis.options.labels.dateFormats[axis.options.baseUnit], value);
        }

        this.show({
            point: point,
            anchor: this.getAnchor(),
            crosshair: this.crosshair,
            value: formattedValue,
            axisName: this.axisName,
            axisIndex: this.crosshair.axis.axisIndex
        }, this.options);
    };

    CrosshairTooltip.prototype.hide = function hide () {
        this.chartService.notify(HIDE_TOOLTIP, {
            crosshair: this.crosshair,
            axisName: this.axisName,
            axisIndex: this.crosshair.axis.axisIndex
        });
    };

    CrosshairTooltip.prototype.getAnchor = function getAnchor () {
        var ref = this;
        var crosshair = ref.crosshair;
        var ref_options = ref.options;
        var position = ref_options.position;
        var padding = ref_options.padding;
        var vertical = !crosshair.axis.options.vertical;
        var lineBox = crosshair.line.bbox();
        var horizontalAlign, verticalAlign, point;

        if (vertical) {
            horizontalAlign = CENTER;
            if (position === BOTTOM) {
                verticalAlign = TOP;
                point = lineBox.bottomLeft().translate(0, padding);
            } else {
                verticalAlign = BOTTOM;
                point = lineBox.topLeft().translate(0, -padding);
            }
        } else {
            verticalAlign = CENTER;
            if (position === LEFT) {
                horizontalAlign = RIGHT;
                point = lineBox.topLeft().translate(-padding, 0);
            } else {
                horizontalAlign = LEFT;
                point = lineBox.topRight().translate(padding, 0);
            }
        }

        return {
            point: point,
            align: {
                horizontal: horizontalAlign,
                vertical: verticalAlign
            }
        };
    };

    return CrosshairTooltip;
}(BaseTooltip));

setDefaultOptions(CrosshairTooltip, {
    padding: 10
});

var Crosshair = (function (ChartElement$$1) {
    function Crosshair(chartService, axis, options) {
        ChartElement$$1.call(this, options);

        this.axis = axis;
        this.stickyMode = axis instanceof CategoryAxis;

        var tooltipOptions = this.options.tooltip;

        if (tooltipOptions.visible) {
            this.tooltip = new CrosshairTooltip(chartService, this,
                deepExtend({}, tooltipOptions, { stickyMode: this.stickyMode })
            );
        }
    }

    if ( ChartElement$$1 ) Crosshair.__proto__ = ChartElement$$1;
    Crosshair.prototype = Object.create( ChartElement$$1 && ChartElement$$1.prototype );
    Crosshair.prototype.constructor = Crosshair;

    Crosshair.prototype.showAt = function showAt (point) {
        this.point = point;
        this.moveLine();
        this.line.visible(true);

        if (this.tooltip) {
            this.tooltip.showAt(point);
        }
    };

    Crosshair.prototype.hide = function hide () {
        this.line.visible(false);

        if (this.tooltip) {
            this.tooltip.hide();
        }
    };

    Crosshair.prototype.moveLine = function moveLine () {
        var ref = this;
        var axis = ref.axis;
        var point = ref.point;
        var vertical = axis.options.vertical;
        var box = this.getBox();
        var dim = vertical ? Y : X;
        var lineStart = new _progress_kendoDrawing.geometry.Point(box.x1, box.y1);
        var lineEnd;

        if (vertical) {
            lineEnd = new _progress_kendoDrawing.geometry.Point(box.x2, box.y1);
        } else {
            lineEnd = new _progress_kendoDrawing.geometry.Point(box.x1, box.y2);
        }

        if (point) {
            if (this.stickyMode) {
                var slot = axis.getSlot(axis.pointCategoryIndex(point));
                lineStart[dim] = lineEnd[dim] = slot.center()[dim];
            } else {
                lineStart[dim] = lineEnd[dim] = point[dim];
            }
        }

        this.box = box;

        this.line.moveTo(lineStart).lineTo(lineEnd);
    };

    Crosshair.prototype.getBox = function getBox () {
        var axis = this.axis;
        var axes = axis.pane.axes;
        var length = axes.length;
        var vertical = axis.options.vertical;
        var box = axis.lineBox().clone();
        var dim = vertical ? X : Y;
        var axisLineBox;

        for (var i = 0; i < length; i++) {
            var currentAxis = axes[i];
            if (currentAxis.options.vertical !== vertical) {
                if (!axisLineBox) {
                    axisLineBox = currentAxis.lineBox().clone();
                } else {
                    axisLineBox.wrap(currentAxis.lineBox());
                }
            }
        }

        box[dim + 1] = axisLineBox[dim + 1];
        box[dim + 2] = axisLineBox[dim + 2];

        return box;
    };

    Crosshair.prototype.createVisual = function createVisual () {
        ChartElement$$1.prototype.createVisual.call(this);

        var options = this.options;
        this.line = new _progress_kendoDrawing.drawing.Path({
            stroke: {
                color: options.color,
                width: options.width,
                opacity: options.opacity,
                dashType: options.dashType
            },
            visible: false
        });

        this.moveLine();
        this.visual.append(this.line);
    };

    Crosshair.prototype.destroy = function destroy () {
        if (this.tooltip) {
            this.tooltip.destroy();
        }

        ChartElement$$1.prototype.destroy.call(this);
    };

    return Crosshair;
}(ChartElement));

setDefaultOptions(Crosshair, {
    color: BLACK,
    width: 2,
    zIndex: -1,
    tooltip: {
        visible: false
    }
});

var ChartContainer = (function (ChartElement$$1) {
    function ChartContainer(options, pane) {
        ChartElement$$1.call(this, options);
        this.pane = pane;
    }

    if ( ChartElement$$1 ) ChartContainer.__proto__ = ChartElement$$1;
    ChartContainer.prototype = Object.create( ChartElement$$1 && ChartElement$$1.prototype );
    ChartContainer.prototype.constructor = ChartContainer;

    ChartContainer.prototype.shouldClip = function shouldClip () {
        var children = this.children;
        var length = children.length;

        for (var i = 0; i < length; i++) {
            if (children[i].options.clip === true) {
                return true;
            }
        }
        return false;
    };

    ChartContainer.prototype._clipBox = function _clipBox () {
        return this.pane.chartsBox();
    };

    ChartContainer.prototype.createVisual = function createVisual () {
        this.visual = new _progress_kendoDrawing.drawing.Group({
            zIndex: 0
        });

        if (this.shouldClip()) {
            var clipBox = this.clipBox = this._clipBox();
            var clipRect = clipBox.toRect();
            var clipPath = _progress_kendoDrawing.drawing.Path.fromRect(clipRect);

            this.visual.clip(clipPath);
            this.unclipLabels();
        }
    };

    ChartContainer.prototype.stackRoot = function stackRoot () {
        return this;
    };

    ChartContainer.prototype.unclipLabels = function unclipLabels () {
        var ref = this;
        var charts = ref.children;
        var clipBox = ref.clipBox;

        for (var i = 0; i < charts.length; i++) {
            var points = charts[i].points || {};
            var length = points.length;

            for (var j = 0; j < length; j++) {
                var point = points[j];
                if (point && point.overlapsBox && point.overlapsBox(clipBox)) {
                    var label = point.label;
                    var note = point.note;

                    if (label && label.options.visible) {
                        if (label.alignToClipBox) {
                            label.alignToClipBox(clipBox);
                        }
                        label.options.noclip = true;
                    }

                    if (note && note.options.visible) {
                        note.options.noclip = true;
                    }
                }
            }
        }
    };

    ChartContainer.prototype.destroy = function destroy () {
        ChartElement$$1.prototype.destroy.call(this);

        delete this.parent;
    };

    return ChartContainer;
}(ChartElement));

ChartContainer.prototype.isStackRoot = true;

var Pane = (function (BoxElement$$1) {
    function Pane(options) {
        BoxElement$$1.call(this, options);

        this.id = paneID();

        this.createTitle();

        this.content = new ChartElement();

        this.chartContainer = new ChartContainer({}, this);
        this.append(this.content);

        this.axes = [];
        this.charts = [];
    }

    if ( BoxElement$$1 ) Pane.__proto__ = BoxElement$$1;
    Pane.prototype = Object.create( BoxElement$$1 && BoxElement$$1.prototype );
    Pane.prototype.constructor = Pane;

    Pane.prototype.createTitle = function createTitle () {
        var titleOptions = this.options.title;
        if (isObject(titleOptions)) {
            titleOptions = deepExtend({}, titleOptions, {
                align: titleOptions.position,
                position: TOP
            });
        }

        this.title = Title.buildTitle(titleOptions, this, Pane.prototype.options.title);
    };

    Pane.prototype.appendAxis = function appendAxis (axis) {
        this.content.append(axis);
        this.axes.push(axis);
        axis.pane = this;
    };

    Pane.prototype.appendChart = function appendChart (chart) {
        if (this.chartContainer.parent !== this.content) {
            this.content.append(this.chartContainer);
        }

        this.charts.push(chart);
        this.chartContainer.append(chart);
        chart.pane = this;
    };

    Pane.prototype.empty = function empty () {
        var this$1 = this;

        var plotArea = this.parent;

        if (plotArea) {
            for (var i = 0; i < this.axes.length; i++) {
                plotArea.removeAxis(this$1.axes[i]);
            }

            for (var i$1 = 0; i$1 < this.charts.length; i$1++) {
                plotArea.removeChart(this$1.charts[i$1]);
            }
        }

        this.axes = [];
        this.charts = [];

        this.content.destroy();
        this.content.children = [];
        this.chartContainer.children = [];
    };

    Pane.prototype.reflow = function reflow (targetBox) {
        // Content (such as charts) is rendered, but excluded from reflows
        var content;
        if (last(this.children) === this.content) {
            content = this.children.pop();
        }

        BoxElement$$1.prototype.reflow.call(this, targetBox);

        if (content) {
            this.children.push(content);
        }

        if (this.title) {
            this.contentBox.y1 += this.title.box.height();
        }
    };

    Pane.prototype.visualStyle = function visualStyle () {
        var style = BoxElement$$1.prototype.visualStyle.call(this);
        style.zIndex = -10;

        return style;
    };

    Pane.prototype.renderComplete = function renderComplete () {
        if (this.options.visible) {
            this.createGridLines();
        }
    };

    Pane.prototype.stackRoot = function stackRoot () {
        return this;
    };

    Pane.prototype.clipRoot = function clipRoot () {
        return this;
    };

    Pane.prototype.createGridLines = function createGridLines () {
        var axes = this.axes;
        var allAxes = axes.concat(this.parent.axes);
        var vGridLines = [];
        var hGridLines = [];

        // TODO
        // Is full combination really necessary?
        for (var i = 0; i < axes.length; i++) {
            var axis = axes[i];
            var vertical = axis.options.vertical;
            var gridLines = vertical ? vGridLines : hGridLines;
            for (var j = 0; j < allAxes.length; j++) {
                if (gridLines.length === 0) {
                    var altAxis = allAxes[j];
                    if (vertical !== altAxis.options.vertical) {
                        append$1(gridLines, axis.createGridLines(altAxis));
                    }
                }
            }
        }
    };

    Pane.prototype.refresh = function refresh () {
        this.visual.clear();

        this.content.parent = null;
        this.content.createGradient = this.createGradient.bind(this);
        this.content.renderVisual();
        this.content.parent = this;

        if (this.title) {
            this.visual.append(this.title.visual);
        }

        this.visual.append(this.content.visual);

        this.renderComplete();
    };

    Pane.prototype.chartsBox = function chartsBox () {
        var axes = this.axes;
        var length = axes.length;
        var chartsBox = new Box();

        for (var idx = 0; idx < length; idx++) {
            var axis = axes[idx];
            var axisValueField = axis.options.vertical ? Y : X;
            var lineBox = axis.lineBox();
            chartsBox[axisValueField + 1] = lineBox[axisValueField + 1];
            chartsBox[axisValueField + 2] = lineBox[axisValueField + 2];
        }

        if (chartsBox.x2 === 0) {
            var allAxes = this.parent.axes;
            var length$1 = allAxes.length;

            for (var idx$1 = 0; idx$1 < length$1; idx$1++) {
                var axis$1 = allAxes[idx$1];
                if (!axis$1.options.vertical) {
                    var lineBox$1 = axis$1.lineBox();
                    chartsBox.x1 = lineBox$1.x1;
                    chartsBox.x2 = lineBox$1.x2;
                }
            }
        }
        return chartsBox;
    };

    Pane.prototype.clipBox = function clipBox () {
        return this.chartContainer.clipBox;
    };

    return Pane;
}(BoxElement));

var ID = 1;

function paneID() {
    return "pane" + ID++;
}

Pane.prototype.isStackRoot = true;

setDefaultOptions(Pane, {
    zIndex: -1,
    shrinkToFit: true,
    title: {
        align: LEFT
    },
    visible: true
});

var PlotAreaBase = (function (ChartElement$$1) {
    function PlotAreaBase(series, options, chartService) {
        ChartElement$$1.call(this, options);

        this.initFields(series, options);
        this.series = series;
        this.initSeries();
        this.charts = [];
        this.options.legend.items = [];
        this.axes = [];
        this.crosshairs = [];
        this.chartService = chartService;

        this.createPanes();
        this.render();
        this.createCrosshairs();
    }

    if ( ChartElement$$1 ) PlotAreaBase.__proto__ = ChartElement$$1;
    PlotAreaBase.prototype = Object.create( ChartElement$$1 && ChartElement$$1.prototype );
    PlotAreaBase.prototype.constructor = PlotAreaBase;

    PlotAreaBase.prototype.initFields = function initFields () { };

    PlotAreaBase.prototype.initSeries = function initSeries () {
        var series = this.series;

        for (var i = 0; i < series.length; i++) {
            series[i].index = i;
        }
    };

    PlotAreaBase.prototype.createPanes = function createPanes () {
        var this$1 = this;

        var defaults = { title: { color: (this.options.title || {}).color } };
        var panes = [];
        var paneOptions = this.options.panes || [];
        var panesLength = Math.max(paneOptions.length, 1);

        function setTitle(options, defaults) {
            if (isString(options.title)) {
                options.title = {
                    text: options.title
                };
            }

            options.title = deepExtend({}, defaults.title, options.title);
        }

        for (var i = 0; i < panesLength; i++) {
            var options = paneOptions[i] || {};
            setTitle(options, defaults);

            var currentPane = new Pane(options);
            currentPane.paneIndex = i;

            panes.push(currentPane);
            this$1.append(currentPane);
        }

        this.panes = panes;
    };

    PlotAreaBase.prototype.createCrosshairs = function createCrosshairs (panes) {
        var this$1 = this;
        if ( panes === void 0 ) panes = this.panes;

        for (var i = 0; i < panes.length; i++) {
            var pane = panes[i];
            for (var j = 0; j < pane.axes.length; j++) {
                var axis = pane.axes[j];
                if (axis.options.crosshair && axis.options.crosshair.visible) {
                    var currentCrosshair = new Crosshair(this$1.chartService, axis, axis.options.crosshair);

                    this$1.crosshairs.push(currentCrosshair);
                    pane.content.append(currentCrosshair);
                }
            }
        }
    };

    PlotAreaBase.prototype.removeCrosshairs = function removeCrosshairs (pane) {
        var crosshairs = this.crosshairs;
        var axes = pane.axes;

        for (var i = crosshairs.length - 1; i >= 0; i--) {
            for (var j = 0; j < axes.length; j++) {
                if (crosshairs[i].axis === axes[j]) {
                    crosshairs.splice(i, 1);
                    break;
                }
            }
        }
    };

    PlotAreaBase.prototype.hideCrosshairs = function hideCrosshairs () {
        var crosshairs = this.crosshairs;
        for (var idx = 0; idx < crosshairs.length; idx++) {
            crosshairs[idx].hide();
        }
    };

    PlotAreaBase.prototype.findPane = function findPane (name) {
        var panes = this.panes;
        var matchingPane;

        for (var i = 0; i < panes.length; i++) {
            if (panes[i].options.name === name) {
                matchingPane = panes[i];
                break;
            }
        }

        return matchingPane || panes[0];
    };

    PlotAreaBase.prototype.findPointPane = function findPointPane (point) {
        var panes = this.panes;
        var matchingPane;

        for (var i = 0; i < panes.length; i++) {
            if (panes[i].box.containsPoint(point)) {
                matchingPane = panes[i];
                break;
            }
        }

        return matchingPane;
    };

    PlotAreaBase.prototype.appendAxis = function appendAxis (axis) {
        var pane = this.findPane(axis.options.pane);

        pane.appendAxis(axis);
        this.axes.push(axis);
        axis.plotArea = this;
    };

    PlotAreaBase.prototype.removeAxis = function removeAxis (axisToRemove) {
        var this$1 = this;

        var filteredAxes = [];

        for (var i = 0; i < this.axes.length; i++) {
            var axis = this$1.axes[i];
            if (axisToRemove !== axis) {
                filteredAxes.push(axis);
            } else {
                axis.destroy();
            }
        }

        this.axes = filteredAxes;
    };

    PlotAreaBase.prototype.appendChart = function appendChart (chart, pane) {
        this.charts.push(chart);
        if (pane) {
            pane.appendChart(chart);
        } else {
            this.append(chart);
        }
    };

    PlotAreaBase.prototype.removeChart = function removeChart (chartToRemove) {
        var this$1 = this;

        var filteredCharts = [];

        for (var i = 0; i < this.charts.length; i++) {
            var chart = this$1.charts[i];
            if (chart !== chartToRemove) {
                filteredCharts.push(chart);
            } else {
                chart.destroy();
            }
        }

        this.charts = filteredCharts;
    };

    PlotAreaBase.prototype.addToLegend = function addToLegend (series) {
        var count = series.length;
        var legend = this.options.legend;
        var labels = legend.labels || {};
        var inactiveItems = legend.inactiveItems || {};
        var inactiveItemsLabels = inactiveItems.labels || {};
        var data = [];

        for (var i = 0; i < count; i++) {
            var currentSeries = series[i];
            var seriesVisible = currentSeries.visible !== false;
            if (currentSeries.visibleInLegend === false) {
                continue;
            }

            var text = currentSeries.name || "";
            var labelTemplate = seriesVisible ? getTemplate(labels) : getTemplate(inactiveItemsLabels) || getTemplate(labels);
            if (labelTemplate) {
                text = labelTemplate({
                    text: text,
                    series: currentSeries
                });
            }

            var defaults = currentSeries._defaults;
            var color = currentSeries.color;
            if (isFunction(color) && defaults) {
                color = defaults.color;
            }

            var itemLabelOptions = (void 0), markerColor = (void 0);
            if (seriesVisible) {
                itemLabelOptions = {};
                markerColor = color;
            } else {
                itemLabelOptions = {
                    color: inactiveItemsLabels.color,
                    font: inactiveItemsLabels.font
                };
                markerColor = inactiveItems.markers.color;
            }

            if (text) {
                data.push({
                    text: text,
                    labels: itemLabelOptions,
                    markerColor: markerColor,
                    series: currentSeries,
                    active: seriesVisible
                });
            }
        }

        append$1(legend.items, data);
    };

    PlotAreaBase.prototype.groupAxes = function groupAxes (panes) {
        var xAxes = [];
        var yAxes = [];

        for (var paneIx = 0; paneIx < panes.length; paneIx++) {
            var paneAxes = panes[paneIx].axes;
            for (var axisIx = 0; axisIx < paneAxes.length; axisIx++) {
                var axis = paneAxes[axisIx];
                if (axis.options.vertical) {
                    yAxes.push(axis);
                } else {
                    xAxes.push(axis);
                }
            }
        }

        return { x: xAxes, y: yAxes, any: xAxes.concat(yAxes) };
    };

    PlotAreaBase.prototype.groupSeriesByPane = function groupSeriesByPane () {
        var this$1 = this;

        var series = this.series;
        var seriesByPane = {};

        for (var i = 0; i < series.length; i++) {
            var currentSeries = series[i];
            var pane = this$1.seriesPaneName(currentSeries);

            if (seriesByPane[pane]) {
                seriesByPane[pane].push(currentSeries);
            } else {
                seriesByPane[pane] = [ currentSeries ];
            }
        }

        return seriesByPane;
    };

    PlotAreaBase.prototype.filterVisibleSeries = function filterVisibleSeries (series) {
        var result = [];

        for (var i = 0; i < series.length; i++) {
            var currentSeries = series[i];
            if (currentSeries.visible !== false) {
                result.push(currentSeries);
            }
        }

        return result;
    };

    PlotAreaBase.prototype.reflow = function reflow (targetBox) {
        var options = this.options.plotArea;
        var panes = this.panes;
        var margin = getSpacing(options.margin);

        this.box = targetBox.clone().unpad(margin);
        this.reflowPanes();

        this.reflowAxes(panes);
        this.reflowCharts(panes);
    };

    PlotAreaBase.prototype.redraw = function redraw (panes) {
        var this$1 = this;

        var panesArray = [].concat(panes);
        this.initSeries();

        for (var i = 0; i < panesArray.length; i++) {
            this$1.removeCrosshairs(panesArray[i]);
            panesArray[i].empty();
        }

        this.render(panesArray);
        this.reflowAxes(this.panes);
        this.reflowCharts(panesArray);

        this.createCrosshairs(panesArray);

        for (var i$1 = 0; i$1 < panesArray.length; i$1++) {
            panesArray[i$1].refresh();
        }
    };

    PlotAreaBase.prototype.axisCrossingValues = function axisCrossingValues (axis, crossingAxes) {
        var options = axis.options;
        var crossingValues = [].concat(
            options.axisCrossingValues || options.axisCrossingValue
        );
        var valuesToAdd = crossingAxes.length - crossingValues.length;
        var defaultValue = crossingValues[0] || 0;

        for (var i = 0; i < valuesToAdd; i++) {
            crossingValues.push(defaultValue);
        }

        return crossingValues;
    };

    PlotAreaBase.prototype.alignAxisTo = function alignAxisTo (axis, targetAxis, crossingValue, targetCrossingValue) {
        var slot = axis.getSlot(crossingValue, crossingValue, true);
        var slotEdge = axis.options.reverse ? 2 : 1;
        var targetSlot = targetAxis.getSlot(targetCrossingValue, targetCrossingValue, true);
        var targetEdge = targetAxis.options.reverse ? 2 : 1;
        var axisBox = axis.box.translate(
            targetSlot[X + targetEdge] - slot[X + slotEdge],
            targetSlot[Y + targetEdge] - slot[Y + slotEdge]
        );

        if (axis.pane !== targetAxis.pane) {
            axisBox.translate(0, axis.pane.box.y1 - targetAxis.pane.box.y1);
        }

        axis.reflow(axisBox);
    };

    PlotAreaBase.prototype.alignAxes = function alignAxes (xAxes, yAxes) {
        var this$1 = this;

        var xAnchor = xAxes[0];
        var yAnchor = yAxes[0];
        var xAnchorCrossings = this.axisCrossingValues(xAnchor, yAxes);
        var yAnchorCrossings = this.axisCrossingValues(yAnchor, xAxes);
        var leftAnchors = {};
        var rightAnchors = {};
        var topAnchors = {};
        var bottomAnchors = {};

        for (var i = 0; i < yAxes.length; i++) {
            var axis = yAxes[i];
            var pane = axis.pane;
            var paneId = pane.id;

            // Locate pane anchor, if any, and use its axisCrossingValues
            var anchor = paneAnchor(xAxes, pane) || xAnchor;
            var anchorCrossings = xAnchorCrossings;

            if (anchor !== xAnchor) {
                anchorCrossings = this$1.axisCrossingValues(anchor, yAxes);
            }

            this$1.alignAxisTo(axis, anchor, yAnchorCrossings[i], anchorCrossings[i]);

            if (axis.options._overlap) {
                continue;
            }

            if (round(axis.lineBox().x1) === round(anchor.lineBox().x1)) {
                // Push the axis to the left the previous y-axis so they don't overlap
                if (leftAnchors[paneId]) {
                    axis.reflow(axis.box
                        .alignTo(leftAnchors[paneId].box, LEFT)
                        .translate(-axis.options.margin, 0)
                    );
                }

                leftAnchors[paneId] = axis;
            }

            if (round(axis.lineBox().x2) === round(anchor.lineBox().x2)) {
                // Flip the labels on the right if we're at the right end of the pane
                if (!axis._mirrored) {
                    axis.options.labels.mirror = !axis.options.labels.mirror;
                    axis._mirrored = true;
                }
                this$1.alignAxisTo(axis, anchor, yAnchorCrossings[i], anchorCrossings[i]);

                // Push the axis to the right the previous y-axis so they don't overlap
                if (rightAnchors[paneId]) {
                    axis.reflow(axis.box
                        .alignTo(rightAnchors[paneId].box, RIGHT)
                        .translate(axis.options.margin, 0)
                    );
                }

                rightAnchors[paneId] = axis;
            }

            if (i !== 0 && yAnchor.pane === axis.pane) {
                axis.alignTo(yAnchor);
                axis.reflow(axis.box);
            }
        }

        for (var i$1 = 0; i$1 < xAxes.length; i$1++) {
            var axis$1 = xAxes[i$1];
            var pane$1 = axis$1.pane;
            var paneId$1 = pane$1.id;

            // Locate pane anchor and use its axisCrossingValues
            var anchor$1 = paneAnchor(yAxes, pane$1) || yAnchor;
            var anchorCrossings$1 = yAnchorCrossings;
            if (anchor$1 !== yAnchor) {
                anchorCrossings$1 = this$1.axisCrossingValues(anchor$1, xAxes);
            }

            this$1.alignAxisTo(axis$1, anchor$1, xAnchorCrossings[i$1], anchorCrossings$1[i$1]);

            if (axis$1.options._overlap) {
                continue;
            }

            if (round(axis$1.lineBox().y1) === round(anchor$1.lineBox().y1)) {
                // Flip the labels on top if we're at the top of the pane
                if (!axis$1._mirrored) {
                    axis$1.options.labels.mirror = !axis$1.options.labels.mirror;
                    axis$1._mirrored = true;
                }
                this$1.alignAxisTo(axis$1, anchor$1, xAnchorCrossings[i$1], anchorCrossings$1[i$1]);

                // Push the axis above the previous x-axis so they don't overlap
                if (topAnchors[paneId$1]) {
                    axis$1.reflow(axis$1.box
                        .alignTo(topAnchors[paneId$1].box, TOP)
                        .translate(0, -axis$1.options.margin)
                    );
                }

                topAnchors[paneId$1] = axis$1;
            }

            if (round(axis$1.lineBox().y2, COORD_PRECISION) === round(anchor$1.lineBox().y2, COORD_PRECISION)) {
                // Push the axis below the previous x-axis so they don't overlap
                if (bottomAnchors[paneId$1]) {
                    axis$1.reflow(axis$1.box
                        .alignTo(bottomAnchors[paneId$1].box, BOTTOM)
                        .translate(0, axis$1.options.margin)
                    );
                }

                bottomAnchors[paneId$1] = axis$1;
            }

            if (i$1 !== 0) {
                axis$1.alignTo(xAnchor);
                axis$1.reflow(axis$1.box);
            }
        }
    };

    PlotAreaBase.prototype.shrinkAxisWidth = function shrinkAxisWidth (panes) {
        var axes = this.groupAxes(panes).any;
        var axisBox = axisGroupBox(axes);
        var overflowX = 0;

        for (var i = 0; i < panes.length; i++) {
            var currentPane = panes[i];

            if (currentPane.axes.length > 0) {
                overflowX = Math.max(
                    overflowX,
                    axisBox.width() - currentPane.contentBox.width()
                );
            }
        }

        if (overflowX !== 0) {
            for (var i$1 = 0; i$1 < axes.length; i$1++) {
                var currentAxis = axes[i$1];

                if (!currentAxis.options.vertical) {
                    currentAxis.reflow(currentAxis.box.shrink(overflowX, 0));
                }
            }
        }
    };

    PlotAreaBase.prototype.shrinkAxisHeight = function shrinkAxisHeight (panes) {
        var shrinked;

        for (var i = 0; i < panes.length; i++) {
            var currentPane = panes[i];
            var axes = currentPane.axes;
            var overflowY = Math.max(0, axisGroupBox(axes).height() - currentPane.contentBox.height());

            if (overflowY !== 0) {
                for (var j = 0; j < axes.length; j++) {
                    var currentAxis = axes[j];

                    if (currentAxis.options.vertical) {
                        currentAxis.reflow(
                            currentAxis.box.shrink(0, overflowY)
                        );
                    }
                }
                shrinked = true;
            }
        }

        return shrinked;
    };

    PlotAreaBase.prototype.fitAxes = function fitAxes (panes) {
        var axes = this.groupAxes(panes).any;
        var offsetX = 0;

        for (var i = 0; i < panes.length; i++) {
            var currentPane = panes[i];
            var paneAxes = currentPane.axes;
            var paneBox = currentPane.contentBox;

            if (paneAxes.length > 0) {
                var axisBox = axisGroupBox(paneAxes);
                // OffsetY is calculated and applied per pane
                var offsetY = Math.max(paneBox.y1 - axisBox.y1, paneBox.y2 - axisBox.y2);

                // OffsetX is calculated and applied globally
                offsetX = Math.max(offsetX, paneBox.x1 - axisBox.x1);


                for (var j = 0; j < paneAxes.length; j++) {
                    var currentAxis = paneAxes[j];

                    currentAxis.reflow(
                        currentAxis.box.translate(0, offsetY)
                    );
                }
            }
        }

        for (var i$1 = 0; i$1 < axes.length; i$1++) {
            var currentAxis$1 = axes[i$1];

            currentAxis$1.reflow(
                currentAxis$1.box.translate(offsetX, 0)
            );
        }
    };

    PlotAreaBase.prototype.reflowAxes = function reflowAxes (panes) {
        var this$1 = this;

        var axes = this.groupAxes(panes);

        for (var i = 0; i < panes.length; i++) {
            this$1.reflowPaneAxes(panes[i]);
        }

        if (axes.x.length > 0 && axes.y.length > 0) {
            this.alignAxes(axes.x, axes.y);
            this.shrinkAxisWidth(panes);

            this.autoRotateAxisLabels(axes);

            this.alignAxes(axes.x, axes.y);
            if (this.shrinkAxisWidth(panes)) {
                this.alignAxes(axes.x, axes.y);
            }

            this.shrinkAxisHeight(panes);
            this.alignAxes(axes.x, axes.y);

            if (this.shrinkAxisHeight(panes)) {
                this.alignAxes(axes.x, axes.y);
            }

            this.fitAxes(panes);
        }
    };

    PlotAreaBase.prototype.autoRotateAxisLabels = function autoRotateAxisLabels (groupedAxes) {
        var this$1 = this;

        var ref = this;
        var axes = ref.axes;
        var panes = ref.panes;
        var rotated;

        for (var idx = 0; idx < axes.length; idx++) {
            var axis = axes[idx];
            if (axis.autoRotateLabels()) {
                rotated = true;
            }
        }

        if (rotated) {
            for (var idx$1 = 0; idx$1 < panes.length; idx$1++) {
                this$1.reflowPaneAxes(panes[idx$1]);
            }

            if (groupedAxes.x.length > 0 && groupedAxes.y.length > 0) {
                this.alignAxes(groupedAxes.x, groupedAxes.y);
                this.shrinkAxisWidth(panes);
            }
        }
    };

    PlotAreaBase.prototype.reflowPaneAxes = function reflowPaneAxes (pane) {
        var axes = pane.axes;
        var length = axes.length;

        if (length > 0) {
            for (var i = 0; i < length; i++) {
                axes[i].reflow(pane.contentBox);
            }
        }
    };

    PlotAreaBase.prototype.reflowCharts = function reflowCharts (panes) {
        var charts = this.charts;
        var count = charts.length;
        var box = this.box;

        for (var i = 0; i < count; i++) {
            var chartPane = charts[i].pane;
            if (!chartPane || inArray(chartPane, panes)) {
                charts[i].reflow(box);
            }
        }
    };

    PlotAreaBase.prototype.reflowPanes = function reflowPanes () {
        var ref = this;
        var box = ref.box;
        var panes = ref.panes;
        var panesLength = panes.length;
        var remainingHeight = box.height();
        var remainingPanes = panesLength;
        var autoHeightPanes = 0;
        var top = box.y1;

        for (var i = 0; i < panesLength; i++) {
            var currentPane = panes[i];
            var height = currentPane.options.height;

            currentPane.options.width = box.width();

            if (!currentPane.options.height) {
                autoHeightPanes++;
            } else {
                if (height.indexOf && height.indexOf("%")) {
                    var percents = parseInt(height, 10) / 100;
                    currentPane.options.height = percents * box.height();
                }

                currentPane.reflow(box.clone());

                remainingHeight -= currentPane.options.height;
            }
        }

        for (var i$1 = 0; i$1 < panesLength; i$1++) {
            var currentPane$1 = panes[i$1];

            if (!currentPane$1.options.height) {
                currentPane$1.options.height = remainingHeight / autoHeightPanes;
            }
        }

        for (var i$2 = 0; i$2 < panesLength; i$2++) {
            var currentPane$2 = panes[i$2];
            var paneBox = box
                .clone()
                .move(box.x1, top);

            currentPane$2.reflow(paneBox);

            remainingPanes--;
            top += currentPane$2.options.height;
        }
    };

    PlotAreaBase.prototype.backgroundBox = function backgroundBox () {
        var axes = this.axes;
        var axesCount = axes.length;
        var box;

        for (var i = 0; i < axesCount; i++) {
            var axisA = axes[i];

            for (var j = 0; j < axesCount; j++) {
                var axisB = axes[j];

                if (axisA.options.vertical !== axisB.options.vertical) {
                    var lineBox = axisA.lineBox().clone().wrap(axisB.lineBox());

                    if (!box) {
                        box = lineBox;
                    } else {
                        box = box.wrap(lineBox);
                    }
                }
            }
        }

        return box || this.box;
    };

    PlotAreaBase.prototype.chartsBoxes = function chartsBoxes () {
        var panes = this.panes;
        var boxes = [];

        for (var idx = 0; idx < panes.length; idx++) {
            boxes.push(panes[idx].chartsBox());
        }

        return boxes;
    };

    PlotAreaBase.prototype.addBackgroundPaths = function addBackgroundPaths (multipath) {
        var boxes = this.chartsBoxes();
        for (var idx = 0; idx < boxes.length; idx++) {
            multipath.paths.push(_progress_kendoDrawing.drawing.Path.fromRect(boxes[idx].toRect()));
        }
    };

    PlotAreaBase.prototype.backgroundContainsPoint = function backgroundContainsPoint (point) {
        var boxes = this.chartsBoxes();
        for (var idx = 0; idx < boxes.length; idx++) {
            if (boxes[idx].containsPoint(point)) {
                return true;
            }
        }
    };

    PlotAreaBase.prototype.createVisual = function createVisual () {
        ChartElement$$1.prototype.createVisual.call(this);

        var options = this.options.plotArea;
        var opacity = options.opacity;
        var background = options.background;
        var border = options.border; if ( border === void 0 ) border = {};
        if (isTransparent(background)) {
            background = WHITE;
            opacity = 0;
        }

        var bg = this._bgVisual = new _progress_kendoDrawing.drawing.MultiPath({
            fill: {
                color: background,
                opacity: opacity
            },
            stroke: {
                color: border.width ? border.color : "",
                width: border.width,
                dashType: border.dashType
            },
            zIndex: -1
        });

        this.addBackgroundPaths(bg);

        this.appendVisual(bg);
    };

    PlotAreaBase.prototype.pointsByCategoryIndex = function pointsByCategoryIndex (categoryIndex) {
        var charts = this.charts;
        var result = [];

        if (categoryIndex !== null) {
            for (var i = 0; i < charts.length; i++) {
                var chart = charts[i];
                if (chart.pane.options.name === "_navigator") {
                    continue;
                }

                var points = charts[i].categoryPoints[categoryIndex];
                if (points && points.length) {
                    for (var j = 0; j < points.length; j++) {
                        var point = points[j];
                        if (point && defined(point.value) && point.value !== null) {
                            result.push(point);
                        }
                    }
                }
            }
        }

        return result;
    };

    PlotAreaBase.prototype.pointsBySeriesIndex = function pointsBySeriesIndex (seriesIndex) {
        return this.filterPoints(function(point) {
            return point.series.index === seriesIndex;
        });
    };

    PlotAreaBase.prototype.pointsBySeriesName = function pointsBySeriesName (name) {
        return this.filterPoints(function(point) {
            return point.series.name === name;
        });
    };

    PlotAreaBase.prototype.filterPoints = function filterPoints (callback) {
        var charts = this.charts;
        var result = [];

        for (var i = 0; i < charts.length; i++) {
            var chart = charts[i];
            var points = chart.points;
            for (var j = 0; j < points.length; j++) {
                var point = points[j];
                if (point && callback(point)) {
                    result.push(point);
                }
            }
        }

        return result;
    };

    PlotAreaBase.prototype.findPoint = function findPoint (callback) {
        var charts = this.charts;

        for (var i = 0; i < charts.length; i++) {
            var chart = charts[i];
            var points = chart.points;
            for (var j = 0; j < points.length; j++) {
                var point = points[j];
                if (point && callback(point)) {
                    return point;
                }
            }
        }
    };

    PlotAreaBase.prototype.paneByPoint = function paneByPoint (point) {
        var panes = this.panes;

        for (var i = 0; i < panes.length; i++) {
            var pane = panes[i];
            if (pane.box.containsPoint(point)) {
                return pane;
            }
        }
    };

    return PlotAreaBase;
}(ChartElement));

function axisGroupBox(axes) {
    var length = axes.length;
    var box;

    if (length > 0) {
        for (var i = 0; i < length; i++) {
            var axisBox = axes[i].contentBox();

            if (!box) {
                box = axisBox.clone();
            } else {
                box.wrap(axisBox);
            }
        }
    }

    return box || new Box();
}

function paneAnchor(axes, pane) {
    for (var i = 0; i < axes.length; i++) {
        var anchor = axes[i];
        if (anchor && anchor.pane === pane) {
            return anchor;
        }
    }
}

function isTransparent(color) {
    return color === "" || color === null || color === "none" || color === "transparent" || !defined(color);
}


setDefaultOptions(PlotAreaBase, {
    series: [],
    plotArea: {
        margin: {}
    },
    background: "",
    border: {
        color: BLACK,
        width: 0
    },
    legend: {
        inactiveItems: {
            labels: {
                color: "#919191"
            },
            markers: {
                color: "#919191"
            }
        }
    }
});

var PlotAreaEventsMixin = {
    hover: function(chart, e) {
        this._dispatchEvent(chart, e, PLOT_AREA_HOVER);
    },

    click: function(chart, e) {
        this._dispatchEvent(chart, e, PLOT_AREA_CLICK);
    }
};

var SeriesAggregator = (function (Class$$1) {
    function SeriesAggregator(series, binder, defaultAggregates) {
        Class$$1.call(this);

        var canonicalFields = binder.canonicalFields(series);
        var valueFields = binder.valueFields(series);
        var sourceFields = binder.sourceFields(series, canonicalFields);
        var seriesFields = this._seriesFields = [];
        var defaults = defaultAggregates.query(series.type);
        var rootAggregate = series.aggregate || defaults;

        this._series = series;
        this._binder = binder;

        for (var i = 0; i < canonicalFields.length; i++) {
            var field = canonicalFields[i];
            var fieldAggregate = (void 0);

            if (isObject(rootAggregate)) {
                fieldAggregate = rootAggregate[field];
            } else if (i === 0 || inArray(field, valueFields)) {
                fieldAggregate = rootAggregate;
            } else {
                break;
            }

            if (fieldAggregate) {
                seriesFields.push({
                    canonicalName: field,
                    name: sourceFields[i],
                    transform: isFunction(fieldAggregate) ? fieldAggregate : Aggregates[fieldAggregate]
                });
            }
        }
    }

    if ( Class$$1 ) SeriesAggregator.__proto__ = Class$$1;
    SeriesAggregator.prototype = Object.create( Class$$1 && Class$$1.prototype );
    SeriesAggregator.prototype.constructor = SeriesAggregator;

    SeriesAggregator.prototype.aggregatePoints = function aggregatePoints (srcPoints, group) {
        var this$1 = this;

        var ref = this;
        var series = ref._series;
        var seriesFields = ref._seriesFields;
        var data = this._bindPoints(srcPoints || []);
        var firstDataItem = data.dataItems[0];
        var result = {};

        if (firstDataItem && !isNumber(firstDataItem) && !isArray(firstDataItem)) {
            var fn = function() {};
            fn.prototype = firstDataItem;
            result = new fn();
        }

        for (var i = 0; i < seriesFields.length; i++) {
            var field = seriesFields[i];
            var srcValues = this$1._bindField(data.values, field.canonicalName);
            var value = field.transform(srcValues, series, data.dataItems, group);

            if (value !== null && isObject(value) && !defined(value.length) && !(value instanceof Date)) {
                result = value;
                break;
            } else {
                if (defined(value)) {
                    setValue(field.name, result, value);
                }
            }
        }

        return result;
    };

    SeriesAggregator.prototype._bindPoints = function _bindPoints (points) {
        var ref = this;
        var binder = ref._binder;
        var series = ref._series;
        var values = [];
        var dataItems = [];

        for (var i = 0; i < points.length; i++) {
            var pointIx = points[i];

            values.push(binder.bindPoint(series, pointIx));
            dataItems.push(series.data[pointIx]);
        }

        return {
            values: values,
            dataItems: dataItems
        };
    };

    SeriesAggregator.prototype._bindField = function _bindField (data, field) {
        var values = [];
        var count = data.length;

        for (var i = 0; i < count; i++) {
            var item = data[i];
            var valueFields = item.valueFields;
            var value = (void 0);

            if (defined(valueFields[field])) {
                value = valueFields[field];
            } else {
                value = item.fields[field];
            }

            values.push(value);
        }

        return values;
    };

    return SeriesAggregator;
}(_progress_kendoDrawing.Class));

function setValue(fieldName, target, value) {
    var parentObj = target;
    var field = fieldName;

    if (fieldName.indexOf(".") > -1) {
        var parts = fieldName.split(".");

        while (parts.length > 1) {
            field = parts.shift();
            if (!defined(parentObj[field])) {
                parentObj[field] = {};
            }
            parentObj = parentObj[field];
        }
        field = parts.shift();
    }

    parentObj[field] = value;
}

var DefaultAggregates = (function (Class$$1) {
    function DefaultAggregates() {
        Class$$1.call(this);

        this._defaults = {};
    }

    if ( Class$$1 ) DefaultAggregates.__proto__ = Class$$1;
    DefaultAggregates.prototype = Object.create( Class$$1 && Class$$1.prototype );
    DefaultAggregates.prototype.constructor = DefaultAggregates;

    DefaultAggregates.prototype.register = function register (seriesTypes, aggregates) {
        var this$1 = this;

        for (var i = 0; i < seriesTypes.length; i++) {
            this$1._defaults[seriesTypes[i]] = aggregates;
        }
    };

    DefaultAggregates.prototype.query = function query (seriesType) {
        return this._defaults[seriesType];
    };

    return DefaultAggregates;
}(_progress_kendoDrawing.Class));

DefaultAggregates.current = new DefaultAggregates();

var RangeBar = (function (Bar$$1) {
    function RangeBar () {
        Bar$$1.apply(this, arguments);
    }

    if ( Bar$$1 ) RangeBar.__proto__ = Bar$$1;
    RangeBar.prototype = Object.create( Bar$$1 && Bar$$1.prototype );
    RangeBar.prototype.constructor = RangeBar;

    RangeBar.prototype.createLabel = function createLabel () {
        var labels = this.options.labels;
        var fromOptions = deepExtend({}, labels, labels.from);
        var toOptions = deepExtend({}, labels, labels.to);

        if (fromOptions.visible) {
            this.labelFrom = this._createLabel(fromOptions);
            this.append(this.labelFrom);
        }

        if (toOptions.visible) {
            this.labelTo = this._createLabel(toOptions);
            this.append(this.labelTo);
        }
    };

    RangeBar.prototype._createLabel = function _createLabel (options) {
        var labelTemplate = getTemplate(options);
        var labelText;

        if (labelTemplate) {
            labelText = labelTemplate({
                dataItem: this.dataItem,
                category: this.category,
                value: this.value,
                percentage: this.percentage,
                runningTotal: this.runningTotal,
                total: this.total,
                series: this.series
            });
        } else {
            labelText = this.formatValue(options.format);
        }

        return new BarLabel(labelText,
            deepExtend({
                vertical: this.options.vertical
            },
            options
        ));
    };

    RangeBar.prototype.reflow = function reflow (targetBox) {
        this.render();

        var ref = this;
        var labelFrom = ref.labelFrom;
        var labelTo = ref.labelTo;
        var value = ref.value;

        this.box = targetBox;

        if (labelFrom) {
            labelFrom.options.aboveAxis = value.from > value.to;
            labelFrom.reflow(targetBox);
        }

        if (labelTo) {
            labelTo.options.aboveAxis = value.to > value.from;
            labelTo.reflow(targetBox);
        }

        if (this.note) {
            this.note.reflow(targetBox);
        }
    };

    return RangeBar;
}(Bar));

RangeBar.prototype.defaults = deepExtend({}, RangeBar.prototype.defaults, {
    labels: {
        format: "{0} - {1}"
    },
    tooltip: {
        format: "{1}"
    }
});

var RangeBarChart = (function (BarChart$$1) {
    function RangeBarChart () {
        BarChart$$1.apply(this, arguments);
    }

    if ( BarChart$$1 ) RangeBarChart.__proto__ = BarChart$$1;
    RangeBarChart.prototype = Object.create( BarChart$$1 && BarChart$$1.prototype );
    RangeBarChart.prototype.constructor = RangeBarChart;

    RangeBarChart.prototype.pointType = function pointType () {
        return RangeBar;
    };

    RangeBarChart.prototype.pointValue = function pointValue (data) {
        return data.valueFields;
    };

    RangeBarChart.prototype.formatPointValue = function formatPointValue (point, format) {
        if (point.value.from === null && point.value.to === null) {
            return "";
        }

        return this.chartService.format.auto(format, point.value.from, point.value.to);
    };

    RangeBarChart.prototype.plotRange = function plotRange (point) {
        if (!point) {
            return 0;
        }

        return [ point.value.from, point.value.to ];
    };

    RangeBarChart.prototype.updateRange = function updateRange (value, fields) {
        var axisName = fields.series.axis;
        var from = value.from;
        var to = value.to;
        var axisRange = this.valueAxisRanges[axisName];

        if (value !== null && isNumber(from) && isNumber(to)) {
            axisRange = this.valueAxisRanges[axisName] = axisRange || { min: MAX_VALUE, max: MIN_VALUE };

            axisRange.min = Math.min(axisRange.min, from);
            axisRange.max = Math.max(axisRange.max, from);

            axisRange.min = Math.min(axisRange.min, to);
            axisRange.max = Math.max(axisRange.max, to);
        }
    };

    RangeBarChart.prototype.aboveAxis = function aboveAxis (point) {
        var value = point.value;
        return value.from < value.to;
    };

    return RangeBarChart;
}(BarChart));

RangeBarChart.prototype.plotLimits = CategoricalChart.prototype.plotLimits;

var OHLCPoint = (function (Candlestick$$1) {
    function OHLCPoint () {
        Candlestick$$1.apply(this, arguments);
    }

    if ( Candlestick$$1 ) OHLCPoint.__proto__ = Candlestick$$1;
    OHLCPoint.prototype = Object.create( Candlestick$$1 && Candlestick$$1.prototype );
    OHLCPoint.prototype.constructor = OHLCPoint;

    OHLCPoint.prototype.reflow = function reflow (box) {
        var ref = this;
        var options = ref.options;
        var value = ref.value;
        var chart = ref.owner;
        var valueAxis = chart.seriesValueAxis(options);
        var oPoints = [];
        var cPoints = [];
        var lhPoints = [];

        var lhSlot = valueAxis.getSlot(value.low, value.high);
        var oSlot = valueAxis.getSlot(value.open, value.open);
        var cSlot = valueAxis.getSlot(value.close, value.close);

        oSlot.x1 = cSlot.x1 = lhSlot.x1 = box.x1;
        oSlot.x2 = cSlot.x2 = lhSlot.x2 = box.x2;

        var mid = lhSlot.center().x;

        oPoints.push([ oSlot.x1, oSlot.y1 ]);
        oPoints.push([ mid, oSlot.y1 ]);
        cPoints.push([ mid, cSlot.y1 ]);
        cPoints.push([ cSlot.x2, cSlot.y1 ]);
        lhPoints.push([ mid, lhSlot.y1 ]);
        lhPoints.push([ mid, lhSlot.y2 ]);

        this.lines = [
            oPoints, cPoints, lhPoints
        ];

        this.box = lhSlot.clone().wrap(oSlot.clone().wrap(cSlot));

        this.reflowNote();
    };

    OHLCPoint.prototype.createBody = function createBody () {};

    return OHLCPoint;
}(Candlestick));

var OHLCChart = (function (CandlestickChart$$1) {
    function OHLCChart () {
        CandlestickChart$$1.apply(this, arguments);
    }

    if ( CandlestickChart$$1 ) OHLCChart.__proto__ = CandlestickChart$$1;
    OHLCChart.prototype = Object.create( CandlestickChart$$1 && CandlestickChart$$1.prototype );
    OHLCChart.prototype.constructor = OHLCChart;

    OHLCChart.prototype.pointType = function pointType () {
        return OHLCPoint;
    };

    return OHLCChart;
}(CandlestickChart));

var WaterfallSegment = (function (ChartElement$$1) {
    function WaterfallSegment(from, to, series) {
        ChartElement$$1.call(this);

        this.from = from;
        this.to = to;
        this.series = series;
    }

    if ( ChartElement$$1 ) WaterfallSegment.__proto__ = ChartElement$$1;
    WaterfallSegment.prototype = Object.create( ChartElement$$1 && ChartElement$$1.prototype );
    WaterfallSegment.prototype.constructor = WaterfallSegment;

    WaterfallSegment.prototype.linePoints = function linePoints () {
        var from = this.from;
        var ref = this;
        var fromBox = ref.from.box;
        var toBox = ref.to.box;
        var points = [];

        if (from.isVertical) {
            var y = from.aboveAxis ? fromBox.y1 : fromBox.y2;
            points.push(
                [ fromBox.x1, y ],
                [ toBox.x2, y ]
            );
        } else {
            var x = from.aboveAxis ? fromBox.x2 : fromBox.x1;
            points.push(
                [ x, fromBox.y1 ],
                [ x, toBox.y2 ]
            );
        }

        return points;
    };

    WaterfallSegment.prototype.createVisual = function createVisual () {
        ChartElement$$1.prototype.createVisual.call(this);

        var line = this.series.line || {};

        var path = _progress_kendoDrawing.drawing.Path.fromPoints(this.linePoints(), {
            stroke: {
                color: line.color,
                width: line.width,
                opacity: line.opacity,
                dashType: line.dashType
            }
        });

        alignPathToPixel(path);
        this.visual.append(path);
    };

    return WaterfallSegment;
}(ChartElement));

setDefaultOptions(WaterfallSegment, {
    animation: {
        type: FADEIN,
        delay: INITIAL_ANIMATION_DURATION
    }
});

var WaterfallChart = (function (BarChart$$1) {
    function WaterfallChart () {
        BarChart$$1.apply(this, arguments);
    }

    if ( BarChart$$1 ) WaterfallChart.__proto__ = BarChart$$1;
    WaterfallChart.prototype = Object.create( BarChart$$1 && BarChart$$1.prototype );
    WaterfallChart.prototype.constructor = WaterfallChart;

    WaterfallChart.prototype.render = function render () {
        BarChart$$1.prototype.render.call(this);
        this.createSegments();
    };

    WaterfallChart.prototype.traverseDataPoints = function traverseDataPoints (callback) {
        var series = this.options.series;
        var categories = this.categoryAxis.options.categories || [];
        var totalCategories = categoriesCount(series);
        var isVertical = !this.options.invertAxes;

        for (var seriesIx = 0; seriesIx < series.length; seriesIx++) {
            var currentSeries = series[seriesIx];
            var total = 0;
            var runningTotal = 0;

            for (var categoryIx = 0; categoryIx < totalCategories; categoryIx++) {
                var data = SeriesBinder.current.bindPoint(currentSeries, categoryIx);
                var value = data.valueFields.value;
                var summary = data.fields.summary;
                var from = total;
                var to = (void 0);

                if (summary) {
                    if (summary.toLowerCase() === "total") {
                        data.valueFields.value = total;
                        from = 0;
                        to = total;
                    } else {
                        data.valueFields.value = runningTotal;
                        to = from - runningTotal;
                        runningTotal = 0;
                    }
                } else if (isNumber(value)) {
                    runningTotal += value;
                    total += value;
                    to = total;
                }

                callback(data, {
                    category: categories[categoryIx],
                    categoryIx: categoryIx,
                    series: currentSeries,
                    seriesIx: seriesIx,
                    total: total,
                    runningTotal: runningTotal,
                    from: from,
                    to: to,
                    isVertical: isVertical
                });
            }
        }
    };

    WaterfallChart.prototype.updateRange = function updateRange (value, fields) {
        BarChart$$1.prototype.updateRange.call(this, { value: fields.to }, fields);
    };

    WaterfallChart.prototype.aboveAxis = function aboveAxis (point) {
        return point.value >= 0;
    };

    WaterfallChart.prototype.plotRange = function plotRange (point) {
        return [ point.from, point.to ];
    };

    WaterfallChart.prototype.createSegments = function createSegments () {
        var this$1 = this;

        var series = this.options.series;
        var seriesPoints = this.seriesPoints;
        var segments = this.segments = [];

        for (var seriesIx = 0; seriesIx < series.length; seriesIx++) {
            var currentSeries = series[seriesIx];
            var points = seriesPoints[seriesIx];

            if (points) {
                var prevPoint = (void 0);
                for (var pointIx = 0; pointIx < points.length; pointIx++) {
                    var point = points[pointIx];

                    if (point && prevPoint) {
                        var segment = new WaterfallSegment(prevPoint, point, currentSeries);
                        segments.push(segment);
                        this$1.append(segment);
                    }

                    prevPoint = point;
                }
            }
        }
    };

    return WaterfallChart;
}(BarChart));

function filterSeriesByType(series, types) {
    var result = [];

    var seriesTypes = [].concat(types);
    for (var idx = 0; idx < series.length; idx++) {
        var currentSeries = series[idx];
        if (inArray(currentSeries.type, seriesTypes)) {
            result.push(currentSeries);
        }
    }

    return result;
}

function equalsIgnoreCase(a, b) {
    if (a && b) {
        return a.toLowerCase() === b.toLowerCase();
    }

    return a === b;
}

function isDateAxis(axisOptions, sampleCategory) {
    var type = axisOptions.type;
    var dateCategory = sampleCategory instanceof Date;

    return (!type && dateCategory) || equalsIgnoreCase(type, DATE);
}

function appendIfNotNull(array, element) {
    if (element !== null) {
        array.push(element);
    }
}

function singleItemOrArray(array) {
    return array.length === 1 ? array[0] : array;
}

function getDateField(field, row, intlService) {
    if (row === null) {
        return row;
    }

    var key = "_date_" + field;
    var value = row[key];

    if (!value) {
        value = parseDate(intlService, getter(field, true)(row));
        row[key] = value;
    }

    return value;
}

var CategoricalPlotArea = (function (PlotAreaBase$$1) {
    function CategoricalPlotArea () {
        PlotAreaBase$$1.apply(this, arguments);
    }

    if ( PlotAreaBase$$1 ) CategoricalPlotArea.__proto__ = PlotAreaBase$$1;
    CategoricalPlotArea.prototype = Object.create( PlotAreaBase$$1 && PlotAreaBase$$1.prototype );
    CategoricalPlotArea.prototype.constructor = CategoricalPlotArea;

    CategoricalPlotArea.prototype.initFields = function initFields (series) {
        var this$1 = this;

        this.namedCategoryAxes = {};
        this.namedValueAxes = {};
        this.valueAxisRangeTracker = new AxisGroupRangeTracker();

        if (series.length > 0) {
            this.invertAxes = inArray(
                series[0].type, [ BAR, BULLET, VERTICAL_LINE, VERTICAL_AREA,
                                 RANGE_BAR, HORIZONTAL_WATERFALL, VERTICAL_BOX_PLOT ]
            );

            for (var i = 0; i < series.length; i++) {
                var stack = series[i].stack;
                if (stack && stack.type === "100%") {
                    this$1.stack100 = true;
                    break;
                }
            }
        }

    };

    CategoricalPlotArea.prototype.render = function render (panes) {
        if ( panes === void 0 ) panes = this.panes;

        this.createCategoryAxes(panes);
        this.aggregateCategories(panes);
        this.createCategoryAxesLabels(panes);
        this.createCharts(panes);
        this.createValueAxes(panes);
    };

    CategoricalPlotArea.prototype.removeAxis = function removeAxis (axis) {
        var axisName = axis.options.name;

        PlotAreaBase$$1.prototype.removeAxis.call(this, axis);

        if (axis instanceof CategoryAxis) {
            delete this.namedCategoryAxes[axisName];
        } else {
            this.valueAxisRangeTracker.reset(axisName);
            delete this.namedValueAxes[axisName];
        }

        if (axis === this.categoryAxis) {
            delete this.categoryAxis;
        }

        if (axis === this.valueAxis) {
            delete this.valueAxis;
        }
    };

    CategoricalPlotArea.prototype.createCharts = function createCharts (panes) {
        var this$1 = this;

        var seriesByPane = this.groupSeriesByPane();

        for (var i = 0; i < panes.length; i++) {
            var pane = panes[i];
            var paneSeries = seriesByPane[pane.options.name || "default"] || [];
            this$1.addToLegend(paneSeries);

            var visibleSeries = this$1.filterVisibleSeries(paneSeries);
            if (!visibleSeries) {
                continue;
            }

            var groups = this$1.groupSeriesByCategoryAxis(visibleSeries);
            for (var groupIx = 0; groupIx < groups.length; groupIx++) {
                this$1.createChartGroup(groups[groupIx], pane);
            }
        }
    };

    CategoricalPlotArea.prototype.createChartGroup = function createChartGroup (series, pane) {
        this.createAreaChart(
            filterSeriesByType(series, [ AREA, VERTICAL_AREA ]), pane
        );

        this.createBarChart(
            filterSeriesByType(series, [ COLUMN, BAR ]), pane
        );

        this.createRangeBarChart(
            filterSeriesByType(series, [ RANGE_COLUMN, RANGE_BAR ]), pane
        );

        this.createBulletChart(
            filterSeriesByType(series, [ BULLET, VERTICAL_BULLET ]), pane
        );

        this.createCandlestickChart(
            filterSeriesByType(series, CANDLESTICK), pane
        );

        this.createBoxPlotChart(
            filterSeriesByType(series, [ BOX_PLOT, VERTICAL_BOX_PLOT ]), pane
        );

        this.createOHLCChart(
            filterSeriesByType(series, OHLC), pane
        );

        this.createWaterfallChart(
            filterSeriesByType(series, [ WATERFALL, HORIZONTAL_WATERFALL ]), pane
        );

        this.createLineChart(
            filterSeriesByType(series, [ LINE, VERTICAL_LINE ]), pane
        );
    };

    CategoricalPlotArea.prototype.aggregateCategories = function aggregateCategories (panes) {
        var this$1 = this;

        var series = this.srcSeries || this.series;
        var processedSeries = [];

        for (var i = 0; i < series.length; i++) {
            var currentSeries = series[i];
            var categoryAxis = this$1.seriesCategoryAxis(currentSeries);
            var axisPane = this$1.findPane(categoryAxis.options.pane);
            var dateAxis = equalsIgnoreCase(categoryAxis.options.type, DATE);

            if ((dateAxis || currentSeries.categoryField) && inArray(axisPane, panes)) {
                currentSeries = this$1.aggregateSeries(currentSeries, categoryAxis);
            } else if (isNumber(categoryAxis.options.min) || isNumber(categoryAxis.options.max)) {
                currentSeries = this$1.filterSeries(currentSeries, categoryAxis);
            }

            processedSeries.push(currentSeries);
        }

        this.srcSeries = series;
        this.series = processedSeries;
    };

    CategoricalPlotArea.prototype.filterSeries = function filterSeries (series, categoryAxis) {
        var range = categoryAxis.totalRangeIndices();
        var justified = categoryAxis.options.justified;
        var outOfRangePoints = inArray(series.type, [ LINE, VERTICAL_LINE, AREA, VERTICAL_AREA ]);

        range.min = isNumber(categoryAxis.options.min) ? Math.floor(range.min) : 0;
        if (isNumber(categoryAxis.options.max)) {
            range.max = justified ? Math.floor(range.max) + 1 : Math.ceil(range.max);
        } else {
            range.max = series.data.length;
        }

        var currentSeries = deepExtend({}, series);

        if (outOfRangePoints) {
            var minCategory = range.min - 1;
            var srcCategories = categoryAxis.options.srcCategories || [];
            if (minCategory >= 0 && minCategory < currentSeries.data.length) {
                currentSeries._outOfRangeMinPoint = {
                    item: currentSeries.data[minCategory],
                    category: srcCategories[minCategory],
                    categoryIx: -1
                };
            }

            if (range.max < currentSeries.data.length) {
                currentSeries._outOfRangeMaxPoint = {
                    item: currentSeries.data[range.max],
                    category: srcCategories[range.max],
                    categoryIx: range.max - range.min
                };
            }
        }

        categoryAxis._seriesMax = Math.max(categoryAxis._seriesMax || 0, currentSeries.data.length);

        currentSeries.data = (currentSeries.data || []).slice(range.min, range.max);

        return currentSeries;
    };

    CategoricalPlotArea.prototype.aggregateSeries = function aggregateSeries (series, categoryAxis) {
        var this$1 = this;

        var outOfRangePoints = inArray(series.type, [ LINE, VERTICAL_LINE, AREA, VERTICAL_AREA ]);
        var ref = categoryAxis.options;
        var categories = ref.categories;
        var srcCategories = ref.srcCategories; if ( srcCategories === void 0 ) srcCategories = categories;
        var dataItems = ref.dataItems; if ( dataItems === void 0 ) dataItems = [];
        var dateAxis = equalsIgnoreCase(categoryAxis.options.type, DATE);
        var aggregatorSeries = deepExtend({}, series);
        var result = deepExtend({}, series);
        var srcData = series.data;
        var srcPoints = [];
        var outOfRangeMinIdx = MIN_VALUE;
        var outOfRangeMaxIdx = MAX_VALUE;
        var getFn = getField;
        var outOfRangeMinCategory, outOfRangeMaxCategory;

        if (dateAxis) {
            getFn = getDateField;
        }

        for (var i = 0; i < srcData.length; i++) {
            var category = (void 0);
            if (series.categoryField) {
                category = getFn(series.categoryField, srcData[i], this$1.chartService.intl);
            } else {
                category = srcCategories[i];
            }

            if (defined(category)) {
                var categoryIx = categoryAxis.categoryIndex(category);
                if (0 <= categoryIx && categoryIx < categories.length) {
                    srcPoints[categoryIx] = srcPoints[categoryIx] || [];
                    srcPoints[categoryIx].push(i);
                } else if (outOfRangePoints) {
                    if (categoryIx < 0) {
                        if (categoryIx === outOfRangeMinIdx) {
                            outOfRangeMinCategory.points.push(i);
                        } else if (categoryIx > outOfRangeMinIdx) {
                            outOfRangeMinIdx = categoryIx;
                            outOfRangeMinCategory = {
                                category: category,
                                points: [ i ]
                            };
                        }
                    } else if (categoryIx >= categories.length) {
                        if (categoryIx === outOfRangeMaxIdx) {
                            outOfRangeMaxCategory.points.push(i);
                        } else if (categoryIx < outOfRangeMaxIdx) {
                            outOfRangeMaxIdx = categoryIx;
                            outOfRangeMaxCategory = {
                                category: category,
                                points: [ i ]
                            };
                        }
                    }
                }
            }
        }

        var aggregator = new SeriesAggregator(aggregatorSeries, SeriesBinder.current, DefaultAggregates.current);
        var data = result.data = [];
        for (var i$1 = 0; i$1 < categories.length; i$1++) {
            data[i$1] = aggregator.aggregatePoints(
                srcPoints[i$1], categories[i$1]
            );
            if (srcPoints[i$1]) {
                dataItems[i$1] = data[i$1];
            }
        }

        if (outOfRangeMinCategory && data.length) {
            result._outOfRangeMinPoint = {
                item: aggregator.aggregatePoints(
                    outOfRangeMinCategory.points, outOfRangeMinCategory.category
                ),
                categoryIx: outOfRangeMinIdx,
                category: outOfRangeMinCategory.category
            };
        }

        if (outOfRangeMaxCategory && data.length) {
            result._outOfRangeMaxPoint = {
                item: aggregator.aggregatePoints(
                    outOfRangeMaxCategory.points, outOfRangeMaxCategory.category
                ),
                categoryIx: outOfRangeMaxIdx,
                category: outOfRangeMaxCategory.category
            };
        }
        categoryAxis.options.dataItems = dataItems;

        return result;
    };

    CategoricalPlotArea.prototype.appendChart = function appendChart (chart, pane) {
        var series = chart.options.series;
        var categoryAxis = this.seriesCategoryAxis(series[0]);
        var categories = categoryAxis.options.categories;
        var categoriesToAdd = Math.max(0, categoriesCount(series) - categories.length);

        while (categoriesToAdd--) {
            categories.push("");
        }

        this.valueAxisRangeTracker.update(chart.valueAxisRanges);

        PlotAreaBase$$1.prototype.appendChart.call(this, chart, pane);
    };

    // TODO: Refactor, optionally use series.pane option
    CategoricalPlotArea.prototype.seriesPaneName = function seriesPaneName (series) {
        var options = this.options;
        var axisName = series.axis;
        var axisOptions = [].concat(options.valueAxis);
        var axis = grep(axisOptions, function(a) { return a.name === axisName; })[0];
        var panes = options.panes || [ {} ];
        var defaultPaneName = (panes[0] || {}).name || "default";
        var paneName = (axis || {}).pane || defaultPaneName;

        return paneName;
    };

    CategoricalPlotArea.prototype.seriesCategoryAxis = function seriesCategoryAxis (series) {
        var axisName = series.categoryAxis;
        var axis = axisName ? this.namedCategoryAxes[axisName] : this.categoryAxis;

        if (!axis) {
            throw new Error("Unable to locate category axis with name " + axisName);
        }

        return axis;
    };

    CategoricalPlotArea.prototype.stackableChartOptions = function stackableChartOptions (firstSeries, pane) {
        var stack = firstSeries.stack;
        var isStacked100 = stack && stack.type === "100%";
        var clip = pane.options.clip;

        return {
            isStacked: stack,
            isStacked100: isStacked100,
            clip: clip
        };
    };

    CategoricalPlotArea.prototype.groupSeriesByCategoryAxis = function groupSeriesByCategoryAxis (series) {
        var categoryAxes = [];
        var unique = {};
        for (var idx = 0; idx < series.length; idx++) {
            var name = series[idx].categoryAxis || "$$default$$";
            if (!unique.hasOwnProperty(name)) {
                unique[name] = true;
                categoryAxes.push(name);
            }
        }

        var groups = [];
        for (var axisIx = 0; axisIx < categoryAxes.length; axisIx++) {
            var axis = categoryAxes[axisIx];
            var axisSeries = groupSeries(series, axis, axisIx);
            if (axisSeries.length === 0) {
                continue;
            }

            groups.push(axisSeries);
        }

        return groups;
    };

    CategoricalPlotArea.prototype.createBarChart = function createBarChart (series, pane) {
        if (series.length === 0) {
            return;
        }

        var firstSeries = series[0];
        var barChart = new BarChart(this, Object.assign({
            series: series,
            invertAxes: this.invertAxes,
            gap: firstSeries.gap,
            spacing: firstSeries.spacing
        }, this.stackableChartOptions(firstSeries, pane)));

        this.appendChart(barChart, pane);
    };

    CategoricalPlotArea.prototype.createRangeBarChart = function createRangeBarChart (series, pane) {
        if (series.length === 0) {
            return;
        }

        var firstSeries = series[0];
        var rangeColumnChart = new RangeBarChart(this, {
            series: series,
            invertAxes: this.invertAxes,
            gap: firstSeries.gap,
            spacing: firstSeries.spacing
        });

        this.appendChart(rangeColumnChart, pane);
    };

    CategoricalPlotArea.prototype.createBulletChart = function createBulletChart (series, pane) {
        if (series.length === 0) {
            return;
        }

        var firstSeries = series[0];
        var bulletChart = new BulletChart(this, {
            series: series,
            invertAxes: this.invertAxes,
            gap: firstSeries.gap,
            spacing: firstSeries.spacing,
            clip: pane.options.clip
        });

        this.appendChart(bulletChart, pane);
    };

    CategoricalPlotArea.prototype.createLineChart = function createLineChart (series, pane) {
        if (series.length === 0) {
            return;
        }

        var firstSeries = series[0];
        var lineChart = new LineChart(this, Object.assign({
            invertAxes: this.invertAxes,
            series: series
        }, this.stackableChartOptions(firstSeries, pane)));

        this.appendChart(lineChart, pane);
    };

    CategoricalPlotArea.prototype.createAreaChart = function createAreaChart (series, pane) {
        if (series.length === 0) {
            return;
        }

        var firstSeries = series[0];
        var areaChart = new AreaChart(this, Object.assign({
            invertAxes: this.invertAxes,
            series: series
        }, this.stackableChartOptions(firstSeries, pane)));

        this.appendChart(areaChart, pane);
    };

    CategoricalPlotArea.prototype.createOHLCChart = function createOHLCChart (series, pane) {
        if (series.length === 0) {
            return;
        }

        var firstSeries = series[0];
        var chart = new OHLCChart(this, {
            invertAxes: this.invertAxes,
            gap: firstSeries.gap,
            series: series,
            spacing: firstSeries.spacing,
            clip: pane.options.clip
        });

        this.appendChart(chart, pane);
    };

    CategoricalPlotArea.prototype.createCandlestickChart = function createCandlestickChart (series, pane) {
        if (series.length === 0) {
            return;
        }

        var firstSeries = series[0];
        var chart = new CandlestickChart(this, {
            invertAxes: this.invertAxes,
            gap: firstSeries.gap,
            series: series,
            spacing: firstSeries.spacing,
            clip: pane.options.clip
        });

        this.appendChart(chart, pane);
    };

    CategoricalPlotArea.prototype.createBoxPlotChart = function createBoxPlotChart (series, pane) {
        if (series.length === 0) {
            return;
        }

        var firstSeries = series[0];
        var chart = new BoxPlotChart(this, {
            invertAxes: this.invertAxes,
            gap: firstSeries.gap,
            series: series,
            spacing: firstSeries.spacing,
            clip: pane.options.clip
        });

        this.appendChart(chart, pane);
    };

    CategoricalPlotArea.prototype.createWaterfallChart = function createWaterfallChart (series, pane) {
        if (series.length === 0) {
            return;
        }

        var firstSeries = series[0];
        var waterfallChart = new WaterfallChart(this, {
            series: series,
            invertAxes: this.invertAxes,
            gap: firstSeries.gap,
            spacing: firstSeries.spacing
        });

        this.appendChart(waterfallChart, pane);
    };

    CategoricalPlotArea.prototype.axisRequiresRounding = function axisRequiresRounding (categoryAxisName, categoryAxisIndex) {
        var this$1 = this;

        var centeredSeries = filterSeriesByType(this.series, EQUALLY_SPACED_SERIES);

        for (var seriesIx = 0; seriesIx < this.series.length; seriesIx++) {
            var currentSeries = this$1.series[seriesIx];
            if (currentSeries.type === LINE || currentSeries.type === AREA) {
                var line = currentSeries.line;
                if (line && line.style === STEP) {
                    centeredSeries.push(currentSeries);
                }
            }
        }

        for (var seriesIx$1 = 0; seriesIx$1 < centeredSeries.length; seriesIx$1++) {
            var seriesAxis = centeredSeries[seriesIx$1].categoryAxis || "";
            if (seriesAxis === categoryAxisName || (!seriesAxis && categoryAxisIndex === 0)) {
                return true;
            }
        }
    };

    CategoricalPlotArea.prototype.aggregatedAxis = function aggregatedAxis (categoryAxisName, categoryAxisIndex) {
        var series = this.series;

        for (var seriesIx = 0; seriesIx < series.length; seriesIx++) {
            var seriesAxis = series[seriesIx].categoryAxis || "";
            if ((seriesAxis === categoryAxisName || (!seriesAxis && categoryAxisIndex === 0)) && series[seriesIx].categoryField) {
                return true;
            }
        }
    };

    CategoricalPlotArea.prototype.createCategoryAxesLabels = function createCategoryAxesLabels () {
        var axes = this.axes;
        for (var i = 0; i < axes.length; i++) {
            if (axes[i] instanceof CategoryAxis) {
                axes[i].createLabels();
            }
        }
    };

    CategoricalPlotArea.prototype.createCategoryAxes = function createCategoryAxes (panes) {
        var this$1 = this;

        var invertAxes = this.invertAxes;
        var definitions = [].concat(this.options.categoryAxis);
        var axes = [];

        for (var i = 0; i < definitions.length; i++) {
            var axisOptions = definitions[i];
            var axisPane = this$1.findPane(axisOptions.pane);

            if (inArray(axisPane, panes)) {
                var name = axisOptions.name;
                var categories = axisOptions.categories; if ( categories === void 0 ) categories = [];
                axisOptions = deepExtend({
                    vertical: invertAxes,
                    axisCrossingValue: invertAxes ? MAX_VALUE : 0
                }, axisOptions);

                if (!defined(axisOptions.justified)) {
                    axisOptions.justified = this$1.isJustified();
                }

                if (this$1.axisRequiresRounding(name, i)) {
                    axisOptions.justified = false;
                }

                var categoryAxis = (void 0);

                if (isDateAxis(axisOptions, categories[0])) {
                    categoryAxis = new DateCategoryAxis(axisOptions, this$1.chartService);
                } else {
                    categoryAxis = new CategoryAxis(axisOptions, this$1.chartService);
                }

                if (name) {
                    if (this$1.namedCategoryAxes[name]) {
                        throw new Error(("Category axis with name " + name + " is already defined"));
                    }
                    this$1.namedCategoryAxes[name] = categoryAxis;
                }

                categoryAxis.axisIndex = i;
                axes.push(categoryAxis);
                this$1.appendAxis(categoryAxis);
            }
        }

        var primaryAxis = this.categoryAxis || axes[0];
        this.categoryAxis = primaryAxis;

        if (invertAxes) {
            this.axisY = primaryAxis;
        } else {
            this.axisX = primaryAxis;
        }
    };

    CategoricalPlotArea.prototype.isJustified = function isJustified () {
        var series = this.series;

        for (var i = 0; i < series.length; i++) {
            var currentSeries = series[i];
            if (!inArray(currentSeries.type, [ AREA, VERTICAL_AREA ])) {
                return false;
            }
        }

        return true;
    };

    CategoricalPlotArea.prototype.createValueAxes = function createValueAxes (panes) {
        var this$1 = this;

        var tracker = this.valueAxisRangeTracker;
        var defaultRange = tracker.query();
        var definitions = [].concat(this.options.valueAxis);
        var invertAxes = this.invertAxes;
        var baseOptions = { vertical: !invertAxes };
        var axes = [];

        if (this.stack100) {
            baseOptions.roundToMajorUnit = false;
            baseOptions.labels = { format: "P0" };
        }

        for (var i = 0; i < definitions.length; i++) {
            var axisOptions = definitions[i];
            var axisPane = this$1.findPane(axisOptions.pane);

            if (inArray(axisPane, panes)) {
                var name = axisOptions.name;
                var defaultAxisRange = equalsIgnoreCase(axisOptions.type, LOGARITHMIC) ? { min: 0.1, max: 1 } : { min: 0, max: 1 };
                var range = tracker.query(name) || defaultRange || defaultAxisRange;

                if (i === 0 && range && defaultRange) {
                    range.min = Math.min(range.min, defaultRange.min);
                    range.max = Math.max(range.max, defaultRange.max);
                }

                var axisType = (void 0);
                if (equalsIgnoreCase(axisOptions.type, LOGARITHMIC)) {
                    axisType = LogarithmicAxis;
                } else {
                    axisType = NumericAxis;
                }

                var valueAxis = new axisType(range.min, range.max,
                    deepExtend({}, baseOptions, axisOptions),
                    this$1.chartService
                );

                if (name) {
                    if (this$1.namedValueAxes[name]) {
                        throw new Error(("Value axis with name " + name + " is already defined"));
                    }
                    this$1.namedValueAxes[name] = valueAxis;
                }
                valueAxis.axisIndex = i;

                axes.push(valueAxis);
                this$1.appendAxis(valueAxis);
            }
        }

        var primaryAxis = this.valueAxis || axes[0];
        this.valueAxis = primaryAxis;

        if (invertAxes) {
            this.axisX = primaryAxis;
        } else {
            this.axisY = primaryAxis;
        }
    };

    CategoricalPlotArea.prototype._dispatchEvent = function _dispatchEvent (chart, e, eventType) {
        var coords = chart._eventCoordinates(e);
        var point = new Point(coords.x, coords.y);
        var pane = this.pointPane(point);
        var categories = [];
        var values = [];

        if (!pane) {
            return;
        }

        var allAxes = pane.axes;
        for (var i = 0; i < allAxes.length; i++) {
            var axis = allAxes[i];
            if (axis.getValue) {
                appendIfNotNull(values, axis.getValue(point));
            } else {
                appendIfNotNull(categories, axis.getCategory(point));
            }
        }

        if (categories.length === 0) {
            appendIfNotNull(categories, this.categoryAxis.getCategory(point));
        }

        if (categories.length > 0 && values.length > 0) {
            chart.trigger(eventType, {
                element: eventElement(e),
                originalEvent: e,
                category: singleItemOrArray(categories),
                value: singleItemOrArray(values)
            });
        }
    };

    CategoricalPlotArea.prototype.pointPane = function pointPane (point) {
        var panes = this.panes;

        for (var i = 0; i < panes.length; i++) {
            var currentPane = panes[i];
            if (currentPane.contentBox.containsPoint(point)) {
                return currentPane;
            }
        }
    };

    CategoricalPlotArea.prototype.updateAxisOptions = function updateAxisOptions (axis, options) {
        var axesOptions = axis instanceof CategoryAxis ? [].concat(this.options.categoryAxis) : [].concat(this.options.valueAxis);
        deepExtend(axesOptions[axis.axisIndex], options);
    };

    return CategoricalPlotArea;
}(PlotAreaBase));

function groupSeries(series, axis, axisIx) {
    return grep(series, function(s) {
        return (axisIx === 0 && !s.categoryAxis) || (s.categoryAxis === axis);
    });
}

setDefaultOptions(CategoricalPlotArea, {
    categoryAxis: {
        categories: []
    },
    valueAxis: {}
});

deepExtend(CategoricalPlotArea.prototype, PlotAreaEventsMixin);

var Highlight = (function (Class$$1) {
    function Highlight() {
        Class$$1.call(this);

        this._points = [];
    }

    if ( Class$$1 ) Highlight.__proto__ = Class$$1;
    Highlight.prototype = Object.create( Class$$1 && Class$$1.prototype );
    Highlight.prototype.constructor = Highlight;

    Highlight.prototype.destroy = function destroy () {
        this._points = [];
    };

    Highlight.prototype.show = function show (points) {
        var this$1 = this;

        var arrayPoints = [].concat(points);
        this.hide();

        for (var i = 0; i < arrayPoints.length; i++) {
            var point = arrayPoints[i];
            if (point && point.toggleHighlight && point.hasHighlight()) {
                this$1.togglePointHighlight(point, true);
                this$1._points.push(point);
            }
        }
    };

    Highlight.prototype.togglePointHighlight = function togglePointHighlight (point, show) {
        var toggleHandler = (point.options.highlight || {}).toggle;
        if (toggleHandler) {
            var eventArgs = {
                category: point.category,
                series: point.series,
                dataItem: point.dataItem,
                value: point.value,
                stackValue: point.stackValue,
                preventDefault: preventDefault,
                visual: point.highlightVisual(),
                show: show
            };
            toggleHandler(eventArgs);
            if (!eventArgs._defaultPrevented) {
                point.toggleHighlight(show);
            }
        } else {
            point.toggleHighlight(show);
        }
    };

    Highlight.prototype.hide = function hide () {
        var this$1 = this;

        var points = this._points;
        while (points.length) {
            this$1.togglePointHighlight(points.pop(), false);
        }
    };

    Highlight.prototype.isHighlighted = function isHighlighted (element) {
        var points = this._points;

        for (var i = 0; i < points.length; i++) {
            var point = points[i];
            if (element === point) {
                return true;
            }
        }

        return false;
    };

    return Highlight;
}(_progress_kendoDrawing.Class));

function preventDefault() {
    this._defaultPrevented = true;
}

function acceptKey(e, mouseKey) {
    var key = (mouseKey || "").toLowerCase();
    var event = e.event;
    var accept = (key === "none" && !(event.ctrlKey || event.shiftKey || event.altKey)) || event[key + "Key"];

    return accept;
}

function toChartAxisRanges(axisRanges) {
    var ranges = {};
    for (var idx = 0; idx < axisRanges.length; idx++) {
        var axisRange = axisRanges[idx];
        if (axisRange.axis.options.name) {
            ranges[axisRange.axis.options.name] = {
                min: axisRange.range.min,
                max: axisRange.range.max
            };
        }
    }
    return ranges;
}

var Pannable = (function (Class$$1) {
    function Pannable(plotArea, options) {
        Class$$1.call(this);

        this.plotArea = plotArea;
        this.options = deepExtend({}, this.options, options);
    }

    if ( Class$$1 ) Pannable.__proto__ = Class$$1;
    Pannable.prototype = Object.create( Class$$1 && Class$$1.prototype );
    Pannable.prototype.constructor = Pannable;

    Pannable.prototype.start = function start (e) {
        this._active = acceptKey(e, this.options.key);
        return this._active;
    };

    Pannable.prototype.move = function move (e) {
        if (this._active) {
            var axisRanges = this.axisRanges = this._panAxes(e, X).concat(this._panAxes(e, Y));
            if (axisRanges.length) {
                this.axisRanges = axisRanges;
                return toChartAxisRanges(axisRanges);
            }
        }
    };

    Pannable.prototype.end = function end () {
        var active = this._active;
        this._active = false;

        return active;
    };

    Pannable.prototype.pan = function pan () {
        var ref = this;
        var plotArea = ref.plotArea;
        var axisRanges = ref.axisRanges;
        if (axisRanges.length) {
            for (var idx = 0; idx < axisRanges.length; idx++) {
                var range = axisRanges[idx];
                plotArea.updateAxisOptions(range.axis, range.range);
            }
            plotArea.redraw(plotArea.panes);
        }
    };

    Pannable.prototype.destroy = function destroy () {
        delete this.plotArea;
    };

    Pannable.prototype._panAxes = function _panAxes (e, position) {
        var plotArea = this.plotArea;
        var delta = -e[position].delta;
        var lock = (this.options.lock || "").toLowerCase();
        var updatedAxes = [];

        if (delta !== 0 && (lock || "").toLowerCase() !== position) {
            var axes = plotArea.axes;
            for (var idx = 0; idx < axes.length; idx++) {
                var axis = axes[idx];

                if (position === X && !axis.options.vertical || position === Y && axis.options.vertical) {
                    var range = axis.pan(delta);

                    if (range) {
                        range.limitRange = true;
                        updatedAxes.push({
                            axis: axis,
                            range: range
                        });
                    }
                }
            }
        }

        return updatedAxes;
    };

    return Pannable;
}(_progress_kendoDrawing.Class));

Pannable.prototype.options = {
    key: "none",
    lock: "none"
};

var ZoomSelection = (function (Class$$1) {
    function ZoomSelection(chart, options) {
        Class$$1.call(this);

        this.chart = chart;
        this.options = deepExtend({}, this.options, options);
        this.createElement();
    }

    if ( Class$$1 ) ZoomSelection.__proto__ = Class$$1;
    ZoomSelection.prototype = Object.create( Class$$1 && Class$$1.prototype );
    ZoomSelection.prototype.constructor = ZoomSelection;

    ZoomSelection.prototype.createElement = function createElement () {
        var marquee = this._marquee = document.createElement("div");
        marquee.className = "k-marquee";
        var marqueeColor = document.createElement("div");
        marqueeColor.className = "k-marquee-color";
        marquee.appendChild(marqueeColor);
    };

    ZoomSelection.prototype.removeElement = function removeElement () {
        if (this._marquee.parentNode) {
            this._marquee.parentNode.removeChild(this._marquee);
        }
    };

    ZoomSelection.prototype.setStyles = function setStyles (styles) {
        elementStyles(this._marquee, styles);
    };

    ZoomSelection.prototype.start = function start (e) {
        if (acceptKey(e, this.options.key)) {
            var chart = this.chart;
            var point = chart._eventCoordinates(e);
            var zoomPane = this._zoomPane = chart._plotArea.paneByPoint(point);
            if (zoomPane && zoomPane.clipBox()) {
                var clipBox = zoomPane.clipBox().clone();
                var offset = this._elementOffset();

                clipBox.translate(offset.left, offset.top);
                this._zoomPaneClipBox = clipBox;

                document.body.appendChild(this._marquee);
                this.setStyles({
                    left: e.pageX + 1,
                    top: e.pageY + 1,
                    width: 0,
                    height: 0
                });

                return true;
            }
        }
        return false;
    };

    ZoomSelection.prototype._elementOffset = function _elementOffset () {
        var chartElement = this.chart.element;
        var ref = elementStyles(chartElement, [ "paddingLeft", "paddingTop" ]);
        var paddingLeft = ref.paddingLeft;
        var paddingTop = ref.paddingTop;
        var offset = elementOffset(chartElement);

        return {
            left: paddingLeft + offset.left,
            top: paddingTop + offset.top
        };
    };

    ZoomSelection.prototype.move = function move (e) {
        var zoomPane = this._zoomPane;
        if (zoomPane) {
            this.setStyles(this._selectionPosition(e));
        }
    };

    ZoomSelection.prototype.end = function end (e) {
        var zoomPane = this._zoomPane;
        if (zoomPane) {
            var elementOffset$$1 = this._elementOffset();
            var selectionPosition = this._selectionPosition(e);
            selectionPosition.left -= elementOffset$$1.left;
            selectionPosition.top -= elementOffset$$1.top;

            var start = { x: selectionPosition.left, y: selectionPosition.top };
            var end = { x: selectionPosition.left + selectionPosition.width, y: selectionPosition.top + selectionPosition.height };
            this._updateAxisRanges(start, end);

            this.removeElement();
            delete this._zoomPane;

            return toChartAxisRanges(this.axisRanges);
        }
    };

    ZoomSelection.prototype.zoom = function zoom () {
        var axisRanges = this.axisRanges;
        if (axisRanges && axisRanges.length) {
            var plotArea = this.chart._plotArea;
            for (var idx = 0; idx < axisRanges.length; idx++) {
                var axisRange = axisRanges[idx];
                plotArea.updateAxisOptions(axisRange.axis, axisRange.range);
            }
            plotArea.redraw(plotArea.panes);
        }
    };

    ZoomSelection.prototype.destroy = function destroy () {
        this.removeElement();
        delete this._marquee;
        delete this.chart;
    };

    ZoomSelection.prototype._updateAxisRanges = function _updateAxisRanges (start, end) {
        var lock = (this.options.lock || "").toLowerCase();
        var axisRanges = [];

        var axes = this._zoomPane.axes;
        for (var idx = 0; idx < axes.length; idx++) {
            var axis = axes[idx];
            var vertical = axis.options.vertical;
            if (!(lock === X && !vertical) && !(lock === Y && vertical)) {
                var range = axis.pointsRange(start, end);
                if (range) {
                    axisRanges.push({
                        axis: axis,
                        range: range
                    });
                }
            }
        }

        this.axisRanges = axisRanges;
    };

    ZoomSelection.prototype._selectionPosition = function _selectionPosition (e) {
        var clipBox = this._zoomPaneClipBox;
        var startLocation = {
            x: e.x.startLocation,
            y: e.y.startLocation
        };
        var pageX = e.x.location;
        var pageY = e.y.location;
        var lock = (this.options.lock || "").toLowerCase();
        var left = Math.min(startLocation.x, pageX);
        var top = Math.min(startLocation.y, pageY);
        var width = Math.abs(startLocation.x - pageX);
        var height = Math.abs(startLocation.y - pageY);

        if (lock === X) {
            left = clipBox.x1;
            width = clipBox.width();
        }
        if (lock === Y) {
            top = clipBox.y1;
            height = clipBox.height();
        }

        if (pageX > clipBox.x2) {
            width = clipBox.x2 - startLocation.x;
        }

        if (pageX < clipBox.x1) {
            width = startLocation.x - clipBox.x1;
        }

        if (pageY > clipBox.y2) {
            height = clipBox.y2 - startLocation.y;
        }

        if (pageY < clipBox.y1) {
            height = startLocation.y - clipBox.y1;
        }

        return {
            left: Math.max(left, clipBox.x1),
            top: Math.max(top, clipBox.y1),
            width: width,
            height: height
        };
    };

    return ZoomSelection;
}(_progress_kendoDrawing.Class));

ZoomSelection.prototype.options = {
    key: "shift",
    lock: "none"
};

var MousewheelZoom = (function (Class$$1) {
    function MousewheelZoom(chart, options) {
        Class$$1.call(this);

        this.chart = chart;
        this.options = deepExtend({}, this.options, options);
    }

    if ( Class$$1 ) MousewheelZoom.__proto__ = Class$$1;
    MousewheelZoom.prototype = Object.create( Class$$1 && Class$$1.prototype );
    MousewheelZoom.prototype.constructor = MousewheelZoom;

    MousewheelZoom.prototype.updateRanges = function updateRanges (delta) {
        var lock = (this.options.lock || "").toLowerCase();
        var axisRanges = [];
        var axes = this.chart._plotArea.axes;

        for (var idx = 0; idx < axes.length; idx++) {
            var axis = axes[idx];
            var vertical = axis.options.vertical;

            if (!(lock === X && !vertical) && !(lock === Y && vertical)) {
                var range = axis.zoomRange(-delta);

                if (range) {
                    axisRanges.push({
                        axis: axis,
                        range: range
                    });
                }
            }
        }

        this.axisRanges = axisRanges;
        return toChartAxisRanges(axisRanges);
    };

    MousewheelZoom.prototype.zoom = function zoom () {
        var axisRanges = this.axisRanges;
        if (axisRanges && axisRanges.length) {
            var plotArea = this.chart._plotArea;
            for (var idx = 0; idx < axisRanges.length; idx++) {
                var axisRange = axisRanges[idx];
                plotArea.updateAxisOptions(axisRange.axis, axisRange.range);
            }
            plotArea.redraw(plotArea.panes);
        }
    };

    MousewheelZoom.prototype.destroy = function destroy () {
        delete this.chart;
    };

    return MousewheelZoom;
}(_progress_kendoDrawing.Class));

var LegendLayout = (function (ChartElement$$1) {
    function LegendLayout(options, chartService) {
        ChartElement$$1.call(this, options);

        this.chartService = chartService;
    }

    if ( ChartElement$$1 ) LegendLayout.__proto__ = ChartElement$$1;
    LegendLayout.prototype = Object.create( ChartElement$$1 && ChartElement$$1.prototype );
    LegendLayout.prototype.constructor = LegendLayout;

    LegendLayout.prototype.render = function render () {
        var ref = this;
        var children = ref.children;
        var options = ref.options;
        var vertical = options.vertical;

        this.visual = new _progress_kendoDrawing.drawing.Layout(null, {
            spacing: vertical ? 0 : options.spacing,
            lineSpacing: vertical ? options.spacing : 0,
            orientation: vertical ? "vertical" : "horizontal"
        });

        for (var idx = 0; idx < children.length; idx++) {
            var legendItem = children[idx];
            legendItem.reflow(new Box());
            legendItem.renderVisual();
        }
    };

    LegendLayout.prototype.reflow = function reflow (box) {
        this.visual.rect(box.toRect());
        this.visual.reflow();
        var bbox = this.visual.clippedBBox();

        if (bbox) {
            this.box = rectToBox(bbox);
        } else {
            this.box = new Box();
        }
    };

    LegendLayout.prototype.renderVisual = function renderVisual () {
        this.addVisual();
    };

    LegendLayout.prototype.createVisual = function createVisual () {};

    return LegendLayout;
}(ChartElement));

var LegendItem = (function (BoxElement$$1) {
    function LegendItem(options) {
        BoxElement$$1.call(this, options);

        this.createContainer();
        this.createMarker();
        this.createLabel();
    }

    if ( BoxElement$$1 ) LegendItem.__proto__ = BoxElement$$1;
    LegendItem.prototype = Object.create( BoxElement$$1 && BoxElement$$1.prototype );
    LegendItem.prototype.constructor = LegendItem;

    LegendItem.prototype.createContainer = function createContainer () {
        this.container = new FloatElement({ vertical: false, wrap: false, align: CENTER });
        this.append(this.container);
    };

    LegendItem.prototype.createMarker = function createMarker () {
        this.container.append(new ShapeElement(this.markerOptions()));
    };

    LegendItem.prototype.markerOptions = function markerOptions () {
        var options = this.options;
        var markerColor = options.markerColor;
        return deepExtend({}, options.markers, {
            background: markerColor,
            border: {
                color: markerColor
            }
        });
    };

    LegendItem.prototype.createLabel = function createLabel () {
        var options = this.options;
        var labelOptions = deepExtend({}, options.labels);

        this.container.append(new TextBox(options.text, labelOptions));
    };

    LegendItem.prototype.renderComplete = function renderComplete () {
        BoxElement$$1.prototype.renderComplete.call(this);

        var cursor = this.options.cursor || {};
        var eventSink = this._itemOverlay = _progress_kendoDrawing.drawing.Path.fromRect(this.container.box.toRect(), {
            fill: {
                color: WHITE,
                opacity: 0
            },
            stroke: null,
            cursor: cursor.style || cursor
        });

        this.appendVisual(eventSink);
    };

    LegendItem.prototype.click = function click (widget, e) {
        var args = this.eventArgs(e);

        if (!widget.trigger(LEGEND_ITEM_CLICK, args)) {
            e.preventDefault();
        }
    };

    LegendItem.prototype.hover = function hover (widget, e) {
        var args = this.eventArgs(e);

        if (!widget.trigger(LEGEND_ITEM_HOVER, args)) {
            e.preventDefault();
            widget._legendItemHover(args.seriesIndex, args.pointIndex);
        }

        // Don't trigger point hover for legend items
        return true;
    };

    LegendItem.prototype.leave = function leave (widget) {
        widget._unsetActivePoint();
    };

    LegendItem.prototype.eventArgs = function eventArgs (e) {
        var options = this.options;

        return {
            element: eventElement(e),
            text: options.text,
            series: options.series,
            seriesIndex: options.series.index,
            pointIndex: options.pointIndex
        };
    };

    LegendItem.prototype.renderVisual = function renderVisual () {
        var this$1 = this;

        var options = this.options;
        var customVisual = options.visual;

        if (customVisual) {
            this.visual = customVisual({
                active: options.active,
                series: options.series,
                sender: this.getSender(),
                pointIndex: options.pointIndex,
                options: {
                    markers: this.markerOptions(),
                    labels: options.labels
                },
                createVisual: function () {
                    this$1.createVisual();
                    this$1.renderChildren();
                    this$1.renderComplete();

                    var defaultVisual = this$1.visual;

                    delete this$1.visual;

                    return defaultVisual;
                }
            });
            this.addVisual();
        } else {
            BoxElement$$1.prototype.renderVisual.call(this);
        }
    };

    return LegendItem;
}(BoxElement));

var HORIZONTAL = "horizontal";
var POINTER = "pointer";
var CUSTOM = "custom";

var Legend = (function (ChartElement$$1) {
    function Legend(options, chartService) {
        ChartElement$$1.call(this, options);

        this.chartService = chartService;

        if (!inArray(this.options.position, [ TOP, RIGHT, BOTTOM, LEFT, CUSTOM ])) {
            this.options.position = RIGHT;
        }

        this.createContainer();

        this.createItems();
    }

    if ( ChartElement$$1 ) Legend.__proto__ = ChartElement$$1;
    Legend.prototype = Object.create( ChartElement$$1 && ChartElement$$1.prototype );
    Legend.prototype.constructor = Legend;

    Legend.prototype.createContainer = function createContainer () {
        var options = this.options;
        var position = options.position;
        var userAlign = options.align;
        var align = position;
        var vAlign = CENTER;

        if (position === CUSTOM) {
            align = LEFT;
        } else if (inArray(position, [ TOP, BOTTOM ])) {
            if (userAlign === "start") {
                align = LEFT;
            } else if (userAlign === "end") {
                align = RIGHT;
            } else {
                align = CENTER;
            }
            vAlign = position;
        } else if (userAlign) {
            if (userAlign === "start") {
                vAlign = TOP;
            } else if (userAlign === "end") {
                vAlign = BOTTOM;
            }
        }

        this.container = new BoxElement({
            margin: options.margin,
            padding: options.padding,
            background: options.background,
            border: options.border,
            vAlign: vAlign,
            align: align,
            zIndex: options.zIndex,
            shrinkToFit: true
        });

        this.append(this.container);
    };

    Legend.prototype.createItems = function createItems () {
        var chartService = this.getService();
        var options = this.options;
        var vertical = this.isVertical();
        var innerElement = new LegendLayout({
            vertical: vertical,
            spacing: options.spacing
        }, chartService);
        var items = options.items;

        if (options.reverse) {
            items = items.slice(0).reverse();
        }

        var count = items.length;

        for (var i = 0; i < count; i++) {
            var item = items[i];

            innerElement.append(new LegendItem(deepExtend({}, {
                markers: options.markers,
                labels: options.labels
            }, options.item, item)));
        }

        innerElement.render();

        this.container.append(innerElement);
    };

    Legend.prototype.isVertical = function isVertical () {
        var ref = this.options;
        var orientation = ref.orientation;
        var position = ref.position;
        var vertical = (position === CUSTOM && orientation !== HORIZONTAL) ||
               (defined(orientation) ? orientation !== HORIZONTAL : inArray(position, [ LEFT, RIGHT ]));

        return vertical;
    };

    Legend.prototype.hasItems = function hasItems () {
        return this.container.children[0].children.length > 0;
    };

    Legend.prototype.reflow = function reflow (targetBox) {
        var options = this.options;
        var legendBox = targetBox.clone();

        if (!this.hasItems()) {
            this.box = legendBox;
            return;
        }

        if (options.position === CUSTOM) {
            this.containerCustomReflow(legendBox);
            this.box = legendBox;
        } else {
            this.containerReflow(legendBox);
        }
    };

    Legend.prototype.containerReflow = function containerReflow (targetBox) {
        var ref = this;
        var options = ref.options;
        var container = ref.container;
        var position = options.position;
        var width = options.width;
        var height = options.height;
        var pos = position === TOP || position === BOTTOM ? X : Y;
        var vertical = this.isVertical();
        var alignTarget = targetBox.clone();
        var containerBox = targetBox.clone();

        if (position === LEFT || position === RIGHT) {
            containerBox.y1 = alignTarget.y1 = 0;
        }

        if (vertical && height) {
            containerBox.y2 = containerBox.y1 + height;
            containerBox.align(alignTarget, Y, container.options.vAlign);
        } else if (!vertical && width) {
            containerBox.x2 = containerBox.x1 + width;
            containerBox.align(alignTarget, X, container.options.align);
        }

        container.reflow(containerBox);
        containerBox = container.box;

        var box = containerBox.clone();

        if (options.offsetX || options.offsetY) {
            containerBox.translate(options.offsetX, options.offsetY);
            this.container.reflow(containerBox);
        }

        box[pos + 1] = targetBox[pos + 1];
        box[pos + 2] = targetBox[pos + 2];

        this.box = box;
    };

    Legend.prototype.containerCustomReflow = function containerCustomReflow (targetBox) {
        var ref = this;
        var options = ref.options;
        var container = ref.container;
        var offsetX = options.offsetX;
        var offsetY = options.offsetY;
        var width = options.width;
        var height = options.height;
        var vertical = this.isVertical();
        var containerBox = targetBox.clone();

        if (vertical && height) {
            containerBox.y2 = containerBox.y1 + height;
        } else if (!vertical && width) {
            containerBox.x2 = containerBox.x1 + width;
        }
        container.reflow(containerBox);
        containerBox = container.box;

        container.reflow(new Box(
            offsetX, offsetY,
            offsetX + containerBox.width(), offsetY + containerBox.height()
        ));
    };

    Legend.prototype.renderVisual = function renderVisual () {
        if (this.hasItems()) {
            ChartElement$$1.prototype.renderVisual.call(this);
        }
    };

    return Legend;
}(ChartElement));

setDefaultOptions(Legend, {
    position: RIGHT,
    items: [],
    labels: {
        margin: {
            left: 6
        }
    },
    offsetX: 0,
    offsetY: 0,
    margin: getSpacing(5),
    padding: getSpacing(5),
    border: {
        color: BLACK,
        width: 0
    },
    item: {
        cursor: POINTER
    },
    spacing: 6,
    background: "",
    zIndex: 1,
    markers: {
        border: {
            width: 0
        },
        width: 15,
        height: 3,
        type: "rect",
        align: LEFT,
        vAlign: CENTER
    }
});

var PlotAreaFactory = (function (Class$$1) {
    function PlotAreaFactory() {
        Class$$1.call(this);

        this._registry = [];
    }

    if ( Class$$1 ) PlotAreaFactory.__proto__ = Class$$1;
    PlotAreaFactory.prototype = Object.create( Class$$1 && Class$$1.prototype );
    PlotAreaFactory.prototype.constructor = PlotAreaFactory;

    PlotAreaFactory.prototype.register = function register (type, seriesTypes) {
        this._registry.push({
            type: type,
            seriesTypes: seriesTypes
        });
    };

    PlotAreaFactory.prototype.create = function create (srcSeries, options, chartService) {
        var registry = this._registry;
        var match = registry[0];
        var series;

        for (var idx = 0; idx < registry.length; idx++) {
            var entry = registry[idx];
            series = filterSeriesByType(srcSeries, entry.seriesTypes);

            if (series.length > 0) {
                match = entry;
                break;
            }
        }

        return new match.type(series, options, chartService);
    };

    return PlotAreaFactory;
}(_progress_kendoDrawing.Class));

PlotAreaFactory.current = new PlotAreaFactory();

var ZOOM_ACCELERATION = 3;
var SELECTOR_HEIGHT_ADJUST = 0.1;

function createDiv(className) {
    var element = document.createElement("div");
    if (className) {
        element.className = className;
    }

    return element;
}

function closestHandle(element) {
    var current = element;
    while (current && !hasClasses(current, "k-handle")) {
        current = current.parentNode;
    }

    return current;
}

var Selection = (function (Class$$1) {
    function Selection(chart, categoryAxis, options, observer) {
        Class$$1.call(this);

        var chartElement = chart.element;
        var valueAxis = this.getValueAxis(categoryAxis);
        this.options = deepExtend({}, this.options, options);
        this.chart = chart;
        this.observer = observer;
        this.chartElement = chartElement;
        this.categoryAxis = categoryAxis;
        this._dateAxis = this.categoryAxis instanceof DateCategoryAxis;
        this.valueAxis = valueAxis;

        this.initOptions();

        if (this.options.visible) {
            this.createElements();

            this.set(this._index(this.options.from), this._index(this.options.to));

            this.bindEvents();
        }
    }

    if ( Class$$1 ) Selection.__proto__ = Class$$1;
    Selection.prototype = Object.create( Class$$1 && Class$$1.prototype );
    Selection.prototype.constructor = Selection;

    Selection.prototype.createElements = function createElements () {
        var options = this.options;
        var wrapper = this.wrapper = createDiv("k-selector");
        elementStyles(wrapper, {
            top: options.offset.top,
            left: options.offset.left,
            width: options.width,
            height: options.height
        });
        var selection = this.selection = createDiv("k-selection");
        this.leftMask = createDiv("k-mask");
        this.rightMask = createDiv("k-mask");

        wrapper.appendChild(this.leftMask);
        wrapper.appendChild(this.rightMask);
        wrapper.appendChild(selection);

        selection.appendChild(createDiv("k-selection-bg"));

        var leftHandle = this.leftHandle = createDiv("k-handle k-left-handle");
        var rightHandle = this.rightHandle = createDiv("k-handle k-right-handle");
        leftHandle.appendChild(createDiv());
        rightHandle.appendChild(createDiv());

        selection.appendChild(leftHandle);
        selection.appendChild(rightHandle);

        this.chartElement.appendChild(wrapper);
        var selectionStyles = elementStyles(selection, [ "borderLeftWidth", "borderRightWidth", "height" ]);
        var leftHandleHeight = elementStyles(leftHandle, "height").height;
        var rightHandleHeight = elementStyles(rightHandle, "height").height;

        options.selection = {
            border: {
                left: selectionStyles.borderLeftWidth,
                right: selectionStyles.borderRightWidth
            }
        };

        elementStyles(leftHandle, {
            top: (selectionStyles.height - leftHandleHeight) / 2
        });

        elementStyles(rightHandle, {
            top: (selectionStyles.height - rightHandleHeight) / 2
        });

        wrapper.style.cssText = wrapper.style.cssText;
    };

    Selection.prototype.bindEvents = function bindEvents$1 () {
        this._mousewheelHandler = this.options.mousewheel !== false ? this._mousewheel.bind(this) : stopPropagation;

        var obj;
        bindEvents(this.wrapper, ( obj = {}, obj[ MOUSEWHEEL ] = this._mousewheelHandler, obj ));

        this._domEvents = DomEventsBuilder.create(this.wrapper, {
            start: this._start.bind(this),
            move: this._move.bind(this),
            end: this._end.bind(this),
            tap: this._tap.bind(this),
            press: this._press.bind(this),
            gesturestart: this._gesturestart.bind(this),
            gesturechange: this._gesturechange.bind(this),
            gestureend: this._gestureend.bind(this)
        });
    };

    Selection.prototype.initOptions = function initOptions () {
        var ref = this;
        var options = ref.options;
        var categoryAxis = ref.categoryAxis;
        var valueAxis = ref.valueAxis;
        var categoryAxisLineBox = categoryAxis.lineBox();
        var valueAxisLineBox = valueAxis.lineBox();
        var intlService = this.chart.chartService.intl;

        if (this._dateAxis) {
            deepExtend(options, {
                min: parseDate(intlService, options.min),
                max: parseDate(intlService, options.max),
                from: parseDate(intlService, options.from),
                to: parseDate(intlService, options.to)
            });
        }

        var ref$1 = elementStyles(this.chartElement, [ "paddingLeft", "paddingTop" ]);
        var paddingLeft = ref$1.paddingLeft;
        var paddingTop = ref$1.paddingTop;

        this.options = deepExtend({}, {
            width: categoryAxisLineBox.width(),
            height: valueAxisLineBox.height() + SELECTOR_HEIGHT_ADJUST, //workaround for sub-pixel hover on the paths in chrome
            padding: {
                left: paddingLeft,
                top: paddingTop
            },
            offset: {
                left: valueAxisLineBox.x2 + paddingLeft,
                top: valueAxisLineBox.y1 + paddingTop
            },
            from: options.min,
            to: options.max
        }, options);
    };

    Selection.prototype.destroy = function destroy () {
        if (this._domEvents) {
            this._domEvents.destroy();
            delete this._domEvents;
        }

        clearTimeout(this._mwTimeout);
        this._state = null;

        if (this.wrapper) {
            var obj;
            unbindEvents(this.wrapper, ( obj = {}, obj[ MOUSEWHEEL ] = this._mousewheelHandler, obj ));
            this.chartElement.removeChild(this.wrapper);
        }
    };

    Selection.prototype._rangeEventArgs = function _rangeEventArgs (range) {

        return {
            axis: this.categoryAxis.options,
            from: this._value(range.from),
            to: this._value(range.to)
        };
    };

    Selection.prototype._start = function _start (e) {
        var options = this.options;
        var target = eventElement(e);

        if (this._state || !target) {
            return;
        }

        this.chart._unsetActivePoint();
        this._state = {
            moveTarget: closestHandle(target) || target,
            startLocation: e.x ? e.x.location : 0,
            range: {
                from: this._index(options.from),
                to: this._index(options.to)
            }
        };

        var args = this._rangeEventArgs({
            from: this._index(options.from),
            to: this._index(options.to)
        });

        if (this.trigger(SELECT_START, args)) {
            this._state = null;
        }
    };

    Selection.prototype._press = function _press (e) {
        var handle;
        if (this._state) {
            handle = this._state.moveTarget;
        } else {
            handle = closestHandle(eventElement(e));
        }
        if (handle) {
            addClass(handle, "k-handle-active");
        }
    };

    Selection.prototype._move = function _move (e) {
        if (!this._state) {
            return;
        }

        var ref = this;
        var state = ref._state;
        var options = ref.options;
        var categories = ref.categoryAxis.options.categories;
        var range = state.range;
        var target = state.moveTarget;
        var from = this._index(options.from);
        var to = this._index(options.to);
        var min = this._index(options.min);
        var max = this._index(options.max);
        var delta = state.startLocation - e.x.location;
        var oldRange = { from: range.from, to: range.to };
        var span = range.to - range.from;
        var scale = elementStyles(this.wrapper, "width").width / (categories.length - 1);
        var offset = Math.round(delta / scale);

        if (!target) {
            return;
        }

        if (hasClasses(target, "k-selection k-selection-bg")) {
            range.from = Math.min(
                Math.max(min, from - offset),
                max - span
            );
            range.to = Math.min(
                range.from + span,
                max
            );
        } else if (hasClasses(target, "k-left-handle")) {
            range.from = Math.min(
                Math.max(min, from - offset),
                max - 1
            );
            range.to = Math.max(range.from + 1, range.to);
        } else if (hasClasses(target, "k-right-handle")) {
            range.to = Math.min(
                Math.max(min + 1, to - offset),
                max
            );
            range.from = Math.min(range.to - 1, range.from);
        }

        if (range.from !== oldRange.from || range.to !== oldRange.to) {
            this.move(range.from, range.to);
            this.trigger(SELECT, this._rangeEventArgs(range));
        }
    };

    Selection.prototype._end = function _end () {
        if (this._state) {
            var moveTarget = this._state.moveTarget;
            if (moveTarget) {
                removeClass(moveTarget, "k-handle-active");
            }

            var range = this._state.range;
            this.set(range.from, range.to);
            this.trigger(SELECT_END, this._rangeEventArgs(range));

            delete this._state;
        }
    };

    Selection.prototype._tap = function _tap (e) {
        var ref = this;
        var options = ref.options;
        var categoryAxis = ref.categoryAxis;
        var coords = this.chart._eventCoordinates(e);
        var categoryIx = categoryAxis.pointCategoryIndex(new Point(coords.x, categoryAxis.box.y1));
        var from = this._index(options.from);
        var to = this._index(options.to);
        var min = this._index(options.min);
        var max = this._index(options.max);
        var span = to - from;
        var mid = from + span / 2;
        var range = {};
        var rightClick = e.event.which === 3;
        var offset = Math.round(mid - categoryIx);

        if (this._state || rightClick) {
            return;
        }


        this.chart._unsetActivePoint();

        if (!categoryAxis.options.justified) {
            offset--;
        }

        range.from = Math.min(
            Math.max(min, from - offset),
            max - span
        );

        range.to = Math.min(range.from + span, max);

        this._start(e);
        if (this._state) {
            this._state.range = range;
            this.trigger(SELECT, this._rangeEventArgs(range));
            this._end();
        }
    };

    Selection.prototype._mousewheel = function _mousewheel (e) {
        var this$1 = this;

        var delta = mousewheelDelta(e);

        this._start({ target: this.selection });

        if (this._state) {
            var range = this._state.range;

            e.preventDefault();
            e.stopPropagation();

            if (Math.abs(delta) > 1) {
                delta *= ZOOM_ACCELERATION;
            }

            if (this.options.mousewheel.reverse) {
                delta *= -1;
            }

            if (this.expand(delta)) {
                this.trigger(SELECT, {
                    axis: this.categoryAxis.options,
                    delta: delta,
                    originalEvent: e,
                    from: this._value(range.from),
                    to: this._value(range.to)
                });
            }

            if (this._mwTimeout) {
                clearTimeout(this._mwTimeout);
            }

            this._mwTimeout = setTimeout(function () {
                this$1._end();
            }, MOUSEWHEEL_DELAY);
        }
    };

    Selection.prototype._gesturestart = function _gesturestart (e) {
        var options = this.options;

        this._state = {
            range: {
                from: this._index(options.from),
                to: this._index(options.to)
            }
        };
        var args = this._rangeEventArgs(this._state.range);

        if (this.trigger(SELECT_START, args)) {
            this._state = null;
        } else {
            e.preventDefault();
        }
    };

    Selection.prototype._gestureend = function _gestureend () {
        if (this._state) {
            this.trigger(SELECT_END, this._rangeEventArgs(this._state.range));
            delete this._state;
        }
    };

    Selection.prototype._gesturechange = function _gesturechange (e) {
        var ref = this;
        var chart = ref.chart;
        var state = ref._state;
        var options = ref.options;
        var categoryAxis = ref.categoryAxis;
        var range = state.range;
        var p0 = chart._toModelCoordinates(e.touches[0].x.location).x;
        var p1 = chart._toModelCoordinates(e.touches[1].x.location).x;
        var left = Math.min(p0, p1);
        var right = Math.max(p0, p1);

        e.preventDefault();

        range.from = categoryAxis.pointCategoryIndex(new Point(left)) || options.min;

        range.to = categoryAxis.pointCategoryIndex(new Point(right)) || options.max;

        this.move(range.from, range.to);

        this.trigger(SELECT, this._rangeEventArgs(range));
    };

    Selection.prototype._index = function _index (value) {
        var index = value;

        if (value instanceof Date) {
            index = this.categoryAxis.categoryIndex(value);
        }

        return index;
    };

    Selection.prototype._value = function _value (index) {
        var categories = this.categoryAxis.options.categories;
        var value = index;

        if (this._dateAxis) {
            if (index > categories.length - 1) {
                value = this.options.max;
            } else {
                value = categories[Math.ceil(index)];
            }
        }

        return value;
    };

    Selection.prototype._slot = function _slot (value) {
        var categoryAxis = this.categoryAxis;
        var index = this._index(value);

        return categoryAxis.getSlot(index, index, true);
    };

    Selection.prototype.move = function move (from, to) {
        var options = this.options;
        var offset = options.offset;
        var padding = options.padding;
        var border = options.selection.border;
        var box = this._slot(from);
        var leftMaskWidth = round(box.x1 - offset.left + padding.left);

        elementStyles(this.leftMask, {
            width: leftMaskWidth
        });
        elementStyles(this.selection, {
            left: leftMaskWidth
        });


        box = this._slot(to);

        var rightMaskWidth = round(options.width - (box.x1 - offset.left + padding.left));
        elementStyles(this.rightMask, {
            width: rightMaskWidth
        });

        var distance = options.width - rightMaskWidth;
        if (distance !== options.width) {
            distance += border.right;
        }

        elementStyles(this.rightMask, {
            left: distance
        });
        elementStyles(this.selection, {
            width: Math.max(options.width - (leftMaskWidth + rightMaskWidth) - border.right, 0)
        });
    };

    Selection.prototype.set = function set (from, to) {
        var options = this.options;
        var min = this._index(options.min);
        var max = this._index(options.max);
        var fromValue = limitValue(this._index(from), min, max);
        var toValue = limitValue(this._index(to), fromValue + 1, max);

        if (options.visible) {
            this.move(fromValue, toValue);
        }

        options.from = this._value(fromValue);
        options.to = this._value(toValue);
    };

    Selection.prototype.expand = function expand (delta) {
        var options = this.options;
        var min = this._index(options.min);
        var max = this._index(options.max);
        var zDir = options.mousewheel.zoom;
        var from = this._index(options.from);
        var to = this._index(options.to);
        var range = { from: from, to: to };
        var oldRange = deepExtend({}, range);

        if (this._state) {
            range = this._state.range;
        }

        if (zDir !== RIGHT) {
            range.from = limitValue(
                limitValue(from - delta, 0, to - 1),
                min, max
            );
        }

        if (zDir !== LEFT) {
            range.to = limitValue(
                limitValue(to + delta, range.from + 1, max),
                min,
                max
             );
        }

        if (range.from !== oldRange.from || range.to !== oldRange.to) {
            this.set(range.from, range.to);
            return true;
        }
    };

    Selection.prototype.getValueAxis = function getValueAxis (categoryAxis) {
        var axes = categoryAxis.pane.axes;
        var axesCount = axes.length;

        for (var i = 0; i < axesCount; i++) {
            var axis = axes[i];

            if (axis.options.vertical !== categoryAxis.options.vertical) {
                return axis;
            }
        }
    };

    Selection.prototype.trigger = function trigger (name, args) {
        return (this.observer || this.chart).trigger(name, args);
    };

    return Selection;
}(_progress_kendoDrawing.Class));

function stopPropagation(e) {
    e.stopPropagation();
}

setDefaultOptions(Selection, {
    visible: true,
    mousewheel: {
        zoom: "both"
    },
    min: MIN_VALUE,
    max: MAX_VALUE
});

var Tooltip = (function (BaseTooltip$$1) {
    function Tooltip () {
        BaseTooltip$$1.apply(this, arguments);
    }

    if ( BaseTooltip$$1 ) Tooltip.__proto__ = BaseTooltip$$1;
    Tooltip.prototype = Object.create( BaseTooltip$$1 && BaseTooltip$$1.prototype );
    Tooltip.prototype.constructor = Tooltip;

    Tooltip.prototype.show = function show (point) {
        if (!point || !point.tooltipAnchor || (this._current && this._current === point)) {
            return;
        }

        var options = deepExtend({}, this.options, point.options.tooltip);
        var anchor = point.tooltipAnchor();

        if (anchor) {
            this._current = point;
            BaseTooltip$$1.prototype.show.call(this, {
                point: point,
                anchor: anchor
            }, options, point);
        } else {
            this.hide();
        }
    };

    Tooltip.prototype.hide = function hide () {
        delete this._current;
        BaseTooltip$$1.prototype.hide.call(this);
    };

    return Tooltip;
}(BaseTooltip));

var SharedTooltip = (function (BaseTooltip$$1) {
    function SharedTooltip(plotArea, options) {
        BaseTooltip$$1.call(this, plotArea.chartService, options);

        this.plotArea = plotArea;
        this.formatService = plotArea.chartService.format;
    }

    if ( BaseTooltip$$1 ) SharedTooltip.__proto__ = BaseTooltip$$1;
    SharedTooltip.prototype = Object.create( BaseTooltip$$1 && BaseTooltip$$1.prototype );
    SharedTooltip.prototype.constructor = SharedTooltip;

    SharedTooltip.prototype.showAt = function showAt (points, coords) {
        var tooltipPoints = grep(points, function(point) {
            var tooltip = point.series.tooltip;
            var excluded = tooltip && tooltip.visible === false;

            return !excluded;
        });

        if (tooltipPoints.length > 0) {
            var point = tooltipPoints[0];
            var slot = this.plotArea.categoryAxis.getSlot(point.categoryIx);

            var anchor = coords ? this._slotAnchor(coords, slot) : this._defaultAnchor(point, slot);

            this.show({
                anchor: anchor,
                shared: true,
                points: points,
                category: point.category,
                categoryText: this.formatService.auto(this.options.categoryFormat, point.category),
                series: this.plotArea.series
            }, this.options);
        }
    };

    SharedTooltip.prototype._slotAnchor = function _slotAnchor (point, slot) {
        var axis = this.plotArea.categoryAxis;
        var align = {
            horizontal: "left",
            vertical: "center"
        };

        if (!axis.options.vertical) {
            point.x = slot.center().x;
        }

        return {
            point: point,
            align: align
        };
    };

    SharedTooltip.prototype._defaultAnchor = function _defaultAnchor (point, slot) {
        var box = point.owner.pane.chartsBox();
        var vertical = this.plotArea.categoryAxis.options.vertical;
        var center = box.center();
        var slotCenter = slot.center();
        var align = {
            horizontal: "center",
            vertical: "center"
        };

        var centerPoint;
        if (vertical) {
            centerPoint = new Point(center.x, slotCenter.y);
        } else {
            centerPoint = new Point(slotCenter.x, center.y);
        }

        return {
            point: centerPoint,
            align: align
        };
    };

    return SharedTooltip;
}(BaseTooltip));

setDefaultOptions(SharedTooltip, {
    categoryFormat: '{0:d}'
});

var BarChartAnimation = (function (superclass) {
    function BarChartAnimation () {
        superclass.apply(this, arguments);
    }

    if ( superclass ) BarChartAnimation.__proto__ = superclass;
    BarChartAnimation.prototype = Object.create( superclass && superclass.prototype );
    BarChartAnimation.prototype.constructor = BarChartAnimation;

    BarChartAnimation.prototype.setup = function setup () {
        var ref = this;
        var element = ref.element;
        var options = ref.options;
        var bbox = element.bbox();

        if (bbox) {
            this.origin = options.origin;
            var axis = options.vertical ? Y : X;

            var fromScale = this.fromScale = new _progress_kendoDrawing.geometry.Point(1, 1);
            fromScale[axis] = START_SCALE;

            element.transform(_progress_kendoDrawing.geometry.transform()
                .scale(fromScale.x, fromScale.y)
            );
        } else {
            this.abort();
        }
    };

    BarChartAnimation.prototype.step = function step (pos) {
        var scaleX = interpolateValue(this.fromScale.x, 1, pos);
        var scaleY = interpolateValue(this.fromScale.y, 1, pos);

        this.element.transform(_progress_kendoDrawing.geometry.transform()
            .scale(scaleX, scaleY, this.origin)
        );
    };

    BarChartAnimation.prototype.abort = function abort () {
        superclass.prototype.abort.call(this);
        this.element.transform(null);
    };

    return BarChartAnimation;
}(_progress_kendoDrawing.drawing.Animation));

setDefaultOptions(BarChartAnimation, {
    duration: INITIAL_ANIMATION_DURATION
});

_progress_kendoDrawing.drawing.AnimationFactory.current.register(BAR, BarChartAnimation);

var BubbleAnimation = (function (superclass) {
    function BubbleAnimation () {
        superclass.apply(this, arguments);
    }

    if ( superclass ) BubbleAnimation.__proto__ = superclass;
    BubbleAnimation.prototype = Object.create( superclass && superclass.prototype );
    BubbleAnimation.prototype.constructor = BubbleAnimation;

    BubbleAnimation.prototype.setup = function setup () {
        var center = this.center = this.element.bbox().center();
        this.element.transform(_progress_kendoDrawing.geometry.transform()
            .scale(START_SCALE, START_SCALE, center)
        );
    };

    BubbleAnimation.prototype.step = function step (pos) {
        this.element.transform(_progress_kendoDrawing.geometry.transform()
            .scale(pos, pos, this.center)
        );
    };

    return BubbleAnimation;
}(_progress_kendoDrawing.drawing.Animation));

setDefaultOptions(BubbleAnimation, {
    easing: "easeOutElastic"
});

_progress_kendoDrawing.drawing.AnimationFactory.current.register(BUBBLE, BubbleAnimation);

var FadeInAnimation = (function (superclass) {
    function FadeInAnimation () {
        superclass.apply(this, arguments);
    }

    if ( superclass ) FadeInAnimation.__proto__ = superclass;
    FadeInAnimation.prototype = Object.create( superclass && superclass.prototype );
    FadeInAnimation.prototype.constructor = FadeInAnimation;

    FadeInAnimation.prototype.setup = function setup () {
        this.fadeTo = this.element.opacity();
        this.element.opacity(0);
    };

    FadeInAnimation.prototype.step = function step (pos) {
        this.element.opacity(pos * this.fadeTo);
    };

    return FadeInAnimation;
}(_progress_kendoDrawing.drawing.Animation));

setDefaultOptions(FadeInAnimation, {
    duration: 200,
    easing: "linear"
});

_progress_kendoDrawing.drawing.AnimationFactory.current.register(FADEIN, FadeInAnimation);

var PieAnimation = (function (superclass) {
    function PieAnimation () {
        superclass.apply(this, arguments);
    }

    if ( superclass ) PieAnimation.__proto__ = superclass;
    PieAnimation.prototype = Object.create( superclass && superclass.prototype );
    PieAnimation.prototype.constructor = PieAnimation;

    PieAnimation.prototype.setup = function setup () {
        this.element.transform(_progress_kendoDrawing.geometry.transform()
            .scale(START_SCALE, START_SCALE, this.options.center)
        );
    };

    PieAnimation.prototype.step = function step (pos) {
        this.element.transform(_progress_kendoDrawing.geometry.transform()
            .scale(pos, pos, this.options.center)
        );
    };

    return PieAnimation;
}(_progress_kendoDrawing.drawing.Animation));

setDefaultOptions(PieAnimation, {
    easing: "easeOutElastic",
    duration: INITIAL_ANIMATION_DURATION
});

_progress_kendoDrawing.drawing.AnimationFactory.current.register(PIE, PieAnimation);

var ScatterLineChart = (function (ScatterChart$$1) {
    function ScatterLineChart () {
        ScatterChart$$1.apply(this, arguments);
    }

    if ( ScatterChart$$1 ) ScatterLineChart.__proto__ = ScatterChart$$1;
    ScatterLineChart.prototype = Object.create( ScatterChart$$1 && ScatterChart$$1.prototype );
    ScatterLineChart.prototype.constructor = ScatterLineChart;

    ScatterLineChart.prototype.render = function render () {
        ScatterChart$$1.prototype.render.call(this);

        this.renderSegments();
    };

    ScatterLineChart.prototype.createSegment = function createSegment (linePoints, currentSeries, seriesIx) {
        var style = currentSeries.style;
        var pointType;

        if (style === SMOOTH) {
            pointType = SplineSegment;
        } else {
            pointType = LineSegment;
        }

        return new pointType(linePoints, currentSeries, seriesIx);
    };

    ScatterLineChart.prototype.animationPoints = function animationPoints () {
        var points = ScatterChart$$1.prototype.animationPoints.call(this);
        return points.concat(this._segments);
    };

    ScatterLineChart.prototype.createMissingValue = function createMissingValue (value, missingValues) {
        if (missingValues === ZERO) {
            var missingValue = {
                x: value.x,
                y: value.y
            };
            if (!hasValue(missingValue.x)) {
                missingValue.x = 0;
            }
            if (!hasValue(missingValue.y)) {
                missingValue.y = 0;
            }
            return missingValue;
        }
    };

    return ScatterLineChart;
}(ScatterChart));

deepExtend(ScatterLineChart.prototype, LineChartMixin);

var XYPlotArea = (function (PlotAreaBase$$1) {
    function XYPlotArea () {
        PlotAreaBase$$1.apply(this, arguments);
    }

    if ( PlotAreaBase$$1 ) XYPlotArea.__proto__ = PlotAreaBase$$1;
    XYPlotArea.prototype = Object.create( PlotAreaBase$$1 && PlotAreaBase$$1.prototype );
    XYPlotArea.prototype.constructor = XYPlotArea;

    XYPlotArea.prototype.initFields = function initFields () {
        this.namedXAxes = {};
        this.namedYAxes = {};

        this.xAxisRangeTracker = new AxisGroupRangeTracker();
        this.yAxisRangeTracker = new AxisGroupRangeTracker();
    };

    XYPlotArea.prototype.render = function render (panes) {
        var this$1 = this;
        if ( panes === void 0 ) panes = this.panes;

        var seriesByPane = this.groupSeriesByPane();

        for (var i = 0; i < panes.length; i++) {
            var pane = panes[i];
            var paneSeries = seriesByPane[pane.options.name || "default"] || [];
            this$1.addToLegend(paneSeries);
            var filteredSeries = this$1.filterVisibleSeries(paneSeries);

            if (!filteredSeries) {
                continue;
            }

            this$1.createScatterChart(
                filterSeriesByType(filteredSeries, SCATTER),
                pane
            );

            this$1.createScatterLineChart(
                filterSeriesByType(filteredSeries, SCATTER_LINE),
                pane
            );

            this$1.createBubbleChart(
                filterSeriesByType(filteredSeries, BUBBLE),
                pane
            );
        }

        this.createAxes(panes);
    };

    XYPlotArea.prototype.appendChart = function appendChart (chart, pane) {
        this.xAxisRangeTracker.update(chart.xAxisRanges);
        this.yAxisRangeTracker.update(chart.yAxisRanges);

        PlotAreaBase$$1.prototype.appendChart.call(this, chart, pane);
    };

    XYPlotArea.prototype.removeAxis = function removeAxis (axis) {
        var axisName = axis.options.name;

        PlotAreaBase$$1.prototype.removeAxis.call(this, axis);

        if (axis.options.vertical) {
            this.yAxisRangeTracker.reset(axisName);
            delete this.namedYAxes[axisName];
        } else {
            this.xAxisRangeTracker.reset(axisName);
            delete this.namedXAxes[axisName];
        }

        if (axis === this.axisX) {
            delete this.axisX;
        }

        if (axis === this.axisY) {
            delete this.axisY;
        }
    };

    // TODO: Refactor, optionally use series.pane option
    XYPlotArea.prototype.seriesPaneName = function seriesPaneName (series) {
        var options = this.options;
        var xAxisName = series.xAxis;
        var xAxisOptions = [].concat(options.xAxis);
        var xAxis = grep(xAxisOptions, function(a) { return a.name === xAxisName; })[0];
        var yAxisName = series.yAxis;
        var yAxisOptions = [].concat(options.yAxis);
        var yAxis = grep(yAxisOptions, function(a) { return a.name === yAxisName; })[0];
        var panes = options.panes || [ {} ];
        var defaultPaneName = panes[0].name || "default";
        var paneName = (xAxis || {}).pane || (yAxis || {}).pane || defaultPaneName;

        return paneName;
    };

    XYPlotArea.prototype.createScatterChart = function createScatterChart (series, pane) {
        if (series.length > 0) {
            this.appendChart(
                new ScatterChart(this, { series: series, clip: pane.options.clip }),
                pane
            );
        }
    };

    XYPlotArea.prototype.createScatterLineChart = function createScatterLineChart (series, pane) {
        if (series.length > 0) {
            this.appendChart(
                new ScatterLineChart(this, { series: series, clip: pane.options.clip }),
                pane
            );
        }
    };

    XYPlotArea.prototype.createBubbleChart = function createBubbleChart (series, pane) {
        if (series.length > 0) {
            this.appendChart(
                new BubbleChart(this, { series: series, clip: pane.options.clip }),
                pane
            );
        }
    };

    XYPlotArea.prototype.createXYAxis = function createXYAxis (options, vertical, axisIndex) {
        var axisName = options.name;
        var namedAxes = vertical ? this.namedYAxes : this.namedXAxes;
        var tracker = vertical ? this.yAxisRangeTracker : this.xAxisRangeTracker;
        var axisOptions = deepExtend({}, options, { vertical: vertical });
        var isLog = equalsIgnoreCase(axisOptions.type, LOGARITHMIC);
        var defaultRange = tracker.query();
        var defaultAxisRange = isLog ? { min: 0.1, max: 1 } : { min: 0, max: 1 };
        var range = tracker.query(axisName) || defaultRange || defaultAxisRange;
        var typeSamples = [ axisOptions.min, axisOptions.max ];
        var series = this.series;

        for (var seriesIx = 0; seriesIx < series.length; seriesIx++) {
            var currentSeries = series[seriesIx];
            var seriesAxisName = currentSeries[vertical ? "yAxis" : "xAxis"];
            if ((seriesAxisName === axisOptions.name) || (axisIndex === 0 && !seriesAxisName)) {
                var firstPointValue = SeriesBinder.current.bindPoint(currentSeries, 0).valueFields;
                typeSamples.push(firstPointValue[vertical ? "y" : "x"]);

                break;
            }
        }

        if (axisIndex === 0 && defaultRange) {
            range.min = Math.min(range.min, defaultRange.min);
            range.max = Math.max(range.max, defaultRange.max);
        }

        var inferredDate;

        for (var i = 0; i < typeSamples.length; i++) {
            if (typeSamples[i] instanceof Date) {
                inferredDate = true;
                break;
            }
        }

        var axisType;
        if (equalsIgnoreCase(axisOptions.type, DATE) || (!axisOptions.type && inferredDate)) {
            axisType = DateValueAxis;
        } else if (isLog) {
            axisType = LogarithmicAxis;
        } else {
            axisType = NumericAxis;
        }

        var axis = new axisType(range.min, range.max, axisOptions, this.chartService);
        axis.axisIndex = axisIndex;

        if (axisName) {
            if (namedAxes[axisName]) {
                throw new Error(((vertical ? "Y" : "X") + " axis with name " + axisName + " is already defined"));
            }
            namedAxes[axisName] = axis;
        }

        this.appendAxis(axis);

        return axis;
    };

    XYPlotArea.prototype.createAxes = function createAxes (panes) {
        var this$1 = this;

        var options = this.options;
        var xAxesOptions = [].concat(options.xAxis);
        var xAxes = [];
        var yAxesOptions = [].concat(options.yAxis);
        var yAxes = [];

        for (var idx = 0; idx < xAxesOptions.length; idx++) {
            var axisPane = this$1.findPane(xAxesOptions[idx].pane);
            if (inArray(axisPane, panes)) {
                xAxes.push(this$1.createXYAxis(xAxesOptions[idx], false, idx));
            }
        }

        for (var idx$1 = 0; idx$1 < yAxesOptions.length; idx$1++) {
            var axisPane$1 = this$1.findPane(yAxesOptions[idx$1].pane);
            if (inArray(axisPane$1, panes)) {
                yAxes.push(this$1.createXYAxis(yAxesOptions[idx$1], true, idx$1));
            }
        }

        this.axisX = this.axisX || xAxes[0];
        this.axisY = this.axisY || yAxes[0];
    };

    XYPlotArea.prototype._dispatchEvent = function _dispatchEvent (chart, e, eventType) {
        var coords = chart._eventCoordinates(e);
        var point = new Point(coords.x, coords.y);
        var allAxes = this.axes;
        var length = allAxes.length;
        var xValues = [];
        var yValues = [];

        for (var i = 0; i < length; i++) {
            var axis = allAxes[i];
            var values = axis.options.vertical ? yValues : xValues;
            var currentValue = axis.getValue(point);
            if (currentValue !== null) {
                values.push(currentValue);
            }
        }

        if (xValues.length > 0 && yValues.length > 0) {
            chart.trigger(eventType, {
                element: eventElement(e),
                originalEvent: e,
                x: singleItemOrArray(xValues),
                y: singleItemOrArray(yValues)
            });
        }
    };

    XYPlotArea.prototype.updateAxisOptions = function updateAxisOptions (axis, options) {
        var vertical = axis.options.vertical;
        var axes = this.groupAxes(this.panes);
        var index = (vertical ? axes.y : axes.x).indexOf(axis);
        var axisOptions = ([].concat(vertical ? this.options.yAxis : this.options.xAxis))[index];
        deepExtend(axisOptions, options);
    };

    return XYPlotArea;
}(PlotAreaBase));

setDefaultOptions(XYPlotArea, {
    xAxis: {},
    yAxis: {}
});

deepExtend(XYPlotArea.prototype, PlotAreaEventsMixin);

var PieSegment = (function (ChartElement$$1) {
    function PieSegment(value, sector, options) {
        ChartElement$$1.call(this, options);

        this.value = value;
        this.sector = sector;
    }

    if ( ChartElement$$1 ) PieSegment.__proto__ = ChartElement$$1;
    PieSegment.prototype = Object.create( ChartElement$$1 && ChartElement$$1.prototype );
    PieSegment.prototype.constructor = PieSegment;

    PieSegment.prototype.render = function render () {
        var labels = this.options.labels;
        var chartService = this.owner.chartService;
        var labelText = this.value;

        if (this._rendered || this.visible === false) {
            return;
        }
        this._rendered = true;

        var labelTemplate = getTemplate(labels);
        if (labelTemplate) {
            labelText = labelTemplate({
                dataItem: this.dataItem,
                category: this.category,
                value: this.value,
                series: this.series,
                percentage: this.percentage
            });
        } else if (labels.format) {
            labelText = chartService.format.auto(labels.format, labelText);
        }

        if (labels.visible && labelText) {
            if (labels.position === CENTER || labels.position === INSIDE_END) {
                if (!labels.color) {
                    var brightnessValue = new _progress_kendoDrawing.Color(this.options.color).percBrightness();
                    if (brightnessValue > 180) {
                        labels.color = BLACK;
                    } else {
                        labels.color = WHITE;
                    }
                }
                if (!labels.background) {
                    labels.background = this.options.color;
                }
            } else {
                var themeLabels = chartService.theme.seriesDefaults.labels;
                labels.color = labels.color || themeLabels.color;
                labels.background = labels.background || themeLabels.background;
            }


            this.label = new TextBox(labelText, deepExtend({}, labels, {
                align: CENTER,
                vAlign: "",
                animation: {
                    type: FADEIN,
                    delay: this.animationDelay
                }
            }));

            this.append(this.label);
        }
    };

    PieSegment.prototype.reflow = function reflow (targetBox) {
        this.render();
        this.box = targetBox;
        this.reflowLabel();
    };

    PieSegment.prototype.reflowLabel = function reflowLabel () {
        var ref = this;
        var labelsOptions = ref.options.labels;
        var label = ref.label;
        var sector = this.sector.clone();
        var labelsDistance = labelsOptions.distance;
        var angle = sector.middle();

        if (label) {
            var labelHeight = label.box.height();
            var labelWidth = label.box.width();
            var lp;

            if (labelsOptions.position === CENTER) {
                sector.radius = Math.abs((sector.radius - labelHeight) / 2) + labelHeight;
                lp = sector.point(angle);
                label.reflow(new Box(lp.x, lp.y - labelHeight / 2, lp.x, lp.y));
            } else if (labelsOptions.position === INSIDE_END) {
                sector.radius = sector.radius - labelHeight / 2;
                lp = sector.point(angle);
                label.reflow(new Box(lp.x, lp.y - labelHeight / 2, lp.x, lp.y));
            } else {
                var x1;
                lp = sector.clone().expand(labelsDistance).point(angle);
                if (lp.x >= sector.center.x) {
                    x1 = lp.x + labelWidth;
                    label.orientation = RIGHT;
                } else {
                    x1 = lp.x - labelWidth;
                    label.orientation = LEFT;
                }
                label.reflow(new Box(x1, lp.y - labelHeight, lp.x, lp.y));
            }
        }
    };

    PieSegment.prototype.createVisual = function createVisual () {
        var this$1 = this;

        var ref = this;
        var sector = ref.sector;
        var options = ref.options;

        ChartElement$$1.prototype.createVisual.call(this);

        if (this.value) {
            if (options.visual) {
                var startAngle = (sector.startAngle + 180) % 360;
                var visual = options.visual({
                    category: this.category,
                    dataItem: this.dataItem,
                    value: this.value,
                    series: this.series,
                    percentage: this.percentage,
                    center: new _progress_kendoDrawing.geometry.Point(sector.center.x, sector.center.y),
                    radius: sector.radius,
                    innerRadius: sector.innerRadius,
                    startAngle: startAngle,
                    endAngle: startAngle + sector.angle,
                    options: options,
                    sender: this.getSender(),
                    createVisual: function () {
                        var group = new _progress_kendoDrawing.drawing.Group();
                        this$1.createSegmentVisual(group);

                        return group;
                    }
                });

                if (visual) {
                    this.visual.append(visual);
                }
            } else {
                this.createSegmentVisual(this.visual);
            }
        }
    };

    PieSegment.prototype.createSegmentVisual = function createSegmentVisual (group) {
        var ref = this;
        var sector = ref.sector;
        var options = ref.options;
        var borderOptions = options.border || {};
        var border = borderOptions.width > 0 ? {
            stroke: {
                color: borderOptions.color,
                width: borderOptions.width,
                opacity: borderOptions.opacity,
                dashType: borderOptions.dashType
            }
        } : {};
        var color = options.color;
        var fill = {
            color: color,
            opacity: options.opacity
        };
        var visual = this.createSegment(sector, deepExtend({
            fill: fill,
            stroke: {
                opacity: options.opacity
            },
            zIndex: options.zIndex
        }, border));

        group.append(visual);

        if (hasGradientOverlay(options)) {
            group.append(this.createGradientOverlay(visual, {
                baseColor: color,
                fallbackFill: fill
            }, deepExtend({
                center: [ sector.center.x, sector.center.y ],
                innerRadius: sector.innerRadius,
                radius: sector.radius,
                userSpace: true
            }, options.overlay)));
        }
    };

    PieSegment.prototype.createSegment = function createSegment (sector, options) {
        if (options.singleSegment) {
            return new _progress_kendoDrawing.drawing.Circle(new _progress_kendoDrawing.geometry.Circle(new _progress_kendoDrawing.geometry.Point(sector.center.x, sector.center.y), sector.radius), options);
        }

        return ShapeBuilder.current.createRing(sector, options);
    };

    PieSegment.prototype.createAnimation = function createAnimation () {
        var ref = this;
        var options = ref.options;
        var center = ref.sector.center;

        deepExtend(options, {
            animation: {
                center: [ center.x, center.y ],
                delay: this.animationDelay
            }
        });

        ChartElement$$1.prototype.createAnimation.call(this);
    };

    PieSegment.prototype.createHighlight = function createHighlight (options) {
        var highlight = this.options.highlight || {};
        var border = highlight.border || {};

        return this.createSegment(this.sector, deepExtend({}, options, {
            fill: {
                color: highlight.color,
                opacity: highlight.opacity
            },
            stroke: {
                opacity: border.opacity,
                width: border.width,
                color: border.color
            }
        }));
    };

    PieSegment.prototype.highlightVisual = function highlightVisual () {
        return this.visual.children[0];
    };

    PieSegment.prototype.highlightVisualArgs = function highlightVisualArgs () {
        var sector = this.sector;

        return {
            options: this.options,
            radius: sector.radius,
            innerRadius: sector.innerRadius,
            center: new _progress_kendoDrawing.geometry.Point(sector.center.x, sector.center.y),
            startAngle: sector.startAngle,
            endAngle: sector.angle + sector.startAngle,
            visual: this.visual
        };
    };

    PieSegment.prototype.tooltipAnchor = function tooltipAnchor () {
        var sector = this.sector.clone().expand(TOOLTIP_OFFSET);
        var midAndle = sector.middle();
        var midPoint = sector.point(midAndle);

        return {
            point: midPoint,
            align: tooltipAlignment(midAndle + 180)
        };
    };

    PieSegment.prototype.formatValue = function formatValue (format) {
        return this.owner.formatPointValue(this, format);
    };

    return PieSegment;
}(ChartElement));

var RAD_30 = round(rad(30), DEFAULT_PRECISION);
var RAD_60 = round(rad(60), DEFAULT_PRECISION);

function tooltipAlignment(angle) {
    var radians = rad(angle);
    var sine = round(Math.sin(radians), DEFAULT_PRECISION);
    var cosine = round(Math.cos(radians), DEFAULT_PRECISION);


    var horizontal;
    if (Math.abs(sine) > RAD_60) {
        horizontal = CENTER;
    } else if (cosine < 0) {
        horizontal = RIGHT;
    } else {
        horizontal = LEFT;
    }

    var vertical;
    if (Math.abs(sine) < RAD_30) {
        vertical = CENTER;
    } else if (sine < 0) {
        vertical = BOTTOM;
    } else {
        vertical = TOP;
    }

    return {
        horizontal: horizontal,
        vertical: vertical
    };
}

setDefaultOptions(PieSegment, {
    color: WHITE,
    overlay: {
        gradient: "roundedBevel"
    },
    border: {
        width: 0.5
    },
    labels: {
        visible: false,
        distance: 35,
        font: DEFAULT_FONT,
        margin: getSpacing(0.5),
        align: CIRCLE,
        zIndex: 1,
        position: OUTSIDE_END
    },
    animation: {
        type: PIE
    },
    highlight: {
        visible: true,
        border: {
            width: 1
        }
    },
    visible: true
});

deepExtend(PieSegment.prototype, PointEventsMixin);

var PieChartMixin = {
    createLegendItem: function(value, point, options) {
        var legendOptions = this.options.legend || {};
        var labelsOptions = legendOptions.labels || {};
        var inactiveItems = legendOptions.inactiveItems || {};
        var inactiveItemsLabels = inactiveItems.labels || {};

        if (options && options.visibleInLegend !== false) {
            var pointVisible = options.visible !== false;
            var labelTemplate = pointVisible ? getTemplate(labelsOptions) :
                getTemplate(inactiveItemsLabels) || getTemplate(labelsOptions);
            var text = options.category || "";

            if (labelTemplate) {
                text = labelTemplate({
                    text: text,
                    series: options.series,
                    dataItem: options.dataItem,
                    percentage: options.percentage,
                    value: value
                });
            }

            var itemLabelOptions, markerColor;
            if (pointVisible) {
                itemLabelOptions = {};
                markerColor = point.color;
            } else {
                itemLabelOptions = {
                    color: inactiveItemsLabels.color,
                    font: inactiveItemsLabels.font
                };
                markerColor = (inactiveItems.markers || {}).color;
            }

            if (text) {
                this.legendItems.push({
                    pointIndex: options.index,
                    text: text,
                    series: options.series,
                    markerColor: markerColor,
                    labels: itemLabelOptions
                });
            }
        }
    }
};

function segmentVisible(series, fields, index) {
    var visible = fields.visible;
    if (defined(visible)) {
        return visible;
    }

    var pointVisibility = series.pointVisibility;
    if (pointVisibility) {
        return pointVisibility[index];
    }
}

function seriesTotal(series) {
    var data = series.data;
    var sum = 0;

    for (var i = 0; i < data.length; i++) {
        var pointData = SeriesBinder.current.bindPoint(series, i);
        var value = pointData.valueFields.value;

        if (isString(value)) {
            value = parseFloat(value);
        }

        var visible = segmentVisible(series, pointData.fields, i);
        if (isNumber(value) && visible !== false) {
            sum += Math.abs(value);
        }
    }

    return sum;
}

var PIE_SECTOR_ANIM_DELAY = 70;

var PieChart = (function (ChartElement$$1) {
    function PieChart(plotArea, options) {
        ChartElement$$1.call(this, options);

        this.plotArea = plotArea;
        this.chartService = plotArea.chartService;
        this.points = [];
        this.legendItems = [];
        this.render();
    }

    if ( ChartElement$$1 ) PieChart.__proto__ = ChartElement$$1;
    PieChart.prototype = Object.create( ChartElement$$1 && ChartElement$$1.prototype );
    PieChart.prototype.constructor = PieChart;

    PieChart.prototype.render = function render () {
        this.traverseDataPoints(this.addValue.bind(this));
    };

    PieChart.prototype.traverseDataPoints = function traverseDataPoints (callback) {
        var this$1 = this;

        var ref = this;
        var options = ref.options;
        var seriesColors = ref.plotArea.options.seriesColors; if ( seriesColors === void 0 ) seriesColors = [];
        var colorsCount = seriesColors.length;
        var series = options.series;
        var seriesCount = series.length;

        for (var seriesIx = 0; seriesIx < seriesCount; seriesIx++) {
            var currentSeries = series[seriesIx];
            var data = currentSeries.data;
            var total = seriesTotal(currentSeries);
            var anglePerValue = 360 / total;
            var currentAngle = (void 0);

            if (defined(currentSeries.startAngle)) {
                currentAngle = currentSeries.startAngle;
            } else {
                currentAngle = options.startAngle;
            }

            if (seriesIx !== seriesCount - 1) {
                if (currentSeries.labels.position === OUTSIDE_END) {
                    currentSeries.labels.position = CENTER;
                }
            }

            for (var i = 0; i < data.length; i++) {
                var pointData = SeriesBinder.current.bindPoint(currentSeries, i);
                var value = pointData.valueFields.value;
                var plotValue = Math.abs(value);
                var fields = pointData.fields;
                var angle = plotValue * anglePerValue;
                var explode = data.length !== 1 && Boolean(fields.explode);

                if (!isFunction(currentSeries.color)) {
                    currentSeries.color = fields.color || seriesColors[i % colorsCount];
                }

                var visible = segmentVisible(currentSeries, fields, i);

                callback(value, new Ring(null, 0, 0, currentAngle, angle), {
                    owner: this$1,
                    category: fields.category || "",
                    index: i,
                    series: currentSeries,
                    seriesIx: seriesIx,
                    dataItem: data[i],
                    percentage: total !== 0 ? plotValue / total : 0,
                    explode: explode,
                    visibleInLegend: fields.visibleInLegend,
                    visible: visible,
                    zIndex: seriesCount - seriesIx,
                    animationDelay: this$1.animationDelay(i, seriesIx, seriesCount)
                });

                if (visible !== false) {
                    currentAngle += angle;
                }
            }
        }
    };

    PieChart.prototype.evalSegmentOptions = function evalSegmentOptions (options, value, fields) {
        var series = fields.series;

        evalOptions(options, {
            value: value,
            series: series,
            dataItem: fields.dataItem,
            category: fields.category,
            percentage: fields.percentage
        }, { defaults: series._defaults, excluded: [ "data", "content", "template", "visual", "toggle" ] });
    };

    PieChart.prototype.addValue = function addValue (value, sector, fields) {
        var segmentOptions = deepExtend({}, fields.series, { index: fields.index });
        this.evalSegmentOptions(segmentOptions, value, fields);

        this.createLegendItem(value, segmentOptions, fields);

        if (fields.visible === false) {
            return;
        }

        var segment = new PieSegment(value, sector, segmentOptions);
        Object.assign(segment, fields);
        this.append(segment);
        this.points.push(segment);
    };

    PieChart.prototype.reflow = function reflow (targetBox) {
        var ref = this;
        var options = ref.options;
        var points = ref.points;
        var seriesConfigs = ref.seriesConfigs; if ( seriesConfigs === void 0 ) seriesConfigs = [];
        var count = points.length;
        var box = targetBox.clone();
        var space = 5;
        var minWidth = Math.min(box.width(), box.height());
        var halfMinWidth = minWidth / 2;
        var defaultPadding = minWidth - minWidth * 0.85;
        var newBox = new Box(box.x1, box.y1, box.x1 + minWidth, box.y1 + minWidth);
        var newBoxCenter = newBox.center();
        var boxCenter = box.center();
        var seriesCount = options.series.length;
        var leftSideLabels = [];
        var rightSideLabels = [];
        var padding = valueOrDefault(options.padding, defaultPadding);

        padding = padding > halfMinWidth - space ? halfMinWidth - space : padding;
        newBox.translate(boxCenter.x - newBoxCenter.x, boxCenter.y - newBoxCenter.y);

        var radius = halfMinWidth - padding;
        var center = new Point(
            radius + newBox.x1 + padding,
            radius + newBox.y1 + padding
        );

        for (var i = 0; i < count; i++) {
            var segment = points[i];
            var sector = segment.sector;
            var seriesIndex = segment.seriesIx;
            sector.radius = radius;
            sector.center = center;

            if (seriesConfigs.length) {
                var seriesConfig = seriesConfigs[seriesIndex];
                sector.innerRadius = seriesConfig.innerRadius;
                sector.radius = seriesConfig.radius;
            }

            if (seriesIndex === seriesCount - 1 && segment.explode) {
                sector.center = sector.clone().setRadius(sector.radius * 0.15).point(sector.middle());
            }

            segment.reflow(newBox);

            var label = segment.label;
            if (label) {
                if (label.options.position === OUTSIDE_END) {
                    if (seriesIndex === seriesCount - 1) {
                        if (label.orientation === RIGHT) {
                            rightSideLabels.push(label);
                        } else {
                            leftSideLabels.push(label);
                        }
                    }
                }
            }
        }

        if (leftSideLabels.length > 0) {
            leftSideLabels.sort(this.labelComparator(true));
            this.leftLabelsReflow(leftSideLabels);
        }

        if (rightSideLabels.length > 0) {
            rightSideLabels.sort(this.labelComparator(false));
            this.rightLabelsReflow(rightSideLabels);
        }

        this.box = newBox;
    };

    PieChart.prototype.leftLabelsReflow = function leftLabelsReflow (labels) {
        var distances = this.distanceBetweenLabels(labels);

        this.distributeLabels(distances, labels);
    };

    PieChart.prototype.rightLabelsReflow = function rightLabelsReflow (labels) {
        var distances = this.distanceBetweenLabels(labels);

        this.distributeLabels(distances, labels);
    };

    PieChart.prototype.distanceBetweenLabels = function distanceBetweenLabels (labels) {
        var segment = last(this.points);
        var sector = segment.sector;
        var count = labels.length - 1;
        var lr = sector.radius + segment.options.labels.distance;
        var distances = [];
        var firstBox = labels[0].box;
        var distance = round(firstBox.y1 - (sector.center.y - lr - firstBox.height() - firstBox.height() / 2));

        distances.push(distance);

        for (var i = 0; i < count; i++) {
            var secondBox = labels[i + 1].box;

            firstBox = labels[i].box;
            distance = round(secondBox.y1 - firstBox.y2);
            distances.push(distance);
        }
        distance = round(sector.center.y + lr - labels[count].box.y2 - labels[count].box.height() / 2);
        distances.push(distance);

        return distances;
    };

    PieChart.prototype.distributeLabels = function distributeLabels (distances, labels) {
        var this$1 = this;

        var count = distances.length;
        var left, right, remaining;

        for (var i = 0; i < count; i++) {
            remaining = -distances[i];
            left = right = i;

            while (remaining > 0 && (left >= 0 || right < count)) {
                remaining = this$1._takeDistance(distances, i, --left, remaining);
                remaining = this$1._takeDistance(distances, i, ++right, remaining);
            }
        }

        this.reflowLabels(distances, labels);
    };

    PieChart.prototype._takeDistance = function _takeDistance (distances, anchor, position, amount) {
        var result = amount;
        if (distances[position] > 0) {
            var available = Math.min(distances[position], result);
            result -= available;
            distances[position] -= available;
            distances[anchor] += available;
        }

        return result;
    };

    PieChart.prototype.reflowLabels = function reflowLabels (distances, labels) {
        var this$1 = this;

        var segment = last(this.points);
        var sector = segment.sector;
        var labelOptions = segment.options.labels;
        var labelsCount = labels.length;
        var labelDistance = labelOptions.distance;
        var boxY = sector.center.y - (sector.radius + labelDistance) - labels[0].box.height();
        var boxX;

        distances[0] += 2;
        for (var i = 0; i < labelsCount; i++) {
            var label = labels[i];
            var box = label.box;

            boxY += distances[i];
            boxX = this$1.hAlignLabel(
                box.x2,
                sector.clone().expand(labelDistance),
                boxY,
                boxY + box.height(),
                label.orientation === RIGHT);

            if (label.orientation === RIGHT) {
                if (labelOptions.align !== CIRCLE) {
                    boxX = sector.radius + sector.center.x + labelDistance;
                }
                label.reflow(new Box(boxX + box.width(), boxY, boxX, boxY));
            } else {
                if (labelOptions.align !== CIRCLE) {
                    boxX = sector.center.x - sector.radius - labelDistance;
                }
                label.reflow(new Box(boxX - box.width(), boxY, boxX, boxY));
            }

            boxY += box.height();
        }
    };

    PieChart.prototype.createVisual = function createVisual () {
        var this$1 = this;

        var ref = this;
        var connectors = ref.options.connectors;
        var points = ref.points;
        var count = points.length;
        var space = 4;

        ChartElement$$1.prototype.createVisual.call(this);

        this._connectorLines = [];

        for (var i = 0; i < count; i++) {
            var segment = points[i];
            var sector = segment.sector;
            var label = segment.label;
            var angle = sector.middle();
            var connectorsColor = (segment.options.connectors || {}).color || connectors.color;

            if (label) {
                var connectorLine = new _progress_kendoDrawing.drawing.Path({
                    stroke: {
                        color: connectorsColor,
                        width: connectors.width
                    },
                    animation: {
                        type: FADEIN,
                        delay: segment.animationDelay
                    }
                });

                if (label.options.position === OUTSIDE_END && segment.value !== 0) {
                    var box = label.box;
                    var centerPoint = sector.center;
                    var start = sector.point(angle);
                    var middle = new Point(box.x1, box.center().y);
                    var sr = (void 0), end = (void 0), crossing = (void 0);

                    start = sector.clone().expand(connectors.padding).point(angle);
                    connectorLine.moveTo(start.x, start.y);
                    // TODO: Extract into a method to remove duplication
                    if (label.orientation === RIGHT) {
                        end = new Point(box.x1 - connectors.padding, box.center().y);
                        crossing = intersection(centerPoint, start, middle, end);
                        middle = new Point(end.x - space, end.y);
                        crossing = crossing || middle;
                        crossing.x = Math.min(crossing.x, middle.x);

                        if (this$1.pointInCircle(crossing, sector.center, sector.radius + space) ||
                            crossing.x < sector.center.x) {
                            sr = sector.center.x + sector.radius + space;
                            if (segment.options.labels.align !== COLUMN) {
                                if (sr < middle.x) {
                                    connectorLine.lineTo(sr, start.y);
                                } else {
                                    connectorLine.lineTo(start.x + space * 2, start.y);
                                }
                            } else {
                                connectorLine.lineTo(sr, start.y);
                            }
                            connectorLine.lineTo(middle.x, end.y);
                        } else {
                            crossing.y = end.y;
                            connectorLine.lineTo(crossing.x, crossing.y);
                        }
                    } else {
                        end = new Point(box.x2 + connectors.padding, box.center().y);
                        crossing = intersection(centerPoint, start, middle, end);
                        middle = new Point(end.x + space, end.y);
                        crossing = crossing || middle;
                        crossing.x = Math.max(crossing.x, middle.x);

                        if (this$1.pointInCircle(crossing, sector.center, sector.radius + space) ||
                            crossing.x > sector.center.x) {
                            sr = sector.center.x - sector.radius - space;
                            if (segment.options.labels.align !== COLUMN) {
                                if (sr > middle.x) {
                                    connectorLine.lineTo(sr, start.y);
                                } else {
                                    connectorLine.lineTo(start.x - space * 2, start.y);
                                }
                            } else {
                                connectorLine.lineTo(sr, start.y);
                            }
                            connectorLine.lineTo(middle.x, end.y);
                        } else {
                            crossing.y = end.y;
                            connectorLine.lineTo(crossing.x, crossing.y);
                        }
                    }

                    connectorLine.lineTo(end.x, end.y);

                    this$1._connectorLines.push(connectorLine);
                    this$1.visual.append(connectorLine);
                }
            }
        }
    };

    PieChart.prototype.labelComparator = function labelComparator (reverse) {
        var reverseValue = reverse ? -1 : 1;

        return function(a, b) {
            var first = (a.parent.sector.middle() + 270) % 360;
            var second = (b.parent.sector.middle() + 270) % 360;
            return (first - second) * reverseValue;
        };
    };

    PieChart.prototype.hAlignLabel = function hAlignLabel (originalX, sector, y1, y2, direction) {
        var radius = sector.radius;
        var sector_center = sector.center;
        var cx = sector_center.x;
        var cy = sector_center.y;
        var t = Math.min(Math.abs(cy - y1), Math.abs(cy - y2));

        if (t > radius) {
            return originalX;
        }

        return cx + Math.sqrt((radius * radius) - (t * t)) * (direction ? 1 : -1);
    };

    PieChart.prototype.pointInCircle = function pointInCircle (point, center, radius) {
        return Math.pow(center.x - point.x, 2) + Math.pow(center.y - point.y, 2) < Math.pow(radius, 2);
    };

    PieChart.prototype.formatPointValue = function formatPointValue (point, format) {
        return this.chartService.format.auto(format, point.value);
    };

    PieChart.prototype.animationDelay = function animationDelay (categoryIndex) {
        return categoryIndex * PIE_SECTOR_ANIM_DELAY;
    };

    return PieChart;
}(ChartElement));

function intersection(a1, a2, b1, b2) {
    var uat = (b2.x - b1.x) * (a1.y - b1.y) - (b2.y - b1.y) * (a1.x - b1.x);
    var ub = (b2.y - b1.y) * (a2.x - a1.x) - (b2.x - b1.x) * (a2.y - a1.y);

    var result;
    if (ub !== 0) {
        var ua = (uat / ub);

        result = new Point(
            a1.x + ua * (a2.x - a1.x),
            a1.y + ua * (a2.y - a1.y)
        );
    }

    return result;
}

setDefaultOptions(PieChart, {
    startAngle: 90,
    connectors: {
        width: 2,
        color: "#939393",
        padding: 8
    },
    inactiveItems: {
        markers: {},
        labels: {}
    }
});

deepExtend(PieChart.prototype, PieChartMixin);

var PiePlotArea = (function (PlotAreaBase$$1) {
    function PiePlotArea () {
        PlotAreaBase$$1.apply(this, arguments);
    }

    if ( PlotAreaBase$$1 ) PiePlotArea.__proto__ = PlotAreaBase$$1;
    PiePlotArea.prototype = Object.create( PlotAreaBase$$1 && PlotAreaBase$$1.prototype );
    PiePlotArea.prototype.constructor = PiePlotArea;

    PiePlotArea.prototype.render = function render () {
        this.createPieChart(this.series);
    };

    PiePlotArea.prototype.createPieChart = function createPieChart (series) {
        var firstSeries = series[0];
        var pieChart = new PieChart(this, {
            series: series,
            padding: firstSeries.padding,
            startAngle: firstSeries.startAngle,
            connectors: firstSeries.connectors,
            legend: this.options.legend
        });

        this.appendChart(pieChart);
    };

    PiePlotArea.prototype.appendChart = function appendChart (chart, pane) {
        PlotAreaBase$$1.prototype.appendChart.call(this, chart, pane);
        append$1(this.options.legend.items, chart.legendItems);
    };

    return PiePlotArea;
}(PlotAreaBase));

var DonutSegment = (function (PieSegment$$1) {
    function DonutSegment () {
        PieSegment$$1.apply(this, arguments);
    }

    if ( PieSegment$$1 ) DonutSegment.__proto__ = PieSegment$$1;
    DonutSegment.prototype = Object.create( PieSegment$$1 && PieSegment$$1.prototype );
    DonutSegment.prototype.constructor = DonutSegment;

    DonutSegment.prototype.reflowLabel = function reflowLabel () {
        var ref = this;
        var labelsOptions = ref.options.labels;
        var label = ref.label;
        var sector = this.sector.clone();
        var angle = sector.middle();

        if (label) {
            var labelHeight = label.box.height();
            if (labelsOptions.position === CENTER) {
                sector.radius -= (sector.radius - sector.innerRadius) / 2;

                var lp = sector.point(angle);

                label.reflow(new Box(lp.x, lp.y - labelHeight / 2, lp.x, lp.y));
            } else {
                PieSegment$$1.prototype.reflowLabel.call(this);
            }
        }
    };

    DonutSegment.prototype.createSegment = function createSegment (sector, options) {
        return ShapeBuilder.current.createRing(sector, options);
    };

    return DonutSegment;
}(PieSegment));

setDefaultOptions(DonutSegment, {
    overlay: {
        gradient: "roundedGlass"
    },
    labels: {
        position: CENTER
    },
    animation: {
        type: PIE
    }
});

deepExtend(DonutSegment.prototype, PointEventsMixin);

var DONUT_SECTOR_ANIM_DELAY = 50;

var DonutChart = (function (PieChart$$1) {
    function DonutChart () {
        PieChart$$1.apply(this, arguments);
    }

    if ( PieChart$$1 ) DonutChart.__proto__ = PieChart$$1;
    DonutChart.prototype = Object.create( PieChart$$1 && PieChart$$1.prototype );
    DonutChart.prototype.constructor = DonutChart;

    DonutChart.prototype.addValue = function addValue (value, sector, fields) {
        var segmentOptions = deepExtend({}, fields.series, { index: fields.index });
        this.evalSegmentOptions(segmentOptions, value, fields);

        this.createLegendItem(value, segmentOptions, fields);

        if (!value || fields.visible === false) {
            return;
        }

        var segment = new DonutSegment(value, sector, segmentOptions);

        Object.assign(segment, fields);
        this.append(segment);
        this.points.push(segment);
    };

    DonutChart.prototype.reflow = function reflow (targetBox) {
        var this$1 = this;

        var options = this.options;
        var box = targetBox.clone();
        var space = 5;
        var minWidth = Math.min(box.width(), box.height());
        var halfMinWidth = minWidth / 2;
        var defaultPadding = minWidth - minWidth * 0.85;
        var series = options.series;
        var seriesCount = series.length;

        var padding = valueOrDefault(options.padding, defaultPadding);
        padding = padding > halfMinWidth - space ? halfMinWidth - space : padding;

        var totalSize = halfMinWidth - padding;
        var seriesWithoutSize = 0;
        var holeSize;

        for (var i = 0; i < seriesCount; i++) {
            var currentSeries = series[i];
            if (i === 0) {
                if (defined(currentSeries.holeSize)) {
                    holeSize = currentSeries.holeSize;
                    totalSize -= currentSeries.holeSize;
                }
            }

            if (defined(currentSeries.size)) {
                totalSize -= currentSeries.size;
            } else {
                seriesWithoutSize++;
            }

            if (defined(currentSeries.margin) && i !== seriesCount - 1) {
                totalSize -= currentSeries.margin;
            }
        }

        if (!defined(holeSize)) {
            var currentSize = (halfMinWidth - padding) / (seriesCount + 0.75);
            holeSize = currentSize * 0.75;
            totalSize -= holeSize;
        }

        var innerRadius = holeSize;
        var margin = 0;
        var size, radius;

        this.seriesConfigs = [];

        for (var i$1 = 0; i$1 < seriesCount; i$1++) {
            var currentSeries$1 = series[i$1];
            size = valueOrDefault(currentSeries$1.size, totalSize / seriesWithoutSize);
            innerRadius += margin;
            radius = innerRadius + size;
            this$1.seriesConfigs.push({ innerRadius: innerRadius, radius: radius });
            margin = currentSeries$1.margin || 0;
            innerRadius = radius;
        }

        PieChart$$1.prototype.reflow.call(this, targetBox);
    };

    DonutChart.prototype.animationDelay = function animationDelay (categoryIndex, seriesIndex, seriesCount) {
        return categoryIndex * DONUT_SECTOR_ANIM_DELAY +
            (INITIAL_ANIMATION_DURATION * (seriesIndex + 1) / (seriesCount + 1));
    };

    return DonutChart;
}(PieChart));


setDefaultOptions(DonutChart, {
    startAngle: 90,
    connectors: {
        width: 2,
        color: "#939393",
        padding: 8
    }
});

var DonutPlotArea = (function (PiePlotArea$$1) {
    function DonutPlotArea () {
        PiePlotArea$$1.apply(this, arguments);
    }

    if ( PiePlotArea$$1 ) DonutPlotArea.__proto__ = PiePlotArea$$1;
    DonutPlotArea.prototype = Object.create( PiePlotArea$$1 && PiePlotArea$$1.prototype );
    DonutPlotArea.prototype.constructor = DonutPlotArea;

    DonutPlotArea.prototype.render = function render () {
        this.createDonutChart(this.series);
    };

    DonutPlotArea.prototype.createDonutChart = function createDonutChart (series) {
        var firstSeries = series[0];
        var donutChart = new DonutChart(this, {
            series: series,
            padding: firstSeries.padding,
            connectors: firstSeries.connectors,
            legend: this.options.legend
        });

        this.appendChart(donutChart);
    };

    return DonutPlotArea;
}(PiePlotArea));

var DEFAULT_PADDING = 0.15;

var PolarPlotAreaBase = (function (PlotAreaBase$$1) {
    function PolarPlotAreaBase () {
        PlotAreaBase$$1.apply(this, arguments);
    }

    if ( PlotAreaBase$$1 ) PolarPlotAreaBase.__proto__ = PlotAreaBase$$1;
    PolarPlotAreaBase.prototype = Object.create( PlotAreaBase$$1 && PlotAreaBase$$1.prototype );
    PolarPlotAreaBase.prototype.constructor = PolarPlotAreaBase;

    PolarPlotAreaBase.prototype.initFields = function initFields () {
        this.valueAxisRangeTracker = new AxisGroupRangeTracker();
    };

    PolarPlotAreaBase.prototype.render = function render () {
        this.addToLegend(this.series);
        this.createPolarAxis();
        this.createCharts();
        this.createValueAxis();
    };

    PolarPlotAreaBase.prototype.alignAxes = function alignAxes () {
        var axis = this.valueAxis;
        var range = axis.range();
        var crossingValue = axis.options.reverse ? range.max : range.min;
        var slot = axis.getSlot(crossingValue);
        var center = this.polarAxis.getSlot(0).center;
        var axisBox = axis.box.translate(
            center.x - slot.x1,
            center.y - slot.y1
        );

        axis.reflow(axisBox);
    };

    PolarPlotAreaBase.prototype.createValueAxis = function createValueAxis () {
        var tracker = this.valueAxisRangeTracker;
        var defaultRange = tracker.query();
        var axisOptions = this.valueAxisOptions({
            roundToMajorUnit: false,
            zIndex: -1
        });
        var axisType, axisDefaultRange;

        if (axisOptions.type === LOGARITHMIC) {
            axisType = RadarLogarithmicAxis;
            axisDefaultRange = { min: 0.1, max: 1 };
        } else {
            axisType = RadarNumericAxis;
            axisDefaultRange = { min: 0, max: 1 };
        }

        var range = tracker.query(name) || defaultRange || axisDefaultRange;

        if (range && defaultRange) {
            range.min = Math.min(range.min, defaultRange.min);
            range.max = Math.max(range.max, defaultRange.max);
        }

        var valueAxis = new axisType(
            range.min, range.max,
            axisOptions,
            this.chartService
        );

        this.valueAxis = valueAxis;
        this.appendAxis(valueAxis);
    };

    PolarPlotAreaBase.prototype.reflowAxes = function reflowAxes () {
        var ref = this;
        var options = ref.options.plotArea;
        var valueAxis = ref.valueAxis;
        var polarAxis = ref.polarAxis;
        var box = ref.box;
        var defaultPadding = Math.min(box.width(), box.height()) * DEFAULT_PADDING;
        var padding = getSpacing(options.padding || {}, defaultPadding);
        var axisBox = box.clone().unpad(padding);
        var valueAxisBox = axisBox.clone().shrink(0, axisBox.height() / 2);

        polarAxis.reflow(axisBox);
        valueAxis.reflow(valueAxisBox);
        var heightDiff = valueAxis.lineBox().height() - valueAxis.box.height();
        valueAxis.reflow(valueAxis.box.unpad({ top: heightDiff }));

        this.axisBox = axisBox;
        this.alignAxes(axisBox);
    };

    PolarPlotAreaBase.prototype.backgroundBox = function backgroundBox () {
        return this.box;
    };

    return PolarPlotAreaBase;
}(PlotAreaBase));

var PolarScatterChart = (function (ScatterChart$$1) {
    function PolarScatterChart () {
        ScatterChart$$1.apply(this, arguments);
    }

    if ( ScatterChart$$1 ) PolarScatterChart.__proto__ = ScatterChart$$1;
    PolarScatterChart.prototype = Object.create( ScatterChart$$1 && ScatterChart$$1.prototype );
    PolarScatterChart.prototype.constructor = PolarScatterChart;

    PolarScatterChart.prototype.pointSlot = function pointSlot (slotX, slotY) {
        var valueRadius = slotX.center.y - slotY.y1;
        var slot = Point.onCircle(slotX.center, slotX.startAngle, valueRadius);

        return new Box(slot.x, slot.y, slot.x, slot.y);
    };

    return PolarScatterChart;
}(ScatterChart));

setDefaultOptions(PolarScatterChart, {
    clip: false
});

var PolarLineChart = (function (ScatterLineChart$$1) {
    function PolarLineChart () {
        ScatterLineChart$$1.apply(this, arguments);
    }if ( ScatterLineChart$$1 ) PolarLineChart.__proto__ = ScatterLineChart$$1;
    PolarLineChart.prototype = Object.create( ScatterLineChart$$1 && ScatterLineChart$$1.prototype );
    PolarLineChart.prototype.constructor = PolarLineChart;

    

    return PolarLineChart;
}(ScatterLineChart));

PolarLineChart.prototype.pointSlot = PolarScatterChart.prototype.pointSlot;

setDefaultOptions(PolarLineChart, {
    clip: false
});

var SplinePolarAreaSegment = (function (SplineAreaSegment$$1) {
    function SplinePolarAreaSegment () {
        SplineAreaSegment$$1.apply(this, arguments);
    }

    if ( SplineAreaSegment$$1 ) SplinePolarAreaSegment.__proto__ = SplineAreaSegment$$1;
    SplinePolarAreaSegment.prototype = Object.create( SplineAreaSegment$$1 && SplineAreaSegment$$1.prototype );
    SplinePolarAreaSegment.prototype.constructor = SplinePolarAreaSegment;

    SplinePolarAreaSegment.prototype.closeFill = function closeFill (fillPath) {
        var center = this._polarAxisCenter();
        fillPath.lineTo(center.x, center.y);
    };

    SplinePolarAreaSegment.prototype._polarAxisCenter = function _polarAxisCenter () {
        var polarAxis = this.parent.plotArea.polarAxis;
        var center = polarAxis.box.center();
        return center;
    };

    SplinePolarAreaSegment.prototype.strokeSegments = function strokeSegments () {
        var segments = this._strokeSegments;

        if (!segments) {
            var center = this._polarAxisCenter();
            var curveProcessor = new CurveProcessor(false);
            var linePoints = LineSegment.prototype.points.call(this);

            linePoints.push(center);
            segments = this._strokeSegments = curveProcessor.process(linePoints);
            segments.pop();
        }

        return segments;
    };

    return SplinePolarAreaSegment;
}(SplineAreaSegment));

var PolarAreaSegment = (function (AreaSegment$$1) {
    function PolarAreaSegment () {
        AreaSegment$$1.apply(this, arguments);
    }

    if ( AreaSegment$$1 ) PolarAreaSegment.__proto__ = AreaSegment$$1;
    PolarAreaSegment.prototype = Object.create( AreaSegment$$1 && AreaSegment$$1.prototype );
    PolarAreaSegment.prototype.constructor = PolarAreaSegment;

    PolarAreaSegment.prototype.points = function points () {
        var ref = this;
        var polarAxis = ref.parent.plotArea.polarAxis;
        var stackPoints = ref.stackPoints;
        var center = polarAxis.box.center();
        var points = LineSegment.prototype.points.call(this, stackPoints);

        points.unshift([ center.x, center.y ]);
        points.push([ center.x, center.y ]);

        return points;
    };

    return PolarAreaSegment;
}(AreaSegment));

var PolarAreaChart = (function (PolarLineChart$$1) {
    function PolarAreaChart () {
        PolarLineChart$$1.apply(this, arguments);
    }

    if ( PolarLineChart$$1 ) PolarAreaChart.__proto__ = PolarLineChart$$1;
    PolarAreaChart.prototype = Object.create( PolarLineChart$$1 && PolarLineChart$$1.prototype );
    PolarAreaChart.prototype.constructor = PolarAreaChart;

    PolarAreaChart.prototype.createSegment = function createSegment (linePoints, currentSeries, seriesIx) {
        var style = (currentSeries.line || {}).style;
        var segment;

        if (style === SMOOTH) {
            segment = new SplinePolarAreaSegment(linePoints, null, false, currentSeries, seriesIx);
        } else {
            segment = new PolarAreaSegment(linePoints, [], currentSeries, seriesIx);
        }
        return segment;
    };

    PolarAreaChart.prototype.createMissingValue = function createMissingValue (value, missingValues) {
        var missingValue;

        if (hasValue(value.x) && missingValues !== INTERPOLATE) {
            missingValue = {
                x: value.x,
                y: value.y
            };
            if (missingValues === ZERO) {
                missingValue.y = 0;
            }
        }

        return missingValue;
    };

    PolarAreaChart.prototype.seriesMissingValues = function seriesMissingValues (series) {
        return series.missingValues || ZERO;
    };

    PolarAreaChart.prototype._hasMissingValuesGap = function _hasMissingValuesGap () {
        var this$1 = this;

        var series = this.options.series;

        for (var idx = 0; idx < series.length; idx++) {
            if (this$1.seriesMissingValues(series[idx]) === GAP) {
                return true;
            }
        }
    };

    PolarAreaChart.prototype.sortPoints = function sortPoints (points) {
        var this$1 = this;

        points.sort(xComparer);

        if (this._hasMissingValuesGap()) {
            for (var idx = 0; idx < points.length; idx++) {
                var point = points[idx];
                if (point) {
                    var value = point.value;
                    if (!hasValue(value.y) && this$1.seriesMissingValues(point.series) === GAP) {
                        delete points[idx];
                    }
                }
            }
        }

        return points;
    };

    return PolarAreaChart;
}(PolarLineChart));

function xComparer(a, b) {
    return a.value.x - b.value.x;
}

var PolarPlotArea = (function (PolarPlotAreaBase$$1) {
    function PolarPlotArea () {
        PolarPlotAreaBase$$1.apply(this, arguments);
    }

    if ( PolarPlotAreaBase$$1 ) PolarPlotArea.__proto__ = PolarPlotAreaBase$$1;
    PolarPlotArea.prototype = Object.create( PolarPlotAreaBase$$1 && PolarPlotAreaBase$$1.prototype );
    PolarPlotArea.prototype.constructor = PolarPlotArea;

    PolarPlotArea.prototype.createPolarAxis = function createPolarAxis () {
        var polarAxis = new PolarAxis(this.options.xAxis, this.chartService);

        this.polarAxis = polarAxis;
        this.axisX = polarAxis;
        this.appendAxis(polarAxis);
    };

    PolarPlotArea.prototype.valueAxisOptions = function valueAxisOptions (defaults) {
        return deepExtend(defaults, {
            majorGridLines: { type: ARC },
            minorGridLines: { type: ARC }
        }, this.options.yAxis);
    };

    PolarPlotArea.prototype.createValueAxis = function createValueAxis () {
        PolarPlotAreaBase$$1.prototype.createValueAxis.call(this);
        this.axisY = this.valueAxis;
    };

    PolarPlotArea.prototype.appendChart = function appendChart (chart, pane) {
        this.valueAxisRangeTracker.update(chart.yAxisRanges);

        PlotAreaBase.prototype.appendChart.call(this, chart, pane);
    };

    PolarPlotArea.prototype.createCharts = function createCharts () {
        var series = this.filterVisibleSeries(this.series);
        var pane = this.panes[0];

        this.createLineChart(
            filterSeriesByType(series, [ POLAR_LINE ]),
            pane
        );

        this.createScatterChart(
            filterSeriesByType(series, [ POLAR_SCATTER ]),
            pane
        );

        this.createAreaChart(
            filterSeriesByType(series, [ POLAR_AREA ]),
            pane
        );
    };

    PolarPlotArea.prototype.createLineChart = function createLineChart (series, pane) {
        if (series.length === 0) {
            return;
        }

        var lineChart = new PolarLineChart(this, { series: series });

        this.appendChart(lineChart, pane);
    };

    PolarPlotArea.prototype.createScatterChart = function createScatterChart (series, pane) {
        if (series.length === 0) {
            return;
        }

        var scatterChart = new PolarScatterChart(this, { series: series });

        this.appendChart(scatterChart, pane);
    };

    PolarPlotArea.prototype.createAreaChart = function createAreaChart (series, pane) {
        if (series.length === 0) {
            return;
        }

        var areaChart = new PolarAreaChart(this, { series: series });

        this.appendChart(areaChart, pane);
    };

    PolarPlotArea.prototype._dispatchEvent = function _dispatchEvent (chart, e, eventType) {
        var coords = chart._eventCoordinates(e);
        var point = new Point(coords.x, coords.y);
        var xValue = this.axisX.getValue(point);
        var yValue = this.axisY.getValue(point);

        if (xValue !== null && yValue !== null) {
            chart.trigger(eventType, {
                element: eventElement(e),
                x: xValue,
                y: yValue
            });
        }
    };

    PolarPlotArea.prototype.createCrosshairs = function createCrosshairs () {};

    return PolarPlotArea;
}(PolarPlotAreaBase));

setDefaultOptions(PolarPlotArea, {
    xAxis: {},
    yAxis: {}
});

deepExtend(PolarPlotArea.prototype, PlotAreaEventsMixin);

var RadarLineChart = (function (LineChart$$1) {
    function RadarLineChart () {
        LineChart$$1.apply(this, arguments);
    }

    if ( LineChart$$1 ) RadarLineChart.__proto__ = LineChart$$1;
    RadarLineChart.prototype = Object.create( LineChart$$1 && LineChart$$1.prototype );
    RadarLineChart.prototype.constructor = RadarLineChart;

    RadarLineChart.prototype.pointSlot = function pointSlot (categorySlot, valueSlot) {
        var valueRadius = categorySlot.center.y - valueSlot.y1;
        var slot = Point.onCircle(categorySlot.center, categorySlot.middle(), valueRadius);

        return new Box(slot.x, slot.y, slot.x, slot.y);
    };

    RadarLineChart.prototype.createSegment = function createSegment (linePoints, currentSeries, seriesIx) {
        var style = currentSeries.style;
        var pointType;

        if (style === SMOOTH) {
            pointType = SplineSegment;
        } else {
            pointType = LineSegment;
        }

        var segment = new pointType(linePoints, currentSeries, seriesIx);

        if (linePoints.length === currentSeries.data.length) {
            segment.options.closed = true;
        }

        return segment;
    };

    return RadarLineChart;
}(LineChart));

setDefaultOptions(RadarLineChart, {
    clip: false
});

var SplineRadarAreaSegment = (function (SplineAreaSegment$$1) {
    function SplineRadarAreaSegment () {
        SplineAreaSegment$$1.apply(this, arguments);
    }

    if ( SplineAreaSegment$$1 ) SplineRadarAreaSegment.__proto__ = SplineAreaSegment$$1;
    SplineRadarAreaSegment.prototype = Object.create( SplineAreaSegment$$1 && SplineAreaSegment$$1.prototype );
    SplineRadarAreaSegment.prototype.constructor = SplineRadarAreaSegment;

    SplineRadarAreaSegment.prototype.closeFill = function closeFill () {};

    return SplineRadarAreaSegment;
}(SplineAreaSegment));

var RadarAreaSegment = (function (AreaSegment$$1) {
    function RadarAreaSegment () {
        AreaSegment$$1.apply(this, arguments);
    }

    if ( AreaSegment$$1 ) RadarAreaSegment.__proto__ = AreaSegment$$1;
    RadarAreaSegment.prototype = Object.create( AreaSegment$$1 && AreaSegment$$1.prototype );
    RadarAreaSegment.prototype.constructor = RadarAreaSegment;

    RadarAreaSegment.prototype.points = function points () {
        return LineSegment.prototype.points.call(this, this.stackPoints);
    };

    return RadarAreaSegment;
}(AreaSegment));

var RadarAreaChart = (function (RadarLineChart$$1) {
    function RadarAreaChart () {
        RadarLineChart$$1.apply(this, arguments);
    }

    if ( RadarLineChart$$1 ) RadarAreaChart.__proto__ = RadarLineChart$$1;
    RadarAreaChart.prototype = Object.create( RadarLineChart$$1 && RadarLineChart$$1.prototype );
    RadarAreaChart.prototype.constructor = RadarAreaChart;

    RadarAreaChart.prototype.createSegment = function createSegment (linePoints, currentSeries, seriesIx, prevSegment) {
        var isStacked = this.options.isStacked;
        var style = (currentSeries.line || {}).style;
        var segment;

        if (style === SMOOTH) {
            segment = new SplineRadarAreaSegment(linePoints, prevSegment, isStacked, currentSeries, seriesIx);
            segment.options.closed = true;
        } else {
            var stackPoints;
            if (isStacked && seriesIx > 0 && prevSegment) {
                stackPoints = prevSegment.linePoints.slice(0).reverse();
            }

            linePoints.push(linePoints[0]);
            segment = new RadarAreaSegment(linePoints, stackPoints, currentSeries, seriesIx);
        }

        return segment;
    };

    RadarAreaChart.prototype.seriesMissingValues = function seriesMissingValues (series) {
        return series.missingValues || ZERO;
    };

    return RadarAreaChart;
}(RadarLineChart));

var RadarSegment = (function (DonutSegment$$1) {
    function RadarSegment(value, options) {
        DonutSegment$$1.call(this, value, null, options);
    }

    if ( DonutSegment$$1 ) RadarSegment.__proto__ = DonutSegment$$1;
    RadarSegment.prototype = Object.create( DonutSegment$$1 && DonutSegment$$1.prototype );
    RadarSegment.prototype.constructor = RadarSegment;

    return RadarSegment;
}(DonutSegment));

setDefaultOptions(RadarSegment, {
    overlay: {
        gradient: "none"
    },
    labels: {
        distance: 10
    }
});

var RadarClusterLayout = (function (ChartElement$$1) {
    function RadarClusterLayout () {
        ChartElement$$1.apply(this, arguments);
    }

    if ( ChartElement$$1 ) RadarClusterLayout.__proto__ = ChartElement$$1;
    RadarClusterLayout.prototype = Object.create( ChartElement$$1 && ChartElement$$1.prototype );
    RadarClusterLayout.prototype.constructor = RadarClusterLayout;

    RadarClusterLayout.prototype.reflow = function reflow (sector) {
        var ref = this;
        var options = ref.options;
        var children = ref.children;
        var gap = options.gap;
        var spacing = options.spacing;
        var count = children.length;
        var slots = count + gap + (spacing * (count - 1));
        var slotAngle = sector.angle / slots;
        var angle = sector.startAngle + slotAngle * (gap / 2);

        for (var i = 0; i < count; i++) {
            var slotSector = sector.clone();
            slotSector.startAngle = angle;
            slotSector.angle = slotAngle;

            if (children[i].sector) {
                slotSector.radius = children[i].sector.radius;
            }

            children[i].reflow(slotSector);
            children[i].sector = slotSector;

            angle += slotAngle + (slotAngle * spacing);
        }
    };

    return RadarClusterLayout;
}(ChartElement));

setDefaultOptions(RadarClusterLayout, {
    gap: 1,
    spacing: 0
});

var RadarStackLayout = (function (ChartElement$$1) {
    function RadarStackLayout () {
        ChartElement$$1.apply(this, arguments);
    }

    if ( ChartElement$$1 ) RadarStackLayout.__proto__ = ChartElement$$1;
    RadarStackLayout.prototype = Object.create( ChartElement$$1 && ChartElement$$1.prototype );
    RadarStackLayout.prototype.constructor = RadarStackLayout;

    RadarStackLayout.prototype.reflow = function reflow (sector) {
        var ref = this;
        var reverse = ref.options.reverse;
        var children = ref.children;
        var childrenCount = children.length;
        var first = reverse ? childrenCount - 1 : 0;
        var step = reverse ? -1 : 1;

        this.box = new Box();

        for (var i = first; i >= 0 && i < childrenCount; i += step) {
            var childSector = children[i].sector;
            childSector.startAngle = sector.startAngle;
            childSector.angle = sector.angle;
        }
    };

    return RadarStackLayout;
}(ChartElement));

var RadarBarChart = (function (BarChart$$1) {
    function RadarBarChart () {
        BarChart$$1.apply(this, arguments);
    }

    if ( BarChart$$1 ) RadarBarChart.__proto__ = BarChart$$1;
    RadarBarChart.prototype = Object.create( BarChart$$1 && BarChart$$1.prototype );
    RadarBarChart.prototype.constructor = RadarBarChart;

    RadarBarChart.prototype.pointType = function pointType () {
        return RadarSegment;
    };

    RadarBarChart.prototype.clusterType = function clusterType () {
        return RadarClusterLayout;
    };

    RadarBarChart.prototype.stackType = function stackType () {
        return RadarStackLayout;
    };

    RadarBarChart.prototype.categorySlot = function categorySlot (categoryAxis, categoryIx) {
        return categoryAxis.getSlot(categoryIx);
    };

    RadarBarChart.prototype.pointSlot = function pointSlot (categorySlot, valueSlot) {
        var slot = categorySlot.clone();
        var y = categorySlot.center.y;

        slot.radius = y - valueSlot.y1;
        slot.innerRadius = y - valueSlot.y2;

        return slot;
    };

    RadarBarChart.prototype.reflowPoint = function reflowPoint (point, pointSlot) {
        point.sector = pointSlot;
        point.reflow();
    };

    RadarBarChart.prototype.createAnimation = function createAnimation () {
        this.options.animation.center = this.box.toRect().center();
        BarChart$$1.prototype.createAnimation.call(this);
    };

    return RadarBarChart;
}(BarChart));

RadarBarChart.prototype.reflow = CategoricalChart.prototype.reflow;

setDefaultOptions(RadarBarChart, {
    clip: false,
    animation: {
        type: "pie"
    }
});

var RadarPlotArea = (function (PolarPlotAreaBase$$1) {
    function RadarPlotArea () {
        PolarPlotAreaBase$$1.apply(this, arguments);
    }

    if ( PolarPlotAreaBase$$1 ) RadarPlotArea.__proto__ = PolarPlotAreaBase$$1;
    RadarPlotArea.prototype = Object.create( PolarPlotAreaBase$$1 && PolarPlotAreaBase$$1.prototype );
    RadarPlotArea.prototype.constructor = RadarPlotArea;

    RadarPlotArea.prototype.createPolarAxis = function createPolarAxis () {
        var categoryAxis = new RadarCategoryAxis(this.options.categoryAxis, this.chartService);

        this.polarAxis = categoryAxis;
        this.categoryAxis = categoryAxis;
        this.appendAxis(categoryAxis);
        this.aggregateCategories();
        this.createCategoryAxesLabels();
    };

    RadarPlotArea.prototype.valueAxisOptions = function valueAxisOptions (defaults) {
        if (this._hasBarCharts) {
            deepExtend(defaults, {
                majorGridLines: { type: ARC },
                minorGridLines: { type: ARC }
            });
        }

        if (this._isStacked100) {
            deepExtend(defaults, {
                roundToMajorUnit: false,
                labels: { format: "P0" }
            });
        }

        return deepExtend(defaults, this.options.valueAxis);
    };

    RadarPlotArea.prototype.aggregateCategories = function aggregateCategories () {
        // No separate panes in radar charts
        CategoricalPlotArea.prototype.aggregateCategories.call(this, this.panes);
    };

    RadarPlotArea.prototype.createCategoryAxesLabels = function createCategoryAxesLabels () {
        CategoricalPlotArea.prototype.createCategoryAxesLabels.call(this, this.panes);
    };

    RadarPlotArea.prototype.filterSeries = function filterSeries (currentSeries) {
        // Not supported for radar charts
        return currentSeries;
    };

    RadarPlotArea.prototype.createCharts = function createCharts () {
        var series = this.filterVisibleSeries(this.series);
        var pane = this.panes[0];

        this.createAreaChart(
            filterSeriesByType(series, [ RADAR_AREA ]),
            pane
        );

        this.createLineChart(
            filterSeriesByType(series, [ RADAR_LINE ]),
            pane
        );

        this.createBarChart(
            filterSeriesByType(series, [ RADAR_COLUMN ]),
            pane
        );
    };

    RadarPlotArea.prototype.chartOptions = function chartOptions (series) {
        var options = { series: series };
        var firstSeries = series[0];
        if (firstSeries) {
            var filteredSeries = this.filterVisibleSeries(series);
            var stack = firstSeries.stack;
            options.isStacked = stack && filteredSeries.length > 1;
            options.isStacked100 = stack && stack.type === "100%" && filteredSeries.length > 1;

            if (options.isStacked100) {
                this._isStacked100 = true;
            }
        }

        return options;
    };

    RadarPlotArea.prototype.createAreaChart = function createAreaChart (series, pane) {
        if (series.length === 0) {
            return;
        }

        var areaChart = new RadarAreaChart(this, this.chartOptions(series));
        this.appendChart(areaChart, pane);
    };

    RadarPlotArea.prototype.createLineChart = function createLineChart (series, pane) {
        if (series.length === 0) {
            return;
        }

        var lineChart = new RadarLineChart(this, this.chartOptions(series));
        this.appendChart(lineChart, pane);
    };

    RadarPlotArea.prototype.createBarChart = function createBarChart (series, pane) {
        if (series.length === 0) {
            return;
        }

        var firstSeries = series[0];
        var options = this.chartOptions(series);
        options.gap = firstSeries.gap;
        options.spacing = firstSeries.spacing;

        var barChart = new RadarBarChart(this, options);
        this.appendChart(barChart, pane);

        this._hasBarCharts = true;
    };

    RadarPlotArea.prototype.seriesCategoryAxis = function seriesCategoryAxis () {
        return this.categoryAxis;
    };

    RadarPlotArea.prototype._dispatchEvent = function _dispatchEvent (chart, e, eventType) {
        var coords = chart._eventCoordinates(e);
        var point = new Point(coords.x, coords.y);
        var category = this.categoryAxis.getCategory(point);
        var value = this.valueAxis.getValue(point);

        if (category !== null && value !== null) {
            chart.trigger(eventType, {
                element: eventElement(e),
                category: category,
                value: value
            });
        }
    };

    RadarPlotArea.prototype.createCrosshairs = function createCrosshairs () {};

    return RadarPlotArea;
}(PolarPlotAreaBase));

deepExtend(RadarPlotArea.prototype, PlotAreaEventsMixin, {
    appendChart: CategoricalPlotArea.prototype.appendChart,
    aggregateSeries: CategoricalPlotArea.prototype.aggregateSeries
});

setDefaultOptions(RadarPlotArea, {
    categoryAxis: {
        categories: []
    },
    valueAxis: {}
});

var FunnelSegment = (function (ChartElement$$1) {
    function FunnelSegment(value, options, segmentOptions) {
        ChartElement$$1.call(this, options);

        this.value = value;
        this.options.index = segmentOptions.index;
    }

    if ( ChartElement$$1 ) FunnelSegment.__proto__ = ChartElement$$1;
    FunnelSegment.prototype = Object.create( ChartElement$$1 && ChartElement$$1.prototype );
    FunnelSegment.prototype.constructor = FunnelSegment;

    FunnelSegment.prototype.reflow = function reflow (chartBox) {
        var points = this.points;
        var label = this.children[0];

        this.box = new Box(points[0].x, points[0].y, points[1].x, points[2].y);

        if (label) {
            label.reflow(new Box(chartBox.x1, points[0].y, chartBox.x2, points[2].y));
        }
    };

    FunnelSegment.prototype.createVisual = function createVisual () {
        var this$1 = this;

        var options = this.options;
        var visual;

        ChartElement$$1.prototype.createVisual.call(this);

        if (options.visual) {
            visual = options.visual({
                category: this.category,
                dataItem: this.dataItem,
                value: this.value,
                series: this.series,
                percentage: this.percentage,
                points: this.points,
                options: options,
                sender: this.getSender(),
                createVisual: function () { return this$1.createPath(); }
            });
        } else {
            visual = this.createPath();
        }

        if (visual) {
            this.visual.append(visual);
        }
    };

    FunnelSegment.prototype.createPath = function createPath () {
        var options = this.options;
        var border = options.border;
        var path = _progress_kendoDrawing.drawing.Path.fromPoints(this.points, {
            fill: {
                color: options.color,
                opacity: options.opacity
            },
            stroke: {
                color: border.color,
                opacity: border.opacity,
                width: border.width
            }
        }).close();

        return path;
    };

    FunnelSegment.prototype.createHighlight = function createHighlight (style) {
        return _progress_kendoDrawing.drawing.Path.fromPoints(this.points, style);
    };

    FunnelSegment.prototype.highlightVisual = function highlightVisual () {
        return this.visual.children[0];
    };

    FunnelSegment.prototype.highlightVisualArgs = function highlightVisualArgs () {
        var path = _progress_kendoDrawing.drawing.Path.fromPoints(this.points).close();

        return {
            options: this.options,
            path: path
        };
    };

    FunnelSegment.prototype.tooltipAnchor = function tooltipAnchor () {
        var box = this.box;
        return {
            point: new Point(box.center().x, box.y1),
            align: {
                horizontal: "center",
                vertical: "top"
            }
        };
    };

    FunnelSegment.prototype.formatValue = function formatValue (format) {
        var point = this;
        return point.owner.formatPointValue(point, format);
    };

    return FunnelSegment;
}(ChartElement));

setDefaultOptions(FunnelSegment, {
    color: WHITE,
    border: {
        width: 1
    }
});

deepExtend(FunnelSegment.prototype, PointEventsMixin);

var FunnelChart = (function (ChartElement$$1) {
    function FunnelChart(plotArea, options) {
        ChartElement$$1.call(this, options);

        this.plotArea = plotArea;
        this.points = [];
        this.labels = [];
        this.legendItems = [];
        this.render();
    }

    if ( ChartElement$$1 ) FunnelChart.__proto__ = ChartElement$$1;
    FunnelChart.prototype = Object.create( ChartElement$$1 && ChartElement$$1.prototype );
    FunnelChart.prototype.constructor = FunnelChart;

    FunnelChart.prototype.formatPointValue = function formatPointValue (point, format) {
        return this.chartService.format.auto(format,point.value);
    };

    FunnelChart.prototype.render = function render () {
        var this$1 = this;

        var ref = this;
        var options = ref.options;
        var seriesColors = ref.plotArea.options.seriesColors; if ( seriesColors === void 0 ) seriesColors = [];
        var series = options.series[0];
        var data = series.data;

        if (!data) {
            return;
        }

        var total = seriesTotal(series);

        for (var i = 0; i < data.length; i++) {
            var pointData = SeriesBinder.current.bindPoint(series, i);
            var value = pointData.valueFields.value;

            if (value === null || value === undefined) {
                continue;
            }

            var fields = pointData.fields;

            if (!isFunction(series.color)) {
                series.color = fields.color || seriesColors[i % seriesColors.length];
            }

            var visible = segmentVisible(series, fields, i);
            fields = deepExtend({
                index: i,
                owner: this$1,
                series: series,
                dataItem: data[i],
                percentage: Math.abs(value) / total
            }, fields, { visible: visible });

            var segment = this$1.createSegment(value, fields);
            var label = this$1.createLabel(value, fields);

            if (segment && label) {
                segment.append(label);
            }
        }
    };

    FunnelChart.prototype.evalSegmentOptions = function evalSegmentOptions (options, value, fields) {
        var series = fields.series;

        evalOptions(options, {
            value: value,
            series: series,
            dataItem: fields.dataItem,
            index: fields.index
        }, { defaults: series._defaults, excluded: [ "data", "content", "template", "toggle", "visual" ] });
    };

    FunnelChart.prototype.createSegment = function createSegment (value, fields) {
        var seriesOptions = deepExtend({}, fields.series);
        this.evalSegmentOptions(seriesOptions, value, fields);

        this.createLegendItem(value, seriesOptions, fields);

        if (fields.visible !== false) {

            var segment = new FunnelSegment(value, seriesOptions, fields);
            Object.assign(segment, fields);

            this.append(segment);
            this.points.push(segment);

            return segment;
        }
    };

    FunnelChart.prototype.createLabel = function createLabel (value, fields) {
        var series = fields.series;
        var dataItem = fields.dataItem;
        var labels = deepExtend({}, this.options.labels, series.labels);
        var text = value;

        if (labels.visible) {
            var labelTemplate = getTemplate(labels);
            if (labelTemplate) {
                text = labelTemplate({
                    dataItem: dataItem,
                    value: value,
                    percentage: fields.percentage,
                    category: fields.category,
                    series: series
                });
            } else if (labels.format) {
                text = this.plotArea.chartService.format.auto(labels.format, text);
            }

            if (!labels.color) {
                var brightnessValue = new _progress_kendoDrawing.Color(series.color).percBrightness();
                if (brightnessValue > 180) {
                    labels.color = BLACK;
                } else {
                    labels.color = WHITE;
                }
                if (!labels.background) {
                    labels.background = series.color;
                }
            }

            this.evalSegmentOptions(labels, value, fields);
            var textBox = new TextBox(text, deepExtend({
                vAlign: labels.position
            }, labels));

            this.labels.push(textBox);

            return textBox;
        }
    };

    FunnelChart.prototype.labelPadding = function labelPadding () {
        var labels = this.labels;
        var padding = { left: 0, right: 0 };

        for (var i = 0; i < labels.length; i++) {
            var label = labels[i];
            var align = label.options.align;
            if (align !== CENTER) {
                var width = labels[i].box.width();

                if (align === LEFT) {
                    padding.left = Math.max(padding.left, width);
                } else {
                    padding.right = Math.max(padding.right, width);
                }
            }
        }

        return padding;
    };

    FunnelChart.prototype.dynamicSlopeReflow = function dynamicSlopeReflow (box, width, totalHeight) {
        var ref = this;
        var options = ref.options;
        var segments = ref.points;
        var count = segments.length;
        var firstSegment = segments[0];
        var maxSegment = firstSegment;

        for (var idx = 0; idx < segments.length; idx++) {
            if (segments[idx].percentage > maxSegment.percentage) {
                maxSegment = segments[idx];
            }
        }

        var lastUpperSide = (firstSegment.percentage / maxSegment.percentage) * width;
        var previousOffset = (width - lastUpperSide) / 2;
        var previousHeight = 0;

        for (var idx$1 = 0; idx$1 < count; idx$1++) {
            var percentage = segments[idx$1].percentage;
            var nextSegment = segments[idx$1 + 1];
            var nextPercentage = (nextSegment ? nextSegment.percentage : percentage);
            var points = segments[idx$1].points = [];
            var height = (options.dynamicHeight) ? (totalHeight * percentage) : (totalHeight / count);
            var offset = (void 0);

            if (!percentage) {
                offset = nextPercentage ? 0 : width / 2;
            } else {
                offset = (width - lastUpperSide * (nextPercentage / percentage)) / 2;
            }

            offset = limitValue(offset, 0, width);

            points.push(new _progress_kendoDrawing.geometry.Point(box.x1 + previousOffset, box.y1 + previousHeight));
            points.push(new _progress_kendoDrawing.geometry.Point(box.x1 + width - previousOffset, box.y1 + previousHeight));
            points.push(new _progress_kendoDrawing.geometry.Point(box.x1 + width - offset, box.y1 + height + previousHeight));
            points.push(new _progress_kendoDrawing.geometry.Point(box.x1 + offset, box.y1 + height + previousHeight));

            previousOffset = offset;
            previousHeight += height + options.segmentSpacing;
            lastUpperSide = limitValue(width - 2 * offset, 0, width);
        }
    };

    FunnelChart.prototype.constantSlopeReflow = function constantSlopeReflow (box, width, totalHeight) {
        var ref = this;
        var options = ref.options;
        var segments = ref.points;
        var count = segments.length;
        var decreasingWidth = options.neckRatio <= 1;
        var neckRatio = decreasingWidth ? options.neckRatio * width : width;
        var previousOffset = decreasingWidth ? 0 : (width - width / options.neckRatio) / 2;
        var topMostWidth = decreasingWidth ? width : width - previousOffset * 2;
        var finalNarrow = (topMostWidth - neckRatio) / 2;
        var previousHeight = 0;

        for (var idx = 0; idx < count; idx++) {
            var points = segments[idx].points = [];
            var percentage = segments[idx].percentage;
            var offset = (options.dynamicHeight) ? (finalNarrow * percentage) : (finalNarrow / count);
            var height = (options.dynamicHeight) ? (totalHeight * percentage) : (totalHeight / count);

            points.push(new _progress_kendoDrawing.geometry.Point(box.x1 + previousOffset, box.y1 + previousHeight));
            points.push(new _progress_kendoDrawing.geometry.Point(box.x1 + width - previousOffset, box.y1 + previousHeight));
            points.push(new _progress_kendoDrawing.geometry.Point(box.x1 + width - previousOffset - offset, box.y1 + height + previousHeight));
            points.push(new _progress_kendoDrawing.geometry.Point(box.x1 + previousOffset + offset,box.y1 + height + previousHeight));
            previousOffset += offset;
            previousHeight += height + options.segmentSpacing;
        }
    };

    FunnelChart.prototype.reflow = function reflow (chartBox) {
        var points = this.points;
        var count = points.length;

        if (!count) {
            return;
        }

        var options = this.options;
        var box = chartBox.clone().unpad(this.labelPadding());
        var totalHeight = box.height() - options.segmentSpacing * (count - 1);
        var width = box.width();

        if (options.dynamicSlope) {
            this.dynamicSlopeReflow(box, width, totalHeight);
        } else {
            this.constantSlopeReflow(box, width, totalHeight);
        }

        for (var idx = 0; idx < count; idx++) {
            points[idx].reflow(chartBox);
        }
    };

    return FunnelChart;
}(ChartElement));

setDefaultOptions(FunnelChart, {
    neckRatio: 0.3,
    width: 300,
    dynamicSlope: false,
    dynamicHeight: true,
    segmentSpacing: 0,
    labels: {
        visible: false,
        align: CENTER,
        position: CENTER,
        zIndex: 1
    }
});

deepExtend(FunnelChart.prototype, PieChartMixin);

var FunnelPlotArea = (function (PlotAreaBase$$1) {
    function FunnelPlotArea () {
        PlotAreaBase$$1.apply(this, arguments);
    }

    if ( PlotAreaBase$$1 ) FunnelPlotArea.__proto__ = PlotAreaBase$$1;
    FunnelPlotArea.prototype = Object.create( PlotAreaBase$$1 && PlotAreaBase$$1.prototype );
    FunnelPlotArea.prototype.constructor = FunnelPlotArea;

    FunnelPlotArea.prototype.render = function render () {
        this.createFunnelChart(this.series);
    };

    FunnelPlotArea.prototype.createFunnelChart = function createFunnelChart (series) {
        var firstSeries = series[0];
        var funnelChart = new FunnelChart(this, {
            series: series,
            legend: this.options.legend,
            neckRatio: firstSeries.neckRatio,
            dynamicHeight: firstSeries.dynamicHeight,
            dynamicSlope: firstSeries.dynamicSlope,
            segmentSpacing: firstSeries.segmentSpacing,
            highlight: firstSeries.highlight
        });

        this.appendChart(funnelChart);
    };

    FunnelPlotArea.prototype.appendChart = function appendChart (chart, pane) {
        PlotAreaBase$$1.prototype.appendChart.call(this, chart, pane);
        append$1(this.options.legend.items, chart.legendItems);
    };

    return FunnelPlotArea;
}(PlotAreaBase));

var COLOR = "color";
var FIRST = "first";
var FROM = "from";
var MAX = "max";
var MIN = "min";
var NOTE_TEXT = "noteText";
var SUMMARY_FIELD = "summary";
var TO = "to";

PlotAreaFactory.current.register(CategoricalPlotArea, [
    BAR, COLUMN, LINE, VERTICAL_LINE, AREA, VERTICAL_AREA,
    CANDLESTICK, OHLC, BULLET, VERTICAL_BULLET, BOX_PLOT, VERTICAL_BOX_PLOT,
    RANGE_COLUMN, RANGE_BAR, WATERFALL, HORIZONTAL_WATERFALL
]);

PlotAreaFactory.current.register(XYPlotArea, [
    SCATTER, SCATTER_LINE, BUBBLE
]);

PlotAreaFactory.current.register(PiePlotArea, [ PIE ]);
PlotAreaFactory.current.register(DonutPlotArea, [ DONUT ]);
PlotAreaFactory.current.register(FunnelPlotArea, [ FUNNEL ]);

PlotAreaFactory.current.register(PolarPlotArea, [ POLAR_AREA, POLAR_LINE, POLAR_SCATTER ]);
PlotAreaFactory.current.register(RadarPlotArea, [ RADAR_AREA, RADAR_COLUMN, RADAR_LINE ]);

SeriesBinder.current.register(
    [ BAR, COLUMN, LINE, VERTICAL_LINE, AREA, VERTICAL_AREA ],
    [ VALUE ], [ CATEGORY, COLOR, NOTE_TEXT, ERROR_LOW_FIELD, ERROR_HIGH_FIELD ]
);

SeriesBinder.current.register(
    [ RANGE_COLUMN, RANGE_BAR ],
    [ FROM, TO ], [ CATEGORY, COLOR, NOTE_TEXT ]
);

SeriesBinder.current.register(
    [ WATERFALL, HORIZONTAL_WATERFALL ],
    [ VALUE ], [ CATEGORY, COLOR, NOTE_TEXT, SUMMARY_FIELD ]
);

SeriesBinder.current.register([ POLAR_AREA, POLAR_LINE, POLAR_SCATTER ], [ X, Y ], [ COLOR ]);
SeriesBinder.current.register([ RADAR_AREA, RADAR_COLUMN, RADAR_LINE ], [ VALUE ], [ COLOR ]);

SeriesBinder.current.register(
    [ FUNNEL ],
    [ VALUE ], [ CATEGORY, COLOR, "visibleInLegend", "visible" ]
);

DefaultAggregates.current.register(
    [ BAR, COLUMN, LINE, VERTICAL_LINE, AREA, VERTICAL_AREA, WATERFALL, HORIZONTAL_WATERFALL ],
    { value: MAX, color: FIRST, noteText: FIRST, errorLow: MIN, errorHigh: MAX }
);

DefaultAggregates.current.register(
    [ RANGE_COLUMN, RANGE_BAR ],
    { from: MIN, to: MAX, color: FIRST, noteText: FIRST }
);

DefaultAggregates.current.register(
    [ RADAR_AREA, RADAR_COLUMN, RADAR_LINE ],
    { value: MAX, color: FIRST }
);

SeriesBinder.current.register(
    [ SCATTER, SCATTER_LINE, BUBBLE ],
    [ X, Y ], [ COLOR, NOTE_TEXT, X_ERROR_LOW_FIELD, X_ERROR_HIGH_FIELD, Y_ERROR_LOW_FIELD, Y_ERROR_HIGH_FIELD ]
);

SeriesBinder.current.register(
    [ BUBBLE ], [ X, Y, "size" ], [ COLOR, CATEGORY, NOTE_TEXT ]
);

SeriesBinder.current.register(
    [ CANDLESTICK, OHLC ],
    [ "open", "high", "low", "close" ], [ CATEGORY, COLOR, "downColor", NOTE_TEXT ]
);

DefaultAggregates.current.register(
    [ CANDLESTICK, OHLC ],
    { open: MAX, high: MAX, low: MIN, close: MAX,
      color: FIRST, downColor: FIRST, noteText: FIRST }
);

SeriesBinder.current.register(
    [ BOX_PLOT, VERTICAL_BOX_PLOT ],
    [ "lower", "q1", "median", "q3", "upper", "mean", "outliers" ], [ CATEGORY, COLOR, NOTE_TEXT ]
);

DefaultAggregates.current.register(
    [ BOX_PLOT, VERTICAL_BOX_PLOT ],
    { lower: MAX, q1: MAX, median: MAX, q3: MAX, upper: MAX, mean: MAX, outliers: FIRST,
      color: FIRST, noteText: FIRST }
);

SeriesBinder.current.register(
    [ BULLET, VERTICAL_BULLET ],
    [ "current", "target" ], [ CATEGORY, COLOR, "visibleInLegend", NOTE_TEXT ]
);

DefaultAggregates.current.register(
    [ BULLET, VERTICAL_BULLET ],
    { current: MAX, target: MAX, color: FIRST, noteText: FIRST }
);

SeriesBinder.current.register(
    [ PIE, DONUT ],
    [ VALUE ], [ CATEGORY, COLOR, "explode", "visibleInLegend", "visible" ]
);

var AXIS_NAMES = [ CATEGORY, VALUE, X, Y ];

var MOUSEMOVE = "mousemove";
var CONTEXTMENU = "contextmenu";
var MOUSEMOVE_DELAY = 20;

var Chart = (function (Class$$1) {
    function Chart(element, userOptions, themeOptions, context) {
        var this$1 = this;
        if ( context === void 0 ) context = {};

        Class$$1.call(this);

        this.observers = [];
        this.addObserver(context.observer);
        this.chartService = new ChartService(this, context);
        this.chartService.theme = themeOptions;

        this._initElement(element);

        var options = deepExtend({}, this.options, userOptions);
        this._originalOptions = deepExtend({}, options);
        this._theme = themeOptions;
        this._initTheme(options, themeOptions);

        this._initSurface();

        this._initHandlers();

        this.bindCategories();
        FontLoader.preloadFonts(userOptions, function () {
            if (!this$1._destroyed) {
                this$1._redraw();
                this$1._attachEvents();
            }
        });
    }

    if ( Class$$1 ) Chart.__proto__ = Class$$1;
    Chart.prototype = Object.create( Class$$1 && Class$$1.prototype );
    Chart.prototype.constructor = Chart;

    Chart.prototype._initElement = function _initElement (element) {
        this._setElementClass(element);
        element.style.position = "relative";
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
        this.element = element;
    };

    Chart.prototype._setElementClass = function _setElementClass (element) {
        addClass(element, "k-chart");
    };

    Chart.prototype._initTheme = function _initTheme (options, themeOptions) {
        var seriesCopies = [];
        var series = options.series || [];

        for (var i = 0; i < series.length; i++) {
            seriesCopies.push(Object.assign({}, series[i]));
        }
        options.series = seriesCopies;

        resolveAxisAliases(options);
        this.applyDefaults(options, themeOptions);

        // Clean up default if not overriden by data attributes
        if (options.seriesColors === null) {
            delete options.seriesColors;
        }

        this.options = deepExtend({}, themeOptions, options);
        this.applySeriesColors();
    };

    Chart.prototype.getSize = function getSize () {
        return { width: this.element.offsetWidth, height: this.element.offsetHeight };
        // return kendo.dimensions(this.element);
    };

    Chart.prototype.resize = function resize (force) {
        var size = this.getSize();
        var currentSize = this._size;

        if (force || (size.width > 0 || size.height > 0) && (!currentSize || size.width !== currentSize.width || size.height !== currentSize.height)) {
            this._size = size;
            this._resize(size, force);
            this.trigger("resize", size);
        }
    };

    Chart.prototype._resize = function _resize () {
        this._noTransitionsRedraw();
    };

    Chart.prototype.redraw = function redraw (paneName) {
        this.applyDefaults(this.options);
        this.applySeriesColors();

        if (paneName) {
            var plotArea = this._model._plotArea;
            var pane = plotArea.findPane(paneName);
            plotArea.redraw(pane);
        } else {
            this._redraw();
        }
    };

    Chart.prototype.getAxis = function getAxis (name) {
        var axes = this._plotArea.axes;

        for (var idx = 0; idx < axes.length; idx++) {
            if (axes[idx].options.name === name) {
                return new ChartAxis(axes[idx]);
            }
        }
    };

    Chart.prototype.findAxisByName = function findAxisByName (name) {
        return this.getAxis(name);
    };

    Chart.prototype.findPaneByName = function findPaneByName (name) {
        var panes = this._plotArea.panes;

        for (var idx = 0; idx < panes.length; idx++) {
            if (panes[idx].options.name === name) {
                return new ChartPane(panes[idx]);
            }
        }
    };

    Chart.prototype.findPaneByIndex = function findPaneByIndex (idx) {
        var panes = this._plotArea.panes;
        if (panes[idx]) {
            return new ChartPane(panes[idx]);
        }
    };

    Chart.prototype.plotArea = function plotArea () {
        return new ChartPlotArea(this._plotArea);
    };

    Chart.prototype.toggleHighlight = function toggleHighlight (show, filter) {
        var plotArea = this._plotArea;
        var firstSeries = (plotArea.srcSeries || plotArea.series || [])[0];
        var points;

        if (isFunction(filter)) {
            points = plotArea.filterPoints(filter);
        } else {
            var seriesName, categoryName;
            if (isObject(filter)) {
                seriesName = filter.series;
                categoryName = filter.category;
            } else {
                seriesName = categoryName = filter;
            }

            if (firstSeries.type === DONUT) {
                points = pointByCategoryName(plotArea.pointsBySeriesName(seriesName), categoryName);
            } else if (firstSeries.type === PIE || firstSeries.type === FUNNEL) {
                points = pointByCategoryName((plotArea.charts[0] || {}).points, categoryName);
            } else {
                points = plotArea.pointsBySeriesName(seriesName);
            }
        }

        if (points) {
            this.togglePointsHighlight(show, points);
        }
    };

    Chart.prototype.togglePointsHighlight = function togglePointsHighlight (show, points) {
        var highlight = this._highlight;
        for (var idx = 0; idx < points.length; idx++) {
            highlight.togglePointHighlight(points[idx], show);
        }
    };

    Chart.prototype.showTooltip = function showTooltip (filter) {
        var shared = this._sharedTooltip();
        var ref = this;
        var tooltip = ref._tooltip;
        var plotArea = ref._plotArea;
        var point, categoryIndex;

        if (isFunction(filter)) {
            point = plotArea.findPoint(filter);
            if (point && shared) {
                categoryIndex = point.categoryIx;
            }
        } else if (shared && defined(filter)) {
            categoryIndex = plotArea.categoryAxis.categoryIndex(filter);
        }

        if (shared) {
            if (categoryIndex >= 0) {
                var points = this._plotArea.pointsByCategoryIndex(categoryIndex);
                tooltip.showAt(points);
            }
        } else if (point) {
            tooltip.show(point);
        }
    };

    Chart.prototype.hideTooltip = function hideTooltip () {
        this._tooltip.hide();
    };

    Chart.prototype._initSurface = function _initSurface () {
        var surface = this.surface;
        var wrap = this._surfaceWrap();

        var chartArea = this.options.chartArea;
        if (chartArea.width) {
            elementSize$1(wrap, { width: chartArea.width });
        }
        if (chartArea.height) {
            elementSize$1(wrap, { height: chartArea.height });
        }

        if (!surface || surface.options.type !== this.options.renderAs) {
            if (surface) {
                surface.destroy();
            }

            this.surface = _progress_kendoDrawing.drawing.Surface.create(wrap, {
                type: this.options.renderAs
            });

        } else {
            this.surface.clear();
            this.surface.resize();
        }
    };

    Chart.prototype._surfaceWrap = function _surfaceWrap () {
        return this.element;
    };

    Chart.prototype._redraw = function _redraw () {
        var model = this._getModel();

        this._destroyView();

        this._model = model;
        this._plotArea = model._plotArea;

        model.renderVisual();

        if (this.options.transitions !== false) {
            model.traverse(function(element) {
                if (element.animation) {
                    element.animation.setup();
                }
            });
        }

        this._initSurface();
        this.surface.draw(model.visual);

        if (this.options.transitions !== false) {
            model.traverse(function(element) {
                if (element.animation) {
                    element.animation.play();
                }
            });
        }

        this._tooltip = this._createTooltip();
        this._highlight = new Highlight();
        this._setupSelection();
        this._createPannable();
        this._createZoomSelection();
        this._createMousewheelZoom();

        this.trigger(RENDER);

        if (!this._navState) {
            this._cancelDomEvents();
        }
    };

    Chart.prototype.exportVisual = function exportVisual (options) {
        var visual;
        if (options && (options.width || options.height)) {
            var chartArea = this.options.chartArea;
            var originalChartArea = this._originalOptions.chartArea;

            deepExtend(chartArea, options);

            var model = this._getModel();

            chartArea.width = originalChartArea.width;
            chartArea.height = originalChartArea.height;

            model.renderVisual();

            visual = model.visual;
        } else {
            visual = this.surface.exportVisual();
        }

        return visual;
    };

    Chart.prototype._sharedTooltip = function _sharedTooltip () {
        return this._plotArea instanceof CategoricalPlotArea && this.options.tooltip.shared;
    };

    Chart.prototype._createPannable = function _createPannable () {
        var options = this.options;
        if (options.pannable !== false) {
            this._pannable = new Pannable(this._plotArea, options.pannable);
        }
    };

    Chart.prototype._createZoomSelection = function _createZoomSelection () {
        var zoomable = this.options.zoomable;
        var selection = (zoomable || {}).selection;
        if (zoomable !== false && selection !== false) {
            this._zoomSelection = new ZoomSelection(this, selection);
        }
    };

    Chart.prototype._toggleDomDrag = function _toggleDomDrag () {
        if (!this.domEvents || !this.domEvents.toggleDrag) {
            return;
        }

        var pannable = this.options.pannable;
        var zoomable = this.options.zoomable;
        var selection = (zoomable || {}).selection;
        if (!pannable && (zoomable === false || selection === false) && !this.requiresHandlers([ DRAG_START, DRAG, DRAG_END ])) {
            this.domEvents.toggleDrag(false);
        } else {
            this.domEvents.toggleDrag(true);
        }
    };

    Chart.prototype._createMousewheelZoom = function _createMousewheelZoom () {
        var zoomable = this.options.zoomable;
        var mousewheel = (zoomable || {}).mousewheel;
        if (zoomable !== false && mousewheel !== false) {
            this._mousewheelZoom = new MousewheelZoom(this, mousewheel);
        }
    };

    Chart.prototype._toggleDomZoom = function _toggleDomZoom () {
        if (!this.domEvents || !this.domEvents.toggleZoom) {
            return;
        }

        var zoomable = this.options.zoomable;
        var mousewheel = (zoomable || {}).mousewheel;
        if ((zoomable === false || mousewheel === false) && !this.requiresHandlers([ ZOOM_START, ZOOM, ZOOM_END ])) {
            this.domEvents.toggleZoom(false);
        } else {
            this.domEvents.toggleZoom(true);
        }
    };

    Chart.prototype._createTooltip = function _createTooltip () {
        var ref = this;
        var tooltipOptions = ref.options.tooltip;
        var tooltip;

        if (this._sharedTooltip()) {
            tooltip = this._createSharedTooltip(tooltipOptions);
        } else {
            tooltip = new Tooltip(this.chartService, tooltipOptions);
        }

        return tooltip;
    };

    Chart.prototype._createSharedTooltip = function _createSharedTooltip (options) {
        return new SharedTooltip(this._plotArea, options);
    };

    Chart.prototype.applyDefaults = function applyDefaults (options, themeOptions) {
        applyAxisDefaults(options, themeOptions);
        applySeriesDefaults(options, themeOptions);
    };

    Chart.prototype.applySeriesColors = function applySeriesColors () {
        var options = this.options;
        var series = options.series;
        var colors = options.seriesColors || [];

        for (var i = 0; i < series.length; i++) {
            var currentSeries = series[i];
            var seriesColor = colors[i % colors.length];
            var defaults = currentSeries._defaults;

            currentSeries.color = currentSeries.color || seriesColor;
            if (defaults) {
                defaults.color = defaults.color || seriesColor;
            }
        }
    };

    Chart.prototype._getModel = function _getModel () {
        var options = this.options;
        var plotArea = this._createPlotArea();
        var model = new RootElement(this._modelOptions());
        model.chart = this;
        model._plotArea = plotArea;

        Title.buildTitle(options.title, model);

        if (options.legend.visible) {
            model.append(new Legend(plotArea.options.legend, this.chartService));
        }
        model.append(plotArea);
        model.reflow();

        return model;
    };

    Chart.prototype._modelOptions = function _modelOptions () {
        var ref = this;
        var options = ref.options;
        var element = ref.element;
        var size = elementSize$1(element);

        this._size = null;

        return deepExtend({
            width: Math.floor(size.width) || DEFAULT_WIDTH,
            height: Math.floor(size.height) || DEFAULT_HEIGHT,
            transitions: options.transitions
        }, options.chartArea);
    };

    Chart.prototype._createPlotArea = function _createPlotArea (skipSeries) {
        var options = this.options;

        var plotArea = PlotAreaFactory.current.create(skipSeries ? [] : options.series, options, this.chartService);

        return plotArea;
    };

    Chart.prototype._hasSelection = function _hasSelection () {
        return this._selections && this._selections.length;
    };

    Chart.prototype._setupSelection = function _setupSelection () {
        var this$1 = this;

        var ref = this;
        var axes = ref._plotArea.axes;
        var selections = this._selections = [];

        for (var i = 0; i < axes.length; i++) {
            var axis = axes[i];
            var options = axis.options;
            if (axis instanceof CategoryAxis && options.select && !options.vertical) {
                var min = 0;
                var max = options.categories.length - 1;

                if (axis instanceof DateCategoryAxis) {
                    min = options.categories[min];
                    max = options.categories[max];
                }

                if (!options.justified) {
                    if (axis instanceof DateCategoryAxis) {
                        max = addDuration(max, 1, options.baseUnit, options.weekStartDay);
                    } else {
                        max++;
                    }
                }

                var selection = new Selection(this$1, axis,
                    deepExtend({ min: min, max: max }, options.select)
                );

                selections.push(selection);
            }
        }
    };

    Chart.prototype._selectStart = function _selectStart (e) {
        return this.trigger(SELECT_START, e);
    };

    Chart.prototype._select = function _select (e) {
        return this.trigger(SELECT, e);
    };

    Chart.prototype._selectEnd = function _selectEnd (e) {
        return this.trigger(SELECT_END, e);
    };

    Chart.prototype._initHandlers = function _initHandlers () {
        this._clickHandler = this._click.bind(this);
        this._mousewheelHandler = this._mousewheel.bind(this);
        this._surfaceMouseenterHandler = this._mouseover.bind(this);
        this._surfaceMouseleaveHandler = this._mouseout.bind(this);

        this._mousemove = _progress_kendoDrawing.throttle(
            this._mousemove.bind(this),
            MOUSEMOVE_DELAY
        );
    };

    Chart.prototype.addObserver = function addObserver (observer) {
        if (observer) {
            this.observers.push(observer);
        }
    };

    Chart.prototype.removeObserver = function removeObserver (observer) {
        var index = this.observers.indexOf(observer);
        if (index >= 0) {
            this.observers.splice(index, 1);
        }
    };

    Chart.prototype.requiresHandlers = function requiresHandlers (eventNames) {
        var observers = this.observers;
        for (var idx = 0; idx < observers.length; idx++) {
            if (observers[idx].requiresHandlers(eventNames)) {
                return true;
            }
        }
    };

    Chart.prototype.trigger = function trigger (name, args) {
        if ( args === void 0 ) args = {};

        if (name === SHOW_TOOLTIP) {
            args.anchor.point = this._toDocumentCoordinates(args.anchor.point);
        }
        args.sender = this;

        var observers = this.observers;
        var isDefaultPrevented = false;
        for (var idx = 0; idx < observers.length; idx++) {
            if (observers[idx].trigger(name, args)) {
                isDefaultPrevented = true;
            }
        }

        return isDefaultPrevented;
    };

    Chart.prototype._attachEvents = function _attachEvents () {
        var ref = this;
        var element = ref.element;
        var surface = ref.surface;

        surface.bind("mouseenter", this._surfaceMouseenterHandler);
        surface.bind("mouseleave", this._surfaceMouseleaveHandler);
        var obj;
        bindEvents(element, ( obj = {}, obj[ CONTEXTMENU ] = this._clickHandler, obj[ MOUSEWHEEL ] = this._mousewheelHandler, obj ));

        if (this._shouldAttachMouseMove()) {
            var obj$1;
            bindEvents(element, ( obj$1 = {}, obj$1[ MOUSEMOVE ] = this._mousemove, obj$1 ));
        }

        this.domEvents = DomEventsBuilder.create(this.element, {
            start: this._start.bind(this),
            move: this._move.bind(this),
            end: this._end.bind(this),
            tap: this._tap.bind(this),
            gesturestart: this._gesturestart.bind(this),
            gesturechange: this._gesturechange.bind(this),
            gestureend: this._gestureend.bind(this)
        });

        this._toggleDomDrag();
        this._toggleDomZoom();
    };

    Chart.prototype._cancelDomEvents = function _cancelDomEvents () {
        if (this.domEvents && this.domEvents.cancel) {
            this.domEvents.cancel();
        }
    };

    Chart.prototype._gesturestart = function _gesturestart (e) {
        if (this._mousewheelZoom && !this._stopDragEvent(e)) {
            this._gestureDistance = e.distance;
            this._unsetActivePoint();
            this.surface.suspendTracking();
        }
    };

    Chart.prototype._gestureend = function _gestureend (e) {
        if (this._zooming && !this._stopDragEvent(e)) {
            if (this.surface) {
                this.surface.resumeTracking();
            }
            this._zooming = false;
            this.trigger(ZOOM_END, {});
        }
    };

    Chart.prototype._gesturechange = function _gesturechange (e) {
        var mousewheelZoom = this._mousewheelZoom;

        if (mousewheelZoom && !this._stopDragEvent(e)) {
            e.preventDefault();
            var previousGestureDistance = this._gestureDistance;
            var scaleDelta = -e.distance / previousGestureDistance + 1;

            if (Math.abs(scaleDelta) >= 0.1) {
                scaleDelta = Math.round(scaleDelta * 10);

                this._gestureDistance = e.distance;
                var args = { delta: scaleDelta, axisRanges: axisRanges(this._plotArea.axes), originalEvent: e };
                if (this._zooming || !this.trigger(ZOOM_START, args)) {

                    if (!this._zooming) {
                        this._zooming = true;
                    }

                    var ranges = args.axisRanges = mousewheelZoom.updateRanges(scaleDelta);
                    if (ranges && !this.trigger(ZOOM, args)) {
                        mousewheelZoom.zoom();
                    }
                }
            }
        }
    };

    Chart.prototype._mouseout = function _mouseout (e) {
        if (e.element) {
            var element = this._drawingChartElement(e.element, e);

            if (element && element.leave) {
                element.leave(this, e.originalEvent);
            }
        }
    };

    Chart.prototype._start = function _start (e) {
        var coords = this._eventCoordinates(e);

        if (this._stopDragEvent(e) || !this._plotArea.backgroundContainsPoint(coords)) {
            return;
        }


        if (this.requiresHandlers([ DRAG_START, DRAG, DRAG_END ])) {
            this._startNavigation(e, coords, DRAG_START);
        }

        if (this._pannable && this._pannable.start(e)) {
            this.surface.suspendTracking();
            this._unsetActivePoint();
            this._suppressHover = true;
        }

        if (this._zoomSelection) {
            if (this._zoomSelection.start(e)) {
                this.trigger(ZOOM_START, { axisRanges: axisRanges(this._plotArea.axes), originalEvent: e });
            }
        }
    };

    Chart.prototype._move = function _move (e) {
        var ref = this;
        var state = ref._navState;
        var pannable = ref._pannable;

        if (this._stopDragEvent(e)) {
            return;
        }

        if (pannable) {
            var ranges = pannable.move(e);

            if (ranges && !this.trigger(DRAG, { axisRanges: ranges, originalEvent: e })) {
                pannable.pan();
            }
        } else if (state) {
            var ranges$1 = {};
            var axes = state.axes;

            for (var i = 0; i < axes.length; i++) {
                var currentAxis = axes[i];
                var axisName = currentAxis.options.name;
                if (axisName) {
                    var axis = currentAxis.options.vertical ? e.y : e.x;
                    var delta = axis.startLocation - axis.location;

                    if (delta !== 0) {
                        ranges$1[currentAxis.options.name] = currentAxis.translateRange(delta);
                    }
                }
            }

            state.axisRanges = ranges$1;
            this.trigger(DRAG, {
                axisRanges: ranges$1,
                originalEvent: e
            });
        }

        if (this._zoomSelection) {
            this._zoomSelection.move(e);
        }
    };

    Chart.prototype._end = function _end (e) {
        if (this._stopDragEvent(e)) {
            return;
        }

        var pannable = this._pannable;
        if (pannable && pannable.end(e)) {
            this.surface.resumeTracking();
            this.trigger(DRAG_END, {
                axisRanges: axisRanges(this._plotArea.axes),
                originalEvent: e
            });
            this._suppressHover = false;
        } else {
            this._endNavigation(e, DRAG_END);
        }

        if (this._zoomSelection) {
            var ranges = this._zoomSelection.end(e);
            if (ranges && !this.trigger(ZOOM, { axisRanges: ranges, originalEvent: e })) {
                this._zoomSelection.zoom();
                this.trigger(ZOOM_END, { axisRanges: ranges, originalEvent: e });
            }
        }
    };

    Chart.prototype._stopDragEvent = function _stopDragEvent () {
        return this._hasSelection();
    };

    Chart.prototype._mousewheel = function _mousewheel (e) {
        var this$1 = this;

        var delta = mousewheelDelta(e);
        var mousewheelZoom = this._mousewheelZoom;
        var coords = this._eventCoordinates(e);

        if (!this._plotArea.backgroundContainsPoint(coords)) {
            return;
        }

        if (mousewheelZoom) {
            var args = { delta: delta, axisRanges: axisRanges(this._plotArea.axes), originalEvent: e };
            if (this._zooming || !this.trigger(ZOOM_START, args)) {
                e.preventDefault();

                if (!this._zooming) {
                    this._unsetActivePoint();
                    this.surface.suspendTracking();
                    this._zooming = true;
                }

                if (this._mwTimeout) {
                    clearTimeout(this._mwTimeout);
                }

                args.axisRanges = mousewheelZoom.updateRanges(delta);
                if (args.axisRanges && !this.trigger(ZOOM, args)) {
                    mousewheelZoom.zoom();
                }

                this._mwTimeout = setTimeout(function () {
                    this$1.trigger(ZOOM_END, args);
                    this$1._zooming = false;
                    if (this$1.surface) {
                        this$1.surface.resumeTracking();
                    }
                }, MOUSEWHEEL_DELAY);
            }
        } else {
            var state = this._navState;
            if (!state) {
                var prevented = this._startNavigation(e, coords, ZOOM_START);
                if (!prevented) {
                    state = this._navState;
                }
            }

            if (state) {
                var totalDelta = state.totalDelta || delta;
                state.totalDelta = totalDelta + delta;

                var axes = this._navState.axes;
                var ranges = {};

                for (var i = 0; i < axes.length; i++) {
                    var currentAxis = axes[i];
                    var axisName = currentAxis.options.name;
                    if (axisName) {
                        ranges[axisName] = currentAxis.scaleRange(-totalDelta);
                    }
                }

                this.trigger(ZOOM, {
                    delta: delta,
                    axisRanges: ranges,
                    originalEvent: e
                });

                if (this._mwTimeout) {
                    clearTimeout(this._mwTimeout);
                }

                this._mwTimeout = setTimeout(function () {
                    this$1._endNavigation(e, ZOOM_END);
                }, MOUSEWHEEL_DELAY);
            }
        }
    };

    Chart.prototype._startNavigation = function _startNavigation (e, coords, chartEvent) {
        var plotArea = this._model._plotArea;
        var pane = plotArea.findPointPane(coords);
        var axes = plotArea.axes.slice(0);

        if (!pane) {
            return;
        }

        var ranges = axisRanges(axes);

        var prevented = this.trigger(chartEvent, {
            axisRanges: ranges,
            originalEvent: e
        });

        if (prevented) {
            this._cancelDomEvents();
        } else {
            this._suppressHover = true;
            this._unsetActivePoint();
            this._navState = {
                axisRanges: ranges,
                pane: pane,
                axes: axes
            };
        }
    };

    Chart.prototype._endNavigation = function _endNavigation (e, chartEvent) {
        if (this._navState) {
            this.trigger(chartEvent, {
                axisRanges: this._navState.axisRanges,
                originalEvent: e
            });
            this._suppressHover = false;
            this._navState = null;
        }
    };

    Chart.prototype._getChartElement = function _getChartElement (e, match) {
        var element = this.surface.eventTarget(e);
        if (element) {
            return this._drawingChartElement(element, e, match);
        }
    };

    Chart.prototype._drawingChartElement = function _drawingChartElement (element, e, match) {
        var current = element;
        var chartElement;
        while (current && !chartElement) {
            chartElement = current.chartElement;
            current = current.parent;
        }

        if (chartElement) {
            if (chartElement.aliasFor) {
                chartElement = chartElement.aliasFor(e, this._eventCoordinates(e));
            }

            if (match) {
                chartElement = chartElement.closest(match);
            }

            return chartElement;
        }
    };

    Chart.prototype._eventCoordinates = function _eventCoordinates (e) {
        var coordinates = eventCoordinates(e);
        return this._toModelCoordinates(coordinates.x, coordinates.y);
    };

    Chart.prototype._elementPadding = function _elementPadding () {
        if (!this._padding) {
            var ref = elementStyles(this.element, [ "paddingLeft", "paddingTop" ]);
            var paddingLeft = ref.paddingLeft;
            var paddingTop = ref.paddingTop;
            this._padding = {
                top: paddingTop,
                left: paddingLeft
            };
        }

        return this._padding;
    };

    Chart.prototype._toDocumentCoordinates = function _toDocumentCoordinates (point) {
        var padding = this._elementPadding();
        var offset = elementOffset(this.element);

        return {
            left: round(point.x + padding.left + offset.left),
            top: round(point.y + padding.top + offset.top)
        };
    };

    Chart.prototype._toModelCoordinates = function _toModelCoordinates (clientX, clientY) {
        var element = this.element;
        var offset = elementOffset(element);
        var padding = this._elementPadding();

        return new Point(
            clientX - offset.left - padding.left,
            clientY - offset.top - padding.top
        );
    };

    Chart.prototype._tap = function _tap (e) {
        var this$1 = this;

        var drawingElement = this.surface.eventTarget(e);
        var element = this._drawingChartElement(drawingElement, e);

        if (this._activePoint === element) {
            this._propagateClick(element, e);
        } else {
            if (!this._startHover(drawingElement, e)) {
                this._unsetActivePoint();
            }

            this._propagateClick(element, e);
        }

        //part of fix for hover issue on windows touch
        this.handlingTap = true;
        setTimeout(function () {
            this$1.handlingTap = false;
        }, 0);
    };

    Chart.prototype._click = function _click (e) {
        var element = this._getChartElement(e);
        this._propagateClick(element, e);
    };

    Chart.prototype._propagateClick = function _propagateClick (element, e) {
        var this$1 = this;

        var current = element;
        while (current) {
            if (current.click) {
                current.click(this$1, e);
            }

            current = current.parent;
        }
    };

    Chart.prototype._startHover = function _startHover (element, e) {
        var chartElement = this._drawingChartElement(element, e);
        var ref = this;
        var tooltip = ref._tooltip;
        var highlight = ref._highlight;

        if (this._suppressHover || !highlight || highlight.isHighlighted(chartElement) || this._sharedTooltip()) {
            return false;
        }

        var point = this._drawingChartElement(element, e, function(element) {
            return element.hover && !(element instanceof PlotAreaBase);
        });

        if (point && !point.hover(this, e)) {
            this._activePoint = point;

            var tooltipOptions = deepExtend({}, tooltipOptions, point.options.tooltip);
            if (tooltipOptions.visible) {
                tooltip.show(point);
            }

            highlight.show(point);

            return point;
        }
    };

    Chart.prototype._mouseover = function _mouseover (e) {
        var point = this._startHover(e.element, e.originalEvent);

        if (point && point.tooltipTracking) {
            this._mouseMoveTrackHandler = this._mouseMoveTrackHandler || this._mouseMoveTracking.bind(this);
            var obj;
            bindEvents(document, ( obj = {}, obj[ MOUSEMOVE ] = this._mouseMoveTrackHandler, obj ));
        }
    };

    Chart.prototype._mouseMoveTracking = function _mouseMoveTracking (e) {
        var ref = this;
        var options = ref.options;
        var tooltip = ref._tooltip;
        var highlight = ref._highlight;
        var point = ref._activePoint;
        var coords = this._eventCoordinates(e);

        if (this._plotArea.box.containsPoint(coords)) {
            if (point && point.tooltipTracking && point.series && point.parent.getNearestPoint) {
                var seriesPoint = point.parent.getNearestPoint(coords.x, coords.y, point.seriesIx);
                if (seriesPoint && seriesPoint !== point) {
                    seriesPoint.hover(this, e);
                    this._activePoint = seriesPoint;

                    var tooltipOptions = deepExtend({}, options.tooltip, point.options.tooltip);
                    if (tooltipOptions.visible) {
                        tooltip.show(seriesPoint);
                    }

                    highlight.show(seriesPoint);
                }
            }
        } else {
            var obj;
            unbindEvents(document, ( obj = {}, obj[ MOUSEMOVE ] = this._mouseMoveTrackHandler, obj ));
            this._unsetActivePoint();
        }
    };

    Chart.prototype._mousemove = function _mousemove (e) {
        var coords = this._eventCoordinates(e);

        this._trackCrosshairs(coords);

        if (this._plotArea.hover) {
            this._plotArea.hover(this, e);
        }

        if (this._sharedTooltip()) {
            this._trackSharedTooltip(coords, e);
        }
    };

    Chart.prototype._trackCrosshairs = function _trackCrosshairs (coords) {
        var crosshairs = this._plotArea.crosshairs;

        for (var i = 0; i < crosshairs.length; i++) {
            var current = crosshairs[i];

            if (current.box.containsPoint(coords)) {
                current.showAt(coords);
            } else {
                current.hide();
            }
        }
    };

    Chart.prototype._trackSharedTooltip = function _trackSharedTooltip (coords, e) {
        var ref = this;
        var tooltipOptions = ref.options.tooltip;
        var plotArea = ref._plotArea;
        var categoryAxis = ref._plotArea.categoryAxis;
        var tooltip = ref._tooltip;
        var highlight = ref._highlight;

        if (plotArea.box.containsPoint(coords)) {
            var index = categoryAxis.pointCategoryIndex(coords);
            if (index !== this._tooltipCategoryIx) {
                var points = plotArea.pointsByCategoryIndex(index);

                var pointArgs = points.map(function(point) {
                    return point.eventArgs(e);
                });

                var hoverArgs = pointArgs[0] || {};
                hoverArgs.categoryPoints = pointArgs;

                if (points.length > 0 && !this.trigger(SERIES_HOVER, hoverArgs)) {
                    if (tooltipOptions.visible) {
                        tooltip.showAt(points, coords);
                    }

                    highlight.show(points);
                } else {
                    tooltip.hide();
                }

                this._tooltipCategoryIx = index;
            }
        }
    };

    Chart.prototype.hideElements = function hideElements () {
        var ref = this;
        var plotArea = ref._plotArea;
        var tooltip = ref._tooltip;
        var highlight = ref._highlight;
        this._mousemove.cancel();

        plotArea.hideCrosshairs();

        highlight.hide();

        tooltip.hide();

        delete this._tooltipCategoryIx;
    };

    Chart.prototype._unsetActivePoint = function _unsetActivePoint () {
        var ref = this;
        var tooltip = ref._tooltip;
        var highlight = ref._highlight;

        this._activePoint = null;

        if (tooltip) {
            tooltip.hide();
        }

        if (highlight) {
            highlight.hide();
        }
    };

    Chart.prototype._deferRedraw = function _deferRedraw () {
        this._redraw();
    };

    Chart.prototype._clearRedrawTimeout = function _clearRedrawTimeout () {
        if (this._redrawTimeout) {
            clearInterval(this._redrawTimeout);
            this._redrawTimeout = null;
        }
    };

    Chart.prototype.bindCategories = function bindCategories () {
        var this$1 = this;

        var options = this.options;
        var definitions = [].concat(options.categoryAxis);

        for (var axisIx = 0; axisIx < definitions.length; axisIx++) {
            var axis = definitions[axisIx];
            if (axis.autoBind !== false) {
                this$1.bindCategoryAxisFromSeries(axis, axisIx);
            }
        }
    };

    Chart.prototype.bindCategoryAxisFromSeries = function bindCategoryAxisFromSeries (axis, axisIx) {
        var this$1 = this;

        var series = this.options.series;
        var seriesLength = series.length;
        var uniqueCategories = {};
        var items = [];
        var dateAxis;

        for (var seriesIx = 0; seriesIx < seriesLength; seriesIx++) {
            var s = series[seriesIx];
            var onAxis = s.categoryAxis === axis.name || (!s.categoryAxis && axisIx === 0);
            var data = s.data;
            var dataLength = data.length;

            if (s.categoryField && onAxis && dataLength > 0) {
                dateAxis = isDateAxis(axis, getField(s.categoryField, data[0]));

                var getFn = dateAxis ? getDateField : getField;

                for (var dataIx = 0; dataIx < dataLength; dataIx++) {
                    var dataRow = data[dataIx];
                    var category = getFn(s.categoryField, dataRow, this$1.chartService.intl);

                    if (dateAxis || !uniqueCategories[category]) {
                        items.push([ category, dataRow ]);

                        if (!dateAxis) {
                            uniqueCategories[category] = true;
                        }
                    }
                }
            }
        }

        if (items.length > 0) {
            if (dateAxis) {
                items = uniqueDates(items, function(a, b) {
                    return dateComparer(a[0], b[0]);
                });
            }

            var result = transpose(items);
            axis.categories = result[0];
        }
    };

    Chart.prototype._isBindable = function _isBindable (series) {
        var valueFields = SeriesBinder.current.valueFields(series);
        var result = true;

        for (var i = 0; i < valueFields.length; i++) {
            var field = valueFields[i];
            if (field === VALUE) {
                field = "field";
            } else {
                field = field + "Field";
            }

            if (!defined(series[field])) {
                result = false;
                break;
            }
        }

        return result;
    };

    Chart.prototype._noTransitionsRedraw = function _noTransitionsRedraw () {
        var options = this.options;
        var transitionsState;

        if (options.transitions) {
            options.transitions = false;
            transitionsState = true;
        }

        this._redraw();

        if (transitionsState) {
            options.transitions = true;
        }
    };

    Chart.prototype._legendItemHover = function _legendItemHover (seriesIndex, pointIndex) {
        var ref = this;
        var plotArea = ref._plotArea;
        var highlight = ref._highlight;
        var currentSeries = (plotArea.srcSeries || plotArea.series)[seriesIndex];
        var items;

        if (inArray(currentSeries.type, [ PIE, DONUT, FUNNEL ])) {
            items = plotArea.findPoint(function(point) {
                return point.series.index === seriesIndex && point.index === pointIndex;
            });
        } else {
            items = plotArea.pointsBySeriesIndex(seriesIndex);
        }

        highlight.show(items);
    };

    Chart.prototype._shouldAttachMouseMove = function _shouldAttachMouseMove () {
        return this._plotArea.crosshairs.length || (this._tooltip && this._sharedTooltip()) || this.requiresHandlers([ PLOT_AREA_HOVER ]);
    };

    Chart.prototype.updateMouseMoveHandler = function updateMouseMoveHandler () {
        var obj;
        unbindEvents(this.element, ( obj = {}, obj[ MOUSEMOVE ] = this._mousemove, obj ));

        if (this._shouldAttachMouseMove()) {
            var obj$1;
            bindEvents(this.element, ( obj$1 = {}, obj$1[ MOUSEMOVE ] = this._mousemove, obj$1 ));
        }
    };

    Chart.prototype.applyOptions = function applyOptions (options, theme) {
        clearMissingValues(this._originalOptions, options);
        this._originalOptions = deepExtend(this._originalOptions, options);
        this.options = deepExtend({}, this._originalOptions);

        if (theme) {
            this._theme = theme;
            this.chartService.theme = theme;
        }
        this._initTheme(this.options, this._theme);
    };

    Chart.prototype.setOptions = function setOptions (options, theme) {
        this.applyOptions(options, theme);
        this.bindCategories();
        this.redraw();
        this.updateMouseMoveHandler();

        this._toggleDomDrag();
        this._toggleDomZoom();
    };

    Chart.prototype.destroy = function destroy () {
        this._destroyed = true;

        var obj;
        unbindEvents(this.element, ( obj = {}, obj[ CONTEXTMENU ] = this._clickHandler, obj[ MOUSEWHEEL ] = this._mousewheelHandler, obj[ MOUSEMOVE ] = this._mousemove, obj ));

        if (this.domEvents) {
            this.domEvents.destroy();
            delete this.domEvents;
        }

        var obj$1;
        unbindEvents(document, ( obj$1 = {}, obj$1[ MOUSEMOVE ] = this._mouseMoveTrackHandler, obj$1 ));

        this._destroyView();

        if (this.surface) {
            this.surface.destroy();
            this.surface = null;
        }

        this._clearRedrawTimeout();
    };

    Chart.prototype._destroyView = function _destroyView () {
        var ref = this;
        var model = ref._model;
        var selections = ref._selections;

        if (model) {
            model.destroy();
            this._model = null;
        }

        if (selections) {
            while (selections.length > 0) {
                selections.shift().destroy();
            }
        }

        this._unsetActivePoint();

        if (this._tooltip) {
            this._tooltip.destroy();
        }

        if (this._highlight) {
            this._highlight.destroy();
        }

        if (this._zoomSelection) {
            this._zoomSelection.destroy();
            delete this._zoomSelection;
        }

        if (this._pannable) {
            this._pannable.destroy();
            delete this._pannable;
        }

        if (this._mousewheelZoom) {
            this._mousewheelZoom.destroy();
            delete this._mousewheelZoom;
        }
    };

    return Chart;
}(_progress_kendoDrawing.Class));

function resolveAxisAliases(options) {
    var aliases = AXIS_NAMES;

    for (var idx = 0; idx < aliases.length; idx++) {
        var alias = aliases[idx] + "Axes";
        if (options[alias]) {
            options[aliases[idx] + "Axis"] = options[alias];
            delete options[alias];
        }
    }
}

function pointByCategoryName(points, name) {
    if (points) {
        for (var idx = 0; idx < points.length; idx++) {
            if (points[idx].category === name) {
                return [ points[idx] ];
            }
        }
    }
}

function applyAxisDefaults(options, themeOptions) {
    var themeAxisDefaults = ((themeOptions || {}).axisDefaults) || {};
    var axisName, axisDefaults, axes;

    function mapAxisOptions(axisOptions) {
        var axisColor = (axisOptions || {}).color || axisDefaults.color;
        var result = deepExtend({},
            themeAxisDefaults,
            themeAxisDefaults[axisName],
            axisDefaults,
            axisDefaults[axisName], {
                line: { color: axisColor },
                labels: { color: axisColor },
                title: { color: axisColor }
            },
            axisOptions
        );

        delete result[axisName];

        return result;
    }

    for (var idx = 0; idx < AXIS_NAMES.length; idx++) {
        axisName = AXIS_NAMES[idx] + "Axis";
        axisDefaults = options.axisDefaults || {};
        axes = [].concat(options[axisName]);

        axes = axes.map(mapAxisOptions);

        options[axisName] = axes.length > 1 ? axes : axes[0];
    }
}

function applySeriesDefaults(options, themeOptions) {
    var series = options.series;
    var seriesLength = series.length;
    var seriesDefaults = options.seriesDefaults;
    var commonDefaults = deepExtend({}, options.seriesDefaults);
    var themeSeriesDefaults = themeOptions ? deepExtend({}, themeOptions.seriesDefaults) : {};
    var commonThemeDefaults = deepExtend({}, themeSeriesDefaults);

    cleanupNestedSeriesDefaults(commonDefaults);
    cleanupNestedSeriesDefaults(commonThemeDefaults);

    for (var i = 0; i < seriesLength; i++) {
        var seriesType = series[i].type || options.seriesDefaults.type;

        var baseOptions = deepExtend(
            { data: [] },
            commonThemeDefaults,
            themeSeriesDefaults[seriesType],
            { tooltip: options.tooltip },
            commonDefaults,
            seriesDefaults[seriesType]
        );

        series[i]._defaults = baseOptions;
        series[i] = deepExtend({}, baseOptions, series[i]);
    }
}

function cleanupNestedSeriesDefaults(seriesDefaults) {
    delete seriesDefaults.bar;
    delete seriesDefaults.column;
    delete seriesDefaults.rangeColumn;
    delete seriesDefaults.line;
    delete seriesDefaults.verticalLine;
    delete seriesDefaults.pie;
    delete seriesDefaults.donut;
    delete seriesDefaults.area;
    delete seriesDefaults.verticalArea;
    delete seriesDefaults.scatter;
    delete seriesDefaults.scatterLine;
    delete seriesDefaults.bubble;
    delete seriesDefaults.candlestick;
    delete seriesDefaults.ohlc;
    delete seriesDefaults.boxPlot;
    delete seriesDefaults.bullet;
    delete seriesDefaults.verticalBullet;
    delete seriesDefaults.polarArea;
    delete seriesDefaults.polarLine;
    delete seriesDefaults.radarArea;
    delete seriesDefaults.radarLine;
    delete seriesDefaults.waterfall;
}


function axisRanges(axes) {
    var ranges = {};

    for (var i = 0; i < axes.length; i++) {
        var axis = axes[i];
        var axisName = axis.options.name;
        if (axisName) {
            ranges[axisName] = axis.range();
        }
    }

    return ranges;
}

function sortDates(dates, comparer) {
    if ( comparer === void 0 ) comparer = dateComparer;

    for (var i = 1, length = dates.length; i < length; i++) {
        if (comparer(dates[i], dates[i - 1]) < 0) {
            dates.sort(comparer);
            break;
        }
    }

    return dates;
}

function uniqueDates(srcDates, comparer) {
    if ( comparer === void 0 ) comparer = dateComparer;

    var dates = sortDates(srcDates, comparer);
    var length = dates.length;
    var result = length > 0 ? [ dates[0] ] : [];

    for (var i = 1; i < length; i++) {
        if (comparer(dates[i], last(result)) !== 0) {
            result.push(dates[i]);
        }
    }

    return result;
}

function transpose(rows) {
    var rowCount = rows.length;
    var result = [];

    for (var rowIx = 0; rowIx < rowCount; rowIx++) {
        var row = rows[rowIx];
        var colCount = row.length;

        for (var colIx = 0; colIx < colCount; colIx++) {
            result[colIx] = result[colIx] || [];
            result[colIx].push(row[colIx]);
        }
    }

    return result;
}

function clearMissingValues(originalOptions, options) {
    for (var field in options) {
        var fieldValue = options[field];
        var originalValue = originalOptions[field];
        if (defined(originalValue)) {
            var nullValue = fieldValue === null;
            if ((nullValue || !defined(fieldValue))) {
                delete originalOptions[field];
                if (nullValue) {
                    delete options[field];
                }
            } else if (originalValue && isObject(fieldValue)) {
                if (isObject(originalValue)) {
                    clearMissingValues(originalValue, fieldValue);
                }
            }
        }
    }
}

setDefaultOptions(Chart, {
    renderAs: "",
    chartArea: {},
    legend: {
        visible: true,
        labels: {}
    },
    categoryAxis: {},
    seriesDefaults: {
        type: COLUMN,
        data: [],
        highlight: {
            visible: true
        },
        labels: {},
        negativeValues: {
            visible: false
        }
    },
    series: [],
    seriesColors: null,
    tooltip: {
        visible: false
    },
    transitions: true,
    valueAxis: {},
    plotArea: {},
    title: {},
    xAxis: {},
    yAxis: {},
    panes: [ {} ],
    pannable: false,
    zoomable: false
});

var TOP_OFFSET = -2;

var SharedTooltip$1 = (function (ChartSharedTooltip) {
    function SharedTooltip$$1 () {
        ChartSharedTooltip.apply(this, arguments);
    }

    if ( ChartSharedTooltip ) SharedTooltip$$1.__proto__ = ChartSharedTooltip;
    SharedTooltip$$1.prototype = Object.create( ChartSharedTooltip && ChartSharedTooltip.prototype );
    SharedTooltip$$1.prototype.constructor = SharedTooltip$$1;

    SharedTooltip$$1.prototype._slotAnchor = function _slotAnchor (coords, slot) {
        var axis = this.plotArea.categoryAxis;
        var vertical = axis.options.vertical;
        var align = vertical ? {
            horizontal: "left",
            vertical: "center"
        } : {
            horizontal: "center",
            vertical: "bottom"
        };

        var point;

        if (vertical) {
            point = new Point(this.plotArea.box.x2, slot.center().y);
        } else {
            point = new Point(slot.center().x, TOP_OFFSET);
        }

        return {
            point: point,
            align: align
        };
    };

    SharedTooltip$$1.prototype._defaultAnchor = function _defaultAnchor (point, slot) {
        return this._slotAnchor({}, slot);
    };

    return SharedTooltip$$1;
}(SharedTooltip));

var DEAULT_BAR_WIDTH = 150;
var DEAULT_BULLET_WIDTH = 150;
var NO_CROSSHAIR = [ BAR, BULLET ];

function hide$1(children) {
    var state = [];
    for (var idx = 0; idx < children.length; idx++) {
        var child = children[idx];
        state[idx] = child.style.display;
        child.style.display = "none";
    }

    return state;
}

function show$1(children, state) {
    for (var idx = 0; idx < children.length; idx++) {
        children[idx].style.display = state[idx];
    }
}

function wrapNumber(value) {
    return isNumber(value) ? [ value ] : value;
}

var Sparkline = (function (Chart$$1) {
    function Sparkline () {
        Chart$$1.apply(this, arguments);
    }

    if ( Chart$$1 ) Sparkline.__proto__ = Chart$$1;
    Sparkline.prototype = Object.create( Chart$$1 && Chart$$1.prototype );
    Sparkline.prototype.constructor = Sparkline;

    Sparkline.prototype._setElementClass = function _setElementClass (element) {
        addClass(element, 'k-sparkline');
    };

    Sparkline.prototype._initElement = function _initElement (element) {
        Chart$$1.prototype._initElement.call(this, element);

        this._initialWidth = Math.floor(elementSize$1(element).width);
    };

    Sparkline.prototype._resize = function _resize () {
        var element = this.element;
        var state = hide$1(element.childNodes);

        this._initialWidth = Math.floor(elementSize$1(element).width);

        show$1(element.childNodes, state);

        Chart$$1.prototype._resize.call(this);
    };

    Sparkline.prototype._modelOptions = function _modelOptions () {
        var chartOptions = this.options;
        var stage = this._surfaceWrap();
        var displayState = hide$1(stage.childNodes);

        var space = document.createElement('span');
        space.innerHTML = '&nbsp;';

        stage.appendChild(space);

        var options = deepExtend({
            width: this._autoWidth,
            height: elementSize$1(stage).height,
            transitions: chartOptions.transitions
        }, chartOptions.chartArea, {
            inline: true,
            align: false
        });

        elementSize$1(stage, {
            width: options.width,
            height: options.height
        });

        stage.removeChild(space);

        show$1(stage.childNodes, displayState);
        this.surface.resize();

        return options;
    };

    Sparkline.prototype._surfaceWrap = function _surfaceWrap () {
        if (!this.stage) {
            var stage = this.stage = document.createElement('span');
            this.element.appendChild(stage);
        }
        return this.stage;
    };

    Sparkline.prototype._createPlotArea = function _createPlotArea (skipSeries) {
        var plotArea = Chart$$1.prototype._createPlotArea.call(this, skipSeries);
        this._autoWidth = this._initialWidth || this._calculateWidth(plotArea);

        return plotArea;
    };

    Sparkline.prototype._calculateWidth = function _calculateWidth (plotArea) {
        var options = this.options;
        var margin = getSpacing(options.chartArea.margin);
        var charts = plotArea.charts;
        var stage = this._surfaceWrap();
        var total = 0;


        for (var i = 0; i < charts.length; i++) {
            var currentChart = charts[i];
            var firstSeries = (currentChart.options.series || [])[0];
            if (!firstSeries) {
                continue;
            }

            if (firstSeries.type === BAR) {
                return DEAULT_BAR_WIDTH;
            }

            if (firstSeries.type === BULLET) {
                return DEAULT_BULLET_WIDTH;
            }

            if (firstSeries.type === PIE) {
                return elementSize$1(stage).height;
            }

            var categoryAxis = currentChart.categoryAxis;
            if (categoryAxis) {
                var pointsCount = categoryAxis.options.categories.length *
                    (!currentChart.options.isStacked && inArray(firstSeries.type, [ COLUMN, VERTICAL_BULLET ]) ? currentChart.seriesOptions.length : 1);

                total = Math.max(total, pointsCount);
            }
        }

        var size = total * options.pointWidth;
        if (size > 0) {
            size += margin.left + margin.right;
        }

        return size;
    };

    Sparkline.prototype._createSharedTooltip = function _createSharedTooltip (options) {
        return new SharedTooltip$1(this._plotArea, options);
    };

    Sparkline.normalizeOptions = function normalizeOptions (userOptions) {
        var options = wrapNumber(userOptions);

        if (isArray(options)) {
            options = { seriesDefaults: { data: options } };
        } else {
            options = deepExtend({}, options);
        }

        if (!options.series) {
            options.series = [ { data: wrapNumber(options.data) } ];
        }

        deepExtend(options, {
            seriesDefaults: {
                type: options.type
            }
        });

        if (inArray(options.series[0].type, NO_CROSSHAIR) ||
            inArray(options.seriesDefaults.type, NO_CROSSHAIR)) {
            options = deepExtend({}, {
                categoryAxis: {
                    crosshair: {
                        visible: false
                    }
                }
            }, options);
        }

        return options;
    };

    return Sparkline;
}(Chart));

setDefaultOptions(Sparkline, {
    chartArea: {
        margin: 2
    },
    axisDefaults: {
        visible: false,
        majorGridLines: {
            visible: false
        },
        valueAxis: {
            narrowRange: true
        }
    },
    seriesDefaults: {
        type: "line",
        area: {
            line: {
                width: 0.5
            }
        },
        bar: {
            stack: true
        },
        padding: 2,
        width: 0.5,
        overlay: {
            gradient: null
        },
        highlight: {
            visible: false
        },
        border: {
            width: 0
        },
        markers: {
            size: 2,
            visible: false
        }
    },
    tooltip: {
        visible: true,
        shared: true
    },
    categoryAxis: {
        crosshair: {
            visible: true,
            tooltip: {
                visible: false
            }
        }
    },
    legend: {
        visible: false
    },
    transitions: false,

    pointWidth: 5,

    panes: [ { clip: false } ]
});

var FadeOutAnimation = (function (superclass) {
    function FadeOutAnimation () {
        superclass.apply(this, arguments);
    }

    if ( superclass ) FadeOutAnimation.__proto__ = superclass;
    FadeOutAnimation.prototype = Object.create( superclass && superclass.prototype );
    FadeOutAnimation.prototype.constructor = FadeOutAnimation;

    FadeOutAnimation.prototype.setup = function setup () {
        this._initialOpacity = parseFloat(elementStyles(this.element, 'opacity').opacity);
    };

    FadeOutAnimation.prototype.step = function step (pos) {
        elementStyles(this.element, {
            opacity: String(interpolateValue(this._initialOpacity, 0, pos))
        });
    };

    FadeOutAnimation.prototype.abort = function abort () {
        superclass.prototype.abort.call(this);
        elementStyles(this.element, {
            display: 'none',
            opacity: String(this._initialOpacity)
        });
    };

    FadeOutAnimation.prototype.cancel = function cancel () {
        superclass.prototype.abort.call(this);
        elementStyles(this.element, {
            opacity: String(this._initialOpacity)
        });
    };

    return FadeOutAnimation;
}(_progress_kendoDrawing.drawing.Animation));

function createDiv$1(className, style) {
    var div = document.createElement("div");
    div.className = className;
    if (style) {
        div.style.cssText = style;
    }

    return div;
}

var NavigatorHint = (function (Class$$1) {
    function NavigatorHint(container, chartService, options) {
        Class$$1.call(this);

        this.options = deepExtend({}, this.options, options);
        this.container = container;
        this.chartService = chartService;

        var padding = elementStyles(container, [ "paddingLeft", "paddingTop" ]);
        this.chartPadding = {
            top: padding.paddingTop,
            left: padding.paddingLeft
        };

        this.createElements();
        container.appendChild(this.element);
    }

    if ( Class$$1 ) NavigatorHint.__proto__ = Class$$1;
    NavigatorHint.prototype = Object.create( Class$$1 && Class$$1.prototype );
    NavigatorHint.prototype.constructor = NavigatorHint;

    NavigatorHint.prototype.createElements = function createElements () {
        var element = this.element = createDiv$1('k-navigator-hint', 'display: none; position: absolute; top: 1px; left: 1px;');
        var tooltip = this.tooltip = createDiv$1('k-tooltip k-chart-tooltip');
        var scroll = this.scroll = createDiv$1('k-scroll');

        tooltip.innerHTML = '&nbsp;';

        element.appendChild(tooltip);
        element.appendChild(scroll);
    };

    NavigatorHint.prototype.show = function show (from, to, bbox) {
        var ref = this;
        var element = ref.element;
        var options = ref.options;
        var scroll = ref.scroll;
        var tooltip = ref.tooltip;
        var middle = toDate(toTime(from) + toTime(to - from) / 2);
        var scrollWidth = bbox.width() * 0.4;
        var minPos = bbox.center().x - scrollWidth;
        var maxPos = bbox.center().x;
        var posRange = maxPos - minPos;
        var range = options.max - options.min;
        var scale = posRange / range;
        var offset = middle - options.min;
        var text = this.chartService.intl.format(options.format, from, to);
        var template = getTemplate(options);

        this.clearHideTimeout();

        if (!this._visible) {
            elementStyles(element, {
                visibility: 'hidden',
                display: 'block'
            });
            this._visible = true;
        }

        if (template) {
            text = template({
                from: from,
                to: to
            });
        }

        tooltip.innerHTML = text;
        elementStyles(tooltip, {
            left: bbox.center().x - tooltip.offsetWidth / 2,
            top: bbox.y1
        });

        var tooltipStyle = elementStyles(tooltip, [ 'marginTop', 'borderTopWidth', 'height' ]);

        elementStyles(scroll, {
            width: scrollWidth,
            left: minPos + offset * scale,
            top: bbox.y1 + tooltipStyle.marginTop + tooltipStyle.borderTopWidth + tooltipStyle.height / 2
        });

        elementStyles(element, {
            visibility: 'visible'
        });
    };

    NavigatorHint.prototype.clearHideTimeout = function clearHideTimeout () {
        if (this._hideTimeout) {
            clearTimeout(this._hideTimeout);
        }

        if (this._hideAnimation) {
            this._hideAnimation.cancel();
        }
    };

    NavigatorHint.prototype.hide = function hide () {
        var this$1 = this;

        this.clearHideTimeout();

        this._hideTimeout = setTimeout(function () {
            this$1._visible = false;
            this$1._hideAnimation = new FadeOutAnimation(this$1.element);
            this$1._hideAnimation.setup();
            this$1._hideAnimation.play();
        }, this.options.hideDelay);
    };

    NavigatorHint.prototype.destroy = function destroy () {
        this.clearHideTimeout();
        if (this.container) {
            this.container.removeChild(this.element);
        }
        delete this.container;
        delete this.chartService;
        delete this.element;
        delete this.tooltip;
        delete this.scroll;
    };

    return NavigatorHint;
}(_progress_kendoDrawing.Class));

setDefaultOptions(NavigatorHint, {
    format: "{0:d} - {1:d}",
    hideDelay: 500
});

var NAVIGATOR_PANE = "_navigator";
var NAVIGATOR_AXIS = NAVIGATOR_PANE;



var constants = Object.freeze({
	NAVIGATOR_AXIS: NAVIGATOR_AXIS,
	NAVIGATOR_PANE: NAVIGATOR_PANE
});

var ZOOM_ACCELERATION$1 = 3;

var Navigator = (function (Class$$1) {
    function Navigator(chart) {
        Class$$1.call(this);

        this.chart = chart;
        var options = this.options = deepExtend({}, this.options, chart.options.navigator);
        var select = options.select;
        if (select) {
            select.from = this.parseDate(select.from);
            select.to = this.parseDate(select.to);
        }

        if (!defined(options.hint.visible)) {
            options.hint.visible = options.visible;
        }

        var obj;
        this.chartObserver = new InstanceObserver(this, ( obj = {}, obj[DRAG] = '_drag', obj[DRAG_END] = '_dragEnd', obj[ZOOM] = '_zoom', obj[ZOOM_END] = '_zoomEnd', obj ));
        chart.addObserver(this.chartObserver);
    }

    if ( Class$$1 ) Navigator.__proto__ = Class$$1;
    Navigator.prototype = Object.create( Class$$1 && Class$$1.prototype );
    Navigator.prototype.constructor = Navigator;

    Navigator.prototype.parseDate = function parseDate$1 (value) {
        return parseDate(this.chart.chartService.intl, value);
    };

    Navigator.prototype.destroy = function destroy () {
        if (this.chart) {
            this.chart.removeObserver(this.chartObserver);
            delete this.chart;
        }

        if (this.selection) {
            this.selection.destroy();
            delete this.selection;
        }

        if (this.hint) {
            this.hint.destroy();
            delete this.hint;
        }
    };

    Navigator.prototype.redraw = function redraw () {
        this._redrawSelf();
        this.initSelection();
    };

    Navigator.prototype.initSelection = function initSelection () {
        var ref = this;
        var chart = ref.chart;
        var options = ref.options;
        var axis = this.mainAxis();
        var ref$1 = axis.range();
        var min = ref$1.min;
        var max = ref$1.max;
        var ref$2 = options.select;
        var from = ref$2.from;
        var to = ref$2.to;
        var mousewheel = ref$2.mousewheel;
        var axisClone = clone$1(axis);
        var groups = axis.options.categories;
        var selection = this.selection;

        if (groups.length === 0) {
            return;
        }

        if (selection) {
            selection.destroy();
        }

        // "Freeze" the selection axis position until the next redraw
        axisClone.box = axis.box;

        selection = this.selection = new Selection(chart, axisClone, {
            min: min,
            max: max,
            from: from || min,
            to: to || max,
            mousewheel: valueOrDefault(mousewheel, { zoom: "left" }),
            visible: options.visible
        }, new InstanceObserver(this, {
            selectStart: '_selectStart',
            select: '_select',
            selectEnd: '_selectEnd'
        }));

        if (this.hint) {
            this.hint.destroy();
        }

        if (options.hint.visible) {
            this.hint = new NavigatorHint(chart.element, chart.chartService, {
                min: min,
                max: max,
                template: getTemplate(options.hint),
                format: options.hint.format
            });
        }
    };

    Navigator.prototype.setRange = function setRange () {
        var plotArea = this.chart._createPlotArea(true);
        var axis = plotArea.namedCategoryAxes[NAVIGATOR_AXIS];

        var ref = axis.range();
        var min = ref.min;
        var max = ref.max;

        var select = this.options.select || {};
        var from = select.from || min;
        if (from < min) {
            from = min;
        }

        var to = select.to || max;
        if (to > max) {
            to = max;
        }

        this.options.select = deepExtend({}, select, {
            from: from,
            to: to
        });

        this.filterAxes();
    };

    Navigator.prototype._redrawSelf = function _redrawSelf (silent) {
        var plotArea = this.chart._plotArea;

        if (plotArea) {
            plotArea.redraw(last(plotArea.panes), silent);
        }
    };

    Navigator.prototype.redrawSlaves = function redrawSlaves () {
        var chart = this.chart;
        var plotArea = chart._plotArea;
        var slavePanes = plotArea.panes.slice(0, -1);

        // Update the original series and categoryAxis before partial refresh.
        plotArea.srcSeries = chart.options.series;
        plotArea.options.categoryAxis = chart.options.categoryAxis;

        plotArea.redraw(slavePanes);
    };

    Navigator.prototype._drag = function _drag (e) {
        var ref = this;
        var chart = ref.chart;
        var selection = ref.selection;
        var coords = chart._eventCoordinates(e.originalEvent);
        var navigatorAxis = this.mainAxis();
        var naviRange = navigatorAxis.datesRange();
        var inNavigator = navigatorAxis.pane.box.containsPoint(coords);
        var axis = chart._plotArea.categoryAxis;
        var range = e.axisRanges[axis.options.name];
        var select = this.options.select;
        var duration$$1;

        if (!range || inNavigator || !selection) {
            return;
        }

        if (select.from && select.to) {
            duration$$1 = toTime(select.to) - toTime(select.from);
        } else {
            duration$$1 = toTime(selection.options.to) - toTime(selection.options.from);
        }

        var from = toDate(limitValue(
            toTime(range.min),
            naviRange.min, toTime(naviRange.max) - duration$$1
        ));

        var to = toDate(limitValue(
            toTime(from) + duration$$1,
            toTime(naviRange.min) + duration$$1, naviRange.max
        ));

        this.options.select = { from: from, to: to };

        if (this.options.liveDrag) {
            this.filterAxes();
            this.redrawSlaves();
        }

        selection.set(from, to);

        this.showHint(from, to);
    };

    Navigator.prototype._dragEnd = function _dragEnd () {
        this.filterAxes();
        this.filter();
        this.redrawSlaves();

        if (this.hint) {
            this.hint.hide();
        }
    };

    Navigator.prototype.readSelection = function readSelection () {
        var ref = this;
        var ref_selection_options = ref.selection.options;
        var from = ref_selection_options.from;
        var to = ref_selection_options.to;
        var select = ref.options.select;

        select.from = from;
        select.to = to;
    };

    Navigator.prototype.filterAxes = function filterAxes () {
        var ref = this;
        var select = ref.options.select; if ( select === void 0 ) select = { };
        var chart = ref.chart;
        var allAxes = chart.options.categoryAxis;
        var from = select.from;
        var to = select.to;

        for (var idx = 0; idx < allAxes.length; idx++) {
            var axis = allAxes[idx];
            if (axis.pane !== NAVIGATOR_PANE) {
                axis.min = from;
                axis.max = to;
            }
        }
    };

    Navigator.prototype.filter = function filter () {
        var ref = this;
        var chart = ref.chart;
        var select = ref.options.select;
        if (chart.requiresHandlers([ "navigatorFilter" ])) {
            var axisOptions = new DateCategoryAxis(deepExtend({
                baseUnit: "fit"
            }, chart.options.categoryAxis[0], {
                categories: [ select.from, select.to ]
            }), chart.chartService).options;

            this.chart.trigger("navigatorFilter", {
                from: addDuration(axisOptions.min, -axisOptions.baseUnitStep, axisOptions.baseUnit),
                to: addDuration(axisOptions.max, axisOptions.baseUnitStep, axisOptions.baseUnit)
            });
        }
    };

    Navigator.prototype._zoom = function _zoom (e) {
        var ref = this;
        var axis = ref.chart._plotArea.categoryAxis;
        var selection = ref.selection;
        var ref_options = ref.options;
        var select = ref_options.select;
        var liveDrag = ref_options.liveDrag;
        var categories = this.mainAxis().options.categories;
        var delta = e.delta;

        if (!selection) {
            return;
        }

        var fromIx = lteDateIndex(selection.options.from, categories);
        var toIx = lteDateIndex(selection.options.to, categories);

        e.originalEvent.preventDefault();

        if (Math.abs(delta) > 1) {
            delta *= ZOOM_ACCELERATION$1;
        }

        if (toIx - fromIx > 1) {
            selection.expand(delta);
            this.readSelection();
        } else {
            axis.options.min = select.from;
            select.from = axis.scaleRange(-e.delta).min;
        }

        if (liveDrag) {
            this.filterAxes();
            this.redrawSlaves();
        }

        selection.set(select.from, select.to);

        this.showHint(this.options.select.from, this.options.select.to);
    };

    Navigator.prototype._zoomEnd = function _zoomEnd (e) {
        this._dragEnd(e);
    };

    Navigator.prototype.showHint = function showHint (from, to) {
        var plotArea = this.chart._plotArea;

        if (this.hint) {
            this.hint.show(from, to, plotArea.backgroundBox());
        }
    };

    Navigator.prototype._selectStart = function _selectStart (e) {
        return this.chart._selectStart(e);
    };

    Navigator.prototype._select = function _select (e) {
        this.showHint(e.from, e.to);

        return this.chart._select(e);
    };

    Navigator.prototype._selectEnd = function _selectEnd (e) {
        if (this.hint) {
            this.hint.hide();
        }

        this.readSelection();
        this.filterAxes();
        this.filter();
        this.redrawSlaves();

        return this.chart._selectEnd(e);
    };

    Navigator.prototype.mainAxis = function mainAxis () {
        var plotArea = this.chart._plotArea;

        if (plotArea) {
            return plotArea.namedCategoryAxes[NAVIGATOR_AXIS];
        }
    };

    Navigator.prototype.select = function select (from, to) {
        var select = this.options.select;

        if (from && to) {
            select.from = this.parseDate(from);
            select.to = this.parseDate(to);

            this.filterAxes();
            this.filter();
            this.redrawSlaves();

            this.selection.set(from, to);
        }

        return {
            from: select.from,
            to: select.to
        };
    };

    Navigator.setup = function setup (options, themeOptions) {
        if ( options === void 0 ) options = {};
        if ( themeOptions === void 0 ) themeOptions = {};

        if (options.__navi) {
            return;
        }
        options.__navi = true;

        var naviOptions = deepExtend({}, themeOptions.navigator, options.navigator);
        var panes = options.panes = [].concat(options.panes);
        var paneOptions = deepExtend({}, naviOptions.pane, { name: NAVIGATOR_PANE });

        if (!naviOptions.visible) {
            paneOptions.visible = false;
            paneOptions.height = 0.1;
        }

        panes.push(paneOptions);

        Navigator.attachAxes(options, naviOptions);
        Navigator.attachSeries(options, naviOptions, themeOptions);
    };

    Navigator.attachAxes = function attachAxes (options, naviOptions) {
        var series = naviOptions.series || [];
        var categoryAxes = options.categoryAxis = [].concat(options.categoryAxis);
        var valueAxes = options.valueAxis = [].concat(options.valueAxis);

        var equallySpacedSeries = filterSeriesByType(series, EQUALLY_SPACED_SERIES);
        var justifyAxis = equallySpacedSeries.length === 0;

        var base = deepExtend({
            type: "date",
            pane: NAVIGATOR_PANE,
            roundToBaseUnit: !justifyAxis,
            justified: justifyAxis,
            _collapse: false,
            majorTicks: { visible: true },
            tooltip: { visible: false },
            labels: { step: 1 },
            autoBind: naviOptions.autoBindElements,
            autoBaseUnitSteps: {
                minutes: [ 1 ],
                hours: [ 1, 2 ],
                days: [ 1, 2 ],
                weeks: [],
                months: [ 1 ],
                years: [ 1 ]
            }
        });
        var user = naviOptions.categoryAxis;

        categoryAxes.push(
            deepExtend({}, base, {
                maxDateGroups: 200
            }, user, {
                name: NAVIGATOR_AXIS,
                title: null,
                baseUnit: "fit",
                baseUnitStep: "auto",
                labels: { visible: false },
                majorTicks: { visible: false }
            }), deepExtend({}, base, user, {
                name: NAVIGATOR_AXIS + "_labels",
                maxDateGroups: 20,
                baseUnitStep: "auto",
                plotBands: [],
                autoBaseUnitSteps: {
                    minutes: []
                },
                _overlap: true
            }), deepExtend({}, base, user, {
                name: NAVIGATOR_AXIS + "_ticks",
                maxDateGroups: 200,
                majorTicks: {
                    width: 0.5
                },
                plotBands: [],
                title: null,
                labels: { visible: false, mirror: true },
                _overlap: true
            })
        );

        valueAxes.push(deepExtend({
            name: NAVIGATOR_AXIS,
            pane: NAVIGATOR_PANE,
            majorGridLines: {
                visible: false
            },
            visible: false
        }, naviOptions.valueAxis));
    };

    Navigator.attachSeries = function attachSeries (options, naviOptions, themeOptions) {
        var series = options.series = options.series || [];
        var navigatorSeries = [].concat(naviOptions.series || []);
        var seriesColors = themeOptions.seriesColors;
        var defaults = naviOptions.seriesDefaults;

        for (var idx = 0; idx < navigatorSeries.length; idx++) {
            series.push(
                deepExtend({
                    color: seriesColors[idx % seriesColors.length],
                    categoryField: naviOptions.dateField,
                    visibleInLegend: false,
                    tooltip: {
                        visible: false
                    }
                }, defaults, navigatorSeries[idx], {
                    axis: NAVIGATOR_AXIS,
                    categoryAxis: NAVIGATOR_AXIS,
                    autoBind: naviOptions.autoBindElements
                })
            );
        }
    };

    return Navigator;
}(_progress_kendoDrawing.Class));

function ClonedObject() { }
function clone$1(obj) {
    ClonedObject.prototype = obj;
    return new ClonedObject();
}

var AUTO_CATEGORY_WIDTH = 28;

var StockChart = (function (Chart$$1) {
    function StockChart () {
        Chart$$1.apply(this, arguments);
    }

    if ( Chart$$1 ) StockChart.__proto__ = Chart$$1;
    StockChart.prototype = Object.create( Chart$$1 && Chart$$1.prototype );
    StockChart.prototype.constructor = StockChart;

    StockChart.prototype.applyDefaults = function applyDefaults (options, themeOptions) {
        var width = elementSize$1(this.element).width || DEFAULT_WIDTH;
        var theme = themeOptions;

        var stockDefaults = {
            seriesDefaults: {
                categoryField: options.dateField
            },
            axisDefaults: {
                categoryAxis: {
                    name: "default",
                    majorGridLines: {
                        visible: false
                    },
                    labels: {
                        step: 2
                    },
                    majorTicks: {
                        visible: false
                    },
                    maxDateGroups: Math.floor(width / AUTO_CATEGORY_WIDTH)
                }
            }
        };

        if (theme) {
            theme = deepExtend({}, theme, stockDefaults);
        }

        Navigator.setup(options, theme);

        Chart$$1.prototype.applyDefaults.call(this, options, theme);
    };

    StockChart.prototype._setElementClass = function _setElementClass (element) {
        addClass(element, 'k-chart k-stockchart');
    };

    StockChart.prototype.setOptions = function setOptions (options) {
        this.destroyNavigator();
        Chart$$1.prototype.setOptions.call(this, options);
    };

    StockChart.prototype._resize = function _resize () {
        var transitions = this.options.transitions;

        this.options.transitions = false;
        this._fullRedraw();
        this.options.transitions = transitions;
    };

    StockChart.prototype._redraw = function _redraw () {
        var navigator = this.navigator;

        if (!this._dirty() && navigator && navigator.options.partialRedraw) {
            navigator.redrawSlaves();
        } else {
            this._fullRedraw();
        }
    };

    StockChart.prototype._dirty = function _dirty () {
        var options = this.options;
        var series = [].concat(options.series, options.navigator.series);
        var seriesCount = grep(series, function(s) { return s && s.visible; }).length;
        var dirty = this._seriesCount !== seriesCount;
        this._seriesCount = seriesCount;

        return dirty;
    };

    StockChart.prototype._fullRedraw = function _fullRedraw () {
        var navigator = this.navigator;

        if (!navigator) {
            navigator = this.navigator = new Navigator(this);
            this.trigger("navigatorCreated", { navigator: navigator });
        }

        navigator.setRange();
        Chart$$1.prototype._redraw.call(this);
        navigator.initSelection();
    };

    StockChart.prototype._trackSharedTooltip = function _trackSharedTooltip (coords) {
        var plotArea = this._plotArea;
        var pane = plotArea.paneByPoint(coords);

        if (pane && pane.options.name === NAVIGATOR_PANE) {
            this._unsetActivePoint();
        } else {
            Chart$$1.prototype._trackSharedTooltip.call(this, coords);
        }
    };

    StockChart.prototype.bindCategories = function bindCategories () {
        Chart$$1.prototype.bindCategories.call(this);
        this.copyNavigatorCategories();
    };

    StockChart.prototype.copyNavigatorCategories = function copyNavigatorCategories () {
        var definitions = [].concat(this.options.categoryAxis);
        var categories;

        for (var axisIx = 0; axisIx < definitions.length; axisIx++) {
            var axis = definitions[axisIx];
            if (axis.name === NAVIGATOR_AXIS) {
                categories = axis.categories;
            } else if (categories && axis.pane === NAVIGATOR_PANE) {
                axis.categories = categories;
            }
        }
    };

    StockChart.prototype.destroyNavigator = function destroyNavigator () {
        if (this.navigator) {
            this.navigator.destroy();
            this.navigator = null;
        }
    };

    StockChart.prototype.destroy = function destroy () {
        this.destroyNavigator();
        Chart$$1.prototype.destroy.call(this);
    };

    StockChart.prototype._stopDragEvent = function _stopDragEvent (e) {
        var coords = this._eventCoordinates(e);
        var pane = this._plotArea.paneByPoint(coords);

        return Chart$$1.prototype._stopDragEvent.call(this, e) || (pane && pane.options.name === NAVIGATOR_PANE);
    };

    return StockChart;
}(Chart));

setDefaultOptions(StockChart, {
    dateField: "date",
    axisDefaults: {
        categoryAxis: {
            type: "date",
            baseUnit: "fit",
            justified: true
        },
        valueAxis: {
            narrowRange: true,
            labels: {
                format: "C"
            }
        }
    },
    navigator: {
        select: {},
        seriesDefaults: {
            markers: {
                visible: false
            },
            tooltip: {
                visible: true
            },
            line: {
                width: 2
            }
        },
        hint: {},
        visible: true
    },
    tooltip: {
        visible: true
    },
    legend: {
        visible: false
    }
});

var BAR_GAP = 1.5;
var BAR_SPACING = 0.4;
var BLACK$1 = '#000';
var SANS = 'Arial, Helvetica, sans-serif';
var SANS11 = "11px " + SANS;
var SANS12 = '12px ' + SANS;
var SANS16 = '16px ' + SANS;
var TRANSPARENT = 'transparent';
var WHITE$1 = '#fff';

var notes = function () { return ({
    icon: {
        border: {
            width: 1
        }
    },
    label: {
        font: SANS12,
        padding: 3
    },
    line: {
        length: 10,
        width: 2
    },
    visible: true
}); };

var axisDefaults = function () { return ({
    labels: {
        font: SANS12
    },
    notes: notes(),
    title: {
        font: SANS16,
        margin: 5
    }
}); };

var areaSeries = function () { return ({
    highlight: {
        markers: {
            border: {}
        }
    },
    line: {
        opacity: 1,
        width: 0
    },
    markers: {
        size: 6,
        visible: false
    },
    opacity: 0.4
}); };

var barSeries = function () { return ({
    gap: BAR_GAP,
    spacing: BAR_SPACING
}); };

var boxPlotSeries = function () { return ({
    outliersField: "",
    meanField: "",
    border: {
        _brightness: 0.8,
        width: 1
    },
    downColor: WHITE$1,
    gap: 1,
    highlight: {
        border: {
            opacity: 1,
            width: 2
        },
        whiskers: {
            width: 3
        },
        mean: {
            width: 2
        },
        median: {
            width: 2
        }
    },
    mean: {
        width: 2
    },
    median: {
        width: 2
    },
    spacing: 0.3,
    whiskers: {
        width: 2
    }
}); };

var bubbleSeries = function () { return ({
    border: {
        width: 0
    },
    labels: {
        background: TRANSPARENT
    },
    opacity: 0.6
}); };

var bulletSeries = function () { return ({
    gap: BAR_GAP,
    spacing: BAR_SPACING,
    target: {
        color: "#ff0000"
    }
}); };

var candlestickSeries = function () { return ({
    border: {
        _brightness: 0.8,
        width: 1
    },
    downColor: WHITE$1,
    gap: 1,
    highlight: {
        border: {
            opacity: 1,
            width: 2
        },
        line: {
            width: 2
        }
    },
    line: {
        color: BLACK$1,
        width: 1
    },
    spacing: 0.3
}); };

var columnSeries = function () { return ({
    gap: BAR_GAP,
    spacing: BAR_SPACING
}); };

var donutSeries = function () { return ({
    margin: 1
}); };

var lineSeries = function () { return ({
    width: 2
}); };

var ohlcSeries = function () { return ({
    gap: 1,
    highlight: {
        line: {
            opacity: 1,
            width: 3
        }
    },
    line: {
        width: 1
    },
    spacing: 0.3
}); };

var radarAreaSeries = function () { return ({
    line: {
        opacity: 1,
        width: 0
    },
    markers: {
        size: 6,
        visible: false
    },
    opacity: 0.5
}); };

var radarLineSeries = function () { return ({
    markers: {
        visible: false
    },
    width: 2
}); };

var rangeBarSeries = function () { return ({
    gap: BAR_GAP,
    spacing: BAR_SPACING
}); };

var rangeColumnSeries = function () { return ({
    gap: BAR_GAP,
    spacing: BAR_SPACING
}); };

var scatterLineSeries = function () { return ({
    width: 1
}); };

var waterfallSeries = function () { return ({
    gap: 0.5,
    line: {
        color: BLACK$1,
        width: 1
    },
    spacing: BAR_SPACING
}); };

var pieSeries = function () { return ({
    labels: {
        background: '',
        color: '',
        padding: {
            top: 5,
            bottom: 5,
            left: 7,
            right: 7
        }
    }
}); };

var funnelSeries = function () { return ({
    labels: {
        background: '',
        color: '',
        padding: {
            top: 5,
            bottom: 5,
            left: 7,
            right: 7
        }
    }
}); };

var seriesDefaults = function (options) { return ({
    visible: true,
    labels: {
        font: SANS11
    },
    overlay: options.gradients ? {} : {
        gradient: "none"
    },
    area: areaSeries(),
    bar: barSeries(),
    boxPlot: boxPlotSeries(),
    bubble: bubbleSeries(),
    bullet: bulletSeries(),
    candlestick: candlestickSeries(),
    column: columnSeries(),
    pie: pieSeries(),
    donut: donutSeries(),
    funnel: funnelSeries(),
    horizontalWaterfall: waterfallSeries(),
    line: lineSeries(),
    notes: notes(),
    ohlc: ohlcSeries(),
    radarArea: radarAreaSeries(),
    radarLine: radarLineSeries(),
    polarArea: radarAreaSeries(),
    polarLine: radarLineSeries(),
    rangeBar: rangeBarSeries(),
    rangeColumn: rangeColumnSeries(),
    scatterLine: scatterLineSeries(),
    verticalArea: areaSeries(),
    verticalBoxPlot: boxPlotSeries(),
    verticalBullet: bulletSeries(),
    verticalLine: lineSeries(),
    waterfall: waterfallSeries()
}); };

var title = function () { return ({
    font: SANS16
}); };

var legend = function () { return ({
    labels: {
        font: SANS12
    }
}); };

var baseTheme = function (options) {
    if ( options === void 0 ) options = {};

    return ({
    axisDefaults: axisDefaults(),
    categoryAxis: {
        majorGridLines: {
            visible: true
        }
    },
    navigator: {
        pane: {
            height: 90,
            margin: {
                top: 10
            }
        }
    },
    seriesDefaults: seriesDefaults(options),
    title: title(),
    legend: legend()
});
};

exports.chartBaseTheme = baseTheme;
exports.Point = Point;
exports.Box = Box;
exports.Ring = Ring;
exports.Sector = Sector;
exports.ShapeBuilder = ShapeBuilder;
exports.ShapeElement = ShapeElement;
exports.ChartElement = ChartElement;
exports.BoxElement = BoxElement;
exports.RootElement = RootElement;
exports.FloatElement = FloatElement;
exports.Text = Text;
exports.TextBox = TextBox;
exports.Title = Title;
exports.AxisLabel = AxisLabel;
exports.Axis = Axis;
exports.Note = Note;
exports.CategoryAxis = CategoryAxis;
exports.DateCategoryAxis = DateCategoryAxis;
exports.DateValueAxis = DateValueAxis;
exports.NumericAxis = NumericAxis;
exports.LogarithmicAxis = LogarithmicAxis;
exports.PolarAxis = PolarAxis;
exports.RadarCategoryAxis = RadarCategoryAxis;
exports.RadarNumericAxis = RadarNumericAxis;
exports.RadarLogarithmicAxis = RadarLogarithmicAxis;
exports.CurveProcessor = CurveProcessor;
exports.Gradients = GRADIENTS;
exports.rectToBox = rectToBox;
exports.Aggregates = Aggregates;
exports.AreaChart = AreaChart;
exports.AreaSegment = AreaSegment;
exports.AxisGroupRangeTracker = AxisGroupRangeTracker;
exports.Bar = Bar;
exports.BarChart = BarChart;
exports.BarLabel = BarLabel;
exports.BoxPlotChart = BoxPlotChart;
exports.BoxPlot = BoxPlot;
exports.BubbleChart = BubbleChart;
exports.Bullet = Bullet;
exports.BulletChart = BulletChart;
exports.CandlestickChart = CandlestickChart;
exports.Candlestick = Candlestick;
exports.CategoricalChart = CategoricalChart;
exports.CategoricalErrorBar = CategoricalErrorBar;
exports.CategoricalPlotArea = CategoricalPlotArea;
exports.Chart = Chart;
exports.ChartContainer = ChartContainer;
exports.ClipAnimation = ClipAnimation;
exports.ClusterLayout = ClusterLayout;
exports.Crosshair = Crosshair;
exports.CrosshairTooltip = CrosshairTooltip;
exports.DefaultAggregates = DefaultAggregates;
exports.DonutChart = DonutChart;
exports.DonutPlotArea = DonutPlotArea;
exports.DonutSegment = DonutSegment;
exports.ErrorBarBase = ErrorBarBase;
exports.ErrorRangeCalculator = ErrorRangeCalculator;
exports.Highlight = Highlight;
exports.SharedTooltip = SharedTooltip;
exports.Legend = Legend;
exports.LegendItem = LegendItem;
exports.LegendLayout = LegendLayout;
exports.LineChart = LineChart;
exports.LinePoint = LinePoint;
exports.LineSegment = LineSegment;
exports.Pane = Pane;
exports.PieAnimation = PieAnimation;
exports.PieChart = PieChart;
exports.PieChartMixin = PieChartMixin;
exports.PiePlotArea = PiePlotArea;
exports.PieSegment = PieSegment;
exports.PlotAreaBase = PlotAreaBase;
exports.PlotAreaEventsMixin = PlotAreaEventsMixin;
exports.PlotAreaFactory = PlotAreaFactory;
exports.PointEventsMixin = PointEventsMixin;
exports.RangeBar = RangeBar;
exports.RangeBarChart = RangeBarChart;
exports.ScatterChart = ScatterChart;
exports.ScatterErrorBar = ScatterErrorBar;
exports.ScatterLineChart = ScatterLineChart;
exports.Selection = Selection;
exports.SeriesAggregator = SeriesAggregator;
exports.SeriesBinder = SeriesBinder;
exports.SplineSegment = SplineSegment;
exports.SplineAreaSegment = SplineAreaSegment;
exports.StackWrap = StackWrap;
exports.Tooltip = Tooltip;
exports.OHLCChart = OHLCChart;
exports.OHLCPoint = OHLCPoint;
exports.WaterfallChart = WaterfallChart;
exports.WaterfallSegment = WaterfallSegment;
exports.XYPlotArea = XYPlotArea;
exports.MousewheelZoom = MousewheelZoom;
exports.ZoomSelection = ZoomSelection;
exports.Pannable = Pannable;
exports.ChartAxis = ChartAxis;
exports.ChartPane = ChartPane;
exports.ChartPlotArea = ChartPlotArea;
exports.anyHasZIndex = anyHasZIndex;
exports.appendIfNotNull = areNumbers;
exports.areNumbers = areNumbers;
exports.categoriesCount = categoriesCount;
exports.countNumbers = countNumbers;
exports.equalsIgnoreCase = equalsIgnoreCase;
exports.evalOptions = evalOptions;
exports.filterSeriesByType = filterSeriesByType;
exports.getDateField = getDateField;
exports.getField = getField;
exports.hasGradientOverlay = hasGradientOverlay;
exports.hasValue = hasValue;
exports.isDateAxis = isDateAxis;
exports.segmentVisible = segmentVisible;
exports.seriesTotal = seriesTotal;
exports.singleItemOrArray = singleItemOrArray;
exports.ChartService = ChartService;
exports.DomEventsBuilder = DomEventsBuilder;
exports.FormatService = FormatService;
exports.IntlService = IntlService;
exports.TemplateService = TemplateService;
exports.Sparkline = Sparkline;
exports.constants = constants;
exports.Navigator = Navigator;
exports.NavigatorHint = NavigatorHint;
exports.StockChart = StockChart;
exports.addClass = addClass;
exports.removeClass = removeClass;
exports.alignPathToPixel = alignPathToPixel;
exports.clockwise = clockwise;
exports.deepExtend = deepExtend;
exports.elementStyles = elementStyles;
exports.getSpacing = getSpacing;
exports.getTemplate = getTemplate;
exports.getter = getter;
exports.grep = grep;
exports.hasClasses = hasClasses;
exports.inArray = inArray;
exports.interpolateValue = interpolateValue;
exports.InstanceObserver = InstanceObserver;
exports.isArray = isArray;
exports.isFunction = isFunction;
exports.isNumber = isNumber;
exports.isObject = isObject;
exports.isString = isString;
exports.map = map;
exports.mousewheelDelta = mousewheelDelta;
exports.FontLoader = FontLoader;
exports.setDefaultOptions = setDefaultOptions;
exports.sparseArrayLimits = sparseArrayLimits;
exports.styleValue = styleValue;
exports.append = append$1;
exports.bindEvents = bindEvents;
exports.Class = _progress_kendoDrawing.Class;
exports.defined = defined;
exports.deg = deg;
exports.elementOffset = elementOffset;
exports.elementSize = elementSize$1;
exports.eventElement = eventElement;
exports.eventCoordinates = eventCoordinates;
exports.last = last;
exports.limitValue = limitValue;
exports.logToConsole = _progress_kendoDrawing.logToConsole;
exports.objectKey = objectKey;
exports.rad = rad;
exports.round = round;
exports.unbindEvents = unbindEvents;
exports.valueOrDefault = valueOrDefault;

//# sourceMappingURL=main.js.map
