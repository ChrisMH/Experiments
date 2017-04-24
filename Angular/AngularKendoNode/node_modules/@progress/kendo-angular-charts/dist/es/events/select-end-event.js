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
 * Arguments for the `selectEnd` event.
 */
var SelectEndEvent = (function (_super) {
    __extends(SelectEndEvent, _super);
    /**
     * @hidden
     */
    function SelectEndEvent(e, sender) {
        var _this = _super.call(this, sender) || this;
        _this.axis = e.axis;
        _this.from = e.from;
        _this.to = e.to;
        return _this;
    }
    return SelectEndEvent;
}(BaseEvent));
export { SelectEndEvent };
