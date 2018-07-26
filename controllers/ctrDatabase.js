var express = require('express');
var app = express();
var DocumentDBClient = require('documentdb').DocumentClient;
var cosmos = require('../dbconnection');

exports.getData = (req, res) => {
    var queryString = "SELECT c.blobName, c.data, c.senderName, c._ts FROM root c ORDER BY c._ts DESC";
    const header = 'dbs/Workshop/colls/result';
    queryExecution(header, queryString, res);
}

let queryExecution = (header, queryString, res) => {
    cosmos.client.queryDocuments(header, queryString).toArray((err, obj) => {
        if (err) {
            console.log(err);
            res.send([]);
        }
        else {
            res.send(obj);
        }
    });
}