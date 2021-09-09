const exp = require('express');
const router = new exp.Router();
const { adminControl } = require('../controls');

router.post('/', adminControl.checkSuperAdmin);

module.exports = router;
