/**
* DevExtreme (cjs/__internal/scheduler/r1/components/base/group_panel_vertical_row.js)
* Version: 24.1.1
* Build date: Tue May 07 2024
*
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupPanelVerticalRow = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _index = require("../../../../core/r1/utils/index");
var _group_panel_props = require("./group_panel_props");
var _group_panel_vertical_cell = require("./group_panel_vertical_cell");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
let GroupPanelVerticalRow = exports.GroupPanelVerticalRow = /*#__PURE__*/function (_BaseInfernoComponent) {
  _inheritsLoose(GroupPanelVerticalRow, _BaseInfernoComponent);
  function GroupPanelVerticalRow() {
    return _BaseInfernoComponent.apply(this, arguments) || this;
  }
  var _proto = GroupPanelVerticalRow.prototype;
  _proto.render = function render() {
    const {
      className,
      groupItems,
      cellTemplate
    } = this.props;
    const CellTemplateComponent = (0, _index.getTemplate)(cellTemplate);
    return (0, _inferno.createVNode)(1, "div", "dx-scheduler-group-row ".concat(className), groupItems.map((_ref, index) => {
      let {
        color,
        data,
        id,
        key,
        text
      } = _ref;
      return (0, _inferno.createComponentVNode)(2, _group_panel_vertical_cell.GroupPanelVerticalCell, {
        "text": text,
        "id": id,
        "data": data,
        "index": index,
        "color": color,
        "cellTemplate": CellTemplateComponent
      }, key);
    }), 0);
  };
  return GroupPanelVerticalRow;
}(_inferno2.BaseInfernoComponent);
GroupPanelVerticalRow.defaultProps = _group_panel_props.GroupPanelRowDefaultProps;