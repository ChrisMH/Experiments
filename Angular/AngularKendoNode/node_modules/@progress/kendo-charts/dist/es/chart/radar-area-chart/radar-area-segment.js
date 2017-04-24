import AreaSegment from '../area-chart/area-segment';
import LineSegment from '../line-chart/line-segment';

var RadarAreaSegment = (function (AreaSegment) {
    function RadarAreaSegment () {
        AreaSegment.apply(this, arguments);
    }

    if ( AreaSegment ) RadarAreaSegment.__proto__ = AreaSegment;
    RadarAreaSegment.prototype = Object.create( AreaSegment && AreaSegment.prototype );
    RadarAreaSegment.prototype.constructor = RadarAreaSegment;

    RadarAreaSegment.prototype.points = function points () {
        return LineSegment.prototype.points.call(this, this.stackPoints);
    };

    return RadarAreaSegment;
}(AreaSegment));

export default RadarAreaSegment;
//# sourceMappingURL=radar-area-segment.js.map
