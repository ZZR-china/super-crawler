import express from 'express';
import Ctrl from './qr.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/url')
      /** GET /api/qr/url - Get list of users */
      .get(Ctrl.createQrByUrl)

export default {
	router,
	baseUrl: '/qrs'
}