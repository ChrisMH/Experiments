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
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { SettingsComponent } from '../../common/settings.component';
/**
 * Specifies the initially selected range.
 *
 * The full range of values is shown if no range is specified.
 */
var NavigatorSelectComponent = (function (_super) {
    __extends(NavigatorSelectComponent, _super);
    function NavigatorSelectComponent(configurationService) {
        var _this = _super.call(this, 'select', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    return NavigatorSelectComponent;
}(SettingsComponent));
export { NavigatorSelectComponent };
NavigatorSelectComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-navigator-select',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorSelectComponent.ctorParameters = function () { return [
    { type: ConfigurationService, },
]; };
NavigatorSelectComponent.propDecorators = {
    'from': [{ type: Input },],
    'to': [{ type: Input },],
    'mousewheel': [{ type: Input },],
};
