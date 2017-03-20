/*
 * Module description: pic_category_Schema model
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pic_category_Schema = new Schema({
    pic_id: Schema.Types.ObjectId,
    category_id: Schema.Types.ObjectId,
    CreateAt: { type: Number, default: new Date().getTime() }
});

pic_category_Schema.statics = {

}

export default mongoose.model('pic_category', pic_category_Schema, 'pic_category');
