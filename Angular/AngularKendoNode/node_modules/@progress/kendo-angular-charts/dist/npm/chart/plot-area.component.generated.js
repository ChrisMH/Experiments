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
var settings_component_1 = require("../common/settings.component");
/**
 * @hidden
 */
var PlotAreaComponentGenerated = (function (_super) {
    __extends(PlotAreaComponentGenerated, _super);
    function PlotAreaComponentGenerated(configurationService) {
        var _this = _super.call(this, 'plotArea', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    return PlotAreaComponentGenerated;
}(settings_component_1.SettingsComponent));
PlotAreaComponentGenerated.propDecorators = {
    'background': [{ type: core_1.Input },],
    'border': [{ type: core_1.Input },],
    'margin': [{ type: core_1.Input },],
    'opacity': [{ type: core_1.Input },],
    'padding': [{ type: core_1.Input },],
};
exports.PlotAreaComponentGenerated = PlotAreaComponentGenerated;
