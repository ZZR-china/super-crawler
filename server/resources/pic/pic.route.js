import express from 'express'
import Ctrl from './pic.controller'

const router = express.Router();

router.route('/')
      .get(Ctrl.index)
      .post(Ctrl.create);

router.route('/random')
      .get(Ctrl.random)

router.route('/latest')
      .get(Ctrl.latest)

export default {
	router,
	baseUrl: '/pics'
}