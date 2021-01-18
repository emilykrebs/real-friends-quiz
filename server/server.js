const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT;
const mongoose = require('mongoose');

const MONGO_URI = require('./models/database');
const surveyRouter = require('./routes/surveyRouter');
const userRouter = require('./routes/userRouter');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());

// establish connection with mongoDB --->
mongoose.connect( MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once("open", () => console.log("connected to database"));

if (process.env.NODE_ENV === 'production') {
  // statically serve everything in the build folder on the route '/build'
  app.use('/build', express.static(path.join(__dirname, '../build')));
  // serve index.html on the route '/'
  app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../index.html'));
  });
};

// route requests to /survey endpoint to survey router --->
app.use('/survey', surveyRouter);

// route requests to /user endpoint to user router --->
app.use('/user', userRouter);

// general 404 handler for any other endpoints --->
app.use('*', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

// global error handler --->
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

/* .............................. SOCKET.IO ..............................  */

const http = require('http').Server(app);
const io = require('socket.io')(http);

http.listen(PORT || 3000, ()=>{
  console.log('connected to port 3000');
});

const Player = require('./Player.js');
const Room = require('./Room.js');

const rooms = [];

io.on('connection', (socket) => {

  socket.on('joinroom', data => {

    const newPlayer = new Player(data.name, socket.id);
    let target = {
      users: []
    };

    if (rooms.some(room => room.key === data.room)){
      target = rooms.filter(room => room.key === data.room)[0];
      target.users.push(newPlayer);
    } else {
      target = new Room(data.room, [newPlayer]);
      rooms.push(target);
    }

    socket.join(data.room);

    io.sockets.to(data.room).emit('joinedroom', target.users);
  });

});