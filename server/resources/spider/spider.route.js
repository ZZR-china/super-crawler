import express from 'express';
import spiders from '../../spiders';

const router = express.Router()

router.route('/cnblog')
      .get(spiders['cnblog'].start)

router.route('/baimao')
	    .get(spiders['baimao'].start)

router.route('/meizi')
	    .get(spiders['meizi'].start)

router.route('/hanhande')
	    .get(spiders['hanhande'].start)

export default {
	router,
	baseUrl: '/spiders'
}