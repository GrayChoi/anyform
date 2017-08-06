const { Router } = require('express');
const formsModel = require('../models/forms');

const router = Router();

router.post('/', (req, res) => {
  const uid = req.user.uid;

  formsModel.create(uid, req.body)
    .then(() => res.end())
    .catch(error => res.status(422).send({ error: error.message }));
});

router.post('/deletes', (req, res) => {
  const uid = req.user.uid;
  formsModel.delete(uid, req.body)
    .then(() => res.end())
    .catch(error => res.status(422).send({ error: error.message }));
});

router.put('/:formId', (req, res) => {
  const uid = req.user.uid;
  const formId = req.params.formId;
  formsModel.update(uid, { formId, data: req.body })
    .then(() => res.end())
    .catch(error => res.status(422).send({ error: error.message }));
});

module.exports = router;