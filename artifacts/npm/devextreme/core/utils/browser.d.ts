/**
* DevExtreme (core/utils/browser.d.ts)
* Version: 24.1.1
* Build date: Tue May 07 2024
*
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export type BrowserInfo = {
    webkit?: boolean;
    chrome?: boolean;
    mozilla?: boolean;
    safari?: boolean;
    unknown?: boolean;
    version?: string;
};

declare const browser: BrowserInfo;
export default browser;
