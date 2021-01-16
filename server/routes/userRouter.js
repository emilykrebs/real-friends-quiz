const express = require('express');
const router = express.Router();

const userController = require('../controller/userController')

// sign up
router.post('/register', userController.postLogin, (req, res) => {
    res.status(200).send('REGISTER WORKED');
})

// login
router.post('/login', userController.verifyUser, (req, res) => {
  res.status(200).json(res.locals.userId);
});

module.exports = router;