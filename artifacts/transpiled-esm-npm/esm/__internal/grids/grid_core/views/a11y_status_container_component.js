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