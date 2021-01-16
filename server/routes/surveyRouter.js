const express = require('express');
const router = express.Router();

const surveyController = require('../controller/surveyController')

// post /addsurvey
router.post('/addsurvey', surveyController.createNewSurvey, (req, res) => {
    res.status(200).send('survey successfully added!');
});




module.exports = router;