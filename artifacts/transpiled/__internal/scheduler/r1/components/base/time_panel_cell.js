"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimePanelCell = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _index = require("../../../../core/r1/utils/index");
var _cell = require("./cell");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
let TimePanelCell = exports.TimePanelCell = /*#__PURE__*/function (_BaseInfernoComponent) {
  _inheritsLoose(TimePanelCell, _BaseInfernoComponent);
  function TimePanelCell() {
    var _this;
    _this = _BaseInfernoComponent.apply(this, arguments) || this;
    _this.timeCellTemplateProps = null;
    return _this;
  }
  var _proto = TimePanelCell.prototype;
  _proto.getTimeCellTemplateProps = function getTimeCellTemplateProps() {
    if (this.timeCellTemplateProps !== null) {
      return this.timeCellTemplateProps;
    }
    const {
      groupIndex,
      groups,
      index,
      startDate,
      text
    } = this.props;
    this.timeCellTemplateProps = {
      data: {
        date: startDate,
        groups,
        groupIndex,
        text
      },
      index
    };
    return this.timeCellTemplateProps;
  };
  _proto.componentWillUpdate = function componentWillUpdate(nextProps) {
    if (this.props.groupIndex !== nextProps.groupIndex || this.props.groups !== nextProps.groups || this.props.index !== nextProps.index || this.props.startDate !== nextProps.startDate || this.props.text !== nextProps.text) {
      this.timeCellTemplateProps = null;
    }
  };
  _proto.render = function render() {
    const {
      className,
      highlighted,
      isFirstGroupCell,
      isLastGroupCell,
      text,
      timeCellTemplate
    } = this.props;
    const timeCellTemplateProps = this.getTimeCellTemplateProps();
    const TimeCellTemplateComponent = (0, _index.getTemplate)(timeCellTemplate);
    return (0, _inferno.createComponentVNode)(2, _cell.CellBase, {
      "className": "dx-scheduler-time-panel-cell dx-scheduler-cell-sizes-vertical ".concat(highlighted ? 'dx-scheduler-time-panel-current-time-cell' : '', " ").concat(className),
      "isFirstGroupCell": isFirstGroupCell,
      "isLastGroupCell": isLastGroupCell,
      "startDate": _cell.CellBaseDefaultProps.startDate,
      "endDate": _cell.CellBaseDefaultProps.endDate,
      "index": _cell.CellBaseDefaultProps.index,
      children: TimeCellTemplateComponent ? TimeCellTemplateComponent({
        index: timeCellTemplateProps.index,
        data: timeCellTemplateProps.data
      }) : (0, _inferno.createVNode)(1, "div", null, text, 0)
    });
  };
  return TimePanelCell;
}(_inferno2.BaseInfernoComponent);
TimePanelCell.defaultProps = _cell.CellBaseDefaultProps;