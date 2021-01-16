const express = require('express');
const router = express.Router();

const surveyController = require('../controller/surveyController');
const sessionController = require('../controller/sessionController');

// post /addsurvey
router.post('/addsurvey', sessionController.isLoggedIn, surveyController.createNewSurvey, (req, res) => {
    res.status(200).json(res.locals.roomId);
});

module.exports = router;