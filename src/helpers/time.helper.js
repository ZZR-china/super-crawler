/**
 * Module description: 时间处理模块
 */
const moment = require('moment');
const localTime = require('moment-timezone');

function getTime() {
    return localTime.tz(moment(), "Asia/Shanghai");
}

function getTimeStampDefault() {
    let time = localTime.tz(moment(), "Asia/Shanghai").format("YYYY-MM-DD");
    return new Date(time).getTime()
}

function getTimeDetail() {
    const time = localTime.tz(moment(), "Asia/Shanghai"),
        year = time.format("YYYY"),
        month = time.format("MM"),
        day = time.format("DD");
    let format_time = {};
    format_time.year = Number(year);
    format_time.month = Number(month);
    format_time.day = Number(day);
    format_time.full = year + "-" + month + "-" + day;
    return format_time;
}

function getDateStr(AddDayCount, date) {
    var time = date ? new Date(date) : new Date();
    time.setDate(time.getDate() + AddDayCount); //获取AddDayCount天后的日期
    var y = time.getFullYear();
    var m = time.getMonth() + 1; //获取当前月份的日期
    var d = time.getDate();
    return y + "-" + m + "-" + d;
}

function checkWithToday(date) {
    const today = localTime.tz(moment(), "Asia/Shanghai").format("YYYY-MM-DD");
    date = (date >= today) ? today : date;
    return date
}

function checkTwoDate(t1, t2) {
    t1 = new Date(t1).getTime();
    t2 = new Date(t2).getTime();
    return t1 > t2;
}

function getTimeStamp(time) {
    time = isNaN(new Date(time).getTime()) ? 0 : new Date(time).getTime();
    return time;
}

function manageString(str) {
  let date = new Date(str);
  let formate_time = {
      year: Number(date.getFullYear()),
      month: Number(date.getMonth()) + 1,
      day: Number(date.getMonth()),
      hour: Number(date.getHours()),
      minute: Number(date.getMinutes()),
      full: str, //格式化时间 like:2017-03-02 21:12
  };
  return formate_time;
}

export default {
  getTime,
  getTimeStampDefault,
  getTimeDetail,
  getDateStr,
  checkWithToday,
  checkTwoDate,
  getTimeStamp,
  manageString
};
