import express from 'express';
import userCtrl from './user.controller';

const router = express.Router();

router.route('/')
      .get(userCtrl.index)
      .post(userCtrl.create);

router.route('/:_id')
      .get(userCtrl.show)
      .put(userCtrl.update)
      .delete(userCtrl.destroy);

router.route('/test/test')
			.get(userCtrl.test)

export default {
	router,
	baseUrl: '/users'
}