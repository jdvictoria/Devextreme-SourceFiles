/**
* DevExtreme (cjs/renovation/ui/scroll_view/internal/pocket/bottom.js)
* Version: 24.1.1
* Build date: Tue May 07 2024
*
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.viewFunction = exports.BottomPocketProps = exports.BottomPocket = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _load_indicator = require("../../../load_indicator");
var _consts = require("../../common/consts");
var _themes = require("../../../../../ui/themes");
var _combine_classes = require("../../../../utils/combine_classes");
var _message = _interopRequireDefault(require("../../../../../localization/message"));
const _excluded = ["bottomPocketRef", "reachBottomText", "visible"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
const viewFunction = viewModel => {
  const {
    props: {
      bottomPocketRef,
      reachBottomText
    },
    reachBottomClasses
  } = viewModel;
  return (0, _inferno.createVNode)(1, "div", _consts.SCROLLVIEW_BOTTOM_POCKET_CLASS, (0, _inferno.createVNode)(1, "div", reachBottomClasses, [(0, _inferno.createVNode)(1, "div", _consts.SCROLLVIEW_REACHBOTTOM_INDICATOR_CLASS, (0, _inferno.createComponentVNode)(2, _load_indicator.LoadIndicator), 2), (0, _inferno.createVNode)(1, "div", _consts.SCROLLVIEW_REACHBOTTOM_TEXT_CLASS, (0, _inferno.createVNode)(1, "div", null, reachBottomText, 0), 2)], 4), 2, null, null, bottomPocketRef);
};
exports.viewFunction = viewFunction;
const BottomPocketProps = exports.BottomPocketProps = Object.defineProperties({
  visible: true
}, {
  reachBottomText: {
    get: function () {
      return (0, _themes.isMaterial)((0, _themes.current)()) ? '' : _message.default.format('dxScrollView-reachBottomText');
    },
    configurable: true,
    enumerable: true
  }
});
let BottomPocket = exports.BottomPocket = /*#__PURE__*/function (_BaseInfernoComponent) {
  _inheritsLoose(BottomPocket, _BaseInfernoComponent);
  function BottomPocket(props) {
    var _this;
    _this = _BaseInfernoComponent.call(this, props) || this;
    _this.state = {};
    return _this;
  }
  var _proto = BottomPocket.prototype;
  _proto.render = function render() {
    const props = this.props;
    return viewFunction({
      props: _extends({}, props),
      reachBottomClasses: this.reachBottomClasses,
      restAttributes: this.restAttributes
    });
  };
  _createClass(BottomPocket, [{
    key: "reachBottomClasses",
    get: function () {
      const {
        visible
      } = this.props;
      const classesMap = {
        [_consts.SCROLLVIEW_REACHBOTTOM_CLASS]: true,
        'dx-state-invisible': !visible
      };
      return (0, _combine_classes.combineClasses)(classesMap);
    }
  }, {
    key: "restAttributes",
    get: function () {
      const _this$props = this.props,
        restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
      return restProps;
    }
  }]);
  return BottomPocket;
}(_inferno2.BaseInfernoComponent);
BottomPocket.defaultProps = BottomPocketProps;
