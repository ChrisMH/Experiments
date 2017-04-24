import StepLineSegment from '../line-chart/step-line-segment';
import AreaSegmentMixin from './area-segment-mixin';

import { deepExtend } from '../../common';

var StepAreaSegment = (function (StepLineSegment) {
    function StepAreaSegment(linePoints, stackPoints, currentSeries, seriesIx) {
        StepLineSegment.call(this, linePoints, currentSeries, seriesIx);

        this.stackPoints = stackPoints;
    }

    if ( StepLineSegment ) StepAreaSegment.__proto__ = StepLineSegment;
    StepAreaSegment.prototype = Object.create( StepLineSegment && StepLineSegment.prototype );
    StepAreaSegment.prototype.constructor = StepAreaSegment;

    return StepAreaSegment;
}(StepLineSegment));

deepExtend(StepAreaSegment.prototype, AreaSegmentMixin, {
    _linePoints: StepLineSegment.prototype.points
});

export default StepAreaSegment;
//# sourceMappingURL=step-area-segment.js.map
