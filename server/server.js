const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT;
const mongoose = require('mongoose');

const surveyRouter = require('./routes/surveyRouter');
const userRouter = require('./routes/userRouter');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// establish connection with mongoDB --->
const MONGO_URI = 'mongodb+srv://mole:mole@friends-scratch-project.5ohhn.mongodb.net/friends?retryWrites=true&w=majority';
mongoose.connect( MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once("open", () => console.log("connected to database"));


if (process.env.NODE_ENV === 'production') {
  // statically serve everything in the build folder on the route '/build'
  app.use('/build', express.static(path.join(__dirname, '../build')));
  // serve index.html on the route '/'
  app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../index.html'));
  });
}

// route requests to /survey endpoint to survey router --->
app.use('/survey', surveyRouter);

// route requests to /user endpoint to user router --->
app.use('/user', userRouter);

// general 404 handler for any other endpoints --->
app.use('*', (req, res) => {
  res.status(404).send('Not Found');
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

app.listen(PORT || 3000);