/**
* DevExtreme (esm/__internal/scheduler/r1/components/base/all_day_panel_cell.js)
* Version: 24.1.1
* Build date: Tue May 07 2024
*
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { createComponentVNode } from "inferno";
import { BaseInfernoComponent } from '@devextreme/runtime/inferno';
import { getTemplate } from '../../../../core/r1/utils/index';
import { ALL_DAY_PANEL_CELL_CLASS } from '../const';
import { DateTableCallBaseDefaultProps, DateTableCellBase } from './date_table_cell_base';
export class AllDayPanelCell extends BaseInfernoComponent {
  render() {
    var {
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
    var DataCellTemplateComponent = getTemplate(dataCellTemplate);
    return createComponentVNode(2, DateTableCellBase, {
      "className": "".concat(ALL_DAY_PANEL_CELL_CLASS, " ").concat(className),
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
  }
}
AllDayPanelCell.defaultProps = DateTableCallBaseDefaultProps;
