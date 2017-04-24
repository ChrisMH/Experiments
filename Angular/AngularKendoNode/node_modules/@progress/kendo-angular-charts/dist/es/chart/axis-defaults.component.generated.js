var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Input } from '@angular/core';
import { SettingsComponent } from '../common/settings.component';
/**
 * @hidden
 */
var AxisDefaultsComponentGenerated = (function (_super) {
    __extends(AxisDefaultsComponentGenerated, _super);
    function AxisDefaultsComponentGenerated(configurationService) {
        var _this = _super.call(this, 'axisDefaults', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    return AxisDefaultsComponentGenerated;
}(SettingsComponent));
export { AxisDefaultsComponentGenerated };
AxisDefaultsComponentGenerated.propDecorators = {
    'background': [{ type: Input },],
    'color': [{ type: Input },],
    'line': [{ type: Input },],
    'majorGridLines': [{ type: Input },],
    'majorTicks': [{ type: Input },],
    'minorGridLines': [{ type: Input },],
    'minorTicks': [{ type: Input },],
    'narrowRange': [{ type: Input },],
    'pane': [{ type: Input },],
    'plotBands': [{ type: Input },],
    'reverse': [{ type: Input },],
    'startAngle': [{ type: Input },],
    'visible': [{ type: Input },],
    'crosshair': [{ type: Input },],
    'labels': [{ type: Input },],
    'title': [{ type: Input },],
};
