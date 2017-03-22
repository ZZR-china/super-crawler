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

export default {
    index,
    create,
    show,
    update,
    destroy
}
