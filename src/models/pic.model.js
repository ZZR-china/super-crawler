/*
 * Module description: pictrue model
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const pic_Schema = new Schema({
    title: String,
    description: String, //描述
    url: String, //图片地址
    alt: String, //alt标签
    origin_url: String, //来源网址 即解析的网址
    homesite: {
        url: String, //主站网址
        name: String, //主站网址名字 妹子图等
    },
    picview: Number, //浏览量
    order: Number, //排序
    formate_time: {
        year: Number,
        month: Number,
        day: Number,
        hour: Number,
        minute: Number,
        full: String, //格式化时间 like:2017-03-02 21:12
    },
    timestamp: { type: Number, default: new Date().getTime() }, //图片创建时间
    CreateAt: { type: Number, default: new Date().getTime() }
});

pic_Schema.statics = {
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

export default mongoose.model('pic', pic_Schema, 'pic');
