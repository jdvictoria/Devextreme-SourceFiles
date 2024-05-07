/**
* DevExtreme (esm/__internal/scheduler/r1/components/base/group_panel_vertical.js)
* Version: 24.1.1
* Build date: Tue May 07 2024
*
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { createVNode, createComponentVNode } from "inferno";
import { BaseInfernoComponent, normalizeStyles } from '@devextreme/runtime/inferno';
import { getTemplate } from '../../../../core/r1/utils/index';
import { renderUtils } from '../../utils/index';
import { GroupPanelBaseDefaultProps } from './group_panel_props';
import { GroupPanelVerticalRow } from './group_panel_vertical_row';
export class GroupPanelVertical extends BaseInfernoComponent {
  render() {
    var {
      className,
      elementRef,
      groupPanelData,
      resourceCellTemplate,
      height,
      styles
    } = this.props;
    var style = normalizeStyles(renderUtils.addHeightToStyle(height, styles));
    var ResourceCellTemplateComponent = getTemplate(resourceCellTemplate);
    return createVNode(1, "div", className, createVNode(1, "div", "dx-scheduler-group-flex-container", groupPanelData.groupPanelItems.map(group => createComponentVNode(2, GroupPanelVerticalRow, {
      "groupItems": group,
      "cellTemplate": ResourceCellTemplateComponent
    }, group[0].key)), 0), 2, {
      "style": style
    }, null, elementRef);
  }
}
GroupPanelVertical.defaultProps = GroupPanelBaseDefaultProps;