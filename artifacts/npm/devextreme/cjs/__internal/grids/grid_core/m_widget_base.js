/**
* DevExtreme (cjs/__internal/grids/grid_core/m_widget_base.js)
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
var _common = require("../../../core/utils/common");
var _extend = require("../../../core/utils/extend");
var _iterator = require("../../../core/utils/iterator");
var _type = require("../../../core/utils/type");
var _ui = _interopRequireDefault(require("../../../ui/widget/ui.widget"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
const GRID_CORE_ROW_SELECTOR = '.dx-row';
let GridCoreWidget = exports.default = /*#__PURE__*/function (_Widget) {
  _inheritsLoose(GridCoreWidget, _Widget);
  function GridCoreWidget() {
    var _this;
    _this = _Widget.apply(this, arguments) || this;
    _this._activeStateUnit = GRID_CORE_ROW_SELECTOR;
    return _this;
  }
  var _proto = GridCoreWidget.prototype;
  _proto._getDefaultOptions = function _getDefaultOptions() {
    // @ts-expect-error
    const result = _Widget.prototype._getDefaultOptions.call(this);
    (0, _iterator.each)(this.getGridCoreHelper().modules, function () {
      if ((0, _type.isFunction)(this.defaultOptions)) {
        (0, _extend.extend)(true, result, this.defaultOptions());
      }
    });
    return result;
  };
  _proto._setDeprecatedOptions = function _setDeprecatedOptions() {
    // @ts-expect-error
    _Widget.prototype._setDeprecatedOptions.call(this);
    // @ts-expect-error
    (0, _extend.extend)(this._deprecatedOptions, {
      'columnChooser.allowSearch': {
        since: '23.1',
        message: 'Use the "columnChooser.search.enabled" option instead'
      },
      'columnChooser.searchTimeout': {
        since: '23.1',
        message: 'Use the "columnChooser.search.timeout" option instead'
      }
    });
  };
  _proto._clean = function _clean() {};
  _proto._optionChanged = function _optionChanged(args) {
    this.getGridCoreHelper().callModuleItemsMethod(this, 'optionChanged', [args]);
    if (!args.handled) {
      // @ts-expect-error
      _Widget.prototype._optionChanged.call(this, args);
    }
  };
  _proto._dimensionChanged = function _dimensionChanged() {
    // @ts-expect-error
    this.updateDimensions(true);
  };
  _proto._visibilityChanged = function _visibilityChanged(visible) {
    if (visible) {
      // @ts-expect-error
      this.updateDimensions();
    }
  };
  _proto._renderContentImpl = function _renderContentImpl() {
    this.getView('gridView').update();
  };
  _proto._renderContent = function _renderContent() {
    const that = this;
    (0, _common.deferRender)(() => {
      that._renderContentImpl();
    });
  };
  _proto._dispose = function _dispose() {
    // @ts-expect-error
    _Widget.prototype._dispose.call(this);
    this.getGridCoreHelper().callModuleItemsMethod(this, 'dispose');
  };
  _proto.isReady = function isReady() {
    return this.getController('data').isReady();
  };
  _proto.getController = function getController(name) {
    return this._controllers[name];
  };
  _proto.getView = function getView(name) {
    return this._views[name];
  };
  _proto.getGridCoreHelper = function getGridCoreHelper() {};
  _proto.beginUpdate = function beginUpdate() {
    _Widget.prototype.beginUpdate.call(this);
    this.getGridCoreHelper().callModuleItemsMethod(this, 'beginUpdate');
  };
  _proto.endUpdate = function endUpdate() {
    this.getGridCoreHelper().callModuleItemsMethod(this, 'endUpdate');
    _Widget.prototype.endUpdate.call(this);
  };
  return GridCoreWidget;
}(_ui.default);
