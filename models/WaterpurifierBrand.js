var Resource = require("APICloud").Resource;
var settings = require('../settings');
var client = new Resource(settings.appId, settings.appKey);
var WaterpurifierBrand_BackStage = client.Factory("WaterpurifierBrand");

function WaterpurifierBrand(WaterpurifierBrand) {
    this.id = WaterpurifierBrand.id;
    this.description = WaterpurifierBrand.description;
    this.brandName = WaterpurifierBrand.brandName;
    this.annualFee = WaterpurifierBrand.annualFee;
    this.bookingFee = WaterpurifierBrand.bookingFee;
    this.installFee = WaterpurifierBrand.installFee;
};
WaterpurifierBrand.getAll = function (callback) {
    WaterpurifierBrand_BackStage.get(function (ret, err) {
        if (err) {
            callback(err, null);
        }
        callback(null, ret);
    })
};
WaterpurifierBrand.getOtherByBandRelation = function (brandID, relationName, callback) {
    WaterpurifierBrand_BackStage.get({"id": brandID, "_relation": relationName}, function (ret, err) {
            if (err) {
                callback(err, null);
            }
            callback(null, ret);
        }
    )
}

module.exports = WaterpurifierBrand;