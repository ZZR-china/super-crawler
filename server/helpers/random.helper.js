/**
 * Module description: 随机数处理模块
 */
const moment = require('moment');
const localTime = require('moment-timezone');

function getRandom(num = 10) {
  num = parseInt(Math.random() * num);
  return num
}

function getRandomFromArr (arr, count) {
	arr = Array.isArray(arr) ? arr : []
	count = isNaN(count) ? 1 : count
	//此段代码由Fisher-Yates shuflle算法更改而来
	let result = [], len = arr.length, n, tem

	while (len && result.length < count) {
		n = Math.floor(Math.random() * len--)
		tem = arr[len]
		arr[len] = arr[n]
		arr[n] = tem
		result.push(arr[len])
	}
	return result
}

export default {
  getRandom,
  getRandomFromArr
}
