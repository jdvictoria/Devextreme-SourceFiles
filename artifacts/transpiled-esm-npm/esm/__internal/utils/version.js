var MAX_MINOR_VERSION = 2;
var MIN_MINOR_VERSION = 1;
export var VERSION_SPLITTER = '.';
export function stringifyVersion(version) {
  var {
    major,
    minor,
    patch
  } = version;
  return [major, minor, patch].join(VERSION_SPLITTER);
}
export function parseVersion(version) {
  var [major, minor, patch] = version.split('.').map(Number);
  return {
    major,
    minor,
    patch
  };
}
export function getPreviousMajorVersion(_ref) {
  var {
    major,
    minor,
    patch
  } = _ref;
  var previousMajorVersion = minor === MIN_MINOR_VERSION ? {
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