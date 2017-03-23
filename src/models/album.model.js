/*
 * Module description: album pictrue
 */
import mongoose from 'mongoose'

const Schema = mongoose.Schema
const album_Schema = new Schema({
    title: {
        type: String,
        unique: true
    },
    homesite: {
        url: String, //主站网址
        name: String, //主站网址名字 妹子图等
    },
    description: String, //描述
    cover: String, //封面图片
    hotest_pic_id: Schema.Types.ObjectId, //浏览量最高的图片id
    hotest_pic_url: String, //浏览量最高的图片地址
    view: Number, //浏览量
    max_picview: Number, //单张pic最高浏览量
    formate_time: {
        year: Number,
        month: Number,
        day: Number,
        full: String, //格式化时间 like:2017-03-02
    },
    timestamp: { type: Number, default: new Date().getTime() },
    CreateAt: { type: Number, default: new Date().getTime() }
});

album_Schema.index({ title: 1}, {unique:true, background:true, w:1})

album_Schema.statics = {
    get(data) {
        return this.findOne(data)
            .then(result => {
                if (result) {
                    return result;
                }
                return Promise.reject('no such result');
            })
    },

    uniqueSave({ data, query }) {
        return this.findOne(query)
            .then(result => {
                if (result) {
                    return 1;
                } else {
                    let doc = new this(data);
                    return doc.save(data)
                }
            })
            .catch(err => {
                return Promise.reject(err);
            })
    },

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
    },

    hostList({ query = {}, fliter = null, skip = 0, limit = 50 } = {}) {
        return this.find(query, fliter)
            .sort({ view: -1 })
            .skip(skip)
            .limit(limit)
    }
}

export default mongoose.model('Album', album_Schema, 'album');
