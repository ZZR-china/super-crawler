import express from 'express';
import categoryCtrl from '../controller/category.controller';
import expressJwt from 'express-jwt';
import config from '../../config/env';

const router = express.Router()

router.route('/')
      .get(categoryCtrl.index)
      .post(categoryCtrl.create)

export default router;