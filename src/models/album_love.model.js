/*
 * Module description: love album Schema model
 */
import mongoose from 'mongoose'

const Schema = mongoose.Schema
const Types = Schema.Types

const albumLoveSchema = new Schema({
    love: {type: Number},
    album: {type: Types.ObjectId, ref: 'Album'},
    user: {type: Types.ObjectId, ref: 'User'},
    CreateAt: { type: Number, default: new Date().getTime() }
})

export default mongoose.model('AlbumLove', albumLoveSchema, 'album_love');
