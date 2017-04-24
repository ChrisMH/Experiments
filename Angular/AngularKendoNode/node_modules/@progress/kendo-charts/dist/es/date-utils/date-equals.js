import toTime from './to-time';

export default function dateEquals(a, b) {
    if (a && b) {
        return toTime(a) === toTime(b);
    }

    return a === b;
}
//# sourceMappingURL=date-equals.js.map
