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
var title_component_generated_1 = require("../pane/title.component.generated");
/**
 * The title configuration of the Chart pane.
 */
var PanesTitleComponent = (function (_super) {
    __extends(PanesTitleComponent, _super);
    // Place custom properties here
    function PanesTitleComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    return PanesTitleComponent;
}(title_component_generated_1.PanesTitleComponentGenerated));
PanesTitleComponent.decorators = [
    { type: core_1.Component, args: [{
                changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-pane-title',
                template: ''
            },] },
];
/** @nocollapse */
PanesTitleComponent.ctorParameters = function () { return [
    { type: configuration_service_1.ConfigurationService, },
]; };
exports.PanesTitleComponent = PanesTitleComponent;
