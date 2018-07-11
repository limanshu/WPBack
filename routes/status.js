var settings = require('../settings');
var express = require('express');
var router = express.Router();
var Resource = require("APICloud").Resource;
var client = new Resource(settings.appId, settings.appKey);
var Status = client.Factory("WorkerStatus");

router.get('/', function (req, res) {
    Status.get(function (ret) {
        res.send(ret);
    })
})

module.exports = router;
