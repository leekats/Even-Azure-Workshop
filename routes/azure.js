var express = require('express');
var router = express.Router();
var azureSasCtr = require('../controllers/azuresas');

router.route('/getDownloadSas').post(azureSasCtr.getDownloadSas);
router.route('/getStorageHost').get(azureSasCtr.getStorageHost);

module.exports = router;
 