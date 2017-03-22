import httpStatus from 'http-status';
import axios from 'axios';
import request from 'request';

import APIError from '../../helpers/apierror.helper';
import _random from '../../helpers/random.helper';
import _mongo from '../../helpers/mongo.helper';

import Pic from '../../models/pic.model';
import Album from '../../models/album.model';
import AlbumPic from '../../models/album_pic.model';
import Category from '../../models/category.model';
import Genera from '../../models/genera.model';
import GeneraAlbum from '../../models/genera_album.model';
import PicCategory from '../../models/pic_category.model';

async function getGenera (req, res, next) {
    try {
        const generas = await Genera.find()
        // await axios.post('http://127.0.0.1:3000/dbdata/generas', {generas: generas})
        // return res.json(generas)
        return res.send('waadasd')
    } catch (e) {
        console.error(e)
        next(e)
    }
}

async function setGenera (req, res, next) {
    try {
        const generas = req.body.generas
        let len = generas.length, count = 0
        while (count < len) {
            let { name } = generas[count]
            let generaDoc = await _mongo.uniqSave({ name }, generas[count], Genera)
            count++
        }
        return res.send('genera')
    } catch (e) {
        console.error(e)
        next(e)
    }
}

async function getCategories (req, res, next) {
    try {
        const generas = await Category.find({name: {$in: ['']}})
        await axios.post('http://127.0.0.1:3000/dbdata/generas', {generas: generas})
        return res.json(generas)
    } catch (e) {
        console.error(e)
        next(e)
    }
}

async function setCategories (req, res, next) {
    try {
        const generas = req.body.generas
        let len = generas.length, count = 0
        while (count < len) {
            let { name } = generas[count]
            let generaDoc = await _mongo.uniqSave({ name }, generas[count], Genera)
            count++
        }
        return res.send('genera')
    } catch (e) {
        console.error(e)
        next(e)
    }
}

export default {
    getGenera,
    setGenera,
    getCategories,
    setCategories
}
