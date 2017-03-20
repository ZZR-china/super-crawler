import httpStatus from 'http-status'

import APIError from '../../helpers/apierror.helper'
import _random from '../../helpers/random.helper'

import Pic from '../../models/pic.model'
import Album from '../../models/album.model'
import AlbumPic from '../../models/album_pic.model'
import Category from '../../models/category.model'
import Genera from '../../models/genera.model'
import GeneraAlbum from '../../models/genera_album.model'
import AlbumCategory from '../../models/album_category.model'
import PicCategory from '../../models/pic_category.model'

/**
 * @api {get} /albums Request album info
 * @apiName GetAlbum
 * @apiGroup album
 * @apiParam {Number} limit the number of return data length.
 * @apiParam {String} category the album categories.
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   [{
 *   "_id":"58cd525dd75f8e08f46e1876",
 *   "title":"身娇腰柔易推倒,越往后看越精彩 清纯萝莉童颜巨乳甜美可人",
 *   "__v":0,
 *   "hotest_pic_url":"http://i.meizitu.net/2017/03/17a16.jpg",
 *   "hotest_pic_id":"58cd5262d75f8e08f46e1916",
 *   "max_picview":704159,
 *   "view":8000248,
 *   "CreateAt":1489850932705,
 *   "timestamp":1489757100000,
 *   "formate_time":{"year":2017,"month":3,"day":2,"full":"2017-03-17 21:25"},
 *   "homesite":{"url":"http://m.mzitu.com","name":"妹子图"}
 *   }]
 */
async function index(req, res, next) {
    try {
        let reqquery = req.query,
            fliter,
            skip = Number(reqquery.skip) || 0,
            limit = Number(reqquery.limit) || 50,
            category_id = reqquery.category_id,
            category_name = reqquery.category_name,
            title = reqquery.title

        let query = {}
        if (category_id && category_name) {
            let err = new APIError('cant send id & name at onetime ', httpStatus.NOT_FOUND, true);
            return next(err);
        }
        if (category_id) {
            let albumIds = await AlbumCategory.find({category_id: { $in: category_id}}, {album_id: 1})
            albumIds = albumIds.map(function (item) {
                return item.album_id
            })
            query._id = {$in: albumIds}
        }
        if (category_name) {
            const cateReg = new RegExp(category_name)
            const cateIDs = await Category.find({ name: cateReg }, { _id: 1})
            let albumIds = await AlbumCategory.find({category_id: {$in: cateIDs }}, {album_id: 1})
            albumIds = albumIds.map(function (item) {
                return item.album_id
            })
            query._id = {$in: albumIds}
        }
        if (title) {
            const reg = new RegExp(title)
            query.title = reg
        }
        const album = await Album.list({ query, fliter, skip, limit })
        if (album.length === 0) {
            let err = new APIError('not found', httpStatus.NOT_FOUND);
            return next(err);
        }
        return res.json(album)
    }catch (err) {
        console.error(err)
        err = new APIError(err.message, httpStatus.NOT_FOUND, true);
        return next(err);
    }
}

function create(req, res, next) {

}

function show(req, res, next) {

}

function update(req, res, next) {

}

function destroy(req, res, next) {

}

/**
 * @api {get} /albums/random Request random album
 * @apiName GetAlbum
 * @apiGroup album
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *   "_id":"58c6a540a244f0155811e1ae",
 *   "title":"爆乳翘臀的惹火御姐 性感美女尤娜娜胸前纹身惊艳诱人",
 *   "__v":0,
 *   "hotest_pic_url":"http://i.meizitu.net/2017/02/18a29.jpg",
 *   "hotest_pic_id":"58c6a564a244f0155811ef41",
 *   "max_picview":1138664,
 *   "view":73881096,
 *   "CreateAt":1489413412181,
 *   "timestamp":1487423400000,
 *   "formate_time":{"year":2017,"month":2,"day":1,"full":"2017-02-18 21:10"},
 *   "homesite":{"url":"http://m.mzitu.com","name":"妹子图"}
 *   }
 *   
 */
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

        picsDoc = await Pic.find({ _id: { $in: picsDoc } }, { title: 1, url: 1, alt: 1, picview: 1, order: 1, formate_time: 1, origin_url: 1 })
                           .sort({ order: 1 })
        return res.json(picsDoc)
    } catch (err) {
        console.error(err)
        err = new APIError(err.message, httpStatus.NOT_FOUND, true);
        return next(err)
    }
}

async function getHotest(req, res, next) {
    try {
        let reqquery = req.query,
            fliter,
            skip = Number(reqquery.skip) || 0,
            limit = Number(reqquery.limit) || 50,
            category_id = reqquery.category_id,
            category_name = reqquery.category_name

        let query = {}
        if (category_id && category_name) {
            let err = new APIError('cant send id & name at onetime ', httpStatus.NOT_FOUND, true);
            return next(err);
        }
        if (category_id) {
            let albumIds = await AlbumCategory.find({category_id: { $in: category_id}}, {album_id: 1})
            albumIds = albumIds.map(function (item) {
                return item.album_id
            })
            query._id = {$in: albumIds}
        }
        if (category_name) {
            const cateReg = new RegExp(category_name)
            const cateIDs = await Category.find({ name: cateReg }, { _id: 1})
            let albumIds = await AlbumCategory.find({category_id: {$in: cateIDs }}, {album_id: 1})
            albumIds = albumIds.map(function (item) {
                return item.album_id
            })
            query._id = {$in: albumIds}
        }
        let album = await Album.hostList({ query, fliter, skip, limit })
        if (album.length === 0) {
            let err = new APIError('no album', httpStatus.NOT_FOUND)
            return next(err)
        }
        return res.json(album)
    }catch (err) {
        console.error(err)
        err = new APIError(err.message, httpStatus.NOT_FOUND, true)
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
    getPics,
    getHotest
}
