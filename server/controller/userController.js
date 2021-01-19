const User = require('../models/userModel');

// create a new User in db during sign-up/register --->
exports.postLogin = (req, res, next) => {
  const newUser = req.body;

  User.create(newUser)
  .then(data => {
    console.log('USER CREATED----->', data)
    res.locals.userId = data._id;
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


<<<<<<< HEAD
// verify user login credentials by comparing w/ database --->
=======
// verify user's login credentials --->
>>>>>>> 71b95e84a5f097f66d1d41d8c699f68b03ff33d5
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

// retrieves username for a specific user given the userId --->
exports.getUser = (req, res, next) => {
  User.findOne({_id: req.params.id})
    .then(data => {
      res.locals.username = data.username;
      return next();
    })
    .catch(err => {
      const errorObj = {
        message: `Error in user.getUser: error getting user from DB: ${err}`,
        log: 'Error in userController.getUser. Check error error logs'
      };
      return next(errorObj);
    })
}