const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ api: true });
});

module.exports = router;
