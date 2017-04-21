import { localeInfo } from './info';

export default function dateFieldName(options, locale) {
    if ( locale === void 0 ) locale = "en";

    var info = localeInfo(locale);
    var dateFields = info.calendar.dateFields || {};
    var fieldNameInfo = dateFields[options.type] || {};

    return fieldNameInfo[options.nameType] || fieldNameInfo['wide'];
}

//# sourceMappingURL=date-field-name.js.map
