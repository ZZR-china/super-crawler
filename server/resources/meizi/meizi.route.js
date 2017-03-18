import express from 'express';
import Ctrl from './meizi.controller';

const router = express.Router();

router.route('/')
      .get(Ctrl.index)
      .post(Ctrl.create);

router.route('/random')
      .get(Ctrl.random)

export default {
	router,
	baseUrl: '/meizi'
}