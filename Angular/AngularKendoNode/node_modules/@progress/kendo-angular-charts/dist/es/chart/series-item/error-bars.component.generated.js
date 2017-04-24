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
var SeriesErrorBarsComponentGenerated = (function (_super) {
    __extends(SeriesErrorBarsComponentGenerated, _super);
    function SeriesErrorBarsComponentGenerated(configurationService) {
        var _this = _super.call(this, 'errorBars', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    return SeriesErrorBarsComponentGenerated;
}(SettingsComponent));
export { SeriesErrorBarsComponentGenerated };
SeriesErrorBarsComponentGenerated.propDecorators = {
    'color': [{ type: Input },],
    'endCaps': [{ type: Input },],
    'line': [{ type: Input },],
    'value': [{ type: Input },],
    'visual': [{ type: Input },],
    'xValue': [{ type: Input },],
    'yValue': [{ type: Input },],
};
