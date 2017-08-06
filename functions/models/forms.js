const admin = require('firebase-admin');
const { database } = require('../firebase');

const formRef = uid => database.ref(`/users/${uid}/forms`);
exports.create = (uid, form) => {
  const key = formRef(uid).push().key;
  const newData = Object.assign({}, form, {
    key,
    updatedAt: admin.database.ServerValue.TIMESTAMP,
    createdAt: admin.database.ServerValue.TIMESTAMP,
  });
  formRef(uid).child(key).set(newData);
}