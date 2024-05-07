/**
* DevExtreme (esm/viz/sankey/data_validator.js)
* Version: 24.1.1
* Build date: Tue May 07 2024
*
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import graphModule from './graph';
var validator = {
  validate: function validate(data, incidentOccurred) {
    var result = null;
    if (this._hasCycle(data)) {
      result = 'E2006';
      incidentOccurred('E2006');
    }
    return result;
  },
  _hasCycle: function _hasCycle(data) {
    return graphModule.struct.hasCycle(data);
  }
};
export default validator;
