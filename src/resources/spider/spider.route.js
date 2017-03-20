import express from 'express';
import spiders from '../../spiders';

const router = express.Router()

spiders.forEach(function (spider) {
	router.route(spider.url).get(spider.get)
})

export default {
	router,
	baseUrl: '/spiders'
}