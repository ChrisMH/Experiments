import SplineAreaSegment from '../area-chart/spline-area-segment';
import LineSegment from '../line-chart/line-segment';
import { CurveProcessor } from '../../core';

var SplinePolarAreaSegment = (function (SplineAreaSegment) {
    function SplinePolarAreaSegment () {
        SplineAreaSegment.apply(this, arguments);
    }

    if ( SplineAreaSegment ) SplinePolarAreaSegment.__proto__ = SplineAreaSegment;
    SplinePolarAreaSegment.prototype = Object.create( SplineAreaSegment && SplineAreaSegment.prototype );
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

export default SplinePolarAreaSegment;
//# sourceMappingURL=spline-polar-area-segment.js.map
