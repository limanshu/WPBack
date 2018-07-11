var settings = require('../settings');
var express = require('express');
var router = express.Router();
var Resource = require("APICloud").Resource;
var client = new Resource(settings.appId, settings.appKey);
var user = client.Factory("user");

router.post('/', function (req, res) {
    user.login({"username": req.body.username, "password": req.body.password},
        function (ret, err) {
            if (err) {
                res.send(err)
            }
            if (ret.error) {
                res.send({status: 'Error', message: ret.error.message, code: ret.error.status});
                return;
            } else {
                res.send({status: 'SUCCESS', message: ret});
                return;
            }
        });
})

module.exports = router;
