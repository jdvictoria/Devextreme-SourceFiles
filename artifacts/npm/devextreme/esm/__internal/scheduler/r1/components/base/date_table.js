/**
* DevExtreme (esm/__internal/scheduler/r1/components/base/date_table.js)
* Version: 24.1.1
* Build date: Tue May 07 2024
*
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { createComponentVNode, normalizeProps } from "inferno";
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import { createReRenderEffect, InfernoWrapperComponent } from '@devextreme/runtime/inferno';
import { getTemplate } from '../../../../core/r1/utils/index';
import { DateTableBody, DateTableBodyDefaultProps } from './date_table_body';
import { DateTableCellBase } from './date_table_cell_base';
import { LayoutDefaultProps } from './layout_props';
import { Table } from './table';
export var DateTableDefaultProps = _extends(_extends({}, LayoutDefaultProps), {
  // @ts-expect-error Different types between React and Inferno
  cellTemplate: DateTableCellBase
});
export class DateTable extends InfernoWrapperComponent {
  createEffects() {
    return [createReRenderEffect()];
  }
  render() {
    var _a, _b, _c, _d;
    var _e = this.props,
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
    var classes = addDateTableClass ? 'dx-scheduler-date-table' : undefined;
    var topVirtualRowHeight = (_a = viewData.topVirtualRowHeight) !== null && _a !== void 0 ? _a : 0;
    var bottomVirtualRowHeight = (_b = viewData.bottomVirtualRowHeight) !== null && _b !== void 0 ? _b : 0;
    var leftVirtualCellWidth = (_c = viewData.leftVirtualCellWidth) !== null && _c !== void 0 ? _c : 0;
    var rightVirtualCellWidth = (_d = viewData.rightVirtualCellWidth) !== null && _d !== void 0 ? _d : 0;
    var virtualCellsCount = viewData.groupedData[0].dateTable[0].cells.length;
    var CellTemplateComponent = getTemplate(cellTemplate);
    var DataCellTemplateComponent = getTemplate(dataCellTemplate);
    return normalizeProps(createComponentVNode(2, Table, _extends({}, restProps, {
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
      children: createComponentVNode(2, DateTableBody, {
        "cellTemplate": CellTemplateComponent,
        "viewData": viewData,
        "dataCellTemplate": DataCellTemplateComponent,
        "leftVirtualCellWidth": leftVirtualCellWidth,
        "rightVirtualCellWidth": rightVirtualCellWidth,
        "groupOrientation": groupOrientation,
        "addVerticalSizesClassToRows": addVerticalSizesClassToRows,
        "topVirtualRowHeight": DateTableBodyDefaultProps.topVirtualRowHeight,
        "bottomVirtualRowHeight": DateTableBodyDefaultProps.bottomVirtualRowHeight,
        "addDateTableClass": DateTableBodyDefaultProps.addDateTableClass
      })
    })));
  }
}
DateTable.defaultProps = DateTableDefaultProps;
