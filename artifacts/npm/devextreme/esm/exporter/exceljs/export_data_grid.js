/**
* DevExtreme (esm/exporter/exceljs/export_data_grid.js)
* Version: 24.1.1
* Build date: Tue May 07 2024
*
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { isDefined, isObject, isFunction } from '../../core/utils/type';
import { Export } from './export';
import { MergedRangesManager } from './export_merged_ranges_manager';
class DataGridHelpers {
  constructor(component, dataProvider, worksheet, options) {
    this.component = component;
    this.dataProvider = dataProvider;
    this.worksheet = worksheet;
    this.mergedRangesManager = new MergedRangesManager(dataProvider, worksheet);
    this.topLeftCell = options.topLeftCell;
    this.customizeCell = options.customizeCell;
    this.autoFilterEnabled = options.autoFilterEnabled;
  }
  _getFirstColumnIndex() {
    return this.topLeftCell.column;
  }
  _getFieldHeaderRowsCount() {
    return 0;
  }
  _trySetAutoFilter(cellRange) {
    if (this.autoFilterEnabled) {
      if (!isDefined(this.worksheet.autoFilter) && this.dataProvider.getRowsCount() > 0) {
        var dataRange = {
          from: {
            row: cellRange.from.row + this.dataProvider.getHeaderRowCount() - 1,
            column: cellRange.from.column
          },
          to: cellRange.to
        };
        this.worksheet.autoFilter = dataRange;
      }
    }
  }
  _trySetFont(excelCell, bold) {
    if (isDefined(bold)) {
      excelCell.font = excelCell.font || {};
      excelCell.font.bold = bold;
    }
  }
  _getWorksheetFrozenState(cellRange) {
    return {
      state: 'frozen',
      ySplit: cellRange.from.row + this.dataProvider.getFrozenArea().y - 1
    };
  }
  _trySetOutlineLevel(row, rowIndex) {
    if (rowIndex >= this.dataProvider.getHeaderRowCount()) {
      row.outlineLevel = this.dataProvider.getGroupLevel(rowIndex);
    }
  }
  _isFrozenZone(dataProvider) {
    return dataProvider.getHeaderRowCount() > 0;
  }
  _isHeaderCell(rowIndex) {
    return rowIndex < this.dataProvider.getHeaderRowCount();
  }
  _isInfoCell() {
    return false;
  }
  _allowToMergeRange() {
    return true;
  }
  _getAllFieldHeaders() {
    return [];
  }
  _customizeCell(excelCell, gridCell) {
    if (isFunction(this.customizeCell)) {
      this.customizeCell({
        excelCell,
        gridCell
      });
    }
  }
  _exportFieldHeaders() {}
  _exportAllFieldHeaders() {}
  _isRowFieldHeadersRow() {}
}
function exportDataGrid(options) {
  return Export.export(_getFullOptions(options), DataGridHelpers, _getLoadPanelTargetElement, _getLoadPanelContainer);
}
function _getFullOptions(options) {
  if (!(isDefined(options) && isObject(options))) {
    throw Error('The "exportDataGrid" method requires a configuration object.');
  }
  if (!(isDefined(options.component) && isObject(options.component) && options.component.NAME === 'dxDataGrid')) {
    throw Error('The "component" field must contain a DataGrid instance.');
  }
  if (!isDefined(options.selectedRowsOnly)) {
    options.selectedRowsOnly = false;
  }
  if (!isDefined(options.autoFilterEnabled)) {
    options.autoFilterEnabled = false;
  }
  return Export.getFullOptions(options);
}
function _getLoadPanelTargetElement(component) {
  return component.getView('rowsView').element();
}
function _getLoadPanelContainer(component) {
  return component.getView('rowsView').element().parent();
}
export { exportDataGrid };