var settings = require('../settings');
var express = require('express');
var router = express.Router();
var Resource = require("APICloud").Resource;
var client = new Resource(settings.appId, settings.appKey);
var user = client.Factory("user");
var UserType = client.Factory("UserType");
var Types;
UserType.get(function (ret) {
    Types = ret;
})
router.post('/', function (req, res) {


    var username = req.body.username;
    var password = req.body.password;
    var mobile = req.body.mobile;
    var email = req.body.email;
    user.save({
        username: username,
        password: password,
        mobile: mobile,
        email: email,
        UserType: Types.filter(item => item.TypeCode === parseInt(req.body.userType))[0].id,
    }, function (ret) {
        return res.send(ret);
    })
})

module.exports = router;
