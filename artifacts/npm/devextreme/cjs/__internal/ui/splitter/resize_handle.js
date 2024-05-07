/**
* DevExtreme (cjs/__internal/ui/splitter/resize_handle.js)
* Version: 24.1.1
* Build date: Tue May 07 2024
*
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.RESIZE_HANDLE_CLASS = void 0;
var _guid = _interopRequireDefault(require("../../../core/guid"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _extend = require("../../../core/utils/extend");
var _click = require("../../../events/click");
var _events_engine = _interopRequireDefault(require("../../../events/core/events_engine"));
var _double_click = require("../../../events/double_click");
var _drag = require("../../../events/drag");
var _index = require("../../../events/utils/index");
var _message = _interopRequireDefault(require("../../../localization/message"));
var _ui = _interopRequireDefault(require("../../../ui/widget/ui.widget"));
var _event = require("./utils/event");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
const RESIZE_HANDLE_CLASS = exports.RESIZE_HANDLE_CLASS = 'dx-resize-handle';
const RESIZE_HANDLE_RESIZABLE_CLASS = 'dx-resize-handle-resizable';
const HORIZONTAL_DIRECTION_CLASS = 'dx-resize-handle-horizontal';
const VERTICAL_DIRECTION_CLASS = 'dx-resize-handle-vertical';
const RESIZE_HANDLE_ICON_CLASS = 'dx-resize-handle-icon';
const RESIZE_HANDLE_COLLAPSE_PREV_PANE_CLASS = 'dx-resize-handle-collapse-prev-pane';
const RESIZE_HANDLE_COLLAPSE_NEXT_PANE_CLASS = 'dx-resize-handle-collapse-next-pane';
const ICON_CLASS = 'dx-icon';
const STATE_INVISIBLE_CLASS = 'dx-state-invisible';
const RESIZE_HANDLER_MODULE_NAMESPACE = 'dxResizeHandle';
const RESIZE_DIRECTION = {
  horizontal: 'horizontal',
  vertical: 'vertical'
};
const KEYBOARD_DELTA = 5;
const DEFAULT_RESIZE_HANDLE_SIZE = 8;
const INACTIVE_RESIZE_HANDLE_SIZE = 2;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let ResizeHandle = /*#__PURE__*/function (_Widget) {
  _inheritsLoose(ResizeHandle, _Widget);
  function ResizeHandle() {
    return _Widget.apply(this, arguments) || this;
  }
  var _proto = ResizeHandle.prototype;
  _proto._supportedKeys = function _supportedKeys() {
    return (0, _extend.extend)(_Widget.prototype._supportedKeys.call(this), {
      rightArrow(e) {
        e.preventDefault();
        e.stopPropagation();
        const {
          direction,
          showCollapseNext,
          showCollapsePrev,
          rtlEnabled
        } = this.option();
        const forbidCollapseNext = rtlEnabled ? showCollapsePrev === false : showCollapseNext === false;
        if ((0, _index.isCommandKeyPressed)(e)) {
          if (direction === RESIZE_DIRECTION.vertical || forbidCollapseNext) {
            return;
          }
          if (rtlEnabled) {
            this._collapsePrevHandler(e);
          } else {
            this._collapseNextHandler(e);
          }
        } else {
          this._resizeBy(e, {
            x: KEYBOARD_DELTA
          });
        }
      },
      leftArrow(e) {
        e.preventDefault();
        e.stopPropagation();
        const {
          direction,
          showCollapsePrev,
          showCollapseNext,
          rtlEnabled
        } = this.option();
        const forbidCollapsePrev = rtlEnabled ? showCollapseNext === false : showCollapsePrev === false;
        if ((0, _index.isCommandKeyPressed)(e)) {
          if (direction === RESIZE_DIRECTION.vertical || forbidCollapsePrev) {
            return;
          }
          if (rtlEnabled) {
            this._collapseNextHandler(e);
          } else {
            this._collapsePrevHandler(e);
          }
        } else {
          this._resizeBy(e, {
            x: -KEYBOARD_DELTA
          });
        }
      },
      upArrow(e) {
        e.preventDefault();
        e.stopPropagation();
        const {
          direction,
          showCollapsePrev
        } = this.option();
        if ((0, _index.isCommandKeyPressed)(e)) {
          if (direction === RESIZE_DIRECTION.horizontal || showCollapsePrev === false) {
            return;
          }
          this._collapsePrevHandler(e);
        } else {
          this._resizeBy(e, {
            y: -KEYBOARD_DELTA
          });
        }
      },
      downArrow(e) {
        e.preventDefault();
        e.stopPropagation();
        const {
          direction,
          showCollapseNext
        } = this.option();
        if ((0, _index.isCommandKeyPressed)(e)) {
          if (direction === RESIZE_DIRECTION.horizontal || showCollapseNext === false) {
            return;
          }
          this._collapseNextHandler(e);
        } else {
          this._resizeBy(e, {
            y: KEYBOARD_DELTA
          });
        }
      }
    });
  };
  _proto._getDefaultOptions = function _getDefaultOptions() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (0, _extend.extend)(_Widget.prototype._getDefaultOptions.call(this), {
      direction: RESIZE_DIRECTION.horizontal,
      hoverStateEnabled: true,
      focusStateEnabled: true,
      activeStateEnabled: true,
      onResize: null,
      onResizeEnd: null,
      onResizeStart: null,
      resizable: true,
      showCollapsePrev: true,
      showCollapseNext: true,
      onCollapsePrev: null,
      onCollapseNext: null,
      separatorSize: DEFAULT_RESIZE_HANDLE_SIZE
    });
  };
  _proto._init = function _init() {
    _Widget.prototype._init.call(this);
    const namespace = "".concat(RESIZE_HANDLER_MODULE_NAMESPACE).concat(new _guid.default());
    this.RESIZE_START_EVENT_NAME = (0, _index.addNamespace)(_drag.start, namespace);
    this.RESIZE_EVENT_NAME = (0, _index.addNamespace)(_drag.move, namespace);
    this.RESIZE_END_EVENT_NAME = (0, _index.addNamespace)(_drag.end, namespace);
    this.CLICK_EVENT_NAME = (0, _index.addNamespace)(_click.name, namespace);
    this.DOUBLE_CLICK_EVENT_NAME = (0, _index.addNamespace)(_double_click.name, namespace);
  };
  _proto._initMarkup = function _initMarkup() {
    _Widget.prototype._initMarkup.call(this);
    this._renderResizeHandleContent();
    this._setAriaAttributes();
  };
  _proto._renderResizeHandleContent = function _renderResizeHandleContent() {
    const {
      resizable
    } = this.option();
    this.$element().addClass(RESIZE_HANDLE_CLASS);
    this.$element().toggleClass(RESIZE_HANDLE_RESIZABLE_CLASS, resizable);
    this._toggleDirectionClass();
    this._updateDimensions();
    this._$collapsePrevButton = (0, _renderer.default)('<div>').addClass(this._getIconClass('prev')).appendTo(this.$element());
    this._$resizeHandle = (0, _renderer.default)('<div>').addClass(this._getIconClass('icon')).appendTo(this.$element());
    this._$collapseNextButton = (0, _renderer.default)('<div>').addClass(this._getIconClass('next')).appendTo(this.$element());
    this._setCollapseButtonsVisibility();
    this._setResizeIconVisibility();
  };
  _proto._updateIconsClasses = function _updateIconsClasses() {
    const isHorizontal = this._isHorizontalDirection();
    const rtlEnabled = this.option('rtlEnabled');
    this._$collapsePrevButton.removeClass(this._getCollapseIconClass(false, !isHorizontal, rtlEnabled)).addClass(this._getCollapseIconClass(false, isHorizontal, rtlEnabled));
    this._$resizeHandle.removeClass(this._getResizeIconClass(!isHorizontal)).addClass(this._getResizeIconClass(isHorizontal));
    this._$collapseNextButton.removeClass(this._getCollapseIconClass(true, !isHorizontal, rtlEnabled)).addClass(this._getCollapseIconClass(true, isHorizontal, rtlEnabled));
  };
  _proto._updateDimensions = function _updateDimensions() {
    const isHorizontal = this._isHorizontalDirection();
    const dimension = isHorizontal ? 'width' : 'height';
    const inverseDimension = isHorizontal ? 'height' : 'width';
    this.option(inverseDimension, null);
    this.option(dimension, this.getSize());
  };
  _proto._isInactive = function _isInactive() {
    const {
      resizable,
      showCollapseNext,
      showCollapsePrev
    } = this.option();
    return resizable === false && showCollapseNext === false && showCollapsePrev === false;
  };
  _proto._getIconClass = function _getIconClass(iconType) {
    const isHorizontal = this._isHorizontalDirection();
    const rtlEnabled = this.option('rtlEnabled');
    switch (iconType) {
      case 'prev':
        return "".concat(RESIZE_HANDLE_COLLAPSE_PREV_PANE_CLASS, " ").concat(ICON_CLASS, " ").concat(this._getCollapseIconClass(false, isHorizontal, rtlEnabled));
      case 'next':
        return "".concat(RESIZE_HANDLE_COLLAPSE_NEXT_PANE_CLASS, " ").concat(ICON_CLASS, " ").concat(this._getCollapseIconClass(true, isHorizontal, rtlEnabled));
      case 'icon':
        return "".concat(RESIZE_HANDLE_ICON_CLASS, " ").concat(ICON_CLASS, " ").concat(this._getResizeIconClass(isHorizontal));
      default:
        return '';
    }
  }
  // eslint-disable-next-line class-methods-use-this
  ;
  _proto._getResizeIconClass = function _getResizeIconClass(isHorizontal) {
    return "dx-icon-handle".concat(isHorizontal ? 'vertical' : 'horizontal');
  }
  // eslint-disable-next-line class-methods-use-this
  ;
  _proto._getCollapseIconClass = function _getCollapseIconClass(isNextButton, isHorizontal, rtlEnabled) {
    const horizontalDirection = isNextButton === rtlEnabled ? 'left' : 'right';
    const verticalDirection = isNextButton ? 'down' : 'up';
    return "dx-icon-triangle".concat(isHorizontal ? horizontalDirection : verticalDirection);
  };
  _proto._setCollapseButtonsVisibility = function _setCollapseButtonsVisibility() {
    const {
      showCollapsePrev,
      showCollapseNext
    } = this.option();
    this._$collapsePrevButton.toggleClass(STATE_INVISIBLE_CLASS, !showCollapsePrev);
    this._$collapseNextButton.toggleClass(STATE_INVISIBLE_CLASS, !showCollapseNext);
  };
  _proto._setResizeIconVisibility = function _setResizeIconVisibility() {
    const {
      resizable
    } = this.option();
    this._$resizeHandle.toggleClass(STATE_INVISIBLE_CLASS, !resizable);
  };
  _proto._setAriaAttributes = function _setAriaAttributes() {
    this.setAria({
      role: 'application',
      // eslint-disable-next-line spellcheck/spell-checker
      roledescription: 'separator',
      label: _message.default.format('dxSplitter-resizeHandleAriaLabel')
    });
  };
  _proto._toggleDirectionClass = function _toggleDirectionClass() {
    this.$element().toggleClass(HORIZONTAL_DIRECTION_CLASS, this._isHorizontalDirection());
    this.$element().toggleClass(VERTICAL_DIRECTION_CLASS, !this._isHorizontalDirection());
  };
  _proto._render = function _render() {
    _Widget.prototype._render.call(this);
    this._attachEventHandlers();
  };
  _proto._resizeStartHandler = function _resizeStartHandler(e) {
    this._getAction(_event.RESIZE_EVENT.onResizeStart)({
      event: e
    });
  };
  _proto._resizeHandler = function _resizeHandler(e) {
    this._getAction(_event.RESIZE_EVENT.onResize)({
      event: e
    });
  };
  _proto._resizeEndHandler = function _resizeEndHandler(e) {
    this._getAction(_event.RESIZE_EVENT.onResizeEnd)({
      event: e
    });
  };
  _proto._collapsePrevHandler = function _collapsePrevHandler(e) {
    this._getAction(_event.COLLAPSE_EVENT.onCollapsePrev)({
      event: e
    });
  };
  _proto._collapseNextHandler = function _collapseNextHandler(e) {
    this._getAction(_event.COLLAPSE_EVENT.onCollapseNext)({
      event: e
    });
  };
  _proto._resizeBy = function _resizeBy(e) {
    let offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      x: 0,
      y: 0
    };
    const {
      resizable
    } = this.option();
    if (resizable === false) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    e.offset = offset;
    this._resizeStartHandler(e);
    this._resizeHandler(e);
    this._resizeEndHandler(e);
  };
  _proto._createEventAction = function _createEventAction(eventName) {
    const actionName = (0, _event.getActionNameByEventName)(eventName);
    this[actionName] = this._createActionByOption(eventName, {
      excludeValidators: ['disabled', 'readOnly']
    });
  };
  _proto._getAction = function _getAction(eventName) {
    const actionName = (0, _event.getActionNameByEventName)(eventName);
    if (!this[actionName]) {
      this._createEventAction(eventName);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this[actionName];
  };
  _proto._attachEventHandlers = function _attachEventHandlers() {
    this._attachResizeEventHandlers();
    this._attachPointerEventHandlers();
  };
  _proto._attachResizeEventHandlers = function _attachResizeEventHandlers() {
    const {
      resizable,
      direction
    } = this.option();
    if (resizable) {
      const eventData = {
        direction,
        immediate: true
      };
      _events_engine.default.on(this.$element(), this.RESIZE_START_EVENT_NAME, eventData, this._resizeStartHandler.bind(this));
      _events_engine.default.on(this.$element(), this.RESIZE_EVENT_NAME, eventData, this._resizeHandler.bind(this));
      _events_engine.default.on(this.$element(), this.RESIZE_END_EVENT_NAME, eventData, this._resizeEndHandler.bind(this));
    }
  };
  _proto._attachPointerEventHandlers = function _attachPointerEventHandlers() {
    const {
      showCollapsePrev,
      showCollapseNext
    } = this.option();
    if (showCollapsePrev === true || showCollapseNext === true) {
      _events_engine.default.on(this.$element(), this.DOUBLE_CLICK_EVENT_NAME, this._doubleClickHandler.bind(this));
    }
    if (showCollapsePrev === true) {
      _events_engine.default.on(this._$collapsePrevButton, this.CLICK_EVENT_NAME, this._collapsePrevHandler.bind(this));
    }
    if (showCollapseNext === true) {
      _events_engine.default.on(this._$collapseNextButton, this.CLICK_EVENT_NAME, this._collapseNextHandler.bind(this));
    }
  };
  _proto._detachEventHandlers = function _detachEventHandlers() {
    this._detachResizeEventHandlers();
    this._detachPointerEventHandlers();
  };
  _proto._detachResizeEventHandlers = function _detachResizeEventHandlers() {
    // @ts-expect-error todo: make optional parameters for eventsEngine
    _events_engine.default.off(this.$element(), this.RESIZE_START_EVENT_NAME);
    // @ts-expect-error todo: make optional parameters for eventsEngine
    _events_engine.default.off(this.$element(), this.RESIZE_EVENT_NAME);
    // @ts-expect-error todo: make optional parameters for eventsEngine
    _events_engine.default.off(this.$element(), this.RESIZE_END_EVENT_NAME);
  };
  _proto._detachPointerEventHandlers = function _detachPointerEventHandlers() {
    // @ts-expect-error todo: make optional parameters for eventsEngine
    _events_engine.default.off(this.$element(), this.DOUBLE_CLICK_EVENT_NAME);
    // @ts-expect-error todo: make optional parameters for eventsEngine
    _events_engine.default.off(this._$collapsePrevButton, this.CLICK_EVENT_NAME);
    // @ts-expect-error todo: make optional parameters for eventsEngine
    _events_engine.default.off(this._$collapseNextButton, this.CLICK_EVENT_NAME);
  };
  _proto._doubleClickHandler = function _doubleClickHandler(e) {
    const {
      showCollapsePrev,
      showCollapseNext
    } = this.option();
    if (showCollapsePrev === true) {
      this._collapsePrevHandler(e);
    } else if (showCollapseNext === true) {
      this._collapseNextHandler(e);
    }
  };
  _proto._isHorizontalDirection = function _isHorizontalDirection() {
    return this.option('direction') === RESIZE_DIRECTION.horizontal;
  };
  _proto._clean = function _clean() {
    this._detachResizeEventHandlers();
    this._detachPointerEventHandlers();
    _Widget.prototype._clean.call(this);
  };
  _proto._optionChanged = function _optionChanged(args) {
    const {
      name,
      value
    } = args;
    switch (name) {
      case 'direction':
        this._toggleDirectionClass();
        this._detachResizeEventHandlers();
        this._attachResizeEventHandlers();
        this._updateDimensions();
        this._updateIconsClasses();
        break;
      case 'resizable':
        this._setResizeIconVisibility();
        this.$element().toggleClass(RESIZE_HANDLE_RESIZABLE_CLASS, value);
        this._detachResizeEventHandlers();
        this._attachResizeEventHandlers();
        this._updateDimensions();
        break;
      case 'separatorSize':
        this._updateDimensions();
        break;
      case 'showCollapsePrev':
      case 'showCollapseNext':
        this._setCollapseButtonsVisibility();
        this._setResizeIconVisibility();
        this._updateDimensions();
        this._detachPointerEventHandlers();
        this._attachPointerEventHandlers();
        break;
      case 'onCollapsePrev':
      case 'onCollapseNext':
      case 'onResize':
      case 'onResizeStart':
      case 'onResizeEnd':
        this._createEventAction(name);
        break;
      default:
        _Widget.prototype._optionChanged.call(this, args);
    }
  };
  _proto.getSize = function getSize() {
    const {
      separatorSize
    } = this.option();
    if (this._isInactive()) {
      return INACTIVE_RESIZE_HANDLE_SIZE;
    }
    return Number.isFinite(separatorSize) && separatorSize >= 0 ? separatorSize : DEFAULT_RESIZE_HANDLE_SIZE;
  };
  _proto.isInactive = function isInactive() {
    return this._isInactive();
  };
  return ResizeHandle;
}(_ui.default);
var _default = exports.default = ResizeHandle;
