var Resource = require("APICloud").Resource;
var settings = require('../settings');
var client = new Resource(settings.appId, settings.appKey);
var WaterpurifierStorage_BackStage = client.Factory("WaterpurifierStorage");

function WaterpurifierStorage(WaterpurifierStorage) {
    this.id = WaterpurifierStorage.id;
    this.scrapQuantity = WaterpurifierStorage.scrapQuantity;
    this.availableQuantity = WaterpurifierStorage.availableQuantity;
    this.InstalledQuantity = WaterpurifierStorage.InstalledQuantity;
    this.waterpurifierBrand = WaterpurifierStorage.waterpurifierBrand
};
WaterpurifierStorage.getAll = (function (callback) {
    WaterpurifierStorage_BackStage.get(function (ret, err) {
        if (err) {
            callback(err, null);
        }
        callback(null, ret);
    })
});

module.exports = WaterpurifierStorage;