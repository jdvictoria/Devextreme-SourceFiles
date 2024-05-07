import _extends from "@babel/runtime/helpers/esm/extends";
import { createComponentVNode } from "inferno";
import { BaseInfernoComponent } from '@devextreme/runtime/inferno';
import { renderUtils } from '../../utils/index';
import { Row, RowDefaultProps } from './row';
import { VirtualCell, VirtualCellDefaultProps } from './virtual_cell';
export var VirtualRowDefaultProps = _extends(_extends({}, RowDefaultProps), {
  leftVirtualCellWidth: 0,
  rightVirtualCellWidth: 0,
  cellsCount: 1
});
export class VirtualRow extends BaseInfernoComponent {
  constructor() {
    super(...arguments);
    this.virtualCells = null;
  }
  getVirtualCells() {
    if (this.virtualCells !== null) {
      return this.virtualCells;
    }
    var {
      cellsCount
    } = this.props;
    this.virtualCells = [...Array(cellsCount)];
    return this.virtualCells;
  }
  componentWillUpdate(nextProps) {
    if (this.props.cellsCount !== nextProps.cellsCount) {
      this.virtualCells = null;
    }
  }
  render() {
    var {
      className,
      leftVirtualCellCount,
      leftVirtualCellWidth,
      rightVirtualCellCount,
      rightVirtualCellWidth,
      styles,
      height
    } = this.props;
    var classes = "dx-scheduler-virtual-row ".concat(className);
    var modifiedStyles = renderUtils.addHeightToStyle(height, styles);
    var virtualCells = this.getVirtualCells();
    return createComponentVNode(2, Row, {
      "className": classes,
      "styles": modifiedStyles,
      "leftVirtualCellWidth": leftVirtualCellWidth,
      "rightVirtualCellWidth": rightVirtualCellWidth,
      "leftVirtualCellCount": leftVirtualCellCount,
      "rightVirtualCellCount": rightVirtualCellCount,
      children: virtualCells.map((_, index) => createComponentVNode(2, VirtualCell, {
        "width": VirtualCellDefaultProps.width,
        "isHeaderCell": VirtualCellDefaultProps.isHeaderCell
      }, index.toString()))
    });
  }
}
VirtualRow.defaultProps = VirtualRowDefaultProps;