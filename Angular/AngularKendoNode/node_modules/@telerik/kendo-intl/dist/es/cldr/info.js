import defaultData from './default-data';
import { errors } from '../errors';

function availableLocaleInfo(fullName, suffixes) {
    var parts = fullName.split("-");
    var language = parts[0];
    var script = parts[1];
    var territory = parts[2];

    return cldr[fullName] || (suffixes.indexOf(territory) !== -1 && cldr[language + "-" + territory]) || (suffixes.indexOf(script) !== -1 && cldr[language + "-" + script]) || cldr[language];
}

function localeFullName(language, suffixes) {
    var likelySubtags = cldr.supplemental.likelySubtags;

    for (var idx = 0; idx < suffixes.length; idx++) {
        var name = likelySubtags[language + "-" + suffixes[idx ]];
        if (name) {
            return name;
        }
    }

    if (likelySubtags[language]) {
        return likelySubtags[language];
    }
}

export var cldr = defaultData;

export function getLocaleInfo(locale) {
    var info;
    if (typeof locale === "string") {
        info = localeInfo(locale);
    } else {
        info = locale;
    }
    return info;
}

export function localeInfo(locale) {
    if (cldr[locale]) {
        return cldr[locale];
    }

    var likelySubtags = cldr.supplemental.likelySubtags;
    if (likelySubtags) {
        var parts = locale.split("-");
        var language = parts[0];
        var suffixes = parts.slice(1);
        var fullName = localeFullName(language, suffixes);
        var info = fullName ? availableLocaleInfo(fullName, suffixes) : null;
        if (info) {
            return info;
        }
    }

    throw errors.NoLocale.error(locale);
}

//# sourceMappingURL=info.js.map
