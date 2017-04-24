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
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
var AxisDefaultsLabelsComponentGenerated = (function (_super) {
    __extends(AxisDefaultsLabelsComponentGenerated, _super);
    function AxisDefaultsLabelsComponentGenerated(configurationService) {
        var _this = _super.call(this, 'axisDefaults.labels', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    return AxisDefaultsLabelsComponentGenerated;
}(SettingsComponent));
export { AxisDefaultsLabelsComponentGenerated };
AxisDefaultsLabelsComponentGenerated.propDecorators = {
    'content': [{ type: Input },],
    'font': [{ type: Input },],
    'format': [{ type: Input },],
    'margin': [{ type: Input },],
    'mirror': [{ type: Input },],
    'padding': [{ type: Input },],
    'rotation': [{ type: Input },],
    'skip': [{ type: Input },],
    'step': [{ type: Input },],
    'visible': [{ type: Input },],
    'visual': [{ type: Input },],
};
