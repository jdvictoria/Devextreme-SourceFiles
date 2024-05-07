/**
* DevExtreme (cjs/ui/widget/swatch_container.js)
* Version: 24.1.1
* Build date: Tue May 07 2024
*
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _view_port = require("../../core/utils/view_port");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const SWATCH_CONTAINER_CLASS_PREFIX = 'dx-swatch-';
const getSwatchContainer = element => {
  const $element = (0, _renderer.default)(element);
  const swatchContainer = $element.closest("[class^=\"".concat(SWATCH_CONTAINER_CLASS_PREFIX, "\"], [class*=\" ").concat(SWATCH_CONTAINER_CLASS_PREFIX, "\"]"));
  const viewport = (0, _view_port.value)();
  if (!swatchContainer.length) return viewport;
  const swatchClassRegex = new RegExp("(\\s|^)(".concat(SWATCH_CONTAINER_CLASS_PREFIX, ".*?)(\\s|$)"));
  const swatchClass = swatchContainer[0].className.match(swatchClassRegex)[2];
  let viewportSwatchContainer = viewport.children('.' + swatchClass);
  if (!viewportSwatchContainer.length) {
    viewportSwatchContainer = (0, _renderer.default)('<div>').addClass(swatchClass).appendTo(viewport);
  }
  return viewportSwatchContainer;
};
var _default = exports.default = {
  getSwatchContainer: getSwatchContainer
};
module.exports = exports.default;
module.exports.default = exports.default;