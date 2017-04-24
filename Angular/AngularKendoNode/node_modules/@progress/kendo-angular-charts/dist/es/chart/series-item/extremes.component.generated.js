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
var SeriesExtremesComponentGenerated = (function (_super) {
    __extends(SeriesExtremesComponentGenerated, _super);
    function SeriesExtremesComponentGenerated(configurationService) {
        var _this = _super.call(this, 'extremes', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    return SeriesExtremesComponentGenerated;
}(SettingsComponent));
export { SeriesExtremesComponentGenerated };
SeriesExtremesComponentGenerated.propDecorators = {
    'background': [{ type: Input },],
    'border': [{ type: Input },],
    'rotation': [{ type: Input },],
    'size': [{ type: Input },],
    'type': [{ type: Input },],
};
