/**
* DevExtreme (esm/__internal/scheduler/r1/components/base/header_cell.js)
* Version: 24.1.1
* Build date: Tue May 07 2024
*
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { createVNode } from "inferno";
import { BaseInfernoComponent, normalizeStyles } from '@devextreme/runtime/inferno';
import { OrdinaryCellDefaultProps } from './ordinary_cell';
export class HeaderCell extends BaseInfernoComponent {
  render() {
    var {
      children,
      className,
      colSpan,
      styles
    } = this.props;
    return createVNode(1, "th", className, children, 0, {
      "style": normalizeStyles(styles),
      "colSpan": colSpan
    });
  }
}
HeaderCell.defaultProps = OrdinaryCellDefaultProps;