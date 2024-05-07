/**
* DevExtreme (esm/events/utils/event_target.js)
* Version: 24.1.1
* Build date: Tue May 07 2024
*
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export var getEventTarget = event => {
  var _originalEvent$target, _originalEvent$path, _originalEvent$compos;
  var originalEvent = event.originalEvent;
  if (!originalEvent) {
    return event.target;
  }
  var isShadowDOMUsed = Boolean((_originalEvent$target = originalEvent.target) === null || _originalEvent$target === void 0 ? void 0 : _originalEvent$target.shadowRoot);
  if (!isShadowDOMUsed) {
    return originalEvent.target;
  }
  var path = (_originalEvent$path = originalEvent.path) !== null && _originalEvent$path !== void 0 ? _originalEvent$path : (_originalEvent$compos = originalEvent.composedPath) === null || _originalEvent$compos === void 0 ? void 0 : _originalEvent$compos.call(originalEvent);
  var target = path[0];
  return target;
};
