/**
* DevExtreme (cjs/__internal/ui/splitter/utils/layout.js)
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
exports.calculateDelta = calculateDelta;
exports.convertSizeToRatio = convertSizeToRatio;
exports.findIndexOfNextVisibleItem = findIndexOfNextVisibleItem;
exports.findLastIndexOfVisibleItem = findLastIndexOfVisibleItem;
exports.getElementSize = getElementSize;
exports.getNextLayout = getNextLayout;
exports.getVisibleItems = getVisibleItems;
exports.getVisibleItemsCount = getVisibleItemsCount;
exports.isElementVisible = isElementVisible;
exports.isPercentWidth = isPercentWidth;
exports.isPixelWidth = isPixelWidth;
exports.normalizePanelSize = normalizePanelSize;
exports.setFlexProp = setFlexProp;
exports.tryConvertToNumber = tryConvertToNumber;
var _size = require("../../../../core/utils/size");
var _style = require("../../../../core/utils/style");
var _type = require("../../../../core/utils/type");
var _utils = require("../../../../localization/utils");
var _number_comparison = require("./number_comparison");
// const FLEX_PROPERTY_NAME = 'flexGrow';
const ORIENTATION = {
  horizontal: 'horizontal',
  vertical: 'vertical'
};
const PERCENT_UNIT = '%';
const PIXEL_UNIT = 'px';
// export function getCurrentLayout($items: dxElementWrapper): number[] {
//   const itemsDistribution: number[] = [];
//   $items.each((index, item) => {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     itemsDistribution.push(parseFloat(($(item) as any).css(FLEX_PROPERTY_NAME)));
//     return true;
//   });
//   return itemsDistribution;
// }
function findLastIndexOfVisibleItem(items) {
  for (let i = items.length - 1; i >= 0; i -= 1) {
    if (items[i].visible !== false) {
      return i;
    }
  }
  return -1;
}
function findIndexOfNextVisibleItem(items, index) {
  for (let i = index + 1; i < items.length; i += 1) {
    if (items[i].visible !== false) {
      return i;
    }
  }
  return -1;
}
function normalizePanelSize(paneRestrictions, size) {
  let collapseMode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  const {
    minSize = 0,
    maxSize = 100,
    resizable,
    visible,
    collapsed,
    collapsedSize = 0
  } = paneRestrictions;
  if (visible === false) {
    return 0;
  }
  if (collapsed === true) {
    return collapsedSize !== null && collapsedSize !== void 0 ? collapsedSize : 0;
  }
  if (resizable === false && (0, _type.isDefined)(paneRestrictions.size)) {
    return paneRestrictions.size;
  }
  let adjustedSize = (0, _number_comparison.compareNumbersWithPrecision)(size, minSize) < 0 ? minSize : size;
  adjustedSize = Math.min(maxSize, adjustedSize);
  adjustedSize = parseFloat((0, _utils.toFixed)(adjustedSize, _number_comparison.PRECISION));
  if (collapseMode && size < collapsedSize) {
    return collapsedSize;
  }
  return adjustedSize;
}
function findMaxAvailableDelta(increment, currentLayout, paneRestrictions, paneIndex) {
  let maxDelta = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  let collapseMode = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
  if (paneIndex < 0 || paneIndex >= paneRestrictions.length) {
    return maxDelta;
  }
  const prevSize = currentLayout[paneIndex];
  const maxPaneSize = normalizePanelSize(paneRestrictions[paneIndex], 100, collapseMode);
  const delta = maxPaneSize - prevSize;
  const nextMaxDelta = maxDelta + delta;
  return findMaxAvailableDelta(increment, currentLayout, paneRestrictions, paneIndex + increment, nextMaxDelta, collapseMode);
}
function getNextLayout(currentLayout, delta, prevPaneIndex, paneRestrictions) {
  let collapseMode = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  const nextLayout = [...currentLayout];
  const nextPaneIndex = prevPaneIndex + 1;
  let currentDelta = delta;
  const increment = currentDelta < 0 ? 1 : -1;
  let currentItemIndex = currentDelta < 0 ? nextPaneIndex : prevPaneIndex;
  const maxDelta = findMaxAvailableDelta(increment, currentLayout, paneRestrictions, currentItemIndex, 0, collapseMode);
  const minAbsDelta = Math.min(Math.abs(currentDelta), Math.abs(maxDelta));
  let deltaApplied = 0;
  currentDelta = currentDelta < 0 ? -minAbsDelta : minAbsDelta;
  currentItemIndex = currentDelta < 0 ? prevPaneIndex : nextPaneIndex;
  while (currentItemIndex >= 0 && currentItemIndex < paneRestrictions.length) {
    const deltaRemaining = Math.abs(currentDelta) - Math.abs(deltaApplied);
    const prevSize = currentLayout[currentItemIndex];
    const unsafeSize = prevSize - deltaRemaining;
    const safeSize = normalizePanelSize(paneRestrictions[currentItemIndex], unsafeSize, collapseMode);
    if (!((0, _number_comparison.compareNumbersWithPrecision)(prevSize, safeSize) === 0)) {
      deltaApplied += prevSize - safeSize;
      nextLayout[currentItemIndex] = safeSize;
      if (parseFloat((0, _utils.toFixed)(deltaApplied, _number_comparison.PRECISION)) >= parseFloat((0, _utils.toFixed)(Math.abs(currentDelta), _number_comparison.PRECISION))) {
        break;
      }
    }
    if (currentDelta < 0) {
      currentItemIndex -= 1;
    } else {
      currentItemIndex += 1;
    }
  }
  if ((0, _number_comparison.compareNumbersWithPrecision)(deltaApplied, 0) === 0) {
    return currentLayout;
  }
  let pivotIndex = currentDelta < 0 ? nextPaneIndex : prevPaneIndex;
  let prevSize = currentLayout[pivotIndex];
  let unsafeSize = prevSize + deltaApplied;
  let safeSize = normalizePanelSize(paneRestrictions[pivotIndex], unsafeSize, collapseMode);
  nextLayout[pivotIndex] = safeSize;
  if (!((0, _number_comparison.compareNumbersWithPrecision)(safeSize, unsafeSize) === 0)) {
    let deltaRemaining = unsafeSize - safeSize;
    pivotIndex = currentDelta < 0 ? nextPaneIndex : prevPaneIndex;
    let index = pivotIndex;
    while (index >= 0 && index < paneRestrictions.length) {
      prevSize = nextLayout[index];
      unsafeSize = prevSize + deltaRemaining;
      safeSize = normalizePanelSize(paneRestrictions[index], unsafeSize, collapseMode);
      if (!((0, _number_comparison.compareNumbersWithPrecision)(prevSize, safeSize) === 0)) {
        deltaRemaining -= safeSize - prevSize;
        nextLayout[index] = safeSize;
      }
      if ((0, _number_comparison.compareNumbersWithPrecision)(deltaRemaining, 0) === 0) {
        break;
      }
      if (currentDelta > 0) {
        index -= 1;
      } else {
        index += 1;
      }
    }
  }
  const totalSize = nextLayout.reduce((total, size) => size + total, 0);
  if (!((0, _number_comparison.compareNumbersWithPrecision)(totalSize, 100, 3) === 0)) {
    return currentLayout;
  }
  return nextLayout;
}
function normalizeOffset(offset, orientation, rtlEnabled) {
  var _a, _b;
  if (orientation === ORIENTATION.vertical) {
    return (_a = offset.y) !== null && _a !== void 0 ? _a : 0;
  }
  return (rtlEnabled ? -1 : 1) * ((_b = offset.x) !== null && _b !== void 0 ? _b : 0);
}
// export function getDimensionByOrientation(orientation: string): string {
//   return orientation === ORIENTATION.horizontal ? 'width' : 'height';
// }
function calculateDelta(offset, orientation, rtlEnabled, ratio) {
  const delta = normalizeOffset(offset, orientation, rtlEnabled) * ratio;
  return delta;
}
function setFlexProp(element, prop, value) {
  const normalizedProp = (0, _style.normalizeStyleProp)(prop, value);
  element.style[(0, _style.styleProp)(prop)] = normalizedProp;
}
function isValidFormat(size, unit) {
  if (!(0, _type.isString)(size)) {
    return false;
  }
  const regex = new RegExp("^\\d+(\\.\\d+)?".concat(unit, "$"));
  return regex.test(size);
}
function isPercentWidth(size) {
  return isValidFormat(size, PERCENT_UNIT);
}
function isPixelWidth(size) {
  if (typeof size === 'number') {
    return size >= 0;
  }
  return isValidFormat(size, PIXEL_UNIT);
}
function computeRatio(totalSize, size) {
  if (totalSize === 0) {
    return 0;
  }
  const percentage = size / totalSize * 100;
  return percentage;
}
function tryConvertToNumber(size, totalPanesSize) {
  if (!(0, _type.isDefined)(size)) {
    return undefined;
  }
  if ((0, _type.isNumeric)(size) && size >= 0) {
    return Number(size);
  }
  if ((0, _type.isString)(size)) {
    if (isPercentWidth(size)) {
      return parseFloat(size) / 100 * totalPanesSize;
    }
    if (isPixelWidth(size)) {
      return parseFloat(size.slice(0, -2));
    }
  }
  return undefined;
}
function convertSizeToRatio(size, totalPanesSize, handlesSizeSum) {
  const sizeInPx = tryConvertToNumber(size, totalPanesSize);
  if (!(0, _type.isDefined)(sizeInPx)) {
    return undefined;
  }
  const adjustedSize = totalPanesSize - handlesSizeSum;
  const ratio = computeRatio(adjustedSize, sizeInPx);
  return parseFloat((0, _utils.toFixed)(ratio, _number_comparison.PRECISION));
}
function getVisibleItems(items) {
  return items.filter(p => p.visible !== false);
}
function getVisibleItemsCount(items) {
  return getVisibleItems(items).length;
}
function getElementSize($element, orientation) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return orientation === ORIENTATION.horizontal ? (0, _size.getWidth)($element) : (0, _size.getHeight)($element);
}
function isElementVisible(element) {
  var _a;
  if (element) {
    return !!(element.offsetWidth || element.offsetHeight || ((_a = element.getClientRects) === null || _a === void 0 ? void 0 : _a.call(element).length));
  }
  return false;
}