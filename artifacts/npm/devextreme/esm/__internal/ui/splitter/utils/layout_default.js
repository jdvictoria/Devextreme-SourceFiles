/**
* DevExtreme (esm/__internal/ui/splitter/utils/layout_default.js)
* Version: 24.1.1
* Build date: Tue May 07 2024
*
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { isDefined } from '../../../../core/utils/type';
import { toFixed } from '../../../../localization/utils';
import { findLastIndexOfVisibleItem, normalizePanelSize } from './layout';
import { compareNumbersWithPrecision, PRECISION } from './number_comparison';
export function getDefaultLayout(layoutRestrictions) {
  var layout = new Array(layoutRestrictions.length).fill(null);
  var numPanelsWithDefinedSize = 0;
  var remainingSize = 100;
  layoutRestrictions.forEach((paneRestrictions, index) => {
    var {
      size,
      visible,
      collapsed,
      collapsedSize = 0
    } = paneRestrictions;
    if (visible === false) {
      numPanelsWithDefinedSize += 1;
      layout[index] = 0;
      remainingSize -= 0;
      return;
    }
    if (collapsed === true) {
      numPanelsWithDefinedSize += 1;
      layout[index] = collapsedSize;
      remainingSize -= collapsedSize;
      return;
    }
    if (isDefined(size)) {
      numPanelsWithDefinedSize += 1;
      if (remainingSize - size < 0) {
        layout[index] = remainingSize;
        remainingSize = 0;
        return;
      }
      layout[index] = size;
      remainingSize -= size;
    }
  });
  var panelsToDistribute = layoutRestrictions.length - numPanelsWithDefinedSize;
  if (panelsToDistribute === 0) {
    layout[findLastIndexOfVisibleItem(layoutRestrictions)] += remainingSize;
    remainingSize = 0;
  } else {
    layoutRestrictions.forEach((paneRestrictions, index) => {
      if (layout[index] === null) {
        if (isDefined(paneRestrictions.maxSize) && panelsToDistribute === 1) {
          layout[index] = remainingSize > paneRestrictions.maxSize ? remainingSize : paneRestrictions.maxSize;
          remainingSize -= layout[index];
          numPanelsWithDefinedSize += 1;
        } else if (isDefined(paneRestrictions.maxSize) && paneRestrictions.maxSize < remainingSize / panelsToDistribute) {
          layout[index] = paneRestrictions.maxSize;
          remainingSize -= paneRestrictions.maxSize;
          numPanelsWithDefinedSize += 1;
          panelsToDistribute -= 1;
        }
      }
    });
    panelsToDistribute = layoutRestrictions.length - numPanelsWithDefinedSize;
    if (panelsToDistribute > 0) {
      var spacePerPanel = remainingSize / panelsToDistribute;
      layout.forEach((panelSize, index) => {
        if (panelSize === null) {
          layout[index] = spacePerPanel;
        }
      });
    }
  }
  layout = layout.map(size => size === null ? 0 : parseFloat(toFixed(size, PRECISION)));
  if (layout.length === 1) {
    return layout;
  }
  var nextLayout = [...layout];
  var nextLayoutTotalSize = nextLayout.reduce((accumulated, current) => accumulated + current, 0);
  if (!(compareNumbersWithPrecision(nextLayoutTotalSize, 100) === 0)) {
    for (var index = 0; index < layoutRestrictions.length; index += 1) {
      var unsafeSize = nextLayout[index];
      var safeSize = 100 / nextLayoutTotalSize * unsafeSize;
      nextLayout[index] = safeSize;
    }
  }
  remainingSize = 0;
  nextLayout = layout.map((panelSize, index) => {
    var restriction = layoutRestrictions[index];
    var adjustedSize = normalizePanelSize(restriction, panelSize);
    remainingSize += panelSize - adjustedSize;
    return adjustedSize;
  });
  if (compareNumbersWithPrecision(remainingSize, 0) !== 0) {
    for (var _index = 0; _index < nextLayout.length && compareNumbersWithPrecision(remainingSize, 0) !== 0; _index += 1) {
      var currentSize = nextLayout[_index];
      var adjustedSize = normalizePanelSize(layoutRestrictions[_index], currentSize + remainingSize);
      remainingSize -= adjustedSize - currentSize;
      nextLayout[_index] = adjustedSize;
    }
    if (remainingSize > 0) {
      var paneIndex = findLastIndexOfVisibleItem(layoutRestrictions);
      if (layoutRestrictions[paneIndex].collapsed === false) {
        nextLayout[paneIndex] += remainingSize;
      }
    }
  }
  return nextLayout;
}
