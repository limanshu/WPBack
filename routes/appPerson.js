var settings = require('../settings');
var express = require('express');
var router = express.Router();
var Resource = require("APICloud").Resource;
var client = new Resource(settings.appId, settings.appKey);
var person = client.Factory("APPPersonInfo");
var role = client.Factory("AppRole")
var roles = role.get(function (ret) {
    return ret;
})
// var Status = client.Factory("WorkerStatus")
// var workerOrderStatus = client.Factory('WorkerOrderStatus')
// var status;
// var orderStatus;
// Status.get(function (ret) {
//     status = ret;
// })
// workerOrderStatus.get(function (ret) {
//     orderStatus = ret;
// })


// router.patch('/', function (req, res) {
//     var WorkerID = req.body.WorkerID;
//     var statu = req.body.status;
//     var id = req.query.id
//     worker.save({"_id": id}, {
//             "WorkerID": WorkerID,
//             Status: status.filter(item => item.code === parseInt(statu))[0].id,
//         },
//         function (ret) {
//             console.log(ret)
//             return res.send(ret)
//         }
//     )
// });
var list = [];
var rolelist = [1, 7, 8]
router.get('/', function (req, res) {
        var q = req.query;
        console.log(q.role)
        person.query({
                filter: {
                    include: [
                        "RolePointer",
                        "HeadPointer",
                        "DistributorPointer",
                        {"RefereePointer": ["RolePointer", "HeadPointer"]},
                    ],
                    limit: 40,

                },

            }, function (ret, err) {

                if (q.role == 3 || q.role == 4 || q.role == 5) {

                    ret = ret.filter(data => q.role.indexOf(data.Role.Code) > -1);
                }

                if (q.role == 6) {
                    ret = ret.filter(data => rolelist.indexOf(data.Role.Code) > -1);

                  //  ret = ret.filter(data => data.Referee !== null)
                    ret.map(i => {
                        if (i.Referee != null) {
                            list.push(i.Referee)
                        }
                    })
                   ret = uniqueArray(list, 'id')
                    list.length = 0;
                    for (var i = 0; i < ret.length; i++) {
                        ret[i]["Head"] = ret[i]["HeadPointer"];
                        delete ret[i]["HeadPointer"];
                        ret[i]["Role"] = ret[i]["RolePointer"];
                        delete ret[i]["RolePointer"];
                    }
                    console.log(ret.length)
                    // for (var i = 0; i < list.length; i++) {
                    //     list2.push(ret.filter(data => list[i].id.indexOf(data.id)))
                    // }
                    // console.log(list2)
                    //
                    // return;
                    // console.log(listid)
                    //   ret= ret.uniquelize().each(function(o){return list.contains(o) ? o : null});
                    // ret = ret.filter(data => list.id.indexOf(data.id))

                    // ret.map( data=>{ });
                    // console.log(ret)

                }
                if (q.role == 7) {


                }
                // if (q.Name != '' && q.Name != 'null') {
                //     ret = ret.filter(data => data.Name.indexOf(q.Name) > -1);
                // }
                res.send(ret);
            }
        )
    }
);

function getNormalSharePerson(data) {
    return data.id
}

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
//             }, function (ret, err) {
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
Array.prototype.each = function (fn) {
    fn = fn || Function.K;
    var a = [];
    var args = Array.prototype.slice.call(arguments, 1);
    for (var i = 0; i < this.length; i++) {
        var res = fn.apply(this, [this[i], i].concat(args));
        if (res != null) a.push(res);
    }
    return a;
};
Array.prototype.uniquelize = function () {
    var ra = new Array();
    for (var i = 0; i < this.length; i++) {
        if (!ra.contains(this[i])) {
            ra.push(this[i]);
        }
    }
    return ra;
};

/*
 * JSON数组去重
 * @param: [array] json Array
 * @param: [string] 唯一的key名，根据此键名进行去重
 */
function uniqueArray(array, key) {
    var result = [array[0]];
    for (var i = 1; i < array.length; i++) {
        var item = array[i];
        var repeat = false;
        for (var j = 0; j < result.length; j++) {
            if (item[key] == result[j][key]) {
                repeat = true;
                break;
            }
        }
        if (!repeat) {
            result.push(item);
        }
    }
    return result;
}

function base64_decode(base64str, file) {
    var bitmap = new Buffer(base64str.split(',')[1], 'base64');
    fs.writeFileSync(file, bitmap);
}

module.exports = router;
