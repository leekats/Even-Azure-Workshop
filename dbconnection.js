var DocumentDBClient = require('documentdb').DocumentClient;
var config = require('./config');

exports.client = new DocumentDBClient(config.dbhost, {
    masterKey: config.dbkey
  });