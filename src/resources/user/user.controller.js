import httpStatus from 'http-status';

import APIError from '../../helpers/apierror.helper';
import User from '../../models/user.model'

import _crypto from '../../helpers/crypto.helper'
import _mongo from '../../helpers/mongo.helper'
import config from '../../../config/env'
import JWT from 'jsonwebtoken'

const jwtsecret = config.jwtSecret

function index(req, res, next) {
    const query = req.query;
    User.list({ query })
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

/**
 * @api {get} /users Request user info
 * @apiName CreateUser
 * @apiGroup user
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 */

async function create(req, res, next) {
    try {
        let { name, pwd } = req.body
        let query = {name}
        let user = await User.findOne(query)
        if (user) {
            return res.send('this name is already token')
        }
        let salt = new Date().getTime().toString()
        pwd = await _crypto.cipherpromise(pwd, salt)
        let doc = {name, hashed_password: pwd, salt}
        user = await _mongo.uniqSave(query, doc, User)
        const jwt_token = {
            user_id: user._id,
            name: user.name
        }
        const token = await JWT.sign(jwt_token, jwtsecret, {
            expiresIn: '2000h'
        })
        const backData = {
            token,
            name: user.name,
            username: user.username
        }
        return res.json(backData)
    } catch (err) {
        console.error(err)
        err = new APIError(err.message, httpStatus.NOT_FOUND, true);
        return next(err);
    }
}

function show(req, res, next) {
    const query = req.params;
    User.get({ query })
        .then(result => {
            return res.send(result)
        })
        .catch(err => {
            console.error(err)
            err = new APIError(err.message, httpStatus.NOT_FOUND, true);
            return next(err);
        })
}

function update(req, res, next) {
    const params = req.params;
    const body = req.body;
    User.findOneAndUpdate(params, body)
        .then(result => {
            return res.json(result)
        })
        .catch(err => {
            console.error(err)
            err = new APIError(err.message, httpStatus.NOT_FOUND, true);
            return next(err);
        })
}

function destroy(req, res, next) {
    const params = req.params;
    User.findOneAndRemove(params)
        .then(result => {
            return res.json(result)
        })
        .catch(err => {
            console.error(err)
            err = new APIError(err.message, httpStatus.NOT_FOUND, true);
            return next(err);
        })
}

export default {
    index,
    create,
    show,
    update,
    destroy
}
