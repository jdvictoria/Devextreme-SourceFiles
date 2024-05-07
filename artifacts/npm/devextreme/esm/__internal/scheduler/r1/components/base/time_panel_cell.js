/**
* DevExtreme (esm/__internal/scheduler/r1/components/base/time_panel_cell.js)
* Version: 24.1.1
* Build date: Tue May 07 2024
*
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { createVNode, createComponentVNode } from "inferno";
import { BaseInfernoComponent } from '@devextreme/runtime/inferno';
import { getTemplate } from '../../../../core/r1/utils/index';
import { CellBase, CellBaseDefaultProps } from './cell';
export class TimePanelCell extends BaseInfernoComponent {
  constructor() {
    super(...arguments);
    this.timeCellTemplateProps = null;
  }
  getTimeCellTemplateProps() {
    if (this.timeCellTemplateProps !== null) {
      return this.timeCellTemplateProps;
    }
    var {
      groupIndex,
      groups,
      index,
      startDate,
      text
    } = this.props;
    this.timeCellTemplateProps = {
      data: {
        date: startDate,
        groups,
        groupIndex,
        text
      },
      index
    };
    return this.timeCellTemplateProps;
  }
  componentWillUpdate(nextProps) {
    if (this.props.groupIndex !== nextProps.groupIndex || this.props.groups !== nextProps.groups || this.props.index !== nextProps.index || this.props.startDate !== nextProps.startDate || this.props.text !== nextProps.text) {
      this.timeCellTemplateProps = null;
    }
  }
  render() {
    var {
      className,
      highlighted,
      isFirstGroupCell,
      isLastGroupCell,
      text,
      timeCellTemplate
    } = this.props;
    var timeCellTemplateProps = this.getTimeCellTemplateProps();
    var TimeCellTemplateComponent = getTemplate(timeCellTemplate);
    return createComponentVNode(2, CellBase, {
      "className": "dx-scheduler-time-panel-cell dx-scheduler-cell-sizes-vertical ".concat(highlighted ? 'dx-scheduler-time-panel-current-time-cell' : '', " ").concat(className),
      "isFirstGroupCell": isFirstGroupCell,
      "isLastGroupCell": isLastGroupCell,
      "startDate": CellBaseDefaultProps.startDate,
      "endDate": CellBaseDefaultProps.endDate,
      "index": CellBaseDefaultProps.index,
      children: TimeCellTemplateComponent ? TimeCellTemplateComponent({
        index: timeCellTemplateProps.index,
        data: timeCellTemplateProps.data
      }) : createVNode(1, "div", null, text, 0)
    });
  }
}
TimePanelCell.defaultProps = CellBaseDefaultProps;
