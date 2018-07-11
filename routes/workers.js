var settings = require('../settings');
var express = require('express');
var router = express.Router();
var Resource = require("APICloud").Resource;
var client = new Resource(settings.appId, settings.appKey);
var worker = client.Factory("workers");
var Status = client.Factory("WorkerStatus")
var workerOrderStatus= client.Factory('WorkerOrderStatus')
var status;
var orderStatus;
Status.get(function (ret) {
    status=ret;
})
workerOrderStatus.get(function (ret) {
    orderStatus = ret;
})


router.patch('/', function (req, res) {
    var WorkerID = req.body.WorkerID;
    var statu = req.body.status;
    var id = req.query.id
    worker.save({"_id": id}, {
            "WorkerID": WorkerID,
            Status: status.filter(item => item.code === parseInt(statu))[0].id,
        },
        function (ret) {
            console.log(ret)
            return res.send(ret)
        }
    )
});
router.get('/', function (req, res) {
        var q = req.query;
        console.log(q)
        worker.query({
                filter: {
                    include: [
                        "StatusPointer",
                        "WorkerAreaPointer",
                        "HeadPointer"
                    ]
                }
            }, function (ret, err) {
                if (err) {
                    return res(err);
                }
                if (q.Status != '' && q.Status != 'null') {

                    ret = ret.filter(data => q.Status.indexOf(data.Status.code) > -1);
                }
                if (q.Name != '' && q.Name != 'null') {
                    ret = ret.filter(data => data.Name.indexOf(q.Name) > -1);
                }
                res.send(ret);
            }
        )

    }
);
router.post('/Orders', function (req, res) {

    var workerID = req.body.workerID;
    var orderID = req.body.orderID;
    console.log('workerID'+workerID+'orderID'+orderID+'status'+req.body.status)
    worker.save({"_id": workerID, "_relation": "Orders"}, {
        "OrderID": orderID, "Status": orderStatus.filter(item => item.code === parseInt(req.body.status))[0].id,
        "Memo":''
    }, function (ret, err) {
        console.log("Model insert:" + JSON.stringify(ret))
        console.log("Model insert:" + JSON.stringify(err))
    })
})
router.get('/ID:', function (req, res) {
        var id = req.query.id;
        console.log(id)
        worker.query({
                filter: {
                    "where": {
                        "_id": id
                    },
                    include: [
                        "StatusPointer",
                        "WorkerAreaPointer",
                        "HeadPointer",
                        "Picture"
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
                res.send(ret);
            }
        )

    }
);

function base64_decode(base64str, file) {
    var bitmap = new Buffer(base64str.split(',')[1], 'base64');
    fs.writeFileSync(file, bitmap);
}

module.exports = router;
