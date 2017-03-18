import express from 'express';
import captchaCtrl from './captcha.controller';

const router = express.Router();
/**
 * create image with svg-captcha, that's awesome
 */
router.route('/image')
    .get(captchaCtrl.captchaImage);

export default {
	router,
	baseUrl: '/captchas'
}
