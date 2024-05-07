/**
* DevExtreme (cjs/__internal/scheduler/r1/components/base/all_day_panel_table_body.js)
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
exports.AllDayPanelTableBodyDefaultProps = exports.AllDayPanelTableBody = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _index = require("../../../../core/r1/utils/index");
var _index2 = require("../../utils/index");
var _all_day_panel_cell = require("./all_day_panel_cell");
var _row = require("./row");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
const AllDayPanelTableBodyDefaultProps = exports.AllDayPanelTableBodyDefaultProps = {
  viewData: [],
  isVerticalGroupOrientation: false,
  className: '',
  leftVirtualCellWidth: 0,
  rightVirtualCellWidth: 0
};
let AllDayPanelTableBody = exports.AllDayPanelTableBody = /*#__PURE__*/function (_BaseInfernoComponent) {
  _inheritsLoose(AllDayPanelTableBody, _BaseInfernoComponent);
  function AllDayPanelTableBody() {
    return _BaseInfernoComponent.apply(this, arguments) || this;
  }
  var _proto = AllDayPanelTableBody.prototype;
  _proto.render = function render() {
    const {
      className,
      leftVirtualCellWidth,
      rightVirtualCellWidth,
      leftVirtualCellCount,
      rightVirtualCellCount,
      viewData,
      isVerticalGroupOrientation,
      dataCellTemplate
    } = this.props;
    const classes = _index2.renderUtils.combineClasses({
      'dx-scheduler-all-day-table-row': true,
      [className !== null && className !== void 0 ? className : '']: !!className
    });
    const DataCellTemplateComponent = (0, _index.getTemplate)(dataCellTemplate);
    return (0, _inferno.createComponentVNode)(2, _row.Row, {
      "leftVirtualCellWidth": leftVirtualCellWidth,
      "rightVirtualCellWidth": rightVirtualCellWidth,
      "leftVirtualCellCount": leftVirtualCellCount,
      "rightVirtualCellCount": rightVirtualCellCount,
      "className": classes,
      children: viewData.map(_ref => {
        let {
          endDate,
          groupIndex: cellGroupIndex,
          groups,
          index: cellIndex,
          isFirstGroupCell,
          isFocused,
          isLastGroupCell,
          isSelected,
          key,
          startDate
        } = _ref;
        return (0, _inferno.createComponentVNode)(2, _all_day_panel_cell.AllDayPanelCell, {
          "isFirstGroupCell": !isVerticalGroupOrientation && isFirstGroupCell,
          "isLastGroupCell": !isVerticalGroupOrientation && isLastGroupCell,
          "startDate": startDate,
          "endDate": endDate,
          "groups": groups,
          "groupIndex": cellGroupIndex,
          "index": cellIndex,
          "dataCellTemplate": DataCellTemplateComponent,
          "isSelected": isSelected !== null && isSelected !== void 0 ? isSelected : false,
          "isFocused": isFocused !== null && isFocused !== void 0 ? isFocused : false
        }, key);
      })
    });
  };
  return AllDayPanelTableBody;
}(_inferno2.BaseInfernoComponent);
AllDayPanelTableBody.defaultProps = AllDayPanelTableBodyDefaultProps;
