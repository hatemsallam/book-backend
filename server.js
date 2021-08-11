'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const jwt = require('jsonwebtoken');
// const jwksClient = require('jwks-rsa');

const mongoose = require('mongoose')
const server = express();

const Collections = require('./Collections');

server.use(cors());

const PORT = process.env.PORT;



//MongoDB 
mongoose.connect('mongodb://localhost:27017/book', {useNewUrlParser: true, useUnifiedTopology: true});











function seedBookCollection() {
  const harryPotter = new Collections.myBookModel({ 
      title: 'HarryPotter',
    description: 'fantasy novel written by British author J. K. Rowling',
    status: 'Available',
    image : 'https://is5-ssl.mzstatic.com/image/thumb/Music124/v4/b4/37/51/b437512a-7568-3b89-efae-fb9b95f373c3/HP8Film_V_DD_KA_TT_2000x3000_300dpi_CA.jpg/1200x630bb.png'
    
  });

  const forrestGump = new Collections.myBookModel({ 
    title: 'Forrest Gump',
  description: 'Forrest Gump is a 1986 novel by Winston Groom',
  status: 'Available',
  image: 'https://play-lh.googleusercontent.com/ToGy2Cue0epHBdeRkq3dntz8on4ogI1UlKLGqMvgCptTwmpMWVkIxojwVUuvIjrMIFz2UiNjW73xcuofHQ'
  
});

const theGodFather  = new Collections.myBookModel({ 
  title: 'The Godfather',
description: 'an absorbing, dark thriller that fascinates, horrifies, and entertains',
status: 'Available',
image: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/06/73/23/1c.jpg'

});
  // save the data that we created 
  // harryPotter.save();
  // forrestGump.save();
  // theGodFather.save();
}

// seedBookCollection();


function seedOwnerCollection() {
  const hatem = new Collections.ownerModel ({
      email: 'hatemsallam15@gmail.com',
      books : [
          {
            title: 'HarryPotter',
            description: 'fantasy novel written by British author J. K. Rowling',
            status: 'Available',
            image: 'https://is5-ssl.mzstatic.com/image/thumb/Music124/v4/b4/37/51/b437512a-7568-3b89-efae-fb9b95f373c3/HP8Film_V_DD_KA_TT_2000x3000_300dpi_CA.jpg/1200x630bb.png'
            
          },
          {
            title: 'Forrest Gump',
            description: 'Forrest Gump is a 1986 novel by Winston Groom',
            status: 'Available',
            image: 'https://play-lh.googleusercontent.com/ToGy2Cue0epHBdeRkq3dntz8on4ogI1UlKLGqMvgCptTwmpMWVkIxojwVUuvIjrMIFz2UiNjW73xcuofHQ'
            
          }
      ]
  })

  const abdalla = new Collections.ownerModel({
      email: 'a.hirzalla@hotmail.com',
      books : [
          {
            title: 'The Godfather',
            description: 'an absorbing, dark thriller that fascinates, horrifies, and entertains',
            status: 'Available',
            image : 'https://media.tacdn.com/media/attractions-splice-spp-674x446/06/73/23/1c.jpg'
          }
      ]
  })

  // hatem.save();
  // abdalla.save();
}



// seedOwnerCollection();




// http://localhost:3001/
server.get('/books',getBooksHandler);




// http://localhost:3001/books?email=hatemsallam15@gmail.com
function getBooksHandler(req,res) {
  const email = req.query.email;
  // search 
  console.log(email)
  Collections.ownerModel.find({email:email},function(err,resultData){
      if(err) {
          console.log('Error');
      }
      else {
          console.log(resultData[0]);
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


