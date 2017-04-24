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
var notes_component_1 = require("../../../chart/category-axis-item/notes.component");
/**
 * The notes configuration of the category axis.
 */
var NavigatorCategoryAxisNotesComponent = (function (_super) {
    __extends(NavigatorCategoryAxisNotesComponent, _super);
    function NavigatorCategoryAxisNotesComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    return NavigatorCategoryAxisNotesComponent;
}(notes_component_1.CategoryAxisNotesComponent));
NavigatorCategoryAxisNotesComponent.decorators = [
    { type: core_1.Component, args: [{
                changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-navigator-category-axis-notes',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorCategoryAxisNotesComponent.ctorParameters = function () { return [
    { type: configuration_service_1.ConfigurationService, },
]; };
exports.NavigatorCategoryAxisNotesComponent = NavigatorCategoryAxisNotesComponent;
