import express from 'express'
import Ctrl from './dbdata.controller'

const router = express.Router();

router.route('/generas')
      .get(Ctrl.getGenera)
      .post(Ctrl.getGenera)

router.route('/categories')
      .get(Ctrl.getGenera)
      .post(Ctrl.getGenera)

export default {
	router,
	baseUrl: '/dbdata'
}