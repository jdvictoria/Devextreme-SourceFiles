/**
* DevExtreme (esm/__internal/scheduler/r1/components/base/time_panel_table.js)
* Version: 24.1.1
* Build date: Tue May 07 2024
*
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { createFragment, createComponentVNode, normalizeProps } from "inferno";
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
import { Fragment } from 'inferno';
import { AllDayPanelTitle } from './all_day_panel_title';
import { CellBase, CellBaseDefaultProps } from './cell';
import { Row, RowDefaultProps } from './row';
import { Table } from './table';
import { TimePanelCell } from './time_panel_cell';
export var TimePanelTableDefaultProps = {
  timePanelData: {
    groupedData: [],
    leftVirtualCellCount: 0,
    rightVirtualCellCount: 0,
    topVirtualRowCount: 0,
    bottomVirtualRowCount: 0
  }
};
export class TimePanelTable extends InfernoWrapperComponent {
  createEffects() {
    return [createReRenderEffect()];
  }
  render() {
    var _a = this.props,
      {
        timePanelData,
        tableRef,
        timeCellTemplate
      } = _a,
      restProps = __rest(_a, ["timePanelData", "tableRef", "timeCellTemplate"]);
    var {
      topVirtualRowHeight,
      bottomVirtualRowHeight
    } = timePanelData;
    var TimeCellTemplateComponent = getTemplate(timeCellTemplate);
    return normalizeProps(createComponentVNode(2, Table, _extends({}, restProps, {
      "className": "dx-scheduler-time-panel",
      "topVirtualRowHeight": topVirtualRowHeight !== null && topVirtualRowHeight !== void 0 ? topVirtualRowHeight : 0,
      "bottomVirtualRowHeight": bottomVirtualRowHeight !== null && bottomVirtualRowHeight !== void 0 ? bottomVirtualRowHeight : 0,
      "virtualCellsCount": 1,
      "tableRef": tableRef,
      children: timePanelData.groupedData.map(_ref => {
        var {
          dateTable,
          groupIndex,
          isGroupedAllDayPanel,
          key: fragmentKey
        } = _ref;
        return createFragment([isGroupedAllDayPanel && createComponentVNode(2, Row, {
          "leftVirtualCellWidth": RowDefaultProps.leftVirtualCellWidth,
          "rightVirtualCellWidth": RowDefaultProps.rightVirtualCellWidth,
          children: createComponentVNode(2, CellBase, {
            "className": "dx-scheduler-time-panel-title-cell",
            "startDate": CellBaseDefaultProps.startDate,
            "endDate": CellBaseDefaultProps.endDate,
            "index": CellBaseDefaultProps.index,
            children: createComponentVNode(2, AllDayPanelTitle)
          })
        }), dateTable.map(_ref2 => {
          var {
            groups,
            highlighted,
            index: cellIndex,
            isFirstGroupCell,
            isLastGroupCell,
            key,
            startDate,
            text
          } = _ref2;
          return createComponentVNode(2, Row, {
            "className": "dx-scheduler-time-panel-row",
            "leftVirtualCellWidth": RowDefaultProps.leftVirtualCellWidth,
            "rightVirtualCellWidth": RowDefaultProps.rightVirtualCellWidth,
            children: createComponentVNode(2, TimePanelCell, {
              "startDate": startDate,
              "endDate": CellBaseDefaultProps.endDate,
              "text": text,
              "groups": groups,
              "groupIndex": groupIndex,
              "isFirstGroupCell": isFirstGroupCell,
              "isLastGroupCell": isLastGroupCell,
              "index": cellIndex,
              "timeCellTemplate": TimeCellTemplateComponent,
              "highlighted": highlighted
            })
          }, key);
        })], 0, fragmentKey);
      })
    })));
  }
}
TimePanelTable.defaultProps = TimePanelTableDefaultProps;
