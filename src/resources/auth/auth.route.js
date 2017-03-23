import express from 'express';
import authCtrl from './auth.controller';

const router = express.Router();

router.route('/')
      .post(authCtrl.create)

router.route('/check')
    .post(authCtrl.check)

export default {
    router,
    baseUrl: '/auth'
}