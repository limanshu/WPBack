var settings = require('../settings');
var express = require('express');
var router = express.Router();
var Resource = require("APICloud").Resource;
var client = new Resource(settings.appId, settings.appKey);
var pcUser = client.Factory("PersonInfo");

router.get('/', function (req, res) {
        var q = req.query;
        console.log(q.name)
        pcUser.query({
                filter: {
                    include: [
                        "Picture",
                        "UserPointer",
                        "HeadPointer"
                    ]
                }
            }, function (ret, err) {
                if (err) {
                    return res(err);
                }
                if (q.name != '' && q.name != 'null') {
                    ret = ret.filter(data => data.Name.indexOf(q.name) > -1);
                }
                res.send(ret);
            }
        )

    }
);
router.patch('/', function (req, res) {
    // console.log(req.body.id)
    // console.log(req.body.Head.id)
    var id = req.body.id;
    var Name = req.body.Name;
    var AlipayNum = req.body.AlipayNum;
    var Address = req.body.Address;
    var EmployeeNum = req.body.EmployeeNum;
    var Head = req.body.Head.id;
    var Tel = req.body.Tel;
    var Sex = req.body.Sex;
    pcUser.save({"_id": id}, {
            Name: Name,
            Tel: Tel,
            Address: Address,
            Sex: Sex,
            Head: Head,
            AlipayNum:AlipayNum,
            EmployeeNum:EmployeeNum,
        },
        function (ret) {
            console.log(ret)
            return res.send(ret)
        }
    )
});
// router.post('/Orders', function (req, res) {
//
//     var workerID = req.body.workerID;
//     var orderID = req.body.orderID;
//     console.log('workerID' + workerID + 'orderID' + orderID + 'status' + req.body.status)
//     worker.save({"_id": workerID, "_relation": "Orders"}, {
//         "OrderID": orderID, "Status": orderStatus.filter(item => item.code === parseInt(req.body.status))[0].id,
//         "Memo": ''
//     }, function (ret, err) {
//         console.log("Model insert:" + JSON.stringify(ret))
//         console.log("Model insert:" + JSON.stringify(err))
//     })
// })
router.get('/ID:', function (req, res) {
        var id = req.query.id;
        console.log(id)
        pcUser.query({
                filter: {
                    "where": {
                        "_id": id
                    },
                    include: [
                        "Picture",
                        "UserPointer",
                        "HeadPointer"
                    ]
                }
            }, function (ret, err) {
                if (err) {
                    return res.send(err);
                }
                res.send(ret);
            }
        )

    }
);


module.exports = router;
