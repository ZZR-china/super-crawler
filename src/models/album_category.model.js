/*
 * Module description: album_category_Schema model
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const album_category_Schema = new Schema({
    album_id: Schema.Types.ObjectId,
    category_id: Schema.Types.ObjectId,
    CreateAt: { type: Number, default: new Date().getTime() }
});

album_category_Schema.statics = {
    
}

export default mongoose.model('album_category', album_category_Schema, 'album_category');
