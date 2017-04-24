import { geometry as geom } from '@progress/kendo-drawing';

import LineSegment from './line-segment';

import { INTERPOLATE } from '../constants';

import { X, Y } from '../../common/constants';

var StepLineSegment = (function (LineSegment) {
    function StepLineSegment () {
        LineSegment.apply(this, arguments);
    }

    if ( LineSegment ) StepLineSegment.__proto__ = LineSegment;
    StepLineSegment.prototype = Object.create( LineSegment && LineSegment.prototype );
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
                result.push(new geom.Point(prevMarkerBoxCenter.x, prevMarkerBoxCenter.y));
                if (vertical) {
                    result.push(new geom.Point(prevMarkerBoxCenter.x, markerBoxCenter.y));
                } else {
                    result.push(new geom.Point(markerBoxCenter.x, prevMarkerBoxCenter.y));
                }
                result.push(new geom.Point(markerBoxCenter.x, markerBoxCenter.y));
            } else {
                if (vertical) {
                    result.push(new geom.Point(prevMarkerBoxCenter.x, prevPoint.box[Y + dir]));
                    result.push(new geom.Point(prevMarkerBoxCenter.x, prevPoint.box[Y + revDir]));
                    if (isInterpolate) {
                        result.push(new geom.Point(prevMarkerBoxCenter.x, point.box[Y + dir]));
                    }
                    result.push(new geom.Point(markerBoxCenter.x, point.box[Y + dir]));
                    result.push(new geom.Point(markerBoxCenter.x, point.box[Y + revDir]));
                } else {
                    result.push(new geom.Point(prevPoint.box[X + dir], prevMarkerBoxCenter.y));
                    result.push(new geom.Point(prevPoint.box[X + revDir], prevMarkerBoxCenter.y));
                    if (isInterpolate) {
                        result.push(new geom.Point(point.box[X + dir], prevMarkerBoxCenter.y));
                    }
                    result.push(new geom.Point(point.box[X + dir], markerBoxCenter.y));
                    result.push(new geom.Point(point.box[X + revDir], markerBoxCenter.y));
                }
            }
        }

        return result || [];
    };

    return StepLineSegment;
}(LineSegment));

export default StepLineSegment;
//# sourceMappingURL=step-line-segment.js.map
