/**
 * Module description: array helper
 */
const moment = require('moment');
const localTime = require('moment-timezone');

function uniqueArr(arr) {
    let res = arr.filter(function(item, index, array) {
        return array.indexOf(item) === index;
    });

    return res;
}

function unique(arr) {
  return Array.from(new Set(arr));
}

export default {
    uniqueArr,
    unique
};
