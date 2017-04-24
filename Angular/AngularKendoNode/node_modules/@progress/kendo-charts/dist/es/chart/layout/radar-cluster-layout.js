import { ChartElement } from '../../core';

import { setDefaultOptions } from '../../common';

var RadarClusterLayout = (function (ChartElement) {
    function RadarClusterLayout () {
        ChartElement.apply(this, arguments);
    }

    if ( ChartElement ) RadarClusterLayout.__proto__ = ChartElement;
    RadarClusterLayout.prototype = Object.create( ChartElement && ChartElement.prototype );
    RadarClusterLayout.prototype.constructor = RadarClusterLayout;

    RadarClusterLayout.prototype.reflow = function reflow (sector) {
        var ref = this;
        var options = ref.options;
        var children = ref.children;
        var gap = options.gap;
        var spacing = options.spacing;
        var count = children.length;
        var slots = count + gap + (spacing * (count - 1));
        var slotAngle = sector.angle / slots;
        var angle = sector.startAngle + slotAngle * (gap / 2);

        for (var i = 0; i < count; i++) {
            var slotSector = sector.clone();
            slotSector.startAngle = angle;
            slotSector.angle = slotAngle;

            if (children[i].sector) {
                slotSector.radius = children[i].sector.radius;
            }

            children[i].reflow(slotSector);
            children[i].sector = slotSector;

            angle += slotAngle + (slotAngle * spacing);
        }
    };

    return RadarClusterLayout;
}(ChartElement));

setDefaultOptions(RadarClusterLayout, {
    gap: 1,
    spacing: 0
});

export default RadarClusterLayout;
//# sourceMappingURL=radar-cluster-layout.js.map
