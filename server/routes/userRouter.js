const express = require('express');
const router = express.Router();

const userController = require('../controller/userController');
const cookieController = require('../controller/cookieController');
const sessionController = require('../controller/sessionController');

// sign up
router.post('/register', userController.postLogin, (req, res) => {
    res.status(200).send('REGISTER WORKED');
})

// login
router.post('/login', 
  userController.verifyUser,
  sessionController.startSession,  
  cookieController.setSSIDCookie, 
  (req, res) => {
  res.status(200).json(res.locals.userId);
});

module.exports = router;