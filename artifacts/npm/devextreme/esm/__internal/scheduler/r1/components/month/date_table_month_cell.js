/**
* DevExtreme (esm/__internal/scheduler/r1/components/month/date_table_month_cell.js)
* Version: 24.1.1
* Build date: Tue May 07 2024
*
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { createVNode, createComponentVNode } from "inferno";
import { BaseInfernoComponent } from '@devextreme/runtime/inferno';
import { getTemplate } from '../../../../core/r1/utils/index';
import { renderUtils } from '../../utils/index';
import { DateTableCallBaseDefaultProps, DateTableCellBase } from '../base/date_table_cell_base';
export class DateTableMonthCell extends BaseInfernoComponent {
  constructor() {
    super(...arguments);
    this.contentTemplateProps = null;
  }
  getContentTemplateProps() {
    if (this.contentTemplateProps !== null) {
      return this.contentTemplateProps;
    }
    var {
      index,
      text
    } = this.props;
    this.contentTemplateProps = {
      data: {
        text
      },
      index
    };
    return this.contentTemplateProps;
  }
  componentWillUpdate(nextProps) {
    if (this.props.index !== nextProps.index || this.props.text !== nextProps.text) {
      this.contentTemplateProps = null;
    }
  }
  render() {
    var {
      dataCellTemplate,
      endDate,
      groupIndex,
      groups,
      index,
      isFirstGroupCell,
      isFocused,
      isLastGroupCell,
      isSelected,
      startDate,
      text,
      className,
      firstDayOfMonth,
      otherMonth,
      today
    } = this.props;
    var classes = renderUtils.combineClasses({
      'dx-scheduler-date-table-other-month': !!otherMonth,
      'dx-scheduler-date-table-current-date': !!today,
      'dx-scheduler-date-table-first-of-month': !!firstDayOfMonth,
      [className !== null && className !== void 0 ? className : '']: !!className
    });
    var contentTemplateProps = this.getContentTemplateProps();
    var DataCellTemplateComponent = getTemplate(dataCellTemplate);
    return createComponentVNode(2, DateTableCellBase, {
      "className": classes,
      "dataCellTemplate": DataCellTemplateComponent,
      "startDate": startDate,
      "endDate": endDate,
      "text": text,
      "groups": groups,
      "groupIndex": groupIndex,
      "index": index,
      "isFirstGroupCell": isFirstGroupCell,
      "isLastGroupCell": isLastGroupCell,
      "isSelected": isSelected,
      "isFocused": isFocused,
      "contentTemplateProps": contentTemplateProps,
      children: createVNode(1, "div", "dx-scheduler-date-table-cell-text", text, 0)
    });
  }
}
DateTableMonthCell.defaultProps = DateTableCallBaseDefaultProps;
