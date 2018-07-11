var Resource = require("APICloud").Resource;
var settings = require('../settings');
var client = new Resource(settings.appId, settings.appKey);
var OrderStatus_BackStage = client.Factory("orderStatus");

function OrderStatus(Order) {

};
//
OrderStatus.getAll = function (orderStatusName, callback) {
    OrderStatus_BackStage.get(
        function (ret, err) {
            if (err) {
                callback(err, null);
            }
            if (orderStatusName && orderStatusName.length > 0) {
                ret = ret.filter(data => orderStatusName.indexOf(data.description) > -1);
            }
            callback(null, ret);
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

module.exports = OrderStatus;