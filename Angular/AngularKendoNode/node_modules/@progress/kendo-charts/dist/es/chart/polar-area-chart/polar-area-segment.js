import AreaSegment from '../area-chart/area-segment';
import LineSegment from '../line-chart/line-segment';

var PolarAreaSegment = (function (AreaSegment) {
    function PolarAreaSegment () {
        AreaSegment.apply(this, arguments);
    }

    if ( AreaSegment ) PolarAreaSegment.__proto__ = AreaSegment;
    PolarAreaSegment.prototype = Object.create( AreaSegment && AreaSegment.prototype );
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

export default PolarAreaSegment;
//# sourceMappingURL=polar-area-segment.js.map
