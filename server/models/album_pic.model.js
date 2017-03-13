/*
 * Module description: album_pic_Schema model
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const album_pic_Schema = new Schema({
    pic_id: Schema.Types.ObjectId,
    album_id: Schema.Types.ObjectId,
    CreateAt: { type: Number, default: new Date().getTime() }
});

album_pic_Schema.statics = {

}

export default mongoose.model('album_pic', album_pic_Schema, 'album_pic');
