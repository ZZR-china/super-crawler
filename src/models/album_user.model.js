/*
 * Module description: album_user_Schema model
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const albumUserSchema = new Schema({
	  user_id: {type: Schema.Types.ObjectId, ref: 'User'},
    album_id: {type: Schema.Types.ObjectId, ref: 'Album'},
    CreateAt: { type: Number, default: new Date().getTime() }
})

album_pic_Schema.statics = {

}

export default mongoose.model('AlbumPic', album_pic_Schema, 'album_pic');
