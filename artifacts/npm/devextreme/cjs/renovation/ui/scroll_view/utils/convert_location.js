/**
* DevExtreme (cjs/renovation/ui/scroll_view/utils/convert_location.js)
* Version: 24.1.1
* Build date: Tue May 07 2024
*
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.convertToLocation = convertToLocation;
var _type = require("../../../../core/utils/type");
var _common = require("../../../../core/utils/common");
var _scroll_direction = require("./scroll_direction");
function convertToLocation(location, direction) {
  if ((0, _type.isPlainObject)(location)) {
    const left = (0, _common.ensureDefined)(location.left, location.x);
    const top = (0, _common.ensureDefined)(location.top, location.y);
    return {
      left: (0, _type.isDefined)(left) ? left : undefined,
      top: (0, _type.isDefined)(top) ? top : undefined
    };
  }
  const {
    isHorizontal,
    isVertical
  } = new _scroll_direction.ScrollDirection(direction);
  return {
    left: isHorizontal && (0, _type.isDefined)(location) ? location : undefined,
    top: isVertical && (0, _type.isDefined)(location) ? location : undefined
  };
}