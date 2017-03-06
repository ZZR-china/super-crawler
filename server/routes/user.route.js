import express from 'express';
import userCtrl from '../controller/user.controller';
import expressJwt from 'express-jwt';
import config from '../../config/env';

const router = express.Router();

router.route('/')
      .get(userCtrl.index)
      .post(userCtrl.create);

router.route('/:_id')
      .get(userCtrl.show)
      .put(userCtrl.update)
      .delete(userCtrl.destroy);

export default router;