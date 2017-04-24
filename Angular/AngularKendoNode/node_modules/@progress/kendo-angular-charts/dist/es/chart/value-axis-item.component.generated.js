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
import { Input } from '@angular/core';
import { CollectionItemComponent } from '../common/collection-item.component';
/**
 * @hidden
 */
var ValueAxisItemComponentGenerated = (function (_super) {
    __extends(ValueAxisItemComponentGenerated, _super);
    function ValueAxisItemComponentGenerated(configurationService, collectionService) {
        var _this = _super.call(this, configurationService, collectionService) || this;
        _this.configurationService = configurationService;
        _this.collectionService = collectionService;
        return _this;
    }
    return ValueAxisItemComponentGenerated;
}(CollectionItemComponent));
export { ValueAxisItemComponentGenerated };
ValueAxisItemComponentGenerated.propDecorators = {
    'axisCrossingValue': [{ type: Input },],
    'background': [{ type: Input },],
    'color': [{ type: Input },],
    'line': [{ type: Input },],
    'majorGridLines': [{ type: Input },],
    'majorTicks': [{ type: Input },],
    'majorUnit': [{ type: Input },],
    'max': [{ type: Input },],
    'min': [{ type: Input },],
    'minorGridLines': [{ type: Input },],
    'minorTicks': [{ type: Input },],
    'minorUnit': [{ type: Input },],
    'name': [{ type: Input },],
    'narrowRange': [{ type: Input },],
    'pane': [{ type: Input },],
    'plotBands': [{ type: Input },],
    'reverse': [{ type: Input },],
    'type': [{ type: Input },],
    'visible': [{ type: Input },],
    'crosshair': [{ type: Input },],
    'labels': [{ type: Input },],
    'notes': [{ type: Input },],
    'title': [{ type: Input },],
};
