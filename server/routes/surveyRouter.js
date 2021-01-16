const express = require('express');
const router = express.Router();

const surveyController = require('../controller/surveyController');
const sessionController = require('../controller/sessionController');

// post /addsurvey
router.post('/addsurvey', sessionController.isLoggedIn, surveyController.createNewSurvey, (req, res) => {
    res.status(200).json(res.locals.roomId);
});

// get request to see if surveyID match with front end
router.get('/:id', 
    (req, res, next) => {
        console.log('in first /:id middleware');
        return next();
    },
    surveyController.getSurveyID, (req, res) => {
    res.status(200).json(res.locals.verifySurvey);
});

module.exports = router;