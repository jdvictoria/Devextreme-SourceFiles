"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TableDefaultProps = exports.Table = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _index = require("../../utils/index");
var _virtual_row = require("./virtual_row");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
const TableDefaultProps = exports.TableDefaultProps = {
  topVirtualRowHeight: 0,
  bottomVirtualRowHeight: 0,
  leftVirtualCellWidth: 0,
  rightVirtualCellWidth: 0,
  virtualCellsCount: 0
};
let Table = exports.Table = /*#__PURE__*/function (_BaseInfernoComponent) {
  _inheritsLoose(Table, _BaseInfernoComponent);
  function Table() {
    return _BaseInfernoComponent.apply(this, arguments) || this;
  }
  var _proto = Table.prototype;
  _proto.getResultStyles = function getResultStyles() {
    const {
      height,
      width,
      styles
    } = this.props;
    const heightAdded = _index.renderUtils.addHeightToStyle(height, styles);
    return _index.renderUtils.addWidthToStyle(width, heightAdded);
  };
  _proto.render = function render() {
    const {
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
    const hasTopVirtualRow = !!topVirtualRowHeight;
    const hasBottomVirtualRow = !!bottomVirtualRowHeight;
    const resultStyles = this.getResultStyles();
    return (0, _inferno.createVNode)(1, "table", className, (0, _inferno.createVNode)(1, "tbody", null, [hasTopVirtualRow && (0, _inferno.createComponentVNode)(2, _virtual_row.VirtualRow, {
      "height": topVirtualRowHeight,
      "cellsCount": virtualCellsCount !== null && virtualCellsCount !== void 0 ? virtualCellsCount : _virtual_row.VirtualRowDefaultProps.cellsCount,
      "leftVirtualCellWidth": leftVirtualCellWidth !== null && leftVirtualCellWidth !== void 0 ? leftVirtualCellWidth : _virtual_row.VirtualRowDefaultProps.leftVirtualCellWidth,
      "rightVirtualCellWidth": rightVirtualCellWidth !== null && rightVirtualCellWidth !== void 0 ? rightVirtualCellWidth : _virtual_row.VirtualRowDefaultProps.rightVirtualCellWidth,
      "leftVirtualCellCount": leftVirtualCellCount,
      "rightVirtualCellCount": rightVirtualCellCount
    }), children, hasBottomVirtualRow && (0, _inferno.createComponentVNode)(2, _virtual_row.VirtualRow, {
      "height": bottomVirtualRowHeight,
      "cellsCount": virtualCellsCount !== null && virtualCellsCount !== void 0 ? virtualCellsCount : _virtual_row.VirtualRowDefaultProps.cellsCount,
      "leftVirtualCellWidth": leftVirtualCellWidth !== null && leftVirtualCellWidth !== void 0 ? leftVirtualCellWidth : _virtual_row.VirtualRowDefaultProps.leftVirtualCellWidth,
      "rightVirtualCellWidth": rightVirtualCellWidth !== null && rightVirtualCellWidth !== void 0 ? rightVirtualCellWidth : _virtual_row.VirtualRowDefaultProps.rightVirtualCellWidth,
      "leftVirtualCellCount": leftVirtualCellCount,
      "rightVirtualCellCount": rightVirtualCellCount
    })], 0), 2, {
      "style": (0, _inferno2.normalizeStyles)(resultStyles)
    }, null, tableRef);
  };
  return Table;
}(_inferno2.BaseInfernoComponent);
Table.defaultProps = TableDefaultProps;