/*
 * Module description: topic 试题
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const topic_Schema = new Schema({
    type: { type: Number, default: 1 }, // 1 选择题  2 填空题 3 问答题
    question: { type: Schema.Types.ObjectId },
    knowledge_point: [String], //知识点
    score: { type: Number, default: 0 }, //分值 < 20
    difficulty: { type: Number, default: 1 }, //难度 A 1 B 2 C 3 D 4
    timestamp: { type: Number, default: new Date().getTime() }
});

topic_Schema.statics = {
    get(data) {
        return this.findOne(data)
            .then(result => {
                if (result) {
                    return result;
                }
                return Promise.reject('no such order');
            })
    }
}

export default mongoose.model('topic', topic_Schema, 'topic');
