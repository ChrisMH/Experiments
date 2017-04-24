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
 * Arguments for the `axisLabelClick` event.
 */
var AxisLabelClickEvent = (function (_super) {
    __extends(AxisLabelClickEvent, _super);
    /**
     * @hidden
     */
    function AxisLabelClickEvent(e, sender) {
        var _this = _super.call(this, sender) || this;
        _this.axis = e.axis;
        _this.dataItem = e.dataItem;
        _this.index = e.index;
        _this.text = e.text;
        _this.value = e.value;
        return _this;
    }
    return AxisLabelClickEvent;
}(BaseEvent));
export { AxisLabelClickEvent };
