import _extends from "@babel/runtime/helpers/esm/extends";
import { createComponentVNode } from "inferno";
import { createReRenderEffect, InfernoWrapperComponent } from '@devextreme/runtime/inferno';
import { getTemplate } from '../../../../core/r1/utils/index';
import { VERTICAL_GROUP_ORIENTATION } from '../../const';
import { isVerticalGroupingApplied } from '../../utils/index';
import { GroupPanelHorizontal } from './group_panel_horizontal';
import { GroupPanelBaseDefaultProps } from './group_panel_props';
import { GroupPanelVertical } from './group_panel_vertical';
export var GroupPanelDefaultProps = _extends(_extends({}, GroupPanelBaseDefaultProps), {
  groups: [],
  groupOrientation: VERTICAL_GROUP_ORIENTATION
});
export class GroupPanel extends InfernoWrapperComponent {
  // eslint-disable-next-line class-methods-use-this
  createEffects() {
    return [createReRenderEffect()];
  }
  render() {
    var {
      className,
      elementRef,
      groupPanelData,
      height,
      resourceCellTemplate,
      groupOrientation,
      groups,
      styles
    } = this.props;
    var ResourceCellTemplateComponent = getTemplate(resourceCellTemplate);
    var isVerticalLayout = isVerticalGroupingApplied(groups, groupOrientation);
    var Layout = isVerticalLayout ? GroupPanelVertical : GroupPanelHorizontal;
    return createComponentVNode(2, Layout, {
      "height": height,
      "resourceCellTemplate": ResourceCellTemplateComponent,
      "className": className,
      "groupPanelData": groupPanelData,
      "elementRef": elementRef,
      "styles": styles,
      "groups": GroupPanelDefaultProps.groups,
      "groupOrientation": GroupPanelDefaultProps.groupOrientation,
      "groupByDate": GroupPanelDefaultProps.groupByDate
    });
  }
}
GroupPanel.defaultProps = GroupPanelDefaultProps;