const { auth } = require('../firebase');

const authenticate = (req, res, next) => {
  console.log(req.headers);
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
    res.status(403).send('Unauthorized');
    return;
  }
  const idToken = req.headers.authorization.split('Bearer ')[1];
  auth.verifyIdToken(idToken).then((decodedIdToken) => {
    req.user = decodedIdToken;
    next();
  }).catch(() => {
    res.status(403).send('Unauthorized');
  });
};

module.exports = authenticate;