import express from 'express';
import qrCtrl from '../controller/qr.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/url')
      /** GET /api/qr/url - Get list of users */
      .get(qrCtrl.createQrByUrl)

export default router;