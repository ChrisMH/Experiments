import PlotAreaBase from './plotarea-base';
import AxisGroupRangeTracker from '../axis-group-range-tracker';
import PlotAreaEventsMixin from '../mixins/plotarea-events-mixin';
import SeriesAggregator from '../aggregates/series-aggregator';
import DefaultAggregates from '../aggregates/default-aggregates';
import SeriesBinder from '../series-binder';
import BarChart from '../bar-chart/bar-chart';
import RangeBarChart from '../range-bar-chart/range-bar-chart';
import BulletChart from '../bullet-chart/bullet-chart';
import LineChart from '../line-chart/line-chart';
import AreaChart from '../area-chart/area-chart';
import OHLCChart from '../ohlc-chart/ohlc-chart';
import CandlestickChart from '../candlestick-chart/candlestick-chart';
import BoxPlotChart from '../box-plot-chart/box-plot-chart';
import WaterfallChart from '../waterfall-chart/waterfall-chart';

import { CategoryAxis, DateCategoryAxis, NumericAxis, LogarithmicAxis, Point } from '../../core';

import filterSeriesByType from '../utils/filter-series-by-type';
import equalsIgnoreCase from '../utils/equals-ignore-case';
import categoriesCount from '../utils/categories-count';
import getField from '../utils/get-field';
import isDateAxis from '../utils/is-date-axis';
import appendIfNotNull from '../utils/append-if-not-null';
import singleItemOrArray from '../utils/single-item-or-array';
import getDateField from '../utils/get-date-field';

import { BAR, COLUMN, BULLET, VERTICAL_BULLET, LINE, VERTICAL_LINE, AREA, VERTICAL_AREA,
    RANGE_COLUMN, RANGE_BAR, WATERFALL, HORIZONTAL_WATERFALL, BOX_PLOT, VERTICAL_BOX_PLOT,
    OHLC, CANDLESTICK, LOGARITHMIC, STEP, EQUALLY_SPACED_SERIES } from '../constants';

import { DATE, MIN_VALUE, MAX_VALUE } from '../../common/constants';
import { setDefaultOptions, inArray, isNumber, deepExtend, defined, eventElement, grep } from '../../common';

var CategoricalPlotArea = (function (PlotAreaBase) {
    function CategoricalPlotArea () {
        PlotAreaBase.apply(this, arguments);
    }

    if ( PlotAreaBase ) CategoricalPlotArea.__proto__ = PlotAreaBase;
    CategoricalPlotArea.prototype = Object.create( PlotAreaBase && PlotAreaBase.prototype );
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

        PlotAreaBase.prototype.removeAxis.call(this, axis);

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
            var category;
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

        PlotAreaBase.prototype.appendChart.call(this, chart, pane);
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

                var categoryAxis;

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

                var axisType;
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

export default CategoricalPlotArea;
//# sourceMappingURL=categorical-plotarea.js.map
