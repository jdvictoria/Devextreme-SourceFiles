/**
* DevExtreme (esm/renovation/utils/type_conversion.js)
* Version: 24.1.1
* Build date: Tue May 07 2024
*
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export function toNumber(attribute) {
  return attribute ? Number(attribute.replace('px', '')) : 0;
}
