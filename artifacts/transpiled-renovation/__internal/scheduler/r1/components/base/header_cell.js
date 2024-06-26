"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeaderCell = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _ordinary_cell = require("./ordinary_cell");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
let HeaderCell = exports.HeaderCell = /*#__PURE__*/function (_BaseInfernoComponent) {
  _inheritsLoose(HeaderCell, _BaseInfernoComponent);
  function HeaderCell() {
    return _BaseInfernoComponent.apply(this, arguments) || this;
  }
  var _proto = HeaderCell.prototype;
  _proto.render = function render() {
    const {
      children,
      className,
      colSpan,
      styles
    } = this.props;
    return (0, _inferno.createVNode)(1, "th", className, children, 0, {
      "style": (0, _inferno2.normalizeStyles)(styles),
      "colSpan": colSpan
    });
  };
  return HeaderCell;
}(_inferno2.BaseInfernoComponent);
HeaderCell.defaultProps = _ordinary_cell.OrdinaryCellDefaultProps;