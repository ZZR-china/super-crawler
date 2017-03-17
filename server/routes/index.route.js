import express from 'express';
import userRoutes from './user.route';
import qrRoutes from './qr.route';
import captchaRoutes from './captcha.route';
import meiziRoutes from './meizi.route';
import picRoutes from './pic.route';
import albumRoutes from './album.route';
import spiderRoutes from './spider.route';
import categoriesRoutes from './category.route';
import anonymRoutes from './anonym.route';

const router = express.Router();

router.get('/', function(req, res, next) {
    res.send("hope is hope, nerver lose his way");
});

router.use('/users', userRoutes);
router.use('/qr', qrRoutes);
router.use('/captcha', captchaRoutes);
router.use('/meizi', meiziRoutes);
router.use('/pics', picRoutes);
router.use('/albums', albumRoutes);
router.use('/categories', categoriesRoutes);
router.use('/anonyms', anonymRoutes);
router.use('/spiders', spiderRoutes);

export default router;
