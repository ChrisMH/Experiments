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
var SeriesTooltipComponentGenerated = (function (_super) {
    __extends(SeriesTooltipComponentGenerated, _super);
    function SeriesTooltipComponentGenerated(configurationService) {
        var _this = _super.call(this, 'tooltip', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    return SeriesTooltipComponentGenerated;
}(SettingsComponent));
export { SeriesTooltipComponentGenerated };
SeriesTooltipComponentGenerated.propDecorators = {
    'background': [{ type: Input },],
    'border': [{ type: Input },],
    'color': [{ type: Input },],
    'font': [{ type: Input },],
    'format': [{ type: Input },],
    'padding': [{ type: Input },],
    'visible': [{ type: Input },],
};
