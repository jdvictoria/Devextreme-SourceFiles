/**
* DevExtreme (cjs/__internal/scheduler/r1/components/base/all_day_panel_cell.js)
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
exports.AllDayPanelCell = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _index = require("../../../../core/r1/utils/index");
var _const = require("../const");
var _date_table_cell_base = require("./date_table_cell_base");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
let AllDayPanelCell = exports.AllDayPanelCell = /*#__PURE__*/function (_BaseInfernoComponent) {
  _inheritsLoose(AllDayPanelCell, _BaseInfernoComponent);
  function AllDayPanelCell() {
    return _BaseInfernoComponent.apply(this, arguments) || this;
  }
  var _proto = AllDayPanelCell.prototype;
  _proto.render = function render() {
    const {
      className,
      dataCellTemplate,
      endDate,
      groupIndex,
      groups,
      index,
      isFirstGroupCell,
      isFocused,
      isLastGroupCell,
      isSelected,
      startDate
    } = this.props;
    const DataCellTemplateComponent = (0, _index.getTemplate)(dataCellTemplate);
    return (0, _inferno.createComponentVNode)(2, _date_table_cell_base.DateTableCellBase, {
      "className": "".concat(_const.ALL_DAY_PANEL_CELL_CLASS, " ").concat(className),
      "startDate": startDate,
      "endDate": endDate,
      "groups": groups,
      "groupIndex": groupIndex,
      "allDay": true,
      "isFirstGroupCell": isFirstGroupCell,
      "isLastGroupCell": isLastGroupCell,
      "index": index,
      "dataCellTemplate": DataCellTemplateComponent,
      "isSelected": isSelected,
      "isFocused": isFocused
    });
  };
  return AllDayPanelCell;
}(_inferno2.BaseInfernoComponent);
AllDayPanelCell.defaultProps = _date_table_cell_base.DateTableCallBaseDefaultProps;
