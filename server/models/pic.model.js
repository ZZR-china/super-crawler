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
    meizihref: String, //妹子网的合集 主网址
    originhref: String, //来源网址 及解析的网址
    homesite: {
        href: String, //主站网址
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
    timestamp: { type: Number, default: new Date().getTime() },//图片创建时间
    CreateAt: { type: Number, default: new Date().getTime() }
});

pic_Schema.statics = {
    get(data) {
        return this.findOne(data)
            .then(result => {
                if (result) {
                    return result;
                }
                return Promise.reject('no such result');
            })
    }
}

export default mongoose.model('pic', pic_Schema, 'pic');
