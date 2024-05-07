/* globals Intl */
import errors from '../../core/errors';
import { dateUtilsTs } from '../core/utils/date';
import dateUtils from '../../core/utils/date';
import DateAdapter from './m_date_adapter';
import timeZoneDataUtils from './timezones/m_utils_timezones_data';
import timeZoneList from './timezones/timezone_list';
var toMs = dateUtils.dateToMilliseconds;
var MINUTES_IN_HOUR = 60;
var MS_IN_MINUTE = 60000;
var GMT = 'GMT';
var offsetFormatRegexp = /^GMT(?:[+-]\d{2}:\d{2})?$/;
var createUTCDateWithLocalOffset = date => {
  if (!date) {
    return null;
  }
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
};
var createDateFromUTCWithLocalOffset = date => {
  var result = DateAdapter(date);
  var timezoneOffsetBeforeInMin = result.getTimezoneOffset();
  result.addTime(result.getTimezoneOffset('minute'));
  result.subtractMinutes(timezoneOffsetBeforeInMin - result.getTimezoneOffset());
  return result.source;
};
var getTimeZones = function getTimeZones() {
  var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
  return timeZoneList.value.map(tz => ({
    offset: calculateTimezoneByValue(tz, date),
    title: getTimezoneTitle(tz, date),
    id: tz
  }));
};
var createUTCDate = date => new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes()));
var getTimezoneOffsetChangeInMinutes = (startDate, endDate, updatedStartDate, updatedEndDate) => getDaylightOffset(updatedStartDate, updatedEndDate) - getDaylightOffset(startDate, endDate);
var getTimezoneOffsetChangeInMs = (startDate, endDate, updatedStartDate, updatedEndDate) => getTimezoneOffsetChangeInMinutes(startDate, endDate, updatedStartDate, updatedEndDate) * toMs('minute');
var getDaylightOffset = (startDate, endDate) => new Date(startDate).getTimezoneOffset() - new Date(endDate).getTimezoneOffset();
var getDaylightOffsetInMs = (startDate, endDate) => getDaylightOffset(startDate, endDate) * toMs('minute');
var isValidDate = date => date instanceof Date && !isNaN(date.valueOf());
var calculateTimezoneByValueOld = function calculateTimezoneByValueOld(timezone) {
  var date = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();
  var customTimezones = timeZoneDataUtils.getTimeZonesOld();
  if (customTimezones.length === 0) {
    return undefined;
  }
  var dateUtc = createUTCDate(date);
  return timeZoneDataUtils.getTimeZoneOffsetById(timezone, dateUtc.getTime());
};
var calculateTimezoneByValueCore = function calculateTimezoneByValueCore(timeZone) {
  var date = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();
  var offset = getStringOffset(timeZone, date);
  if (offset === undefined) {
    return undefined;
  }
  if (offset === GMT) {
    return 0;
  }
  var isMinus = offset.substring(3, 4) === '-';
  var hours = offset.substring(4, 6);
  var minutes = offset.substring(7, 9);
  var result = parseInt(hours, 10) + parseInt(minutes, 10) / MINUTES_IN_HOUR;
  return isMinus ? -result : result;
};
var calculateTimezoneByValue = function calculateTimezoneByValue(timeZone) {
  var date = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();
  if (!timeZone) {
    return undefined;
  }
  var isValidTimezone = timeZoneList.value.includes(timeZone);
  if (!isValidTimezone) {
    errors.log('W0009', timeZone);
    return undefined;
  }
  if (!isValidDate(date)) {
    return undefined;
  }
  var result = calculateTimezoneByValueOld(timeZone, date);
  if (result === undefined) {
    result = calculateTimezoneByValueCore(timeZone, date);
  }
  return result;
};
// 'GMT±XX:YY' or 'GMT' format
var getStringOffset = function getStringOffset(timeZone) {
  var date = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();
  var _a, _b;
  var result = '';
  try {
    var dateTimeFormat = new Intl.DateTimeFormat('en-US', {
      timeZone,
      timeZoneName: 'longOffset'
    });
    result = (_b = (_a = dateTimeFormat.formatToParts(date).find(_ref => {
      var {
        type
      } = _ref;
      return type === 'timeZoneName';
    })) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : '';
  } catch (e) {
    errors.log('W0009', timeZone);
    return undefined;
  }
  var isSupportedFormat = offsetFormatRegexp.test(result);
  if (!isSupportedFormat) {
    errors.log('W0009', timeZone);
    return undefined;
  }
  return result;
};
var getOffsetNamePart = offset => {
  if (offset === GMT) {
    return "".concat(offset, " +00:00");
  }
  return offset.replace(GMT, "".concat(GMT, " "));
};
var getTimezoneTitle = function getTimezoneTitle(timeZone) {
  var date = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();
  if (!isValidDate(date)) {
    return '';
  }
  var tzNamePart = timeZone.replace(/\//g, ' - ').replace(/_/g, ' ');
  var offset = getStringOffset(timeZone, date);
  if (offset === undefined) {
    return undefined;
  }
  var offsetNamePart = getOffsetNamePart(offset);
  return "(".concat(offsetNamePart, ") ").concat(tzNamePart);
};
// eslint-disable-next-line @typescript-eslint/naming-convention
var _getDaylightOffsetByTimezone = (startDate, endDate, timeZone) => {
  var startDayOffset = calculateTimezoneByValue(timeZone, startDate);
  var endDayOffset = calculateTimezoneByValue(timeZone, endDate);
  if (startDayOffset === undefined || endDayOffset === undefined) {
    return 0;
  }
  return startDayOffset - endDayOffset;
};
var getCorrectedDateByDaylightOffsets = (convertedOriginalStartDate, convertedDate, date, timeZone, startDateTimezone) => {
  var daylightOffsetByCommonTimezone = _getDaylightOffsetByTimezone(convertedOriginalStartDate, convertedDate, timeZone);
  var daylightOffsetByAppointmentTimezone = _getDaylightOffsetByTimezone(convertedOriginalStartDate, convertedDate, startDateTimezone);
  var diff = daylightOffsetByCommonTimezone - daylightOffsetByAppointmentTimezone;
  return new Date(date.getTime() - diff * toMs('hour'));
};
var correctRecurrenceExceptionByTimezone = function correctRecurrenceExceptionByTimezone(exception, exceptionByStartDate, timeZone, startDateTimeZone) {
  var isBackConversion = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  var timezoneOffset = (exception.getTimezoneOffset() - exceptionByStartDate.getTimezoneOffset()) / MINUTES_IN_HOUR;
  if (startDateTimeZone) {
    timezoneOffset = _getDaylightOffsetByTimezone(exceptionByStartDate, exception, startDateTimeZone);
  } else if (timeZone) {
    timezoneOffset = _getDaylightOffsetByTimezone(exceptionByStartDate, exception, timeZone);
  }
  return new Date(exception.getTime() + (isBackConversion ? -1 : 1) * timezoneOffset * toMs('hour'));
};
var isTimezoneChangeInDate = date => {
  var startDayDate = new Date(new Date(date).setHours(0, 0, 0, 0));
  var endDayDate = new Date(new Date(date).setHours(23, 59, 59, 0));
  return startDayDate.getTimezoneOffset() - endDayDate.getTimezoneOffset() !== 0;
};
var getDateWithoutTimezoneChange = date => {
  var clonedDate = new Date(date);
  if (isTimezoneChangeInDate(clonedDate)) {
    var result = new Date(clonedDate);
    return new Date(result.setDate(result.getDate() + 1));
  }
  return clonedDate;
};
var isSameAppointmentDates = (startDate, endDate) => {
  // NOTE: subtract 1 millisecond to avoid 00.00 time. Method should return 'true' for "2020:10:10 22:00:00" and "2020:10:11 00:00:00", for example.
  endDate = new Date(endDate.getTime() - 1);
  return dateUtils.sameDate(startDate, endDate);
};
var getClientTimezoneOffset = function getClientTimezoneOffset() {
  var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
  return date.getTimezoneOffset() * MS_IN_MINUTE;
};
var getDiffBetweenClientTimezoneOffsets = function getDiffBetweenClientTimezoneOffsets() {
  var firstDate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
  var secondDate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();
  return getClientTimezoneOffset(firstDate) - getClientTimezoneOffset(secondDate);
};
var isEqualLocalTimeZone = function isEqualLocalTimeZone(timeZoneName) {
  var date = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();
  if (Intl) {
    var localTimeZoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (localTimeZoneName === timeZoneName) {
      return true;
    }
  }
  return isEqualLocalTimeZoneByDeclaration(timeZoneName, date);
};
// TODO: Not used anywhere, if it isn't use in the future, then it must be removed
var hasDSTInLocalTimeZone = () => {
  var [startDate, endDate] = getExtremeDates();
  return startDate.getTimezoneOffset() !== endDate.getTimezoneOffset();
};
var getOffset = date => -date.getTimezoneOffset() / MINUTES_IN_HOUR;
var getDateAndMoveHourBack = dateStamp => new Date(dateStamp - toMs('hour'));
var isEqualLocalTimeZoneByDeclarationOld = (timeZoneName, date) => {
  var year = date.getFullYear();
  var configTuple = timeZoneDataUtils.getTimeZoneDeclarationTuple(timeZoneName, year);
  var [summerTime, winterTime] = configTuple;
  var noDSTInTargetTimeZone = configTuple.length < 2;
  if (noDSTInTargetTimeZone) {
    var targetTimeZoneOffset = timeZoneDataUtils.getTimeZoneOffsetById(timeZoneName, date);
    var localTimeZoneOffset = getOffset(date);
    if (targetTimeZoneOffset !== localTimeZoneOffset) {
      return false;
    }
    return !hasDSTInLocalTimeZone();
  }
  var localSummerOffset = getOffset(new Date(summerTime.date));
  var localWinterOffset = getOffset(new Date(winterTime.date));
  if (localSummerOffset !== summerTime.offset) {
    return false;
  }
  if (localSummerOffset === getOffset(getDateAndMoveHourBack(summerTime.date))) {
    return false;
  }
  if (localWinterOffset !== winterTime.offset) {
    return false;
  }
  if (localWinterOffset === getOffset(getDateAndMoveHourBack(winterTime.date))) {
    return false;
  }
  return true;
};
var isEqualLocalTimeZoneByDeclaration = (timeZoneName, date) => {
  var customTimezones = timeZoneDataUtils.getTimeZonesOld();
  var targetTimezoneData = customTimezones.filter(tz => tz.id === timeZoneName);
  if (targetTimezoneData.length === 1) {
    return isEqualLocalTimeZoneByDeclarationOld(timeZoneName, date);
  }
  return false;
};
// TODO: Getting two dates in january or june is the standard mechanism for determining that an offset has occurred.
var getExtremeDates = () => {
  var nowDate = new Date(Date.now());
  var startDate = new Date();
  var endDate = new Date();
  startDate.setFullYear(nowDate.getFullYear(), 0, 1);
  endDate.setFullYear(nowDate.getFullYear(), 6, 1);
  return [startDate, endDate];
};
// TODO Vinogradov refactoring: Change to date utils.
var setOffsetsToDate = (targetDate, offsetsArray) => {
  var newDateMs = offsetsArray.reduce((result, offset) => result + offset, targetDate.getTime());
  return new Date(newDateMs);
};
var addOffsetsWithoutDST = function addOffsetsWithoutDST(date) {
  for (var _len = arguments.length, offsets = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    offsets[_key - 1] = arguments[_key];
  }
  var newDate = dateUtilsTs.addOffsets(date, offsets);
  var daylightShift = getDaylightOffsetInMs(date, newDate);
  if (!daylightShift) {
    return newDate;
  }
  var correctLocalDate = dateUtilsTs.addOffsets(newDate, [-daylightShift]);
  var daylightSecondShift = getDaylightOffsetInMs(newDate, correctLocalDate);
  return !daylightSecondShift ? correctLocalDate : newDate;
};
var utils = {
  getDaylightOffset,
  getDaylightOffsetInMs,
  getTimezoneOffsetChangeInMinutes,
  getTimezoneOffsetChangeInMs,
  calculateTimezoneByValue,
  getCorrectedDateByDaylightOffsets,
  isSameAppointmentDates,
  correctRecurrenceExceptionByTimezone,
  getClientTimezoneOffset,
  getDiffBetweenClientTimezoneOffsets,
  createUTCDateWithLocalOffset,
  createDateFromUTCWithLocalOffset,
  createUTCDate,
  isTimezoneChangeInDate,
  getDateWithoutTimezoneChange,
  hasDSTInLocalTimeZone,
  isEqualLocalTimeZone,
  isEqualLocalTimeZoneByDeclaration,
  getTimeZones,
  setOffsetsToDate,
  addOffsetsWithoutDST
};
export default utils;