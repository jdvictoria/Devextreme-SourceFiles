/**
* DevExtreme (esm/ui/tab_panel/item.js)
* Version: 24.1.1
* Build date: Tue May 07 2024
*
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import CollectionWidgetItem from '../collection/item';
import { noop } from '../../core/utils/common';
export default class TabPanelItem extends CollectionWidgetItem {
  _renderWatchers() {
    this._startWatcher('badge', noop);
    return super._renderWatchers();
  }
}
