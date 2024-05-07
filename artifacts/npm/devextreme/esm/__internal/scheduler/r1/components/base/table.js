/**
* DevExtreme (esm/__internal/scheduler/r1/components/base/table.js)
* Version: 24.1.1
* Build date: Tue May 07 2024
*
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { createVNode, createComponentVNode } from "inferno";
import { BaseInfernoComponent, normalizeStyles } from '@devextreme/runtime/inferno';
import { renderUtils } from '../../utils/index';
import { VirtualRow, VirtualRowDefaultProps } from './virtual_row';
export var TableDefaultProps = {
  topVirtualRowHeight: 0,
  bottomVirtualRowHeight: 0,
  leftVirtualCellWidth: 0,
  rightVirtualCellWidth: 0,
  virtualCellsCount: 0
};
export class Table extends BaseInfernoComponent {
  getResultStyles() {
    var {
      height,
      width,
      styles
    } = this.props;
    var heightAdded = renderUtils.addHeightToStyle(height, styles);
    return renderUtils.addWidthToStyle(width, heightAdded);
  }
  render() {
    var {
      className,
      topVirtualRowHeight,
      bottomVirtualRowHeight,
      children,
      leftVirtualCellCount,
      leftVirtualCellWidth,
      rightVirtualCellCount,
      rightVirtualCellWidth,
      tableRef,
      virtualCellsCount
    } = this.props;
    var hasTopVirtualRow = !!topVirtualRowHeight;
    var hasBottomVirtualRow = !!bottomVirtualRowHeight;
    var resultStyles = this.getResultStyles();
    return createVNode(1, "table", className, createVNode(1, "tbody", null, [hasTopVirtualRow && createComponentVNode(2, VirtualRow, {
      "height": topVirtualRowHeight,
      "cellsCount": virtualCellsCount !== null && virtualCellsCount !== void 0 ? virtualCellsCount : VirtualRowDefaultProps.cellsCount,
      "leftVirtualCellWidth": leftVirtualCellWidth !== null && leftVirtualCellWidth !== void 0 ? leftVirtualCellWidth : VirtualRowDefaultProps.leftVirtualCellWidth,
      "rightVirtualCellWidth": rightVirtualCellWidth !== null && rightVirtualCellWidth !== void 0 ? rightVirtualCellWidth : VirtualRowDefaultProps.rightVirtualCellWidth,
      "leftVirtualCellCount": leftVirtualCellCount,
      "rightVirtualCellCount": rightVirtualCellCount
    }), children, hasBottomVirtualRow && createComponentVNode(2, VirtualRow, {
      "height": bottomVirtualRowHeight,
      "cellsCount": virtualCellsCount !== null && virtualCellsCount !== void 0 ? virtualCellsCount : VirtualRowDefaultProps.cellsCount,
      "leftVirtualCellWidth": leftVirtualCellWidth !== null && leftVirtualCellWidth !== void 0 ? leftVirtualCellWidth : VirtualRowDefaultProps.leftVirtualCellWidth,
      "rightVirtualCellWidth": rightVirtualCellWidth !== null && rightVirtualCellWidth !== void 0 ? rightVirtualCellWidth : VirtualRowDefaultProps.rightVirtualCellWidth,
      "leftVirtualCellCount": leftVirtualCellCount,
      "rightVirtualCellCount": rightVirtualCellCount
    })], 0), 2, {
      "style": normalizeStyles(resultStyles)
    }, null, tableRef);
  }
}
Table.defaultProps = TableDefaultProps;
