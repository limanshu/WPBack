var settings = require('../settings');
var express = require('express');
var router = express.Router();
var Resource = require("APICloud").Resource;
var client = new Resource(settings.appId, settings.appKey);
var orders = client.Factory("WaterpurifierOrder");
var Status = client.Factory("orderStatus");
  var OrderStatus;
Status.get(function (ret) {
    OrderStatus=ret;
})
// var Status = client.Factory("Wo
// })
// // var Status = client.Factory("WorkerStatus")
// var status;
// Status.get(function (ret) {
//     status = ret;
// })
router.patch('/', function (req, res) {
    var status = req.body.status;
    var id = req.query.orderID;
    console.log(id+"id...........")
    console.log(status+"status////////")
    orders.save({"_id":id}, {
            "orderStatus": OrderStatus.filter(item => item.code === parseInt(status))[0].id,
        },
        function (ret) {
            return res.send(ret)
        }
    )
});
router.get('/', function (req, res) {
        // var orderStatus = [];
      var    orderStatus = req.query.status;
        var OrderID = req.query.orderID;
        orders.query({
                filter: {
                    include: [
                        "PersonPointer",
                        "waterpurifierBrandPointer",
                        "orderStatusPointer",
                        "BookingFeeStatusPointer",
                    ]
                }
            }, function (ret, err) {
                if (err) {
                    return res(err);
                }
                // if (q.Status != '' && q.Status != 'null') {
                //
                //     ret = ret.filter(data => q.Status.indexOf(data.Status) > -1);
                // }
                // if (q.Name != '' && q.Name != 'null') {
                //     ret = ret.filter(data => data.Name.indexOf(q.Name) > -1);
                // }

                if (orderStatus !== 'null'&&orderStatus !== '') {
                    // console.log("查询status"+orderStatus)
                    ret = ret.filter(data => orderStatus.indexOf(data.orderStatus.code) > -1);
                }
                res.send(ret);
            }
        )
    }
);
// router.get('/ID:', function (req, res) {
//         var id = req.query.id;
//         console.log(id)
//         worker.query({
//                 filter: {
//                     "where": {
//                         "_id": id
//                     },
//                     include: [
//                         "StatusPointer",
//                         "WorkerAreaPointer",
//                         "HeadPointer",
//                         "Picture"
//                     ]
//                 }
//             },function (ret, err) {
//                 if (err) {
//                     return res(err);
//                 }
//                 // if (q.Status != '' && q.Status != 'null') {
//                 //
//                 //     ret = ret.filter(data => q.Status.indexOf(data.Status) > -1);
//                 // }
//                 // if (q.Name != '' && q.Name != 'null') {
//                 //     ret = ret.filter(data => data.Name.indexOf(q.Name) > -1);
//                 // }
//                 res.send(ret);
//             }
//         )
//
//     }
// );


module.exports = router;
