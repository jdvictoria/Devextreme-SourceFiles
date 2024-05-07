/**
* DevExtreme (esm/ui/diagram/diagram.importer.js)
* Version: 24.1.1
* Build date: Tue May 07 2024
*
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import Errors from '../widget/ui.errors';
import DiagramDefault, * as Diagram from 'devexpress-diagram';
export function getDiagram() {
  if (!DiagramDefault) {
    throw Errors.Error('E1041', 'devexpress-diagram');
  }
  return Diagram;
}