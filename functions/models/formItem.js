const admin = require('firebase-admin');
const { database } = require('../firebase');

exports.create = (uid, { formId, formItem }) => {
  const formItemId = database.ref(`/users/${uid}/${formId}`).push().key;
  const newData = Object.assign({}, formItem, {
    key: formItemId,
    updatedAt: admin.database.ServerValue.TIMESTAMP,
    createdAt: admin.database.ServerValue.TIMESTAMP,
  });
  return database.ref(`/users/${uid}/formItems/${formId}/${formItemId}`).set(newData);
};

exports.delete = (uid, { formId, formItemId }) => {
  return database.ref(`/users/${uid}/formItems/${formId}/${formItemId}`)
    .remove();
};