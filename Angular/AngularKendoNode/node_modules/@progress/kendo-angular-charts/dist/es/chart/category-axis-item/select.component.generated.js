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
var CategoryAxisSelectComponentGenerated = (function (_super) {
    __extends(CategoryAxisSelectComponentGenerated, _super);
    function CategoryAxisSelectComponentGenerated(configurationService) {
        var _this = _super.call(this, 'select', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    return CategoryAxisSelectComponentGenerated;
}(SettingsComponent));
export { CategoryAxisSelectComponentGenerated };
CategoryAxisSelectComponentGenerated.propDecorators = {
    'from': [{ type: Input },],
    'max': [{ type: Input },],
    'min': [{ type: Input },],
    'mousewheel': [{ type: Input },],
    'to': [{ type: Input },],
};
