import express from 'express';
import categoryCtrl from './category.controller';

const router = express.Router()

router.route('/')
      .get(categoryCtrl.index)
      .post(categoryCtrl.create)

router.route('/:_id')
			.get(categoryCtrl.show)

router.route('/:_id/albums')
			.get(categoryCtrl.getAlbums)

export default {
	router,
	baseUrl: '/categories'
}
