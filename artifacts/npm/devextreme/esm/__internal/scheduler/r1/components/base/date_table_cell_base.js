/**
* DevExtreme (esm/__internal/scheduler/r1/components/base/date_table_cell_base.js)
* Version: 24.1.1
* Build date: Tue May 07 2024
*
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { createFragment, createComponentVNode } from "inferno";
import { BaseInfernoComponent } from '@devextreme/runtime/inferno';
import { getTemplate } from '../../../../core/r1/utils/index';
import { renderUtils } from '../../utils/index';
import { DATE_TABLE_CELL_CLASS } from '../const';
import { CellBase, CellBaseDefaultProps } from './cell';
export var DateTableCallBaseDefaultProps = _extends(_extends({}, CellBaseDefaultProps), {
  otherMonth: false,
  today: false,
  firstDayOfMonth: false,
  isSelected: false,
  isFocused: false
});
var ADD_APPOINTMENT_LABEL = 'Add appointment';
export class DateTableCellBase extends BaseInfernoComponent {
  constructor() {
    super(...arguments);
    this.dataCellTemplateProps = null;
  }
  getDataCellTemplateProps() {
    if (this.dataCellTemplateProps !== null) {
      return this.dataCellTemplateProps;
    }
    var {
      allDay,
      contentTemplateProps,
      endDate,
      groupIndex,
      groups,
      index,
      startDate
    } = this.props;
    this.dataCellTemplateProps = {
      data: _extends({
        startDate,
        endDate,
        groups,
        groupIndex: groups ? groupIndex : undefined,
        text: '',
        allDay: !!allDay || undefined
      }, contentTemplateProps === null || contentTemplateProps === void 0 ? void 0 : contentTemplateProps.data),
      index
    };
    return this.dataCellTemplateProps;
  }
  componentWillUpdate(nextProps) {
    if (this.props.allDay !== nextProps.allDay || this.props.contentTemplateProps !== nextProps.contentTemplateProps || this.props.endDate !== nextProps.endDate || this.props.groupIndex !== nextProps.groupIndex || this.props.groups !== nextProps.groups || this.props.index !== nextProps.index || this.props.startDate !== nextProps.startDate) {
      this.dataCellTemplateProps = null;
    }
  }
  render() {
    var {
      allDay,
      className,
      isFocused,
      isSelected,
      isFirstGroupCell,
      isLastGroupCell,
      dataCellTemplate,
      children
    } = this.props;
    var classes = renderUtils.combineClasses({
      'dx-scheduler-cell-sizes-horizontal': true,
      'dx-scheduler-cell-sizes-vertical': !allDay,
      [DATE_TABLE_CELL_CLASS]: !allDay,
      'dx-state-focused': isSelected,
      'dx-scheduler-focused-cell': isFocused,
      [className !== null && className !== void 0 ? className : '']: true
    });
    var ariaLabel = isSelected ? ADD_APPOINTMENT_LABEL : undefined;
    var dataCellTemplateProps = this.getDataCellTemplateProps();
    var DataCellTemplateComponent = getTemplate(dataCellTemplate);
    return createComponentVNode(2, CellBase, {
      "isFirstGroupCell": isFirstGroupCell,
      "isLastGroupCell": isLastGroupCell,
      "className": classes,
      "ariaLabel": ariaLabel,
      "startDate": CellBaseDefaultProps.startDate,
      "endDate": CellBaseDefaultProps.endDate,
      "index": CellBaseDefaultProps.index,
      children: createFragment([!DataCellTemplateComponent && children, !!DataCellTemplateComponent && DataCellTemplateComponent({
        index: dataCellTemplateProps.index,
        data: dataCellTemplateProps.data
      })], 0)
    });
  }
}
DateTableCellBase.defaultProps = DateTableCallBaseDefaultProps;
