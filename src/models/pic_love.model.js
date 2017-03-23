/*
 * Module description: pic love Schema model
 */
import mongoose from 'mongoose'

const Schema = mongoose.Schema
const Types = Schema.Types

const picLoveSchema = new Schema({
    love: {type: Number, default: 0 },
    user_id: {type: Types.ObjectId, ref: 'User'},
    pic_id: {type: Types.ObjectId, ref: 'Album'},
    CreateAt: { type: Number, default: new Date().getTime() }
})

export default mongoose.model('PicLove', picLoveSchema, 'pic_love');
