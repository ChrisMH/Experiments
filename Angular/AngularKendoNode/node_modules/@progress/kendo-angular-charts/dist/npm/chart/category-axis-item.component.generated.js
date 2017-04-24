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
var collection_item_component_1 = require("../common/collection-item.component");
/**
 * @hidden
 */
var CategoryAxisItemComponentGenerated = (function (_super) {
    __extends(CategoryAxisItemComponentGenerated, _super);
    function CategoryAxisItemComponentGenerated(configurationService, collectionService) {
        var _this = _super.call(this, configurationService, collectionService) || this;
        _this.configurationService = configurationService;
        _this.collectionService = collectionService;
        return _this;
    }
    return CategoryAxisItemComponentGenerated;
}(collection_item_component_1.CollectionItemComponent));
CategoryAxisItemComponentGenerated.propDecorators = {
    'autoBaseUnitSteps': [{ type: core_1.Input },],
    'axisCrossingValue': [{ type: core_1.Input },],
    'background': [{ type: core_1.Input },],
    'baseUnit': [{ type: core_1.Input },],
    'baseUnitStep': [{ type: core_1.Input },],
    'categories': [{ type: core_1.Input },],
    'color': [{ type: core_1.Input },],
    'justified': [{ type: core_1.Input },],
    'line': [{ type: core_1.Input },],
    'majorGridLines': [{ type: core_1.Input },],
    'majorTicks': [{ type: core_1.Input },],
    'max': [{ type: core_1.Input },],
    'maxDateGroups': [{ type: core_1.Input },],
    'min': [{ type: core_1.Input },],
    'minorGridLines': [{ type: core_1.Input },],
    'minorTicks': [{ type: core_1.Input },],
    'name': [{ type: core_1.Input },],
    'pane': [{ type: core_1.Input },],
    'plotBands': [{ type: core_1.Input },],
    'reverse': [{ type: core_1.Input },],
    'roundToBaseUnit': [{ type: core_1.Input },],
    'startAngle': [{ type: core_1.Input },],
    'type': [{ type: core_1.Input },],
    'visible': [{ type: core_1.Input },],
    'weekStartDay': [{ type: core_1.Input },],
    'crosshair': [{ type: core_1.Input },],
    'labels': [{ type: core_1.Input },],
    'notes': [{ type: core_1.Input },],
    'select': [{ type: core_1.Input },],
    'title': [{ type: core_1.Input },],
};
exports.CategoryAxisItemComponentGenerated = CategoryAxisItemComponentGenerated;
