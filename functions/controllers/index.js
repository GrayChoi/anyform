const express = require('express')
  , router = express.Router()

router.use('/form', require('./form'))

module.exports = router