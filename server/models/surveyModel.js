const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// sets a schema for the 'survey' collection
const surveySchema = new Schema({
  questions: [{
    question: {type: String, required: true},
    answer: {type: String, required: true}
  }],
});

// creates a model for the 'survey' collection that will be part of the export
module.exports = mongoose.model('survey', surveySchema);

