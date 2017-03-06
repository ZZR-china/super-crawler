/*
 * Module description: meizi_category_Schema model
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const meizi_category_Schema = new Schema({
    meizi_id: Schema.Types.ObjectId,
    category_id: Schema.Types.ObjectId,
    CreateAt: { type: Number, default: new Date().getTime() }
});

meizi_category_Schema.statics = {
    
}

export default mongoose.model('meizi_category', meizi_category_Schema, 'meizi_category');
