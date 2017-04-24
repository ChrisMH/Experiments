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
var SeriesDefaultsComponentGenerated = (function (_super) {
    __extends(SeriesDefaultsComponentGenerated, _super);
    function SeriesDefaultsComponentGenerated(configurationService) {
        var _this = _super.call(this, 'seriesDefaults', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    return SeriesDefaultsComponentGenerated;
}(SettingsComponent));
export { SeriesDefaultsComponentGenerated };
SeriesDefaultsComponentGenerated.propDecorators = {
    'border': [{ type: Input },],
    'gap': [{ type: Input },],
    'overlay': [{ type: Input },],
    'spacing': [{ type: Input },],
    'stack': [{ type: Input },],
    'type': [{ type: Input },],
    'visual': [{ type: Input },],
    'labels': [{ type: Input },],
    'notes': [{ type: Input },],
    'tooltip': [{ type: Input },],
};
