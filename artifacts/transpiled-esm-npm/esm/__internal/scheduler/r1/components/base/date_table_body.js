import _extends from "@babel/runtime/helpers/esm/extends";
import { createFragment, createComponentVNode } from "inferno";
import { BaseInfernoComponent } from '@devextreme/runtime/inferno';
import { getTemplate } from '../../../../core/r1/utils/index';
import { Fragment } from 'inferno';
import { renderUtils } from '../../utils/index';
import { DATE_TABLE_ROW_CLASS } from '../const';
import { AllDayPanelTableBody, AllDayPanelTableBodyDefaultProps } from './all_day_panel_table_body';
import { DateTableCellBase } from './date_table_cell_base';
import { LayoutDefaultProps } from './layout_props';
import { Row, RowDefaultProps } from './row';
export var DateTableBodyDefaultProps = _extends(_extends({}, LayoutDefaultProps), {
  // @ts-expect-error Different types between React and Inferno
  cellTemplate: DateTableCellBase
});
export class DateTableBody extends BaseInfernoComponent {
  render() {
    var {
      addVerticalSizesClassToRows,
      viewData,
      cellTemplate,
      dataCellTemplate
    } = this.props;
    var rowClasses = renderUtils.combineClasses({
      [DATE_TABLE_ROW_CLASS]: true,
      'dx-scheduler-cell-sizes-vertical': addVerticalSizesClassToRows
    });
    var CellTemplateComponent = getTemplate(cellTemplate);
    var DataCellTemplateComponent = getTemplate(dataCellTemplate);
    return createFragment(viewData.groupedData.map(_ref => {
      var {
        allDayPanel,
        dateTable,
        isGroupedAllDayPanel,
        key: fragmentKey
      } = _ref;
      var _a, _b;
      return createFragment([isGroupedAllDayPanel && createComponentVNode(2, AllDayPanelTableBody, {
        "viewData": allDayPanel !== null && allDayPanel !== void 0 ? allDayPanel : AllDayPanelTableBodyDefaultProps.viewData,
        "dataCellTemplate": DataCellTemplateComponent,
        "isVerticalGroupOrientation": true,
        "leftVirtualCellWidth": (_a = viewData.leftVirtualCellWidth) !== null && _a !== void 0 ? _a : AllDayPanelTableBodyDefaultProps.leftVirtualCellWidth,
        "rightVirtualCellWidth": (_b = viewData.rightVirtualCellWidth) !== null && _b !== void 0 ? _b : AllDayPanelTableBodyDefaultProps.rightVirtualCellWidth,
        "leftVirtualCellCount": viewData.leftVirtualCellCount,
        "rightVirtualCellCount": viewData.rightVirtualCellCount
      }), dateTable.map(_ref2 => {
        var {
          cells,
          key: rowKey
        } = _ref2;
        var _a, _b;
        return createComponentVNode(2, Row, {
          "className": rowClasses,
          "leftVirtualCellWidth": (_a = viewData.leftVirtualCellWidth) !== null && _a !== void 0 ? _a : RowDefaultProps.leftVirtualCellWidth,
          "rightVirtualCellWidth": (_b = viewData.rightVirtualCellWidth) !== null && _b !== void 0 ? _b : RowDefaultProps.rightVirtualCellWidth,
          "leftVirtualCellCount": viewData.leftVirtualCellCount,
          "rightVirtualCellCount": viewData.rightVirtualCellCount,
          children: cells.map(_ref3 => {
            var {
              key: cellKey,
              endDate,
              firstDayOfMonth,
              groupIndex: cellGroupIndex,
              groups,
              index: cellIndex,
              isFirstGroupCell,
              isFocused,
              isLastGroupCell,
              isSelected,
              otherMonth,
              startDate,
              text,
              today
            } = _ref3;
            return CellTemplateComponent({
              key: cellKey,
              isFirstGroupCell,
              isLastGroupCell,
              startDate,
              endDate,
              groups,
              groupIndex: cellGroupIndex,
              index: cellIndex,
              dataCellTemplate: DataCellTemplateComponent,
              text,
              today,
              otherMonth,
              firstDayOfMonth,
              isSelected,
              isFocused
            });
          })
        }, rowKey);
      })], 0, fragmentKey);
    }), 0);
  }
}
DateTableBody.defaultProps = DateTableBodyDefaultProps;