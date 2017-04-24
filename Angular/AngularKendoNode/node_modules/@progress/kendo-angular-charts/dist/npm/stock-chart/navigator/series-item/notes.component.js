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
var configuration_service_1 = require("../../../common/configuration.service");
var notes_component_1 = require("../../../chart/series-item/notes.component");
/**
 * The StockChart navigator series notes configuration.
 */
var NavigatorSeriesNotesComponent = (function (_super) {
    __extends(NavigatorSeriesNotesComponent, _super);
    function NavigatorSeriesNotesComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    return NavigatorSeriesNotesComponent;
}(notes_component_1.SeriesNotesComponent));
NavigatorSeriesNotesComponent.decorators = [
    { type: core_1.Component, args: [{
                changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-navigator-series-item-notes',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorSeriesNotesComponent.ctorParameters = function () { return [
    { type: configuration_service_1.ConfigurationService, },
]; };
exports.NavigatorSeriesNotesComponent = NavigatorSeriesNotesComponent;
