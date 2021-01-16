const Survey = require('../models/surveyModel');

exports.createNewSurvey = (req, res, next) => {
  const newSurvey = req.body;

  //console.log('COOKIE---->', res.get('Set-Cookie'));
  console.log('COOKIE---->', req.cookie);

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
