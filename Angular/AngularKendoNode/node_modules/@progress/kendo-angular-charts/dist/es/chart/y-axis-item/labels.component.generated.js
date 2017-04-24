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
var YAxisLabelsComponentGenerated = (function (_super) {
    __extends(YAxisLabelsComponentGenerated, _super);
    function YAxisLabelsComponentGenerated(configurationService) {
        var _this = _super.call(this, 'labels', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    return YAxisLabelsComponentGenerated;
}(SettingsComponent));
export { YAxisLabelsComponentGenerated };
YAxisLabelsComponentGenerated.propDecorators = {
    'background': [{ type: Input },],
    'border': [{ type: Input },],
    'color': [{ type: Input },],
    'content': [{ type: Input },],
    'culture': [{ type: Input },],
    'dateFormats': [{ type: Input },],
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
