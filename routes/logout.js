var settings = require('../settings');
var express = require('express');
var router = express.Router();
var Resource = require("APICloud").Resource;
var client = new Resource(settings.appId, settings.appKey);
var user = client.Factory("user");

router.post('/',function (req,res) {
    console.log(req.body.token);
    client.setHeaders("authorization", req.body.token)
    user.logout({"token":req.body.token},
        function (ret, err) {
            if (ret) {
                res.send(ret);
            } else if (err) {
                res.send(err);
            }
        });
})
module.exports = router;
