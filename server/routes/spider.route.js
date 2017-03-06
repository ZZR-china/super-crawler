import express from 'express';
import userCtrl from '../controller/user.controller';
import expressJwt from 'express-jwt';
import config from '../../config/env';

import cnblogSpider from '../spiders/cnblog.spider'
import baimaiSpider from '../spiders/baimao.spider'
import meiziSpider from '../spiders/meizi.spider'

const router = express.Router();

router.route('/cnblog')
      .get(cnblogSpider.start)

router.route('/baimao')
	    .get(baimaiSpider.start)

router.route('/meizi')
	    .get(meiziSpider.start)

export default router;