import express from 'express';
import Ctrl from '../controller/anonym.controller';
import expressJwt from 'express-jwt';
import config from '../../config/env';

const router = express.Router();

router.route('/')
      .get(Ctrl.index)
      .post(Ctrl.create);

router.route('/token')
      .get(Ctrl.getToken)

export default router;