import { createFragment, createComponentVNode } from "inferno";
import { BaseInfernoComponent } from '@devextreme/runtime/inferno';
import { getTemplate } from '../../../../core/r1/utils/index';
import { getThemeType } from '../../../../scheduler/r1/utils/themes';
import { isHorizontalGroupingApplied } from '../../utils/index';
import { DateHeaderDefaultProps } from '../base/date_header';
import { DateHeaderCell, DateHeaderCellDefaultProps } from '../base/date_header_cell';
import { Row, RowDefaultProps } from '../base/row';
var {
  isMaterialBased
} = getThemeType();
export class TimelineDateHeaderLayout extends BaseInfernoComponent {
  render() {
    var {
      groupByDate,
      groupOrientation,
      groups,
      dateHeaderData,
      dateCellTemplate,
      timeCellTemplate
    } = this.props;
    var {
      dataMap,
      isMonthDateHeader,
      leftVirtualCellCount,
      leftVirtualCellWidth,
      rightVirtualCellCount,
      rightVirtualCellWidth,
      weekDayLeftVirtualCellCount,
      weekDayLeftVirtualCellWidth,
      weekDayRightVirtualCellCount,
      weekDayRightVirtualCellWidth
    } = dateHeaderData;
    var isHorizontalGrouping = isHorizontalGroupingApplied(groups, groupOrientation) && !groupByDate;
    var DateCellTemplateComponent = getTemplate(dateCellTemplate);
    var TimeCellTemplateComponent = getTemplate(timeCellTemplate);
    return createFragment(dataMap.map((dateHeaderRow, rowIndex) => {
      var rowsCount = dataMap.length;
      var isTimeCellTemplate = rowsCount - 1 === rowIndex;
      var isWeekDayRow = rowsCount > 1 && rowIndex === 0;
      var splitText = isMaterialBased && (isMonthDateHeader || isWeekDayRow);
      var validLeftVirtualCellCount = leftVirtualCellCount;
      var validRightVirtualCellCount = rightVirtualCellCount;
      var validRightVirtualCellWidth = rightVirtualCellWidth;
      var validLeftVirtualCellWidth = leftVirtualCellWidth;
      if (isWeekDayRow) {
        validLeftVirtualCellCount = weekDayLeftVirtualCellCount;
        validRightVirtualCellCount = weekDayRightVirtualCellCount;
        validRightVirtualCellWidth = weekDayRightVirtualCellWidth;
        validLeftVirtualCellWidth = weekDayLeftVirtualCellWidth;
      }
      return createComponentVNode(2, Row, {
        "className": "dx-scheduler-header-row",
        "leftVirtualCellWidth": validLeftVirtualCellWidth !== null && validLeftVirtualCellWidth !== void 0 ? validLeftVirtualCellWidth : RowDefaultProps.leftVirtualCellWidth,
        "leftVirtualCellCount": validLeftVirtualCellCount,
        "rightVirtualCellWidth": validRightVirtualCellWidth !== null && validRightVirtualCellWidth !== void 0 ? validRightVirtualCellWidth : RowDefaultProps.rightVirtualCellWidth,
        "rightVirtualCellCount": validRightVirtualCellCount,
        children: dateHeaderRow.map(_ref => {
          var {
            colSpan,
            endDate,
            groupIndex,
            groups: cellGroups,
            index,
            isFirstGroupCell,
            isLastGroupCell,
            key,
            startDate,
            text,
            today
          } = _ref;
          return createComponentVNode(2, DateHeaderCell, {
            "startDate": startDate,
            "endDate": endDate,
            "groups": isHorizontalGrouping ? cellGroups : undefined,
            "groupIndex": isHorizontalGrouping ? groupIndex : undefined,
            "today": today !== null && today !== void 0 ? today : DateHeaderCellDefaultProps.today,
            "index": index,
            "text": text,
            "isFirstGroupCell": isFirstGroupCell,
            "isLastGroupCell": isLastGroupCell,
            "isWeekDayCell": isWeekDayRow,
            "colSpan": colSpan,
            "splitText": splitText,
            "dateCellTemplate": DateCellTemplateComponent,
            "timeCellTemplate": TimeCellTemplateComponent,
            "isTimeCellTemplate": isTimeCellTemplate
          }, key);
        })
      }, rowIndex.toString());
    }), 0);
  }
}
TimelineDateHeaderLayout.defaultProps = DateHeaderDefaultProps;