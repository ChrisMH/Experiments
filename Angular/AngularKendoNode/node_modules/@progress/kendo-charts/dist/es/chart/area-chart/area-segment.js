import AreaSegmentMixin from './area-segment-mixin';
import LineSegment from '../line-chart/line-segment';

import { deepExtend } from '../../common';

var AreaSegment = (function (LineSegment) {
    function AreaSegment(linePoints, stackPoints, currentSeries, seriesIx) {
        LineSegment.call(this, linePoints, currentSeries, seriesIx);

        this.stackPoints = stackPoints;
    }

    if ( LineSegment ) AreaSegment.__proto__ = LineSegment;
    AreaSegment.prototype = Object.create( LineSegment && LineSegment.prototype );
    AreaSegment.prototype.constructor = AreaSegment;

    return AreaSegment;
}(LineSegment));

deepExtend(AreaSegment.prototype, AreaSegmentMixin, {
    _linePoints: LineSegment.prototype.points
});

export default AreaSegment;
//# sourceMappingURL=area-segment.js.map
