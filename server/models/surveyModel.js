const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// sets a schema for the 'survey' collection
const surveySchema = new Schema({
  questions: [{
    question: String,
    answer: Boolean,
  }],
});

// creates a model for the 'survey' collection that will be part of the export
module.exports = mongoose.model('Survey', surveySchema);

