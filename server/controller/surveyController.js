const Survey = require('../models/surveyModel');

exports.createNewSurvey = (req, res, next) => {
  const newSurvey = req.body;

  Survey.create({ questions: newSurvey })
  .then(data => {
    console.log('SURVEY CREATE DATA----->',data)
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
