import httpStatus from 'http-status';

import APIError from '../helpers/apierror.helper';
import _random from '../helpers/random.helper';

import Pic from '../models/pic.model';
import Meizi from '../models/meizi.model';
import Category from '../models/category.model';
import Genera from '../models/genera.model';
import PicCategory from '../models/pic_category.model';

function index(req, res, next) {

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
    random
}
