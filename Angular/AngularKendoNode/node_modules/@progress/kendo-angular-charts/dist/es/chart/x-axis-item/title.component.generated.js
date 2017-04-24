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
var XAxisTitleComponentGenerated = (function (_super) {
    __extends(XAxisTitleComponentGenerated, _super);
    function XAxisTitleComponentGenerated(configurationService) {
        var _this = _super.call(this, 'title', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    return XAxisTitleComponentGenerated;
}(SettingsComponent));
export { XAxisTitleComponentGenerated };
XAxisTitleComponentGenerated.propDecorators = {
    'background': [{ type: Input },],
    'border': [{ type: Input },],
    'color': [{ type: Input },],
    'font': [{ type: Input },],
    'margin': [{ type: Input },],
    'padding': [{ type: Input },],
    'position': [{ type: Input },],
    'rotation': [{ type: Input },],
    'text': [{ type: Input },],
    'visible': [{ type: Input },],
    'visual': [{ type: Input },],
};
