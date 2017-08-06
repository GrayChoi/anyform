const functions = require('firebase-functions');
const bodyParser = require('body-parser');
const express = require('express');
const auth = require('./middlewares/auth')
const controllers = require('./controllers');

const app = new express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(auth);

app.use(controllers);

exports.api = functions.https.onRequest(app);