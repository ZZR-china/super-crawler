/*
 * Module description: genera model 与 album是一对多关系
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const genera_Schema = new Schema({
    name: {
    	type: String,
    	unique:true
    },
    hot: Number, //热度
    description: String, //描述
    CreateAt: { type: Number, default: new Date().getTime() }
});

genera_Schema.index({ name: 1}, {unique:true, background:true, w:1})

genera_Schema.statics = {

}

export default mongoose.model('genera', genera_Schema, 'genera');
