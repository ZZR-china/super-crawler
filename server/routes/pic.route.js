import express from 'express';
import picCtrl from '../controller/pic.controller';
import expressJwt from 'express-jwt';
import config from '../../config/env';

const router = express.Router();

router.route('/')
      .get(picCtrl.index)
      .post(picCtrl.create);

router.route('/random')
      .get(picCtrl.random)

export default router;