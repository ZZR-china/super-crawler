import express from 'express'
import Ctrl from './album.controller'

const router = express.Router();

router.route('/')
      .get(Ctrl.index)
      .post(Ctrl.create);

router.route('/:_id/pics')
			.get(Ctrl.getPics)

router.route('/hotest')
			.get(Ctrl.getHotest)

router.route('/random')
      .get(Ctrl.random)

export default {
	router,
	baseUrl: '/albums'
}
