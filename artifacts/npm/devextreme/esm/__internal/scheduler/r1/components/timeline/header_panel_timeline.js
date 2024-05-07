/**
* DevExtreme (esm/__internal/scheduler/r1/components/timeline/header_panel_timeline.js)
* Version: 24.1.1
* Build date: Tue May 07 2024
*
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { createComponentVNode } from "inferno";
import { createReRenderEffect, InfernoWrapperComponent } from '@devextreme/runtime/inferno';
import { getTemplate } from '../../../../core/r1/utils/index';
import { HeaderPanel, HeaderPanelDefaultProps } from '../base/header_panel';
import { TimelineDateHeaderLayout } from './date_header_timeline';
export class HeaderPanelTimeline extends InfernoWrapperComponent {
  createEffects() {
    return [createReRenderEffect()];
  }
  render() {
    var {
      dateCellTemplate,
      dateHeaderData,
      groupByDate,
      groupOrientation,
      groupPanelData,
      groups,
      isRenderDateHeader,
      resourceCellTemplate,
      timeCellTemplate
    } = this.props;
    var DateCellTemplateComponent = getTemplate(dateCellTemplate);
    var ResourceCellTemplateComponent = getTemplate(resourceCellTemplate);
    var TimeCellTemplateComponent = getTemplate(timeCellTemplate);
    return createComponentVNode(2, HeaderPanel, {
      "dateHeaderData": dateHeaderData,
      "groupPanelData": groupPanelData,
      "groupByDate": groupByDate,
      "groups": groups,
      "groupOrientation": groupOrientation,
      "isRenderDateHeader": isRenderDateHeader,
      "dateHeaderTemplate": TimelineDateHeaderLayout,
      "resourceCellTemplate": ResourceCellTemplateComponent,
      "dateCellTemplate": DateCellTemplateComponent,
      "timeCellTemplate": TimeCellTemplateComponent
    });
  }
}
HeaderPanelTimeline.defaultProps = HeaderPanelDefaultProps;
