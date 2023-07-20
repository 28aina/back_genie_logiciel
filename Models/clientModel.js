const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;


const clientSchema = new mongoose.Schema({
  username:  { type: String, required: true },
  email:  {type: String, required: true },
  telephone:  { type: String, required: true },
  password: { type: String,required: true },
});

const Client = mongoose.model('Client', clientSchema); // clients nom table dans mongoDB 

module.exports = Client
