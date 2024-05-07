/**
* DevExtreme (esm/__internal/grids/grid_core/keyboard_navigation/dom.js)
* Version: 24.1.1
* Build date: Tue May 07 2024
*
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ATTRIBUTES } from './const';
var isDragCell = $cell => $cell.attr(ATTRIBUTES.dragCell) !== undefined;
var getCellToFocus = ($cellElements, columnIndex) => $cellElements.filter("[".concat(ATTRIBUTES.ariaColIndex, "=\"").concat(columnIndex + 1, "\"]:not([").concat(ATTRIBUTES.dragCell, "])")).first();
export var GridCoreKeyboardNavigationDom = {
  isDragCell,
  getCellToFocus
};
