/**
* DevExtreme (core/templates/function_template.d.ts)
* Version: 24.1.1
* Build date: Tue May 07 2024
*
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { DxElement } from '../element';

export class FunctionTemplate {
  render(template: {
    container: unknown;
    model?: object;
    transclude?: boolean;
  }): DxElement;
}
