import SeriesBinder from '../series-binder';

import { isNumber, isString } from '../../common';
import segmentVisible from './segment-visible';

export default function seriesTotal(series) {
    var data = series.data;
    var sum = 0;

    for (var i = 0; i < data.length; i++) {
        var pointData = SeriesBinder.current.bindPoint(series, i);
        var value = pointData.valueFields.value;

        if (isString(value)) {
            value = parseFloat(value);
        }

        var visible = segmentVisible(series, pointData.fields, i);
        if (isNumber(value) && visible !== false) {
            sum += Math.abs(value);
        }
    }

    return sum;
}

//# sourceMappingURL=series-total.js.map
