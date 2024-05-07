import registerComponent from '../../../core/component_registrator';
import { getPublicElement } from '../../../core/element';
import Guid from '../../../core/guid';
import $ from '../../../core/renderer';
import resizeObserverSingleton from '../../../core/resize_observer';
import { Deferred } from '../../../core/utils/deferred';
import { extend } from '../../../core/utils/extend';
import { each } from '../../../core/utils/iterator';
import { getOuterHeight, getOuterWidth } from '../../../core/utils/size';
import { isDefined, isObject } from '../../../core/utils/type';
import { hasWindow } from '../../../core/utils/window';
import { lock } from '../../../events/core/emitter.feedback';
import CollectionWidgetItem from '../../../ui/collection/item';
import CollectionWidget from '../../../ui/collection/ui.collection_widget.live_update';
import ResizeHandle, { RESIZE_HANDLE_CLASS } from './resize_handle';
import { getComponentInstance } from './utils/component';
import { getActionNameByEventName, ITEM_COLLAPSED_EVENT, ITEM_EXPANDED_EVENT, RESIZE_EVENT } from './utils/event';
import { calculateDelta, convertSizeToRatio, findIndexOfNextVisibleItem, findLastIndexOfVisibleItem, getElementSize, getNextLayout, isElementVisible, setFlexProp } from './utils/layout';
import { getDefaultLayout } from './utils/layout_default';
var SPLITTER_CLASS = 'dx-splitter';
var SPLITTER_ITEM_CLASS = 'dx-splitter-item';
var SPLITTER_ITEM_HIDDEN_CONTENT_CLASS = 'dx-splitter-item-hidden-content';
var SPLITTER_ITEM_DATA_KEY = 'dxSplitterItemData';
var HORIZONTAL_ORIENTATION_CLASS = 'dx-splitter-horizontal';
var VERTICAL_ORIENTATION_CLASS = 'dx-splitter-vertical';
var INVISIBLE_STATE_CLASS = 'dx-state-invisible';
var DEFAULT_RESIZE_HANDLE_SIZE = 8;
var FLEX_PROPERTY = {
  flexGrow: 'flexGrow',
  flexShrink: 'flexShrink',
  flexBasis: 'flexBasis'
};
var DEFAULT_FLEX_SHRINK_PROP = 0;
var DEFAULT_FLEX_BASIS_PROP = 0;
var ORIENTATION = {
  horizontal: 'horizontal',
  vertical: 'vertical'
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
class SplitterItem extends CollectionWidgetItem {
  constructor($element, options, rawData) {
    options._id = "dx_".concat(new Guid());
    super($element, options, rawData);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get owner() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._options.owner;
  }
  get resizeHandle() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._options._resizeHandle;
  }
  get option() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._rawData;
  }
  get index() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.owner._getIndexByItemData(this.option);
  }
  _render() {
    super._render();
  }
  _renderResizeHandle() {
    if (this.option.visible !== false && !this.isLast()) {
      this._setIdAttr();
      var config = this.owner._getResizeHandleConfig(this._options._id);
      this._options._resizeHandle = this.owner._createComponent($('<div>'), ResizeHandle, config);
      this.resizeHandle.$element().insertAfter(this._$element);
    }
  }
  _setIdAttr() {
    this._$element.attr('id', this._options._id);
  }
  isLast() {
    return this.owner._isLastVisibleItem(this.index);
  }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
class Splitter extends CollectionWidget {
  constructor() {
    super(...arguments);
    this._renderQueue = [];
  }
  _getDefaultOptions() {
    return extend(super._getDefaultOptions(), {
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
  _itemClass() {
    return SPLITTER_ITEM_CLASS;
  }
  // eslint-disable-next-line class-methods-use-this
  _itemDataKey() {
    return SPLITTER_ITEM_DATA_KEY;
  }
  _init() {
    super._init();
    this._initializeRenderQueue();
  }
  _initializeRenderQueue() {
    this._renderQueue = this.option('_renderQueue') || [];
  }
  _isRenderQueueEmpty() {
    return this._renderQueue.length <= 0;
  }
  _pushItemToRenderQueue(itemContent, splitterConfig) {
    this._renderQueue.push({
      itemContent,
      splitterConfig
    });
  }
  _shiftItemFromQueue() {
    return this._renderQueue.shift();
  }
  _initMarkup() {
    this.$element().addClass(SPLITTER_CLASS);
    this._toggleOrientationClass();
    super._initMarkup();
    this._panesCacheSize = {};
    this._attachResizeObserverSubscription();
  }
  _getItemDimension(element) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._isHorizontalOrientation() ? getOuterWidth(element) : getOuterHeight(element);
  }
  _render() {
    super._render();
  }
  _attachResizeObserverSubscription() {
    if (hasWindow()) {
      var formRootElement = this.$element().get(0);
      resizeObserverSingleton.unobserve(formRootElement);
      resizeObserverSingleton.observe(formRootElement, () => {
        this._resizeHandler();
      });
    }
  }
  // eslint-disable-next-line class-methods-use-this
  _attachHoldEvent() {}
  _resizeHandler() {
    if (!this._shouldRecalculateLayout) {
      return;
    }
    this._layout = this._getDefaultLayoutBasedOnSize();
    this._applyStylesFromLayout(this._layout);
    this._updateItemSizes();
    this._shouldRecalculateLayout = false;
  }
  _renderItems(items) {
    super._renderItems(items);
    this._updateResizeHandlesResizableState();
    this._updateResizeHandlesCollapsibleState();
    if (isElementVisible(this.$element().get(0))) {
      this._layout = this._getDefaultLayoutBasedOnSize();
      this._applyStylesFromLayout(this._layout);
      this._updateItemSizes();
    } else {
      this._shouldRecalculateLayout = true;
    }
    this._processRenderQueue();
  }
  _processRenderQueue() {
    if (this._isRenderQueueEmpty()) {
      return;
    }
    var item = this._shiftItemFromQueue();
    if (!item) return;
    this._createComponent($(item.itemContent), Splitter, extend({
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
  _itemElements() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._itemContainer().children(this._itemSelector());
  }
  _isLastVisibleItem(index) {
    return index === findLastIndexOfVisibleItem(this.option('items'));
  }
  _renderItem(index, itemData, $container, $itemToReplace) {
    var $itemFrame = super._renderItem(index, itemData, $container, $itemToReplace);
    var itemElement = $itemFrame.get(0);
    setFlexProp(itemElement, FLEX_PROPERTY.flexGrow, 100 / this.option('items').length);
    setFlexProp(itemElement, FLEX_PROPERTY.flexShrink, DEFAULT_FLEX_SHRINK_PROP);
    setFlexProp(itemElement, FLEX_PROPERTY.flexBasis, DEFAULT_FLEX_BASIS_PROP);
    this._getItemInstance($itemFrame)._renderResizeHandle();
    return $itemFrame;
  }
  _getItemInstance($item) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return Splitter.ItemClass.getInstance($item);
  }
  _renderResizeHandle($itemFrame) {
    var {
      resizeHandle
    } = this._getItemInstance($itemFrame);
    if (resizeHandle) {
      this.$element().append(resizeHandle.$element());
    }
  }
  _updateResizeHandlesResizableState() {
    this._getResizeHandles().forEach(resizeHandle => {
      var $resizeHandle = resizeHandle.$element();
      var $leftItem = this._getResizeHandleLeftItem($resizeHandle);
      var $rightItem = this._getResizeHandleRightItem($resizeHandle);
      var leftItemData = this._getItemData($leftItem);
      var rightItemData = this._getItemData($rightItem);
      var resizable = leftItemData.resizable !== false && rightItemData.resizable !== false && leftItemData.collapsed !== true && rightItemData.collapsed !== true;
      resizeHandle.option('resizable', resizable);
      resizeHandle.option('disabled', resizeHandle.isInactive());
    });
  }
  _updateResizeHandlesCollapsibleState() {
    this._getResizeHandles().forEach(resizeHandle => {
      var $resizeHandle = resizeHandle.$element();
      var $leftItem = this._getResizeHandleLeftItem($resizeHandle);
      var $rightItem = this._getResizeHandleRightItem($resizeHandle);
      var leftItemData = this._getItemData($leftItem);
      var rightItemData = this._getItemData($rightItem);
      var showCollapsePrev = rightItemData.collapsed === true ? rightItemData.collapsible === true && leftItemData.collapsed !== true : leftItemData.collapsible === true && leftItemData.collapsed !== true;
      var showCollapseNext = leftItemData.collapsed === true ? leftItemData.collapsible === true : rightItemData.collapsible === true && rightItemData.collapsed !== true;
      resizeHandle.option({
        showCollapsePrev,
        showCollapseNext
      });
      resizeHandle.option('disabled', resizeHandle.isInactive());
    });
  }
  _updateNestedSplitterOption(optionName, optionValue) {
    var {
      items
    } = this.option();
    items.forEach(item => {
      if (item === null || item === void 0 ? void 0 : item.splitter) {
        var $nestedSplitter = this._findItemElementByItem(item).find(".".concat(SPLITTER_CLASS)).eq(0);
        if ($nestedSplitter.length) {
          getComponentInstance($nestedSplitter).option(optionName, optionValue);
        }
      }
    });
  }
  _updateResizeHandlesOption(optionName, optionValue) {
    this._getResizeHandles().forEach(resizeHandle => {
      resizeHandle.option(optionName, optionValue);
    });
  }
  _getNextVisibleItemData(index) {
    var {
      items
    } = this.option();
    return this._getItemDataByIndex(findIndexOfNextVisibleItem(items, index));
  }
  _getItemDataByIndex(index) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._editStrategy.getItemDataByIndex(index);
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
  _getResizeHandleConfig(paneId) {
    var {
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
        var $resizeHandle = $(e.element);
        var $leftItem = this._getResizeHandleLeftItem($resizeHandle);
        var leftItemData = this._getItemData($leftItem);
        var leftItemIndex = this._getIndexByItem(leftItemData);
        var $rightItem = this._getResizeHandleRightItem($resizeHandle);
        var rightItemData = this._getItemData($rightItem);
        var rightItemIndex = this._getIndexByItem(rightItemData);
        var isRightItemCollapsed = rightItemData.collapsed === true;
        this._activeResizeHandleIndex = leftItemIndex;
        this._collapseButton = 'prev';
        if (isRightItemCollapsed) {
          this._collapsedItemSize = this._panesCacheSize[rightItemIndex];
          if (!this._collapsedItemSize) {
            for (var i = leftItemIndex; i >= 0; i -= 1) {
              // eslint-disable-next-line max-depth
              if (this.option('items')[i].collapsed !== true) {
                this._collapsedItemSize = this._layout[i] / 2;
              }
            }
          }
          this._panesCacheSize[rightItemIndex] = undefined;
          this._updateItemData('collapsed', rightItemIndex, false, false);
          this._getAction(ITEM_EXPANDED_EVENT)({
            event: e.event,
            itemData: rightItemData,
            itemElement: getPublicElement($rightItem),
            itemIndex: rightItemIndex
          });
          return;
        }
        this._panesCacheSize[leftItemIndex] = this._layout[leftItemIndex];
        this._collapsedItemSize = this._layout[leftItemIndex];
        this._updateItemData('collapsed', leftItemIndex, true, false);
        this._getAction(ITEM_COLLAPSED_EVENT)({
          event: e.event,
          itemData: leftItemData,
          itemElement: getPublicElement($leftItem),
          itemIndex: leftItemIndex
        });
      },
      onCollapseNext: e => {
        var _a;
        (_a = e.event) === null || _a === void 0 ? void 0 : _a.stopPropagation();
        var $resizeHandle = $(e.element);
        var $leftItem = this._getResizeHandleLeftItem($resizeHandle);
        var leftItemData = this._getItemData($leftItem);
        var leftItemIndex = this._getIndexByItem(leftItemData);
        var $rightItem = this._getResizeHandleRightItem($resizeHandle);
        var rightItemData = this._getItemData($rightItem);
        var rightItemIndex = this._getIndexByItem(rightItemData);
        var isLeftItemCollapsed = leftItemData.collapsed === true;
        this._activeResizeHandleIndex = leftItemIndex;
        this._collapseButton = 'next';
        if (isLeftItemCollapsed) {
          this._collapsedItemSize = this._panesCacheSize[leftItemIndex];
          if (!this._collapsedItemSize) {
            for (var i = rightItemIndex; i <= this.option('items').length - 1; i += 1) {
              // eslint-disable-next-line max-depth
              if (this.option('items')[i].collapsed !== true) {
                this._collapsedItemSize = this._layout[i] / 2;
              }
            }
          }
          this._panesCacheSize[leftItemIndex] = undefined;
          this._updateItemData('collapsed', leftItemIndex, false, false);
          this._getAction(ITEM_EXPANDED_EVENT)({
            event: e.event,
            itemData: leftItemData,
            itemElement: getPublicElement($leftItem),
            itemIndex: leftItemIndex
          });
          return;
        }
        this._panesCacheSize[rightItemIndex] = this._layout[rightItemIndex];
        this._collapsedItemSize = this._layout[rightItemIndex];
        this._updateItemData('collapsed', rightItemIndex, true, false);
        this._getAction(ITEM_COLLAPSED_EVENT)({
          event: e.event,
          itemData: rightItemData,
          itemElement: getPublicElement($rightItem),
          itemIndex: rightItemIndex
        });
      },
      onResizeStart: e => {
        var {
          element,
          event
        } = e;
        if (!event) {
          return;
        }
        var $resizeHandle = $(element);
        var resizeStartEventsArgs = this._getResizeStartEventArgs(event, getPublicElement($resizeHandle));
        this._getAction(RESIZE_EVENT.onResizeStart)(resizeStartEventsArgs);
        if (resizeStartEventsArgs.cancel) {
          // @ts-expect-error ts-error
          event.cancel = true;
          return;
        }
        // @ts-expect-error ts-error
        this._feedbackDeferred = new Deferred();
        lock(this._feedbackDeferred);
        this._toggleActiveState($resizeHandle, true);
        var $leftItem = this._getResizeHandleLeftItem($resizeHandle);
        var leftItemData = this._getItemData($leftItem);
        var leftItemIndex = this._getIndexByItem(leftItemData);
        this._activeResizeHandleIndex = leftItemIndex;
        this._currentOnePxRatio = convertSizeToRatio(1, getElementSize(this.$element(), orientation), this._getResizeHandlesSize());
        this._currentLayout = this._layout;
        this._updateItemsRestrictions(this.option('items'));
      },
      onResize: e => {
        var {
          element,
          event
        } = e;
        if (!event) {
          return;
        }
        var resizeEventsArgs = this._getResizeEventArgs(event, getPublicElement($(element)));
        this._getAction(RESIZE_EVENT.onResize)(resizeEventsArgs);
        if (resizeEventsArgs.cancel) {
          // @ts-expect-error ts-error
          event.cancel = true;
          return;
        }
        var newLayout = getNextLayout(this._currentLayout,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        calculateDelta(event.offset, this.option('orientation'), rtlEnabled, this._currentOnePxRatio), this._activeResizeHandleIndex, this._itemRestrictions);
        this._applyStylesFromLayout(newLayout);
        this._layout = newLayout;
      },
      onResizeEnd: e => {
        var {
          element,
          event
        } = e;
        if (!event) {
          return;
        }
        var $resizeHandle = $(element);
        var resizeEndEventsArgs = this._getResizeEndEventArgs(event, getPublicElement($resizeHandle));
        this._getAction(RESIZE_EVENT.onResizeEnd)(resizeEndEventsArgs);
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
  _getResizeStartEventArgs(event, handleElement) {
    return {
      event,
      handleElement
    };
  }
  // eslint-disable-next-line class-methods-use-this
  _getResizeEventArgs(event, handleElement) {
    return {
      event,
      handleElement
    };
  }
  // eslint-disable-next-line class-methods-use-this
  _getResizeEndEventArgs(event, handleElement) {
    return {
      event,
      handleElement
    };
  }
  // eslint-disable-next-line class-methods-use-this
  _getResizeHandleLeftItem($resizeHandle) {
    var $leftItem = $resizeHandle.prev();
    while ($leftItem.hasClass(INVISIBLE_STATE_CLASS)) {
      $leftItem = $leftItem.prev();
    }
    return $leftItem;
  }
  // eslint-disable-next-line class-methods-use-this
  _getResizeHandleRightItem($resizeHandle) {
    // @ts-expect-error renderer d.ts issue
    var $rightItem = $resizeHandle.next();
    while ($rightItem.hasClass(INVISIBLE_STATE_CLASS)) {
      // @ts-expect-error renderer d.ts issue
      $rightItem = $rightItem.next();
    }
    return $rightItem;
  }
  _getResizeHandlesSize() {
    return this._getResizeHandles().reduce((size, resizeHandle) => size + resizeHandle.getSize(), 0);
  }
  _renderItemContent(args) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return super._renderItemContent(args);
  }
  _createItemByTemplate(
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  itemTemplate,
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  args) {
    var {
      itemData
    } = args;
    if (itemData.splitter) {
      return itemTemplate.source ? itemTemplate.source()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      : $();
    }
    return super._createItemByTemplate(itemTemplate, args);
  }
  _postprocessRenderItem(args) {
    var splitterConfig = args.itemData.splitter;
    if (!splitterConfig) {
      return;
    }
    this._pushItemToRenderQueue(args.itemContent, splitterConfig);
  }
  _isHorizontalOrientation() {
    return this.option('orientation') === ORIENTATION.horizontal;
  }
  _toggleOrientationClass() {
    this.$element().toggleClass(HORIZONTAL_ORIENTATION_CLASS, this._isHorizontalOrientation());
    this.$element().toggleClass(VERTICAL_ORIENTATION_CLASS, !this._isHorizontalOrientation());
  }
  _itemOptionChanged(item, property, value) {
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
        super._itemOptionChanged(item, property, value);
    }
  }
  _itemCollapsedOptionChanged(item) {
    this._updateItemsRestrictions(this.option('items'), true);
    this._updateResizeHandlesResizableState();
    this._updateResizeHandlesCollapsibleState();
    if (isDefined(this._collapsedItemSize)) {
      this._layout = getNextLayout(this._layout, this._getCollapseDelta(item), this._activeResizeHandleIndex, this._itemRestrictions, true);
    } else {
      this._layout = this._getDefaultLayoutBasedOnSize();
    }
    this._collapseButton = undefined;
    this._collapsedItemSize = undefined;
    this._applyStylesFromLayout(this._layout);
    this._updateItemSizes();
  }
  _getCollapseDelta(item) {
    var itemIndex = this._getIndexByItem(item);
    var {
      collapsedSize = 0,
      minSize = 0
    } = this._itemRestrictions[itemIndex];
    var itemSize = this._collapsedItemSize !== undefined && this._collapsedItemSize >= minSize ? this._collapsedItemSize : minSize;
    var deltaSign = this._collapseButton === 'prev' ? -1 : 1;
    var delta = Math.abs(itemSize - collapsedSize) * deltaSign;
    return delta;
  }
  _getDefaultLayoutBasedOnSize() {
    var {
      items
    } = this.option();
    this._updateItemsRestrictions(items);
    return getDefaultLayout(this._itemRestrictions);
  }
  _updateItemsRestrictions(items) {
    var collapseStateRestrictions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var {
      orientation
    } = this.option();
    var handlesSizeSum = this._getResizeHandlesSize();
    var elementSize = getElementSize(this.$element(), orientation);
    this._itemRestrictions = [];
    items.forEach(item => {
      this._itemRestrictions.push({
        resizable: collapseStateRestrictions ? undefined : item.resizable !== false,
        visible: item.visible !== false,
        collapsed: item.collapsed === true,
        collapsedSize: convertSizeToRatio(item.collapsedSize, elementSize, handlesSizeSum),
        size: convertSizeToRatio(item.size, elementSize, handlesSizeSum),
        maxSize: collapseStateRestrictions ? undefined : convertSizeToRatio(item.maxSize, elementSize, handlesSizeSum),
        minSize: convertSizeToRatio(item.minSize, elementSize, handlesSizeSum)
      });
    });
  }
  _applyStylesFromLayout(layout) {
    this._iterateItems((index, itemElement) => {
      setFlexProp(itemElement, FLEX_PROPERTY.flexGrow, layout[index]);
      var itemData = this._getItemData(itemElement);
      var shouldHideContent = layout[index] === 0 && itemData.visible !== false;
      $(itemElement).toggleClass(SPLITTER_ITEM_HIDDEN_CONTENT_CLASS, shouldHideContent);
    });
  }
  _updateItemSizes() {
    this._iterateItems((index, itemElement) => {
      this._updateItemData('size', index, this._getItemDimension(itemElement));
    });
  }
  _updateItemData(prop, itemIndex, value) {
    var silent = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    var itemPath = "items[".concat(itemIndex, "]");
    var itemData = this.option(itemPath);
    if (isObject(itemData)) {
      this._updateItemOption("".concat(itemPath, ".").concat(prop), value, silent);
    } else {
      this._updateItemOption(itemPath, {
        text: itemData,
        [prop]: value
      }, silent);
    }
  }
  _updateItemOption(path, value) {
    var silent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    if (silent) {
      this._options.silent(path, value);
    } else {
      this.option(path, value);
    }
  }
  _iterateItems(callback) {
    each(this._itemElements(), (index, itemElement) => {
      callback(index, itemElement);
    });
  }
  _getResizeHandles() {
    var handles = [];
    this._iterateItems((index, itemElement) => {
      var instance = this._getItemInstance($(itemElement));
      if (instance.resizeHandle) {
        handles.push(instance.resizeHandle);
      }
    });
    return handles;
  }
  _getResizeHandleItems() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.$element().children(".".concat(RESIZE_HANDLE_CLASS));
  }
  _iterateResizeHandles(callback) {
    this._getResizeHandleItems().each((index, element) => {
      callback(getComponentInstance($(element)));
      return true;
    });
  }
  _dimensionChanged() {
    this._layout = this._getDefaultLayoutBasedOnSize();
    this._applyStylesFromLayout(this._layout);
    this._updateItemSizes();
  }
  _optionChanged(args) {
    var {
      name,
      value
    } = args;
    switch (name) {
      case 'width':
      case 'height':
        super._optionChanged(args);
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
        super._optionChanged(args);
    }
  }
  registerKeyHandler(key, handler) {
    this.$element().find(".".concat(RESIZE_HANDLE_CLASS)).each((index, element) => {
      getComponentInstance($(element)).registerKeyHandler(key, handler);
      return true;
    });
  }
}
Splitter.ItemClass = SplitterItem;
// @ts-expect-error // temp fix
registerComponent('dxSplitter', Splitter);
export default Splitter;