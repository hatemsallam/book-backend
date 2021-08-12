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

const hunterXhunter  = new Collections.myBookModel({ 
  title: 'Hunter x Hunter',
description: 'Hunter x Hunter is a 1986 novel by Winston Groom',
status: 'Available',
image: 'https://m.media-amazon.com/images/M/MV5BZjNmZDhkN2QtNDYyZC00YzJmLTg0ODUtN2FjNjhhMzE3ZmUxXkEyXkFqcGdeQXVyNjc2NjA5MTU@._V1_.jpg'

});

const attackOnTitan  = new Collections.myBookModel({ 
  title: 'Attack on titan',
description: 'Attack on titan is a 1986 novel by Winston Groom',
status: 'Available',
image: 'https://static2.cbrimages.com/wordpress/wp-content/uploads/2020/09/Attack-on-Titan-Final-Season-Poster-Header.jpg'

});


  // save the data that we created 
  // harryPotter.save();
  // forrestGump.save();
  // theGodFather.save();
  // attackOnTitan.save();
  // hunterXhunter.save();
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
            
          },
          {
            title: 'Attack on titan',
            description: 'Attack on titan is a 1986 novel by Winston Groom',
            status: 'Available',
            image: 'https://static2.cbrimages.com/wordpress/wp-content/uploads/2020/09/Attack-on-Titan-Final-Season-Poster-Header.jpg'
            
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
          },
          {
            title: 'Forrest Gump',
            description: 'Forrest Gump is a 1986 novel by Winston Groom',
            status: 'Available',
            image: 'https://play-lh.googleusercontent.com/ToGy2Cue0epHBdeRkq3dntz8on4ogI1UlKLGqMvgCptTwmpMWVkIxojwVUuvIjrMIFz2UiNjW73xcuofHQ'
            
          },
          {
            title: 'Hunter x Hunter',
            description: 'Hunter x Hunter is a 1986 novel by Winston Groom',
            status: 'Available',
            image: 'https://m.media-amazon.com/images/M/MV5BZjNmZDhkN2QtNDYyZC00YzJmLTg0ODUtN2FjNjhhMzE3ZmUxXkEyXkFqcGdeQXVyNjc2NjA5MTU@._V1_.jpg'
            
          }
      ]
  })

  // hatem.save();
  // abdalla.save();
}



// seedOwnerCollection();




// http://localhost:3001/
server.get('/books',getBooksHandler);
server.post('/books',addBooksHandler);
server.delete('/books/:id',deleteBooksHandler)
server.put('/book/:id',updateBooksHandler)




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

// http://localhost:3001/books
function addBooksHandler(req,res) {
  
  // const ownerName = req.body.ownerName;
  // const catName = req.body.catName;
  // const catBreed = req.body.catBreed;
  
  // Restructuring assignment
  const {email, title, description, status } = req.body;
  console.log(req.body);
  const newBook= {title:title, description:description, status:status}
  Collections.ownerModel.find({email : email},(err,resultData) => {
      if(err)
      {
          res.send('not working');
      }
      else
      {
        console.log(email);
        console.log(resultData[0].books);
         resultData[0].books.push(newBook);
         resultData[0].save();
         res.send(newBook);
      }
  })
  
}

function deleteBooksHandler(req,res) {
const index = req.params.id ;
const email = req.query.email ; 

Collections.ownerModel.find({email:email},(err,resultData) => {

  if(err)
  {
      res.send('not working');
  }
  else {
    const deleteBook = resultData[0].books.filter((book,idx)=> idx != index);
    resultData[0].books = deleteBook ; 
    resultData[0].save()
    res.send(resultData[0].books)
  }



})


}

function updateBooksHandler  (req,res) {
  const id = req.params.id; 
  const {email, title, description, status } = req.body;
  console.log(email,title , description , status)
  Collections.ownerModel.findOne({email: email}, (err, resultData) =>{
    if(err) {
      res.status(500).send('Error',err);
    }
    else {
      console.log(resultData)
     resultData.books.splice(id , 1 , {
      title : title,
      description : description,
      status : status
     })
      resultData.save();
      res.status(200).send(resultData.books);
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


