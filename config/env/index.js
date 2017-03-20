import path from 'path';

const env = process.env.NODE_ENV || 'development';
const config = require(`./${env}`); // eslint-disable-line import/no-dynamic-require

const defaults = {
  root: path.join(__dirname, '/..'),
  rootPath: path.join(__dirname, '/../..'),
  meizi: {
  	url: "http://m.mzitu.com",
  	name: "妹子图"
  },
  mm131: {
  	url: "http://www.mm131.com/",
  	name: "MM131美女图片网"
  }
}

export default Object.assign(defaults, config);
