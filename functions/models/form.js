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
  return formRef(uid).child(key).set(newData);
};

exports.delete = (uid, formIds) => {
  const updatedFormData = formIds.reduce((updatedFormData, formId) => {
    updatedFormData[`/users/${uid}/forms/${formId}`] = null;
    updatedFormData[`/users/${uid}/formItems/${formId}`] = null;
    return updatedFormData;
  }, {});
  return database.ref().update(updatedFormData)
};

exports.update = (uid, { formId, data }) => {
  return database.ref(`/users/${uid}/forms/${formId}`)
    .update(data);
}