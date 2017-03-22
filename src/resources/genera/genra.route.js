import express from 'express'
import Ctrl from './genera.controller'

const router = express.Router();

router.route('/')
      .get(Ctrl.index)
      .post(Ctrl.create);

export default {
	router,
	baseUrl: '/generas'
}