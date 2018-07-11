var Resource = require("APICloud").Resource;
var settings = require('../settings');
var client = new Resource(settings.appId, settings.appKey);
var WaterpurifierOrder_BackStage = client.Factory("WaterpurifierOrder");
var orderStatus = require('./orderStatus');

function WaterpurifierOrder(Order) {
    this.id = WaterpurifierBrand.id;
    this.description = WaterpurifierBrand.description;
    this.brandName = WaterpurifierBrand.brandName;
    this.annualFee = WaterpurifierBrand.annualFee;
    this.bookingFee = WaterpurifierBrand.bookingFee;
    this.installFee = WaterpurifierBrand.installFee;
};
//

WaterpurifierOrder.getOne = function (id, callback) {
    console.log('进入单独搜索')
    console.log(id)
    WaterpurifierOrder_BackStage.query(
        {
        filter: {
            "where": {
                "_id": id
            },
            include: [
                "userPointer",
                "waterpurifierBrandPointer",
                "CleanMachinePointer",
                "refereePointer",
                "orderStatusPointer",
                "workerPointer"
            ]
        }
    },
        function (ret, err) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, ret)
        }

    })
}
WaterpurifierOrder.getAll = function (orderStatusNameList, callback) {
    WaterpurifierOrder_BackStage.get(
        function (ret, err) {
            if (err) {
                callback(err, null);
            }
            if (orderStatusNameList && orderStatusNameList.length > 0) {
                ret = ret.filter(data => orderStatusNameList.indexOf(data.orderStatus.code) > -1);
            }
            callback(null, ret);
        }
    )
};
WaterpurifierOrder.add = function (q, callback) {

    console.log(q)
    WaterpurifierOrder_BackStage.save({
        q
    }, function (ret, err) {
        if (err) {
            return callback(err, null);
        }
        callback(null, ret);
    })
}
WaterpurifierOrder.update = function (q, callback) {
    orderStatus.getAll(q.orderStatusName, function (err, ret) {
        if (err) {
            return callback(err, null);
        }
        console.log(ret)
        q.orderStatus = ret[0].id;
        console.log(q.orderStatus)
        WaterpurifierOrder_BackStage.save({"_id": q.id}, {
            "workerName": q.workerName,
            "worker": q.worker,
            "orderStatusName": q.orderStatusName,
            "orderStatus": q.orderStatus,
        }, function (ret, err) {
            if (err) {
                return callback(err, null);
            }
            callback(null, ret);
        })

    });

}

module.exports = WaterpurifierOrder;