import { createComponentVNode } from "inferno";
import { createReRenderEffect, InfernoWrapperComponent } from '@devextreme/runtime/inferno';
import { getTemplate } from '../../../../core/r1/utils/index';
import { DefaultSizes } from '../const';
import { AllDayPanelTableBody, AllDayPanelTableBodyDefaultProps } from './all_day_panel_table_body';
import { LayoutDefaultProps } from './layout_props';
import { Table } from './table';
export class AllDayTable extends InfernoWrapperComponent {
  constructor() {
    super(...arguments);
    this.allDayPanelData = null;
  }
  createEffects() {
    return [createReRenderEffect()];
  }
  getAllDayPanelData() {
    if (this.allDayPanelData !== null) {
      return this.allDayPanelData;
    }
    this.allDayPanelData = this.props.viewData.groupedData[0].allDayPanel;
    return this.allDayPanelData;
  }
  componentWillUpdate(nextProps) {
    super.componentWillUpdate();
    if (this.props.viewData !== nextProps.viewData) {
      this.allDayPanelData = null;
    }
  }
  render() {
    var _a, _b;
    var {
      width,
      tableRef,
      viewData,
      dataCellTemplate
    } = this.props;
    var allDayPanelData = this.getAllDayPanelData();
    var DataCellTemplateComponent = getTemplate(dataCellTemplate);
    return createComponentVNode(2, Table, {
      "className": "dx-scheduler-all-day-table",
      "height": allDayPanelData ? undefined : DefaultSizes.allDayPanelHeight,
      "width": width,
      "tableRef": tableRef,
      children: createComponentVNode(2, AllDayPanelTableBody, {
        "viewData": allDayPanelData !== null && allDayPanelData !== void 0 ? allDayPanelData : AllDayPanelTableBodyDefaultProps.viewData,
        "leftVirtualCellWidth": (_a = viewData.leftVirtualCellWidth) !== null && _a !== void 0 ? _a : AllDayPanelTableBodyDefaultProps.leftVirtualCellWidth,
        "rightVirtualCellWidth": (_b = viewData.rightVirtualCellWidth) !== null && _b !== void 0 ? _b : AllDayPanelTableBodyDefaultProps.rightVirtualCellWidth,
        "leftVirtualCellCount": viewData.leftVirtualCellCount,
        "rightVirtualCellCount": viewData.rightVirtualCellCount,
        "dataCellTemplate": DataCellTemplateComponent
      })
    });
  }
}
AllDayTable.defaultProps = LayoutDefaultProps;