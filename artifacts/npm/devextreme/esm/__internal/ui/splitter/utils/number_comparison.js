/**
* DevExtreme (esm/__internal/ui/splitter/utils/number_comparison.js)
* Version: 24.1.1
* Build date: Tue May 07 2024
*
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { toFixed } from '../../../../localization/utils';
export var PRECISION = 10;
export function compareNumbersWithPrecision(actual, expected) {
  var precision = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : PRECISION;
  var delta = parseFloat(toFixed(actual, precision)) - parseFloat(toFixed(expected, precision));
  if (delta === 0) {
    return 0;
  }
  return delta > 0 ? 1 : -1;
}
