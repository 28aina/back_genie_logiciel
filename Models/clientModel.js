const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  username: String,
  email: String,
  telephone: String,
});

module.exports = mongoose.model('Client', clientSchema);
