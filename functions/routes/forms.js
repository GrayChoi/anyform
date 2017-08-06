const { Router } = require('express');

const router = Router();

router.post('/', (req, res) => {
  console.log(req.body);
  res.status(200).json({
    name: 'form1'
  })
});

module.exports = router;