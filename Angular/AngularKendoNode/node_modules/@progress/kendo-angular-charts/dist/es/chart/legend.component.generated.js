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
var LegendComponentGenerated = (function (_super) {
    __extends(LegendComponentGenerated, _super);
    function LegendComponentGenerated(configurationService) {
        var _this = _super.call(this, 'legend', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    return LegendComponentGenerated;
}(SettingsComponent));
export { LegendComponentGenerated };
LegendComponentGenerated.propDecorators = {
    'align': [{ type: Input },],
    'background': [{ type: Input },],
    'border': [{ type: Input },],
    'height': [{ type: Input },],
    'labels': [{ type: Input },],
    'margin': [{ type: Input },],
    'offsetX': [{ type: Input },],
    'offsetY': [{ type: Input },],
    'orientation': [{ type: Input },],
    'padding': [{ type: Input },],
    'position': [{ type: Input },],
    'reverse': [{ type: Input },],
    'visible': [{ type: Input },],
    'width': [{ type: Input },],
    'inactiveItems': [{ type: Input },],
    'item': [{ type: Input },],
};
