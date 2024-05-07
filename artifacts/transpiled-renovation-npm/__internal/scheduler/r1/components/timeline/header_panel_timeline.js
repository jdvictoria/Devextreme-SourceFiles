"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeaderPanelTimeline = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _index = require("../../../../core/r1/utils/index");
var _header_panel = require("../base/header_panel");
var _date_header_timeline = require("./date_header_timeline");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
let HeaderPanelTimeline = exports.HeaderPanelTimeline = /*#__PURE__*/function (_InfernoWrapperCompon) {
  _inheritsLoose(HeaderPanelTimeline, _InfernoWrapperCompon);
  function HeaderPanelTimeline() {
    return _InfernoWrapperCompon.apply(this, arguments) || this;
  }
  var _proto = HeaderPanelTimeline.prototype;
  _proto.createEffects = function createEffects() {
    return [(0, _inferno2.createReRenderEffect)()];
  };
  _proto.render = function render() {
    const {
      dateCellTemplate,
      dateHeaderData,
      groupByDate,
      groupOrientation,
      groupPanelData,
      groups,
      isRenderDateHeader,
      resourceCellTemplate,
      timeCellTemplate
    } = this.props;
    const DateCellTemplateComponent = (0, _index.getTemplate)(dateCellTemplate);
    const ResourceCellTemplateComponent = (0, _index.getTemplate)(resourceCellTemplate);
    const TimeCellTemplateComponent = (0, _index.getTemplate)(timeCellTemplate);
    return (0, _inferno.createComponentVNode)(2, _header_panel.HeaderPanel, {
      "dateHeaderData": dateHeaderData,
      "groupPanelData": groupPanelData,
      "groupByDate": groupByDate,
      "groups": groups,
      "groupOrientation": groupOrientation,
      "isRenderDateHeader": isRenderDateHeader,
      "dateHeaderTemplate": _date_header_timeline.TimelineDateHeaderLayout,
      "resourceCellTemplate": ResourceCellTemplateComponent,
      "dateCellTemplate": DateCellTemplateComponent,
      "timeCellTemplate": TimeCellTemplateComponent
    });
  };
  return HeaderPanelTimeline;
}(_inferno2.InfernoWrapperComponent);
HeaderPanelTimeline.defaultProps = _header_panel.HeaderPanelDefaultProps;