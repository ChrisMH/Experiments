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
 * Arguments for the `seriesHover` event.
 */
var SeriesHoverEvent = (function (_super) {
    __extends(SeriesHoverEvent, _super);
    /**
     * @hidden
     */
    function SeriesHoverEvent(e, sender) {
        var _this = _super.call(this, sender) || this;
        _this.category = e.category;
        _this.categoryPoints = e.categoryPoints;
        _this.dataItem = e.dataItem;
        _this.originalEvent = e.originalEvent;
        _this.percentage = e.percentage;
        _this.point = e.point;
        _this.series = e.series;
        _this.stackValue = e.stackValue;
        _this.value = e.value;
        return _this;
    }
    return SeriesHoverEvent;
}(BaseEvent));
export { SeriesHoverEvent };
