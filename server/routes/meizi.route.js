import express from 'express';
import meiziCtrl from '../controller/meizi.controller';
import expressJwt from 'express-jwt';
import config from '../../config/env';

const router = express.Router();

router.route('/')
      .get(meiziCtrl.index)
      .post(meiziCtrl.create);

router.route('/random')
      .get(meiziCtrl.random)

export default router;