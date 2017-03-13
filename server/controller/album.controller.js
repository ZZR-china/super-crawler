import httpStatus from 'http-status';

import APIError from '../helpers/apierror.helper';
import _random from '../helpers/random.helper';

import Pic from '../models/pic.model';
import Album from '../models/album.model';
import AlbumPic from '../models/album_pic.model';
import Category from '../models/category.model';
import Genera from '../models/genera.model';
import GeneraAlbum from '../models/genera_album.model';
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
        let genera = await Genera.find({})
        genera = await genera.map(function(item) {
            return item.name
        })
        const query = req.query
        let type = query.type
        if (!type) {
            const num = _random.getRandom(genera.length)
            type = genera[num]
        } else {
            type = type + '妹子'
        }
        const generaDoc = await Genera.findOne({ name: type })
        const genera_id = generaDoc._id;
        const generaAlbumDoc = await GeneraAlbum.find({ genera_id: genera_id })
        const albumIds = await generaAlbumDoc.map(function(item) {
            return item.album_id
        })
        const albumId = _random.getRandomFromArr(albumIds, 1)[0]
        const albumPicDoc = await AlbumPic.find({ album_id: albumId })
        const picIds = albumPicDoc.map(function(item) {
            return item.pic_id
        })
        const picId = _random.getRandomFromArr(picIds, 1)[0]
        const picDoc = await Pic.findOne({ _id: picId })
        return res.json(picDoc)
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
    random
}