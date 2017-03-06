/*
 * Module description: category model
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const category_Schema = new Schema({
    name: String,
    hot: Number, //热度
    CreateAt: { type: Number, default: new Date().getTime() }
});

category_Schema.statics = {

}

export default mongoose.model('category', category_Schema, 'category');
