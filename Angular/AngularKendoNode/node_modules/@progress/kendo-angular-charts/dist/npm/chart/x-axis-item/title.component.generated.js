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
var XAxisTitleComponentGenerated = (function (_super) {
    __extends(XAxisTitleComponentGenerated, _super);
    function XAxisTitleComponentGenerated(configurationService) {
        var _this = _super.call(this, 'title', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    return XAxisTitleComponentGenerated;
}(settings_component_1.SettingsComponent));
XAxisTitleComponentGenerated.propDecorators = {
    'background': [{ type: core_1.Input },],
    'border': [{ type: core_1.Input },],
    'color': [{ type: core_1.Input },],
    'font': [{ type: core_1.Input },],
    'margin': [{ type: core_1.Input },],
    'padding': [{ type: core_1.Input },],
    'position': [{ type: core_1.Input },],
    'rotation': [{ type: core_1.Input },],
    'text': [{ type: core_1.Input },],
    'visible': [{ type: core_1.Input },],
    'visual': [{ type: core_1.Input },],
};
exports.XAxisTitleComponentGenerated = XAxisTitleComponentGenerated;
