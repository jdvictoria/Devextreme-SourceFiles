/**
* DevExtreme (cjs/__internal/scheduler/r1/components/base/all_day_panel_table.js)
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
exports.AllDayTable = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _index = require("../../../../core/r1/utils/index");
var _const = require("../const");
var _all_day_panel_table_body = require("./all_day_panel_table_body");
var _layout_props = require("./layout_props");
var _table = require("./table");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
let AllDayTable = exports.AllDayTable = /*#__PURE__*/function (_InfernoWrapperCompon) {
  _inheritsLoose(AllDayTable, _InfernoWrapperCompon);
  function AllDayTable() {
    var _this;
    _this = _InfernoWrapperCompon.apply(this, arguments) || this;
    _this.allDayPanelData = null;
    return _this;
  }
  var _proto = AllDayTable.prototype;
  _proto.createEffects = function createEffects() {
    return [(0, _inferno2.createReRenderEffect)()];
  };
  _proto.getAllDayPanelData = function getAllDayPanelData() {
    if (this.allDayPanelData !== null) {
      return this.allDayPanelData;
    }
    this.allDayPanelData = this.props.viewData.groupedData[0].allDayPanel;
    return this.allDayPanelData;
  };
  _proto.componentWillUpdate = function componentWillUpdate(nextProps) {
    _InfernoWrapperCompon.prototype.componentWillUpdate.call(this);
    if (this.props.viewData !== nextProps.viewData) {
      this.allDayPanelData = null;
    }
  };
  _proto.render = function render() {
    var _a, _b;
    const {
      width,
      tableRef,
      viewData,
      dataCellTemplate
    } = this.props;
    const allDayPanelData = this.getAllDayPanelData();
    const DataCellTemplateComponent = (0, _index.getTemplate)(dataCellTemplate);
    return (0, _inferno.createComponentVNode)(2, _table.Table, {
      "className": "dx-scheduler-all-day-table",
      "height": allDayPanelData ? undefined : _const.DefaultSizes.allDayPanelHeight,
      "width": width,
      "tableRef": tableRef,
      children: (0, _inferno.createComponentVNode)(2, _all_day_panel_table_body.AllDayPanelTableBody, {
        "viewData": allDayPanelData !== null && allDayPanelData !== void 0 ? allDayPanelData : _all_day_panel_table_body.AllDayPanelTableBodyDefaultProps.viewData,
        "leftVirtualCellWidth": (_a = viewData.leftVirtualCellWidth) !== null && _a !== void 0 ? _a : _all_day_panel_table_body.AllDayPanelTableBodyDefaultProps.leftVirtualCellWidth,
        "rightVirtualCellWidth": (_b = viewData.rightVirtualCellWidth) !== null && _b !== void 0 ? _b : _all_day_panel_table_body.AllDayPanelTableBodyDefaultProps.rightVirtualCellWidth,
        "leftVirtualCellCount": viewData.leftVirtualCellCount,
        "rightVirtualCellCount": viewData.rightVirtualCellCount,
        "dataCellTemplate": DataCellTemplateComponent
      })
    });
  };
  return AllDayTable;
}(_inferno2.InfernoWrapperComponent);
AllDayTable.defaultProps = _layout_props.LayoutDefaultProps;
