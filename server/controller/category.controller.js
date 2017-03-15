import httpStatus from 'http-status';

import APIError from '../helpers/apierror.helper';
import _random from '../helpers/random.helper';

import Pic from '../models/pic.model';
import Album from '../models/album.model';
import Category from '../models/category.model';
import Genera from '../models/genera.model';
import PicCategory from '../models/pic_category.model';
import AlbumCategory from '../models/album_category.model';

function index(req, res, next) {
    let query = req.query, 
        fliter, 
        skip = Number(query.skip) || 0,
        limit = Number(query.limit) || 50
    if (query.name) {
        const reg = new RegExp(query.name)
        query = { name: reg }
    }
    Category.list({ query, fliter, skip, limit})
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
    let query = req.params

    Category.findOne(query)
        .then(result => {
            if (!result) {
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

function update(req, res, next) {

}

function destroy(req, res, next) {

}

async function getAlbums (req, res, next) {
    try {
        let category_id = req.params._id,
            reqquery = req.query,
            fliter,
            skip = Number(reqquery.skip) || 0,
            limit = Number(reqquery.limit) || 50

        let query = {}
        const cateDoc = await AlbumCategory.find({ category_id: category_id}, {album_id: 1})
        const albumIds = cateDoc.map(function (item) {
            return item.album_id
        })
        query._id = {$in: albumIds} 
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

async function random(req, res, next) {
    try {
        const genera = ['性感', '台湾', '清纯', '日本']
        const query = req.query
        let type = query.type
        if (!type) {
            const num = _random.getRandom(genera.length)
            type = genera[num]
        }
        type = type + '妹子'
        const generaDoc = await Genera.findOne({name: type})
        const meiziIds = generaDoc.meizi_ids;
        const meiziId = _random.getRandomFromArr(meiziIds, 1)[0]
        const meiziDoc = await Meizi.findOne({_id: meiziId})
        const picIds = meiziDoc.pic_ids;
        const picId = _random.getRandomFromArr(picIds, 1)[0]
        const picDoc = await Pic.findOne({_id: picId})
        return res.json(picDoc)
    }catch(err) {
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
    getAlbums
}
