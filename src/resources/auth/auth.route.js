import express from 'express';
import authCtrl from './auth.controller';

const router = express.Router();

router.route('/')
      .post(authCtrl.create)

router.route('/check')
    .post(authCtrl.check)

router.route('/anonmy')
    .post(authCtrl.getAnonmyAuth)

export default {
    router,
    baseUrl: '/auth'
}