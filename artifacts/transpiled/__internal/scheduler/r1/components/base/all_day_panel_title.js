"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AllDayPanelTitle = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _message = _interopRequireDefault(require("../../../../../localization/message"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
let AllDayPanelTitle = exports.AllDayPanelTitle = /*#__PURE__*/function (_InfernoWrapperCompon) {
  _inheritsLoose(AllDayPanelTitle, _InfernoWrapperCompon);
  function AllDayPanelTitle() {
    return _InfernoWrapperCompon.apply(this, arguments) || this;
  }
  var _proto = AllDayPanelTitle.prototype;
  _proto.createEffects = function createEffects() {
    return [(0, _inferno2.createReRenderEffect)()];
  };
  _proto.render = function render() {
    const text = _message.default.format('dxScheduler-allDay');
    return (0, _inferno.createVNode)(1, "div", "dx-scheduler-all-day-title", text, 0);
  };
  return AllDayPanelTitle;
}(_inferno2.InfernoWrapperComponent);
AllDayPanelTitle.defaultProps = {};