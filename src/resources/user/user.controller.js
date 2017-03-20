import httpStatus from 'http-status';

import APIError from '../../helpers/apierror.helper';
import User from '../../models/user.model'
import Admin from '../../models/admin.model'
import Story from '../../models/story.model'

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

function create(req, res, next) {
    const body = req.body;
    const doc = new User(body);
    doc.save()
        .then(rs => {
            return res.send(rs)
        })
        .catch(err => {
            console.error(err)
            err = new APIError(err.message, httpStatus.NOT_FOUND, true);
            return next(err);
        })
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

async function test(req, res, next) {
    try {
        const aaron = new Admin({ name: 'Aaron', age: 100 })
        const doc = await aaron.save()
        const story1 = new Story({
            title: "Once upon a timex.",
            _creator: doc._id // assign the _id from the person
        });
        await story1.save()
        const story = await Story.findOne({ title: 'Once upon a timex.' }).populate('_creator')
        console.log("1", story)
        return res.json(story)
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
    test
}
