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
var PaneComponentGenerated = (function (_super) {
    __extends(PaneComponentGenerated, _super);
    function PaneComponentGenerated(configurationService, collectionService) {
        var _this = _super.call(this, configurationService, collectionService) || this;
        _this.configurationService = configurationService;
        _this.collectionService = collectionService;
        return _this;
    }
    return PaneComponentGenerated;
}(CollectionItemComponent));
export { PaneComponentGenerated };
PaneComponentGenerated.propDecorators = {
    'background': [{ type: Input },],
    'border': [{ type: Input },],
    'clip': [{ type: Input },],
    'height': [{ type: Input },],
    'margin': [{ type: Input },],
    'name': [{ type: Input },],
    'padding': [{ type: Input },],
    'title': [{ type: Input },],
};
