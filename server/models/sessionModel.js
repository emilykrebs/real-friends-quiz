const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Session schema to store cookies for active user sessions
const sessionSchema = new Schema({
  cookieId: { type: String, required: true },
  createdAt: { type: Date, expires: 3600, default: Date.now }
});

module.exports = mongoose.model('Session', sessionSchema);
