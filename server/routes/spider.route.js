import express from 'express';
import userCtrl from '../controller/user.controller';
import expressJwt from 'express-jwt';
import config from '../../config/env';

import cnblogSpider from '../spiders/cnblog.spider'
import baimaiSpider from '../spiders/baimao.spider'
import meiziSpider from '../spiders/meizi.spider'
import hanhandeSpider from '../spiders/hanhande.spider'

const router = express.Router()

router.route('/cnblog')
      .get(cnblogSpider.start)

router.route('/baimao')
	    .get(baimaiSpider.start)

router.route('/meizi')
	    .get(meiziSpider.start)

router.route('/hanhande')
	    .get(hanhandeSpider.start)

export default router;