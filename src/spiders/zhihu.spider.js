import cheerio from "cheerio";
import httpStatus from 'http-status';
import co from 'co';
import axios from 'axios';
import request from 'request';

import Album from '../models/album.model';
import Pic from '../models/pic.model';
import AlbumPic from '../models/album_pic.model';
import Genera from '../models/genera.model';
import Category from '../models/category.model';
import GeneraAlbum from '../models/genera_album.model';
import AlbumCategory from '../models/album_category.model';
import PicCategory from '../models/pic_category.model';

import APIError from '../helpers/apierror.helper';
import _time from '../helpers/time.helper';

import config from '../../config/env/';

const homesite = config.meizi

const start = async function(req, res, next) {
    try {

    } catch (err) {
        console.error(err)
        return next(err)
    }
}

export default {
    start,
    name: 'zhihu',
    url: '/zhihu',
    get: start
}
