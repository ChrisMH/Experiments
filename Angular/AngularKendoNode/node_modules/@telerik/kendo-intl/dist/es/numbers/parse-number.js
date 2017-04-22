import { localeInfo, localeCurrency, currencyDisplays } from '../cldr';

var exponentRegExp = /[eE][\-+]?[0-9]+/;
var nonBreakingSpaceRegExp = /\u00A0/g;

function cleanCurrencyNumber(value, info, format) {
    var isCurrency = format.style === "currency";
    var number = value;
    var negative;

    var currency = format.currency || localeCurrency(info, isCurrency);

    if (currency) {
        var displays = currencyDisplays(info, currency);
        for (var idx = 0; idx < displays.length; idx++) {
            var display = displays[idx];
            if (number.includes(display)) {
                number = number.replace(display, "");
                isCurrency = true;
                break;
            }
        }

        if (isCurrency) {
            var patterns = info.numbers.currency.patterns;
            if (patterns.length > 1) {
                var parts = (patterns[1] || "").replace("$", "").split("n");
                if (number.indexOf(parts[0]) > -1 && number.indexOf(parts[1]) > -1) {
                    number = number.replace(parts[0], "").replace(parts[1], "");
                    negative = true;
                }
            }
        }
    }

    return {
        number: number,
        negative: negative
    };
}

export default function parseNumber(value, locale, format) {
    if ( locale === void 0 ) locale = "en";
    if ( format === void 0 ) format = {};

    if (!value && value !== 0) {
        return null;
    }

    if (typeof value === "number") {
        return value;
    }

    var info = localeInfo(locale);
    var symbols = info.numbers.symbols;

    var number = value.toString();
    var isPercent;

    if (exponentRegExp.test(number)) {
        number = parseFloat(number.replace(symbols.decimal, "."));
        return isNaN(number) ? null : number;
    }

    var negativeSignIndex = number.indexOf("-");
    if (negativeSignIndex > 0) {
        return null;
    }

    var isNegative = negativeSignIndex > -1;
    var ref = cleanCurrencyNumber(number, info, format);
    var negativeCurrency = ref.negative;
    var newNumber = ref.number;

    number = newNumber;
    isNegative = negativeCurrency !== undefined ? negativeCurrency : isNegative;

    if (format.style === "percent" || number.indexOf(symbols.percentSign) > -1) {
        number = number.replace(symbols.percentSign, "");
        isPercent = true;
    }

    number = number.replace("-", "")
          .replace(nonBreakingSpaceRegExp, " ")
          .split(symbols.group.replace(nonBreakingSpaceRegExp, " ")).join("")
          .replace(symbols.decimal, ".");

    number = parseFloat(number);

    if (isNaN(number)) {
        number = null;
    } else if (isNegative) {
        number *= -1;
    }

    if (number && isPercent) {
        number /= 100;
    }

    return number;
}

//# sourceMappingURL=parse-number.js.map
