import { cldr, getLocaleInfo } from './info';
import localeTerritory from './territory';

import { errors } from '../errors';

var NoWeekData = errors.NoWeekData;
var NoFirstDay = errors.NoFirstDay;

var DAYS = [ "sun", "mon", "tue", "wed", "thu", "fri", "sat" ];

export default function firstDay(locale) {
    var weekData = cldr.supplemental.weekData;
    if (!weekData) {
        throw NoWeekData.error();
    }

    var info = getLocaleInfo(locale);
    var firstDay = weekData.firstDay[localeTerritory(info)];

    if (!firstDay) {
        throw NoFirstDay.error();
    }

    return DAYS.indexOf(firstDay);
}

//# sourceMappingURL=first-day.js.map
