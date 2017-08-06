const express = require('express')
  , router = express.Router()

router.use('/forms', require('./forms'))

module.exports = router