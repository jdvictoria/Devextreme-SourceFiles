/**
* DevExtreme (esm/__internal/scheduler/r1/utils/format_weekday.js)
* Version: 24.1.1
* Build date: Tue May 07 2024
*
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import dateLocalization from '../../../../localization/date';
export var formatWeekday = date => dateLocalization.getDayNames('abbreviated')[date.getDay()];
export var formatWeekdayAndDay = date => "".concat(formatWeekday(date), " ").concat(dateLocalization.format(date, 'day'));
