/**
* DevExtreme (cjs/__internal/grids/tree_list/m_widget_base.js)
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
require("./module_not_extended/column_headers");
require("./m_columns_controller");
require("./data_controller/m_data_controller");
require("./module_not_extended/sorting");
require("./rows/m_rows");
require("./module_not_extended/context_menu");
require("./module_not_extended/error_handling");
require("./m_grid_view");
require("./module_not_extended/header_panel");
var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));
var _type = require("../../../core/utils/type");
var _themes = require("../../../ui/themes");
var _m_utils = _interopRequireDefault(require("../../grids/grid_core/m_utils"));
var _m_widget_base = _interopRequireDefault(require("../../grids/grid_core/m_widget_base"));
var _m_core = _interopRequireDefault(require("./m_core"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
const TREELIST_CLASS = 'dx-treelist';
_m_core.default.registerModulesOrder(['stateStoring', 'columns', 'selection', 'editorFactory', 'columnChooser', 'editingRowBased', 'editingFormBased', 'editingCellBased', 'editing', 'grouping', 'masterDetail', 'validating', 'adaptivity', 'data', 'virtualScrolling', 'columnHeaders', 'filterRow', 'headerPanel', 'headerFilter', 'sorting', 'search', 'rows', 'pager', 'columnsResizingReordering', 'contextMenu', 'keyboardNavigation', 'errorHandling', 'summary', 'columnFixing', 'export', 'gridView']);
let TreeList = /*#__PURE__*/function (_GridCoreWidget) {
  _inheritsLoose(TreeList, _GridCoreWidget);
  function TreeList() {
    return _GridCoreWidget.apply(this, arguments) || this;
  }
  var _proto = TreeList.prototype;
  _proto._initMarkup = function _initMarkup() {
    // @ts-expect-error
    _GridCoreWidget.prototype._initMarkup.apply(this, arguments);
    this.$element().addClass(TREELIST_CLASS);
    this.getView('gridView').render(this.$element());
  };
  TreeList.registerModule = function registerModule() {
    _m_core.default.registerModule.apply(_m_core.default, arguments);
  };
  _proto._defaultOptionsRules = function _defaultOptionsRules() {
    // @ts-expect-error
    return _GridCoreWidget.prototype._defaultOptionsRules.call(this).concat([{
      device() {
        // @ts-expect-error
        return (0, _themes.isMaterialBased)();
      },
      options: {
        showRowLines: true,
        showColumnLines: false,
        headerFilter: {
          height: 315
        },
        editing: {
          useIcons: true
        }
      }
    }]);
  };
  _proto._init = function _init() {
    const that = this;
    // @ts-expect-error
    _GridCoreWidget.prototype._init.call(this);
    if (!this.option('_disableDeprecationWarnings')) {
      _m_utils.default.logHeaderFilterDeprecatedWarningIfNeed(this);
    }
    _m_core.default.processModules(that, _m_core.default);
    _m_core.default.callModuleItemsMethod(this, 'init');
  };
  _proto.getGridCoreHelper = function getGridCoreHelper() {
    return _m_core.default;
  };
  _proto.focus = function focus(element) {
    _GridCoreWidget.prototype.focus.call(this);
    if ((0, _type.isDefined)(element)) {
      this.getController('keyboardNavigation').focus(element);
    }
  };
  return TreeList;
}(_m_widget_base.default); // @ts-expect-error
(0, _component_registrator.default)('dxTreeList', TreeList);
var _default = exports.default = TreeList;
