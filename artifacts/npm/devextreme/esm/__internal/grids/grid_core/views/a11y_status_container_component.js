/**
* DevExtreme (esm/__internal/grids/grid_core/views/a11y_status_container_component.js)
* Version: 24.1.1
* Build date: Tue May 07 2024
*
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../../../core/renderer';
var CLASSES = {
  container: 'dx-gridbase-a11y-status-container'
};
export var A11yStatusContainerComponent = _ref => {
  var {
    statusText
  } = _ref;
  return $('<div>').text(statusText !== null && statusText !== void 0 ? statusText : '').addClass(CLASSES.container).attr('role', 'status');
};
