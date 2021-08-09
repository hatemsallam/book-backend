'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const jwt = require('jsonwebtoken');
// const jwksClient = require('jwks-rsa');

const mongoose = require('mongoose')
const server = express();

// const SchemaModel = require('./SchemaModel');

server.use(cors());

const PORT = process.env.PORT;



//MongoDB 
mongoose.connect('mongodb://localhost:27017/book', {useNewUrlParser: true, useUnifiedTopology: true});




// create a schema
const bookSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  email: String
});

const ownerSchema = new mongoose.Schema({
ownerName: String,
books : [bookSchema]
});


//compile the schema into a model
const myBookModel = mongoose.model('books', bookSchema);
const ownerModel = mongoose.model('Owner', ownerSchema);






function seedBookCollection() {
  const harryPotter = new myBookModel({ 
      title: 'HarryPotter',
    description: 'fantasy novel written by British author J. K. Rowling',
    status: 'Available',
    email: 'harrypotter@gmail.com'
  });

  const forrestGump = new myBookModel({ 
    title: 'Forrest Gump',
  description: 'Forrest Gump is a 1986 novel by Winston Groom',
  status: 'Available',
  email: 'forrestgump@gmail.com'
});

const theGodFather  = new myBookModel({ 
  title: 'The Godfather',
description: 'an absorbing, dark thriller that fascinates, horrifies, and entertains',
status: 'Available',
email: 'thegodfather@gmail.com'
});
  //save the data that we created 
  harryPotter.save();
  forrestGump.save();
  theGodFather.save();
}

// seedBookCollection();


function seedOwnerCollection() {
  const hatem = new ownerModel ({
      ownerName: 'hatem',
      books : [
          {
            title: 'HarryPotter',
            description: 'fantasy novel written by British author J. K. Rowling',
            status: 'Available',
            email: 'harrypotter@gmail.com'
          },
          {
            title: 'Forrest Gump',
            description: 'Forrest Gump is a 1986 novel by Winston Groom',
            status: 'Available',
            email: 'forrestgump@gmail.com'
          }
      ]
  })

  const abdalla = new ownerModel({
      ownerName: 'abdalla',
      books : [
          {
            title: 'The Godfather',
            description: 'an absorbing, dark thriller that fascinates, horrifies, and entertains',
            status: 'Available',
            email: 'thegodfather@gmail.com'
          }
      ]
  })

  hatem.save();
  abdalla.save();
}



// seedOwnerCollection();




// http://localhost:3001/
server.get('/book',getBooksHandler);




// http://localhost:3001/book?name=hatem
function getBooksHandler(req,res) {
  const reqOwnerName = req.query.name;
  // search 
  console.log(reqOwnerName)
  ownerModel.find({ownerName:reqOwnerName},function(err,resultData){
      if(err) {
          console.log('Error');
      }
      else {
          console.log(resultData);
          console.log(resultData[0].books);
          res.send(resultData[0].books);
      }
  })
}
server.listen(PORT,() => {
  console.log(`Listening on PORT ${PORT}`);
})




























  // TODO: 
  // STEP 1: get the jwt from the headers
  // STEP 2. use the jsonwebtoken library to verify that it is a valid jwt
  // jsonwebtoken dock - https://www.npmjs.com/package/jsonwebtoken
  // STEP 3: to prove that everything is working correctly, send the opened jwt back to the front-end


