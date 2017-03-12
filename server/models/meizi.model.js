/*
 * Module description: meizi.com pictrue
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const meizi_Schema = new Schema({
    title: {
        type: String,
        unique: true
    },
    description: String, //描述
    hotest_pic_id: Schema.Types.ObjectId, //浏览量最高的图片id
    hotest_pic_url: String, //浏览量最高的图片地址
    pic_ids: [Schema.Types.ObjectId], //图片
    picview: Number, //浏览量
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

meizi_Schema.statics = {
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
    }
}

export default mongoose.model('meizi', meizi_Schema, 'meizi');
