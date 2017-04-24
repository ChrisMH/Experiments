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
import { InstanceObserver } from '@progress/kendo-charts';
/**
 * @hidden
 */
var ChartInstanceObserver = (function (_super) {
    __extends(ChartInstanceObserver, _super);
    function ChartInstanceObserver(ngZone, observer) {
        var _this = _super.call(this, observer) || this;
        _this.ngZone = ngZone;
        _this.handlerMap = {
            hideTooltip: 'onHideTooltip',
            legendItemClick: 'onLegendItemClick',
            render: 'onRender',
            showTooltip: 'onShowTooltip'
        };
        return _this;
    }
    ChartInstanceObserver.prototype.callObserver = function (fnName) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var isDefaultPrevented = false;
        this.ngZone.run(function () {
            isDefaultPrevented = _this.observer[fnName].apply(_this.observer, args);
        });
        return isDefaultPrevented;
    };
    return ChartInstanceObserver;
}(InstanceObserver));
export { ChartInstanceObserver };
