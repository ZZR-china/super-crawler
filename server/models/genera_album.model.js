/*
 * Module description: album_category_Schema model
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const genera_album_Schema = new Schema({
    album_id: Schema.Types.ObjectId,
    genera_id: Schema.Types.ObjectId,
    CreateAt: { type: Number, default: new Date().getTime() }
});

genera_album_Schema.statics = {
    
}

export default mongoose.model('genera_album', genera_album_Schema, 'genera_album');
