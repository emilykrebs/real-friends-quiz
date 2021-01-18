const Survey = require('../models/surveyModel');

// creates a new survey in database --->
exports.createNewSurvey = (req, res, next) => {
  const newSurvey = req.body;

  Survey.create({ questions: newSurvey })
  .then(data => {
    res.locals.roomId = data._id;
    next();
  })
  .catch(err => {
    const errorObj = {
      message: `Error in surveyController.createNewSurvey: ${err}`,
      log: 'Error in surveyController.createNewSurvey: Check error log',
      };
    next(errorObj);
  });
};

// retrieves survey information from database given the survey id --->
exports.getSurveyID = (req, res, next) => {
  const findSurveyID = req.params.id;
  
  Survey.findOne({ _id : findSurveyID})
  .then(result => {
    if (!result) {
      res.locals.verifySurvey = false;
    } else {
      res.locals.verifySurvey = true;
    };
    return next(); 
  })
  .catch(err => {
    res.locals.verifySurvey = false;
    return next();
  });
};
