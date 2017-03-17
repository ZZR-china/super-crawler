import httpStatus from 'http-status';

import APIError from '../helpers/apierror.helper';

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

async function getToken (type) {
    try {

    }catch (err) {
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
    getToken
}
