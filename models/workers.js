var Resource = require("APICloud").Resource;
var settings = require('../settings');
var client = new Resource(settings.appId, settings.appKey);
var workers_BackStage = client.Factory("workers");
var fs = require('fs');
var path = require("path")

function workers(Order) {
    // this.id = WaterpurifierBrand.id;
    // this.description = WaterpurifierBrand.description;
    // this.brandName = WaterpurifierBrand.brandName;
    // this.annualFee = WaterpurifierBrand.annualFee;
    // this.bookingFee = WaterpurifierBrand.bookingFee;
    // this.installFee = WaterpurifierBrand.installFee;

    id = 0;
    workerName = '';
    workerMobile = '';
    workerIDnumber = '';
    userID = '';
    enrollTime = '';
    enableFlag = 0;
    WorkArea = '';
    statusText = '';
    statusType = '';
    CompletedCount = 0;
    OnCount = 0;
};
//
workers.getAll = function (q, callback) {
    workers_BackStage.get(
        function (ret, err) {
            if (err) {
                return callback(err, null);
            }
            if (q.enableFlag != '' && q.enableFlag != 'null') {

                ret = ret.filter(data => q.enableFlag.indexOf(data.enableFlag) > -1);
            }
            if (q.workerName != '' && q.workerName != 'null') {

                ret = ret.filter(data => data.workerName.indexOf(q.workerName) > -1);
            }

            callback(null, ret);
        }
    )
};
workers.update = function (q, callback) {  // workers_BackStage.update({id})
    workers_BackStage.save({"_id": q.id}, {
        "workerName": q.workerName,
        "workerMobile": q.workerMobile,
        "enableFlag": q.enableFlag,
        "WorkArea": q.WorkArea,
        "gender": q.gender
    }, function (ret, err) {
        if (err) {
            return callback(err, null);
        }
        callback(null, ret);
    })
}
workers.add = function (q, callback) {
    var file = path.join(__dirname, "/avartar.jpg")
    base64_decode(q.picture, file)
    q.picture = file;
    console.log(q)
    workers_BackStage.save({
        "workerName": q.workerName,
        "workerMobile": q.workerMobile,
        "enableFlag": q.enableFlag,
        "WorkArea": q.WorkArea,
        "gender": q.gender,
        "picture": {
            isFile: true,
            path: q.picture
        }
    }, function (ret, err) {
        if (err) {
            return callback(err, null);
        }
        callback(null, ret);
    })
}
function base64_decode(base64str, file) {
    var bitmap = new Buffer(base64str.split(',')[1], 'base64');
    fs.writeFileSync(file, bitmap);
}

module.exports = workers;