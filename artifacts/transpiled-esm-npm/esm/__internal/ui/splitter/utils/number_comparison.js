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