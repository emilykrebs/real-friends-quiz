
exports.setSSIDCookie = (req, res, next) => { 
  const { userId } = res.locals;
  res.cookie('ssid', userId, {httpOnly: true});
  console.log('SET COOKIE IN SSID----->', res.get('Set-Cookie'));
  return next()
};

