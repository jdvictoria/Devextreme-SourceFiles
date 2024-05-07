import _extends from "@babel/runtime/helpers/esm/extends";
import { createVNode } from "inferno";
import { BaseInfernoComponent } from '@devextreme/runtime/inferno';
import { getTemplate } from '../../../../core/r1/utils/index';
import { renderUtils } from '../../utils/index';
import { GroupPanelCellDefaultProps } from './group_panel_props';
export var GroupPanelHorizontalCellDefaultProps = _extends(_extends({}, GroupPanelCellDefaultProps), {
  isFirstGroupCell: false,
  isLastGroupCell: false,
  colSpan: 1
});
export class GroupPanelHorizontalCell extends BaseInfernoComponent {
  render() {
    var {
      cellTemplate,
      colSpan,
      color,
      data,
      id,
      index,
      text,
      className,
      isFirstGroupCell,
      isLastGroupCell
    } = this.props;
    var classes = renderUtils.combineClasses({
      'dx-scheduler-group-header': true,
      'dx-scheduler-first-group-cell': isFirstGroupCell,
      'dx-scheduler-last-group-cell': isLastGroupCell,
      [className !== null && className !== void 0 ? className : '']: !!className
    });
    var CellTemplateComponent = getTemplate(cellTemplate);
    return createVNode(1, "th", classes, createVNode(1, "div", "dx-scheduler-group-header-content", CellTemplateComponent ? CellTemplateComponent({
      data: {
        data,
        id,
        color,
        text
      },
      index
    }) : createVNode(1, "div", null, text, 0), 0), 2, {
      "colSpan": colSpan
    });
  }
}
GroupPanelHorizontalCell.defaultProps = GroupPanelHorizontalCellDefaultProps;