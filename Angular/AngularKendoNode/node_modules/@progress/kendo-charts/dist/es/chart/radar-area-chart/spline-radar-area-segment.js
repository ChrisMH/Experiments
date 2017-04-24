import SplineAreaSegment from '../area-chart/spline-area-segment';

var SplineRadarAreaSegment = (function (SplineAreaSegment) {
    function SplineRadarAreaSegment () {
        SplineAreaSegment.apply(this, arguments);
    }

    if ( SplineAreaSegment ) SplineRadarAreaSegment.__proto__ = SplineAreaSegment;
    SplineRadarAreaSegment.prototype = Object.create( SplineAreaSegment && SplineAreaSegment.prototype );
    SplineRadarAreaSegment.prototype.constructor = SplineRadarAreaSegment;

    SplineRadarAreaSegment.prototype.closeFill = function closeFill () {};

    return SplineRadarAreaSegment;
}(SplineAreaSegment));

export default SplineRadarAreaSegment;
//# sourceMappingURL=spline-radar-area-segment.js.map
