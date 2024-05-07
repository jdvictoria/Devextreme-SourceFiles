/**
* DevExtreme (esm/core/element.js)
* Version: 24.1.1
* Build date: Tue May 07 2024
*
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
var strategy = function strategy(element) {
  return element && element.get(0);
};
export function getPublicElement(element) {
  return strategy(element);
}
export function setPublicElementWrapper(newStrategy) {
  strategy = newStrategy;
}
