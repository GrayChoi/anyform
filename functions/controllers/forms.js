const { Router } = require('express');
const formsModel = require('../models/forms');

const router = Router();

router.post('/', (req, res) => {
  const uid = req.user.uid;

  formsModel.create(uid, req.body);
  res.end();
});

module.exports = router;