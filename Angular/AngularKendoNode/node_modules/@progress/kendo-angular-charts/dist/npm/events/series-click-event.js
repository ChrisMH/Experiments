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
var base_event_1 = require("./base-event");
/**
 * Arguments for the `seriesClick` event.
 */
var SeriesClickEvent = (function (_super) {
    __extends(SeriesClickEvent, _super);
    /**
     * @hidden
     */
    function SeriesClickEvent(e, sender) {
        var _this = _super.call(this, sender) || this;
        _this.category = e.category;
        _this.dataItem = e.dataItem;
        _this.originalEvent = e.originalEvent;
        _this.percentage = e.percentage;
        _this.point = e.point;
        _this.series = e.series;
        _this.stackValue = e.stackValue;
        _this.value = e.value;
        return _this;
    }
    return SeriesClickEvent;
}(base_event_1.BaseEvent));
exports.SeriesClickEvent = SeriesClickEvent;
