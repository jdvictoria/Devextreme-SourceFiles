/**
* DevExtreme (esm/__internal/scheduler/r1/components/base/row.js)
* Version: 24.1.1
* Build date: Tue May 07 2024
*
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { createVNode, createComponentVNode } from "inferno";
import { BaseInfernoComponent, normalizeStyles } from '@devextreme/runtime/inferno';
import { splitNumber } from '../../utils/index';
import { VirtualCell, VirtualCellDefaultProps } from './virtual_cell';
var MAX_COL_SPAN = 1000;
export var RowDefaultProps = {
  className: '',
  leftVirtualCellWidth: 0,
  rightVirtualCellWidth: 0,
  isHeaderRow: false
};
export class Row extends BaseInfernoComponent {
  render() {
    var {
      children,
      className,
      isHeaderRow,
      leftVirtualCellCount,
      leftVirtualCellWidth,
      rightVirtualCellCount,
      rightVirtualCellWidth,
      styles
    } = this.props;
    var hasLeftVirtualCell = !!leftVirtualCellCount;
    var hasRightVirtualCell = !!rightVirtualCellCount;
    return createVNode(1, "tr", className, [hasLeftVirtualCell && leftVirtualCellCount != null && splitNumber(leftVirtualCellCount, MAX_COL_SPAN).map((colSpan, index) => createComponentVNode(2, VirtualCell, {
      "className": "left-virtual-cell-".concat(index),
      "width": leftVirtualCellWidth * (colSpan / leftVirtualCellCount),
      "colSpan": colSpan,
      "isHeaderCell": isHeaderRow !== null && isHeaderRow !== void 0 ? isHeaderRow : VirtualCellDefaultProps.isHeaderCell
    })), children, hasRightVirtualCell && rightVirtualCellCount != null && splitNumber(rightVirtualCellCount, MAX_COL_SPAN).map((colSpan, index) => createComponentVNode(2, VirtualCell, {
      "className": "right-virtual-cell-".concat(index),
      "width": rightVirtualCellWidth * (colSpan / rightVirtualCellCount),
      "colSpan": colSpan,
      "isHeaderCell": isHeaderRow !== null && isHeaderRow !== void 0 ? isHeaderRow : VirtualCellDefaultProps.isHeaderCell
    }))], 0, {
      "style": normalizeStyles(styles)
    });
  }
}
Row.defaultProps = RowDefaultProps;
