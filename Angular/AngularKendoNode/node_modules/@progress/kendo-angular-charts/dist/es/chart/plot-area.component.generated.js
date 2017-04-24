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
var PlotAreaComponentGenerated = (function (_super) {
    __extends(PlotAreaComponentGenerated, _super);
    function PlotAreaComponentGenerated(configurationService) {
        var _this = _super.call(this, 'plotArea', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    return PlotAreaComponentGenerated;
}(SettingsComponent));
export { PlotAreaComponentGenerated };
PlotAreaComponentGenerated.propDecorators = {
    'background': [{ type: Input },],
    'border': [{ type: Input },],
    'margin': [{ type: Input },],
    'opacity': [{ type: Input },],
    'padding': [{ type: Input },],
};
