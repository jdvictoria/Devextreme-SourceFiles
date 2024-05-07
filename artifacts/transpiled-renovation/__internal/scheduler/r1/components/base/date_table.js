"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateTableDefaultProps = exports.DateTable = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _index = require("../../../../core/r1/utils/index");
var _date_table_body = require("./date_table_body");
var _date_table_cell_base = require("./date_table_cell_base");
var _layout_props = require("./layout_props");
var _table = require("./table");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const DateTableDefaultProps = exports.DateTableDefaultProps = _extends(_extends({}, _layout_props.LayoutDefaultProps), {
  // @ts-expect-error Different types between React and Inferno
  cellTemplate: _date_table_cell_base.DateTableCellBase
});
let DateTable = exports.DateTable = /*#__PURE__*/function (_InfernoWrapperCompon) {
  _inheritsLoose(DateTable, _InfernoWrapperCompon);
  function DateTable() {
    return _InfernoWrapperCompon.apply(this, arguments) || this;
  }
  var _proto = DateTable.prototype;
  _proto.createEffects = function createEffects() {
    return [(0, _inferno2.createReRenderEffect)()];
  };
  _proto.render = function render() {
    var _a, _b, _c, _d;
    const _e = this.props,
      {
        addDateTableClass,
        tableRef,
        viewData,
        width,
        cellTemplate,
        dataCellTemplate,
        groupOrientation,
        addVerticalSizesClassToRows
      } = _e,
      restProps = __rest(_e, ["addDateTableClass", "tableRef", "viewData", "width", "cellTemplate", "dataCellTemplate", "groupOrientation", "addVerticalSizesClassToRows"]);
    const classes = addDateTableClass ? 'dx-scheduler-date-table' : undefined;
    const topVirtualRowHeight = (_a = viewData.topVirtualRowHeight) !== null && _a !== void 0 ? _a : 0;
    const bottomVirtualRowHeight = (_b = viewData.bottomVirtualRowHeight) !== null && _b !== void 0 ? _b : 0;
    const leftVirtualCellWidth = (_c = viewData.leftVirtualCellWidth) !== null && _c !== void 0 ? _c : 0;
    const rightVirtualCellWidth = (_d = viewData.rightVirtualCellWidth) !== null && _d !== void 0 ? _d : 0;
    const virtualCellsCount = viewData.groupedData[0].dateTable[0].cells.length;
    const CellTemplateComponent = (0, _index.getTemplate)(cellTemplate);
    const DataCellTemplateComponent = (0, _index.getTemplate)(dataCellTemplate);
    return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _table.Table, _extends({}, restProps, {
      "tableRef": tableRef,
      "topVirtualRowHeight": topVirtualRowHeight,
      "bottomVirtualRowHeight": bottomVirtualRowHeight,
      "leftVirtualCellWidth": leftVirtualCellWidth,
      "rightVirtualCellWidth": rightVirtualCellWidth,
      "leftVirtualCellCount": viewData.leftVirtualCellCount,
      "rightVirtualCellCount": viewData.rightVirtualCellCount,
      "virtualCellsCount": virtualCellsCount,
      "className": classes,
      "width": width,
      children: (0, _inferno.createComponentVNode)(2, _date_table_body.DateTableBody, {
        "cellTemplate": CellTemplateComponent,
        "viewData": viewData,
        "dataCellTemplate": DataCellTemplateComponent,
        "leftVirtualCellWidth": leftVirtualCellWidth,
        "rightVirtualCellWidth": rightVirtualCellWidth,
        "groupOrientation": groupOrientation,
        "addVerticalSizesClassToRows": addVerticalSizesClassToRows,
        "topVirtualRowHeight": _date_table_body.DateTableBodyDefaultProps.topVirtualRowHeight,
        "bottomVirtualRowHeight": _date_table_body.DateTableBodyDefaultProps.bottomVirtualRowHeight,
        "addDateTableClass": _date_table_body.DateTableBodyDefaultProps.addDateTableClass
      })
    })));
  };
  return DateTable;
}(_inferno2.InfernoWrapperComponent);
DateTable.defaultProps = DateTableDefaultProps;