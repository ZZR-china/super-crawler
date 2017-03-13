import httpStatus from 'http-status';

import APIError from '../helpers/apierror.helper';
import _random from '../helpers/random.helper';

import Pic from '../models/pic.model';
import Album from '../models/album.model';
import AlbumPic from '../models/album_pic.model';
import Category from '../models/category.model';
import Genera from '../models/genera.model';
import GeneraAlbum from '../models/genera_album.model';
import AlbumCategory from '../models/album_category.model';
import PicCategory from '../models/pic_category.model';

function index(req, res, next) {
    let query = req.query,
        fliter,
        skip = Number(query.skip) || 0,
        limit = Number(query.limit) || 50
    query = query.name ? { name: query.name } : {}
    Album.list({ query, fliter, skip, limit })
        .then(result => {
            if (result.length === 0) {
                let err = new APIError('not found', httpStatus.NOT_FOUND);
                return next(err);
            }
            return res.json(result)
        })
        .catch(err => {
            console.error(err)
            err = new APIError(err.message, httpStatus.NOT_FOUND, true);
            return next(err);
        })
}

function create(req, res, next) {

}

function show(req, res, next) {

}

function update(req, res, next) {

}

function destroy(req, res, next) {

}

async function random(req, res, next) {
    try {
        let category = req.query.category
        let albumDoc = await randomAlbum(category)
        if (!albumDoc) {
            albumDoc = await Album.findOne()
        }

        return res.json(albumDoc)
    } catch (err) {
        console.error(err)
        err = new APIError(err.message, httpStatus.NOT_FOUND, true);
        return next(err)
    }
}

async function randomAlbum(category) {
    try {
        let categories = await Category.find({})
        categories = await categories.map(function(item) {
            return item.name
        })

        if (!category) {
            const num = _random.getRandom(categories.length)
            category = categories[num]
        }

        const categoryDoc = await Category.findOne({ name: category })
        const category_id = categoryDoc._id;
        const albumCategoryDoc = await AlbumCategory.find({ category_id: category_id })
        const albumIds = await albumCategoryDoc.map(function(item) {
            return item.album_id
        })
        const albumId = _random.getRandomFromArr(albumIds, 1)[0]
        const albumPicDoc = await Album.findOne({ _id: albumId })
        return albumPicDoc
    } catch (err) {
        console.error(err)
        err = new APIError(err.message, httpStatus.NOT_FOUND, true);
        return next(err)
    }
}

async function getPics(req, res, next) {
    try {
        const params = req.params
        const album_id = params._id
        let picsDoc = await AlbumPic.find({ album_id: album_id })
        picsDoc = await picsDoc.map(function(item) {
            return item.pic_id
        })

        picsDoc = await Pic.find({ _id: { $in: picsDoc } }, { title: 1, url: 1, alt: 1, picview: 1, order: 1, formate_time: 1 })
                           .sort({ order: 1 })
        return res.json(picsDoc)
    } catch (err) {
        console.error(err)
        err = new APIError(err.message, httpStatus.NOT_FOUND, true);
        return next(err)
    }
}

export default {
    index,
    create,
    show,
    update,
    destroy,
    random,
    getPics
}
