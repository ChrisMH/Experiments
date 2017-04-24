import { drawing as draw } from '@progress/kendo-drawing';

import { ChartElement } from '../../core';

import { isFunction, setDefaultOptions } from '../../common';

var LineSegment = (function (ChartElement) {
    function LineSegment(linePoints, series, seriesIx) {
        ChartElement.call(this);

        this.linePoints = linePoints;
        this.series = series;
        this.seriesIx = seriesIx;
    }

    if ( ChartElement ) LineSegment.__proto__ = ChartElement;
    LineSegment.prototype = Object.create( ChartElement && ChartElement.prototype );
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

        var line = draw.Path.fromPoints(this.points(), {
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

export default LineSegment;
//# sourceMappingURL=line-segment.js.map
