import express from 'express';
import Ctrl from './anonym.controller'

const router = express.Router();

router.route('/')
      .get(Ctrl.index)
      .post(Ctrl.create);

router.route('/token')
      .get(Ctrl.getToken)

export default {
	router,
	baseUrl: '/anonyms'
}
