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
var SeriesHighlightComponentGenerated = (function (_super) {
    __extends(SeriesHighlightComponentGenerated, _super);
    function SeriesHighlightComponentGenerated(configurationService) {
        var _this = _super.call(this, 'highlight', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    return SeriesHighlightComponentGenerated;
}(SettingsComponent));
export { SeriesHighlightComponentGenerated };
SeriesHighlightComponentGenerated.propDecorators = {
    'border': [{ type: Input },],
    'color': [{ type: Input },],
    'line': [{ type: Input },],
    'opacity': [{ type: Input },],
    'toggle': [{ type: Input },],
    'visible': [{ type: Input },],
    'visual': [{ type: Input },],
};
