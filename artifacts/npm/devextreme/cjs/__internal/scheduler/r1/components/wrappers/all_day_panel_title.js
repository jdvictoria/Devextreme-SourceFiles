/**
* DevExtreme (cjs/__internal/scheduler/r1/components/wrappers/all_day_panel_title.js)
* Version: 24.1.1
* Build date: Tue May 07 2024
*
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AllDayPanelTitleComponent = void 0;
var _component_registrator = _interopRequireDefault(require("../../../../../core/component_registrator"));
var _index = require("../../../../core/r1/index");
var _all_day_panel_title = require("../base/all_day_panel_title");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
let AllDayPanelTitleComponent = exports.AllDayPanelTitleComponent = /*#__PURE__*/function (_ComponentWrapper) {
  _inheritsLoose(AllDayPanelTitleComponent, _ComponentWrapper);
  function AllDayPanelTitleComponent() {
    return _ComponentWrapper.apply(this, arguments) || this;
  }
  _createClass(AllDayPanelTitleComponent, [{
    key: "_propsInfo",
    get: /* eslint-disable @typescript-eslint/explicit-module-boundary-types */
    /* eslint-disable @typescript-eslint/explicit-function-return-type */
    function () {
      return {
        twoWay: [],
        allowNull: [],
        elements: [],
        templates: [],
        props: []
      };
    }
    /* eslint-enable @typescript-eslint/explicit-module-boundary-types */
    /* eslint-enable @typescript-eslint/explicit-function-return-type */
    // @ts-expect-error types error in R1
  }, {
    key: "_viewComponent",
    get: function () {
      return _all_day_panel_title.AllDayPanelTitle;
    }
  }]);
  return AllDayPanelTitleComponent;
}(_index.ComponentWrapper);
(0, _component_registrator.default)('dxAllDayPanelTitle', AllDayPanelTitleComponent);
