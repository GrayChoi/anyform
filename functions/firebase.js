const admin = require('firebase-admin');
const functions = require('firebase-functions');

if (global.__DEV__) {
  const serviceAccount = require('./anyform.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://anyform-e1843.firebaseio.com/"
  });
} else {
  admin.initializeApp(functions.config().firebase);
}

exports.admin = admin;
exports.database = admin.database();
exports.auth = admin.auth();