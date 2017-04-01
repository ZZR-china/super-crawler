/*
 * Module description: user 用户
 */
const mongoose = require('mongoose')
const crypto = require('crypto')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: { type: String, default: '', uniq: true },
    email: { type: String, default: '' },
    anonym: {type: String, default: '', uniq: true },
    is_anonym: {type: Boolean, default: true },
    username: { type: String, default: '', uniq: true },
    salt: { type: String, default: '' },
    hashed_password: {type: String, default: ''},
    CreateAt: { type: Number, default: new Date().getTime() }
})

export default mongoose.model('User', UserSchema, 'user');
