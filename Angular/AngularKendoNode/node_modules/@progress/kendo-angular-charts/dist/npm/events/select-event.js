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
var preventable_event_1 = require("./preventable-event");
/**
 * Arguments for the `select` event.
 */
var SelectEvent = (function (_super) {
    __extends(SelectEvent, _super);
    /**
     * @hidden
     */
    function SelectEvent(e, sender) {
        var _this = _super.call(this, sender) || this;
        _this.axis = e.axis;
        _this.from = e.from;
        _this.to = e.to;
        return _this;
    }
    return SelectEvent;
}(preventable_event_1.PreventableEvent));
exports.SelectEvent = SelectEvent;
