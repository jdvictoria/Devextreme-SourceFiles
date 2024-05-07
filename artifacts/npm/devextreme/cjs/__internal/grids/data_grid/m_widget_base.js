/**
* DevExtreme (cjs/__internal/grids/data_grid/m_widget_base.js)
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
require("./m_data_controller");
require("./module_not_extended/sorting");
require("./module_not_extended/rows");
require("./module_not_extended/context_menu");
require("./module_not_extended/error_handling");
require("./module_not_extended/grid_view");
require("./module_not_extended/header_panel");
var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _browser = _interopRequireDefault(require("../../../core/utils/browser"));
var _console = require("../../../core/utils/console");
var _extend = require("../../../core/utils/extend");
var _type = require("../../../core/utils/type");
var _themes = require("../../../ui/themes");
var _m_utils = _interopRequireDefault(require("../../grids/grid_core/m_utils"));
var _m_widget_base = _interopRequireDefault(require("../../grids/grid_core/m_widget_base"));
var _m_core = _interopRequireDefault(require("./m_core"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
const DATAGRID_DEPRECATED_TEMPLATE_WARNING = 'Specifying grid templates with the jQuery selector name is now deprecated. Use the DOM Node or the jQuery object that references this selector instead.';
_m_core.default.registerModulesOrder(['stateStoring', 'columns', 'selection', 'editorFactory', 'columnChooser', 'grouping', 'editing', 'editingRowBased', 'editingFormBased', 'editingCellBased', 'masterDetail', 'validating', 'adaptivity', 'data', 'virtualScrolling', 'columnHeaders', 'filterRow', 'headerPanel', 'headerFilter', 'sorting', 'search', 'rows', 'pager', 'columnsResizingReordering', 'contextMenu', 'keyboardNavigation', 'errorHandling', 'summary', 'columnFixing', 'export', 'gridView']);
let DataGrid = /*#__PURE__*/function (_GridCoreWidget) {
  _inheritsLoose(DataGrid, _GridCoreWidget);
  function DataGrid() {
    return _GridCoreWidget.apply(this, arguments) || this;
  }
  var _proto = DataGrid.prototype;
  _proto._defaultOptionsRules = function _defaultOptionsRules() {
    // @ts-expect-error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return _GridCoreWidget.prototype._defaultOptionsRules.call(this).concat([{
      device: {
        platform: 'ios'
      },
      options: {
        showRowLines: true
      }
    }, {
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
        },
        selection: {
          showCheckBoxesMode: 'always'
        }
      }
    }, {
      device() {
        return _browser.default.webkit;
      },
      options: {
        loadingTimeout: 30,
        loadPanel: {
          animation: {
            show: {
              easing: 'cubic-bezier(1, 0, 1, 0)',
              duration: 500,
              from: {
                opacity: 0
              },
              to: {
                opacity: 1
              }
            }
          }
        }
      }
    }, {
      device(device) {
        return device.deviceType !== 'desktop';
      },
      options: {
        grouping: {
          expandMode: 'rowClick'
        }
      }
    }]);
  };
  _proto._init = function _init() {
    const that = this;
    // @ts-expect-error
    _GridCoreWidget.prototype._init.call(this);
    _m_utils.default.logHeaderFilterDeprecatedWarningIfNeed(that);
    // @ts-expect-error
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    _m_core.default.processModules(that, _m_core.default);
    _m_core.default.callModuleItemsMethod(that, 'init');
  };
  _proto._initMarkup = function _initMarkup() {
    // @ts-expect-error
    _GridCoreWidget.prototype._initMarkup.apply(this, arguments);
    this.getView('gridView').render(this.$element());
  };
  _proto._setDeprecatedOptions = function _setDeprecatedOptions() {
    _GridCoreWidget.prototype._setDeprecatedOptions.call(this);
    // @ts-expect-error
    (0, _extend.extend)(this._deprecatedOptions, {
      useKeyboard: {
        since: '19.2',
        alias: 'keyboardNavigation.enabled'
      },
      rowTemplate: {
        since: '21.2',
        message: 'Use the "dataRowTemplate" option instead'
      }
    });
  };
  DataGrid.registerModule = function registerModule(name, module) {
    _m_core.default.registerModule(name, module);
  };
  _proto.getGridCoreHelper = function getGridCoreHelper() {
    return _m_core.default;
  };
  _proto._getTemplate = function _getTemplate(templateName) {
    let template = templateName;
    if ((0, _type.isString)(template) && template.startsWith('#')) {
      template = (0, _renderer.default)(templateName);
      _console.logger.warn(DATAGRID_DEPRECATED_TEMPLATE_WARNING);
    }
    return _GridCoreWidget.prototype._getTemplate.call(this, template);
  };
  _proto.focus = function focus(element) {
    this.getController('keyboardNavigation').focus(element);
  };
  return DataGrid;
}(_m_widget_base.default); // @ts-expect-error
(0, _component_registrator.default)('dxDataGrid', DataGrid);
var _default = exports.default = DataGrid;
