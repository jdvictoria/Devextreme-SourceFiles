import { getHeight, getWidth } from '../../../../core/utils/size';
import { normalizeStyleProp, styleProp } from '../../../../core/utils/style';
import { isDefined, isNumeric, isString } from '../../../../core/utils/type';
import { toFixed } from '../../../../localization/utils';
import { compareNumbersWithPrecision, PRECISION } from './number_comparison';
// const FLEX_PROPERTY_NAME = 'flexGrow';
var ORIENTATION = {
  horizontal: 'horizontal',
  vertical: 'vertical'
};
var PERCENT_UNIT = '%';
var PIXEL_UNIT = 'px';
// export function getCurrentLayout($items: dxElementWrapper): number[] {
//   const itemsDistribution: number[] = [];
//   $items.each((index, item) => {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     itemsDistribution.push(parseFloat(($(item) as any).css(FLEX_PROPERTY_NAME)));
//     return true;
//   });
//   return itemsDistribution;
// }
export function findLastIndexOfVisibleItem(items) {
  for (var i = items.length - 1; i >= 0; i -= 1) {
    if (items[i].visible !== false) {
      return i;
    }
  }
  return -1;
}
export function findIndexOfNextVisibleItem(items, index) {
  for (var i = index + 1; i < items.length; i += 1) {
    if (items[i].visible !== false) {
      return i;
    }
  }
  return -1;
}
export function normalizePanelSize(paneRestrictions, size) {
  var collapseMode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var {
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
  if (resizable === false && isDefined(paneRestrictions.size)) {
    return paneRestrictions.size;
  }
  var adjustedSize = compareNumbersWithPrecision(size, minSize) < 0 ? minSize : size;
  adjustedSize = Math.min(maxSize, adjustedSize);
  adjustedSize = parseFloat(toFixed(adjustedSize, PRECISION));
  if (collapseMode && size < collapsedSize) {
    return collapsedSize;
  }
  return adjustedSize;
}
function findMaxAvailableDelta(increment, currentLayout, paneRestrictions, paneIndex) {
  var maxDelta = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  var collapseMode = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
  if (paneIndex < 0 || paneIndex >= paneRestrictions.length) {
    return maxDelta;
  }
  var prevSize = currentLayout[paneIndex];
  var maxPaneSize = normalizePanelSize(paneRestrictions[paneIndex], 100, collapseMode);
  var delta = maxPaneSize - prevSize;
  var nextMaxDelta = maxDelta + delta;
  return findMaxAvailableDelta(increment, currentLayout, paneRestrictions, paneIndex + increment, nextMaxDelta, collapseMode);
}
export function getNextLayout(currentLayout, delta, prevPaneIndex, paneRestrictions) {
  var collapseMode = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  var nextLayout = [...currentLayout];
  var nextPaneIndex = prevPaneIndex + 1;
  var currentDelta = delta;
  var increment = currentDelta < 0 ? 1 : -1;
  var currentItemIndex = currentDelta < 0 ? nextPaneIndex : prevPaneIndex;
  var maxDelta = findMaxAvailableDelta(increment, currentLayout, paneRestrictions, currentItemIndex, 0, collapseMode);
  var minAbsDelta = Math.min(Math.abs(currentDelta), Math.abs(maxDelta));
  var deltaApplied = 0;
  currentDelta = currentDelta < 0 ? -minAbsDelta : minAbsDelta;
  currentItemIndex = currentDelta < 0 ? prevPaneIndex : nextPaneIndex;
  while (currentItemIndex >= 0 && currentItemIndex < paneRestrictions.length) {
    var deltaRemaining = Math.abs(currentDelta) - Math.abs(deltaApplied);
    var _prevSize = currentLayout[currentItemIndex];
    var _unsafeSize = _prevSize - deltaRemaining;
    var _safeSize = normalizePanelSize(paneRestrictions[currentItemIndex], _unsafeSize, collapseMode);
    if (!(compareNumbersWithPrecision(_prevSize, _safeSize) === 0)) {
      deltaApplied += _prevSize - _safeSize;
      nextLayout[currentItemIndex] = _safeSize;
      if (parseFloat(toFixed(deltaApplied, PRECISION)) >= parseFloat(toFixed(Math.abs(currentDelta), PRECISION))) {
        break;
      }
    }
    if (currentDelta < 0) {
      currentItemIndex -= 1;
    } else {
      currentItemIndex += 1;
    }
  }
  if (compareNumbersWithPrecision(deltaApplied, 0) === 0) {
    return currentLayout;
  }
  var pivotIndex = currentDelta < 0 ? nextPaneIndex : prevPaneIndex;
  var prevSize = currentLayout[pivotIndex];
  var unsafeSize = prevSize + deltaApplied;
  var safeSize = normalizePanelSize(paneRestrictions[pivotIndex], unsafeSize, collapseMode);
  nextLayout[pivotIndex] = safeSize;
  if (!(compareNumbersWithPrecision(safeSize, unsafeSize) === 0)) {
    var _deltaRemaining = unsafeSize - safeSize;
    pivotIndex = currentDelta < 0 ? nextPaneIndex : prevPaneIndex;
    var index = pivotIndex;
    while (index >= 0 && index < paneRestrictions.length) {
      prevSize = nextLayout[index];
      unsafeSize = prevSize + _deltaRemaining;
      safeSize = normalizePanelSize(paneRestrictions[index], unsafeSize, collapseMode);
      if (!(compareNumbersWithPrecision(prevSize, safeSize) === 0)) {
        _deltaRemaining -= safeSize - prevSize;
        nextLayout[index] = safeSize;
      }
      if (compareNumbersWithPrecision(_deltaRemaining, 0) === 0) {
        break;
      }
      if (currentDelta > 0) {
        index -= 1;
      } else {
        index += 1;
      }
    }
  }
  var totalSize = nextLayout.reduce((total, size) => size + total, 0);
  if (!(compareNumbersWithPrecision(totalSize, 100, 3) === 0)) {
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
export function calculateDelta(offset, orientation, rtlEnabled, ratio) {
  var delta = normalizeOffset(offset, orientation, rtlEnabled) * ratio;
  return delta;
}
export function setFlexProp(element, prop, value) {
  var normalizedProp = normalizeStyleProp(prop, value);
  element.style[styleProp(prop)] = normalizedProp;
}
function isValidFormat(size, unit) {
  if (!isString(size)) {
    return false;
  }
  var regex = new RegExp("^\\d+(\\.\\d+)?".concat(unit, "$"));
  return regex.test(size);
}
export function isPercentWidth(size) {
  return isValidFormat(size, PERCENT_UNIT);
}
export function isPixelWidth(size) {
  if (typeof size === 'number') {
    return size >= 0;
  }
  return isValidFormat(size, PIXEL_UNIT);
}
function computeRatio(totalSize, size) {
  if (totalSize === 0) {
    return 0;
  }
  var percentage = size / totalSize * 100;
  return percentage;
}
export function tryConvertToNumber(size, totalPanesSize) {
  if (!isDefined(size)) {
    return undefined;
  }
  if (isNumeric(size) && size >= 0) {
    return Number(size);
  }
  if (isString(size)) {
    if (isPercentWidth(size)) {
      return parseFloat(size) / 100 * totalPanesSize;
    }
    if (isPixelWidth(size)) {
      return parseFloat(size.slice(0, -2));
    }
  }
  return undefined;
}
export function convertSizeToRatio(size, totalPanesSize, handlesSizeSum) {
  var sizeInPx = tryConvertToNumber(size, totalPanesSize);
  if (!isDefined(sizeInPx)) {
    return undefined;
  }
  var adjustedSize = totalPanesSize - handlesSizeSum;
  var ratio = computeRatio(adjustedSize, sizeInPx);
  return parseFloat(toFixed(ratio, PRECISION));
}
export function getVisibleItems(items) {
  return items.filter(p => p.visible !== false);
}
export function getVisibleItemsCount(items) {
  return getVisibleItems(items).length;
}
export function getElementSize($element, orientation) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return orientation === ORIENTATION.horizontal ? getWidth($element) : getHeight($element);
}
export function isElementVisible(element) {
  var _a;
  if (element) {
    return !!(element.offsetWidth || element.offsetHeight || ((_a = element.getClientRects) === null || _a === void 0 ? void 0 : _a.call(element).length));
  }
  return false;
}