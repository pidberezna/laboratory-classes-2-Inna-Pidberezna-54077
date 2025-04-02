const express = require('express');
const { getProcessLog } = require('../utils/logger');

const router = express.Router();

router.get('/', (req, res) => {
  console.log(getProcessLog());
  process.exit();
});

module.exports = router;
