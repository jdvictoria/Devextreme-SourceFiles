import { createComponentVNode } from "inferno";
import { BaseInfernoComponent } from '@devextreme/runtime/inferno';
import { getTemplate } from '../../../../core/r1/utils/index';
import { renderUtils } from '../../utils/index';
import { AllDayPanelCell } from './all_day_panel_cell';
import { Row } from './row';
export var AllDayPanelTableBodyDefaultProps = {
  viewData: [],
  isVerticalGroupOrientation: false,
  className: '',
  leftVirtualCellWidth: 0,
  rightVirtualCellWidth: 0
};
export class AllDayPanelTableBody extends BaseInfernoComponent {
  render() {
    var {
      className,
      leftVirtualCellWidth,
      rightVirtualCellWidth,
      leftVirtualCellCount,
      rightVirtualCellCount,
      viewData,
      isVerticalGroupOrientation,
      dataCellTemplate
    } = this.props;
    var classes = renderUtils.combineClasses({
      'dx-scheduler-all-day-table-row': true,
      [className !== null && className !== void 0 ? className : '']: !!className
    });
    var DataCellTemplateComponent = getTemplate(dataCellTemplate);
    return createComponentVNode(2, Row, {
      "leftVirtualCellWidth": leftVirtualCellWidth,
      "rightVirtualCellWidth": rightVirtualCellWidth,
      "leftVirtualCellCount": leftVirtualCellCount,
      "rightVirtualCellCount": rightVirtualCellCount,
      "className": classes,
      children: viewData.map(_ref => {
        var {
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
        return createComponentVNode(2, AllDayPanelCell, {
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
  }
}
AllDayPanelTableBody.defaultProps = AllDayPanelTableBodyDefaultProps;