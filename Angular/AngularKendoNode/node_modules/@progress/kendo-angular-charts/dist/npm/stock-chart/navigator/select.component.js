"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var configuration_service_1 = require("../../common/configuration.service");
var settings_component_1 = require("../../common/settings.component");
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
}(settings_component_1.SettingsComponent));
NavigatorSelectComponent.decorators = [
    { type: core_1.Component, args: [{
                changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-navigator-select',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorSelectComponent.ctorParameters = function () { return [
    { type: configuration_service_1.ConfigurationService, },
]; };
NavigatorSelectComponent.propDecorators = {
    'from': [{ type: core_1.Input },],
    'to': [{ type: core_1.Input },],
    'mousewheel': [{ type: core_1.Input },],
};
exports.NavigatorSelectComponent = NavigatorSelectComponent;
