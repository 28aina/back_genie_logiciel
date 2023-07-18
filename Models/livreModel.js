const mongoose = require('mongoose');

const livreSchema = new mongoose.Schema({
  id_client: { type: String, required: true },
  titre: { type: String, required: true },
  originalname: { type: String, required: true },
  filename: { type: String, required: true }
});

const Livre = mongoose.model('Livre', livreSchema);

module.exports = Livre;
