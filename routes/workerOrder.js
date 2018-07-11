var settings = require('../settings');
var express = require('express');
var router = express.Router();
var Resource = require("APICloud").Resource;
var client = new Resource(settings.appId, settings.appKey);
var order = client.Factory("WorkerOrder");
var orderStatus = client.Factory("orderStatus");
var workerOrderStatus= client.Factory('WorkerOrderStatus')

router.get('/', function (req, res) {


    order.get(function (ret) {
        res.send(ret);
    })


})
router.post('/',function (req,res) {
    var orderID= req.body.orderID;
    order.save({
        OrderID: orderID,
        Status: workerOrderStatus.filter(item => item.code === parseInt(req.body.status))[0].id,
    }, function (ret) {
        return res.send(ret);
    })

})

module.exports = router;
