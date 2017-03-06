/*
 * Module description: genera model 与 meizi是一对多关系
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const genera_Schema = new Schema({
    name: {
    	type: String,
    	uniq:true
    },
    hot: Number, //热度
    description: String, //描述
    meizi_ids: [Schema.Types.ObjectId], //meizi网集合
    CreateAt: { type: Number, default: new Date().getTime() }
});

genera_Schema.statics = {

}

export default mongoose.model('genera', genera_Schema, 'genera');
