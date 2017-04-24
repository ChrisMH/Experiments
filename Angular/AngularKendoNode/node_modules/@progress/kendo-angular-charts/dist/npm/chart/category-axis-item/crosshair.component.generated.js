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
var settings_component_1 = require("../../common/settings.component");
/**
 * @hidden
 */
var CategoryAxisCrosshairComponentGenerated = (function (_super) {
    __extends(CategoryAxisCrosshairComponentGenerated, _super);
    function CategoryAxisCrosshairComponentGenerated(configurationService) {
        var _this = _super.call(this, 'crosshair', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    return CategoryAxisCrosshairComponentGenerated;
}(settings_component_1.SettingsComponent));
CategoryAxisCrosshairComponentGenerated.propDecorators = {
    'color': [{ type: core_1.Input },],
    'dashType': [{ type: core_1.Input },],
    'opacity': [{ type: core_1.Input },],
    'visible': [{ type: core_1.Input },],
    'width': [{ type: core_1.Input },],
    'tooltip': [{ type: core_1.Input },],
};
exports.CategoryAxisCrosshairComponentGenerated = CategoryAxisCrosshairComponentGenerated;
