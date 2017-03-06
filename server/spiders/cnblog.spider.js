import cheerio from "cheerio";
import httpStatus from 'http-status';
import co from 'co';
import axios from 'axios';

import APIError from '../helpers/apierror.helper';

// 主start程序
function start(req, res, next){
		// 设置字符编码(去掉中文会乱码)
		res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
}

export default {
		start
}
