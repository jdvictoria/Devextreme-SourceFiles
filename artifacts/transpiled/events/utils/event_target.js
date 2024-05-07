"use strict";

exports.getEventTarget = void 0;
const getEventTarget = event => {
  var _originalEvent$target, _originalEvent$path, _originalEvent$compos;
  const originalEvent = event.originalEvent;
  if (!originalEvent) {
    return event.target;
  }
  const isShadowDOMUsed = Boolean((_originalEvent$target = originalEvent.target) === null || _originalEvent$target === void 0 ? void 0 : _originalEvent$target.shadowRoot);
  if (!isShadowDOMUsed) {
    return originalEvent.target;
  }
  const path = (_originalEvent$path = originalEvent.path) !== null && _originalEvent$path !== void 0 ? _originalEvent$path : (_originalEvent$compos = originalEvent.composedPath) === null || _originalEvent$compos === void 0 ? void 0 : _originalEvent$compos.call(originalEvent);
  const target = path[0];
  return target;
};
exports.getEventTarget = getEventTarget;