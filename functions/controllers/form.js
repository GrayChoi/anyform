const { Router } = require('express');
const formModel = require('../models/form');
const formItemModel = require('../models/formItem');

const router = Router();

router.post('/', (req, res) => {
  const uid = req.user.uid;

  formModel.create(uid, req.body)
    .then(() => res.end())
    .catch(error => res.status(422).send({ error: error.message }));
});

router.post('/deletes', (req, res) => {
  const uid = req.user.uid;
  formModel.delete(uid, req.body)
    .then(() => res.end())
    .catch(error => res.status(422).send({ error: error.message }));
});

router.put('/:formId', (req, res) => {
  const uid = req.user.uid;
  const formId = req.params.formId;
  formModel.update(uid, { formId, data: req.body })
    .then(() => res.end())
    .catch(error => res.status(422).send({ error: error.message }));
});

router.post('/:formId/formItem', (req, res) => {
  const uid = req.user.uid;
  const formId = req.params.formId;
  formItemModel.create(uid, { formId, formItem: req.body })
    .then(() => res.end())
    .catch(error => res.status(422).send({ error: error.message }));  
});

router.delete('/:formId/formItem/:formItemId', (req, res) => {
  const uid = req.user.uid;
  const { formId, formItemId } = req.params;
  formItemModel.delete(uid, { formId, formItemId })
    .then(() => res.end())
    .catch(error => res.status(422).send({ error: error.message }));  
});

module.exports = router;