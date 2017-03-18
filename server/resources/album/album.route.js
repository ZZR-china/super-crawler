import express from 'express'
import Ctrl from './album.controller'

const router = express.Router();

/**
 * @api {get} /user/:id Request User information
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.route('/')
      .get(Ctrl.index)
      .post(Ctrl.create);

router.route('/:_id/pics')
			.get(Ctrl.getPics)

router.route('/hotest')
			.get(Ctrl.getHotest)

router.route('/random')
      .get(Ctrl.random)

export default {
	router,
	baseUrl: '/albums'
}
