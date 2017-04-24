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
var configuration_service_1 = require("../common/configuration.service");
var prefix_configuration_service_1 = require("../common/prefix-configuration.service");
var settings_component_1 = require("../common/settings.component");
var NavigatorComponent = (function (_super) {
    __extends(NavigatorComponent, _super);
    function NavigatorComponent(configurationService) {
        var _this = _super.call(this, '', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    return NavigatorComponent;
}(settings_component_1.SettingsComponent));
NavigatorComponent.decorators = [
    { type: core_1.Component, args: [{
                changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                providers: [{ provide: prefix_configuration_service_1.PREFIX, useValue: 'navigator' }, { provide: configuration_service_1.ConfigurationService, useClass: prefix_configuration_service_1.PrefixConfigurationService }],
                selector: 'kendo-chart-navigator',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorComponent.ctorParameters = function () { return [
    { type: configuration_service_1.ConfigurationService, },
]; };
NavigatorComponent.propDecorators = {
    'visible': [{ type: core_1.Input },],
    'categoryAxis': [{ type: core_1.Input },],
    'hint': [{ type: core_1.Input },],
    'pane': [{ type: core_1.Input },],
    'select': [{ type: core_1.Input },],
    'series': [{ type: core_1.Input },],
};
exports.NavigatorComponent = NavigatorComponent;
