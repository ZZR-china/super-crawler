/*
 * Module description: user 用户
 */
const mongoose = require('mongoose');
const crypto = require('crypto');

const Schema = mongoose.Schema;
/**
 * User Schema
 */
const UserSchema = new Schema({
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    anonym: {type: String, default: '', uniq: true },
    is_anonym: {type: Boolean, default: true },
    username: { type: String, default: '', uniq: true },
    salt: { type: String, default: '' }
})

/**
 * Validations
 */
UserSchema.path('name').validate(function(name) {
    return name.length;
}, 'Name cannot be blank')

UserSchema.path('email').validate(function(email) {
    return email.length
}, 'Email cannot be blank')

UserSchema.path('email').validate(function(email, fn) {
    const User = mongoose.model('User')
    // Check only when it is a new user or when email field is modified
    if (this.isNew || this.isModified('email')) {
        User.find({ email: email }).exec(function(err, users) {
            fn(!err && users.length === 0)
        });
    } else fn(true);
}, 'Email already exists')

UserSchema.path('username').validate(function(username) {
    return username.length
}, 'Username cannot be blank')

/**
 * Methods
 */

UserSchema.methods = {
    /**
     * Authenticate - check if the passwords are the same
     *
     * @param {String} plainText
     * @return {Boolean}
     * @api public
     */
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    /**
     * Make salt
     *
     * @return {String}
     * @api public
     */

    makeSalt: function() {
        return Math.round((new Date().valueOf() * Math.random())) + '';
    },

    /**
     * Encrypt password
     *
     * @param {String} password
     * @return {String}
     * @api public
     */

    encryptPassword: function(password) {
        if (!password) return '';
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return '';
        }
    }
}

export default mongoose.model('User', UserSchema);
