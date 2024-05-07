/**
* DevExtreme (esm/renovation/ui/scroll_view/utils/get_scroll_top_max.js)
* Version: 24.1.1
* Build date: Tue May 07 2024
*
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export function getScrollTopMax(element) {
  return element.scrollHeight - element.clientHeight;
}