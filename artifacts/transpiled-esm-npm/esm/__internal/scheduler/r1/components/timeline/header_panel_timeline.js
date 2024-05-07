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