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
var SeriesItemComponentGenerated = (function (_super) {
    __extends(SeriesItemComponentGenerated, _super);
    function SeriesItemComponentGenerated(configurationService, collectionService) {
        var _this = _super.call(this, configurationService, collectionService) || this;
        _this.configurationService = configurationService;
        _this.collectionService = collectionService;
        return _this;
    }
    return SeriesItemComponentGenerated;
}(collection_item_component_1.CollectionItemComponent));
SeriesItemComponentGenerated.propDecorators = {
    'aggregate': [{ type: core_1.Input },],
    'axis': [{ type: core_1.Input },],
    'border': [{ type: core_1.Input },],
    'categoryAxis': [{ type: core_1.Input },],
    'categoryField': [{ type: core_1.Input },],
    'closeField': [{ type: core_1.Input },],
    'color': [{ type: core_1.Input },],
    'colorField': [{ type: core_1.Input },],
    'connectors': [{ type: core_1.Input },],
    'currentField': [{ type: core_1.Input },],
    'dashType': [{ type: core_1.Input },],
    'data': [{ type: core_1.Input },],
    'downColor': [{ type: core_1.Input },],
    'downColorField': [{ type: core_1.Input },],
    'dynamicHeight': [{ type: core_1.Input },],
    'dynamicSlope': [{ type: core_1.Input },],
    'errorHighField': [{ type: core_1.Input },],
    'errorLowField': [{ type: core_1.Input },],
    'explodeField': [{ type: core_1.Input },],
    'field': [{ type: core_1.Input },],
    'fromField': [{ type: core_1.Input },],
    'gap': [{ type: core_1.Input },],
    'highField': [{ type: core_1.Input },],
    'holeSize': [{ type: core_1.Input },],
    'line': [{ type: core_1.Input },],
    'lowField': [{ type: core_1.Input },],
    'lowerField': [{ type: core_1.Input },],
    'margin': [{ type: core_1.Input },],
    'maxSize': [{ type: core_1.Input },],
    'meanField': [{ type: core_1.Input },],
    'medianField': [{ type: core_1.Input },],
    'minSize': [{ type: core_1.Input },],
    'missingValues': [{ type: core_1.Input },],
    'name': [{ type: core_1.Input },],
    'neckRatio': [{ type: core_1.Input },],
    'negativeColor': [{ type: core_1.Input },],
    'negativeValues': [{ type: core_1.Input },],
    'noteTextField': [{ type: core_1.Input },],
    'opacity': [{ type: core_1.Input },],
    'openField': [{ type: core_1.Input },],
    'outliersField': [{ type: core_1.Input },],
    'overlay': [{ type: core_1.Input },],
    'padding': [{ type: core_1.Input },],
    'q1Field': [{ type: core_1.Input },],
    'q3Field': [{ type: core_1.Input },],
    'segmentSpacing': [{ type: core_1.Input },],
    'size': [{ type: core_1.Input },],
    'sizeField': [{ type: core_1.Input },],
    'spacing': [{ type: core_1.Input },],
    'stack': [{ type: core_1.Input },],
    'startAngle': [{ type: core_1.Input },],
    'style': [{ type: core_1.Input },],
    'summaryField': [{ type: core_1.Input },],
    'target': [{ type: core_1.Input },],
    'toField': [{ type: core_1.Input },],
    'type': [{ type: core_1.Input },],
    'upperField': [{ type: core_1.Input },],
    'visible': [{ type: core_1.Input },],
    'visibleInLegend': [{ type: core_1.Input },],
    'visibleInLegendField': [{ type: core_1.Input },],
    'visual': [{ type: core_1.Input },],
    'width': [{ type: core_1.Input },],
    'xAxis': [{ type: core_1.Input },],
    'xErrorHighField': [{ type: core_1.Input },],
    'xErrorLowField': [{ type: core_1.Input },],
    'xField': [{ type: core_1.Input },],
    'yAxis': [{ type: core_1.Input },],
    'yErrorHighField': [{ type: core_1.Input },],
    'yErrorLowField': [{ type: core_1.Input },],
    'yField': [{ type: core_1.Input },],
    'zIndex': [{ type: core_1.Input },],
    'errorBars': [{ type: core_1.Input },],
    'extremes': [{ type: core_1.Input },],
    'highlight': [{ type: core_1.Input },],
    'labels': [{ type: core_1.Input },],
    'markers': [{ type: core_1.Input },],
    'notes': [{ type: core_1.Input },],
    'outliers': [{ type: core_1.Input },],
    'tooltip': [{ type: core_1.Input },],
};
exports.SeriesItemComponentGenerated = SeriesItemComponentGenerated;
