const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    username: {type: String, required: true},
    password: {type: String, required: true},
    survey_ids: [{
      type: Schema.Types.ObjectId,
      ref: 'survey',
    }]
  });
  
  module.exports = mongoose.model('user', userSchema);