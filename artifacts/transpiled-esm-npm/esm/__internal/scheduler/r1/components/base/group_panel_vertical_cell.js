import { createVNode } from "inferno";
import { BaseInfernoComponent } from '@devextreme/runtime/inferno';
import { getTemplate } from '../../../../core/r1/utils/index';
import { GroupPanelCellDefaultProps } from './group_panel_props';
export class GroupPanelVerticalCell extends BaseInfernoComponent {
  render() {
    var {
      className,
      data,
      id,
      color,
      text,
      index,
      cellTemplate
    } = this.props;
    var CellTemplateComponent = getTemplate(cellTemplate);
    return createVNode(1, "div", "dx-scheduler-group-header ".concat(className), CellTemplateComponent ? CellTemplateComponent({
      data: {
        data,
        id,
        color,
        text
      },
      index
    }) : createVNode(1, "div", "dx-scheduler-group-header-content", text, 0), 0);
  }
}
GroupPanelVerticalCell.defaultProps = GroupPanelCellDefaultProps;