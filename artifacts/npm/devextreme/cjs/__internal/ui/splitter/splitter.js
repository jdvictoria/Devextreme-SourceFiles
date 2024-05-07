/**
* DevExtreme (cjs/__internal/ui/splitter/splitter.js)
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
exports.default = void 0;
var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));
var _element = require("../../../core/element");
var _guid = _interopRequireDefault(require("../../../core/guid"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _resize_observer = _interopRequireDefault(require("../../../core/resize_observer"));
var _deferred = require("../../../core/utils/deferred");
var _extend = require("../../../core/utils/extend");
var _iterator = require("../../../core/utils/iterator");
var _size = require("../../../core/utils/size");
var _type = require("../../../core/utils/type");
var _window = require("../../../core/utils/window");
var _emitter = require("../../../events/core/emitter.feedback");
var _item = _interopRequireDefault(require("../../../ui/collection/item"));
var _uiCollection_widget = _interopRequireDefault(require("../../../ui/collection/ui.collection_widget.live_update"));
var _resize_handle = _interopRequireWildcard(require("./resize_handle"));
var _component = require("./utils/component");
var _event = require("./utils/event");
var _layout = require("./utils/layout");
var _layout_default = require("./utils/layout_default");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
const SPLITTER_CLASS = 'dx-splitter';
const SPLITTER_ITEM_CLASS = 'dx-splitter-item';
const SPLITTER_ITEM_HIDDEN_CONTENT_CLASS = 'dx-splitter-item-hidden-content';
const SPLITTER_ITEM_DATA_KEY = 'dxSplitterItemData';
const HORIZONTAL_ORIENTATION_CLASS = 'dx-splitter-horizontal';
const VERTICAL_ORIENTATION_CLASS = 'dx-splitter-vertical';
const INVISIBLE_STATE_CLASS = 'dx-state-invisible';
const DEFAULT_RESIZE_HANDLE_SIZE = 8;
const FLEX_PROPERTY = {
  flexGrow: 'flexGrow',
  flexShrink: 'flexShrink',
  flexBasis: 'flexBasis'
};
const DEFAULT_FLEX_SHRINK_PROP = 0;
const DEFAULT_FLEX_BASIS_PROP = 0;
const ORIENTATION = {
  horizontal: 'horizontal',
  vertical: 'vertical'
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let SplitterItem = /*#__PURE__*/function (_CollectionWidgetItem) {
  _inheritsLoose(SplitterItem, _CollectionWidgetItem);
  function SplitterItem($element, options, rawData) {
    options._id = "dx_".concat(new _guid.default());
    return _CollectionWidgetItem.call(this, $element, options, rawData) || this;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  var _proto = SplitterItem.prototype;
  _proto._render = function _render() {
    _CollectionWidgetItem.prototype._render.call(this);
  };
  _proto._renderResizeHandle = function _renderResizeHandle() {
    if (this.option.visible !== false && !this.isLast()) {
      this._setIdAttr();
      const config = this.owner._getResizeHandleConfig(this._options._id);
      this._options._resizeHandle = this.owner._createComponent((0, _renderer.default)('<div>'), _resize_handle.default, config);
      this.resizeHandle.$element().insertAfter(this._$element);
    }
  };
  _proto._setIdAttr = function _setIdAttr() {
    this._$element.attr('id', this._options._id);
  };
  _proto.isLast = function isLast() {
    return this.owner._isLastVisibleItem(this.index);
  };
  _createClass(SplitterItem, [{
    key: "owner",
    get: function () {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return this._options.owner;
    }
  }, {
    key: "resizeHandle",
    get: function () {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return this._options._resizeHandle;
    }
  }, {
    key: "option",
    get: function () {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return this._rawData;
    }
  }, {
    key: "index",
    get: function () {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return this.owner._getIndexByItemData(this.option);
    }
  }]);
  return SplitterItem;
}(_item.default); // eslint-disable-next-line @typescript-eslint/no-explicit-any
let Splitter = /*#__PURE__*/function (_CollectionWidget) {
  _inheritsLoose(Splitter, _CollectionWidget);
  function Splitter() {
    var _this;
    _this = _CollectionWidget.apply(this, arguments) || this;
    _this._renderQueue = [];
    return _this;
  }
  var _proto2 = Splitter.prototype;
  _proto2._getDefaultOptions = function _getDefaultOptions() {
    return (0, _extend.extend)(_CollectionWidget.prototype._getDefaultOptions.call(this), {
      orientation: ORIENTATION.horizontal,
      onItemCollapsed: null,
      onItemExpanded: null,
      onResize: null,
      onResizeEnd: null,
      onResizeStart: null,
      allowKeyboardNavigation: true,
      separatorSize: DEFAULT_RESIZE_HANDLE_SIZE,
      _itemAttributes: {
        role: 'group'
      },
      _renderQueue: undefined
    });
  }
  // eslint-disable-next-line class-methods-use-this
  ;
  _proto2._itemClass = function _itemClass() {
    return SPLITTER_ITEM_CLASS;
  }
  // eslint-disable-next-line class-methods-use-this
  ;
  _proto2._itemDataKey = function _itemDataKey() {
    return SPLITTER_ITEM_DATA_KEY;
  };
  _proto2._init = function _init() {
    _CollectionWidget.prototype._init.call(this);
    this._initializeRenderQueue();
  };
  _proto2._initializeRenderQueue = function _initializeRenderQueue() {
    this._renderQueue = this.option('_renderQueue') || [];
  };
  _proto2._isRenderQueueEmpty = function _isRenderQueueEmpty() {
    return this._renderQueue.length <= 0;
  };
  _proto2._pushItemToRenderQueue = function _pushItemToRenderQueue(itemContent, splitterConfig) {
    this._renderQueue.push({
      itemContent,
      splitterConfig
    });
  };
  _proto2._shiftItemFromQueue = function _shiftItemFromQueue() {
    return this._renderQueue.shift();
  };
  _proto2._initMarkup = function _initMarkup() {
    this.$element().addClass(SPLITTER_CLASS);
    this._toggleOrientationClass();
    _CollectionWidget.prototype._initMarkup.call(this);
    this._panesCacheSize = {};
    this._attachResizeObserverSubscription();
  };
  _proto2._getItemDimension = function _getItemDimension(element) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._isHorizontalOrientation() ? (0, _size.getOuterWidth)(element) : (0, _size.getOuterHeight)(element);
  };
  _proto2._render = function _render() {
    _CollectionWidget.prototype._render.call(this);
  };
  _proto2._attachResizeObserverSubscription = function _attachResizeObserverSubscription() {
    if ((0, _window.hasWindow)()) {
      const formRootElement = this.$element().get(0);
      _resize_observer.default.unobserve(formRootElement);
      _resize_observer.default.observe(formRootElement, () => {
        this._resizeHandler();
      });
    }
  }
  // eslint-disable-next-line class-methods-use-this
  ;
  _proto2._attachHoldEvent = function _attachHoldEvent() {};
  _proto2._resizeHandler = function _resizeHandler() {
    if (!this._shouldRecalculateLayout) {
      return;
    }
    this._layout = this._getDefaultLayoutBasedOnSize();
    this._applyStylesFromLayout(this._layout);
    this._updateItemSizes();
    this._shouldRecalculateLayout = false;
  };
  _proto2._renderItems = function _renderItems(items) {
    _CollectionWidget.prototype._renderItems.call(this, items);
    this._updateResizeHandlesResizableState();
    this._updateResizeHandlesCollapsibleState();
    if ((0, _layout.isElementVisible)(this.$element().get(0))) {
      this._layout = this._getDefaultLayoutBasedOnSize();
      this._applyStylesFromLayout(this._layout);
      this._updateItemSizes();
    } else {
      this._shouldRecalculateLayout = true;
    }
    this._processRenderQueue();
  };
  _proto2._processRenderQueue = function _processRenderQueue() {
    if (this._isRenderQueueEmpty()) {
      return;
    }
    const item = this._shiftItemFromQueue();
    if (!item) return;
    this._createComponent((0, _renderer.default)(item.itemContent), Splitter, (0, _extend.extend)({
      itemTemplate: this.option('itemTemplate'),
      onResize: this.option('onResize'),
      onResizeStart: this.option('onResizeStart'),
      onResizeEnd: this.option('onResizeEnd'),
      onItemClick: this.option('onItemClick'),
      onItemContextMenu: this.option('onItemContextMenu'),
      onItemRendered: this.option('onItemRendered'),
      onItemExpanded: this.option('onItemExpanded'),
      onItemCollapsed: this.option('onItemCollapsed'),
      separatorSize: this.option('separatorSize'),
      allowKeyboardNavigation: this.option('allowKeyboardNavigation'),
      rtlEnabled: this.option('rtlEnabled'),
      _renderQueue: this._renderQueue
    }, item.splitterConfig));
    this._processRenderQueue();
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;
  _proto2._itemElements = function _itemElements() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._itemContainer().children(this._itemSelector());
  };
  _proto2._isLastVisibleItem = function _isLastVisibleItem(index) {
    return index === (0, _layout.findLastIndexOfVisibleItem)(this.option('items'));
  };
  _proto2._renderItem = function _renderItem(index, itemData, $container, $itemToReplace) {
    const $itemFrame = _CollectionWidget.prototype._renderItem.call(this, index, itemData, $container, $itemToReplace);
    const itemElement = $itemFrame.get(0);
    (0, _layout.setFlexProp)(itemElement, FLEX_PROPERTY.flexGrow, 100 / this.option('items').length);
    (0, _layout.setFlexProp)(itemElement, FLEX_PROPERTY.flexShrink, DEFAULT_FLEX_SHRINK_PROP);
    (0, _layout.setFlexProp)(itemElement, FLEX_PROPERTY.flexBasis, DEFAULT_FLEX_BASIS_PROP);
    this._getItemInstance($itemFrame)._renderResizeHandle();
    return $itemFrame;
  };
  _proto2._getItemInstance = function _getItemInstance($item) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return Splitter.ItemClass.getInstance($item);
  };
  _proto2._renderResizeHandle = function _renderResizeHandle($itemFrame) {
    const {
      resizeHandle
    } = this._getItemInstance($itemFrame);
    if (resizeHandle) {
      this.$element().append(resizeHandle.$element());
    }
  };
  _proto2._updateResizeHandlesResizableState = function _updateResizeHandlesResizableState() {
    this._getResizeHandles().forEach(resizeHandle => {
      const $resizeHandle = resizeHandle.$element();
      const $leftItem = this._getResizeHandleLeftItem($resizeHandle);
      const $rightItem = this._getResizeHandleRightItem($resizeHandle);
      const leftItemData = this._getItemData($leftItem);
      const rightItemData = this._getItemData($rightItem);
      const resizable = leftItemData.resizable !== false && rightItemData.resizable !== false && leftItemData.collapsed !== true && rightItemData.collapsed !== true;
      resizeHandle.option('resizable', resizable);
      resizeHandle.option('disabled', resizeHandle.isInactive());
    });
  };
  _proto2._updateResizeHandlesCollapsibleState = function _updateResizeHandlesCollapsibleState() {
    this._getResizeHandles().forEach(resizeHandle => {
      const $resizeHandle = resizeHandle.$element();
      const $leftItem = this._getResizeHandleLeftItem($resizeHandle);
      const $rightItem = this._getResizeHandleRightItem($resizeHandle);
      const leftItemData = this._getItemData($leftItem);
      const rightItemData = this._getItemData($rightItem);
      const showCollapsePrev = rightItemData.collapsed === true ? rightItemData.collapsible === true && leftItemData.collapsed !== true : leftItemData.collapsible === true && leftItemData.collapsed !== true;
      const showCollapseNext = leftItemData.collapsed === true ? leftItemData.collapsible === true : rightItemData.collapsible === true && rightItemData.collapsed !== true;
      resizeHandle.option({
        showCollapsePrev,
        showCollapseNext
      });
      resizeHandle.option('disabled', resizeHandle.isInactive());
    });
  };
  _proto2._updateNestedSplitterOption = function _updateNestedSplitterOption(optionName, optionValue) {
    const {
      items
    } = this.option();
    items.forEach(item => {
      if (item === null || item === void 0 ? void 0 : item.splitter) {
        const $nestedSplitter = this._findItemElementByItem(item).find(".".concat(SPLITTER_CLASS)).eq(0);
        if ($nestedSplitter.length) {
          (0, _component.getComponentInstance)($nestedSplitter).option(optionName, optionValue);
        }
      }
    });
  };
  _proto2._updateResizeHandlesOption = function _updateResizeHandlesOption(optionName, optionValue) {
    this._getResizeHandles().forEach(resizeHandle => {
      resizeHandle.option(optionName, optionValue);
    });
  };
  _proto2._getNextVisibleItemData = function _getNextVisibleItemData(index) {
    const {
      items
    } = this.option();
    return this._getItemDataByIndex((0, _layout.findIndexOfNextVisibleItem)(items, index));
  };
  _proto2._getItemDataByIndex = function _getItemDataByIndex(index) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._editStrategy.getItemDataByIndex(index);
  };
  _proto2._createEventAction = function _createEventAction(eventName) {
    const actionName = (0, _event.getActionNameByEventName)(eventName);
    this[actionName] = this._createActionByOption(eventName, {
      excludeValidators: ['disabled', 'readOnly']
    });
  };
  _proto2._getAction = function _getAction(eventName) {
    const actionName = (0, _event.getActionNameByEventName)(eventName);
    if (!this[actionName]) {
      this._createEventAction(eventName);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this[actionName];
  };
  _proto2._getResizeHandleConfig = function _getResizeHandleConfig(paneId) {
    const {
      orientation,
      rtlEnabled,
      allowKeyboardNavigation,
      separatorSize
    } = this.option();
    return {
      direction: orientation,
      focusStateEnabled: allowKeyboardNavigation,
      hoverStateEnabled: true,
      separatorSize,
      elementAttr: {
        'aria-controls': paneId
      },
      onCollapsePrev: e => {
        var _a;
        (_a = e.event) === null || _a === void 0 ? void 0 : _a.stopPropagation();
        const $resizeHandle = (0, _renderer.default)(e.element);
        const $leftItem = this._getResizeHandleLeftItem($resizeHandle);
        const leftItemData = this._getItemData($leftItem);
        const leftItemIndex = this._getIndexByItem(leftItemData);
        const $rightItem = this._getResizeHandleRightItem($resizeHandle);
        const rightItemData = this._getItemData($rightItem);
        const rightItemIndex = this._getIndexByItem(rightItemData);
        const isRightItemCollapsed = rightItemData.collapsed === true;
        this._activeResizeHandleIndex = leftItemIndex;
        this._collapseButton = 'prev';
        if (isRightItemCollapsed) {
          this._collapsedItemSize = this._panesCacheSize[rightItemIndex];
          if (!this._collapsedItemSize) {
            for (let i = leftItemIndex; i >= 0; i -= 1) {
              // eslint-disable-next-line max-depth
              if (this.option('items')[i].collapsed !== true) {
                this._collapsedItemSize = this._layout[i] / 2;
              }
            }
          }
          this._panesCacheSize[rightItemIndex] = undefined;
          this._updateItemData('collapsed', rightItemIndex, false, false);
          this._getAction(_event.ITEM_EXPANDED_EVENT)({
            event: e.event,
            itemData: rightItemData,
            itemElement: (0, _element.getPublicElement)($rightItem),
            itemIndex: rightItemIndex
          });
          return;
        }
        this._panesCacheSize[leftItemIndex] = this._layout[leftItemIndex];
        this._collapsedItemSize = this._layout[leftItemIndex];
        this._updateItemData('collapsed', leftItemIndex, true, false);
        this._getAction(_event.ITEM_COLLAPSED_EVENT)({
          event: e.event,
          itemData: leftItemData,
          itemElement: (0, _element.getPublicElement)($leftItem),
          itemIndex: leftItemIndex
        });
      },
      onCollapseNext: e => {
        var _a;
        (_a = e.event) === null || _a === void 0 ? void 0 : _a.stopPropagation();
        const $resizeHandle = (0, _renderer.default)(e.element);
        const $leftItem = this._getResizeHandleLeftItem($resizeHandle);
        const leftItemData = this._getItemData($leftItem);
        const leftItemIndex = this._getIndexByItem(leftItemData);
        const $rightItem = this._getResizeHandleRightItem($resizeHandle);
        const rightItemData = this._getItemData($rightItem);
        const rightItemIndex = this._getIndexByItem(rightItemData);
        const isLeftItemCollapsed = leftItemData.collapsed === true;
        this._activeResizeHandleIndex = leftItemIndex;
        this._collapseButton = 'next';
        if (isLeftItemCollapsed) {
          this._collapsedItemSize = this._panesCacheSize[leftItemIndex];
          if (!this._collapsedItemSize) {
            for (let i = rightItemIndex; i <= this.option('items').length - 1; i += 1) {
              // eslint-disable-next-line max-depth
              if (this.option('items')[i].collapsed !== true) {
                this._collapsedItemSize = this._layout[i] / 2;
              }
            }
          }
          this._panesCacheSize[leftItemIndex] = undefined;
          this._updateItemData('collapsed', leftItemIndex, false, false);
          this._getAction(_event.ITEM_EXPANDED_EVENT)({
            event: e.event,
            itemData: leftItemData,
            itemElement: (0, _element.getPublicElement)($leftItem),
            itemIndex: leftItemIndex
          });
          return;
        }
        this._panesCacheSize[rightItemIndex] = this._layout[rightItemIndex];
        this._collapsedItemSize = this._layout[rightItemIndex];
        this._updateItemData('collapsed', rightItemIndex, true, false);
        this._getAction(_event.ITEM_COLLAPSED_EVENT)({
          event: e.event,
          itemData: rightItemData,
          itemElement: (0, _element.getPublicElement)($rightItem),
          itemIndex: rightItemIndex
        });
      },
      onResizeStart: e => {
        const {
          element,
          event
        } = e;
        if (!event) {
          return;
        }
        const $resizeHandle = (0, _renderer.default)(element);
        const resizeStartEventsArgs = this._getResizeStartEventArgs(event, (0, _element.getPublicElement)($resizeHandle));
        this._getAction(_event.RESIZE_EVENT.onResizeStart)(resizeStartEventsArgs);
        if (resizeStartEventsArgs.cancel) {
          // @ts-expect-error ts-error
          event.cancel = true;
          return;
        }
        // @ts-expect-error ts-error
        this._feedbackDeferred = new _deferred.Deferred();
        (0, _emitter.lock)(this._feedbackDeferred);
        this._toggleActiveState($resizeHandle, true);
        const $leftItem = this._getResizeHandleLeftItem($resizeHandle);
        const leftItemData = this._getItemData($leftItem);
        const leftItemIndex = this._getIndexByItem(leftItemData);
        this._activeResizeHandleIndex = leftItemIndex;
        this._currentOnePxRatio = (0, _layout.convertSizeToRatio)(1, (0, _layout.getElementSize)(this.$element(), orientation), this._getResizeHandlesSize());
        this._currentLayout = this._layout;
        this._updateItemsRestrictions(this.option('items'));
      },
      onResize: e => {
        const {
          element,
          event
        } = e;
        if (!event) {
          return;
        }
        const resizeEventsArgs = this._getResizeEventArgs(event, (0, _element.getPublicElement)((0, _renderer.default)(element)));
        this._getAction(_event.RESIZE_EVENT.onResize)(resizeEventsArgs);
        if (resizeEventsArgs.cancel) {
          // @ts-expect-error ts-error
          event.cancel = true;
          return;
        }
        const newLayout = (0, _layout.getNextLayout)(this._currentLayout,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (0, _layout.calculateDelta)(event.offset, this.option('orientation'), rtlEnabled, this._currentOnePxRatio), this._activeResizeHandleIndex, this._itemRestrictions);
        this._applyStylesFromLayout(newLayout);
        this._layout = newLayout;
      },
      onResizeEnd: e => {
        const {
          element,
          event
        } = e;
        if (!event) {
          return;
        }
        const $resizeHandle = (0, _renderer.default)(element);
        const resizeEndEventsArgs = this._getResizeEndEventArgs(event, (0, _element.getPublicElement)($resizeHandle));
        this._getAction(_event.RESIZE_EVENT.onResizeEnd)(resizeEndEventsArgs);
        if (resizeEndEventsArgs.cancel) {
          // @ts-expect-error ts-error
          event.cancel = true;
          return;
        }
        this._feedbackDeferred.resolve();
        this._toggleActiveState($resizeHandle, false);
        this._updateItemSizes();
      }
    };
  }
  // eslint-disable-next-line class-methods-use-this
  ;
  _proto2._getResizeStartEventArgs = function _getResizeStartEventArgs(event, handleElement) {
    return {
      event,
      handleElement
    };
  }
  // eslint-disable-next-line class-methods-use-this
  ;
  _proto2._getResizeEventArgs = function _getResizeEventArgs(event, handleElement) {
    return {
      event,
      handleElement
    };
  }
  // eslint-disable-next-line class-methods-use-this
  ;
  _proto2._getResizeEndEventArgs = function _getResizeEndEventArgs(event, handleElement) {
    return {
      event,
      handleElement
    };
  }
  // eslint-disable-next-line class-methods-use-this
  ;
  _proto2._getResizeHandleLeftItem = function _getResizeHandleLeftItem($resizeHandle) {
    let $leftItem = $resizeHandle.prev();
    while ($leftItem.hasClass(INVISIBLE_STATE_CLASS)) {
      $leftItem = $leftItem.prev();
    }
    return $leftItem;
  }
  // eslint-disable-next-line class-methods-use-this
  ;
  _proto2._getResizeHandleRightItem = function _getResizeHandleRightItem($resizeHandle) {
    // @ts-expect-error renderer d.ts issue
    let $rightItem = $resizeHandle.next();
    while ($rightItem.hasClass(INVISIBLE_STATE_CLASS)) {
      // @ts-expect-error renderer d.ts issue
      $rightItem = $rightItem.next();
    }
    return $rightItem;
  };
  _proto2._getResizeHandlesSize = function _getResizeHandlesSize() {
    return this._getResizeHandles().reduce((size, resizeHandle) => size + resizeHandle.getSize(), 0);
  };
  _proto2._renderItemContent = function _renderItemContent(args) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return _CollectionWidget.prototype._renderItemContent.call(this, args);
  };
  _proto2._createItemByTemplate = function _createItemByTemplate(
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  itemTemplate,
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  args) {
    const {
      itemData
    } = args;
    if (itemData.splitter) {
      return itemTemplate.source ? itemTemplate.source()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      : (0, _renderer.default)();
    }
    return _CollectionWidget.prototype._createItemByTemplate.call(this, itemTemplate, args);
  };
  _proto2._postprocessRenderItem = function _postprocessRenderItem(args) {
    const splitterConfig = args.itemData.splitter;
    if (!splitterConfig) {
      return;
    }
    this._pushItemToRenderQueue(args.itemContent, splitterConfig);
  };
  _proto2._isHorizontalOrientation = function _isHorizontalOrientation() {
    return this.option('orientation') === ORIENTATION.horizontal;
  };
  _proto2._toggleOrientationClass = function _toggleOrientationClass() {
    this.$element().toggleClass(HORIZONTAL_ORIENTATION_CLASS, this._isHorizontalOrientation());
    this.$element().toggleClass(VERTICAL_ORIENTATION_CLASS, !this._isHorizontalOrientation());
  };
  _proto2._itemOptionChanged = function _itemOptionChanged(item, property, value) {
    switch (property) {
      case 'size':
      case 'maxSize':
      case 'minSize':
      case 'collapsedSize':
        this._layout = this._getDefaultLayoutBasedOnSize();
        this._applyStylesFromLayout(this._layout);
        this._updateItemSizes();
        break;
      case 'collapsed':
        this._itemCollapsedOptionChanged(item);
        break;
      case 'resizable':
        this._updateResizeHandlesResizableState();
        break;
      case 'collapsible':
        this._updateResizeHandlesCollapsibleState();
        break;
      case 'visible':
        this._invalidate();
        break;
      default:
        _CollectionWidget.prototype._itemOptionChanged.call(this, item, property, value);
    }
  };
  _proto2._itemCollapsedOptionChanged = function _itemCollapsedOptionChanged(item) {
    this._updateItemsRestrictions(this.option('items'), true);
    this._updateResizeHandlesResizableState();
    this._updateResizeHandlesCollapsibleState();
    if ((0, _type.isDefined)(this._collapsedItemSize)) {
      this._layout = (0, _layout.getNextLayout)(this._layout, this._getCollapseDelta(item), this._activeResizeHandleIndex, this._itemRestrictions, true);
    } else {
      this._layout = this._getDefaultLayoutBasedOnSize();
    }
    this._collapseButton = undefined;
    this._collapsedItemSize = undefined;
    this._applyStylesFromLayout(this._layout);
    this._updateItemSizes();
  };
  _proto2._getCollapseDelta = function _getCollapseDelta(item) {
    const itemIndex = this._getIndexByItem(item);
    const {
      collapsedSize = 0,
      minSize = 0
    } = this._itemRestrictions[itemIndex];
    const itemSize = this._collapsedItemSize !== undefined && this._collapsedItemSize >= minSize ? this._collapsedItemSize : minSize;
    const deltaSign = this._collapseButton === 'prev' ? -1 : 1;
    const delta = Math.abs(itemSize - collapsedSize) * deltaSign;
    return delta;
  };
  _proto2._getDefaultLayoutBasedOnSize = function _getDefaultLayoutBasedOnSize() {
    const {
      items
    } = this.option();
    this._updateItemsRestrictions(items);
    return (0, _layout_default.getDefaultLayout)(this._itemRestrictions);
  };
  _proto2._updateItemsRestrictions = function _updateItemsRestrictions(items) {
    let collapseStateRestrictions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    const {
      orientation
    } = this.option();
    const handlesSizeSum = this._getResizeHandlesSize();
    const elementSize = (0, _layout.getElementSize)(this.$element(), orientation);
    this._itemRestrictions = [];
    items.forEach(item => {
      this._itemRestrictions.push({
        resizable: collapseStateRestrictions ? undefined : item.resizable !== false,
        visible: item.visible !== false,
        collapsed: item.collapsed === true,
        collapsedSize: (0, _layout.convertSizeToRatio)(item.collapsedSize, elementSize, handlesSizeSum),
        size: (0, _layout.convertSizeToRatio)(item.size, elementSize, handlesSizeSum),
        maxSize: collapseStateRestrictions ? undefined : (0, _layout.convertSizeToRatio)(item.maxSize, elementSize, handlesSizeSum),
        minSize: (0, _layout.convertSizeToRatio)(item.minSize, elementSize, handlesSizeSum)
      });
    });
  };
  _proto2._applyStylesFromLayout = function _applyStylesFromLayout(layout) {
    this._iterateItems((index, itemElement) => {
      (0, _layout.setFlexProp)(itemElement, FLEX_PROPERTY.flexGrow, layout[index]);
      const itemData = this._getItemData(itemElement);
      const shouldHideContent = layout[index] === 0 && itemData.visible !== false;
      (0, _renderer.default)(itemElement).toggleClass(SPLITTER_ITEM_HIDDEN_CONTENT_CLASS, shouldHideContent);
    });
  };
  _proto2._updateItemSizes = function _updateItemSizes() {
    this._iterateItems((index, itemElement) => {
      this._updateItemData('size', index, this._getItemDimension(itemElement));
    });
  };
  _proto2._updateItemData = function _updateItemData(prop, itemIndex, value) {
    let silent = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    const itemPath = "items[".concat(itemIndex, "]");
    const itemData = this.option(itemPath);
    if ((0, _type.isObject)(itemData)) {
      this._updateItemOption("".concat(itemPath, ".").concat(prop), value, silent);
    } else {
      this._updateItemOption(itemPath, {
        text: itemData,
        [prop]: value
      }, silent);
    }
  };
  _proto2._updateItemOption = function _updateItemOption(path, value) {
    let silent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    if (silent) {
      this._options.silent(path, value);
    } else {
      this.option(path, value);
    }
  };
  _proto2._iterateItems = function _iterateItems(callback) {
    (0, _iterator.each)(this._itemElements(), (index, itemElement) => {
      callback(index, itemElement);
    });
  };
  _proto2._getResizeHandles = function _getResizeHandles() {
    const handles = [];
    this._iterateItems((index, itemElement) => {
      const instance = this._getItemInstance((0, _renderer.default)(itemElement));
      if (instance.resizeHandle) {
        handles.push(instance.resizeHandle);
      }
    });
    return handles;
  };
  _proto2._getResizeHandleItems = function _getResizeHandleItems() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.$element().children(".".concat(_resize_handle.RESIZE_HANDLE_CLASS));
  };
  _proto2._iterateResizeHandles = function _iterateResizeHandles(callback) {
    this._getResizeHandleItems().each((index, element) => {
      callback((0, _component.getComponentInstance)((0, _renderer.default)(element)));
      return true;
    });
  };
  _proto2._dimensionChanged = function _dimensionChanged() {
    this._layout = this._getDefaultLayoutBasedOnSize();
    this._applyStylesFromLayout(this._layout);
    this._updateItemSizes();
  };
  _proto2._optionChanged = function _optionChanged(args) {
    const {
      name,
      value
    } = args;
    switch (name) {
      case 'width':
      case 'height':
        _CollectionWidget.prototype._optionChanged.call(this, args);
        this._dimensionChanged();
        break;
      case 'allowKeyboardNavigation':
        this._iterateResizeHandles(instance => {
          instance.option('focusStateEnabled', value);
        });
        this._updateNestedSplitterOption(name, value);
        break;
      case 'orientation':
        this._toggleOrientationClass();
        this._updateResizeHandlesOption('direction', value);
        break;
      case 'onResizeStart':
      case 'onResizeEnd':
      case 'onResize':
      case 'onItemCollapsed':
      case 'onItemExpanded':
        this._createEventAction(name);
        this._updateNestedSplitterOption(name, value);
        break;
      case 'separatorSize':
        this._updateResizeHandlesOption(name, value);
        this._updateNestedSplitterOption(name, value);
        break;
      default:
        _CollectionWidget.prototype._optionChanged.call(this, args);
    }
  };
  _proto2.registerKeyHandler = function registerKeyHandler(key, handler) {
    this.$element().find(".".concat(_resize_handle.RESIZE_HANDLE_CLASS)).each((index, element) => {
      (0, _component.getComponentInstance)((0, _renderer.default)(element)).registerKeyHandler(key, handler);
      return true;
    });
  };
  return Splitter;
}(_uiCollection_widget.default);
Splitter.ItemClass = SplitterItem;
// @ts-expect-error // temp fix
(0, _component_registrator.default)('dxSplitter', Splitter);
var _default = exports.default = Splitter;
