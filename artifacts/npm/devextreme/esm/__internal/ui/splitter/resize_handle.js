/**
* DevExtreme (esm/__internal/ui/splitter/resize_handle.js)
* Version: 24.1.1
* Build date: Tue May 07 2024
*
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import Guid from '../../../core/guid';
import $ from '../../../core/renderer';
import { extend } from '../../../core/utils/extend';
import { name as CLICK_EVENT } from '../../../events/click';
import eventsEngine from '../../../events/core/events_engine';
import { name as DOUBLE_CLICK_EVENT } from '../../../events/double_click';
import { end as dragEventEnd, move as dragEventMove, start as dragEventStart } from '../../../events/drag';
import { addNamespace, isCommandKeyPressed } from '../../../events/utils/index';
import messageLocalization from '../../../localization/message';
import Widget from '../../../ui/widget/ui.widget';
import { COLLAPSE_EVENT, getActionNameByEventName, RESIZE_EVENT } from './utils/event';
export var RESIZE_HANDLE_CLASS = 'dx-resize-handle';
var RESIZE_HANDLE_RESIZABLE_CLASS = 'dx-resize-handle-resizable';
var HORIZONTAL_DIRECTION_CLASS = 'dx-resize-handle-horizontal';
var VERTICAL_DIRECTION_CLASS = 'dx-resize-handle-vertical';
var RESIZE_HANDLE_ICON_CLASS = 'dx-resize-handle-icon';
var RESIZE_HANDLE_COLLAPSE_PREV_PANE_CLASS = 'dx-resize-handle-collapse-prev-pane';
var RESIZE_HANDLE_COLLAPSE_NEXT_PANE_CLASS = 'dx-resize-handle-collapse-next-pane';
var ICON_CLASS = 'dx-icon';
var STATE_INVISIBLE_CLASS = 'dx-state-invisible';
var RESIZE_HANDLER_MODULE_NAMESPACE = 'dxResizeHandle';
var RESIZE_DIRECTION = {
  horizontal: 'horizontal',
  vertical: 'vertical'
};
var KEYBOARD_DELTA = 5;
var DEFAULT_RESIZE_HANDLE_SIZE = 8;
var INACTIVE_RESIZE_HANDLE_SIZE = 2;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
class ResizeHandle extends Widget {
  _supportedKeys() {
    return extend(super._supportedKeys(), {
      rightArrow(e) {
        e.preventDefault();
        e.stopPropagation();
        var {
          direction,
          showCollapseNext,
          showCollapsePrev,
          rtlEnabled
        } = this.option();
        var forbidCollapseNext = rtlEnabled ? showCollapsePrev === false : showCollapseNext === false;
        if (isCommandKeyPressed(e)) {
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
        var {
          direction,
          showCollapsePrev,
          showCollapseNext,
          rtlEnabled
        } = this.option();
        var forbidCollapsePrev = rtlEnabled ? showCollapseNext === false : showCollapsePrev === false;
        if (isCommandKeyPressed(e)) {
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
        var {
          direction,
          showCollapsePrev
        } = this.option();
        if (isCommandKeyPressed(e)) {
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
        var {
          direction,
          showCollapseNext
        } = this.option();
        if (isCommandKeyPressed(e)) {
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
  }
  _getDefaultOptions() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return extend(super._getDefaultOptions(), {
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
  }
  _init() {
    super._init();
    var namespace = "".concat(RESIZE_HANDLER_MODULE_NAMESPACE).concat(new Guid());
    this.RESIZE_START_EVENT_NAME = addNamespace(dragEventStart, namespace);
    this.RESIZE_EVENT_NAME = addNamespace(dragEventMove, namespace);
    this.RESIZE_END_EVENT_NAME = addNamespace(dragEventEnd, namespace);
    this.CLICK_EVENT_NAME = addNamespace(CLICK_EVENT, namespace);
    this.DOUBLE_CLICK_EVENT_NAME = addNamespace(DOUBLE_CLICK_EVENT, namespace);
  }
  _initMarkup() {
    super._initMarkup();
    this._renderResizeHandleContent();
    this._setAriaAttributes();
  }
  _renderResizeHandleContent() {
    var {
      resizable
    } = this.option();
    this.$element().addClass(RESIZE_HANDLE_CLASS);
    this.$element().toggleClass(RESIZE_HANDLE_RESIZABLE_CLASS, resizable);
    this._toggleDirectionClass();
    this._updateDimensions();
    this._$collapsePrevButton = $('<div>').addClass(this._getIconClass('prev')).appendTo(this.$element());
    this._$resizeHandle = $('<div>').addClass(this._getIconClass('icon')).appendTo(this.$element());
    this._$collapseNextButton = $('<div>').addClass(this._getIconClass('next')).appendTo(this.$element());
    this._setCollapseButtonsVisibility();
    this._setResizeIconVisibility();
  }
  _updateIconsClasses() {
    var isHorizontal = this._isHorizontalDirection();
    var rtlEnabled = this.option('rtlEnabled');
    this._$collapsePrevButton.removeClass(this._getCollapseIconClass(false, !isHorizontal, rtlEnabled)).addClass(this._getCollapseIconClass(false, isHorizontal, rtlEnabled));
    this._$resizeHandle.removeClass(this._getResizeIconClass(!isHorizontal)).addClass(this._getResizeIconClass(isHorizontal));
    this._$collapseNextButton.removeClass(this._getCollapseIconClass(true, !isHorizontal, rtlEnabled)).addClass(this._getCollapseIconClass(true, isHorizontal, rtlEnabled));
  }
  _updateDimensions() {
    var isHorizontal = this._isHorizontalDirection();
    var dimension = isHorizontal ? 'width' : 'height';
    var inverseDimension = isHorizontal ? 'height' : 'width';
    this.option(inverseDimension, null);
    this.option(dimension, this.getSize());
  }
  _isInactive() {
    var {
      resizable,
      showCollapseNext,
      showCollapsePrev
    } = this.option();
    return resizable === false && showCollapseNext === false && showCollapsePrev === false;
  }
  _getIconClass(iconType) {
    var isHorizontal = this._isHorizontalDirection();
    var rtlEnabled = this.option('rtlEnabled');
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
  _getResizeIconClass(isHorizontal) {
    return "dx-icon-handle".concat(isHorizontal ? 'vertical' : 'horizontal');
  }
  // eslint-disable-next-line class-methods-use-this
  _getCollapseIconClass(isNextButton, isHorizontal, rtlEnabled) {
    var horizontalDirection = isNextButton === rtlEnabled ? 'left' : 'right';
    var verticalDirection = isNextButton ? 'down' : 'up';
    return "dx-icon-triangle".concat(isHorizontal ? horizontalDirection : verticalDirection);
  }
  _setCollapseButtonsVisibility() {
    var {
      showCollapsePrev,
      showCollapseNext
    } = this.option();
    this._$collapsePrevButton.toggleClass(STATE_INVISIBLE_CLASS, !showCollapsePrev);
    this._$collapseNextButton.toggleClass(STATE_INVISIBLE_CLASS, !showCollapseNext);
  }
  _setResizeIconVisibility() {
    var {
      resizable
    } = this.option();
    this._$resizeHandle.toggleClass(STATE_INVISIBLE_CLASS, !resizable);
  }
  _setAriaAttributes() {
    this.setAria({
      role: 'application',
      // eslint-disable-next-line spellcheck/spell-checker
      roledescription: 'separator',
      label: messageLocalization.format('dxSplitter-resizeHandleAriaLabel')
    });
  }
  _toggleDirectionClass() {
    this.$element().toggleClass(HORIZONTAL_DIRECTION_CLASS, this._isHorizontalDirection());
    this.$element().toggleClass(VERTICAL_DIRECTION_CLASS, !this._isHorizontalDirection());
  }
  _render() {
    super._render();
    this._attachEventHandlers();
  }
  _resizeStartHandler(e) {
    this._getAction(RESIZE_EVENT.onResizeStart)({
      event: e
    });
  }
  _resizeHandler(e) {
    this._getAction(RESIZE_EVENT.onResize)({
      event: e
    });
  }
  _resizeEndHandler(e) {
    this._getAction(RESIZE_EVENT.onResizeEnd)({
      event: e
    });
  }
  _collapsePrevHandler(e) {
    this._getAction(COLLAPSE_EVENT.onCollapsePrev)({
      event: e
    });
  }
  _collapseNextHandler(e) {
    this._getAction(COLLAPSE_EVENT.onCollapseNext)({
      event: e
    });
  }
  _resizeBy(e) {
    var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      x: 0,
      y: 0
    };
    var {
      resizable
    } = this.option();
    if (resizable === false) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    e.offset = offset;
    this._resizeStartHandler(e);
    this._resizeHandler(e);
    this._resizeEndHandler(e);
  }
  _createEventAction(eventName) {
    var actionName = getActionNameByEventName(eventName);
    this[actionName] = this._createActionByOption(eventName, {
      excludeValidators: ['disabled', 'readOnly']
    });
  }
  _getAction(eventName) {
    var actionName = getActionNameByEventName(eventName);
    if (!this[actionName]) {
      this._createEventAction(eventName);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this[actionName];
  }
  _attachEventHandlers() {
    this._attachResizeEventHandlers();
    this._attachPointerEventHandlers();
  }
  _attachResizeEventHandlers() {
    var {
      resizable,
      direction
    } = this.option();
    if (resizable) {
      var eventData = {
        direction,
        immediate: true
      };
      eventsEngine.on(this.$element(), this.RESIZE_START_EVENT_NAME, eventData, this._resizeStartHandler.bind(this));
      eventsEngine.on(this.$element(), this.RESIZE_EVENT_NAME, eventData, this._resizeHandler.bind(this));
      eventsEngine.on(this.$element(), this.RESIZE_END_EVENT_NAME, eventData, this._resizeEndHandler.bind(this));
    }
  }
  _attachPointerEventHandlers() {
    var {
      showCollapsePrev,
      showCollapseNext
    } = this.option();
    if (showCollapsePrev === true || showCollapseNext === true) {
      eventsEngine.on(this.$element(), this.DOUBLE_CLICK_EVENT_NAME, this._doubleClickHandler.bind(this));
    }
    if (showCollapsePrev === true) {
      eventsEngine.on(this._$collapsePrevButton, this.CLICK_EVENT_NAME, this._collapsePrevHandler.bind(this));
    }
    if (showCollapseNext === true) {
      eventsEngine.on(this._$collapseNextButton, this.CLICK_EVENT_NAME, this._collapseNextHandler.bind(this));
    }
  }
  _detachEventHandlers() {
    this._detachResizeEventHandlers();
    this._detachPointerEventHandlers();
  }
  _detachResizeEventHandlers() {
    // @ts-expect-error todo: make optional parameters for eventsEngine
    eventsEngine.off(this.$element(), this.RESIZE_START_EVENT_NAME);
    // @ts-expect-error todo: make optional parameters for eventsEngine
    eventsEngine.off(this.$element(), this.RESIZE_EVENT_NAME);
    // @ts-expect-error todo: make optional parameters for eventsEngine
    eventsEngine.off(this.$element(), this.RESIZE_END_EVENT_NAME);
  }
  _detachPointerEventHandlers() {
    // @ts-expect-error todo: make optional parameters for eventsEngine
    eventsEngine.off(this.$element(), this.DOUBLE_CLICK_EVENT_NAME);
    // @ts-expect-error todo: make optional parameters for eventsEngine
    eventsEngine.off(this._$collapsePrevButton, this.CLICK_EVENT_NAME);
    // @ts-expect-error todo: make optional parameters for eventsEngine
    eventsEngine.off(this._$collapseNextButton, this.CLICK_EVENT_NAME);
  }
  _doubleClickHandler(e) {
    var {
      showCollapsePrev,
      showCollapseNext
    } = this.option();
    if (showCollapsePrev === true) {
      this._collapsePrevHandler(e);
    } else if (showCollapseNext === true) {
      this._collapseNextHandler(e);
    }
  }
  _isHorizontalDirection() {
    return this.option('direction') === RESIZE_DIRECTION.horizontal;
  }
  _clean() {
    this._detachResizeEventHandlers();
    this._detachPointerEventHandlers();
    super._clean();
  }
  _optionChanged(args) {
    var {
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
        super._optionChanged(args);
    }
  }
  getSize() {
    var {
      separatorSize
    } = this.option();
    if (this._isInactive()) {
      return INACTIVE_RESIZE_HANDLE_SIZE;
    }
    return Number.isFinite(separatorSize) && separatorSize >= 0 ? separatorSize : DEFAULT_RESIZE_HANDLE_SIZE;
  }
  isInactive() {
    return this._isInactive();
  }
}
export default ResizeHandle;
