var express = require('express');
var router = express.Router();
var ctrDatabase = require('../controllers/ctrDatabase');


/* Gets detects for a given collection */
router.route('/get').get(ctrDatabase.getData);

module.exports = router;
