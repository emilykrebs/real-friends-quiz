const User = require('../models/userModel');

exports.postLogin = (req, res, next) => {
    const newUser = req.body;
    // console.log('NEW USER CREATED' , newUser)

  User.create(newUser)
  .then(data => {
    console.log('USER CREATED----->', data)
    next();
  })
  .catch(err => {
    const errorObj = {
      message: `Error in user.postLogin: error creating user in DB: ${err}`,
      log: 'Error in userController.postLogin. Check error error logs'  
    }
    next(errorObj);
  });
};


//verify user

exports.verifyUser =(req, res, next)=>{
  const userLogin = req.body;
  User.findOne(userLogin)
  .then(data => {
    if (data === null) return res.redirect('/user/register');
    console.log('VERIFY USER DATA---->', data);
    res.locals.userId = data._id;
    next();
  })
  .catch(err => {
    const errorObj = {
      message: `Error in user.verifyUser: error creating user in DB: ${err}`,
      log: 'Error in userController.verifyUser. Check error error logs'
    };
    next(errorObj);
  });
};