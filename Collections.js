const mongoose = require('mongoose')





modelObject= {}

// create a schema
const bookSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: String,
    image : String
  });
  
  const ownerSchema = new mongoose.Schema({
  email: String,
  books : [bookSchema]
  });
  
  
  //compile the schema into a model
  modelObject.myBookModel = mongoose.model('books', bookSchema);
  modelObject.ownerModel = mongoose.model('Owner', ownerSchema);



  module.exports= modelObject;

