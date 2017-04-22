import { localeInfo } from '../cldr';
import standardNumberFormat from './standard-number-format';
import customNumberFormat from './custom-number-format';

var standardFormatRegExp = /^(n|c|p|e)(\d*)$/i;

function standardFormatOptions(format) {
    var formatAndPrecision = standardFormatRegExp.exec(format);

    if (formatAndPrecision) {
        var options = {
            style: "decimal"
        };

        var style = formatAndPrecision[1].toLowerCase();

        if (style === "c") {
            options.style = "currency";
        }

        if (style === "p") {
            options.style = "percent";
        }

        if (style === "e") {
            options.style = "scientific";
        }

        if (formatAndPrecision[2]) {
            options.minimumFractionDigits = options.maximumFractionDigits = parseInt(formatAndPrecision[2], 10);
        }

        return options;
    }
}

function getFormatOptions(format) {
    var formatOptions;
    if (typeof format === "string") {
        formatOptions = standardFormatOptions(format);
    } else {
        formatOptions = format;
    }

    return formatOptions;
}

export default function formatNumber(number, format, locale) {
    if ( format === void 0 ) format = "n";
    if ( locale === void 0 ) locale = "en";

    if (number === undefined || number === null) {
        return "";
    }

    if (!isFinite(number)) {
        return number;
    }

    var info = localeInfo(locale);
    var formatOptions = getFormatOptions(format);

    var result;
    if (formatOptions) {
        var style = (formatOptions || {}).style || "decimal";
        result = standardNumberFormat(number, Object.assign({}, info.numbers[style], formatOptions), info);
    } else {
        result = customNumberFormat(number, format, info);
    }

    return result;
}

//# sourceMappingURL=format-number.js.map
