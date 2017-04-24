export default function dateComparer(a, b) {
    if (a && b) {
        return a.getTime() - b.getTime();
    }

    return -1;
}
//# sourceMappingURL=date-comparer.js.map
