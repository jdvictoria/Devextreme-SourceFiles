/**
* DevExtreme (esm/ui/html_editor/formats/size.js)
* Version: 24.1.1
* Build date: Tue May 07 2024
*
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import Quill from 'devextreme-quill';
var SizeStyle = {};
if (Quill) {
  SizeStyle = Quill.import('attributors/style/size');
  SizeStyle.whitelist = null;
}
export default SizeStyle;
