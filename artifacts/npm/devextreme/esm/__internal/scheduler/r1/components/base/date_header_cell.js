/**
* DevExtreme (esm/__internal/scheduler/r1/components/base/date_header_cell.js)
* Version: 24.1.1
* Build date: Tue May 07 2024
*
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { createVNode, createFragment, createComponentVNode } from "inferno";
import { BaseInfernoComponent } from '@devextreme/runtime/inferno';
import { getTemplate } from '../../../../core/r1/utils/index';
import { renderUtils } from '../../utils/index';
import { CellBaseDefaultProps } from './cell';
import { DateHeaderText } from './date_header_text';
export var DateHeaderCellDefaultProps = _extends(_extends({}, CellBaseDefaultProps), {
  today: false,
  colSpan: 1,
  isWeekDayCell: false,
  splitText: false,
  isTimeCellTemplate: false
});
export class DateHeaderCell extends BaseInfernoComponent {
  render() {
    var {
      colSpan,
      dateCellTemplate,
      groupIndex,
      groups,
      index,
      isTimeCellTemplate,
      splitText,
      startDate,
      text,
      timeCellTemplate,
      className,
      isFirstGroupCell,
      isLastGroupCell,
      isWeekDayCell,
      today
    } = this.props;
    var cellClasses = renderUtils.combineClasses({
      'dx-scheduler-header-panel-cell': true,
      'dx-scheduler-cell-sizes-horizontal': true,
      'dx-scheduler-header-panel-current-time-cell': today,
      'dx-scheduler-header-panel-week-cell': isWeekDayCell,
      [className !== null && className !== void 0 ? className : '']: !!className
    });
    var classes = renderUtils.getGroupCellClasses(isFirstGroupCell, isLastGroupCell, cellClasses);
    var useTemplate = !isTimeCellTemplate && !!dateCellTemplate || isTimeCellTemplate && !!timeCellTemplate;
    var TimeCellTemplateComponent = getTemplate(timeCellTemplate);
    var DateCellTemplateComponent = getTemplate(dateCellTemplate);
    var children = useTemplate ? // TODO: this is a workaround for https://github.com/DevExpress/devextreme-renovation/issues/574
    createFragment([isTimeCellTemplate && TimeCellTemplateComponent && TimeCellTemplateComponent({
      data: {
        date: startDate,
        text,
        groups,
        groupIndex
      },
      index
    }), !isTimeCellTemplate && DateCellTemplateComponent && DateCellTemplateComponent({
      data: {
        date: startDate,
        text,
        groups,
        groupIndex
      },
      index
    })], 0) : createComponentVNode(2, DateHeaderText, {
      "splitText": splitText,
      "text": text
    });
    return createVNode(1, "th", classes, children, 0, {
      "colSpan": colSpan,
      "title": text
    });
  }
}
DateHeaderCell.defaultProps = DateHeaderCellDefaultProps;
