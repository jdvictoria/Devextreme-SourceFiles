/**
* DevExtreme (core/utils/window.d.ts)
* Version: 24.1.1
* Build date: Tue May 07 2024
*
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export declare function getWindow(): Window;
export declare function hasWindow(): boolean;
export declare function setWindow(
  newWindowObject: Window | Record<string, unknown>,
  // eslint-disable-next-line @typescript-eslint/no-shadow
  hasWindow?: boolean
): void;
