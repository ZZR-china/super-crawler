/**
 * Module description: redis helper
 */
const moment = require('moment');
const localTime = require('moment-timezone');

function replaceToSpace() {
    return localTime.tz(moment(), "Asia/Shanghai");
}

export default {
  replaceToSpace
};
