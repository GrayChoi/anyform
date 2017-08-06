const functions = require('firebase-functions');
const { auth, database } = require('./firebase');
const bodyParser = require('body-parser');
const express = require('express');
const routes = require('./routes');

const app = new express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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


app.use(authenticate);

routes(app);

exports.api = functions.https.onRequest(app);