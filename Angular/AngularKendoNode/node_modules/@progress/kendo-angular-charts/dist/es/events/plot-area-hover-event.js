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
import { BaseEvent } from './base-event';
/**
 * Arguments for the `plotAreaHover` event.
 */
var PlotAreaHoverEvent = (function (_super) {
    __extends(PlotAreaHoverEvent, _super);
    /**
     * @hidden
     */
    function PlotAreaHoverEvent(e, sender) {
        var _this = _super.call(this, sender) || this;
        _this.category = e.category;
        _this.originalEvent = e.originalEvent;
        _this.value = e.value;
        _this.x = e.x;
        _this.y = e.y;
        return _this;
    }
    return PlotAreaHoverEvent;
}(BaseEvent));
export { PlotAreaHoverEvent };
