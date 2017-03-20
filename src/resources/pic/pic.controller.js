import httpStatus from 'http-status';
import axios from 'axios';
import request from 'request';

import APIError from '../../helpers/apierror.helper';
import _random from '../../helpers/random.helper';

import Pic from '../../models/pic.model';
import Album from '../../models/album.model';
import AlbumPic from '../../models/album_pic.model';
import Category from '../../models/category.model';
import Genera from '../../models/genera.model';
import GeneraAlbum from '../../models/genera_album.model';
import PicCategory from '../../models/pic_category.model';

function index(req, res, next) {
    let reqquery = req.query,
        fliter,
        skip = Number(reqquery.skip) || 0,
        limit = Number(reqquery.limit) || 50
    let query
    if (reqquery.title) {
        const reg = new RegExp(reqquery.title)
        query.title = reg
    }
    Pic.list({ query, fliter, skip, limit })
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
        let type = req.query.type
        let picDoc = await randomPic(type)
        if (!picDoc) {
            picDoc = await Pic.findOne()
        }
        if (req.query.show) {
            const url = picDoc.url         
            return request(url).pipe(res)
        }else {
            return res.json(picDoc)
        }
    }catch(err) {
        console.error(err)
        err = new APIError(err.message, httpStatus.NOT_FOUND, true);
        return next(err)
    }
}

async function randomPic (type) {
    try {
        let genera = await Genera.find({})
        genera = await genera.map(function (item) {
            return item.name
        })
        if (!type) {
            const num = _random.getRandom(genera.length)
            type = genera[num]
        }else{
            type = type + '妹子'
        }
        const regType = new RegExp(type, ['g'])
        const generaDoc = await Genera.findOne({name: regType})
        if (!generaDoc) {
            return null
        }
        const genera_id = generaDoc._id;
        const generaAlbumDoc = await GeneraAlbum.find({genera_id: genera_id})
        const albumIds = await generaAlbumDoc.map(function(item) {
            return item.album_id
        })
        const albumId = _random.getRandomFromArr(albumIds, 1)[0]
        const albumPicDoc = await AlbumPic.find({album_id: albumId})
        const picIds = albumPicDoc.map(function (item) {
            return item.pic_id
        })
        const picId = _random.getRandomFromArr(picIds, 1)[0]
        let picDoc = await Pic.findOne({_id: picId})
        return picDoc
    }catch (err) {
        console.error(err)
        err = new APIError(err.message, httpStatus.NOT_FOUND, true);
        return next(err)
    }
}

async function latest (req, res, next) {
    try {
        const picDoc = await Pic.findOne().sort({timestamp: -1})
        if (req.query.show) {
            const url = picDoc.url
            return request(url).pipe(res)
        }else {
            return res.json(picDoc)
        }
    } catch (err) {
        console.error(err)
        err = new APIError(err.message, httpStatus.NOT_FOUND, true);
        return next(err);
    }
}

export default {
    index,
    create,
    show,
    update,
    destroy,
    random,
    latest
}
