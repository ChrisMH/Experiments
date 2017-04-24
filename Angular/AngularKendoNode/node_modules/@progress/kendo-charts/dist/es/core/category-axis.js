import Axis from './axis';
import AxisLabel from './axis-label';

import { BLACK, COORD_PRECISION, DEFAULT_PRECISION, X, Y } from '../common/constants';
import { defined, isNumber, last, limitValue, round, setDefaultOptions, valueOrDefault } from '../common';

var MIN_CATEGORY_POINTS_RANGE = 0.01;

var CategoryAxis = (function (Axis) {
    function CategoryAxis(options, chartService) {
        Axis.call(this, options, chartService);

        this._ticks = {};
        this._initCategories(this.options);
    }

    if ( Axis ) CategoryAxis.__proto__ = Axis;
    CategoryAxis.prototype = Object.create( Axis && Axis.prototype );
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
        Axis.prototype.arrangeLabels.call(this);
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

        return Axis.prototype.slot.call(this, start, end, limit);
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
        Axis.prototype.arrangeNotes.call(this);
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

export default CategoryAxis;
//# sourceMappingURL=category-axis.js.map
