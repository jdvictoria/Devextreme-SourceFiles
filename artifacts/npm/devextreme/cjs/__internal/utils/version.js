/**
* DevExtreme (cjs/__internal/utils/version.js)
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
exports.VERSION_SPLITTER = void 0;
exports.getPreviousMajorVersion = getPreviousMajorVersion;
exports.parseVersion = parseVersion;
exports.stringifyVersion = stringifyVersion;
const MAX_MINOR_VERSION = 2;
const MIN_MINOR_VERSION = 1;
const VERSION_SPLITTER = exports.VERSION_SPLITTER = '.';
function stringifyVersion(version) {
  const {
    major,
    minor,
    patch
  } = version;
  return [major, minor, patch].join(VERSION_SPLITTER);
}
function parseVersion(version) {
  const [major, minor, patch] = version.split('.').map(Number);
  return {
    major,
    minor,
    patch
  };
}
function getPreviousMajorVersion(_ref) {
  let {
    major,
    minor,
    patch
  } = _ref;
  const previousMajorVersion = minor === MIN_MINOR_VERSION ? {
    major: major - 1,
    minor: MAX_MINOR_VERSION,
    patch
  } : {
    major,
    minor: minor - 1,
    patch
  };
  return previousMajorVersion;
}
