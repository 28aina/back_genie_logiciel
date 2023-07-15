const mongoose = require("mongoose");

const connect_db_app = async  () => {
  try {
    const connection = await mongoose.connect('mongodb://localhost:27017/bibliothequeDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log(`MongoDB Connected`);

    
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit();
  }
};

module.exports =  connect_db_app