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
var prefix_configuration_service_1 = require("../../common/prefix-configuration.service");
var pane_component_generated_1 = require("../../chart/pane.component.generated");
/**
 * The configuration component for the navigator pane.
 */
var NavigatorPaneComponent = (function (_super) {
    __extends(NavigatorPaneComponent, _super);
    function NavigatorPaneComponent(configurationService) {
        var _this = _super.call(this, configurationService, null) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    return NavigatorPaneComponent;
}(pane_component_generated_1.PaneComponentGenerated));
NavigatorPaneComponent.decorators = [
    { type: core_1.Component, args: [{
                changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                providers: [{ provide: prefix_configuration_service_1.PREFIX, useValue: 'navigator.pane' }, { provide: configuration_service_1.ConfigurationService, useClass: prefix_configuration_service_1.PrefixConfigurationService }],
                selector: 'kendo-chart-navigator-pane',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorPaneComponent.ctorParameters = function () { return [
    { type: configuration_service_1.ConfigurationService, },
]; };
exports.NavigatorPaneComponent = NavigatorPaneComponent;
