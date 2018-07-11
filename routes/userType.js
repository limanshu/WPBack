var settings = require('../settings');
var express = require('express');
var router = express.Router();
var Resource = require("APICloud").Resource;
var client = new Resource(settings.appId, settings.appKey);
var userType = client.Factory("UserType");

var q = {
    data: 1
}
var type={}
userType.get(function (ret) {

  //   console.log(ret)//成功
    type = ret.filter(data => data.TypeCode===q.data)
    // ${ret.Name}
  //  type = ret.filter(data => data.TypeCode===q.data)[0]

    console.log(type)

})
console.log(type)
router.get('/', function (req, res) {


    userType.get(function (ret) {
        res.send(ret);
    })


})

module.exports = router;
