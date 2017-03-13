/*
 * Module description: category model
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const category_Schema = new Schema({
    name: {
    	type: String,
    	unique:true
    },
    hot: Number, //热度
    CreateAt: { type: Number, default: new Date().getTime() }
});

category_Schema.index({ name: 1}, {unique:true, background:true, w:1})

category_Schema.statics = {
	/**
	 * List users in descending order of 'createdAt' timestamp.
	 * @param {number} skip - Number of users to be skipped.
	 * @param {number} limit - Limit number of users to be returned.
	 * @returns {Promise<User[]>}
	 */
	list({ query = {}, fliter = null, skip = 0, limit = 50 } = {}) {
	    return this.find(query, fliter)
	        .sort({ timestamp: -1 })
	        .skip(skip)
	        .limit(limit)
	}
}

export default mongoose.model('category', category_Schema, 'category');
