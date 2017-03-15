import express from 'express';
import albumCtrl from '../controller/album.controller';
import expressJwt from 'express-jwt';
import config from '../../config/env';

const router = express.Router();

router.route('/')
      .get(albumCtrl.index)
      .post(albumCtrl.create);

router.route('/:_id/pics')
			.get(albumCtrl.getPics)

router.route('/hotest')
			.get(albumCtrl.getHotest)

router.route('/random')
      .get(albumCtrl.random)

export default router;