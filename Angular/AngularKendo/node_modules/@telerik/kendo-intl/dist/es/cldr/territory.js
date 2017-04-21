import { cldr } from './info';

function territoryFromName(name) {
    var parts = name.split("-");
    var length = parts.length;

    if (length > 1) {
        var territory = parts[ length - 1 ];
        return territory.toUpperCase();
    }
}

export default function localeTerritory(info) {
    if (info.territory) {
        return info.territory;
    }

    var likelySubtags = cldr.supplemental.likelySubtags;
    var name = info.name;
    var territory;

    if (info.identity && info.identity.territory) {
        territory = info.identity.territory;
    } else if (likelySubtags && likelySubtags[name]) {
        territory = territoryFromName(likelySubtags[name]);
    } else {
        territory = territoryFromName(name);
    }
    info.territory = territory;

    return territory;
}

//# sourceMappingURL=territory.js.map
