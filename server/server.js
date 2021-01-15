const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT;
const mongoose = require('mongoose');


app.use(express.urlencoded({extended: true}));
app.use(express.json());

const MONGO_URI = 'mongodb+srv://mole:mole@friends-scratch-project.5ohhn.mongodb.net/friends?retryWrites=true&w=majority';
mongoose.connect( MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once("open", () => console.log("connected to database"));

//get request for question

//get request for user registor

//post 

if (process.env.NODE_ENV === 'production') {
  // statically serve everything in the build folder on the route '/build'
  app.use('/build', express.static(path.join(__dirname, '../build')));
  // serve index.html on the route '/'
  app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../index.html'));
  });
}

app.listen(PORT || 3000);