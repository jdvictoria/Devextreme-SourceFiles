/**
* DevExtreme (cjs/viz/funnel/tiling.funnel.js)
* Version: 24.1.1
* Build date: Tue May 07 2024
*
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
const CENTER = 0.5;
var _default = exports.default = {
  getFigures: function (data) {
    const height = 1 / data.length;
    return data.map(function (value, index, array) {
      const nextValue = array[index + 1] ? array[index + 1] : array[index];
      return [CENTER - value / 2, height * index, CENTER + value / 2, height * index, CENTER + nextValue / 2, height * (index + 1), CENTER - nextValue / 2, height * (index + 1)];
    });
  },
  normalizeValues: function (items) {
    const max = items.reduce(function (max, item) {
      return Math.max(item.value, max);
    }, items[0] && items[0].value || 0);
    return items.map(function (item) {
      return item.value / max;
    });
  }
};
module.exports = exports.default;
module.exports.default = exports.default;