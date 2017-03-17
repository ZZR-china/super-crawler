/*
 * Module description: story
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var storySchema = Schema({
  _creator : { type: Schema.Types.ObjectId, ref: 'Admin' },
  title    : String,
  fans     : [{ type: Schema.Types.ObjectId, ref: 'Admin' }]
});

export default mongoose.model('Story', storySchema, 'story');
