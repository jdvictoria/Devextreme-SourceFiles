/**
* DevExtreme (esm/__internal/scheduler/r1/components/base/all_day_panel_title.js)
* Version: 24.1.1
* Build date: Tue May 07 2024
*
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { createVNode } from "inferno";
import { createReRenderEffect, InfernoWrapperComponent } from '@devextreme/runtime/inferno';
import messageLocalization from '../../../../../localization/message';
export class AllDayPanelTitle extends InfernoWrapperComponent {
  createEffects() {
    return [createReRenderEffect()];
  }
  render() {
    var text = messageLocalization.format('dxScheduler-allDay');
    return createVNode(1, "div", "dx-scheduler-all-day-title", text, 0);
  }
}
AllDayPanelTitle.defaultProps = {};