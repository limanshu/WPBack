var settings = require('../settings');
var express = require('express');
var router = express.Router();
var Resource = require("APICloud").Resource;
var client = new Resource(settings.appId, settings.appKey);
var workers = client.Factory("user");

router.get('/',function (req,res) {
    workers.get(function (ret,err) {
        res.send(ret);
    })

})

module.exports = router;
