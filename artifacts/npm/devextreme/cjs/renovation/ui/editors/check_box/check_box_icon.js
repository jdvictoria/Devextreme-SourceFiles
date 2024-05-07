/**
* DevExtreme (cjs/renovation/ui/editors/check_box/check_box_icon.js)
* Version: 24.1.1
* Build date: Tue May 07 2024
*
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.viewFunction = exports.CheckBoxIconProps = exports.CheckBoxIcon = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _style = require("../../../../core/utils/style");
require("../../../../ui/themes");
const _excluded = ["size"];
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
    cssStyles,
    elementRef
  } = viewModel;
  return (0, _inferno.createVNode)(1, "span", "dx-checkbox-icon", null, 1, {
    "style": (0, _inferno2.normalizeStyles)(cssStyles)
  }, null, elementRef);
};
exports.viewFunction = viewFunction;
const CheckBoxIconProps = exports.CheckBoxIconProps = {};
let CheckBoxIcon = exports.CheckBoxIcon = /*#__PURE__*/function (_BaseInfernoComponent) {
  _inheritsLoose(CheckBoxIcon, _BaseInfernoComponent);
  function CheckBoxIcon(props) {
    var _this;
    _this = _BaseInfernoComponent.call(this, props) || this;
    _this.state = {};
    _this.elementRef = (0, _inferno.createRef)();
    _this.__getterCache = {};
    return _this;
  }
  var _proto = CheckBoxIcon.prototype;
  _proto.componentWillUpdate = function componentWillUpdate(nextProps, nextState, context) {
    if (this.props['size'] !== nextProps['size']) {
      this.__getterCache['cssStyles'] = undefined;
    }
  };
  _proto.render = function render() {
    const props = this.props;
    return viewFunction({
      props: _extends({}, props),
      elementRef: this.elementRef,
      cssStyles: this.cssStyles,
      restAttributes: this.restAttributes
    });
  };
  _createClass(CheckBoxIcon, [{
    key: "cssStyles",
    get: function () {
      if (this.__getterCache['cssStyles'] !== undefined) {
        return this.__getterCache['cssStyles'];
      }
      return this.__getterCache['cssStyles'] = (() => {
        const {
          size
        } = this.props;
        const fontSize = (0, _style.normalizeStyleProp)('fontSize', size);
        return {
          fontSize
        };
      })();
    }
  }, {
    key: "restAttributes",
    get: function () {
      const _this$props = this.props,
        restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
      return restProps;
    }
  }]);
  return CheckBoxIcon;
}(_inferno2.BaseInfernoComponent);
CheckBoxIcon.defaultProps = CheckBoxIconProps;
