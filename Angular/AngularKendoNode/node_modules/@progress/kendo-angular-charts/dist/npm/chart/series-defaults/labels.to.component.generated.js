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
var SeriesDefaultsLabelsToComponentGenerated = (function (_super) {
    __extends(SeriesDefaultsLabelsToComponentGenerated, _super);
    function SeriesDefaultsLabelsToComponentGenerated(configurationService) {
        var _this = _super.call(this, 'seriesDefaults.labels.to', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    return SeriesDefaultsLabelsToComponentGenerated;
}(settings_component_1.SettingsComponent));
SeriesDefaultsLabelsToComponentGenerated.propDecorators = {
    'background': [{ type: core_1.Input },],
    'border': [{ type: core_1.Input },],
    'color': [{ type: core_1.Input },],
    'content': [{ type: core_1.Input },],
    'font': [{ type: core_1.Input },],
    'format': [{ type: core_1.Input },],
    'margin': [{ type: core_1.Input },],
    'padding': [{ type: core_1.Input },],
    'visible': [{ type: core_1.Input },],
};
exports.SeriesDefaultsLabelsToComponentGenerated = SeriesDefaultsLabelsToComponentGenerated;
