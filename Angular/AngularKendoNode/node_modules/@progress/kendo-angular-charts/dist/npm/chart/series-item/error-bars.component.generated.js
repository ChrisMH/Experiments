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
var SeriesErrorBarsComponentGenerated = (function (_super) {
    __extends(SeriesErrorBarsComponentGenerated, _super);
    function SeriesErrorBarsComponentGenerated(configurationService) {
        var _this = _super.call(this, 'errorBars', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    return SeriesErrorBarsComponentGenerated;
}(settings_component_1.SettingsComponent));
SeriesErrorBarsComponentGenerated.propDecorators = {
    'color': [{ type: core_1.Input },],
    'endCaps': [{ type: core_1.Input },],
    'line': [{ type: core_1.Input },],
    'value': [{ type: core_1.Input },],
    'visual': [{ type: core_1.Input },],
    'xValue': [{ type: core_1.Input },],
    'yValue': [{ type: core_1.Input },],
};
exports.SeriesErrorBarsComponentGenerated = SeriesErrorBarsComponentGenerated;
