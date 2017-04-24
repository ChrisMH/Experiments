import CategoryAxis from './category-axis';
import AxisLabel from './axis-label';

import { DEFAULT_PRECISION, MAX_VALUE, OBJECT, DATE } from '../common/constants';
import { deepExtend, defined, inArray, last, limitValue, round, setDefaultOptions, sparseArrayLimits } from '../common';

import { MILLISECONDS, SECONDS, MINUTES, HOURS, DAYS, WEEKS, MONTHS, YEARS,
    TIME_PER_MINUTE, TIME_PER_HOUR, TIME_PER_DAY, TIME_PER_WEEK,
    TIME_PER_MONTH, TIME_PER_YEAR, TIME_PER_UNIT } from '../date-utils/constants';
import { dateComparer, toDate, addTicks, addDuration, dateDiff, absoluteDateDiff, dateIndex, dateEquals, toTime, floorDate, parseDate, parseDates } from '../date-utils';

import { DateLabelFormats } from './constants';

var AUTO = "auto";
var BASE_UNITS = [
    MILLISECONDS, SECONDS, MINUTES, HOURS, DAYS, WEEKS, MONTHS, YEARS
];
var FIT = "fit";

var DateCategoryAxis = (function (CategoryAxis) {
    function DateCategoryAxis(axisOptions, chartService) {
        CategoryAxis.call(this, axisOptions, chartService);

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

    if ( CategoryAxis ) DateCategoryAxis.__proto__ = CategoryAxis;
    DateCategoryAxis.prototype = Object.create( CategoryAxis && CategoryAxis.prototype );
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
        var round = options.roundToBaseUnit !== false;
        var totalRange = this.categoriesRange();
        var min = options.min;
        var max = options.max;

        if (!min) {
            min = round ? this._roundToTotalStep(totalRange.min, options, false) : totalRange.min;
        }

        if (!max) {
            max = round ? this._roundToTotalStep(totalRange.max, options, !options.justified) : totalRange.max;
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
        var pointsRange = CategoryAxis.prototype.pointsRange.call(this, start, end);
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

        return CategoryAxis.prototype.getSlot.call(this, start, end, limit);
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

export default DateCategoryAxis;

//# sourceMappingURL=date-category-axis.js.map
