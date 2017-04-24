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
}(settings_component_1.SettingsComponent));
NavigatorHintComponent.decorators = [
    { type: core_1.Component, args: [{
                changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-navigator-hint',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorHintComponent.ctorParameters = function () { return [
    { type: configuration_service_1.ConfigurationService, },
]; };
NavigatorHintComponent.propDecorators = {
    'content': [{ type: core_1.Input },],
    'format': [{ type: core_1.Input },],
    'visible': [{ type: core_1.Input },],
};
exports.NavigatorHintComponent = NavigatorHintComponent;
