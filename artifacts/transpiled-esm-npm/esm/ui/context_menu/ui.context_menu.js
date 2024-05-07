import $ from '../../core/renderer';
import domAdapter from '../../core/dom_adapter';
import eventsEngine from '../../events/core/events_engine';
import Guid from '../../core/guid';
import registerComponent from '../../core/component_registrator';
import { noop } from '../../core/utils/common';
import { isDefined, isFunction, isObject, isPlainObject, isRenderer, isWindow } from '../../core/utils/type';
import { contains } from '../../core/utils/dom';
import { getPublicElement } from '../../core/element';
import { each } from '../../core/utils/iterator';
import { extend } from '../../core/utils/extend';
import { getWindow, hasWindow } from '../../core/utils/window';
import fx from '../../animation/fx';
import animationPosition from '../../animation/position';
import devices from '../../core/devices';
import { addNamespace } from '../../events/utils/index';
import Overlay from '../overlay/ui.overlay';
import MenuBase from './ui.menu_base';
import { Deferred } from '../../core/utils/deferred';
import { name as contextMenuEventName } from '../../events/contextmenu';
import holdEvent from '../../events/hold';
import Scrollable from '../scroll_view/ui.scrollable';
import { getOuterHeight } from '../../core/utils/size';
import { isMaterialBased, current as currentTheme } from '../themes';

// STYLE contextMenu

var DX_MENU_CLASS = 'dx-menu';
var DX_MENU_ITEM_CLASS = DX_MENU_CLASS + '-item';
var DX_MENU_ITEM_EXPANDED_CLASS = DX_MENU_ITEM_CLASS + '-expanded';
var DX_MENU_PHONE_CLASS = 'dx-menu-phone-overlay';
var DX_MENU_ITEMS_CONTAINER_CLASS = DX_MENU_CLASS + '-items-container';
var DX_MENU_ITEM_WRAPPER_CLASS = DX_MENU_ITEM_CLASS + '-wrapper';
var DX_SUBMENU_CLASS = 'dx-submenu';
var DX_CONTEXT_MENU_CLASS = 'dx-context-menu';
var DX_HAS_CONTEXT_MENU_CLASS = 'dx-has-context-menu';
var DX_STATE_DISABLED_CLASS = 'dx-state-disabled';
var DX_STATE_FOCUSED_CLASS = 'dx-state-focused';
var DX_STATE_HOVER_CLASS = 'dx-state-hover';
var OVERLAY_CONTENT_CLASS = 'dx-overlay-content';
var SCROLLABLE_CLASS = 'dx-scrollable';
var FOCUS_UP = 'up';
var FOCUS_DOWN = 'down';
var FOCUS_LEFT = 'left';
var FOCUS_RIGHT = 'right';
var FOCUS_FIRST = 'first';
var FOCUS_LAST = 'last';
var ACTIONS = ['onShowing', 'onShown', 'onSubmenuCreated', 'onHiding', 'onHidden', 'onPositioning', 'onLeftFirstItem', 'onLeftLastItem', 'onCloseRootSubmenu', 'onExpandLastSubmenu'];
var LOCAL_SUBMENU_DIRECTIONS = [FOCUS_UP, FOCUS_DOWN, FOCUS_FIRST, FOCUS_LAST];
var DEFAULT_SHOW_EVENT = 'dxcontextmenu';
var SUBMENU_PADDING = 10;
var BORDER_WIDTH = 1;
var window = getWindow();
class ContextMenu extends MenuBase {
  getShowEvent(showEventOption) {
    var result = null;
    if (isObject(showEventOption)) {
      if (showEventOption.name !== null) {
        result = showEventOption.name || DEFAULT_SHOW_EVENT;
      }
    } else {
      result = showEventOption;
    }
    return result;
  }
  getShowDelay(showEventOption) {
    return isObject(showEventOption) && showEventOption.delay;
  }
  _getDefaultOptions() {
    return extend(super._getDefaultOptions(), {
      showEvent: DEFAULT_SHOW_EVENT,
      hideOnOutsideClick: true,
      position: {
        at: 'top left',
        my: 'top left'
      },
      onShowing: null,
      onShown: null,
      onSubmenuCreated: null,
      onHiding: null,
      onHidden: null,
      onPositioning: null,
      submenuDirection: 'auto',
      visible: false,
      target: undefined,
      /**
       * @name dxContextMenuOptions.itemHoldAction
       * @hidden
       */

      /**
      * @name dxContextMenuOptions.onItemReordered
      * @hidden
      */

      /**
      * @name dxContextMenuOptions.selectedItems
      * @hidden
      */

      onLeftFirstItem: null,
      onLeftLastItem: null,
      onCloseRootSubmenu: null,
      onExpandLastSubmenu: null
    });
  }
  _defaultOptionsRules() {
    return super._defaultOptionsRules().concat([{
      device: () => !hasWindow(),
      options: {
        animation: null
      }
    }]);
  }
  _setDeprecatedOptions() {
    super._setDeprecatedOptions();
    extend(this._deprecatedOptions, {
      'closeOnOutsideClick': {
        since: '22.2',
        alias: 'hideOnOutsideClick'
      }
    });
  }
  _initActions() {
    this._actions = {};
    each(ACTIONS, (index, action) => {
      this._actions[action] = this._createActionByOption(action) || noop;
    });
  }
  _setOptionsByReference() {
    super._setOptionsByReference();
    extend(this._optionsByReference, {
      animation: true,
      selectedItem: true
    });
  }
  _focusInHandler() {}
  _itemContainer() {
    return this._overlay ? this._overlay.$content() : $();
  }
  _eventBindingTarget() {
    return this._itemContainer();
  }
  itemsContainer() {
    return this._overlay ? this._overlay.$content() : undefined;
  }
  _supportedKeys() {
    var selectItem = () => {
      var $item = $(this.option('focusedElement'));
      this.hide();
      if (!$item.length || !this._isSelectionEnabled()) {
        return;
      }
      this.selectItem($item[0]);
    };
    return extend(super._supportedKeys(), {
      space: selectItem,
      escape: this.hide
    });
  }
  _getActiveItem() {
    var $availableItems = this._getAvailableItems();
    var $focusedItem = $availableItems.filter(".".concat(DX_STATE_FOCUSED_CLASS));
    var $hoveredItem = $availableItems.filter(".".concat(DX_STATE_HOVER_CLASS));
    var $hoveredItemContainer = $hoveredItem.closest(".".concat(DX_MENU_ITEMS_CONTAINER_CLASS));
    if ($hoveredItemContainer.find(".".concat(DX_MENU_ITEM_CLASS)).index($focusedItem) >= 0) {
      return $focusedItem;
    }
    if ($hoveredItem.length) {
      return $hoveredItem;
    }
    return super._getActiveItem();
  }
  _moveFocus(location) {
    var $items = this._getItemsByLocation(location);
    var $oldTarget = this._getActiveItem(true);
    var $hoveredItem = this.itemsContainer().find(".".concat(DX_STATE_HOVER_CLASS));
    var $focusedItem = $(this.option('focusedElement'));
    var $activeItemHighlighted = !!($focusedItem.length || $hoveredItem.length);
    var $newTarget;
    switch (location) {
      case FOCUS_UP:
        $newTarget = $activeItemHighlighted ? this._prevItem($items) : $oldTarget;
        this._setFocusedElement($newTarget);
        if ($oldTarget.is($items.first())) {
          this._actions.onLeftFirstItem($oldTarget);
        }
        break;
      case FOCUS_DOWN:
        $newTarget = $activeItemHighlighted ? this._nextItem($items) : $oldTarget;
        this._setFocusedElement($newTarget);
        if ($oldTarget.is($items.last())) {
          this._actions.onLeftLastItem($oldTarget);
        }
        break;
      case FOCUS_RIGHT:
        $newTarget = this.option('rtlEnabled') ? this._hideSubmenuHandler() : this._expandSubmenuHandler($items, location);
        this._setFocusedElement($newTarget);
        break;
      case FOCUS_LEFT:
        $newTarget = this.option('rtlEnabled') ? this._expandSubmenuHandler($items, location) : this._hideSubmenuHandler();
        this._setFocusedElement($newTarget);
        break;
      case FOCUS_FIRST:
        $newTarget = $items.first();
        this._setFocusedElement($newTarget);
        break;
      case FOCUS_LAST:
        $newTarget = $items.last();
        this._setFocusedElement($newTarget);
        break;
      default:
        return super._moveFocus(location);
    }
  }
  _setFocusedElement($element) {
    if ($element && $element.length !== 0) {
      this.option('focusedElement', getPublicElement($element));
      this._scrollToElement($element);
    }
  }
  _scrollToElement($element) {
    var $scrollableElement = $element.closest(".".concat(SCROLLABLE_CLASS));
    var scrollableInstance = $scrollableElement.dxScrollable('instance');
    scrollableInstance === null || scrollableInstance === void 0 ? void 0 : scrollableInstance.scrollToElement($element);
  }
  _getItemsByLocation(location) {
    var $activeItem = this._getActiveItem(true);
    var $items;
    if (LOCAL_SUBMENU_DIRECTIONS.includes(location)) {
      $items = $activeItem.closest(".".concat(DX_MENU_ITEMS_CONTAINER_CLASS)).children().children();
    }
    $items = this._getAvailableItems($items);
    return $items;
  }
  _getAriaTarget() {
    return this.$element();
  }
  _refreshActiveDescendant() {
    if (isDefined(this._overlay)) {
      var $target = this._overlay.$content();
      super._refreshActiveDescendant($target);
    }
  }
  _hideSubmenuHandler() {
    var $curItem = this._getActiveItem(true);
    var $parentItem = $curItem.parents(".".concat(DX_MENU_ITEM_EXPANDED_CLASS)).first();
    if ($parentItem.length) {
      this._hideSubmenusOnSameLevel($parentItem);
      this._hideSubmenu($curItem.closest(".".concat(DX_SUBMENU_CLASS)));
      return $parentItem;
    }
    this._actions.onCloseRootSubmenu($curItem);
  }
  _expandSubmenuHandler($items, location) {
    var $curItem = this._getActiveItem(true);
    var itemData = this._getItemData($curItem);
    var node = this._dataAdapter.getNodeByItem(itemData);
    var isItemHasSubmenu = this._hasSubmenu(node);
    var $submenu = $curItem.children(".".concat(DX_SUBMENU_CLASS));
    if (isItemHasSubmenu && !$curItem.hasClass(DX_STATE_DISABLED_CLASS)) {
      if (!$submenu.length || $submenu.css('visibility') === 'hidden') {
        this._showSubmenu($curItem);
      }
      return this._nextItem(this._getItemsByLocation(location));
    }
    this._actions.onExpandLastSubmenu($curItem);
    return undefined;
  }
  _clean() {
    if (this._overlay) {
      this._overlay.$element().remove();
      this._overlay = null;
    }
    this._detachShowContextMenuEvents(this._getTarget());
    super._clean();
  }
  _initMarkup() {
    this.$element().addClass(DX_HAS_CONTEXT_MENU_CLASS);
    super._initMarkup();
  }
  _render() {
    super._render();
    this._renderVisibility(this.option('visible'));
    this._addWidgetClass();
  }
  _isTargetOutOfComponent(relatedTarget) {
    var isInsideContextMenu = $(relatedTarget).closest(".".concat(DX_CONTEXT_MENU_CLASS)).length !== 0;
    return !isInsideContextMenu;
  }
  _focusOutHandler(e) {
    var {
      relatedTarget
    } = e;
    if (relatedTarget) {
      var isTargetOutside = this._isTargetOutOfComponent(relatedTarget);
      if (isTargetOutside) {
        this.hide();
      }
    }
    super._focusOutHandler(e);
  }
  _renderContentImpl() {
    this._detachShowContextMenuEvents(this._getTarget());
    this._attachShowContextMenuEvents();
  }
  _attachKeyboardEvents() {
    !this._keyboardListenerId && this._focusTarget().length && super._attachKeyboardEvents();
  }
  _renderContextMenuOverlay() {
    if (this._overlay) {
      return;
    }
    var overlayOptions = this._getOverlayOptions();
    this._overlay = this._createComponent($('<div>').appendTo(this._$element), Overlay, overlayOptions);
    var $overlayContent = this._overlay.$content();
    $overlayContent.addClass(DX_CONTEXT_MENU_CLASS);
    this._addCustomCssClass($overlayContent);
    this._addPlatformDependentClass($overlayContent);
    this._attachContextMenuEvent();
  }
  preventShowingDefaultContextMenuAboveOverlay() {
    var $itemContainer = this._itemContainer();
    var eventName = addNamespace(contextMenuEventName, this.NAME);
    eventsEngine.off($itemContainer, eventName, ".".concat(DX_SUBMENU_CLASS));
    eventsEngine.on($itemContainer, eventName, ".".concat(DX_SUBMENU_CLASS), (e => {
      e.stopPropagation();
      e.preventDefault();
      eventsEngine.off($itemContainer, eventName, ".".concat(DX_SUBMENU_CLASS));
    }).bind(this));
  }
  _itemContextMenuHandler(e) {
    super._itemContextMenuHandler(e);
    e.stopPropagation();
  }
  _addPlatformDependentClass($element) {
    if (devices.current().phone) {
      $element.addClass(DX_MENU_PHONE_CLASS);
    }
  }
  _detachShowContextMenuEvents(target) {
    var showEvent = this.getShowEvent(this.option('showEvent'));
    if (!showEvent) {
      return;
    }
    var eventName = addNamespace(showEvent, this.NAME);
    if (this._showContextMenuEventHandler) {
      eventsEngine.off(domAdapter.getDocument(), eventName, target, this._showContextMenuEventHandler);
    } else {
      eventsEngine.off($(target), eventName);
    }
  }
  _attachShowContextMenuEvents() {
    var target = this._getTarget();
    var showEvent = this.getShowEvent(this.option('showEvent'));
    if (!showEvent) {
      return;
    }
    var eventName = addNamespace(showEvent, this.NAME);
    var contextMenuAction = this._createAction(e => {
      var delay = this.getShowDelay(this.option('showEvent'));
      if (delay) {
        setTimeout(() => this._show(e.event), delay);
      } else {
        this._show(e.event);
      }
    }, {
      validatingTargetName: 'target'
    });
    var handler = e => contextMenuAction({
      event: e,
      target: $(e.currentTarget)
    });
    contextMenuAction = this._createAction(contextMenuAction);
    if (isRenderer(target) || target.nodeType || isWindow(target)) {
      this._showContextMenuEventHandler = undefined;
      eventsEngine.on(target, eventName, handler);
    } else {
      this._showContextMenuEventHandler = handler;
      eventsEngine.on(domAdapter.getDocument(), eventName, target, this._showContextMenuEventHandler);
    }
  }
  _hoverEndHandler(e) {
    super._hoverEndHandler(e);
    e.stopPropagation();
  }
  _renderDimensions() {}
  _renderContainer($wrapper, submenuContainer) {
    var $holder = submenuContainer || this._itemContainer();
    $wrapper = $('<div>');
    $wrapper.appendTo($holder).addClass(DX_SUBMENU_CLASS).css('visibility', submenuContainer ? 'hidden' : 'visible');
    if (!$wrapper.parent().hasClass(OVERLAY_CONTENT_CLASS)) {
      this._addCustomCssClass($wrapper);
    }
    var $itemsContainer = super._renderContainer($wrapper);
    if (submenuContainer) {
      return $itemsContainer;
    }
    if (this.option('width')) {
      return $itemsContainer.css('minWidth', this.option('width'));
    }
    if (this.option('height')) {
      return $itemsContainer.css('minHeight', this.option('height'));
    }
    return $itemsContainer;
  }
  _renderSubmenuItems(node, $itemFrame) {
    this._renderItems(this._getChildNodes(node), $itemFrame);
    var $submenu = $itemFrame.children(".".concat(DX_SUBMENU_CLASS));
    this._actions.onSubmenuCreated({
      itemElement: getPublicElement($itemFrame),
      itemData: node.internalFields.item,
      submenuElement: getPublicElement($submenu)
    });
    this._initScrollable($submenu);
    this.setAria({
      role: 'menu'
    }, $submenu);
  }
  _getOverlayOptions() {
    var position = this.option('position');
    var overlayOptions = {
      focusStateEnabled: this.option('focusStateEnabled'),
      animation: this.option('animation'),
      innerOverlay: true,
      hideOnOutsideClick: e => this._hideOnOutsideClickHandler(e),
      propagateOutsideClick: true,
      hideOnParentScroll: true,
      deferRendering: false,
      position: {
        at: position.at,
        my: position.my,
        of: this._getTarget(),
        collision: 'flipfit'
      },
      shading: false,
      showTitle: false,
      height: 'auto',
      width: 'auto',
      onShown: this._overlayShownActionHandler.bind(this),
      onHiding: this._overlayHidingActionHandler.bind(this),
      onHidden: this._overlayHiddenActionHandler.bind(this),
      visualContainer: window
    };
    return overlayOptions;
  }
  _overlayShownActionHandler(arg) {
    this._actions.onShown(arg);
  }
  _overlayHidingActionHandler(arg) {
    this._actions.onHiding(arg);
    if (!arg.cancel) {
      this._hideAllShownSubmenus();
      this._setOptionWithoutOptionChange('visible', false);
    }
  }
  _overlayHiddenActionHandler(arg) {
    this._actions.onHidden(arg);
  }
  _shouldHideOnOutsideClick(e) {
    var {
      closeOnOutsideClick,
      hideOnOutsideClick
    } = this.option();
    if (isFunction(hideOnOutsideClick)) {
      return hideOnOutsideClick(e);
    } else if (isFunction(closeOnOutsideClick)) {
      return closeOnOutsideClick(e);
    } else {
      return hideOnOutsideClick || closeOnOutsideClick;
    }
  }
  _hideOnOutsideClickHandler(e) {
    if (!this._shouldHideOnOutsideClick(e)) {
      return false;
    }
    if (domAdapter.isDocument(e.target)) {
      return true;
    }
    var $activeItemContainer = this._getActiveItemsContainer(e.target);
    var $itemContainers = this._getItemsContainers();
    var $clickedItem = this._searchActiveItem(e.target);
    var $rootItem = this.$element().parents(".".concat(DX_MENU_ITEM_CLASS));
    var isRootItemClicked = $clickedItem[0] === $rootItem[0] && $clickedItem.length && $rootItem.length;
    var isInnerOverlayClicked = this._isIncludeOverlay($activeItemContainer, $itemContainers) && $clickedItem.length;
    if (isInnerOverlayClicked || isRootItemClicked) {
      if (this._getShowSubmenuMode() === 'onClick') {
        this._hideAllShownChildSubmenus($clickedItem);
      }
      return false;
    }
    return true;
  }
  _getActiveItemsContainer(target) {
    return $(target).closest(".".concat(DX_MENU_ITEMS_CONTAINER_CLASS));
  }
  _getItemsContainers() {
    return this._overlay.$content().find(".".concat(DX_MENU_ITEMS_CONTAINER_CLASS));
  }
  _searchActiveItem(target) {
    return $(target).closest(".".concat(DX_MENU_ITEM_CLASS)).eq(0);
  }
  _isIncludeOverlay($activeOverlay, $allOverlays) {
    var isSame = false;
    each($allOverlays, (index, $overlay) => {
      if ($activeOverlay.is($overlay) && !isSame) {
        isSame = true;
      }
    });
    return isSame;
  }
  _hideAllShownChildSubmenus($clickedItem) {
    var $submenuElements = $clickedItem.find(".".concat(DX_SUBMENU_CLASS));
    var shownSubmenus = extend([], this._shownSubmenus);
    if ($submenuElements.length > 0) {
      each(shownSubmenus, (index, $submenu) => {
        var $context = this._searchActiveItem($submenu.context).parent();
        if ($context.parent().is($clickedItem.parent().parent()) && !$context.is($clickedItem.parent())) {
          this._hideSubmenu($submenu);
        }
      });
    }
  }
  _initScrollable($container) {
    this._createComponent($container, Scrollable, {
      useKeyboard: false,
      _onVisibilityChanged: scrollable => {
        scrollable.scrollTo(0);
      }
    });
  }
  _setSubMenuHeight($submenu, anchor, isNestedSubmenu) {
    var $itemsContainer = $submenu.find(".".concat(DX_MENU_ITEMS_CONTAINER_CLASS));
    var contentHeight = getOuterHeight($itemsContainer);
    var maxHeight = this._getMaxHeight(anchor, !isNestedSubmenu);
    var menuHeight = Math.min(contentHeight, maxHeight);
    $submenu.css('height', isNestedSubmenu ? menuHeight : '100%');
  }
  _getMaxHeight(anchor) {
    var considerAnchorHeight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var windowHeight = getOuterHeight(window);
    var isAnchorRenderer = isRenderer(anchor);
    var document = domAdapter.getDocument();
    var isAnchorDocument = anchor.length && anchor[0] === document;
    if (!isAnchorRenderer || isAnchorDocument) {
      return windowHeight;
    }
    var offsetTop = anchor[0].getBoundingClientRect().top;
    var anchorHeight = getOuterHeight(anchor);
    var availableHeight = considerAnchorHeight ? Math.max(offsetTop, windowHeight - offsetTop - anchorHeight) : Math.max(offsetTop + anchorHeight, windowHeight - offsetTop);
    return availableHeight - SUBMENU_PADDING;
  }
  _dimensionChanged() {
    if (!this._shownSubmenus) {
      return;
    }
    this._shownSubmenus.forEach($submenu => {
      var $item = $submenu.closest(".".concat(DX_MENU_ITEM_CLASS));
      this._setSubMenuHeight($submenu, $item, true);
      this._scrollToElement($item);
      var submenuPosition = this._getSubmenuPosition($item);
      animationPosition.setup($submenu, submenuPosition);
    });
  }
  _getSubmenuBorderWidth() {
    return isMaterialBased(currentTheme()) ? 0 : BORDER_WIDTH;
  }
  _showSubmenu($item) {
    var node = this._dataAdapter.getNodeByItem(this._getItemData($item));
    this._hideSubmenusOnSameLevel($item);
    if (!this._hasSubmenu(node)) return;
    var $submenu = $item.children(".".concat(DX_SUBMENU_CLASS));
    var isSubmenuRendered = $submenu.length;
    super._showSubmenu($item);
    if (!isSubmenuRendered) {
      this._renderSubmenuItems(node, $item);
      $submenu = $item.children(".".concat(DX_SUBMENU_CLASS));
    }
    this._setSubMenuHeight($submenu, $item, true);
    if (!this._isSubmenuVisible($submenu)) {
      this._drawSubmenu($item);
    }
  }
  _hideSubmenusOnSameLevel($item) {
    var $expandedItems = $item.parent(".".concat(DX_MENU_ITEM_WRAPPER_CLASS)).siblings().find(".".concat(DX_MENU_ITEM_EXPANDED_CLASS));
    if ($expandedItems.length) {
      $expandedItems.removeClass(DX_MENU_ITEM_EXPANDED_CLASS);
      this._hideSubmenu($expandedItems.find(".".concat(DX_SUBMENU_CLASS)));
    }
  }
  _hideSubmenuGroup($submenu) {
    if (this._isSubmenuVisible($submenu)) {
      this._hideSubmenuCore($submenu);
    }
  }
  _isSubmenuVisible($submenu) {
    return $submenu.css('visibility') === 'visible';
  }
  _drawSubmenu($itemElement) {
    var animation = this.option('animation') ? this.option('animation').show : {};
    var $submenu = $itemElement.children(".".concat(DX_SUBMENU_CLASS));
    var submenuPosition = this._getSubmenuPosition($itemElement);
    if (this._overlay && this._overlay.option('visible')) {
      if (!isDefined(this._shownSubmenus)) {
        this._shownSubmenus = [];
      }
      if (!this._shownSubmenus.includes($submenu)) {
        this._shownSubmenus.push($submenu);
      }
      if (animation) {
        fx.stop($submenu);
      }
      animationPosition.setup($submenu, submenuPosition);
      if (animation) {
        if (isPlainObject(animation.to)) {
          animation.to.position = submenuPosition;
        }
        this._animate($submenu, animation);
      }
      $submenu.css('visibility', 'visible');
    }
  }
  _animate($container, options) {
    fx.animate($container, options);
  }
  _getSubmenuPosition($rootItem) {
    var submenuDirection = this.option('submenuDirection').toLowerCase();
    var $rootItemWrapper = $rootItem.parent(".".concat(DX_MENU_ITEM_WRAPPER_CLASS));
    var position = {
      collision: 'flip',
      of: $rootItemWrapper,
      offset: {
        h: 0,
        v: -1
      }
    };
    switch (submenuDirection) {
      case 'left':
        position.at = 'left top';
        position.my = 'right top';
        break;
      case 'right':
        position.at = 'right top';
        position.my = 'left top';
        break;
      default:
        if (this.option('rtlEnabled')) {
          position.at = 'left top';
          position.my = 'right top';
        } else {
          position.at = 'right top';
          position.my = 'left top';
        }
        break;
    }
    return position;
  }

  // TODO: try to simplify it
  _updateSubmenuVisibilityOnClick(actionArgs) {
    if (!actionArgs.args.length) return;
    var itemData = actionArgs.args[0].itemData;
    var node = this._dataAdapter.getNodeByItem(itemData);
    if (!node) return;
    var $itemElement = $(actionArgs.args[0].itemElement);
    var $submenu = $itemElement.find(".".concat(DX_SUBMENU_CLASS));
    var shouldRenderSubmenu = this._hasSubmenu(node) && !$submenu.length;
    if (shouldRenderSubmenu) {
      this._renderSubmenuItems(node, $itemElement);
      $submenu = $itemElement.find(".".concat(DX_SUBMENU_CLASS));
    }
    if ($itemElement.context === $submenu.context && $submenu.css('visibility') === 'visible') {
      return;
    }
    this._updateSelectedItemOnClick(actionArgs);

    // T238943. Give the workaround with e.cancel and remove this hack
    var notCloseMenuOnItemClick = itemData && itemData.closeMenuOnClick === false;
    if (!itemData || itemData.disabled || notCloseMenuOnItemClick) {
      return;
    }
    if ($submenu.length === 0) {
      var $prevSubmenu = $($itemElement.parents(".".concat(DX_SUBMENU_CLASS))[0]);
      this._hideSubmenu($prevSubmenu);
      if (!actionArgs.canceled && this._overlay && this._overlay.option('visible')) {
        this.option('visible', false);
      }
    } else {
      if (this._shownSubmenus && this._shownSubmenus.length > 0) {
        if (this._shownSubmenus[0].is($submenu)) {
          this._hideSubmenu($submenu); // close to parent?
        }
      }
      this._showSubmenu($itemElement);
    }
  }
  _hideSubmenu($curSubmenu) {
    var shownSubmenus = extend([], this._shownSubmenus);
    each(shownSubmenus, (index, $submenu) => {
      if ($curSubmenu.is($submenu) || contains($curSubmenu[0], $submenu[0])) {
        $submenu.parent().removeClass(DX_MENU_ITEM_EXPANDED_CLASS);
        this._hideSubmenuCore($submenu);
      }
    });
  }
  _hideSubmenuCore($submenu) {
    var index = this._shownSubmenus.indexOf($submenu);
    var animation = this.option('animation') ? this.option('animation').hide : null;
    if (index >= 0) {
      this._shownSubmenus.splice(index, 1);
    }
    this._stopAnimate($submenu);
    animation && this._animate($submenu, animation);
    $submenu.css('visibility', 'hidden');
    var scrollableInstance = $submenu.dxScrollable('instance');
    scrollableInstance.scrollTo(0);
    this.option('focusedElement', null);
  }
  _stopAnimate($container) {
    fx.stop($container, true);
  }
  _hideAllShownSubmenus() {
    var shownSubmenus = extend([], this._shownSubmenus);
    var $expandedItems = this._overlay.$content().find(".".concat(DX_MENU_ITEM_EXPANDED_CLASS));
    $expandedItems.removeClass(DX_MENU_ITEM_EXPANDED_CLASS);
    each(shownSubmenus, (_, $submenu) => {
      this._hideSubmenu($submenu);
    });
  }
  _visibilityChanged(visible) {
    if (visible) {
      this._renderContentImpl();
    }
  }
  _optionChanged(args) {
    if (ACTIONS.includes(args.name)) {
      this._initActions();
      return;
    }
    switch (args.name) {
      case 'visible':
        this._renderVisibility(args.value);
        break;
      case 'showEvent':
      case 'position':
      case 'submenuDirection':
        this._invalidate();
        break;
      case 'target':
        args.previousValue && this._detachShowContextMenuEvents(args.previousValue);
        this._invalidate();
        break;
      case 'closeOnOutsideClick':
      case 'hideOnOutsideClick':
        break;
      default:
        super._optionChanged(args);
    }
  }
  _renderVisibility(showing) {
    return showing ? this._show() : this._hide();
  }
  _toggleVisibility() {}
  _show(event) {
    var args = {
      jQEvent: event
    };
    var promise = new Deferred().reject().promise();
    this._actions.onShowing(args);
    if (args.cancel) {
      return promise;
    }
    var position = this._positionContextMenu(event);
    if (position) {
      var _event$originalEvent;
      if (!this._overlay) {
        this._renderContextMenuOverlay();
        this._overlay.$content().addClass(this._widgetClass());
        this._renderFocusState();
        this._attachHoverEvents();
        this._attachClickEvent();
        this._renderItems(this._dataAdapter.getRootNodes());
      }
      var $subMenu = $(this._overlay.content()).children(".".concat(DX_SUBMENU_CLASS));
      this._setOptionWithoutOptionChange('visible', true);
      this._overlay.option({
        height: () => {
          return this._getMaxHeight(position.of);
        },
        maxHeight: () => {
          var $content = $subMenu.find(".".concat(DX_MENU_ITEMS_CONTAINER_CLASS));
          var borderWidth = this._getSubmenuBorderWidth();
          return getOuterHeight($content) + borderWidth * 2;
        },
        position
      });
      if ($subMenu.length) {
        this._setSubMenuHeight($subMenu, position.of, false);
      }
      promise = this._overlay.show();
      event && event.stopPropagation();
      this._setAriaAttributes();

      // T983617. Prevent the browser's context menu appears on desktop touch screens.
      if ((event === null || event === void 0 ? void 0 : (_event$originalEvent = event.originalEvent) === null || _event$originalEvent === void 0 ? void 0 : _event$originalEvent.type) === holdEvent.name) {
        this.preventShowingDefaultContextMenuAboveOverlay();
      }
    }
    return promise;
  }
  _renderItems(nodes, submenuContainer) {
    super._renderItems(nodes, submenuContainer);
    var $submenu = $(this._overlay.content()).children(".".concat(DX_SUBMENU_CLASS));
    if ($submenu.length) {
      this._initScrollable($submenu);
    }
  }
  _setAriaAttributes() {
    this._overlayContentId = "dx-".concat(new Guid());
    this.setAria('owns', this._overlayContentId);
    this.setAria({
      'id': this._overlayContentId,
      'role': 'menu'
    }, this._overlay.$content());
  }
  _cleanAriaAttributes() {
    this._overlay && this.setAria('id', null, this._overlay.$content());
    this.setAria('owns', undefined);
  }
  _getTarget() {
    return this.option('target') || this.option('position').of || $(domAdapter.getDocument());
  }
  _getContextMenuPosition() {
    return extend({}, this.option('position'), {
      of: this._getTarget()
    });
  }
  _positionContextMenu(jQEvent) {
    var position = this._getContextMenuPosition();
    var isInitialPosition = this._isInitialOptionValue('position');
    var positioningAction = this._createActionByOption('onPositioning');
    if (jQEvent && jQEvent.preventDefault && isInitialPosition) {
      position.of = jQEvent;
    }
    var actionArgs = {
      position: position,
      event: jQEvent
    };
    positioningAction(actionArgs);
    if (actionArgs.cancel) {
      position = null;
    } else {
      if (actionArgs.event) {
        actionArgs.event.cancel = true;
        jQEvent.preventDefault();
      }
    }
    return position;
  }
  _refresh() {
    if (!hasWindow()) {
      super._refresh();
    } else {
      if (this._overlay) {
        var lastPosition = this._overlay.option('position');
        super._refresh();
        this._overlay && this._overlay.option('position', lastPosition);
      } else {
        super._refresh();
      }
    }
  }
  _hide() {
    var promise;
    if (this._overlay) {
      promise = this._overlay.hide();
      this._setOptionWithoutOptionChange('visible', false);
    }
    this._cleanAriaAttributes();
    this.option('focusedElement', null);
    return promise || new Deferred().reject().promise();
  }
  toggle(showing) {
    var visible = this.option('visible');
    showing = showing === undefined ? !visible : showing;
    return this._renderVisibility(showing);
  }
  show() {
    return this.toggle(true);
  }
  hide() {
    return this.toggle(false);
  }
}
registerComponent('dxContextMenu', ContextMenu);
export default ContextMenu;