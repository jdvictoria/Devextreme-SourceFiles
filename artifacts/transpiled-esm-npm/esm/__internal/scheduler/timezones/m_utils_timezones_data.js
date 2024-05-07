/* eslint-disable radix */
import { sign } from '../../../core/utils/math';
import GlobalConfig from '../../../core/config';
var getConvertedUntils = value => value.split('|').map(until => {
  if (until === 'Infinity') {
    return null;
  }
  return parseInt(until, 36) * 1000;
});
var parseTimezone = timeZoneConfig => {
  var {
    offsets
  } = timeZoneConfig;
  var {
    offsetIndices
  } = timeZoneConfig;
  var {
    untils
  } = timeZoneConfig;
  var offsetList = offsets.split('|').map(value => parseInt(value));
  var offsetIndexList = offsetIndices.split('').map(value => parseInt(value));
  var dateList = getConvertedUntils(untils)
  // eslint-disable-next-line
  .map((accumulator => value => accumulator += value)(0));
  return {
    offsetList,
    offsetIndexList,
    dateList
  };
};
class TimeZoneCache {
  constructor() {
    this.map = new Map();
  }
  tryGet(id) {
    if (!this.map.get(id)) {
      var config = timeZoneDataUtils.getTimezoneById(id);
      if (!config) {
        return false;
      }
      var timeZoneInfo = parseTimezone(config);
      this.map.set(id, timeZoneInfo);
    }
    return this.map.get(id);
  }
}
var tzCache = new TimeZoneCache();
var timeZoneDataUtils = {
  _tzCache: tzCache,
  getTimeZonesOld() {
    var _a;
    return (_a = GlobalConfig().timezones) !== null && _a !== void 0 ? _a : [];
  },
  formatOffset(offset) {
    var hours = Math.floor(offset);
    var minutesInDecimal = offset - hours;
    var signString = sign(offset) >= 0 ? '+' : '-';
    var hoursString = "0".concat(Math.abs(hours)).slice(-2);
    var minutesString = minutesInDecimal > 0 ? ":".concat(minutesInDecimal * 60) : ':00';
    return signString + hoursString + minutesString;
  },
  formatId(id) {
    return id.split('/').join(' - ').split('_').join(' ');
  },
  getTimezoneById(id) {
    if (!id) {
      return undefined;
    }
    var tzList = this.getTimeZonesOld();
    for (var i = 0; i < tzList.length; i++) {
      var currentId = tzList[i].id;
      if (currentId === id) {
        return tzList[i];
      }
    }
    return undefined;
  },
  getTimeZoneOffsetById(id, timestamp) {
    var timeZoneInfo = tzCache.tryGet(id);
    return timeZoneInfo ? this.getUtcOffset(timeZoneInfo, timestamp) : undefined;
  },
  getTimeZoneDeclarationTuple(id, year) {
    var timeZoneInfo = tzCache.tryGet(id);
    return timeZoneInfo ? this.getTimeZoneDeclarationTupleCore(timeZoneInfo, year) : [];
  },
  getTimeZoneDeclarationTupleCore(timeZoneInfo, year) {
    var {
      offsetList
    } = timeZoneInfo;
    var {
      offsetIndexList
    } = timeZoneInfo;
    var {
      dateList
    } = timeZoneInfo;
    var tupleResult = [];
    for (var i = 0; i < dateList.length; i++) {
      var currentDate = dateList[i];
      var currentYear = new Date(currentDate).getFullYear();
      if (currentYear === year) {
        var offset = offsetList[offsetIndexList[i + 1]];
        tupleResult.push({
          date: currentDate,
          offset: -offset / 60
        });
      }
      if (currentYear > year) {
        break;
      }
    }
    return tupleResult;
  },
  getUtcOffset(timeZoneInfo, dateTimeStamp) {
    var {
      offsetList
    } = timeZoneInfo;
    var {
      offsetIndexList
    } = timeZoneInfo;
    var {
      dateList
    } = timeZoneInfo;
    var infinityUntilCorrection = 1;
    var lastIntervalStartIndex = dateList.length - 1 - infinityUntilCorrection;
    var index = lastIntervalStartIndex;
    while (index >= 0 && dateTimeStamp < dateList[index]) {
      index--;
    }
    var offset = offsetList[offsetIndexList[index + 1]];
    return -offset / 60 || offset;
  }
};
export default timeZoneDataUtils;