import { cldr } from './info';

var LATIN_NUMBER_FORMATS = "Formats-numberSystem-latn";
var LATIN_NUMBER_SYMBOLS = "symbols-numberSystem-latn";
var GROUP_SEPARATOR = ",";
var LIST_SEPARATOR = ";";
var DECIMAL_SEPARATOR = ".";

var patternRegExp = /([ #,0. ]+)/g;
var cldrCurrencyRegExp = /¤/g;

function getPatterns(pattern) {
    patternRegExp.lastIndex = 0;

    return pattern.replace(cldrCurrencyRegExp, "$").replace(patternRegExp, "n").split(";");
}

function getGroupSize(pattern) {
    patternRegExp.lastIndex = 0;

    var numberPatterns = patternRegExp.exec(pattern.split(LIST_SEPARATOR)[0])[0].split(DECIMAL_SEPARATOR);
    var integer = numberPatterns[0];

    var groupSize = integer.split(GROUP_SEPARATOR).slice(1).map(function(group) {
        return group.length;
    }).reverse();

    return groupSize;
}

function loadCurrencyUnitPatterns(currencyInfo, currencyFormats) {
    for (var field in currencyFormats) {
        if (field.startsWith("unitPattern")) {
            currencyInfo[field] = currencyFormats[field].replace("{0}", "n").replace("{1}", "$");
        }
    }
}

export default function loadNumbersInfo(locale, info) {
    var localeInfo = cldr[locale];
    var numbers = localeInfo.numbers = localeInfo.numbers || {};
    numbers.symbols = numbers.symbols || {};
    for (var field in info) {
        if (field === LATIN_NUMBER_SYMBOLS) {
            Object.assign(numbers.symbols, info[field]);
        } else if (field.includes(LATIN_NUMBER_FORMATS)) {
            var style = field.substr(0, field.indexOf(LATIN_NUMBER_FORMATS));
            var pattern = info[field].standard;
            numbers[style] = {
                patterns: getPatterns(pattern)
            };
            if (style === "currency") {
                numbers[style].groupSize = getGroupSize((info["decimal" + LATIN_NUMBER_FORMATS] || info[field]).standard);
                loadCurrencyUnitPatterns(numbers[style], info[field]);
            } else {
                numbers[style].groupSize = getGroupSize(pattern);
            }
        } else if (field === "currencies") {
            numbers.currencies = info[field];
        }
    }
}
//# sourceMappingURL=load-numbers.js.map
