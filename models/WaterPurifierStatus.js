var Resource = require("APICloud").Resource;
var settings = require('../settings');
var client = new Resource(settings.appId, settings.appKey);
var WaterPurifierStatus_BackStage = client.Factory("WaterpurifierStatus");
var MachineStatus = client.Factory("MachineStatus");

function WaterPurifierStatus(Order) {

};

WaterPurifierStatus.getAll = function (q, callback) {
    console.log(JSON.stringify(q) + "-- StatusName")
    WaterPurifierStatus_BackStage.query(
        {
            filter: {
                include: ["WPBrandPointer", "StatusPointer", "Repair", "UserPointer", "AnnualFee","OrderPointer"],
                includefilter: {
                    "MachineStatus": {"where":{"StatusCode":1},"fields": {"createdAt":false,"updateAt":false}},
                    "Repair": {"order": "createdAt DESC", "fields": ["repairContent"]},
                    "WaterpurifierBrand": {"fields": {"brandName": false}},
                    "AnnualFee": {"order": "createdAt DESC", "limit": 1, "fields": ["startUseTime", "endUseTime"]},
                }
            }
        },
        function (ret, err) {
            if (err) {
                //处理错误 err
                callback(err, null);
            } else {
                //处理数据 ret
                callback(null, ret);
            }

        }
    )
};
// OrderStatus.add = function (q, callback) {
//
//     console.log(q)
//     WaterpurifierOrder_BackStage.save({
//         q
//     }, function (ret, err) {
//         if (err) {
//             return callback(err, null);
//         }
//         callback(null, ret);
//     })
// }
// OrderStatus.update = function (q, callback) {
//     console.log(q)
//     WaterpurifierOrder_BackStage.save({"_id": q.id},{
//         "workerName" : q.workerName,
//         "worker":q.worker,
//         "orderStatusName" : q.orderStatusName
//     }, function (ret, err) {
//         if (err) {
//             return callback(err, null);
//         }
//         callback(null, ret);
//     })
// }

module.exports = WaterPurifierStatus;