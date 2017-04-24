import { drawing as draw, geometry as geom } from '@progress/kendo-drawing';

import AreaSegment from './area-segment';
import LineSegment from '../line-chart/line-segment';

import { CurveProcessor } from '../../core';

import { X, Y } from '../../common/constants';
import { append, deepExtend, isFunction, last, limitValue } from '../../common';

var SplineAreaSegment = (function (AreaSegment) {
    function SplineAreaSegment(linePoints, prevSegment, isStacked, currentSeries, seriesIx) {
        AreaSegment.call(this, linePoints, [], currentSeries, seriesIx);

        this.prevSegment = prevSegment;
        this.isStacked = isStacked;
    }

    if ( AreaSegment ) SplineAreaSegment.__proto__ = AreaSegment;
    SplineAreaSegment.prototype = Object.create( AreaSegment && AreaSegment.prototype );
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

        this.visual = new draw.Group({
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

            fillSegments.push(new geom.Segment(
                prevAnchor,
                prevAnchor,
                last(strokeSegments).anchor()
            ));

            var stackSegments = [];
            for (var idx = prevStrokeSegments.length - 1; idx >= 0; idx--) {
                var segment = prevStrokeSegments[idx];
                stackSegments.push(new geom.Segment(
                    segment.anchor(),
                    segment.controlOut(),
                    segment.controlIn()
                ));
            }

            append(fillSegments, stackSegments);

            var firstAnchor = fillSegments[0].anchor();
            fillSegments.push(new geom.Segment(
                firstAnchor,
                firstAnchor,
                last(stackSegments).anchor()
            ));
        }

        var fill = new draw.Path(style);
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
            var stroke = new draw.Path(style);
            stroke.segments.push.apply(stroke.segments, this.strokeSegments());

            this.visual.append(stroke);
        }
    };

    return SplineAreaSegment;
}(AreaSegment));

export default SplineAreaSegment;
//# sourceMappingURL=spline-area-segment.js.map
