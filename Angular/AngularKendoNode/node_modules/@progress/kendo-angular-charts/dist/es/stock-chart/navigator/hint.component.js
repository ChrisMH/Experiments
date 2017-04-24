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
import { Input, ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { SettingsComponent } from '../../common/settings.component';
/**
 * Default options for the navigator hint.
 */
var NavigatorHintComponent = (function (_super) {
    __extends(NavigatorHintComponent, _super);
    function NavigatorHintComponent(configurationService) {
        var _this = _super.call(this, 'hint', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    return NavigatorHintComponent;
}(SettingsComponent));
export { NavigatorHintComponent };
NavigatorHintComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-navigator-hint',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorHintComponent.ctorParameters = function () { return [
    { type: ConfigurationService, },
]; };
NavigatorHintComponent.propDecorators = {
    'content': [{ type: Input },],
    'format': [{ type: Input },],
    'visible': [{ type: Input },],
};
